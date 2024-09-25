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

    gsap.utils.toArray('.fade-in').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
            }
        });
    });

    gsap.from('.highlight-card', {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.highlight-grid',
            start: 'top 80%',
        }
    });

    gsap.from('.event-item', {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.event-list',
            start: 'top 80%',
        }
    });

    const gallerySlider = document.querySelector('.gallery-slider');
    const galleryImages = document.querySelectorAll('.gallery-slider img');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    let currentSlide = 0;

    function showSlide(index) {
        gallerySlider.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + galleryImages.length) % galleryImages.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % galleryImages.length;
        showSlide(currentSlide);
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

    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

  const bookmarklets = document.querySelectorAll('.bookmarklet-link');
bookmarklets.forEach(bookmarklet => {
    bookmarklet.addEventListener('click', (e) => {
        e.preventDefault();
        const bookmarkletCode = bookmarklet.getAttribute('href');
        navigator.clipboard.writeText(bookmarkletCode).then(() => {
            alert('Bookmarklet copied to clipboard! Drag it to your bookmarks bar to use.');
            window.open(bookmarkletCode, '_blank');
        }).catch(err => {
            console.error('Failed to copy bookmarklet: ', err);
        });
    });
});
