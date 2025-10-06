// Gestion des liens actifs - HabiLoc
class ActiveLinksManager {
    constructor() {
        this.init();
    }

    init() {
        // Vérifier si on est sur la page d'accueil
        const currentPath = window.location.pathname;
        const isHomePage = currentPath === '/' || currentPath.includes('index.html') || currentPath === '';
        
        if (isHomePage) {
            this.handleHomePageSections();
        } else {
            this.setupNavigationLinks();
        }
        
        this.setupPageLinks();
        this.setupDashboardLinks();
    }

    // Configuration des liens de navigation
    setupNavigationLinks() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;

        // Supprimer toutes les classes active d'abord
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Logique de priorité pour déterminer le lien actif
        let activeLink = null;

        // Vérifier si on est sur la page d'accueil
        const isHomePage = currentPath === '/' || currentPath.includes('index.html') || currentPath === '';

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Priorité 1: Liens avec hash (sections de la page)
            if (linkHref.startsWith('#') && linkHref === currentHash) {
                activeLink = link;
            }
            // Priorité 2: Page d'accueil - par défaut "Accueil" si pas de hash
            else if (isHomePage && !currentHash && linkHref === '#accueil') {
                activeLink = link;
            }
            // Priorité 3: Page d'accueil avec hash "contact"
            else if (isHomePage && currentHash === '#contact' && linkHref === '#contact') {
                activeLink = link;
            }
            // Priorité 4: Pages spécifiques
            else if (currentPath.includes('property.html') && linkHref.includes('property')) {
                activeLink = link;
            }
            else if (currentPath.includes('dashboard.html') && linkHref.includes('dashboard')) {
                activeLink = link;
            }
            else if (currentPath.includes('login.html') && linkHref.includes('login')) {
                activeLink = link;
            }
            else if (currentPath.includes('register.html') && linkHref.includes('register')) {
                activeLink = link;
            }
        });

        // Activer seulement le lien avec la priorité la plus haute
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Configuration des liens de page
    setupPageLinks() {
        const pageLinks = document.querySelectorAll('a[href]');
        const currentPath = window.location.pathname;

        pageLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Vérifier les liens internes
            if (linkHref && !linkHref.startsWith('#') && !linkHref.startsWith('http')) {
                if (linkHref === currentPath || 
                    (currentPath.includes('index.html') && linkHref === 'index.html') ||
                    (currentPath.includes('login.html') && linkHref === 'login.html') ||
                    (currentPath.includes('register.html') && linkHref === 'register.html')) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Configuration des liens du tableau de bord
    setupDashboardLinks() {
        const dashboardLinks = document.querySelectorAll('.nav-list .nav-link');
        const currentSection = this.getCurrentSection();

        dashboardLinks.forEach(link => {
            link.classList.remove('active');
            
            const linkOnclick = link.getAttribute('onclick');
            if (linkOnclick && linkOnclick.includes(`'${currentSection}'`)) {
                link.classList.add('active');
            }
        });
    }

    // Obtenir la section actuelle du tableau de bord
    getCurrentSection() {
        const activeSection = document.querySelector('.dashboard-section.active');
        if (activeSection) {
            return activeSection.id;
        }
        return 'overview';
    }

    // Mettre à jour les liens actifs
    updateActiveLinks() {
        // Vérifier si on est sur la page d'accueil
        const currentPath = window.location.pathname;
        const isHomePage = currentPath === '/' || currentPath.includes('index.html') || currentPath === '';
        
        if (isHomePage) {
            this.handleHomePageSections();
        } else {
            this.setupNavigationLinks();
        }
        
        this.setupPageLinks();
        this.setupDashboardLinks();
    }

    // Gérer les clics sur les liens
    handleLinkClick(event) {
        const link = event.target.closest('a');
        if (!link) return;

        const linkHref = link.getAttribute('href');
        
        console.log('Clic sur le lien:', linkHref); // Debug
        
        // Supprimer toutes les classes active des liens de navigation
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });

        // Ajouter la classe active au lien cliqué
        link.classList.add('active');
        
        console.log('Lien activé:', link.textContent); // Debug

        // Pour les liens avec hash, NE PAS appeler updateActiveLinks
        // car cela pourrait écraser notre sélection
        if (linkHref && linkHref.startsWith('#')) {
            // Juste attendre un peu pour que le hash change
            setTimeout(() => {
                console.log('Hash après clic:', window.location.hash); // Debug
            }, 100);
        }
    }

    // Gérer les changements d'URL
    handleUrlChange() {
        this.updateActiveLinks();
    }

    // Gérer les sections de la page d'accueil
    handleHomePageSections() {
        const currentHash = window.location.hash;
        
        console.log('Hash actuel:', currentHash); // Debug
        
        // Supprimer toutes les classes active des liens de navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Activer le lien correspondant au hash
        if (currentHash) {
            const activeLink = document.querySelector(`.nav-link[href="${currentHash}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                console.log('Lien activé par hash:', activeLink.textContent); // Debug
            }
        } else {
            // Par défaut, activer "Accueil"
            const homeLink = document.querySelector('.nav-link[href="#accueil"]');
            if (homeLink) {
                homeLink.classList.add('active');
                console.log('Lien Accueil activé par défaut'); // Debug
            }
        }
    }
}

// Initialiser le gestionnaire de liens actifs
const activeLinksManager = new ActiveLinksManager();

// Écouter les clics sur les liens
document.addEventListener('click', (event) => {
    activeLinksManager.handleLinkClick(event);
});

// Écouter les changements d'URL (pour les SPA)
window.addEventListener('popstate', () => {
    activeLinksManager.handleUrlChange();
});

// Écouter les changements de hash
window.addEventListener('hashchange', () => {
    activeLinksManager.handleUrlChange();
});

// Fonction utilitaire pour marquer un lien comme actif
function setActiveLink(linkSelector) {
    // Supprimer toutes les classes active des liens de navigation
    document.querySelectorAll('.nav-link.active').forEach(link => {
        link.classList.remove('active');
    });

    // Ajouter la classe active au lien spécifié
    const link = document.querySelector(linkSelector);
    if (link) {
        link.classList.add('active');
    }
}

// Fonction pour forcer l'activation d'un seul lien (résout le problème des liens multiples)
function setSingleActiveLink(linkSelector) {
    // Supprimer TOUTES les classes active de tous les liens
    document.querySelectorAll('a.active').forEach(link => {
        link.classList.remove('active');
    });

    // Ajouter la classe active au lien spécifié
    const link = document.querySelector(linkSelector);
    if (link) {
        link.classList.add('active');
    }
}

// Fonction pour les liens du tableau de bord
function setActiveDashboardLink(sectionName) {
    // Supprimer la classe active de tous les liens de navigation
    document.querySelectorAll('.nav-list .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Ajouter la classe active au lien correspondant
    const activeLink = document.querySelector(`[onclick="showSection('${sectionName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Export pour utilisation dans d'autres scripts
window.ActiveLinksManager = ActiveLinksManager;
window.setActiveLink = setActiveLink;
window.setSingleActiveLink = setSingleActiveLink;
window.setActiveDashboardLink = setActiveDashboardLink;
