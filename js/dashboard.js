// Gestion du tableau de bord
class DashboardManager {
    constructor() {
        this.currentUser = null;
        this.currentSection = 'overview';
        this.init();
    }

    init() {
        this.checkAuth();
        this.loadUser();
        this.initializeNavigation();
        this.initializeDropdown();
        this.loadDashboardData();
        this.initializeForms();
    }

    // Vérifier l'authentification
    checkAuth() {
        const user = JSON.parse(localStorage.getItem('habiloc_user') || 'null');
        if (!user) {
            window.location.href = 'login.html';
            return false;
        }
        this.currentUser = user;
        return true;
    }

    // Charger les informations utilisateur
    loadUser() {
        if (this.currentUser) {
            document.getElementById('userName').textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
            document.getElementById('sidebarUserName').textContent = `${this.currentUser.firstName} ${this.currentUser.lastName}`;
            document.getElementById('sidebarUserType').textContent = this.currentUser.userType === 'owner' ? 'Propriétaire' : 'Locataire';
            
            // Afficher la section admin pour les administrateurs
            if (this.currentUser.userType === 'admin') {
                document.getElementById('adminSection').style.display = 'block';
            }

            // Remplir le formulaire de profil
            this.populateProfileForm();
        }
    }

    // Initialiser la navigation
    initializeNavigation() {
        // Navigation mobile
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }
    }

    // Initialiser le dropdown
    initializeDropdown() {
        const dropdownToggle = document.querySelector('.dropdown-toggle');
        const dropdownMenu = document.querySelector('.dropdown-menu');

        if (dropdownToggle && dropdownMenu) {
            dropdownToggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdownMenu.classList.toggle('active');
            });

            // Fermer le dropdown en cliquant ailleurs
            document.addEventListener('click', (e) => {
                if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('active');
                }
            });
        }
    }

    // Charger les données du tableau de bord
    loadDashboardData() {
        this.loadStats();
        this.loadRecentActivity();
        this.loadUserProperties();
        this.loadUserFavorites();
        this.loadUserRequests();
        this.loadAdminData();
    }

    // Charger les statistiques
    loadStats() {
        const properties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        const favorites = JSON.parse(localStorage.getItem('habiloc_favorites') || '[]');
        const contacts = JSON.parse(localStorage.getItem('habiloc_contacts') || '[]');

        // Statistiques de l'utilisateur
        const userProperties = properties.filter(p => p.ownerId === this.currentUser.id);
        const userFavorites = favorites.filter(f => f.userId === this.currentUser.id);
        const userContacts = contacts.filter(c => c.userId === this.currentUser.id);

        document.getElementById('totalProperties').textContent = userProperties.length;
        document.getElementById('totalFavorites').textContent = userFavorites.length;
        document.getElementById('totalRequests').textContent = userContacts.length;
        document.getElementById('totalViews').textContent = userProperties.reduce((sum, p) => sum + (p.views || 0), 0);
    }

    // Charger l'activité récente
    loadRecentActivity() {
        const activities = [
            {
                icon: 'fas fa-plus',
                title: 'Nouvelle propriété ajoutée',
                description: 'Villa moderne à Niamey',
                time: 'Il y a 2 heures'
            },
            {
                icon: 'fas fa-heart',
                title: 'Propriété ajoutée aux favoris',
                description: 'Appartement 3 chambres',
                time: 'Il y a 1 jour'
            },
            {
                icon: 'fas fa-envelope',
                title: 'Nouvelle demande reçue',
                description: 'Demande de visite',
                time: 'Il y a 2 jours'
            }
        ];

        const activityList = document.getElementById('recentActivity');
        activityList.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }

    // Charger les propriétés de l'utilisateur
    loadUserProperties() {
        const properties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        const userProperties = properties.filter(p => p.ownerId === this.currentUser.id);

        const propertiesGrid = document.getElementById('userProperties');
        if (userProperties.length === 0) {
            // Afficher des propriétés d'exemple avec les vraies images
            const exampleProperties = [
                {
                    id: 1,
                    name: "Villa moderne avec jardin",
                    location: "Plateau, Niamey",
                    price: 250000,
                    bedrooms: 4,
                    bathrooms: 3,
                    area: 150,
                    image: "images/images.jpg"
                },
                {
                    id: 2,
                    name: "Appartement de luxe 3 chambres",
                    location: "Terminus, Niamey",
                    price: 180000,
                    bedrooms: 3,
                    bathrooms: 2,
                    area: 120,
                    image: "images/images (3).jpg"
                }
            ];

            propertiesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-home"></i>
                    <h3>Aucune propriété</h3>
                    <p>Vous n'avez pas encore ajouté de propriété. Voici quelques exemples :</p>
                </div>
                ${exampleProperties.map(property => `
                    <div class="property-card">
                        <div class="property-image">
                            <img src="${property.image}" alt="${property.name}" onerror="this.src='images/placeholder.jpg'">
                        </div>
                        <div class="property-content">
                            <h3 class="property-title">${property.name}</h3>
                            <p class="property-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${property.location}
                            </p>
                            <div class="property-details">
                                <span><i class="fas fa-bed"></i> ${property.bedrooms} ch.</span>
                                <span><i class="fas fa-bath"></i> ${property.bathrooms} sdb</span>
                                <span><i class="fas fa-ruler-combined"></i> ${property.area} m²</span>
                            </div>
                            <div class="property-price">${this.formatPrice(property.price)} FCFA/mois</div>
                            <div class="property-actions">
                                <button class="btn-primary" onclick="addProperty()">
                                    <i class="fas fa-plus"></i>
                                    Ajouter une propriété comme celle-ci
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            `;
        } else {
            propertiesGrid.innerHTML = userProperties.map(property => `
                <div class="property-card">
                    <div class="property-image">
                        <img src="${property.images ? property.images[0] : 'images/placeholder.jpg'}" 
                             alt="${property.name}" 
                             onerror="this.src='images/placeholder.jpg'">
                    </div>
                    <div class="property-content">
                        <h3 class="property-title">${property.name}</h3>
                        <p class="property-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.location}
                        </p>
                        <div class="property-details">
                            <span><i class="fas fa-bed"></i> ${property.bedrooms} ch.</span>
                            <span><i class="fas fa-bath"></i> ${property.bathrooms} sdb</span>
                            <span><i class="fas fa-ruler-combined"></i> ${property.area} m²</span>
                        </div>
                        <div class="property-price">${this.formatPrice(property.price)} FCFA/mois</div>
                        <div class="property-actions">
                            <button class="btn-small btn-edit" onclick="editProperty(${property.id})">
                                <i class="fas fa-edit"></i>
                                Modifier
                            </button>
                            <button class="btn-small btn-delete" onclick="deleteProperty(${property.id})">
                                <i class="fas fa-trash"></i>
                                Supprimer
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Charger les favoris de l'utilisateur
    loadUserFavorites() {
        const favorites = JSON.parse(localStorage.getItem('habiloc_favorites') || '[]');
        const properties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        
        const userFavorites = favorites
            .filter(f => f.userId === this.currentUser.id)
            .map(f => properties.find(p => p.id === f.propertyId))
            .filter(p => p);

        const favoritesGrid = document.getElementById('userFavorites');
        if (userFavorites.length === 0) {
            // Afficher des propriétés d'exemple pour les favoris
            const exampleFavorites = [
                {
                    id: 1,
                    name: "Villa moderne avec jardin",
                    location: "Plateau, Niamey",
                    price: 250000,
                    bedrooms: 4,
                    bathrooms: 3,
                    image: "images/images.jpg"
                },
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
                }
            ];

            favoritesGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-heart"></i>
                    <h3>Aucun favori</h3>
                    <p>Vous n'avez pas encore ajouté de propriété aux favoris. Voici quelques suggestions :</p>
                </div>
                ${exampleFavorites.map(property => `
                    <div class="property-card">
                        <div class="property-image">
                            <img src="${property.image}" alt="${property.name}" onerror="this.src='images/placeholder.jpg'">
                        </div>
                        <div class="property-content">
                            <h3 class="property-title">${property.name}</h3>
                            <p class="property-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${property.location}
                            </p>
                            <div class="property-details">
                                <span><i class="fas fa-bed"></i> ${property.bedrooms} ch.</span>
                                <span><i class="fas fa-bath"></i> ${property.bathrooms} sdb</span>
                            </div>
                            <div class="property-price">${this.formatPrice(property.price)} FCFA/mois</div>
                            <div class="property-actions">
                                <a href="property.html?id=${property.id}" class="btn-small btn-edit">
                                    <i class="fas fa-eye"></i>
                                    Voir
                                </a>
                                <button class="btn-small btn-edit" onclick="addToFavorites(${property.id})">
                                    <i class="fas fa-heart"></i>
                                    Ajouter aux favoris
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            `;
        } else {
            favoritesGrid.innerHTML = userFavorites.map(property => `
                <div class="property-card">
                    <div class="property-image">
                        <img src="${property.images ? property.images[0] : 'images/placeholder.jpg'}" 
                             alt="${property.name}" 
                             onerror="this.src='images/placeholder.jpg'">
                    </div>
                    <div class="property-content">
                        <h3 class="property-title">${property.name}</h3>
                        <p class="property-location">
                            <i class="fas fa-map-marker-alt"></i>
                            ${property.location}
                        </p>
                        <div class="property-details">
                            <span><i class="fas fa-bed"></i> ${property.bedrooms} ch.</span>
                            <span><i class="fas fa-bath"></i> ${property.bathrooms} sdb</span>
                        </div>
                        <div class="property-price">${this.formatPrice(property.price)} FCFA/mois</div>
                        <div class="property-actions">
                            <a href="property.html?id=${property.id}" class="btn-small btn-edit">
                                <i class="fas fa-eye"></i>
                                Voir
                            </a>
                            <button class="btn-small btn-delete" onclick="removeFavorite(${property.id})">
                                <i class="fas fa-heart-broken"></i>
                                Retirer
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    // Charger les demandes de l'utilisateur
    loadUserRequests() {
        const contacts = JSON.parse(localStorage.getItem('habiloc_contacts') || '[]');
        const userContacts = contacts.filter(c => c.userId === this.currentUser.id);

        const requestsList = document.getElementById('userRequests');
        if (userContacts.length === 0) {
            requestsList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-envelope"></i>
                    <h3>Aucune demande</h3>
                    <p>Vous n'avez pas encore fait de demande.</p>
                </div>
            `;
        } else {
            requestsList.innerHTML = userContacts.map(contact => `
                <div class="request-card">
                    <div class="request-header">
                        <div class="request-info">
                            <h4>${contact.name}</h4>
                            <p>${contact.email} • ${contact.phone}</p>
                        </div>
                        <span class="request-type">${this.getRequestTypeLabel(contact.type)}</span>
                    </div>
                    <div class="request-message">
                        <strong>Propriété :</strong> ${contact.propertyName}<br>
                        <strong>Message :</strong> ${contact.message || 'Aucun message'}
                    </div>
                    <div class="request-actions">
                        <span class="request-time">${this.formatDate(contact.timestamp)}</span>
                    </div>
                </div>
            `).join('');
        }
    }

    // Charger les données d'administration
    loadAdminData() {
        if (this.currentUser.userType !== 'admin') return;

        this.loadAdminProperties();
        this.loadAdminUsers();
        this.loadAdminContacts();
    }

    // Charger les propriétés pour l'admin
    loadAdminProperties() {
        const properties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        const adminTable = document.getElementById('adminPropertiesTable');
        
        adminTable.innerHTML = properties.map(property => `
            <tr>
                <td>
                    <div>
                        <strong>${property.name}</strong><br>
                        <small>${property.location}</small>
                    </div>
                </td>
                <td>${this.formatPrice(property.price)} FCFA</td>
                <td>
                    <span class="status-badge ${property.status || 'active'}">
                        ${property.status === 'pending' ? 'En attente' : 'Actif'}
                    </span>
                </td>
                <td>
                    <button class="btn-small btn-edit" onclick="editProperty(${property.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteProperty(${property.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Charger les utilisateurs pour l'admin
    loadAdminUsers() {
        const users = JSON.parse(localStorage.getItem('habiloc_users') || '[]');
        const adminTable = document.getElementById('adminUsersTable');
        
        adminTable.innerHTML = users.map(user => `
            <tr>
                <td>
                    <div>
                        <strong>${user.firstName} ${user.lastName}</strong><br>
                        <small>${user.phone}</small>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>
                    <span class="type-badge ${user.userType}">
                        ${user.userType === 'owner' ? 'Propriétaire' : 'Locataire'}
                    </span>
                </td>
                <td>
                    <button class="btn-small btn-edit" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteUser(${user.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Charger les contacts pour l'admin
    loadAdminContacts() {
        const contacts = JSON.parse(localStorage.getItem('habiloc_contacts') || '[]');
        const adminTable = document.getElementById('adminContactsTable');
        
        adminTable.innerHTML = contacts.map(contact => `
            <tr>
                <td>
                    <div>
                        <strong>${contact.name}</strong><br>
                        <small>${contact.phone}</small>
                    </div>
                </td>
                <td>${contact.email}</td>
                <td>${contact.propertyName}</td>
                <td>${this.formatDate(contact.timestamp)}</td>
                <td>
                    <button class="btn-small btn-edit" onclick="viewContact(${contact.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteContact(${contact.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Initialiser les formulaires
    initializeForms() {
        const profileForm = document.getElementById('profileForm');
        const propertyForm = document.getElementById('propertyForm');

        if (profileForm) {
            profileForm.addEventListener('submit', (e) => this.handleProfileUpdate(e));
        }

        if (propertyForm) {
            propertyForm.addEventListener('submit', (e) => this.handlePropertyAdd(e));
        }
    }

    // Remplir le formulaire de profil
    populateProfileForm() {
        if (this.currentUser) {
            document.getElementById('profileFirstName').value = this.currentUser.firstName;
            document.getElementById('profileLastName').value = this.currentUser.lastName;
            document.getElementById('profileEmail').value = this.currentUser.email;
            document.getElementById('profilePhone').value = this.currentUser.phone;
            document.getElementById('profileType').value = this.currentUser.userType;
        }
    }

    // Gérer la mise à jour du profil
    handleProfileUpdate(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Mettre à jour les données utilisateur
        this.currentUser.firstName = formData.get('firstName');
        this.currentUser.lastName = formData.get('lastName');
        this.currentUser.email = formData.get('email');
        this.currentUser.phone = formData.get('phone');
        this.currentUser.userType = formData.get('userType');

        // Sauvegarder
        localStorage.setItem('habiloc_user', JSON.stringify(this.currentUser));
        
        // Mettre à jour la base de données des utilisateurs
        const users = JSON.parse(localStorage.getItem('habiloc_users') || '[]');
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);
        if (userIndex > -1) {
            users[userIndex] = { ...users[userIndex], ...this.currentUser };
            localStorage.setItem('habiloc_users', JSON.stringify(users));
        }

        this.showSuccess('Profil mis à jour avec succès');
        this.loadUser();
    }

    // Gérer l'ajout de propriété
    handlePropertyAdd(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newProperty = {
            id: Date.now(),
            name: formData.get('name'),
            location: formData.get('location'),
            price: parseInt(formData.get('price')),
            bedrooms: parseInt(formData.get('bedrooms')),
            bathrooms: parseInt(formData.get('bathrooms')),
            area: parseInt(formData.get('area')),
            description: formData.get('description'),
            images: formData.get('images').split(',').map(url => url.trim()).filter(url => url),
            ownerId: this.currentUser.id,
            status: 'active',
            createdAt: new Date().toISOString()
        };

        // Sauvegarder la propriété
        const properties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        properties.push(newProperty);
        localStorage.setItem('habiloc_properties', JSON.stringify(properties));

        this.showSuccess('Propriété ajoutée avec succès');
        this.closeModal();
        this.loadUserProperties();
        this.loadStats();
    }

    // Afficher une section
    showSection(sectionName) {
        // Mettre à jour la navigation avec le nouveau système
        setActiveDashboardLink(sectionName);

        // Afficher la section
        document.querySelectorAll('.dashboard-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionName).classList.add('active');

        this.currentSection = sectionName;
    }

    // Afficher un onglet admin
    showAdminTab(tabName) {
        document.querySelectorAll('.admin-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[onclick="showAdminTab('${tabName}')"]`).classList.add('active');

        document.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.getElementById(`admin-${tabName}`).classList.add('active');
    }

    // Ouvrir le modal d'ajout de propriété
    addProperty() {
        document.getElementById('propertyModal').classList.add('active');
    }

    // Fermer le modal
    closeModal() {
        document.getElementById('propertyModal').classList.remove('active');
        document.getElementById('propertyForm').reset();
    }

    // Utilitaires
    formatPrice(price) {
        return price.toLocaleString('fr-FR');
    }

    formatDate(timestamp) {
        return new Date(timestamp).toLocaleDateString('fr-FR');
    }

    getRequestTypeLabel(type) {
        const labels = {
            'visit': 'Visite',
            'info': 'Information',
            'rent': 'Location'
        };
        return labels[type] || type;
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

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

// Initialiser le gestionnaire du tableau de bord
const dashboardManager = new DashboardManager();

// Fonctions globales
function showSection(sectionName) {
    dashboardManager.showSection(sectionName);
}

function showAdminTab(tabName) {
    dashboardManager.showAdminTab(tabName);
}

function addProperty() {
    dashboardManager.addProperty();
}

function closeModal() {
    dashboardManager.closeModal();
}

function logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        localStorage.removeItem('habiloc_user');
        window.location.href = 'index.html';
    }
}

// Fonctions pour les actions sur les propriétés
function editProperty(id) {
    dashboardManager.showSuccess('Fonctionnalité en développement');
}

function deleteProperty(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
        const properties = JSON.parse(localStorage.getItem('habiloc_properties') || '[]');
        const updatedProperties = properties.filter(p => p.id !== id);
        localStorage.setItem('habiloc_properties', JSON.stringify(updatedProperties));
        
        dashboardManager.showSuccess('Propriété supprimée');
        dashboardManager.loadUserProperties();
        dashboardManager.loadStats();
    }
}

function removeFavorite(propertyId) {
    const favorites = JSON.parse(localStorage.getItem('habiloc_favorites') || '[]');
    const updatedFavorites = favorites.filter(f => !(f.userId === dashboardManager.currentUser.id && f.propertyId === propertyId));
    localStorage.setItem('habiloc_favorites', JSON.stringify(updatedFavorites));
    
    dashboardManager.showSuccess('Propriété retirée des favoris');
    dashboardManager.loadUserFavorites();
    dashboardManager.loadStats();
}

function addToFavorites(propertyId) {
    const favorites = JSON.parse(localStorage.getItem('habiloc_favorites') || '[]');
    const newFavorite = {
        userId: dashboardManager.currentUser.id,
        propertyId: propertyId,
        addedAt: new Date().toISOString()
    };
    
    // Vérifier si déjà en favori
    const exists = favorites.some(f => f.userId === dashboardManager.currentUser.id && f.propertyId === propertyId);
    if (!exists) {
        favorites.push(newFavorite);
        localStorage.setItem('habiloc_favorites', JSON.stringify(favorites));
        dashboardManager.showSuccess('Propriété ajoutée aux favoris');
        dashboardManager.loadUserFavorites();
        dashboardManager.loadStats();
    } else {
        dashboardManager.showError('Cette propriété est déjà dans vos favoris');
    }
}

// Fermer le modal en cliquant à l'extérieur
document.addEventListener('click', (e) => {
    const modal = document.getElementById('propertyModal');
    if (e.target === modal) {
        closeModal();
    }
});
