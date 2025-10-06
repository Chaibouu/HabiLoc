// Gestion simple des liens actifs - HabiLoc
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script de gestion des liens actifs chargé');
    
    // Fonction pour gérer les clics sur les liens
    function handleLinkClick(event) {
        const link = event.target.closest('a');
        if (!link || !link.classList.contains('nav-link')) return;
        
        const linkHref = link.getAttribute('href');
        console.log('Clic sur le lien:', linkHref, 'Texte:', link.textContent);
        
        // Supprimer toutes les classes active des liens de navigation
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });

        // Ajouter la classe active au lien cliqué
        link.classList.add('active');
        
        console.log('Lien activé:', link.textContent);
    }
    
    // Fonction pour initialiser les liens actifs
    function initActiveLinks() {
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        console.log('Initialisation - Path:', currentPath, 'Hash:', currentHash);
        
        // Supprimer toutes les classes active
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Si on est sur la page d'accueil
        if (currentPath === '/' || currentPath.includes('index.html') || currentPath === '') {
            // Par défaut, activer "Accueil" si pas de hash
            if (!currentHash) {
                const homeLink = document.querySelector('.nav-link[href="#accueil"]');
                if (homeLink) {
                    homeLink.classList.add('active');
                    console.log('Lien Accueil activé par défaut');
                }
            } else {
                // Activer le lien correspondant au hash
                const activeLink = document.querySelector(`.nav-link[href="${currentHash}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    console.log('Lien activé par hash:', activeLink.textContent);
                }
            }
        }
    }
    
    // Écouter les clics sur les liens
    document.addEventListener('click', handleLinkClick);
    
    // Écouter les changements de hash
    window.addEventListener('hashchange', function() {
        console.log('Hash changé:', window.location.hash);
        initActiveLinks();
    });
    
    // Initialiser au chargement
    initActiveLinks();
});

// Fonction utilitaire pour forcer l'activation d'un lien
function setActiveLink(linkSelector) {
    // Supprimer toutes les classes active
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Ajouter la classe active au lien spécifié
    const link = document.querySelector(linkSelector);
    if (link) {
        link.classList.add('active');
        console.log('Lien forcé activé:', link.textContent);
    }
}
