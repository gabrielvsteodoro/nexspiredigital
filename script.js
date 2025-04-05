document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.background-images img').forEach((img, index) => {
            const speed = (index + 1) * 0.2;
            img.style.transform = `translateY(${-scrollY * speed}px)`;
        });
    });
});
