# Template React – Guide d’utilisation

## Frontend

Ce template React conçu pour être modulable, multilingue et sécurisé.  
Il inclut la gestion des routes, des rôles utilisateurs, des traductions et une sidebar personnalisable.

### **Structure du Frontend**

```
src/
├── App.jsx
├── Sidebar.jsx
├── components/
│   ├── LayoutAvecSidebar.jsx
│   └── LanguageSwitch.jsx
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   └── AdminPage.jsx
├── config/
│   ├── ApiLink.js
│   ├── ApplicationTitle.js
│   ├── AxiosInstance.js
│   ├── i18n.js
│   └── UserData.js
├── locales/
│   ├── fr.json
│   ├── en.json
│   ├── de.json
│   ├── es.json
│   └── it.json
└── assets/
    └── logo.png
```


### **1. App.jsx**

Ce fichier structure l’application et contient :

- **`<ToastContainer />`** : Affiche les pop-ups d’erreur.
- **`<I18nextProvider i18n={i18n}>`** et **`<LanguageProvider>`** : Gestion des traductions.
- **`<Routes>`** et **`<Route />`** : Gestion des redirections.

**Routes à ne pas modifier :**
- `/login`
- `/reset-password/:uidb64/:token`
- `/`
- `/home`
- `/unauthorized`
- `*`
- Route avec `<LayoutAvecSidebar onLogout={handleLogout} />`

Pour les autres routes :
- **`path`** : Indiquez le chemin (gardez le `/`).
- **`allowedRoles`** : Liste des rôles autorisés.
- **Composant** : Placez le composant de votre page.



### **2. Sidebar.jsx**

Modifiez le tableau `menuItems` pour personnaliser la sidebar :

- **`key`** : Identifiant unique.
- **`label`** : Nom affiché (utilisez `t('NomDeVotreOnglet')` pour la traduction).
- **`icon`** : Icône (choisissez sur React Icons et importez-la).
- **`path`** : Chemin défini dans `App.jsx`.
- **`minRole`** : Rôle minimum pour voir le bouton.



### **3. Locales**

Les fichiers de traductions sont dans le dossier `locales` et contiennent des fichiers JSON.  
Chaque fichier doit être nommé avec le diminutif de la langue suivi de `.json` (exemple : `fr.json`, `en.json`, `de.json`, `es.json`, `it.json`).

#### Étapes pour ajouter une nouvelle langue :
1. **Créer un fichier JSON** dans le dossier `locales` avec les traductions.
2. **Ajouter une option** dans le composant `LanguageSwitch.jsx` :
   ```jsx
   <select>
     <option value="fr">Français</option>
     <option value="en">English</option>
     <option value="de">Deutsch</option>
     <option value="es">Español</option>
     <option value="it">Italiano</option>
     <!-- Exemple de nouvelle langue -->
     <option value="pt">Português</option>
   </select>



### **4. Config**

Le dossier `config` centralise les scripts de configuration du front de l’application.  
Ces fichiers servent à définir des valeurs globales et des paramètres utilisés dans toute l’application.

#### **ApiLink.js**

Ce fichier contient les variables pour les liens vers les APIs.

#### **ApplicationTitle.js**

Ce fichier définit le titre de l’application.

Changer cette valeur modifie le nom affiché dans l’application.

#### **AxiosInstance.js**

Ce fichier gère la configuration Axios et la gestion des tokens.

Il permet de faire les appels sur les bons urls en configurant des clients Axios.

Il inclut également : 
- Injection automatique du token dans les requêtes.
- Gestion du refresh token en cas de 401.
- Nettoyage et redirection si le refresh échoue.

#### **i18n.js**

Ce fichier configure les langues et les fichiers de traduction.

Pour configurer une nouvelle langue dans `i18n.js` :
```js

import pt from "../locales/pt.json";

i18n.use(initReactI18next).init({
  resources: {
    fr: { translation: fr },
    en: { translation: en },
    de: { translation: de },
    es: { translation: es },
    it: { translation: it },
    pt: { translation: pt }, // Nouvelle langue
  },
  lng: "fr",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});
```

#### **UserData.js**

Ce fichier stocke les données utilisateur après la connexion pour les rendre accessibles dans toute l’application.


## **5. Pages**
Le dossier `pages/` contient les **pages affichées dans l’application** (notamment celles présentes dans la sidebar).  
Elles sont liées aux routes définies dans `App.jsx`.

### À ne pas supprimer
Ne supprimez pas les **pages de base** utilisées par `App.jsx`, telles que :
- `Login.jsx`
- `ResetPassword.jsx`
- `Home.jsx`
- `Unauthorized.jsx`
- `NotFound.jsx` (route `*`)

Vous pouvez **supprimer les pages d’exemple** non utilisées.


## **6. Components**
Le dossier `components/` contient les **composants réutilisables** et ceux qui structurent les pages (ex. `LayoutAvecSidebar`).  
Ils permettent de centraliser l’UI et d’éviter la duplication de code. 

### À ne pas supprimer
Ne supprimez pas les pages se trouvant dans le dossier `components` hormis `RandomExampleRedirect.jsx` qui est un composant d'exemple. Ne supprimez pas non plus le contenu des dossiers `Login`et `Utils`


## **7. Assets**
Le dossier `assets/` est destiné à stocker toutes les **ressources statiques** de l’application, telles que :
- Images (logos, icônes personnalisées, illustrations)
- Fichiers multimédias (vidéos, sons)
- Éventuellement des fichiers SVG pour les icônes spécifiques

---

## Backend

### **Structure du Backend**

```
backend/
├── manage.py                             
├── requirements.txt                   
├── template_config_test.py  
└── template_backend/  
    ├── __init__.py            
    ├── settings.py                            
    ├── urls.py                                
    ├── wsgi.py                                
    ├── asgi.py                                
└── api/                                   
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── authentication.py
    ├── mixins.py
    ├── models.py        
    ├── permissions.py                          
    ├── serializers.py     
    ├── services.py   
    ├── tests.py                            
    ├── urls.py                            
    ├── utils.py   
    └── views.py                            
```

### **1. template_config_test.py**
Ce fichier contient la configuration des variables sensibles (par exemple, les identifiants de connexion à la base de données).

**Important** : Il doit être ajouté au .gitignore afin d’éviter la fuite d’informations critiques dans le dépôt Git.

### **2. settings.py**
Ce fichier définit les paramètres globaux du backend, notamment :

- Les modules et applications utilisés.
- Les frontends autorisés à se connecter.
- La configuration de la base de données.
- Les paramètres généraux du projet.

### **3. Api**
Ce dossier regroupe la logique métier du backend. Il contient les fichiers qui gèrent les interactions entre les modèles, les vues et les endpoints.

#### **models.py**
- **Objectif** : Définir la structure des données et leurs relations (tables de la base).
- **Utilisation** : Chaque modèle correspond à une entité métier (ex. Utilisateur, Projet).
- **Responsabilités** :
  - Définir les champs et contraintes (types, unicité, relations).
  - Gérer les comportements spécifiques (ex. méthodes utilitaires, validations internes).

#### **serializers.py**
- **Objectif** : Convertir les objets Python (modèles) en formats exploitables (JSON) et inversement.
- **Utilisation** : Contrôler les données entrantes et sortantes des API.
- **Responsabilités** :
  - Définir les champs exposés dans les réponses.
  - Valider les données avant création ou mise à jour.
  - Implémenter des règles métier simples (ex. contraintes sur un champ).

#### **views.py**
- **Objectif** : Répondre aux requêtes HTTP (GET, POST, PUT, DELETE).
- **Utilisation** : Orchestrer la logique entre modèles, serializers et services.
- **Responsabilités** :
  - Définir les actions CRUD (CREATE, READ, UPDATE, DELETE).
  - Appliquer les permissions et authentifications.
  - Gérer les réponses (statuts, messages).

#### **urls.py**
- **Objectif** : Connecter les vues aux URLs.
- **Utilisation** : Définir les routes accessibles depuis le frontend ou des clients externes.
- **Responsabilités** :
  - Organiser les endpoints par ressource.
  - Faciliter l’intégration via des routeurs.

#### **permissions.py**
- **Objectif** : Définir qui peut accéder à quoi.
- **Utilisation** : Vérifier les droits selon le rôle, l’utilisateur ou l’objet.
- **Responsabilités** :
  - Implémenter des règles globales (ex. authentification obligatoire).
  - Implémenter des règles par objet (ex. propriétaire ou admin).

#### **authentication.py**
- **Objectif** : Définir comment les utilisateurs sont identifiés.
- **Utilisation** : Gérer des schémas spécifiques (ex. Token JWT).
- **Responsabilités** :
  - Vérifier la validité des identifiants.
  - Retourner l’utilisateur authentifié pour la requête.

#### **utils.py**
- **Objectif** : Regrouper des fonctions génériques.
- **Utilisation** : Formatage, conversions, normalisations.
- **Responsabilités** :
  - Éviter la duplication de code.
  - Améliorer la lisibilité et la modularité.