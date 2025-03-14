/*var map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
    minZoom: 3,
    maxZoom: 9 
}).addTo(map);
map.zoomControl.setPosition('bottomright');

var PinIcon = L.icon({
    iconUrl: 'Pin.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
});

L.marker([53.222467, -4.130392], {
    icon: PinIcon
}).addTo(map).bindPopup('A pretty CSS popup.<br> Easily customizable.')
*/
    // Manual Country Name Mappings (API Name -> GeoJSON Name)
    const manualMappings = {
      "United States": "United States of America",
      "Russia": "Russian Federation",
      "South Korea": "Korea, Republic of",
      "North Korea": "Korea, Democratic People's Republic of",
      "Iran": "Iran, Islamic Republic of",
      "Vietnam": "Viet Nam",
      "Venezuela": "Venezuela, Bolivarian Republic of",
      "Syria": "Syrian Arab Republic",
      "Laos": "Lao People's Democratic Republic",
      "Brunei": "Brunei Darussalam",
      "Bolivia": "Bolivia, Plurinational State of",
      "Czech Republic": "Czechia",
      "Democratic Republic of the Congo": "Congo, The Democratic Republic of the",
      "Republic of the Congo": "Congo",
      "Gambia": "Gambia, The"
    };

    // Levenshtein Distance Function
    function levenshteinDistance(a, b) {
      const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

      for (let i = 0; i <= a.length; i++) dp[i][0] = i;
      for (let j = 0; j <= b.length; j++) dp[0][j] = j;

      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          if (a[i - 1] === b[j - 1]) {
            dp[i][j] = dp[i - 1][j - 1]; // No change needed
          } else {
            dp[i][j] = Math.min(
              dp[i - 1][j] + 1,  // Deletion
              dp[i][j - 1] + 1,  // Insertion
              dp[i - 1][j - 1] + 1 // Substitution
            );
          }
        }
      }
      return dp[a.length][b.length];
    }

    // Fuzzy match country name using Levenshtein distance
    function fuzzyMatch(input, possibleMatches) {
      if (manualMappings[input]) return manualMappings[input];

      let bestMatch = null;
      let bestScore = Infinity;

      possibleMatches.forEach(name => {
        let distance = levenshteinDistance(input.toLowerCase(), name.toLowerCase());
        if (distance < bestScore) {
          bestScore = distance;
          bestMatch = name;
        }
      });

      console.log(`Fuzzy matched "${input}" -> "${bestMatch}" (score: ${bestScore})`);
      return bestScore <= 5 ? bestMatch : null; // Allow for small mismatches
    }

    // Function to determine color based on score
    function getColor(score) {
      if (score === null) return 'gray'; // Null values = gray
      if (score <= 40) return 'red';
      if (score <= 60) return 'orange';
      if (score <= 80) return 'yellow';
      return 'green'; // 81-100, green
    }

    const apiUrl = "https://services7.arcgis.com/IyvyFk20mB7Wpc95/arcgis/rest/services/Sustainable_Development_Report_2024_(with_indicators)/FeatureServer/0/query?where=1%3D1&outFields=Overall_Score,Name"//&outSR=4326&f=json";
    
    let currentGlobeImage = 'generated_with_worldmapgenerator.png';
    let currentBackgroundImage = '805180.jpg';

    Promise.all([
      fetch('./assets/ne_110m_admin_0_countries.geojson').then(res => res.json()),
      fetch(apiUrl).then(res => res.json())
    ]).then(([countries, apiData]) => {
      const scoreMap = new Map();
      apiData.features.forEach(f => {
        const countryName = f.attributes.Name;
        const score = f.attributes.Overall_Score;
        scoreMap.set(countryName, score);
      });

      const world = new Globe(document.getElementById('globeViz'))
        .globeImageUrl(currentGlobeImage)
        .backgroundImageUrl(currentBackgroundImage)
        .lineHoverPrecision(0)
        .polygonsData(countries.features.filter(data => data.properties.ISO_A2 !== 'AQ'))
        .polygonAltitude(0.01)
        .polygonCapColor(feat => {
          const matchedName = fuzzyMatch(feat.properties.ADMIN, Array.from(scoreMap.keys()));
          return getColor(scoreMap.get(matchedName) || null);
        })
        .polygonSideColor(() => 'rgba(0, 0, 0, 0)')
        .polygonStrokeColor(() => '#111')
        .polygonLabel(({ properties: data }) => {
          const matchedName = fuzzyMatch(data.ADMIN, Array.from(scoreMap.keys()));
          return `
            <b>${data.ADMIN} (${data.ISO_A2}):</b> <br />
            Score: <i>${scoreMap.get(matchedName) ?? 'N/A'}</i>
          `;
        })
        .onPolygonHover(hoverD => world
          .polygonAltitude(data => data === hoverD ? 0.06 : 0.01)
          .polygonCapColor(data => {
            const matchedName = fuzzyMatch(data.properties.ADMIN, Array.from(scoreMap.keys()));
            return data === hoverD ? 'steelblue' : getColor(scoreMap.get(matchedName) || null);
          })
        )
        .polygonsTransitionDuration(300);

      // Update globe and background on button click
      document.getElementById('updateColorsBtn').addEventListener('click', () => {
        world.globeImageUrl(currentGlobeImage).backgroundImageUrl(currentBackgroundImage);
      });

      document.getElementById('updateGlobeBtn').addEventListener('click', () => {
        currentGlobeImage = 'new_globe_image.png'; // Update path
        currentBackgroundImage = 'new_background_image.jpg'; // Update path
        world.globeImageUrl(currentGlobeImage).backgroundImageUrl(currentBackgroundImage);
      });
    });