document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 400,
        once: true,
    });

    // Lógica do Menu Mobile (sem alterações)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function openMenu() {
        mobileMenu.classList.remove('translate-x-full');
        mobileMenuOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.add('translate-x-full');
        mobileMenuOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    }

    mobileMenuButton.addEventListener('click', () => {
        if (mobileMenu.classList.contains('translate-x-full')) {
            openMenu();
        } else {
            closeMenu();
        }
    });
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    mobileMenuOverlay.addEventListener('click', closeMenu);


    // Lógica do Cursor Glow (sem alterações)
    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // Lógica do Texto Rotativo (sem alterações)
    const rotatingTextSpan = document.getElementById('rotating-text-span');
    if (rotatingTextSpan) {
        const words = ['Resultados', 'Marcas', 'Ideias'];
        let wordIndex = 0;

        setInterval(() => {
            wordIndex = (wordIndex + 1) % words.length;
            rotatingTextSpan.style.opacity = '0';
            setTimeout(() => {
                rotatingTextSpan.textContent = words[wordIndex];
                rotatingTextSpan.style.opacity = '1';
            }, 400);
        }, 3000);
    }

    // --- NOVA LÓGICA PARA AS ABAS DE SERVIÇOS ---
    const serviceTabs = document.querySelectorAll('.service-tab-btn');
    const servicePanels = document.querySelectorAll('.service-content-panel');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove a classe 'active' de todas as abas
            serviceTabs.forEach(t => {
                t.classList.remove('active', 'bg-violet-600', 'text-white');
                t.classList.add('bg-white', 'text-indigo-800');
            });

            // Adiciona a classe 'active' na aba clicada
            tab.classList.add('active', 'bg-violet-600', 'text-white');
            tab.classList.remove('bg-white', 'text-indigo-800');

            // Esconde todos os painéis de conteúdo
            servicePanels.forEach(panel => {
                panel.classList.add('hidden');
            });

            // Mostra o painel de conteúdo correspondente
            const targetPanelId = tab.dataset.target;
            const targetPanel = document.getElementById(targetPanelId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });


    // Lógica do Simulador de Orçamento (sem alterações)
    const simulator = document.getElementById('budget-simulator');
    if (simulator) {
        // (O código original do simulador permanece aqui, sem modificações)
        const allCheckboxes = simulator.querySelectorAll('input[type="checkbox"]');
        const selectedServicesInput = document.getElementById('selected-services');
        const form = simulator.querySelector('form');

        function handleMaintenanceCheckboxes() {
            const automationLevels = simulator.querySelectorAll('input[name="automation_level"]');
            automationLevels.forEach(levelCheckbox => {
                const parentContainer = levelCheckbox.closest('.p-3');
                const maintenanceCheckbox = parentContainer.querySelector('input[name="automation_maintenance"]');
                if (maintenanceCheckbox) {
                    maintenanceCheckbox.disabled = !levelCheckbox.checked;
                    if (!levelCheckbox.checked) {
                        maintenanceCheckbox.checked = false;
                    }
                }
            });
        }

        function updateSummary() {
            const selectedServices = [];
            allCheckboxes.forEach(input => {
                if (input.checked) {
                    if (input.name === 'automation_maintenance') {
                        return;
                    }
                    let serviceLabel = input.dataset.label;
                    if (input.name === 'automation_level') {
                        const parentContainer = input.closest('.p-3');
                        const maintenanceCheckbox = parentContainer.querySelector('input[name="automation_maintenance"]');
                        if (maintenanceCheckbox && maintenanceCheckbox.checked) {
                            serviceLabel += ' (com manutenção)';
                        }
                    }
                    selectedServices.push(serviceLabel);
                }
            });
            selectedServicesInput.value = selectedServices.join('; ');
        }
        allCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                if (checkbox.name === 'automation_level') {
                    handleMaintenanceCheckboxes();
                }
                updateSummary();
            });
        });
        if (form) {
            form.addEventListener('submit', updateSummary);
        }
        handleMaintenanceCheckboxes();
        updateSummary();
    }


    // Lógica do Particles.js (sem alterações)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', { /* ... configuração original ... */
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#a78bfa" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#c4b5fd", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 140, "line_opacity": 1 }, "push": { "particles_nb": 4 } } },
            "retina_detect": true
        });
    }

    // Lógica do Swiper.js (sem alterações)
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 40 }
        }
    });
});