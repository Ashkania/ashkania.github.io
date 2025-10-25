document.querySelectorAll('.toggle').forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        const nestedList = this.nextElementSibling;
        const arrow = this.querySelector('.arrow');
        if (nestedList) {
            const isVisible = nestedList.style.display === 'block';
            nestedList.style.display = isVisible ? 'none' : 'block';
            arrow.textContent = isVisible ? '►' : '▼';
        }
    });
});

// Get modal elements
const modal = document.getElementById("erModal");
const erLink = document.querySelector(".er-diagram-link");
const closeBtn = document.querySelector(".close");
const modalImg = document.getElementById("erImage");

// Variables for dragging
let isDragging = false;
let startX, startY;
let translateX = 0, translateY = 0;
let currentTranslateX = 0, currentTranslateY = 0;

// Open modal when ER Diagram link is clicked
erLink.addEventListener("click", function(event) {
    event.preventDefault();
    modal.style.display = "block";
    modalImg.classList.remove('zoomed');
    modalImg.style.transform = "scale(1)";
    scale = 1;
    translateX = 0;
    translateY = 0;
    currentTranslateX = 0;
    currentTranslateY = 0;
});

// Close modal when X is clicked
closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
});

// Close modal when clicking outside the image
window.addEventListener("click", function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Toggle zoom on image click
modalImg.addEventListener("click", function(event) {
    event.stopPropagation();
    this.classList.toggle("zoomed");
    
    if (this.classList.contains("zoomed")) {
        this.style.cursor = "grab";
    } else {
        this.style.cursor = "zoom-in";
        scale = 1;
        translateX = 0;
        translateY = 0;
        currentTranslateX = 0;
        currentTranslateY = 0;
        updateTransform();
    }
});

// Mouse down - start dragging
modalImg.addEventListener("mousedown", function(event) {
    if (scale > 1) {
        isDragging = true;
        startX = event.clientX - currentTranslateX;
        startY = event.clientY - currentTranslateY;
        this.style.cursor = "grabbing";
        event.preventDefault();
    }
});

// Mouse move - drag image
modalImg.addEventListener("mousemove", function(event) {
    if (isDragging && scale > 1) {
        event.preventDefault();
        translateX = event.clientX - startX;
        translateY = event.clientY - startY;
        updateTransform();
    }
});

// Mouse up - stop dragging
modalImg.addEventListener("mouseup", function() {
    if (isDragging) {
        isDragging = false;
        currentTranslateX = translateX;
        currentTranslateY = translateY;
        this.style.cursor = scale > 1 ? "grab" : "zoom-in";
    }
});

// Mouse leave - stop dragging if user leaves image
modalImg.addEventListener("mouseleave", function() {
    if (isDragging) {
        isDragging = false;
        currentTranslateX = translateX;
        currentTranslateY = translateY;
        this.style.cursor = scale > 1 ? "grab" : "zoom-in";
    }
});

// Wheel zoom
let scale = 1;
modalImg.addEventListener("wheel", function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    scale = Math.min(Math.max(1, scale + delta), 4);
    
    if (scale === 1) {
        translateX = 0;
        translateY = 0;
        currentTranslateX = 0;
        currentTranslateY = 0;
    }
    
    this.style.cursor = scale > 1 ? "grab" : "zoom-in";
    this.classList.remove("zoomed");
    updateTransform();
});

// Helper function to update transform
function updateTransform() {
    modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Reset zoom when modal is closed
modal.addEventListener("click", function() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    currentTranslateX = 0;
    currentTranslateY = 0;
    modalImg.style.transform = "scale(1)";
    modalImg.classList.remove("zoomed");
});