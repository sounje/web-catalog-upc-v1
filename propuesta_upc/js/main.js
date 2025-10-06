// UPC Navigation and Footer JavaScript
document.addEventListener('DOMContentLoaded', function() {
    $('#modal-container').load('modals/m-curso-detalle.html');
    $("#results_search").hide();
    /*
    $('#coursesTable').DataTable({
        pageLength: 10,
        lengthChange: false,
        searching: true,
        ordering: true
      });
    */
    // Hacer las filas de la tabla clickeables
            $('#coursesTable tbody').on('click', 'tr', function() {
                // Obtener los datos de la fila
                const codcurso = $(this).find('td:eq(0)').text();
                const curso = $(this).find('td:eq(1)').text();
                const programa = $(this).find('td:eq(2)').text();
                const credito = $(this).find('td:eq(3)').text();
                const facultad = $(this).find('td:eq(4)').text();

                // Llenar el modal con los datos
                setTimeout(() => {
                    $('#modal-curso-nombre').text(codcurso + ' - ' + curso);
                    $('#modal-programa').text(programa);
                    $('#modal-credito').text(credito);
                    $('#modal-facultad').text(facultad);
                    
                    // Mostrar el modal
                    $('#cursoDetalleModal').modal('show');
                }, 100);
                
                // Agregar efecto visual a la fila seleccionada
                $('#coursesTable tbody tr').removeClass('table-active');
                $(this).addClass('table-active');
            });

            $('#buscar').on('click', function() {
                $("#before_search").hide();
                // Destruimos el dataTable si ya existe
                if ($.fn.DataTable.isDataTable('#coursesTable')) {
                    $('#coursesTable').DataTable().destroy();
                }
                $("#results_search").show();
                // Inicializar DataTables con configuración personalizada
                setTimeout(() => {
                    let table = $('#coursesTable').DataTable({
                                    language: {
                                        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json'
                                    },
                                    pageLength: 10,
                                    responsive: true,
                                    columnDefs: [
                                        { targets: '_all', className: 'align-middle' }
                                    ],
                                    drawCallback: function() {
                                        // Re-bind click events after table redraw
                                        $('#coursesTable tbody tr').off('click').on('click', function() {
                                            const codcurso = $(this).find('td:eq(0)').text();
                                            const curso = $(this).find('td:eq(1)').text();
                                            const programa = $(this).find('td:eq(2)').text();
                                            const credito = $(this).find('td:eq(3)').text();
                                            const facultad = $(this).find('td:eq(4)').text();

                                            setTimeout(() => {
                                                $('#modal-curso-nombre').text(codcurso + ' - ' + curso);
                                                $('#modal-programa').text(programa);
                                                $('#modal-credito').text(credito);
                                                $('#modal-facultad').text(facultad);
                                                $('#cursoDetalleModal').modal('show');
                                            }, 100);
                                            
                                            $('#coursesTable tbody tr').removeClass('table-active');
                                            $(this).addClass('table-active');
                                        });
                                    }
                                });
                    table.columns.adjust().draw();
                }, 100);
            });

            $("#limpiar").on('click', function() {
                $("#before_search").show();
                $("#results_search").hide();
            });

    // Initialize navigation functionality
    initNavigation();
    
    // Initialize dropdown menus
    initDropdowns();
    
    // Initialize footer interactions
    initFooter();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navbar.contains(event.target);
        const isNavOpen = navbarCollapse.classList.contains('show');
        
        if (!isClickInsideNav && isNavOpen) {
            navbarToggler.click();
        }
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

// Enhanced dropdown functionality
function initDropdowns() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        const dropdown = new bootstrap.Dropdown(toggle);
        const dropdownMenu = toggle.nextElementSibling;
        
        // Add hover effect on desktop
        if (window.innerWidth > 991) {
            toggle.parentElement.addEventListener('mouseenter', function() {
                dropdown.show();
            });
            
            toggle.parentElement.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!toggle.parentElement.matches(':hover')) {
                        dropdown.hide();
                    }
                }, 100);
            });
        }
        
        // Add animation classes
        toggle.addEventListener('shown.bs.dropdown', function() {
            dropdownMenu.classList.add('animate-fade-in-up');
        });
        
        toggle.addEventListener('hidden.bs.dropdown', function() {
            dropdownMenu.classList.remove('animate-fade-in-up');
        });
    });
}

// Footer functionality
function initFooter() {
    // Animate footer links on scroll
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, { threshold: 0.1 });
    
    footerLinks.forEach(link => observer.observe(link));
    
    // Add click tracking for footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track link clicks (for analytics)
            const linkText = this.textContent.trim();
            const linkUrl = this.href;
            
            console.log(`Footer link clicked: ${linkText} -> ${linkUrl}`);
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Quick links functionality
    const quickLinks = document.querySelectorAll('.quick-links .btn');
    quickLinks.forEach(btn => {
        btn.addEventListener('click', function(e) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 1000);
        });
    });
}

// Accessibility features
function initAccessibility() {
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'visually-hidden-focusable btn btn-primary position-absolute top-0 start-0';
    skipLink.style.zIndex = '9999';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation for dropdowns
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all open dropdowns
            const openDropdowns = document.querySelectorAll('.dropdown-menu.show');
            openDropdowns.forEach(menu => {
                const toggle = menu.previousElementSibling;
                if (toggle) {
                    bootstrap.Dropdown.getInstance(toggle)?.hide();
                }
            });
        }
    });
    
    // Focus management for mobile menu
    const mobileMenuToggle = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.navbar-collapse');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            setTimeout(() => {
                if (mobileMenu.classList.contains('show')) {
                    const firstLink = mobileMenu.querySelector('.nav-link');
                    firstLink?.focus();
                }
            }, 150);
        });
    }
    
    // Announce dynamic content changes
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'visually-hidden';
    announcer.id = 'announcer';
    document.body.appendChild(announcer);
}

// Performance optimizations
function initPerformanceOptimizations() {
    // Lazy load footer images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalLinks = [
        'https://pregrado.upc.edu.pe/?utm_source=Organico&utm_medium=banner',
        'https://epe.upc.edu.pe/?utm_source=Organico&utm_medium=banner',
        'https://postgrado.upc.edu.pe/?utm_source=Organico&utm_medium=banner'
    ];
    
    criticalLinks.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link;
        document.head.appendChild(prefetchLink);
    });
    
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        // Add scroll-based effects here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Custom events
document.addEventListener('navigationReady', function() {
    console.log('UPC Navigation is ready');
    
    // Dispatch custom event for other scripts
    const event = new CustomEvent('upcNavigationLoaded', {
        detail: {
            timestamp: Date.now(),
            version: '1.0.0'
        }
    });
    document.dispatchEvent(event);
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('UPC Navigation Error:', e.error);
    
    // Send error to analytics or logging service
    // trackError(e.error);
});

// Analytics helper functions
function trackNavigation(linkText, destination) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', 'navigation_click', {
            'link_text': linkText,
            'destination': destination,
            'section': 'header'
        });
    }
    
    console.log(`Navigation tracked: ${linkText} -> ${destination}`);
}

function trackFooterInteraction(element, action) {
    // Track footer interactions
    if (typeof gtag !== 'undefined') {
        gtag('event', 'footer_interaction', {
            'element': element,
            'action': action
        });
    }
    
    console.log(`Footer interaction: ${element} - ${action}`);
}

// Initialize custom navigation tracking
document.querySelectorAll('.navbar-nav a, .footer a').forEach(link => {
    link.addEventListener('click', function(e) {
        const linkText = this.textContent.trim();
        const destination = this.href;
        const section = this.closest('.navbar') ? 'header' : 'footer';
        
        trackNavigation(linkText, destination);
    });
});

// Responsive navigation adjustments
function handleResize() {
    const navbar = document.querySelector('.navbar');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 991) {
        // Mobile adjustments
        dropdowns.forEach(dropdown => {
            dropdown.classList.add('mobile-dropdown');
        });
    } else {
        // Desktop adjustments
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('mobile-dropdown');
        });
    }
}

// Initialize resize handler
window.addEventListener('resize', debounce(handleResize, 250));
handleResize(); // Initial call

// Dispatch ready event
document.dispatchEvent(new Event('navigationReady'));
