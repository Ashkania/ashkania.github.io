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

