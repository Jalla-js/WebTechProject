AFRAME.registerComponent("bend-plane", {
    schema: {
        width: { type: "number", default: 6 },
        height: { type: "number", default: 6 },
        curveFactor: { type: "number", default: 1 }
    },

    init: function () {
        const el = this.el;

        // Create geometry
        const geometry = new THREE.PlaneGeometry(this.data.width, this.data.height, 20, 20);

        // Modify vertices for an S-curve
        const curveFactor = this.data.curveFactor;
        const vertices = geometry.attributes.position.array;
        for (let i = 0; i < vertices.length; i += 3) {
            let x = vertices[i];
            let y = vertices[i + 1];

            // Apply sine wave to bend the roof into an S shape
            vertices[i + 2] = Math.sin(x * Math.PI / this.data.width) * curveFactor - Math.sin(y * Math.PI / this.data.height) * curveFactor;
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();

        // Create material
        const material = new THREE.MeshStandardMaterial({ color: "#8B5A2B", side: THREE.DoubleSide });

        // Create mesh and add to entity
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2; // Rotate to lay flat like a roof
        el.setObject3D("mesh", mesh);
    }
});


AFRAME.registerComponent('generate-coral', {
    schema: { type: 'string' }, // 'dead' or 'thriving'

    init: function () {
        let coralRow = this.el;
        let type = this.data;

        // Total width for the coral row
        const totalWidth = 17;
        const coralCount = 9;  // Auto-fit coral count (adjust as needed)
        const spacing = totalWidth / coralCount; // Even spacing

        // Color options
        const thrivingColors = ["blue", "pink", "yellow", "salmon", "cyan", "purple", "lime", "orange"];
        const deadColors = ["dimgray", "darkgray", "brown", "slategray", "gray", "saddlebrown", "fadedyellow"];

        for (let i = 0; i < coralCount; i++) {
            let coral = document.createElement("a-entity");
            coral.setAttribute("position", `${i * spacing} 0 0`);


            if (type === "thriving") {
                // Pick random colors
                let c1 = thrivingColors[Math.floor(Math.random() * thrivingColors.length)];
                let c2 = thrivingColors[Math.floor(Math.random() * thrivingColors.length)];
                let c3 = thrivingColors[Math.floor(Math.random() * thrivingColors.length)];
                let c4 = thrivingColors[Math.floor(Math.random() * thrivingColors.length)];

                coral.innerHTML = `
      <a-cylinder position="-0.5 0 0" radius="0.3" height="1" color="${c1}"></a-cylinder>
      <a-cylinder position="0 0 0" radius="0.25" height="1.2" color="${c2}"></a-cylinder>
      <a-cylinder position="0.5 0 0" radius="0.35" height="0.8" color="${c3}"></a-cylinder>
      <a-torus animation="property: scale; to: 1.1 1.1 1.1; dur: 2000; loop: true; dir: alternate" position="0 0.5 0" radius="0.3" color="${c4}"></a-torus>
    `;
            } else {
                // Pick random dead colors
                let c1 = deadColors[Math.floor(Math.random() * deadColors.length)];
                let c2 = deadColors[Math.floor(Math.random() * deadColors.length)];
                let c3 = deadColors[Math.floor(Math.random() * deadColors.length)];
                let c4 = deadColors[Math.floor(Math.random() * deadColors.length)];

                coral.innerHTML = `
      <a-cylinder position="-0.5 0 0" radius="0.3" height="1" color="${c1}"></a-cylinder>
      <a-cylinder position="0 0 0" radius="0.25" height="1.2" color="${c2}"></a-cylinder>
      <a-cylinder position="0.5 0 0" radius="0.35" height="0.8" color="${c3}"></a-cylinder>
      <a-torus position="0 0.5 0" radius="0.3" color="${c4}"></a-torus>
    `;
            }

            coralRow.appendChild(coral);
        }
    }
});

window.onload = function () {


    let trees = 
//{x: ,z: },
    [
        {x: 0.0, z: 0.0},
        {x: 1,z: 1},
        {x: 1.5,z: 2},
        {x: 1,z: 3},
        {x: 0.5,z: 4},
        {x: 0.25,z: 5},
        {x: 0.5,z: 6},
        {x: 1.25,z: 7},
        {x: 2,z: 8},
      ];
    function SDG15Trees(x, z, h) {
        let treeContainer = document.getElementById("SDG15Trees"); // Make sure this exists in A-Frame
        let tree = document.createElement("a-entity");
        tree.setAttribute("position", `${x*2} 0 ${z*2}`);
        let trunk = document.createElement("a-cylinder");
        trunk.setAttribute("geometry", { height: `${h}`, radius: 0.2 })
        trunk.setAttribute("position", `0 ${h/2} 0`);  // Set position separately
        trunk.setAttribute("material", { color: "brown" });
        tree.appendChild(trunk);
        treeContainer.appendChild(tree); // Append tree to the container
    }
    trees.forEach(pos => SDG15Trees(pos.x, pos.z, 1));
}