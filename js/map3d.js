var earth;
earth = new WE.map('earth_div');

function initialize() {
    WE.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{
      attribution: '<a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a>',
    }).addTo(earth);
    var markerCustom = WE.marker([50, -9]).addTo(earth);
    earth.setView([50, -9], 2.5);
    
    var before = null;
    requestAnimationFrame(function animate(now) {
        var c = earth.getPosition();
        var elapsed = before? now - before: 0;
        before = now;
        earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
        requestAnimationFrame(animate);
    });
  }

earth.on('click', function(e) {
    window.alert(e.latlng.lat + ', ' + e.latlng.lng);
  });