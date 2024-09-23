document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-gallery img');
    let currentImage = 0;

    function changeImage() {
        images[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % images.length;
        images[currentImage].classList.add('active');
    }

    images[currentImage].classList.add('active');
    setInterval(changeImage, 5000);

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.about-content', {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
            trigger: '.about-content',
            start: 'top 80%',
        }
    });

    gsap.from('.program-card', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.program-grid',
            start: 'top 80%',
        }
    });

    gsap.from('.faculty-card', {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.faculty-slider',
            start: 'top 80%',
        }
    });

    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        console.log('Form submitted:', { name, email, message });
        contactForm.reset();
    });

    const smoothScroll = (target) => {
        const element = document.querySelector(target);
        window.scrollTo({
            top: element.offsetTop - 80,
            behavior: 'smooth'
        });
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScroll(anchor.getAttribute('href'));
        });
    });

    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    const facultySlider = document.querySelector('.faculty-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    facultySlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - facultySlider.offsetLeft;
        scrollLeft = facultySlider.scrollLeft;
    });

    facultySlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    facultySlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    facultySlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - facultySlider.offsetLeft;
        const walk = (x - startX) * 3;
        facultySlider.scrollLeft = scrollLeft - walk;
    });

    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed;
            element.style.transform = `translateY(${window.scrollY * speed}px)`;
        });
    });
});
