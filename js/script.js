// Données des annonces avec les vraies images
const listings = [
    {
        id: 1,
        title: "Villa moderne avec jardin",
        location: "Plateau, Niamey",
        price: 250000,
        bedrooms: 4,
        bathrooms: 3,
        image: "images/images.jpg",
        description: "Magnifique villa moderne avec jardin paysager et vue panoramique"
    },
    {
        id: 2,
        title: "Appartement de luxe 3 chambres",
        location: "Terminus, Niamey",
        price: 180000,
        bedrooms: 3,
        bathrooms: 2,
        image: "images/images (3).jpg",
        description: "Appartement haut de gamme avec toutes les commodités modernes"
    },
    {
        id: 3,
        title: "Villa familiale spacieuse",
        location: "Centre-ville, Niamey",
        price: 320000,
        bedrooms: 5,
        bathrooms: 4,
        image: "images/images (4).jpg",
        description: "Villa idéale pour les grandes familles avec espace de vie généreux"
    },
    {
        id: 4,
        title: "Maison traditionnelle rénovée",
        location: "Cité des Ministres, Niamey",
        price: 200000,
        bedrooms: 3,
        bathrooms: 2,
        image: "images/images (7).jpg",
        description: "Charme d'antan avec confort moderne, maison unique à Niamey"
    },
    {
        id: 5,
        title: "Appartement moderne 2 chambres",
        location: "Gamkalley, Niamey",
        price: 150000,
        bedrooms: 2,
        bathrooms: 1,
        image: "images/images (8).jpg",
        description: "Appartement lumineux et bien situé, idéal pour jeunes couples"
    },
    {
        id: 6,
        title: "Villa avec piscine privée",
        location: "Rivoli, Niamey",
        price: 450000,
        bedrooms: 4,
        bathrooms: 3,
        image: "images/images (9).jpg",
        description: "Villa de prestige avec piscine et jardin paysager"
    },
    {
        id: 7,
        title: "Appartement haut standing",
        location: "Plateau, Niamey",
        price: 220000,
        bedrooms: 3,
        bathrooms: 2,
        image: "images/images (10).jpg",
        description: "Appartement de standing avec vue sur la ville"
    },
    {
        id: 8,
        title: "Villa contemporaine",
        location: "Terminus, Niamey",
        price: 380000,
        bedrooms: 4,
        bathrooms: 3,
        image: "images/images (11).jpg",
        description: "Architecture contemporaine avec espaces ouverts et lumineux"
    },
    {
        id: 9,
        title: "Maison avec garage",
        location: "Centre-ville, Niamey",
        price: 280000,
        bedrooms: 3,
        bathrooms: 2,
        image: "images/images (12).jpg",
        description: "Maison pratique avec garage et jardin privé"
    },
    {
        id: 10,
        title: "Appartement meublé",
        location: "Gamkalley, Niamey",
        price: 160000,
        bedrooms: 2,
        bathrooms: 1,
        image: "images/images (13).jpg",
        description: "Appartement entièrement meublé, prêt à emménager"
    },
    {
        id: 11,
        title: "Villa de prestige",
        location: "Rivoli, Niamey",
        price: 520000,
        bedrooms: 5,
        bathrooms: 4,
        image: "images/images (14).jpg",
        description: "Villa de prestige avec jardin paysager et piscine"
    },
    {
        id: 12,
        title: "Studio moderne",
        location: "Centre-ville, Niamey",
        price: 120000,
        bedrooms: 1,
        bathrooms: 1,
        image: "images/téléchargement.jpg",
        description: "Studio moderne et fonctionnel, idéal pour étudiant ou jeune actif"
    }
];

// Variables globales
let filteredListings = [...listings];

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    renderListings();
    initializeMobileMenu();
});

// Navigation mobile
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navigation fluide
function initializeNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Système de recherche
function initializeSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInputs = searchForm.querySelectorAll('input, select');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });

    // Recherche en temps réel
    searchInputs.forEach(input => {
        input.addEventListener('input', debounce(performSearch, 300));
    });
}

function performSearch() {
    const locationInput = document.querySelector('input[placeholder="Ville ou quartier"]');
    const bedroomsSelect = document.querySelector('select');
    const priceInput = document.querySelector('input[type="number"]');

    const location = locationInput.value.toLowerCase();
    const bedrooms = bedroomsSelect.value;
    const maxPrice = parseInt(priceInput.value) || Infinity;

    filteredListings = listings.filter(listing => {
        const matchesLocation = !location || 
            listing.location.toLowerCase().includes(location) ||
            listing.title.toLowerCase().includes(location);
        
        const matchesBedrooms = !bedrooms || 
            (bedrooms === '4+' ? listing.bedrooms >= 4 : listing.bedrooms == bedrooms);
        
        const matchesPrice = listing.price <= maxPrice;

        return matchesLocation && matchesBedrooms && matchesPrice;
    });

    renderListings();
}

// Fonction debounce pour optimiser les recherches
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Rendu des annonces
function renderListings() {
    const listingsGrid = document.getElementById('listingsGrid');
    
    if (filteredListings.length === 0) {
        listingsGrid.innerHTML = `
            <div class="no-results">
                <h3>Aucune annonce trouvée</h3>
                <p>Essayez de modifier vos critères de recherche</p>
            </div>
        `;
        return;
    }

    listingsGrid.innerHTML = filteredListings.map(listing => `
        <div class="listing-card" data-id="${listing.id}">
            <div class="listing-image">
                <img src="${listing.image}" alt="${listing.title}" onerror="this.src='images/placeholder.jpg'">
                <button class="favorite-btn" onclick="toggleFavorite(${listing.id})" data-favorited="false">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <p class="listing-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${listing.location}
                </p>
                <div class="listing-details">
                    <span><i class="fas fa-bed"></i> ${listing.bedrooms} chambre${listing.bedrooms > 1 ? 's' : ''}</span>
                    <span><i class="fas fa-bath"></i> ${listing.bathrooms} salle${listing.bathrooms > 1 ? 's' : ''} de bain</span>
                </div>
                <div class="listing-price">${formatPrice(listing.price)} FCFA/mois</div>
                <button class="btn-primary" onclick="viewListing(${listing.id})">Voir plus</button>
            </div>
        </div>
    `).join('');
    
    // Charger l'état des favoris après le rendu
    setTimeout(loadFavoritesState, 100);
}

// Formatage des prix
function formatPrice(price) {
    return price.toLocaleString('fr-FR');
}

// Gestion des favoris
function toggleFavorite(listingId) {
    const favoriteBtn = document.querySelector(`[onclick="toggleFavorite(${listingId})"]`);
    const isFavorited = favoriteBtn.getAttribute('data-favorited') === 'true';
    
    if (isFavorited) {
        // Retirer des favoris
        favoriteBtn.setAttribute('data-favorited', 'false');
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.classList.remove('favorited');
        
        // Retirer du localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        favorites = favorites.filter(id => id !== listingId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        console.log('Retiré des favoris:', listingId);
    } else {
        // Ajouter aux favoris
        favoriteBtn.setAttribute('data-favorited', 'true');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        favoriteBtn.classList.add('favorited');
        
        // Ajouter au localStorage
        let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!favorites.includes(listingId)) {
            favorites.push(listingId);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        
        console.log('Ajouté aux favoris:', listingId);
    }
}

// Charger l'état des favoris au chargement de la page
function loadFavoritesState() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    favorites.forEach(listingId => {
        const favoriteBtn = document.querySelector(`[onclick="toggleFavorite(${listingId})"]`);
        if (favoriteBtn) {
            favoriteBtn.setAttribute('data-favorited', 'true');
            favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
            favoriteBtn.classList.add('favorited');
        }
    });
}

// Voir les détails d'une annonce
function viewListing(id) {
    const listing = listings.find(l => l.id === id);
    if (listing) {
        // Redirection vers la page de détail (à créer)
        window.location.href = `property.html?id=${id}`;
    }
}

// Animation au scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les cartes d'annonces
    document.querySelectorAll('.listing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialiser les animations après le rendu
setTimeout(initializeScrollAnimations, 100);

// Gestion des favoris (fonctionnalité future)
function toggleFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(id);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const id = parseInt(btn.dataset.id);
        const isFavorite = favorites.includes(id);
        btn.classList.toggle('active', isFavorite);
    });
}

// Filtres avancés (fonctionnalité future)
function showAdvancedFilters() {
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'advanced-filters';
    filtersContainer.innerHTML = `
        <h3>Filtres avancés</h3>
        <div class="filter-group">
            <label>Type de propriété</label>
            <select id="propertyType">
                <option value="">Tous</option>
                <option value="appartement">Appartement</option>
                <option value="villa">Villa</option>
                <option value="maison">Maison</option>
                <option value="studio">Studio</option>
            </select>
        </div>
        <div class="filter-group">
            <label>Prix minimum</label>
            <input type="number" id="minPrice" placeholder="Prix minimum">
        </div>
        <div class="filter-group">
            <label>Prix maximum</label>
            <input type="number" id="maxPrice" placeholder="Prix maximum">
        </div>
        <button class="btn-primary" onclick="applyAdvancedFilters()">Appliquer</button>
    `;
    
    document.querySelector('.listings-section .container').appendChild(filtersContainer);
}

// Gestion des erreurs d'images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/placeholder.jpg';
    }
}, true);

// Performance : lazy loading des images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}
