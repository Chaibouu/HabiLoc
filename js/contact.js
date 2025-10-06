// Gestion du formulaire de contact - HabiLoc
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
});

function handleContactSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Validation des données
    if (!validateContactForm(contactData)) {
        return;
    }
    
    // Afficher l'état de chargement
    const submitBtn = event.target.querySelector('.contact-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    submitBtn.disabled = true;
    
    // Simuler l'envoi (dans un vrai projet, ceci serait une requête AJAX)
    setTimeout(() => {
        // Sauvegarder dans localStorage pour simulation
        saveContactMessage(contactData);
        
        // Afficher le message de succès
        showSuccessMessage();
        
        // Réinitialiser le formulaire
        event.target.reset();
        
        // Restaurer le bouton
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

function validateContactForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Veuillez entrer une adresse email valide');
    }
    
    if (!data.subject || data.subject.trim().length < 5) {
        errors.push('Le sujet doit contenir au moins 5 caractères');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Le message doit contenir au moins 10 caractères');
    }
    
    if (errors.length > 0) {
        showErrorMessage(errors);
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveContactMessage(data) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(data);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    console.log('Message de contact sauvegardé:', data);
}

function showSuccessMessage() {
    // Créer le message de succès
    const successDiv = document.createElement('div');
    successDiv.className = 'contact-success';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message envoyé avec succès !</h3>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
        </div>
    `;
    
    // Ajouter les styles
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 25px 50px rgba(16, 185, 129, 0.3);
        z-index: 1000;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;
    
    // Styles pour le contenu
    const successContent = successDiv.querySelector('.success-content');
    successContent.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    `;
    
    successContent.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: white;
    `;
    
    successContent.querySelector('h3').style.cssText = `
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    `;
    
    successContent.querySelector('p').style.cssText = `
        font-size: 1rem;
        margin: 0;
        opacity: 0.9;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(successDiv);
    
    // Animation d'entrée
    successDiv.style.opacity = '0';
    successDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
    
    setTimeout(() => {
        successDiv.style.transition = 'all 0.3s ease';
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    // Supprimer après 3 secondes
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

function showErrorMessage(errors) {
    // Créer le message d'erreur
    const errorDiv = document.createElement('div');
    errorDiv.className = 'contact-error';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Erreur de validation</h3>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        </div>
    `;
    
    // Ajouter les styles
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 25px 50px rgba(239, 68, 68, 0.3);
        z-index: 1000;
        text-align: center;
        max-width: 400px;
        width: 90%;
    `;
    
    // Styles pour le contenu
    const errorContent = errorDiv.querySelector('.error-content');
    errorContent.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    `;
    
    errorContent.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: white;
    `;
    
    errorContent.querySelector('h3').style.cssText = `
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0;
    `;
    
    errorContent.querySelector('ul').style.cssText = `
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
    `;
    
    errorContent.querySelector('ul li').style.cssText = `
        padding: 0.25rem 0;
        font-size: 0.9rem;
    `;
    
    // Ajouter au DOM
    document.body.appendChild(errorDiv);
    
    // Animation d'entrée
    errorDiv.style.opacity = '0';
    errorDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
    
    setTimeout(() => {
        errorDiv.style.transition = 'all 0.3s ease';
        errorDiv.style.opacity = '1';
        errorDiv.style.transform = 'translate(-50%, -50%) scale(1)';
    }, 10);
    
    // Supprimer après 4 secondes
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        errorDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            document.body.removeChild(errorDiv);
        }, 300);
    }, 4000);
}

// Fonction pour récupérer les messages de contact (pour l'admin)
function getContactMessages() {
    return JSON.parse(localStorage.getItem('contactMessages') || '[]');
}

// Export pour utilisation dans d'autres scripts
window.handleContactSubmit = handleContactSubmit;
window.getContactMessages = getContactMessages;
