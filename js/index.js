document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        once: true,
    });

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

    const cursorGlow = document.getElementById('cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    const rotatingTextSpan = document.getElementById('rotating-text-span');
    if (rotatingTextSpan) {
        const words = ['Negócios', 'Marcas', 'Ideias'];
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

    const accordionItems = document.querySelectorAll('.service-accordion-item');
    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.service-accordion-header');
        if (index === 0) {
            item.classList.add('active');
        }
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            accordionItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    const simulator = document.getElementById('budget-simulator');
    if (simulator) {
        const allCheckboxes = simulator.querySelectorAll('input[type="checkbox"]');
        const selectedServicesInput = document.getElementById('selected-services');
        const form = simulator.querySelector('form');

        // Função para ativar/desativar as checkboxes de manutenção
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

        // Função para atualizar o campo escondido com os serviços selecionados
        function updateSummary() {
            const selectedServices = [];
            allCheckboxes.forEach(input => {
                if (input.checked) {
                    // Ignora a checkbox de manutenção para não a adicionar como um serviço separado
                    if (input.name === 'automation_maintenance') {
                        return;
                    }

                    let serviceLabel = input.dataset.label;

                    // Verifica se é um serviço de automação e se a manutenção está selecionada
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
            // Junta todos os serviços selecionados numa única linha de texto
            selectedServicesInput.value = selectedServices.join('; ');
        }

        // Adiciona um "ouvinte" a cada checkbox
        allCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                // Se for uma checkbox de automação, lida com a opção de manutenção
                if (checkbox.name === 'automation_level') {
                    handleMaintenanceCheckboxes();
                }
                // Atualiza sempre o resumo quando algo muda
                updateSummary();
            });
        });

        // Garante que o resumo é atualizado um instante antes do envio do formulário
        if (form) {
            form.addEventListener('submit', updateSummary);
        }

        // Executa as funções uma vez quando a página carrega
        handleMaintenanceCheckboxes();
        updateSummary();
    }

    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#a78bfa" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#c4b5fd", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": {
                    "grab": { "distance": 140, "line_opacity": 1 },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        });
    }

    // ... (todo o seu código JS anterior fica aqui)

    // Inicialização do Swiper.js para o carrossel de parceiros
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1, // Mostra 1 slide por vez em ecrãs pequenos
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
        // Responsividade para ecrãs maiores
        breakpoints: {
            // quando a largura da tela for >= 768px (tablets)
            768: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            // quando a largura da tela for >= 1024px (desktops)
            1024: {
                slidesPerView: 3,
                spaceBetween: 40
            }
        }
    });
});