window.addEventListener('load', () => {
  const scene = document.querySelector('a-scene');


  // Welcome Square / Board
  // Central Square
  const centralSquare = document.createElement('a-box');
  centralSquare.setAttribute('position', '0 0.05 0');
  centralSquare.setAttribute('width', '15');
  centralSquare.setAttribute('height', '15');
  centralSquare.setAttribute('depth', '0.1');
  centralSquare.setAttribute('rotation', '-90 0 0');
  centralSquare.setAttribute('color', '#cccccc');
  scene.appendChild(centralSquare);
  const welcomeBoard = document.createElement('a-entity');
  welcomeBoard.setAttribute('look-at', '#camera');
  welcomeBoard.setAttribute('class', 'page');
  welcomeBoard.setAttribute('htmlembed', '');
  welcomeBoard.setAttribute('position', '0 4 0');
  welcomeBoard.innerHTML = `
  <section class="titleBoard">
    <header>
      <h1>WELCOME TO<br>SDGBox</h1>
      <p>A visual representation of each country's progress towards the UN's Sustainable Development Goals</p>
    </header>
  </section>
`;

  scene.appendChild(welcomeBoard);

  // SDG 1
  const sdg1 = document.createElement('a-entity');
  sdg1.setAttribute('id', 'sdg1');
  sdg1.setAttribute('position', '-15 0 15');

  const carouselContainer = document.createElement('a-entity');
  carouselContainer.setAttribute('id', 'carouselContainer');
  carouselContainer.setAttribute('look-at', '#camera');
  carouselContainer.setAttribute('class', 'page');
  carouselContainer.setAttribute('htmlembed', '');
  carouselContainer.setAttribute('position', '0 3 0');

  carouselContainer.innerHTML = `
  <section class="titleBoard">
    <img id="carousel"
      src="https://images.unsplash.com/photo-1743485237407-e00bfb75163e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
    <div class="carousel-controls">
      <button id="next">Next Image</button>
    </div>
  </section>
`;

  const sphere = document.createElement('a-sphere');
  sphere.setAttribute('class', 'next');
  sphere.setAttribute('position', '0 -1 0');
  sphere.setAttribute('radius', '2');
  sphere.setAttribute('color', 'blue');

  sdg1.appendChild(carouselContainer);
  sdg1.appendChild(sphere);
  scene.appendChild(sdg1);




  // SDG 2

  const sdg2 = document.createElement('a-entity');
  sdg2.setAttribute('id', 'sdg2');
  sdg2.setAttribute('position', '8 0 10');
  sdg2.setAttribute('rotation', '0 110 0');

  const trellis = document.createElement('a-entity');
  trellis.setAttribute('id', 'trellis');
  trellis.setAttribute('position', '0 -1 -5');

  for (let x = -6; x <= 6; x += 2) {
    const stick = document.createElement('a-cylinder');
    stick.setAttribute('height', '8');
    stick.setAttribute('radius', '0.05');
    stick.setAttribute('position', `${x} 4 0`);
    stick.setAttribute('color', '#8B5A2B');
    trellis.appendChild(stick);
  }

  for (let y = 0; y <= 8; y += 2) {
    const stick = document.createElement('a-cylinder');
    stick.setAttribute('height', '12');
    stick.setAttribute('radius', '0.05');
    stick.setAttribute('position', `0 ${y} 0`);
    stick.setAttribute('rotation', '0 0 90');
    stick.setAttribute('color', '#8B5A2B');
    trellis.appendChild(stick);
  }

  const plants = document.createElement('a-entity');
  plants.setAttribute('id', 'trellis-plants');
  plants.setAttribute('position', '0 -1 -5');

  const rows = [
    { y: 7.5, xStart: -5.5 },
    { y: 6, xStart: -5 },
    { y: 4.5, xStart: -5.5 },
    { y: 3, xStart: -5 },
    { y: 1.5, xStart: -5.5 }
  ];

  const colors = ['forestgreen', 'seagreen', 'darkgreen', 'limegreen'];
  const rotations = [-15, -10, -5, 0, 5, 10, 15];

  for (const row of rows) {
    for (let i = 0; i < 6; i++) {
      const leaf = document.createElement('a-plane');
      const x = row.xStart + i * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const rot = rotations[Math.floor(Math.random() * rotations.length)];
      leaf.setAttribute('position', `${x} ${row.y} 0.1`);
      leaf.setAttribute('width', '0.5');
      leaf.setAttribute('height', '0.5');
      leaf.setAttribute('material', `color: ${color}; side: double`);
      leaf.setAttribute('rotation', `0 ${rot} 0`);
      plants.appendChild(leaf);
    }
  }

  const vFarmBase = document.createElement('a-entity');
  vFarmBase.setAttribute('class', 'vFarmGroup');
  vFarmBase.setAttribute('position', '-3 0 2');

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 3; col++) {
      const vFarm = document.createElement('a-entity');
      const x = col * 3;
      const z = row * 3;
      const baseRotation = Math.floor(Math.random() * 30 - 15); // -15 to +15
      const leafColor = colors[Math.floor(Math.random() * colors.length)];

      vFarm.setAttribute('class', 'vFarm');
      vFarm.setAttribute('position', `${x} 0 ${z}`);
      vFarm.setAttribute('rotation', `0 ${baseRotation} 0`);

      vFarm.innerHTML = `
        <a-sphere position="0 -1 0" radius="1" theta-length="180" color="darkgreen"></a-sphere>
        <a-cylinder radius="1.2" height="0.1" position="0 0 0" material="metalness: 0.3"></a-cylinder>
        <a-cylinder radius="0.3" height="6" position="0 1 0" material="metalness: 0.3"></a-cylinder>
        <a-entity position="0 1.5 0.4" rotation="0 30 0">
          <a-plane width="0.3" height="0.6" material="color: ${leafColor}; side: double;" rotation="45 0 0"></a-plane>
        </a-entity>
        <a-entity position="0 2.5 -0.3" rotation="0 -20 0">
          <a-plane width="0.2" height="0.5" material="color: ${leafColor}; side: double;" rotation="30 0 0"></a-plane>
        </a-entity>
      `;

      vFarmBase.appendChild(vFarm);
    }
  }

  sdg2.appendChild(trellis);
  sdg2.appendChild(plants);
  sdg2.appendChild(vFarmBase);
  scene.appendChild(sdg2);



  // SDG3
  const sdg3 = document.createElement('a-entity');
  sdg3.setAttribute('id', 'sdg3');
  sdg3.setAttribute('position', '10 0 -10');

  const bed = document.createElement('a-box');
  bed.setAttribute('position', '0 0.5 0');
  bed.setAttribute('depth', '2');
  bed.setAttribute('height', '0.2');
  bed.setAttribute('width', '1');
  bed.setAttribute('color', '#c0c0c0');
  sdg3.appendChild(bed);

  const legPositions = [
    [0.4, 0.1, 0.8],
    [-0.4, 0.1, 0.8],
    [0.4, 0.1, -0.8],
    [-0.4, 0.1, -0.8],
  ];

  legPositions.forEach(pos => {
    const leg = document.createElement('a-cylinder');
    leg.setAttribute('position', pos.join(' '));
    leg.setAttribute('radius', '0.05');
    leg.setAttribute('height', '0.2');
    leg.setAttribute('color', 'gray');
    sdg3.appendChild(leg);
  });
  const crossVert = document.createElement('a-box');
  crossVert.setAttribute('position', '0 1.5 0');
  crossVert.setAttribute('depth', '0.2');
  crossVert.setAttribute('height', '0.6');
  crossVert.setAttribute('width', '0.2');
  crossVert.setAttribute('color', 'green');

  const crossHori = document.createElement('a-box');
  crossHori.setAttribute('position', '0 1.5 0');
  crossHori.setAttribute('depth', '0.2');
  crossHori.setAttribute('height', '0.2');
  crossHori.setAttribute('width', '0.6');
  crossHori.setAttribute('color', 'green');

  sdg3.appendChild(crossVert);
  sdg3.appendChild(crossHori);
  scene.appendChild(sdg3);



  // SDG 4


  const sdg4 = document.createElement('a-entity');
  sdg4.setAttribute('education-monument', '');
  sdg4.setAttribute('position', '0 0 -4'); // Same as before, change if needed

  const createRockCluster = (xPos) => {
    const rockGroup = document.createElement('a-entity');
    rockGroup.setAttribute('position', `${xPos} 1 0`);
    rockGroup.setAttribute('scale', '1.5 1.5 1.5');

    const rock1 = document.createElement('a-sphere');
    rock1.setAttribute('radius', '0.5');
    rock1.setAttribute('color', '#777');
    rock1.setAttribute('scale', '1 1.6 1.2');
    rockGroup.appendChild(rock1);

    const rock2 = document.createElement('a-sphere');
    rock2.setAttribute('radius', '0.3');
    rock2.setAttribute('color', '#777');
    rock2.setAttribute('position', xPos > 0 ? '-0.2 0.4 0.2' : '0.2 0.3 0.1');
    rock2.setAttribute('scale', '1.1 0.8 1.3');
    rockGroup.appendChild(rock2);

    const rock3 = document.createElement('a-sphere');
    rock3.setAttribute('radius', '0.25');
    rock3.setAttribute('color', '#777');
    rock3.setAttribute('position', xPos > 0 ? '0.3 0.2 -0.2' : '-0.3 0.1 -0.1');
    rock3.setAttribute('scale', '1.2 0.9 1');
    rockGroup.appendChild(rock3);

    return rockGroup;
  };

  sdg4.appendChild(createRockCluster(-1.6));
  sdg4.appendChild(createRockCluster(1.6));

  const backPanel = document.createElement('a-box');
  backPanel.setAttribute('color', '#8B4513');
  backPanel.setAttribute('width', '2');
  backPanel.setAttribute('height', '2');
  backPanel.setAttribute('depth', '0.1');
  backPanel.setAttribute('position', '0 1 0');
  sdg4.appendChild(backPanel);

  const shelfHeights = [1.6, 1.2, 0.8];
  shelfHeights.forEach(y => {
    const shelf = document.createElement('a-box');
    shelf.setAttribute('color', '#5A3210');
    shelf.setAttribute('width', '1.8');
    shelf.setAttribute('height', '0.05');
    shelf.setAttribute('depth', '0.5');
    shelf.setAttribute('position', `0 ${y} 0.2`);
    sdg4.appendChild(shelf);
  });

  const bookData = [
    // Top
    [-0.7, 1.775, '#FF4444', 0.35, 0.12],
    [-0.55, 1.78, '#4488FF', 0.4, 0.1],
    [-0.4, 1.76, '#44FF88', 0.3, 0.14],
    [-0.25, 1.77, '#FFBB00', 0.38, 0.11],
    [-0.1, 1.765, '#AA66CC', 0.33, 0.13],
    [0.05, 1.77, '#66CCAA', 0.36, 0.09],
    [0.2, 1.765, '#3366FF', 0.34, 0.1],
    // Middle
    [-0.65, 1.375, '#FF8888', 0.31, 0.11],
    [-0.48, 1.38, '#88CCFF', 0.36, 0.13],
    [-0.32, 1.365, '#33DD99', 0.29, 0.1],
    [-0.15, 1.375, '#F4D03F', 0.35, 0.14],
    [0.03, 1.37, '#7D3C98', 0.33, 0.12],
    [0.18, 1.38, '#2980B9', 0.38, 0.09],
    // Bottom
    [-0.6, 0.975, '#D98880', 0.32, 0.12],
    [-0.45, 0.98, '#73C6B6', 0.34, 0.11],
    [-0.3, 0.965, '#F1948A', 0.28, 0.13],
    [-0.15, 0.98, '#C39BD3', 0.36, 0.1],
    [0, 0.96, '#85C1E9', 0.3, 0.14],
    [0.17, 0.985, '#F7DC6F', 0.37, 0.12],
  ];

  bookData.forEach(([x, y, color, height, width]) => {
    const book = document.createElement('a-box');
    book.setAttribute('color', color);
    book.setAttribute('height', height);
    book.setAttribute('width', width);
    book.setAttribute('depth', '0.3');
    book.setAttribute('position', `${x} ${y} 0.25`);
    sdg4.appendChild(book);
  });

  scene.appendChild(sdg4);


  //SDG 5

  const sdg5 = document.createElement('a-entity');
  sdg5.setAttribute('equality-monument', '');
  sdg5.setAttribute('position', '-10 0 5');

  const platform = document.createElement('a-cylinder');
  platform.setAttribute('radius', 1.5);
  platform.setAttribute('height', 0.2);
  platform.setAttribute('color', '#999');
  platform.setAttribute('position', '0 0.1 0');

  const createFigure = (xPos, color) => {
    const group = document.createElement('a-entity');

    const body = document.createElement('a-cylinder');
    body.setAttribute('height', 1.4);
    body.setAttribute('radius', 0.2);
    body.setAttribute('color', color);
    body.setAttribute('position', `${xPos} 0.9 0`);
    group.appendChild(body);

    const head = document.createElement('a-sphere');
    head.setAttribute('radius', 0.25);
    head.setAttribute('color', color);
    head.setAttribute('position', `${xPos} 1.75 0`);
    group.appendChild(head);

    return group;
  };

  sdg5.appendChild(platform);
  sdg5.appendChild(createFigure(-0.7, '#e91e63')); // Left
  sdg5.appendChild(createFigure(0, '#3f51b5'));    // Center
  sdg5.appendChild(createFigure(0.7, '#4caf50'));  // Right

  scene.appendChild(sdg5);



  // SDG6 
  const sdg6 = document.createElement('a-entity');
  sdg6.setAttribute('id', 'sdg6');
  sdg6.setAttribute('position', '-4 0 -4');

  const basePool = document.createElement('a-cylinder');
  basePool.setAttribute('radius', '1.5');
  basePool.setAttribute('height', '0.3');
  basePool.setAttribute('color', '#666');
  basePool.setAttribute('position', '0 0.15 0');
  sdg6.appendChild(basePool);

  const waterBase = document.createElement('a-cylinder');
  waterBase.setAttribute('radius', '1.4');
  waterBase.setAttribute('height', '0.1');
  waterBase.setAttribute('color', '#00BFFF');
  waterBase.setAttribute('position', '0 0.25 0');
  waterBase.setAttribute('opacity', '0.7');
  sdg6.appendChild(waterBase);

  const lowerTier = document.createElement('a-cylinder');
  lowerTier.setAttribute('radius', '1.0');
  lowerTier.setAttribute('height', '0.2');
  lowerTier.setAttribute('color', '#999');
  lowerTier.setAttribute('position', '0 0.6 0');
  sdg6.appendChild(lowerTier);

  const waterLower = document.createElement('a-cylinder');
  waterLower.setAttribute('radius', '0.9');
  waterLower.setAttribute('height', '0.05');
  waterLower.setAttribute('color', '#00BFFF');
  waterLower.setAttribute('position', '0 0.675 0');
  waterLower.setAttribute('opacity', '0.7');
  sdg6.appendChild(waterLower);

  const middleTier = document.createElement('a-cylinder');
  middleTier.setAttribute('radius', '0.6');
  middleTier.setAttribute('height', '0.2');
  middleTier.setAttribute('color', '#888');
  middleTier.setAttribute('position', '0 1.2 0');
  sdg6.appendChild(middleTier);

  const waterMiddle = document.createElement('a-cylinder');
  waterMiddle.setAttribute('radius', '0.5');
  waterMiddle.setAttribute('height', '0.05');
  waterMiddle.setAttribute('color', '#00BFFF');
  waterMiddle.setAttribute('position', '0 1.275 0');
  waterMiddle.setAttribute('opacity', '0.7');
  sdg6.appendChild(waterMiddle);

  const topTier = document.createElement('a-cylinder');
  topTier.setAttribute('radius', '0.3');
  topTier.setAttribute('height', '0.2');
  topTier.setAttribute('color', '#777');
  topTier.setAttribute('position', '0 1.8 0');
  sdg6.appendChild(topTier);

  const waterTop = document.createElement('a-cylinder');
  waterTop.setAttribute('radius', '0.2');
  waterTop.setAttribute('height', '0.05');
  waterTop.setAttribute('color', '#00BFFF');
  waterTop.setAttribute('position', '0 1.875 0');
  waterTop.setAttribute('opacity', '0.7');
  sdg6.appendChild(waterTop);

  const spout = document.createElement('a-cylinder');
  spout.setAttribute('radius', '0.05');
  spout.setAttribute('height', '3');
  spout.setAttribute('color', '#00BFFF');
  spout.setAttribute('position', '0 0.4 0');
  spout.setAttribute('opacity', '0.6');
  sdg6.appendChild(spout);

  const topSpoutDecoration = document.createElement('a-sphere');
  topSpoutDecoration.setAttribute('radius', '0.1');
  topSpoutDecoration.setAttribute('color', '#00BFFF');
  topSpoutDecoration.setAttribute('position', '0 2 0');
  topSpoutDecoration.setAttribute('opacity', '0.8');
  sdg6.appendChild(topSpoutDecoration);

  scene.appendChild(sdg6);


  // SDG 7

  const sdg7 = document.createElement('a-entity');
  sdg7.setAttribute('id', 'sdg7');
  sdg7.setAttribute('position', '0 0 -10');
  sdg7.setAttribute('rotation', '0 180 0');

  const grass = document.createElement('a-box');
  grass.setAttribute('width', '5');
  grass.setAttribute('height', '0.1');
  grass.setAttribute('depth', '5');
  grass.setAttribute('color', '#228B22');
  grass.setAttribute('position', '0 0.05 0');
  sdg7.appendChild(grass);

  const panel1 = document.createElement('a-box');
  panel1.setAttribute('width', '1.2');
  panel1.setAttribute('height', '0.05');
  panel1.setAttribute('depth', '0.8');
  panel1.setAttribute('color', '#1E90FF');
  panel1.setAttribute('position', '-1.2 0.6 1');
  panel1.setAttribute('rotation', '-45 0 0');
  sdg7.appendChild(panel1);

  const stand1 = document.createElement('a-box');
  stand1.setAttribute('width', '0.1');
  stand1.setAttribute('height', '0.6');
  stand1.setAttribute('depth', '0.1');
  stand1.setAttribute('color', '#333');
  stand1.setAttribute('position', '-1.2 0.3 1');
  sdg7.appendChild(stand1);

  const panel2 = document.createElement('a-box');
  panel2.setAttribute('width', '1.2');
  panel2.setAttribute('height', '0.05');
  panel2.setAttribute('depth', '0.8');
  panel2.setAttribute('color', '#1E90FF');
  panel2.setAttribute('position', '1.2 0.6 1');
  panel2.setAttribute('rotation', '-45 0 0');
  sdg7.appendChild(panel2);

  const stand2 = document.createElement('a-box');
  stand2.setAttribute('width', '0.1');
  stand2.setAttribute('height', '0.6');
  stand2.setAttribute('depth', '0.1');
  stand2.setAttribute('color', '#333');
  stand2.setAttribute('position', '1.2 0.3 1');
  sdg7.appendChild(stand2);

  const turbineBase1 = document.createElement('a-cylinder');
  turbineBase1.setAttribute('radius', '0.05');
  turbineBase1.setAttribute('height', '5');
  turbineBase1.setAttribute('color', '#ccc');
  turbineBase1.setAttribute('position', '-1.5 2.5 -1.5');
  sdg7.appendChild(turbineBase1);

  const blade1a = document.createElement('a-box');
  blade1a.setAttribute('color', '#fff');
  blade1a.setAttribute('width', '0.1');
  blade1a.setAttribute('height', '2');
  blade1a.setAttribute('depth', '0.05');
  blade1a.setAttribute('position', '-1.5 5 -1.45');
  blade1a.setAttribute('rotation', '0 0 45');
  sdg7.appendChild(blade1a);

  const blade1b = document.createElement('a-box');
  blade1b.setAttribute('color', '#fff');
  blade1b.setAttribute('width', '0.1');
  blade1b.setAttribute('height', '2');
  blade1b.setAttribute('depth', '0.05');
  blade1b.setAttribute('position', '-1.5 5 -1.55');
  blade1b.setAttribute('rotation', '0 0 -45');
  sdg7.appendChild(blade1b);

  const turbineBase2 = document.createElement('a-cylinder');
  turbineBase2.setAttribute('radius', '0.05');
  turbineBase2.setAttribute('height', '5');
  turbineBase2.setAttribute('color', '#ccc');
  turbineBase2.setAttribute('position', '1.5 2.5 -1.5');
  sdg7.appendChild(turbineBase2);

  const blade2a = document.createElement('a-box');
  blade2a.setAttribute('color', '#fff');
  blade2a.setAttribute('width', '0.1');
  blade2a.setAttribute('height', '2');
  blade2a.setAttribute('depth', '0.05');
  blade2a.setAttribute('position', '1.5 5 -1.45');
  blade2a.setAttribute('rotation', '0 0 45');
  sdg7.appendChild(blade2a);

  const blade2b = document.createElement('a-box');
  blade2b.setAttribute('color', '#fff');
  blade2b.setAttribute('width', '0.1');
  blade2b.setAttribute('height', '2');
  blade2b.setAttribute('depth', '0.05');
  blade2b.setAttribute('position', '1.5 5 -1.55');
  blade2b.setAttribute('rotation', '0 0 -45');
  sdg7.appendChild(blade2b);

  document.querySelector('a-scene').appendChild(sdg7);



  // SDG 8

  const sdg8 = document.createElement("a-entity");
  sdg8.setAttribute("id", "sdg8");
  sdg8.setAttribute("position", "-4 1.6 -10");

  const wall = document.createElement("a-box");
  wall.setAttribute("width", "6");
  wall.setAttribute("height", "4");
  wall.setAttribute("depth", "0.1");
  wall.setAttribute("color", "#d8c4a3");
  wall.setAttribute("position", "0 2 0");
  sdg8.appendChild(wall);

  const boardInner = document.createElement("a-box");
  boardInner.setAttribute("width", "4.5");
  boardInner.setAttribute("height", "2.5");
  boardInner.setAttribute("depth", "0.05");
  boardInner.setAttribute("color", "#522f2f");
  boardInner.setAttribute("position", "0 2 0.06");
  sdg8.appendChild(boardInner);

  const boardOuter = document.createElement("a-box");
  boardOuter.setAttribute("width", "4.7");
  boardOuter.setAttribute("height", "2.7");
  boardOuter.setAttribute("depth", "0.01");
  boardOuter.setAttribute("color", "#a56b3a");
  boardOuter.setAttribute("position", "0 2 0.065");
  sdg8.appendChild(boardOuter);

  const barHeights = [0.4, 0.6, 0.8, 1.0];
  const barX = [-1.5, -1.2, -0.9, -0.6];
  barHeights.forEach((h, i) => {
    const bar = document.createElement("a-box");
    bar.setAttribute("width", "0.2");
    bar.setAttribute("height", h.toString());
    bar.setAttribute("depth", "0.05");
    bar.setAttribute("color", "#f8e9d2");
    bar.setAttribute("position", `${barX[i]} ${2 + (h / 2)} 0.07`);
    sdg8.appendChild(bar);
  });

  const arrow = document.createElement("a-box");
  arrow.setAttribute("width", "1.2");
  arrow.setAttribute("height", "0.05");
  arrow.setAttribute("depth", "0.01");
  arrow.setAttribute("color", "#d14141");
  arrow.setAttribute("position", "-1.0 2.5 0.08");
  arrow.setAttribute("rotation", "0 0 30");
  sdg8.appendChild(arrow);

  const linePoints = [
    ["0.2 2.2 0.1", "0.5 2.5 0.1"],
    ["0.5 2.5 0.1", "0.8 2.4 0.1"],
    ["0.8 2.4 0.1", "1.1 2.6 0.1"],
    ["1.1 2.6 0.1", "1.4 3 0.1"]
  ];
  linePoints.unshift(["0.2 2.2 0.1", "1.4 3 0.1"]);

  linePoints.forEach(([start, end]) => {
    const line = document.createElement("a-entity");
    line.setAttribute("line", `start: ${start}; end: ${end}; color: #f8e9d2`);
    sdg8.appendChild(line);
  });

  const heads = [
    ["-1.3", "1.5"],
    ["-1.55", "1.4"],
    ["-1.05", "1.4"]
  ];
  heads.forEach(([x, y]) => {
    const head = document.createElement("a-sphere");
    head.setAttribute("radius", x === "-1.3" ? "0.12" : "0.1");
    head.setAttribute("color", "#f8e9d2");
    head.setAttribute("position", `${x} ${y} 0.07`);
    sdg8.appendChild(head);
  });

  const body = document.createElement("a-cylinder");
  body.setAttribute("radius", "0.25");
  body.setAttribute("height", "0.15");
  body.setAttribute("color", "#f8e9d2");
  body.setAttribute("position", "-1.3 1.1 0.07");
  body.setAttribute("rotation", "90 0 0");
  sdg8.appendChild(body);

  const numberText = document.createElement("a-text");
  numberText.setAttribute("value", "12345");
  numberText.setAttribute("position", "0.7 1.75 0.08");
  numberText.setAttribute("color", "#f8e9d2");
  numberText.setAttribute("width", "2");
  sdg8.appendChild(numberText);

  const footer1 = document.createElement("a-box");
  footer1.setAttribute("width", "1.6");
  footer1.setAttribute("height", "0.05");
  footer1.setAttribute("depth", "0.01");
  footer1.setAttribute("color", "#8c3d3d");
  footer1.setAttribute("position", "0.7 1.5 0.1");
  sdg8.appendChild(footer1);

  const footer2 = document.createElement("a-box");
  footer2.setAttribute("width", "1.4");
  footer2.setAttribute("height", "0.05");
  footer2.setAttribute("depth", "0.01");
  footer2.setAttribute("color", "#8c3d3d");
  footer2.setAttribute("position", "0.7 1.4 0.1");
  sdg8.appendChild(footer2);

  document.querySelector("a-scene").appendChild(sdg8);


  // SDG 9

  const sdg9 = document.createElement("a-entity");
  sdg9.setAttribute("id", "sdg9");
  sdg9.setAttribute("position", "4 0 0");

  // Podiums
  [
    { pos: "0 0.5 0", height: 1, color: "#999" },
    { pos: "-2 0.4 0", height: 0.8, color: "#888" },
    { pos: "2 0.3 0", height: 0.6, color: "#777" }
  ].forEach(({ pos, height, color }) => {
    const box = document.createElement("a-box");
    box.setAttribute("position", pos);
    box.setAttribute("width", "1.5");
    box.setAttribute("height", height);
    box.setAttribute("depth", "1");
    box.setAttribute("color", color);
    sdg9.appendChild(box);
  });

  // Innovation Statue (center)
  const innovationParts = [
    ["a-cylinder", { position: "0 1.6 0", height: "1.4", radius: "0.1", color: "#f8e863" }],
    ["a-sphere", { position: "0 2.4 0", radius: "0.25", color: "#fff176" }],
    ["a-ring", {
      position: "0 2.7 0", "radius-inner": "0.05", "radius-outer": "0.12", rotation: "90 0 0", color: "#ffeb3b"
    }],
    ["a-text", {
      value: "Innovation", align: "center", position: "0 3.0 0.2", color: "black", side: "double", width: "3"
    }]
  ];
  innovationParts.forEach(([tag, attrs]) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
    sdg9.appendChild(el);
  });

  // Infrastructure Statue (left)
  const infraParts = [
    ["a-box", { position: "-2 1.15 0", width: "1.2", height: "0.15", depth: "0.2", color: "#b0bec5" }],
    ["a-cylinder", { position: "-2.4 0.8 0", radius: "0.05", height: "0.8", color: "#b0bec5" }],
    ["a-cylinder", { position: "-1.6 0.8 0", radius: "0.05", height: "0.8", color: "#b0bec5" }],
    ["a-torus", {
      position: "-2 0.95 0", radius: "0.45", "radius-tubular": "0.04", arc: "180", rotation: "0 0 180",
      color: "#b0bec5"
    }],
    ["a-text", {
      value: "Infrastructure", align: "center", position: "-2 2.0 0.2", color: "black", side: "double", width: "3"
    }]
  ];
  infraParts.forEach(([tag, attrs]) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
    sdg9.appendChild(el);
  });

  // Industry Statue (right)
  const industryParts = [
    ["a-torus", {
      position: "2 1.0 0", radius: "0.25", "radius-tubular": "0.07", color: "#9e9e9e", "segments-radial": "8", "segments-tubular": "24"
    }],
    ["a-box", { position: "2 0.7 0", width: "0.5", height: "0.3", depth: "0.2", color: "#757575" }],
    ["a-box", { position: "2 0.95 0", width: "0.15", height: "0.2", depth: "0.15", color: "#757575" }],
    ["a-text", {
      value: "Industry", align: "center", position: "2 2.0 0.2", color: "black", side: "double", width: "3"
    }]
  ];
  industryParts.forEach(([tag, attrs]) => {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
    sdg9.appendChild(el);
  });

  document.querySelector("a-scene").appendChild(sdg9);



  // SDG 10

  const sdg10 = document.createElement("a-entity");
  sdg10.setAttribute("id", "sdg10");
  sdg10.setAttribute("position", "4 0 -4");

  // Base Ground
  const ground = document.createElement("a-plane");
  ground.setAttribute("rotation", "-90 0 0");
  ground.setAttribute("width", "6");
  ground.setAttribute("height", "6");
  ground.setAttribute("color", "#d0f0ff");
  sdg10.appendChild(ground);

  // Fulcrum
  const fulcrum = document.createElement("a-cone");
  fulcrum.setAttribute("position", "0 0.25 0");
  fulcrum.setAttribute("radius-bottom", "0.3");
  fulcrum.setAttribute("radius-top", "0");
  fulcrum.setAttribute("height", "0.5");
  fulcrum.setAttribute("color", "#888");
  sdg10.appendChild(fulcrum);

  // Seesaw Beam
  const beam = document.createElement("a-box");
  beam.setAttribute("position", "0 0.5 0");
  beam.setAttribute("width", "4");
  beam.setAttribute("height", "0.1");
  beam.setAttribute("depth", "0.2");
  beam.setAttribute("color", "#555");
  beam.setAttribute("rotation", "0 0 2");
  sdg10.appendChild(beam);

  const tallPerson = document.createElement("a-cylinder");
  tallPerson.setAttribute("position", "-1.8 0.85 0");
  tallPerson.setAttribute("height", "0.7");
  tallPerson.setAttribute("radius", "0.15");
  tallPerson.setAttribute("color", "#ff6f61");
  sdg10.appendChild(tallPerson);

  const shortPerson = document.createElement("a-cylinder");
  shortPerson.setAttribute("position", "1.8 0.65 0");
  shortPerson.setAttribute("height", "0.3");
  shortPerson.setAttribute("radius", "0.15");
  shortPerson.setAttribute("color", "#6ec6ff");
  sdg10.appendChild(shortPerson);

  document.querySelector("a-scene").appendChild(sdg10);

  // SDG11
  const sdg11 = createEntity('sdg11', '8 0 0');
  sdg11.appendChild(createBox('0 0.05 0', 5, 0.1, 5, '#d0e6d5'));
  sdg11.appendChild(createBox('-1.5 0.75 -1.5', 0.8, 1.5, 0.8, '#b0bec5'));
  sdg11.appendChild(createBox('1.2 0.5 -1.2', 0.6, 1.0, 0.6, '#90a4ae'));
  sdg11.appendChild(createBox('0.8 0.35 1.4', 0.5, 0.7, 0.5, '#78909c'));
  sdg11.appendChild(createBox('-1.3 0.45 1.3', 0.7, 0.9, 0.7, '#aabec6'));
  sdg11.appendChild(createCylinder('0 0.1 0', 0.02, 0.8, '#81c784'));
  sdg11.appendChild(createCylinder('0 0.3 0', 0.4, 0.05, '#8d6e63'));
  sdg11.appendChild(createSphere('0 0.65 0', 0.25, '#4caf50'));
  sdg11.appendChild(createPlane('0 0.051 0', '-90 0 0', 0.5, 5, '#cfd8dc'));
  sdg11.appendChild(createText('Sustainable Cities', '0 1.8 0.1', 4, 'black'));
  scene.appendChild(sdg11);

  // SDG12
  const sdg12 = createEntity('sdg12', '8 0 -4');
  sdg12.appendChild(createBox('0 0.05 0', 6, 0.1, 4, '#f0f0f0'));
  sdg12.appendChild(createBox('-2 0.75 0', 1.5, 1.5, 1, '#bdbdbd'));
  sdg12.appendChild(createCylinder('-2.5 1.6 0', 0.8, 0.1, '#757575'));
  sdg12.appendChild(createBox('-0.5 0.3 0', 2, 0.1, 0.5, '#9e9e9e'));
  sdg12.appendChild(createBox('-1.3 0.45 0', 0.3, 0.3, 0.3, '#ffe082'));
  sdg12.appendChild(createBox('-0.7 0.45 0', 0.3, 0.3, 0.3, '#ffe082'));
  sdg12.appendChild(createBox('1.5 0.4 0', 1.2, 0.1, 0.8, '#8d6e63'));
  sdg12.appendChild(createSphere('1.3 0.55 0.1', 0.1, '#e57373'));
  sdg12.appendChild(createCylinder('1.7 0.55 -0.1', 0.2, 0.1, '#ffb74d'));
  sdg12.appendChild(createBox('2.8 0.25 0', 0.5, 0.5, 0.5, '#4caf50'));
  sdg12.appendChild(createText('♻', '2.8 0.5 0.3', 2, 'white'));
  sdg12.appendChild(createText('Responsible Consumption\nand Production', '0 1.8 0.1', 5, 'black'));
  scene.appendChild(sdg12);

  // SDG13

  const sdg13 = createEntity('sdg13', '8 0.1 -8');
  sdg13.appendChild(createPlane('0 0 0', '-90 1 0', 5, 5, '#e0f7fa'));
  sdg13.appendChild(createSphere('0 1 0', 0.5, '#4fc3f7'));
  sdg13.appendChild(createSphere('0.1 1.2 0.2', 0.1, '#81c784'));
  sdg13.appendChild(createSphere('-0.2 0.9 -0.1', 0.1, '#a5d6a7'));

  const protest = document.createElement('a-entity');
  protest.setAttribute('rotation', '0 0 40');
  protest.setAttribute('position', '0.6 1 0');
  protest.appendChild(createBox('-0.6 1.5 0', 1, 0.6, 0.05, '#fff176'));
  protest.appendChild(createText('ACT NOW!', '-0.6 1.5 0.06', 2, 'black'));
  protest.appendChild(createCylinder('-0.6 1.15 0', 0.5, 0.05, '#6d4c41'));
  sdg13.appendChild(protest);

  const tree = document.createElement('a-entity');
  tree.setAttribute('rotation', '0 0 -40');
  tree.setAttribute('position', '-0.6 1 0');
  tree.appendChild(createCylinder('0.6 1.15 0', 0.5, 0.07, '#8d6e63'));
  tree.appendChild(createSphere('0.6 1.4 0', 0.25, '#388e3c'));
  sdg13.appendChild(tree);

  sdg13.appendChild(createText('Climate Action', '0 1.9 0.1', 4, 'black'));
  scene.appendChild(sdg13);


  // SDG 14

  const sdg14 = createEntity('sdg14', '12 0 0');

  sdg14.appendChild(createRockCluster(-1.6));
  sdg14.appendChild(createRockCluster(1.6));

  // Aquarium gap (glass panel)
  const aquariumGap = createBox('0 0.85 0', '2.3', '1.9', '1', '#1E90FF');
  aquariumGap.setAttribute("material", "color: #1E90FF; opacity: 0.7");

  // Static fish inside the aquarium
  sdg14.appendChild(createSphere('-0.6 1.45 0', '0.1', 'orange'));
  sdg14.appendChild(createCone('0.05', '0', '0.1', 'orange', '-0.5 1.45 0', '0 0 90'));
  sdg14.appendChild(createSphere('0.4 1.6 0', '0.1', 'yellow'));
  sdg14.appendChild(createCone('0.05', '0', '0.1', 'yellow', '0.3 1.6 0', '0 0 -90'));
  sdg14.appendChild(createSphere('0 0.8 0', '0.1', 'blue'));
  sdg14.appendChild(createCone('0.05', '0', '0.1', 'blue', '0.1 0.8 0', '0 0 90'));

  // Append everything to the scene
  sdg14.appendChild(aquariumGap);
  scene.appendChild(sdg14);


  // SDG 15
  const sdg15 = document.createElement('a-entity');
  sdg15.setAttribute('id', 'sdg15');
  sdg15.setAttribute('position', '-16 0.1 0');

  sdg15.appendChild(createPlane('0 0 0', '-90 0 0', '12', '12', '#81c784'));

  const trees = createEntity('trees', '0 0 0');

  trees.appendChild(createTree({ x: -5, y: 2, z: -5 }));
  trees.appendChild(createTree({ x: 5, y: 2, z: -5 }));
  trees.appendChild(createTree({ x: 5, y: 2, z: 5 }));
  trees.appendChild(createTree({ x: -5, y: 2, z: 5 }));
  trees.appendChild(createTree({ x: 2, y: 2, z: 3 }));
  trees.appendChild(createTree({ x: -3, y: 2, z: 1 }));
  trees.appendChild(createTree({ x: 0, y: 2, z: -3 }));

  sdg15.appendChild(createCylinder('0 0.1 0', '0.05', '2', '#d7ccc8'));
  sdg15.appendChild(createCylinder('0 2.2 0', '0.5', '2', '#8d6e63'));
  sdg15.appendChild(createCylinder('-1.4 1.1 -1.4', '2.7', '0.2', '#5d4037'));
  sdg15.appendChild(createCylinder('1.4 1.1 -1.4', '2.7', '0.2', '#5d4037'));
  sdg15.appendChild(createCylinder('-1.4 1.1 1.4', '2.7', '0.2', '#5d4037'));
  sdg15.appendChild(createCylinder('1.4 1.1 1.4', '2.7', '0.2', '#5d4037'));
  sdg15.appendChild(createText('Life on Land', 'center', '0 3 0', '#2e7d32', '6'));

  sdg15.appendChild(trees);
  scene.appendChild(sdg15);

  // Create SDG 16 (Peace, Justice & Strong Institutions)

  const sdg16 = createEntity("sdg16", "30 0.1 -10");
  sdg16.appendChild(createPlane('-90 0 0', '6', '6', '#e0e0e0'));

  // Scales of Justice
  sdg16.appendChild(createCylinder('0 1 0', '0.05', '2', '#6d4c41'));
  sdg16.appendChild(createBox('0 2 0', '1.5', '0.05', '0.05', '#5d4037'));
  sdg16.appendChild(createCylinder('-0.7 1.6 0', '0.2', '0.05', '#a1887f'));
  sdg16.appendChild(createCylinder('-0.7 1.8 0', '0.01', '0.4', '#5d4037'));
  sdg16.appendChild(createCylinder('0.7 1.6 0', '0.2', '0.05', '#a1887f'));
  sdg16.appendChild(createCylinder('0.7 1.8 0', '0.01', '0.4', '#5d4037'));
  sdg16.appendChild(createCylinder('-0.75 1.3 0', '0.05', '0.6', '#9e9e9e'));
  sdg16.appendChild(createCylinder('0.75 1.3 0', '0.05', '0.6', '#9e9e9e'));
  sdg16.appendChild(createSphere('0 2.5 0', '0.15', 'white'));

  //sdg16.appendChild(createText('Peace, Justice & Strong Institutions', '0 3.2 0.1', '6', '#3e2723'));
  scene.appendChild(sdg16);


  // Create SDG 17 (Partnerships for the Goals)

  const sdg17 = createEntity("sdg17", "40 0.1 -10");
  sdg17.appendChild(createPlane('-90 0 0', '4', '4', '#e3f2fd'));

  const ring = createSphere('0 1.2 0', '0.7', '#2196f3');
  ring.setAttribute("material", "color:#2196f3; emissive: #64b5f6; emissiveIntensity: 0.7;")
  sdg17.appendChild(ring);
  sdg17.appendChild(createText('Partnerships for the Goals', 'center', '0 2 0', '#0d47a1', '5'));

  // Outer partners (symbolic people or globes in a circle)
  const partnerRing = createEntity("partnerRing", "0 0 0");

  const positions = [
    '3.5 1 0', '-3.5 1 0', '0 1 3.5', '0 1 -3.5', '2.5 1 2.5', '-2.5 1 2.5',
    '2.5 1 -2.5', '-2.5 1 -2.5'
  ];
  const Ringcolors = ['#4caf50', '#f44336', '#ff9800', '#9c27b0', '#00bcd4', '#cddc39', '#ffc107', '#795548'];

  for (let i = 0; i < positions.length; i++) {
    let pos = positions[i];
    partnerRing.appendChild(createSphere(pos, '0.3', Ringcolors[i]));
  }

  sdg17.appendChild(partnerRing);

  // Light beams connecting partners to center (optional aesthetic)
  const beams = [
    ['0 1.2 0', '3.5 1 0'], ['0 1.2 0', '-3.5 1 0'], ['0 1.2 0', '0 1 3.5'],
    ['0 1.2 0', '0 1 -3.5'], ['0 1.2 0', '2.5 1 2.5'], ['0 1.2 0', '-2.5 1 2.5'],
    ['0 1.2 0', '2.5 1 -2.5'], ['0 1.2 0', '-2.5 1 -2.5']
  ];

  for (let i = 0; i < beams.length; i++) {
    const line = document.createElement('a-entity');
    line.setAttribute('line', `start: ${beams[i][0]}; end: ${beams[i][1]}; color: #2196f3`);
    sdg17.appendChild(line);
  }

  scene.appendChild(sdg17);
});