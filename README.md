# DashBoard

## Description

Ce projet est une application web de tableau de bord interactif pour visualiser et gérer des projets de recherche. Elle permet de filtrer les projets par domaine de recherche, afficher des détails sur les projets, et gérer les projets via une interface responsive.

## Fonctionnalités

- **Filtrage par domaine de recherche** : Filtre les projets en fonction des domaines de recherche.

- **Affichage des projets** : Montre une liste de projets avec des détails comme le nom, l'institution, l'équipe de recherche, les sources de financement, etc.

- **Affichage des détails du projet** : Permet de voir des détails complets sur chaque projet via un bouton "View Details".

- **Navbar responsive** : Une barre de navigation réactive avec un bouton hamburger pour les petits écrans.

- **Changement Mode** : Une bouton de changement de mode ( dark/light) qui permet de modifier le l'apparence de la page a son actualisation 
  
## Technologies utilisées

- **Vue 3** : Framework JavaScript pour construire l'interface utilisateur.

- **Tailwind CSS** : Framework CSS pour styliser l'application et la rendre responsive.

- **Node.js** et **Express** : Backend pour gérer et fournir les données via une API RESTful.

- **amCharts** : Bibliothèque de graphiques pour afficher des visualisations de données.

## Prérequis

Avant de démarrer, assurez-vous que vous avez les outils suivants installés sur votre machine :

- **Node.js** : [Node.js](https://nodejs.org/) - Version recommandée : 14.x ou plus récente.

- **npm** : Le gestionnaire de paquets par défaut pour Node.js (installé avec Node.js).

- **Vue CLI** : [Vue CLI](https://cli.vuejs.org/) pour gérer les projets Vue.js.

## Installation

### 1. Cloner le projet
git clone https://github.com/mon_nom_utilisateur/projects-dashboard.git
cd projects-dashboard

### 2. Installer les dépendances
npm install

### 3. Lancer le serveur de développement ( frontend )
npm run serve
- Cela lancera le projet sur http://localhost:8080/ ou un autre port disponible.

### 4. Lancer le serveur de développement ( backend )
cd backend
npm install
npm start / node server.js
- Cela lancera le projet sur http://localhost:3000/