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
            if(cursorGlow) {
                document.addEventListener('mousemove', (e) => {
                    cursorGlow.style.left = e.clientX + 'px';
                    cursorGlow.style.top = e.clientY + 'px';
                });
            }
            
            const rotatingTextSpan = document.getElementById('rotating-text-span');
            if(rotatingTextSpan) {
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

            const budgetSimulator = document.getElementById('budget-simulator');
            if (budgetSimulator) {
                const allInputs = budgetSimulator.querySelectorAll('input[type="radio"], input[type="checkbox"]');
                const summaryList = document.getElementById('summary-list');
                const hiddenTextarea = document.getElementById('selected-services');
                const automationRadios = budgetSimulator.querySelectorAll('input[name="automation_level"]');
                const maintenanceCheckboxes = budgetSimulator.querySelectorAll('input[name="automation_maintenance"]');

                function updateSummary() {
                    let summaryItems = [];
                    let servicesText = "";

                    const selectedAutomation = Array.from(automationRadios).find(radio => radio.checked);
                    maintenanceCheckboxes.forEach(checkbox => {
                        if (selectedAutomation) { // Only enable if a parent is selected
                           checkbox.disabled = false;
                        } else {
                            checkbox.disabled = true;
                            checkbox.checked = false;
                        }
                    });

                    allInputs.forEach(input => {
                        if (input.checked && input.dataset.label) {
                             // Check if it's a maintenance checkbox and if its parent is selected
                            if(input.name === 'automation_maintenance') {
                                const parentRadio = Array.from(automationRadios).find(radio => radio.checked);
                                if(parentRadio){
                                     summaryItems.push(input.dataset.label);
                                }
                            } else {
                                summaryItems.push(input.dataset.label);
                            }
                        }
                    });

                    if (summaryList) {
                        if (summaryItems.length > 0) {
                            summaryList.innerHTML = summaryItems.map(item => `<div class="text-indigo-800 font-medium">&#10003; ${item}</div>`).join('');
                            servicesText = summaryItems.join(';\n');
                        } else {
                            summaryList.innerHTML = '<p class="text-gray-500">Os seus itens selecionados aparecerão aqui...</p>';
                            servicesText = "Nenhum serviço selecionado.";
                        }
                    }
                    
                    if (hiddenTextarea) {
                        hiddenTextarea.value = servicesText;
                    }
                }
                
                // Add listener to the form to populate hidden field on submit
                const budgetForm = document.getElementById('budget-form');
                if(budgetForm) {
                    budgetForm.addEventListener('submit', updateSummary);
                }


                allInputs.forEach(input => {
                    input.addEventListener('change', updateSummary);
                });
                
                updateSummary();
            }

            if(typeof particlesJS !== 'undefined') {
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
        });