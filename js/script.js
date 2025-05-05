document.addEventListener("DOMContentLoaded", () => {
    fetch("js/images.json")
      .then(async (response) => {
        const text = await response.text();
        try {
          const data = JSON.parse(text);
          const gallery = document.getElementById("gallery");
          const images = data.gallery[0].images;
  
          for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.className = "gallery-cell";
  
            const cellContent = document.createElement("div");
            cellContent.className = "gallery-cell-content";
  
            if (i < images.length) {
              const img = document.createElement("img");
              img.src = images[i].image;
              img.alt = "Gallery Image";
              img.title = images[i].caption; // Tooltip
  
              cellContent.appendChild(img);
            }
  
            cell.appendChild(cellContent);
            gallery.appendChild(cell);
          }
        } catch (err) {
          console.error("JSON parsing error:", err);
        }
      })
      .catch((error) => {
        console.error("Error loading gallery:", error);
      });
  });