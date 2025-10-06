# HabiLoc - Guide de Développement Complet

## 📋 Vue d'ensemble
HabiLoc est une plateforme de location immobilière moderne et responsive. Ce guide détaille toutes les spécifications techniques pour reproduire exactement le design et les fonctionnalités.

## 🎨 Palette de Couleurs

### Couleurs Principales
```css
:root {
    --primary-color: #2563eb;        /* Bleu principal */
    --primary-dark: #1d4ed8;         /* Bleu foncé */
    --secondary-color: #64748b;      /* Gris secondaire */
    --accent-color: #f59e0b;         /* Orange accent */
    --success-color: #10b981;         /* Vert succès */
    --danger-color: #ef4444;         /* Rouge danger */
    --warning-color: #f59e0b;        /* Orange warning */
}
```

### Couleurs de Texte
```css
:root {
    --text-color: #1f2937;           /* Texte principal (gris foncé) */
    --text-light: #6b7280;          /* Texte secondaire (gris moyen) */
    --text-muted: #9ca3af;         /* Texte atténué (gris clair) */
}
```

### Couleurs de Background
```css
:root {
    --bg-color: #ffffff;            /* Background principal (blanc) */
    --bg-light: #f8fafc;           /* Background clair (gris très clair) */
    --bg-dark: #1a1a1a;            /* Background sombre (noir) */
}
```

### Couleurs de Bordure
```css
:root {
    --border-color: #e5e7eb;        /* Bordure claire */
    --border-dark: #d1d5db;         /* Bordure foncée */
}
```

## 🔤 Typographie

### Police Principale
```css
font-family: 'Inter', sans-serif;
```

### Tailles de Police

#### Titres
```css
.hero-title {
    font-size: 4rem;                /* Desktop */
    font-size: 2.5rem;              /* Tablet (768px) */
    font-size: 2rem;                /* Mobile (480px) */
    font-size: 1.75rem;             /* Petit mobile (360px) */
    font-weight: 700;
    line-height: 1.2;
}

.section-title {
    font-size: 2.5rem;              /* Desktop */
    font-size: 2rem;                /* Mobile */
    font-weight: 700;
}

.modal-header h2 {
    font-size: 1.75rem;
    font-weight: 700;
}
```

#### Sous-titres
```css
.hero-subtitle {
    font-size: 1.5rem;              /* Desktop */
    font-size: 1.125rem;            /* Tablet */
    font-size: 1rem;                /* Mobile */
    font-weight: 400;
}

.contact-subtitle {
    font-size: 1.125rem;
    font-weight: 400;
}
```


## 📱 Responsive Design

### Breakpoints
```css
/* Desktop */
@media (min-width: 1024px) { }

/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Petit mobile */
@media (max-width: 480px) { }

/* Très petit mobile */
@media (max-width: 360px) { }
```



Ce guide contient toutes les spécifications nécessaires pour reproduire exactement le design et les fonctionnalités de HabiLoc. Suivez ces guidelines pour un développement cohérent et professionnel.
