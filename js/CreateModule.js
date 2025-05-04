function createEntity(id, position) {
    const entity = document.createElement('a-entity');
    entity.setAttribute('id', id);
    entity.setAttribute('position', position);
    return entity;
}

function createBox(pos, w, h, d, color) {
    const box = document.createElement('a-box');
    box.setAttribute('position', pos);
    box.setAttribute('width', w);
    box.setAttribute('height', h);
    box.setAttribute('depth', d);
    box.setAttribute('color', color);
    return box;
}

function createCylinder(pos, h, r, color) {
    const cyl = document.createElement('a-cylinder');
    cyl.setAttribute('position', pos);
    cyl.setAttribute('height', h);
    cyl.setAttribute('radius', r);
    cyl.setAttribute('color', color);
    return cyl;
}

function createSphere(pos, r, color) {
    const sphere = document.createElement('a-sphere');
    sphere.setAttribute('position', pos);
    sphere.setAttribute('radius', r);
    sphere.setAttribute('color', color);
    return sphere;
}

function createPlane(pos, rot, w, h, color) {
    const plane = document.createElement('a-plane');
    plane.setAttribute('position', pos);
    plane.setAttribute('rotation', rot);
    plane.setAttribute('width', w);
    plane.setAttribute('height', h);
    plane.setAttribute('color', color);
    return plane;
}

function createText(value, pos, width, color, align = "center") {
    const text = document.createElement('a-text');
    text.setAttribute('value', value);
    text.setAttribute('position', pos);
    text.setAttribute('width', width);
    text.setAttribute('color', color);
    text.setAttribute('align', align);
    text.setAttribute('side', 'double');
    return text;
}

function createCone(rbottom, rTop, height, color, pos, rot) {
    const cone = document.createElement("a-cone");
    cone.setAttribute("radius-bottom", rbottom);
    cone.setAttribute("radius-top", rTop);
    cone.setAttribute("height", height);
    cone.setAttribute("color", color);
    cone.setAttribute("position", pos);
    cone.setAttribute("rotation", rot);
    return cone;
} 

function createTree(pos={x: 0, y: 0, z: 0}) {
    const tree = document.createElement('a-entity');
    tree.appendChild(createCylinder(`${pos.x} ${pos.y} ${pos.z}`, 4, 0.3, "#ff0000"));
    tree.appendChild(createSphere(`${pos.x} ${pos.y + 3} ${pos.z}`, 2, "green"));
    
    return tree;
}