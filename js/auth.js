// Gestion de l'authentification
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUser();
        this.initializeForms();
        this.initializePasswordStrength();
    }

    // Charger l'utilisateur depuis le localStorage
    loadUser() {
        const userData = localStorage.getItem('habiloc_user');
        if (userData) {
            this.currentUser = JSON.parse(userData);
        }
    }

    // Sauvegarder l'utilisateur dans le localStorage
    saveUser(user) {
        this.currentUser = user;
        localStorage.setItem('habiloc_user', JSON.stringify(user));
    }

    // Déconnexion
    logout() {
        this.currentUser = null;
        localStorage.removeItem('habiloc_user');
        window.location.href = 'index.html';
    }

    // Initialiser les formulaires
    initializeForms() {
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }
    }

    // Gestion de la connexion
    async handleLogin(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const remember = formData.get('remember');

        // Validation
        if (!this.validateEmail(email)) {
            this.showError('Veuillez entrer un email valide');
            return;
        }

        if (password.length < 6) {
            this.showError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        // Simulation de l'authentification
        const user = await this.authenticateUser(email, password);
        
        if (user) {
            this.saveUser(user);
            this.showSuccess('Connexion réussie !');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            this.showError('Email ou mot de passe incorrect');
        }
    }

    // Gestion de l'inscription
    async handleRegister(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            userType: formData.get('userType'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            terms: formData.get('terms'),
            newsletter: formData.get('newsletter')
        };

        // Validation
        if (!this.validateRegistration(userData)) {
            return;
        }

        // Simulation de l'inscription
        const user = await this.registerUser(userData);
        
        if (user) {
            this.saveUser(user);
            this.showSuccess('Compte créé avec succès !');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            this.showError('Erreur lors de la création du compte');
        }
    }

    // Validation de l'email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validation de l'inscription
    validateRegistration(userData) {
        // Vérifier les champs requis
        if (!userData.firstName.trim()) {
            this.showError('Le prénom est requis');
            return false;
        }

        if (!userData.lastName.trim()) {
            this.showError('Le nom est requis');
            return false;
        }

        if (!this.validateEmail(userData.email)) {
            this.showError('Veuillez entrer un email valide');
            return false;
        }

        if (!userData.phone.trim()) {
            this.showError('Le téléphone est requis');
            return false;
        }

        if (!userData.userType) {
            this.showError('Veuillez sélectionner un type de compte');
            return false;
        }

        if (userData.password.length < 6) {
            this.showError('Le mot de passe doit contenir au moins 6 caractères');
            return false;
        }

        if (userData.password !== userData.confirmPassword) {
            this.showError('Les mots de passe ne correspondent pas');
            return false;
        }

        if (!userData.terms) {
            this.showError('Vous devez accepter les conditions d\'utilisation');
            return false;
        }

        return true;
    }

    // Simulation de l'authentification
    async authenticateUser(email, password) {
        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Vérifier dans le localStorage (simulation de base de données)
        const users = JSON.parse(localStorage.getItem('habiloc_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            return {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userType: user.userType,
                phone: user.phone
            };
        }
        
        return null;
    }

    // Simulation de l'inscription
    async registerUser(userData) {
        // Simulation d'un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Vérifier si l'email existe déjà
        const users = JSON.parse(localStorage.getItem('habiloc_users') || '[]');
        const existingUser = users.find(u => u.email === userData.email);
        
        if (existingUser) {
            this.showError('Cet email est déjà utilisé');
            return null;
        }

        // Créer le nouvel utilisateur
        const newUser = {
            id: Date.now(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            userType: userData.userType,
            password: userData.password,
            createdAt: new Date().toISOString()
        };

        // Sauvegarder dans le localStorage
        users.push(newUser);
        localStorage.setItem('habiloc_users', JSON.stringify(users));

        return {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            userType: newUser.userType,
            phone: newUser.phone
        };
    }

    // Initialiser la vérification de la force du mot de passe
    initializePasswordStrength() {
        const passwordInput = document.getElementById('password');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');

        if (passwordInput && strengthFill && strengthText) {
            passwordInput.addEventListener('input', (e) => {
                const password = e.target.value;
                const strength = this.calculatePasswordStrength(password);
                
                strengthFill.className = 'strength-fill ' + strength.level;
                strengthText.textContent = strength.text;
            });
        }
    }

    // Calculer la force du mot de passe
    calculatePasswordStrength(password) {
        let score = 0;
        
        if (password.length >= 8) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score < 2) {
            return { level: 'weak', text: 'Mot de passe faible' };
        } else if (score < 4) {
            return { level: 'medium', text: 'Mot de passe moyen' };
        } else {
            return { level: 'strong', text: 'Mot de passe fort' };
        }
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
        // Supprimer les messages existants
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Créer le nouveau message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
            <span>${message}</span>
        `;

        // Ajouter les styles
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

        // Supprimer après 5 secondes
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
}

// Fonction pour basculer la visibilité du mot de passe
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.nextElementSibling;
    const icon = toggle.querySelector('i');

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Initialiser l'AuthManager
const authManager = new AuthManager();

// Ajouter les styles d'animation pour les messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Gestion des boutons de connexion sociale
document.addEventListener('DOMContentLoaded', function() {
    const googleBtn = document.querySelector('.btn-social.google');
    const facebookBtn = document.querySelector('.btn-social.facebook');

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            authManager.showMessage('Connexion Google en cours de développement', 'error');
        });
    }

    if (facebookBtn) {
        facebookBtn.addEventListener('click', () => {
            authManager.showMessage('Connexion Facebook en cours de développement', 'error');
        });
    }
});

// Vérifier si l'utilisateur est connecté
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('habiloc_user') || 'null');
    if (!user) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Fonction de déconnexion
function logout() {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
        authManager.logout();
    }
}
