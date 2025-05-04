// SDG 1 - Zero Poverty
window.addEventListener('load', () => {
let images = [
    "https://images.unsplash.com/photo-1745594618508-6e3abfce30ef?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1743485237407-e00bfb75163e?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1743953729837-bc934e81af4f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];
let index = 0;

const changeImage = () => {
    index = (index + 1) % images.length;
    document.getElementById('carousel').setAttribute("src", images[index]);
};

document.querySelector('#next').addEventListener("click", () => {
    changeImage();
});


// SDG 2 - Zero Hunger
});