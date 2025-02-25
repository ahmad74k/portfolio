document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.querySelector('.projects-grid');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const scrollIndicators = document.querySelector('.scroll-indicators');
    
    const cardWidth = 280 + 32; // card width + gap
    const visibleCards = Math.floor(projectsGrid.clientWidth / cardWidth);
    const totalCards = projectCards.length;
    const totalDots = Math.ceil((totalCards - visibleCards) / visibleCards) + 1;

    // Create scroll dots
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('div');
        dot.classList.add('scroll-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToPosition(i));
        scrollIndicators.appendChild(dot);
    }

    function scrollToPosition(index) {
        const scrollAmount = index * (cardWidth * visibleCards);
        projectsGrid.scrollLeft = scrollAmount;
        updateIndicators();
    }

    function updateIndicators() {
        const scrollPercentage = projectsGrid.scrollLeft / (projectsGrid.scrollWidth - projectsGrid.clientWidth);
        const activeIndex = Math.round(scrollPercentage * (totalDots - 1));
        
        document.querySelectorAll('.scroll-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });

        // Update arrow buttons
        prevBtn.style.display = projectsGrid.scrollLeft <= 0 ? 'none' : 'block';
        nextBtn.style.display = 
            projectsGrid.scrollLeft >= (projectsGrid.scrollWidth - projectsGrid.clientWidth - 10)
            ? 'none' : 'block';
    }

    // Scroll button handlers
    prevBtn.addEventListener('click', () => {
        projectsGrid.scrollLeft -= cardWidth * visibleCards;
        updateIndicators();
    });

    nextBtn.addEventListener('click', () => {
        projectsGrid.scrollLeft += cardWidth * visibleCards;
        updateIndicators();
    });

    // Smooth scroll functionality
    let isDown = false;
    let startX;
    let scrollLeft;

    projectsGrid.addEventListener('mousedown', (e) => {
        isDown = true;
        projectsGrid.style.cursor = 'grabbing';
        startX = e.pageX - projectsGrid.offsetLeft;
        scrollLeft = projectsGrid.scrollLeft;
    });

    projectsGrid.addEventListener('mouseleave', () => {
        isDown = false;
        projectsGrid.style.cursor = 'grab';
    });

    projectsGrid.addEventListener('mouseup', () => {
        isDown = false;
        projectsGrid.style.cursor = 'grab';
    });

    projectsGrid.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - projectsGrid.offsetLeft;
        const walk = (x - startX) * 2;
        projectsGrid.scrollLeft = scrollLeft - walk;
        updateIndicators();
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Reset scroll position when filtering
            projectsGrid.scrollLeft = 0;
            updateIndicators();
        });
    });

    // Initial setup - make grid draggable
    projectsGrid.style.cursor = 'grab';
    updateIndicators();

    // Update indicators on scroll
    projectsGrid.addEventListener('scroll', updateIndicators);

    // Add scroll animation for projects section
    const projectsSection = document.querySelector('#projects');
    let hasAnimated = false;

    // Add smooth scroll utility function
    function smoothScrollTo(element, target, duration) {
        const start = element.scrollLeft;
        const distance = target - start;
        const startTime = performance.now();

        function easeInOutCubic(t) {
            return t < 0.5 
                ? 4 * t * t * t 
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            element.scrollLeft = start + (distance * easeInOutCubic(progress));

            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    // Update the observer animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                const timeline = async () => {
                    await new Promise(resolve => setTimeout(resolve, 500));
                    // Reduced scroll distance and simplified animation
                    smoothScrollTo(projectsGrid, 100, 1000); // Reduced distance to 100px
                    await new Promise(resolve => setTimeout(resolve, 1200));
                    smoothScrollTo(projectsGrid, 0, 800);
                    hasAnimated = true;
                };
                timeline();
                
                projectsGrid.addEventListener('scroll', updateIndicators);
            }
        });
    }, {
        threshold: 0.3
    });

    observer.observe(projectsSection);

    // Mobile Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileNavToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile nav when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileNavToggle.textContent = '☰';
        });
    });

    // Touch events for project cards
    projectsGrid.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - projectsGrid.offsetLeft;
        scrollLeft = projectsGrid.scrollLeft;
    }, { passive: true });

    projectsGrid.addEventListener('touchend', () => {
        isDown = false;
    });

    projectsGrid.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - projectsGrid.offsetLeft;
        const walk = (x - startX) * 2;
        projectsGrid.scrollLeft = scrollLeft - walk;
        updateIndicators();
    }, { passive: false });

    // Adjust scroll animation for mobile
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        const scrollDistance = 80; // Reduced distance for mobile
        const scrollDuration = 800;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    const timeline = async () => {
                        await new Promise(resolve => setTimeout(resolve, 300));
                        smoothScrollTo(projectsGrid, scrollDistance, scrollDuration);
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        smoothScrollTo(projectsGrid, 0, scrollDuration);
                        hasAnimated = true;
                    };
                    timeline();
                }
            });
        }, { threshold: 0.2 });

        observer.observe(projectsSection);
    }
});
