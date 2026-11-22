# Mission Kami · Css_game

Un jeu pour apprendre le CSS en écrivant du vrai code, pensé pour les personnes qui veulent **commencer une formation dans le web** : aucune connaissance n’est nécessaire.

Kami est un caméléon qui a perdu toutes ses couleurs : il est devenu gris comme une page web sans style. Chaque mission habille une petite page de son univers (sa fiche, son carnet, sa carte de visite…), et chaque atelier terminé rend la couleur d’une partie de Kami (la tête, le corps, la crête…).

## Jouer

- **En ligne** : active GitHub Pages (Settings › Pages › *Deploy from a branch*, choisis la branche du jeu et le dossier `/ (root)`). Le jeu sera disponible à l’adresse `https://diurndesign.github.io/Css_game/`.
- **En local** : ouvre le dossier avec l’extension Live Server de VS Code (ou n’importe quel petit serveur web). Ouvrir `index.html` en double-cliquant peut bloquer l’aperçu dans certains navigateurs.

La progression est enregistrée dans le navigateur de chaque joueur (localStorage).

## Comment ça marche

- **Découvrir** : une page qui explique ce qu’est le CSS, à quoi ça sert et pourquoi on l’utilise, avec une démo à manipuler, des exemples de la vraie vie, les métiers du web qui s’en servent, le vocabulaire et les pièges du débutant.
- **Les missions** : la page change **en direct** pendant que l’élève tape son CSS, à côté du modèle à reproduire. Le bouton **Vérifier** (ou Ctrl + Entrée) contrôle chaque objectif.

| Onglet | Ce qu’on y voit |
|---|---|
| Ton résultat / Le modèle | La page de l’élève, et la page à reproduire |
| Objectifs | Chaque critère réussi ou raté, avec une explication quand c’est faux |
| Remarques | Le vérificateur CSS : accolade, deux-points ou point-virgule oubliés, propriété inconnue, valeur invalide (couleur en français, unité manquante…), sélecteur qui ne trouve rien… en français, avec la ligne surlignée dans l’éditeur |

Chaque leçon explique **ce que c’est**, **à quoi ça sert**, le **piège à éviter** et la **bonne pratique** professionnelle. Les missions responsive ont une bascule **Ordinateur / Téléphone**.

Étoiles : 3 sans indice, 2 avec un indice, 1 avec la solution.

## Pour aller jusqu’au bout

- **Lexique** (menu en haut) : 59 mots du vocabulaire professionnel, définis simplement, avec une recherche ; 12 bonnes pratiques ; et la checklist **« Prêt pour la suite ? »** (15 points), qui renvoie vers la mission à revoir pour chaque point.
- **Ateliers** : chaque atelier annonce ce qu’on va apprendre et se termine par un bilan « Ce que tu sais faire maintenant ».
- **Découvrir** : la page commence par ce qu’il faut savoir avant de commencer, et renvoie au jeu précédent si besoin.

## Les 24 missions

| Atelier | Récompense | Notions |
|---|---|---|
| 1. Le pinceau | La tête | une règle CSS, classes . et id #, la syntaxe : { } : ;, quiz |
| 2. Les couleurs | Le corps | color et background-color, #hexadécimal et rgb(), cascade, spécificité et héritage |
| 3. Les lettres | La crête | font-family, font-size, font-weight, text-align, line-height, text-transform, les unités : px, rem, em, %, vw |
| 4. Les boîtes | Les pattes | padding, border, margin, display : block, inline, inline-block, none, border-radius, width, box-sizing, centrer une boîte : max-width et margin: 0 auto, quiz |
| 5. Les états et les variables | La queue | :hover et cursor, :focus et l’accessibilité, transition, les variables CSS |
| 6. La carte de Kami | Les taches | sélecteurs combinés, box-shadow, position : relative et absolute, le responsive : @media, mission finale |

En plus : un **Carnet** (antisèche des notions débloquées) et un **Bac à sable** pour tester librement. Dans le Carnet, l’option « Débloquer toutes les missions » permet au formateur d’ouvrir toutes les missions.

## Fichiers

```
index.html   la structure de la page
jeu.css      le design commun aux 4 jeux
theme.css    les couleurs de ce jeu (variables CSS dans :root)
engine.js    le moteur commun : éditeur, aperçu, vérificateur, objectifs, carte, carnet, lexique
cloud.js     la sauvegarde en ligne (Firebase), reprise de Mission Bip
mascot.js    Kami, le caméléon, en SVG
game.js      les données du jeu : page Découvrir, lexique, ateliers et missions (tableau levels)
```

Pour ajouter ou modifier une mission, édite le tableau `levels` dans `game.js`. Chaque mission contient : le texte de Kami, la leçon (quoi, pourquoi, code, morceaux, piège), les étapes, la page HTML (`html`), le code de départ, les objectifs (`goals`, avec une fonction `test`), les indices et la solution (qui sert aussi de modèle à reproduire).

## La sauvegarde en ligne

Comme dans Mission Bip : sans compte, la progression reste dans le navigateur. Avec un compte (**e-mail + mot de passe**, bouton « Se connecter » en haut), elle est enregistrée en ligne dans Firebase (projet « bip-jeux », le même que Mission Bip) et l’élève la retrouve sur n’importe quel ordinateur. **Le même compte sert pour tous les jeux** : La maison de Bip, Mission Kami, Kami et les lucioles, Le potager de Kami, Kami s’adapte, Mission Bip et Bip Agence. Chaque élève ne peut lire et modifier que sa propre progression.

Ce qui est enregistré pour le formateur, mission par mission : essais, essais ratés, erreurs du vérificateur, indices, solution vue, réponses fausses aux quiz, étoiles et temps passé (même format que Mission Bip).

Rappel aux élèves : noter son e-mail et son mot de passe, et se déconnecter en partant d’un ordinateur de l’école.

### À faire une fois dans Firebase (formateur)

Les règles Firestore du projet « bip-jeux » n’autorisent pour l’instant que `mission-bip` et `bip-agence`. Dans **console.firebase.google.com › bip-jeux › Firestore Database › Règles**, remplace la liste des jeux par :

```
&& jeu in ['mission-bip', 'bip-agence', 'maison-bip', 'mission-kami', 'kami-lucioles', 'kami-potager', 'kami-ecrans'];
```

puis clique sur **Publier**. Sans cette étape, le jeu marche quand même, mais la sauvegarde en ligne affiche « La base refuse l’accès ».

| Jeu | Nom du document dans Firestore |
|---|---|
| La maison de Bip (HTML) | `eleves/{uid}/jeux/maison-bip` |
| Mission Kami (CSS) | `eleves/{uid}/jeux/mission-kami` |
| Kami et les lucioles (Flexbox) | `eleves/{uid}/jeux/kami-lucioles` |
| Le potager de Kami (Grid) | `eleves/{uid}/jeux/kami-potager` |
| Kami s’adapte (Responsive) | `eleves/{uid}/jeux/kami-ecrans` |

L’**Espace formateur** (bouton en bas de page) est celui de Mission Bip : `https://diurndesign.github.io/javascript_game/admin.html`.

## La série

| Jeu | Langage | Mascotte |
|---|---|---|
| [La maison de Bip](https://diurndesign.github.io/Html_game/) | HTML | la maison de Bip, à construire |
| [Mission Kami](https://diurndesign.github.io/Css_game/) | CSS | Kami, le caméléon |
| [Kami et les lucioles](https://diurndesign.github.io/Flexbox-game/) | CSS Flexbox | Kami |
| [Le potager de Kami](https://diurndesign.github.io/Grid-game/) | CSS Grid | Kami |
| [Kami s’adapte](https://diurndesign.github.io/Responsive-game/) | Responsive | Kami |
| [Mission Bip](https://diurndesign.github.io/javascript_game/) | JavaScript | Bip, le robot |

---

Créé par Diurn Studio.
