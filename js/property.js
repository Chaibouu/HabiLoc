// Gestion de la page de détail des propriétés
class PropertyManager {
    constructor() {
        this.currentProperty = null;
        this.currentImageIndex = 0;
        this.images = [];
        this.init();
    }

    init() {
        this.loadProperty();
        this.initializeGallery();
        this.initializeTabs();
        this.initializeContactForm();
        this.loadSimilarProperties();
    }

    // Charger les données de la propriété
    loadProperty() {
        const urlParams = new URLSearchParams(window.location.search);
        const propertyId = parseInt(urlParams.get('id'));
        
        if (!propertyId) {
            this.showError('Propriété non trouvée');
            return;
        }

        // Récupérer les données depuis le localStorage ou l'API
        const properties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        this.currentProperty = properties.find(p => p.id === propertyId);
        
        if (!this.currentProperty) {
            // Utiliser les données par défaut si pas trouvé
            this.currentProperty = this.getDefaultProperty(propertyId);
        }

        this.displayProperty();
    }

    // Propriété par défaut pour la démo
    getDefaultProperty(id) {
        const defaultProperties = [
            {
                id: 1,
                name: "Villa moderne à Niamey",
                location: "Plateau, Niamey",
                price: 250000,
                bedrooms: 4,
                bathrooms: 3,
                parking: 2,
                area: 150,
                description: "Magnifique villa moderne située dans le quartier résidentiel du Plateau. Cette propriété offre un cadre de vie exceptionnel avec ses espaces généreux et son jardin privé. Idéale pour une famille, elle dispose de toutes les commodités modernes.",
                address: "Rue de la République, Plateau, Niamey",
                images: [
                    "images/images.jpg",
                    "images/images (3).jpg",
                    "images/images (4).jpg",
                    "images/images (7).jpg"
                ],
                features: [
                    { icon: "fas fa-wifi", name: "Internet haut débit" },
                    { icon: "fas fa-snowflake", name: "Climatisation" },
                    { icon: "fas fa-shield-alt", name: "Sécurité 24h/24" },
                    { icon: "fas fa-swimming-pool", name: "Piscine privée" },
                    { icon: "fas fa-tree", name: "Jardin paysager" },
                    { icon: "fas fa-car", name: "Garage couvert" }
                ],
                nearbyPlaces: [
                    "École internationale (500m)",
                    "Centre commercial (1km)",
                    "Hôpital (2km)",
                    "Aéroport (15km)"
                ]
            },
            {
                id: 2,
                name: "Appartement de luxe 3 chambres",
                location: "Terminus, Niamey",
                price: 180000,
                bedrooms: 3,
                bathrooms: 2,
                parking: 1,
                area: 120,
                description: "Appartement haut de gamme avec toutes les commodités modernes. Situé dans un quartier résidentiel calme, il offre un cadre de vie exceptionnel.",
                address: "Avenue de la République, Terminus, Niamey",
                images: [
                    "images/images (3).jpg",
                    "images/images (8).jpg",
                    "images/images (10).jpg",
                    "images/images (13).jpg"
                ],
                features: [
                    { icon: "fas fa-wifi", name: "Internet haut débit" },
                    { icon: "fas fa-snowflake", name: "Climatisation" },
                    { icon: "fas fa-shield-alt", name: "Sécurité 24h/24" },
                    { icon: "fas fa-elevator", name: "Ascenseur" },
                    { icon: "fas fa-car", name: "Parking privé" },
                    { icon: "fas fa-concierge-bell", name: "Conciergerie" }
                ],
                nearbyPlaces: [
                    "Université (800m)",
                    "Marché central (1.2km)",
                    "Hôpital national (3km)",
                    "Gare routière (2km)"
                ]
            },
            {
                id: 3,
                name: "Villa familiale spacieuse",
                location: "Centre-ville, Niamey",
                price: 320000,
                bedrooms: 5,
                bathrooms: 4,
                parking: 3,
                area: 200,
                description: "Villa idéale pour les grandes familles avec espace de vie généreux. Architecture moderne et fonctionnelle.",
                address: "Boulevard de la Liberté, Centre-ville, Niamey",
                images: [
                    "images/images (4).jpg",
                    "images/images (9).jpg",
                    "images/images (11).jpg",
                    "images/images (14).jpg"
                ],
                features: [
                    { icon: "fas fa-wifi", name: "Internet haut débit" },
                    { icon: "fas fa-snowflake", name: "Climatisation" },
                    { icon: "fas fa-shield-alt", name: "Sécurité 24h/24" },
                    { icon: "fas fa-swimming-pool", name: "Piscine privée" },
                    { icon: "fas fa-tree", name: "Jardin paysager" },
                    { icon: "fas fa-car", name: "Garage triple" }
                ],
                nearbyPlaces: [
                    "École primaire (300m)",
                    "Centre commercial (800m)",
                    "Hôpital (1.5km)",
                    "Parc national (2km)"
                ]
            }
        ];

        return defaultProperties.find(p => p.id === id) || defaultProperties[0];
    }

    // Afficher les informations de la propriété
    displayProperty() {
        if (!this.currentProperty) return;

        // Mettre à jour le titre de la page
        document.title = `${this.currentProperty.name} - HabiLoc`;
        document.getElementById('propertyTitle').textContent = this.currentProperty.name;

        // Informations principales
        document.getElementById('propertyName').textContent = this.currentProperty.name;
        document.getElementById('propertyLocation').textContent = this.currentProperty.location;
        document.getElementById('propertyPrice').textContent = this.formatPrice(this.currentProperty.price);
        document.getElementById('bedrooms').textContent = this.currentProperty.bedrooms;
        document.getElementById('bathrooms').textContent = this.currentProperty.bathrooms;
        document.getElementById('parking').textContent = this.currentProperty.parking || 0;
        document.getElementById('area').textContent = this.currentProperty.area;
        document.getElementById('propertyDescription').textContent = this.currentProperty.description;
        document.getElementById('propertyAddress').textContent = this.currentProperty.address;

        // Images
        this.images = this.currentProperty.images || ['images/placeholder.jpg'];
        this.displayImages();

        // Caractéristiques
        this.displayFeatures();

        // Lieux à proximité
        this.displayNearbyPlaces();

        // Vérifier si la propriété est en favori
        this.updateFavoriteButton();
    }

    // Afficher les images
    displayImages() {
        const mainImage = document.getElementById('mainImage');
        const thumbnailsContainer = document.getElementById('galleryThumbnails');
        const currentImageSpan = document.getElementById('currentImage');
        const totalImagesSpan = document.getElementById('totalImages');

        if (this.images.length > 0) {
            mainImage.src = this.images[0];
            mainImage.alt = this.currentProperty.name;
        }

        // Générer les miniatures
        thumbnailsContainer.innerHTML = this.images.map((image, index) => `
            <img src="${image}" 
                 alt="Image ${index + 1}" 
                 class="thumbnail ${index === 0 ? 'active' : ''}"
                 onclick="propertyManager.selectImage(${index})"
                 onerror="this.src='images/placeholder.jpg'">
        `).join('');

        currentImageSpan.textContent = '1';
        totalImagesSpan.textContent = this.images.length;
    }

    // Sélectionner une image
    selectImage(index) {
        this.currentImageIndex = index;
        const mainImage = document.getElementById('mainImage');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const currentImageSpan = document.getElementById('currentImage');

        mainImage.src = this.images[index];
        mainImage.alt = `Image ${index + 1}`;

        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        currentImageSpan.textContent = index + 1;
    }

    // Changer d'image (précédent/suivant)
    changeImage(direction) {
        const newIndex = this.currentImageIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.images.length) {
            this.selectImage(newIndex);
        }
    }

    // Initialiser la galerie
    initializeGallery() {
        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                this.changeImage(1);
            }
        });

        // Navigation tactile
        let startX = 0;
        const mainImage = document.getElementById('mainImage');
        
        mainImage.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        mainImage.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.changeImage(1);
                } else {
                    this.changeImage(-1);
                }
            }
        });
    }

    // Afficher les caractéristiques
    displayFeatures() {
        const featuresList = document.getElementById('featuresList');
        
        if (this.currentProperty.features) {
            featuresList.innerHTML = this.currentProperty.features.map(feature => `
                <div class="feature-card">
                    <i class="${feature.icon}"></i>
                    <span>${feature.name}</span>
                </div>
            `).join('');
        }
    }

    // Afficher les lieux à proximité
    displayNearbyPlaces() {
        const nearbyPlaces = document.getElementById('nearbyPlaces');
        
        if (this.currentProperty.nearbyPlaces) {
            nearbyPlaces.innerHTML = this.currentProperty.nearbyPlaces.map(place => `
                <li><i class="fas fa-map-marker-alt"></i> ${place}</li>
            `).join('');
        }
    }

    // Initialiser les onglets
    initializeTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('onclick').match(/'([^']+)'/)[1];
                this.showTab(targetTab);
            });
        });
    }

    // Afficher un onglet
    showTab(tabName) {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        document.querySelector(`[onclick="showTab('${tabName}')"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    // Initialiser le formulaire de contact
    initializeContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactForm();
        });
    }

    // Gérer l'envoi du formulaire de contact
    handleContactForm() {
        const formData = new FormData(document.getElementById('contactForm'));
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            type: formData.get('type'),
            message: formData.get('message'),
            propertyId: this.currentProperty.id,
            propertyName: this.currentProperty.name,
            timestamp: new Date().toISOString()
        };

        // Sauvegarder la demande de contact
        const contacts = JSON.parse(localStorage.getItem('habiloc_contacts') || '[]');
        contacts.push(contactData);
        localStorage.setItem('habiloc_contacts', JSON.stringify(contacts));

        this.showSuccess('Votre demande a été envoyée avec succès !');
        document.getElementById('contactForm').reset();
    }

    // Charger les propriétés similaires
    loadSimilarProperties() {
        const similarContainer = document.getElementById('similarProperties');
        
        // Récupérer des propriétés similaires (même prix, même zone)
        const allProperties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        const similarProperties = allProperties
            .filter(p => p.id !== this.currentProperty.id)
            .slice(0, 3);

        if (similarProperties.length === 0) {
            // Utiliser des propriétés par défaut avec les vraies images
            const defaultSimilar = [
                {
                    id: 2,
                    name: "Appartement de luxe 3 chambres",
                    location: "Terminus, Niamey",
                    price: 180000,
                    bedrooms: 3,
                    bathrooms: 2,
                    image: "images/images (3).jpg"
                },
                {
                    id: 3,
                    name: "Villa familiale spacieuse",
                    location: "Centre-ville, Niamey",
                    price: 320000,
                    bedrooms: 4,
                    bathrooms: 3,
                    image: "images/images (4).jpg"
                },
                {
                    id: 4,
                    name: "Maison traditionnelle rénovée",
                    location: "Cité des Ministres, Niamey",
                    price: 200000,
                    bedrooms: 3,
                    bathrooms: 2,
                    image: "images/images (7).jpg"
                }
            ];

            similarContainer.innerHTML = defaultSimilar.map(property => `
                <div class="similar-card" onclick="window.location.href='property.html?id=${property.id}'">
                    <div class="similar-image">
                        <img src="${property.image}" alt="${property.name}" onerror="this.src='images/placeholder.jpg'">
                    </div>
                    <div class="similar-content">
                        <h4 class="similar-title">${property.name}</h4>
                        <p class="similar-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.location}
                        </p>
                        <div class="similar-details">
                            <span><i class="fas fa-bed"></i> ${property.bedrooms} ch.</span>
                            <span><i class="fas fa-bath"></i> ${property.bathrooms} sdb</span>
                        </div>
                        <div class="similar-price">${this.formatPrice(property.price)} FCFA/mois</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Contacter le propriétaire
    contactOwner() {
        const contactSection = document.querySelector('.contact-form-section');
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Basculer les favoris
    toggleFavorite() {
        const favorites = JSON.parse(localStorage.getItem('habiloc_favorites') || '[]');
        const propertyId = this.currentProperty.id;
        const favoriteBtn = document.querySelector('.btn-secondary');
        const favoriteText = document.getElementById('favoriteText');

        const index = favorites.indexOf(propertyId);
        
        if (index > -1) {
            favorites.splice(index, 1);
            favoriteBtn.classList.remove('favorited');
            favoriteText.textContent = 'Ajouter aux favoris';
            this.showSuccess('Propriété retirée des favoris');
        } else {
            favorites.push(propertyId);
            favoriteBtn.classList.add('favorited');
            favoriteText.textContent = 'Retiré des favoris';
            this.showSuccess('Propriété ajoutée aux favoris');
        }

        localStorage.setItem('habiloc_favorites', JSON.stringify(favorites));
    }

    // Mettre à jour le bouton favori
    updateFavoriteButton() {
        const favorites = JSON.parse(localStorage.getItem('habiloc_favorites') || '[]');
        const propertyId = this.currentProperty.id;
        const favoriteBtn = document.querySelector('.btn-secondary');
        const favoriteText = document.getElementById('favoriteText');

        if (favorites.includes(propertyId)) {
            favoriteBtn.classList.add('favorited');
            favoriteText.textContent = 'Retiré des favoris';
        }
    }

    // Partager la propriété
    shareProperty() {
        if (navigator.share) {
            navigator.share({
                title: this.currentProperty.name,
                text: `Découvrez cette propriété sur HabiLoc : ${this.currentProperty.name}`,
                url: window.location.href
            });
        } else {
            // Fallback : copier l'URL
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showSuccess('Lien copié dans le presse-papiers');
            });
        }
    }

    // Formatage des prix
    formatPrice(price) {
        return price.toLocaleString('fr-FR');
    }

    // Afficher un message d'erreur
    showError(message) {
        this.showMessage(message, 'error');
    }

    // Afficher un message de succès
    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    // Afficher un message
    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        `;

        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'var(--danger-color)' : 'var(--success-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(messageDiv);

        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Initialiser le gestionnaire de propriété
const propertyManager = new PropertyManager();

// Fonctions globales pour les événements onclick
function changeImage(direction) {
    propertyManager.changeImage(direction);
}

function showTab(tabName) {
    propertyManager.showTab(tabName);
}

function contactOwner() {
    propertyManager.contactOwner();
}

function toggleFavorite() {
    propertyManager.toggleFavorite();
}

function shareProperty() {
    propertyManager.shareProperty();
}
