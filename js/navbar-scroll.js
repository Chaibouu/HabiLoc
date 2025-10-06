// Gestion de l'effet de scroll pour la navbar
class NavbarScrollManager {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.scrollThreshold = 100; // Seuil de scroll en pixels
        this.init();
    }

    init() {
        if (this.navbar) {
            window.addEventListener('scroll', this.handleScroll.bind(this));
            // Vérifier l'état initial
            this.handleScroll();
        }
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Initialiser le gestionnaire de scroll de la navbar
document.addEventListener('DOMContentLoaded', () => {
    new NavbarScrollManager();
});
