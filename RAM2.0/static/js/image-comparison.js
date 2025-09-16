document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector('.comparison-container');
    const slider = document.querySelector('.slider');
    const image2Container = document.getElementById('image2-container');
    const image1 = document.getElementById('image1');
    const image2 = document.getElementById('image2');

    let isDragging = false;
    let currentImage = 'Derain';

    function handleSliderMove(e) {
        if (!isDragging) return;

        const rect = container.getBoundingClientRect();
        let x;

        if (e.type === 'touchmove') {
            x = e.touches[0].clientX - rect.left;
        } else {
            x = e.clientX - rect.left;
        }
        const percentage = (x / rect.width) * 100;
        const limitedPercentage = Math.min(Math.max(percentage, 0), 100);
        // Move the slider according to the calculated percentage
        slider.style.left = `${limitedPercentage}%`;

        // Update the width of the image2 container based on the slider position
        image2Container.style.width = `${limitedPercentage}%`;
    }

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        e.preventDefault();
    });

    document.addEventListener('mousemove', handleSliderMove);
    document.addEventListener('mouseup', () => isDragging = false);

    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        e.preventDefault(); // Prevent scrolling while dragging
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging) {
            e.preventDefault();
            handleSliderMove(e);
        }
    });

    document.addEventListener('touchend', () => isDragging = false);

    document.getElementById('imageSelector').addEventListener('change', function() {
        currentImage = this.value;
        
        // Update both active buttons
        document.querySelectorAll('.method-button.active').forEach(button => {
            const imageNum = button.dataset.image;
            const method = button.dataset.method;
            const image = document.getElementById(`image${imageNum}`);
            image.src = `images/${currentImage}/${method}.png`;
        });
    });

    document.querySelectorAll('.method-button').forEach(button => {
        button.addEventListener('click', function() {
            const selector = this.closest('.method-selector');
            selector.querySelectorAll('.method-button').forEach(btn => {
                btn.classList.remove('active');
            });

            this.classList.add('active');

            const imageNum = this.dataset.image;
            const method = this.dataset.method; // Convert method to lowercase
            const image = document.getElementById(`image${imageNum}`);
            const imagePath = `images/${currentImage}/${method}.png`;

            image.src = imagePath;
        });
    });

    // Set default buttons on load
    window.addEventListener('load', () => {
        const leftDefault = document.querySelector('.left-selector [data-method="LQ"]');
        const rightDefault = document.querySelector('.right-selector [data-method="Ours"]');

        if (leftDefault) {
            leftDefault.classList.add('active');
            leftDefault.click();
        }

        if (rightDefault) {
            rightDefault.classList.add('active');
            rightDefault.click();
        }
    });
});
