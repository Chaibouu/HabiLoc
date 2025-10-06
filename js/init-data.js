// Script d'initialisation des données avec les vraies images
class DataInitializer {
    constructor() {
        this.init();
    }

    init() {
        this.initializeProperties();
        this.initializeUsers();
    }

    // Initialiser les propriétés par défaut
    initializeProperties() {
        const existingProperties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        
        if (existingProperties.length === 0) {
            const defaultProperties = [
                {
                    id: 1,
                    name: "Villa moderne avec jardin",
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
                    ],
                    ownerId: 1,
                    status: "active",
                    views: 45,
                    createdAt: new Date().toISOString()
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
                    ],
                    ownerId: 1,
                    status: "active",
                    views: 32,
                    createdAt: new Date().toISOString()
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
                    ],
                    ownerId: 2,
                    status: "active",
                    views: 28,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    name: "Maison traditionnelle rénovée",
                    location: "Cité des Ministres, Niamey",
                    price: 200000,
                    bedrooms: 3,
                    bathrooms: 2,
                    parking: 1,
                    area: 100,
                    description: "Charme d'antan avec confort moderne, maison unique à Niamey. Rénovée avec goût tout en conservant son caractère authentique.",
                    address: "Rue des Ministres, Cité des Ministres, Niamey",
                    images: [
                        "images/images (7).jpg",
                        "images/images (12).jpg",
                        "images/téléchargement.jpg",
                        "images/téléchargement (1).jpg"
                    ],
                    features: [
                        { icon: "fas fa-wifi", name: "Internet haut débit" },
                        { icon: "fas fa-snowflake", name: "Climatisation" },
                        { icon: "fas fa-shield-alt", name: "Sécurité 24h/24" },
                        { icon: "fas fa-tree", name: "Jardin privé" },
                        { icon: "fas fa-car", name: "Garage" },
                        { icon: "fas fa-fire", name: "Chauffage" }
                    ],
                    nearbyPlaces: [
                        "École publique (400m)",
                        "Marché (600m)",
                        "Mosquée (200m)",
                        "Transport public (100m)"
                    ],
                    ownerId: 2,
                    status: "active",
                    views: 19,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 5,
                    name: "Appartement moderne 2 chambres",
                    location: "Gamkalley, Niamey",
                    price: 150000,
                    bedrooms: 2,
                    bathrooms: 1,
                    parking: 1,
                    area: 80,
                    description: "Appartement lumineux et bien situé, idéal pour jeunes couples. Moderne et fonctionnel.",
                    address: "Avenue Gamkalley, Gamkalley, Niamey",
                    images: [
                        "images/images (8).jpg",
                        "images/images (13).jpg",
                        "images/téléchargement (2).jpg",
                        "images/téléchargement (7).jpg"
                    ],
                    features: [
                        { icon: "fas fa-wifi", name: "Internet haut débit" },
                        { icon: "fas fa-snowflake", name: "Climatisation" },
                        { icon: "fas fa-shield-alt", name: "Sécurité 24h/24" },
                        { icon: "fas fa-car", name: "Parking" },
                        { icon: "fas fa-bolt", name: "Électricité" },
                        { icon: "fas fa-tint", name: "Eau courante" }
                    ],
                    nearbyPlaces: [
                        "Université (1km)",
                        "Marché (500m)",
                        "Transport public (200m)",
                        "Pharmacie (300m)"
                    ],
                    ownerId: 3,
                    status: "active",
                    views: 35,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 6,
                    name: "Villa avec piscine privée",
                    location: "Rivoli, Niamey",
                    price: 450000,
                    bedrooms: 4,
                    bathrooms: 3,
                    parking: 2,
                    area: 180,
                    description: "Villa de prestige avec piscine et jardin paysager. Luxe et confort pour une clientèle exigeante.",
                    address: "Quartier Rivoli, Niamey",
                    images: [
                        "images/images (9).jpg",
                        "images/images (11).jpg",
                        "images/images (14).jpg",
                        "images/téléchargement (8).jpg"
                    ],
                    features: [
                        { icon: "fas fa-wifi", name: "Internet haut débit" },
                        { icon: "fas fa-snowflake", name: "Climatisation" },
                        { icon: "fas fa-shield-alt", name: "Sécurité 24h/24" },
                        { icon: "fas fa-swimming-pool", name: "Piscine privée" },
                        { icon: "fas fa-tree", name: "Jardin paysager" },
                        { icon: "fas fa-car", name: "Garage double" }
                    ],
                    nearbyPlaces: [
                        "École internationale (2km)",
                        "Centre commercial (3km)",
                        "Hôpital privé (4km)",
                        "Aéroport (20km)"
                    ],
                    ownerId: 3,
                    status: "active",
                    views: 67,
                    createdAt: new Date().toISOString()
                }
            ];

            localStorage.setItem('habiloc_properties', JSON.stringify(defaultProperties));
            console.log('Propriétés initialisées avec les vraies images');
        }
    }

    // Initialiser les utilisateurs par défaut
    initializeUsers() {
        const existingUsers = JSON.parse(localStorage.getItem('habiloc_users') || '[]');
        
        if (existingUsers.length === 0) {
            const defaultUsers = [
                {
                    id: 1,
                    firstName: "Amadou",
                    lastName: "Traoré",
                    email: "amadou@example.com",
                    phone: "+227 90 12 34 56",
                    userType: "owner",
                    password: "password123",
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    firstName: "Fatouma",
                    lastName: "Diallo",
                    email: "fatouma@example.com",
                    phone: "+227 91 23 45 67",
                    userType: "owner",
                    password: "password123",
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    firstName: "Ibrahim",
                    lastName: "Moussa",
                    email: "ibrahim@example.com",
                    phone: "+227 92 34 56 78",
                    userType: "owner",
                    password: "password123",
                    createdAt: new Date().toISOString()
                }
            ];

            localStorage.setItem('habiloc_users', JSON.stringify(defaultUsers));
            console.log('Utilisateurs par défaut créés');
        }
    }
}

// Initialiser les données au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    new DataInitializer();
});
