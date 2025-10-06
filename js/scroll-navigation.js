// Navigation par scroll - HabiLoc
class ScrollNavigation {
    constructor() {
        this.sections = [];
        this.navLinks = [];
        this.currentActive = null;
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.setupSections();
        this.setupNavLinks();
        this.setupScrollListener();
        this.setDefaultActive();
    }

    // Configuration des sections
    setupSections() {
        this.sections = [
            { id: 'accueil', element: document.getElementById('accueil') },
            { id: 'annonces', element: document.getElementById('annonces') },
            { id: 'contact', element: document.getElementById('contact') }
        ].filter(section => section.element !== null);

        console.log('Sections détectées:', this.sections.map(s => s.id));
    }

    // Configuration des liens de navigation
    setupNavLinks() {
        this.navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        console.log('Liens de navigation trouvés:', this.navLinks.length);
    }

    // Configuration de l'écouteur de scroll
    setupScrollListener() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            scrollTimeout = setTimeout(() => {
                this.updateActiveSection();
            }, 10);
        });
    }

    // Mise à jour de la section active
    updateActiveSection() {
        const scrollPosition = window.scrollY + 100; // Offset pour l'activation
        let activeSection = null;

        // Trouver la section actuellement visible
        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            const sectionTop = section.element.offsetTop;
            
            if (scrollPosition >= sectionTop) {
                activeSection = section;
                break;
            }
        }

        // Si aucune section n'est trouvée, utiliser la première (accueil)
        if (!activeSection && this.sections.length > 0) {
            activeSection = this.sections[0];
        }

        // Mettre à jour l'état actif
        if (activeSection && activeSection.id !== this.currentActive) {
            this.setActiveLink(activeSection.id);
            this.currentActive = activeSection.id;
            console.log('Section active changée:', activeSection.id);
        }
    }

    // Définir le lien actif
    setActiveLink(sectionId) {
        // Supprimer toutes les classes active
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Activer le lien correspondant
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            console.log('Lien activé:', activeLink.textContent);
        }
    }

    // Définir "Accueil" comme actif par défaut
    setDefaultActive() {
        // Attendre que la page soit chargée
        setTimeout(() => {
            const scrollPosition = window.scrollY;
            
            // Si on est en haut de la page, activer "Accueil"
            if (scrollPosition < 100) {
                this.setActiveLink('accueil');
                this.currentActive = 'accueil';
                console.log('Accueil activé par défaut');
            } else {
                // Sinon, déterminer la section active
                this.updateActiveSection();
            }
        }, 100);
    }

    // Gérer les clics sur les liens de navigation
    handleNavClick(event) {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;

        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            // Scroll fluide vers la section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Mettre à jour l'état actif immédiatement
            this.setActiveLink(targetId);
            this.currentActive = targetId;
        }
    }

    // Obtenir la section actuellement visible
    getCurrentSection() {
        return this.currentActive;
    }

    // Forcer l'activation d'une section
    forceActiveSection(sectionId) {
        this.setActiveLink(sectionId);
        this.currentActive = sectionId;
    }
}

// Initialiser la navigation par scroll
const scrollNavigation = new ScrollNavigation();

// Écouter les clics sur les liens de navigation
document.addEventListener('click', (event) => {
    scrollNavigation.handleNavClick(event);
});

// Fonction utilitaire pour forcer l'activation d'une section
function setActiveSection(sectionId) {
    scrollNavigation.forceActiveSection(sectionId);
}

// Export pour utilisation dans d'autres scripts
window.ScrollNavigation = ScrollNavigation;
window.setActiveSection = setActiveSection;
