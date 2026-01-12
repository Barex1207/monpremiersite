// ============================================
// MENU MOBILE ET DROPDOWN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    menuToggle.addEventListener('click', function() {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'var(--primary-dark)';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            navLinks.style.zIndex = '1000';
            
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.position = 'static';
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'none';
                    menu.style.boxShadow = 'none';
                    menu.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    menu.style.marginLeft = '20px';
                    menu.style.marginTop = '10px';
                }
            });
        }
    });
    
    if (window.innerWidth > 992) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', function() {
                const menu = this.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                const menu = this.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                }
            });
        });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navLinks.style.display = 'none';
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'row';
            navLinks.style.position = 'static';
            navLinks.style.backgroundColor = 'transparent';
            navLinks.style.padding = '0';
            navLinks.style.boxShadow = 'none';
            
            dropdowns.forEach(dropdown => {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu && !dropdown.classList.contains('dropdown-mobile-open')) {
                    menu.style.position = 'absolute';
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                    menu.style.backgroundColor = 'var(--white)';
                    menu.style.marginLeft = '0';
                    menu.style.marginTop = '0';
                }
            });
        } else {
            navLinks.style.display = 'none';
        }
    });
    
    // ============================================
    // CALCULATEUR DE TARIFS
    // ============================================
    
    // Gestion des onglets Transport/Colis
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Gestion Aller simple / Aller-retour
    const tripBtns = document.querySelectorAll('.trip-btn');
    const transportForms = document.querySelectorAll('.transport-form');
    
    tripBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tripType = this.getAttribute('data-trip');
            
            tripBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            transportForms.forEach(form => {
                form.classList.remove('active');
            });
            
            document.getElementById(`${tripType}-form`).classList.add('active');
        });
    });
    
    // Gestion du sélecteur de passagers
    document.querySelectorAll('.passenger-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const isPlus = this.classList.contains('plus');
            const selector = this.closest('.passenger-selector');
            const input = selector.querySelector('input');
            let value = parseInt(input.value);
            
            if (isPlus && value < 10) {
                value++;
            } else if (!isPlus && value > 1) {
                value--;
            }
            
            input.value = value;
        });
    });
    
    // Gestion de la date (définir la date minimale à aujourd'hui)
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.min = today;
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        input.value = tomorrow.toISOString().split('T')[0];
    });
    
    // Soumission du formulaire transport
    document.querySelectorAll('.transport-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const departure = this.querySelector('select').value;
            const arrival = this.querySelectorAll('select')[1].value;
            const passengers = this.querySelector('input[type="number"]').value;
            
            alert(`Recherche de voyage:\nDépart: ${departure}\nArrivée: ${arrival}\nPassagers: ${passengers}\n\n(Fonctionnalité de recherche en développement)`);
        });
    });
    
    // ============================================
    // BASE DE DONNÉES DES NUMÉROS PAR VILLE
    // ============================================
    const cityPhoneNumbers = {
        'cotonou': { phone: '+229 61 11 33 44', name: 'Cotonou' },
        'lome': { phone: '+228 22 21 11 22', name: 'Lomé' },
        'accra': { phone: '+233 30 27 11 33', name: 'Accra' },
        'abidjan': { phone: '+225 27 22 11 44', name: 'Abidjan' },
        'ouaga': { phone: '+226 25 31 11 55', name: 'Ouagadougou' },
        'kara': { phone: '+228 61 11 33', name: 'Kara' },
        'sokode': { phone: '+228 61 64 76 40', name: 'Sokodé' },
        'dapaong': { phone: '+228 61 11 30', name: 'Dapaong' }
    };
    
    // ============================================
    // SUIVI DE COLIS
    // ============================================
    document.getElementById('colis-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const trackingNumber = document.getElementById('tracking-number').value;
        const departureCity = document.getElementById('colis-departure').value;
        const destinationCity = document.getElementById('colis-destination').value;
        
        if (!trackingNumber || !departureCity || !destinationCity) {
            alert('Veuillez remplir tous les champs');
            return;
        }
        
        const cityInfo = cityPhoneNumbers[destinationCity];
        
        if (!cityInfo) {
            alert('Numéro non disponible pour cette destination');
            return;
        }
        
        document.getElementById('result-tracking-number').textContent = trackingNumber;
        document.getElementById('result-departure').textContent = cityPhoneNumbers[departureCity]?.name || departureCity;
        document.getElementById('result-destination').textContent = cityInfo.name;
        document.getElementById('result-phone-number').textContent = cityInfo.phone;
        
        document.getElementById('tracking-result').style.display = 'block';
        
        document.getElementById('tracking-result').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    });
    
    // ============================================
    // GESTION DES BOUTONS D'ACTION
    // ============================================
    
    // Copier le numéro de téléphone
    document.getElementById('copy-number').addEventListener('click', function() {
        const phoneNumber = document.getElementById('result-phone-number').textContent;
        
        navigator.clipboard.writeText(phoneNumber).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> Numéro copié!';
            this.style.backgroundColor = '#4CAF50';
            this.style.color = 'white';
            this.style.borderColor = '#4CAF50';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.backgroundColor = '';
                this.style.color = '';
                this.style.borderColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Erreur lors de la copie: ', err);
            alert('Impossible de copier le numéro');
        });
    });
    
    // Appeler maintenant
    document.getElementById('call-now').addEventListener('click', function() {
        const phoneNumber = document.getElementById('result-phone-number').textContent;
        const cleanNumber = phoneNumber.replace(/\s+/g, '').replace('+', '');
        
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            window.location.href = `tel:${cleanNumber}`;
        } else {
            alert(`Pour appeler: ${phoneNumber}\n\nSur mobile, cette fonctionnalité composerait automatiquement le numéro.`);
        }
    });
    
    // ============================================
    // AUTO-COMPLÉTION INTELLIGENTE
    // ============================================
    document.getElementById('colis-destination').addEventListener('change', function() {
        const selectedCity = this.value;
        
        if (selectedCity && cityPhoneNumbers[selectedCity]) {
            const cityInfo = cityPhoneNumbers[selectedCity];
            console.log(`Numéro pour ${cityInfo.name}: ${cityInfo.phone}`);
            
            document.getElementById('tracking-number').placeholder = `Ex: NT-${new Date().getFullYear()}-${selectedCity.toUpperCase()}`;
        }
    });
    
    // ============================================
    // REDIRECTION DES SERVICES
    // ============================================
    
    function switchToTab(tabName) {
        const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        if (tabBtn) {
            tabBtn.click();
        }
    }
    
    function switchToTripType(tripType) {
        const tripBtn = document.querySelector(`.trip-btn[data-trip="${tripType}"]`);
        if (tripBtn) {
            tripBtn.click();
        }
    }
    
    // Gestion des boutons de redirection
    document.querySelectorAll('.service-redirect-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            const calculatorSection = document.querySelector('.hero-calculator');
            if (calculatorSection) {
                calculatorSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                setTimeout(() => {
                    switch(target) {
                        case 'transport':
                            switchToTab('transport');
                            switchToTripType('aller-simple');
                            document.getElementById('departure')?.focus();
                            break;
                            
                        case 'colis':
                            switchToTab('colis');
                            document.getElementById('tracking-number')?.focus();
                            break;
                            
                        case 'transfert':
                            alert("Service de transfert d'argent - Fonctionnalité à venir!");
                            break;
                    }
                }, 800);
            }
        });
    });
    
    // ============================================
    // BOUTONS "VOIR LES DESTINATIONS"
    // ============================================
    document.querySelectorAll('.btn-country').forEach(btn => {
        btn.addEventListener('click', function() {
            const countryCard = this.closest('.country-card');
            const country = countryCard.getAttribute('data-country');
            
            const calculatorSection = document.querySelector('.hero-calculator');
            if (calculatorSection) {
                calculatorSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
                
                setTimeout(() => {
                    switchToTab('transport');
                    
                    const departureSelect = document.getElementById('departure');
                    const arrivalSelect = document.getElementById('arrival');
                    
                    if (departureSelect) {
                        departureSelect.value = country;
                    }
                    
                    const countryNames = {
                        'benin': 'Bénin',
                        'ghana': 'Ghana',
                        'togo': 'Togo',
                        'burkina': 'Burkina Faso',
                        'cote-ivoire': 'Côte d\'Ivoire'
                    };
                    
                    alert(`Recherche de trajets depuis ${countryNames[country] || 'ce pays'}. Sélectionnez votre ville de destination.`);
                    
                }, 800);
            }
        });
    });
    
    // ============================================
    // INTERACTIONS DE L'APPLICATION MOBILE
    // ============================================
    
    // Animation au scroll
    const appSection = document.querySelector('.app-mobile');
    
    if (appSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    const buttons = entry.target.querySelectorAll('.app-store-btn, .play-store-btn');
                    buttons.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.style.opacity = '1';
                            btn.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(appSection);
        
        const buttons = appSection.querySelectorAll('.app-store-btn, .play-store-btn');
        buttons.forEach(btn => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            btn.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
    }
    
    // Simulation de clic sur les boutons de l'app
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            
            switch(text) {
                case 'Réserver':
                    switchToTab('transport');
                    document.querySelector('.hero-calculator').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    break;
                    
                case 'Suivre':
                    switchToTab('colis');
                    document.querySelector('.hero-calculator').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    break;
                    
                case 'Transférer':
                    alert('Service de transfert - Disponible prochainement!');
                    break;
            }
        });
    });
    
    // Menu de l'app
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelectorAll('.menu-item').forEach(i => {
                i.classList.remove('active');
            });
            
            this.classList.add('active');
        });
    });
    
    // ============================================
    // ANIMATION AU DÉFILEMENT
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature, .country, .app-store-btn, .play-store-btn').forEach(el => {
        scrollObserver.observe(el);
    });
    
    // ============================================
    // EFFET DE DÉFILEMENT FLUIDE POUR LES ANCRES
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // CHANGER LA COULEUR DU HEADER AU DÉFILEMENT
    // ============================================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.backgroundColor = '';
            header.style.backdropFilter = 'none';
        }
    });
});
