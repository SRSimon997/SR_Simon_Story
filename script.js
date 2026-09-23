document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // ЛОГИКА БОКОВЫХ ПАНЕЛЕЙ
    // =========================================
    const leftTrigger = document.getElementById('leftTrigger');
    const rightTrigger = document.getElementById('rightTrigger');
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');
    const leftClose = document.getElementById('leftClose');
    const rightClose = document.getElementById('rightClose');

    // Открытие/закрытие левой панели
    leftTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        leftSidebar.classList.add('active');
        rightSidebar.classList.remove('active');
    });

    leftClose.addEventListener('click', () => {
        leftSidebar.classList.remove('active');
    });

    // Открытие/закрытие правой панели
    rightTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        rightSidebar.classList.add('active');
        leftSidebar.classList.remove('active');
    });

    rightClose.addEventListener('click', () => {
        rightSidebar.classList.remove('active');
    });

    // Закрытие при клике вне панелей
    document.addEventListener('click', (e) => {
        const isClickInsideLeft = leftSidebar.contains(e.target) || leftTrigger.contains(e.target);
        const isClickInsideRight = rightSidebar.contains(e.target) || rightTrigger.contains(e.target);

        if (!isClickInsideLeft && leftSidebar.classList.contains('active')) {
            leftSidebar.classList.remove('active');
        }
        if (!isClickInsideRight && rightSidebar.classList.contains('active')) {
            rightSidebar.classList.remove('active');
        }
    });

    // Закрытие при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            leftSidebar.classList.remove('active');
            rightSidebar.classList.remove('active');
        }
    });

    // =========================================
    // ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
    // =========================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Закрываем меню перед скроллом
                leftSidebar.classList.remove('active');
                
                // Плавный скролл с небольшим отступом сверху
                const offsetTop = targetSection.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =========================================
    // АНИМАЦИИ ПРИ СКРОЛЛЕ (Intersection Observer)
    // =========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Элемент начнет появляться, когда 15% его высоты будет в видимой зоне
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Отключаем наблюдение после срабатывания, чтобы анимация не повторялась
                obs.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
});