document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector('.navbar');
    const background = document.querySelector('.particle-bg');
    const toggleDescription = document.querySelector('.toggle-description');
    const description = document.querySelector('.description');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        } else {
            navbar.style.backgroundColor = 'transparent';
        }
    });

    for (let i = 0; i < 100; i++) {
        createParticle();
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * window.innerWidth}px`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        background.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
            createParticle();
        });
    }

    toggleDescription.addEventListener('click', () => {
        description.style.display = description.style.display === 'none' || description.style.display === '' ? 'block' : 'none';
    });

    const viewCount = document.querySelector('.view-number');
    viewCount.textContent = 123; 
});
