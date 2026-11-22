/* =====================================================================
   MISSION KAMI · les données du jeu CSS
   Chaque mission a sa page HTML (`html`, en lecture seule) et l’élève
   écrit le CSS. Le « modèle à reproduire » est la page avec la solution.
   Chaque objectif (goals) a une fonction `test(c)` qui renvoie
   true (réussi), false (raté) ou un texte (raté, avec une explication).
   Outils disponibles dans les tests : q, qa, txt, cs, decl, sameColor,
   px, hasCode, noErrors… (voir engine.js, « OUTILS POUR LES OBJECTIFS »)
   ===================================================================== */
MASCOT.style = "colors";

/* Petits outils propres au jeu CSS (préfixe k pour ne pas gêner le moteur) */
// les règles dont un des sélecteurs vérifie le test
const kRules = (c, test) => (c.rules || []).filter(r => r.sel && r.sel.split(",").some(s => test(norm(s))));
// la valeur écrite pour une propriété dans une règle « classe:hover »
const kHover = (c, cls, prop) => { let v = null; kRules(c, s => s.includes(cls + ":hover")).forEach(r => r.decls.forEach(d => { if (d.prop === prop || (prop === "background-color" && d.prop === "background")) v = d.value; })); return v; };
// la valeur écrite pour une propriété dans une règle « classe:état » (:focus, :hover…)
const kState = (c, cls, st, prop) => { let v = null; kRules(c, s => s.includes(cls + st)).forEach(r => r.decls.forEach(d => { if (d.prop === prop || (prop === "background-color" && d.prop === "background")) v = d.value; })); return v; };
// un contour (outline) bien visible ?
const kVisible = v => !!v && !/\bnone\b/i.test(v) && /\b(solid|dashed|dotted|double)\b/i.test(v) && !/^0(px)?\b/.test(v.trim());
// la valeur écrite dans une règle placée dans @media (max-width: 600px)
const kMQ = (c, sels, prop) => { let v = null; (c.rules || []).forEach(r => { if (r.media && /max-width\s*:\s*600px/i.test(r.media) && r.sel && r.sel.split(",").map(norm).some(x => sels.includes(x))) r.decls.forEach(d => { if (d.prop === prop) v = d.value; }); }); return v; };
// position (index) de la première règle qui vise ce sélecteur, dans ou hors @media
const kIndex = (c, sels, inMedia) => (c.rules || []).findIndex(r => !!r.media === inMedia && r.sel && r.sel.split(",").map(norm).some(x => sels.includes(x)));
// largeur réelle (bordure comprise) d’un élément
const kWidth = (c, sel) => { const e = q(c, sel); return e ? Math.round(e.getBoundingClientRect().width) : 0; };
// toutes les cibles ont cette couleur ?
const kAll = (c, sel, prop, color) => qa(c, sel).length > 0 && qa(c, sel).every(e => sameColor(cs(c, e, prop), color));
// la règle existe-t-elle, même vide ?
const kHasRule = (c, re) => (c.rules || []).some(r => r.sel && re.test(r.sel));

const GAME = {
  id: "mission-kami",
  name: "Mission Kami",
  title: ["Mission", "Kami"],
  kicker: "CSS · pour bien démarrer dans le web",
  lead: "Kami est un caméléon… qui a perdu toutes ses couleurs ! Il est devenu gris comme une page web sans style. Écris du vrai CSS, regarde la page changer en direct, et chaque atelier terminé rend une couleur à Kami.",
  mode: "css",
  lang: "css",
  rewardWord: "couleurs retrouvées",
  rewardLabel: "Couleur",
  rewardMsg: "Kami retrouve une couleur :",
  chapterNote: "Chaque atelier terminé rend ses couleurs à une partie de Kami.",
  finaleTitle: "Kami a retrouvé toutes ses couleurs !",
  confetti: ["#3DCB8B", "#FF9F43", "#FFD43B", "#0F766E", "#E8337A"],
  links: { html: "https://diurndesign.github.io/Html_game/", css: null, js: "https://diurndesign.github.io/javascript_game/" },
  next: {
    name: "Kami et les lucioles (Flexbox)",
    url: "https://diurndesign.github.io/Flexbox-game/",
    title: "La suite : aligner les éléments avec Flexbox",
    text: "Tu sais colorer, dimensionner, espacer, choisir le `display` d’un élément et adapter une page au téléphone. Il reste à **placer** les éléments côte à côte ou en colonne : c’est le rôle de **Flexbox**, qui s’active avec `display: flex` sur le parent. Kami t’attend au bord de l’étang, avec ses amies les lucioles."
  },
  pageHTML: `<h1>Bonjour</h1>`,

  /* ------------------------------------------------------------------
     PAGE « DÉCOUVRIR » : c’est quoi, à quoi ça sert, pourquoi
     ------------------------------------------------------------------ */
  discover: {
    nav: "Découvrir",
    button: "C’est quoi le CSS ?",
    subject: "le CSS",
    cardTitle: "C’est quoi le CSS ? À quoi ça sert ? Pourquoi on l’utilise ?",
    cardText: "5 minutes pour comprendre avant de jouer, avec une démo à tester.",
    kicker: "Étape 0 · Découvrir",
    title: "C’est quoi, le **CSS** ?",
    lead: "Aucune connaissance n’est nécessaire pour commencer. Prends cinq minutes pour comprendre ce qu’est le CSS, à quoi il sert, et pourquoi tous les sites du monde l’utilisent. Ensuite, tu l’écriras toi-même.",
    say: "Le CSS, c’est ma boîte de peinture ! Sans lui, je suis tout gris… et les pages web aussi. Je t’explique.",
    cards: [
      { title: "C’est quoi ?", text: ["CSS veut dire *Cascading Style Sheets*, en français « feuilles de style en cascade ». C’est le langage qui décrit **l’apparence** d’une page web : les couleurs, les polices d’écriture, les tailles, les espaces, les bordures…", "Le HTML dit **ce qu’il y a** dans la page (un titre, un paragraphe, un bouton). Le CSS dit **à quoi ça ressemble**. C’est un langage simple : des listes de **règles** du genre « les titres sont verts »."] },
      { title: "À quoi ça sert ?", text: "Le navigateur (Chrome, Firefox, Safari…, le logiciel qui affiche les sites) lit le HTML, puis applique le CSS par-dessus. Le CSS sert à :", list: ["choisir les **couleurs** du texte et des fonds ;", "choisir les **polices** et la taille des lettres ;", "créer des **boîtes** : marges, bordures, coins arrondis, ombres ;", "rendre les boutons **vivants** quand on passe la souris dessus ;", "placer les éléments et adapter la page aux téléphones (tu verras ça avec Flexbox et Grid)."] },
      { title: "Pourquoi on l’utilise ?", text: ["Parce que le HTML seul est triste : texte noir, fond blanc, liens bleus soulignés. C’est le CSS qui donne une **identité** à un site et qui le rend agréable à lire.", "Et surtout, le CSS est **rangé à part** dans un fichier `style.css`. Toutes les pages du site utilisent ce même fichier : tu changes une ligne, et la couleur change sur les 100 pages d’un coup. C’est un énorme gain de temps."] }
    ],
    trioFocus: "css",
    trioHere: "Tu es ici",
    trioNote: "Dans ce jeu, les murs sont déjà construits : le HTML de chaque page est écrit pour toi. Tu t’occupes de **la peinture et de la déco** avec le CSS. Avant, tu as construit la maison de Bip en HTML ; après, Bip t’apprendra le JavaScript.",
    demo: {
      title: "La même page, avec et sans CSS",
      text: "Clique sur les trois boutons. Le HTML ne change **jamais** : seul le CSS change.",
      lang: "css",
      html: `<div class="carte">
  <h1>Kami le caméléon</h1>
  <p class="role">Champion de cache-cache</p>
  <p>Je vis dans la forêt et je change de couleur selon mon humeur.</p>
  <ul>
    <li>Plat préféré : les grillons</li>
    <li>Talent : la langue la plus rapide de la forêt</li>
  </ul>
  <a class="bouton" href="#ami">Devenir mon ami</a>
</div>`,
      variants: [
        { label: "Sans CSS", raw: true, css: `/* Aucune ligne de CSS.
   Le navigateur utilise
   son style par défaut. */`, caption: "Sans CSS, le navigateur applique son style **par défaut** : une police « à empattements » (avec des petits pieds, comme dans les journaux), du texte noir, un lien bleu souligné. Tout le contenu est là, mais rien n’est mis en valeur." },
        { label: "Un peu de CSS", css: `body {
  font-family: Arial, sans-serif;
}

h1 {
  color: seagreen;
}

.role {
  color: sienna;
  font-weight: bold;
}`, caption: "Trois petites règles suffisent : une police plus moderne, un titre vert, le sous-titre en orange et en gras. Le HTML n’a pas changé d’une seule lettre !" },
        { label: "Beaucoup de CSS", css: `body {
  font-family: Arial, sans-serif;
  background-color: #EAF3EF;
}

.carte {
  max-width: 340px;
  margin: 0 auto;
  padding: 24px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);
  text-align: center;
}

h1 {
  margin: 0;
  font-family: Georgia, serif;
  color: seagreen;
}

.role {
  color: sienna;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
}

ul {
  padding: 12px;
  border-radius: 12px;
  background-color: #E1F7EC;
  list-style: none;
}

.bouton {
  display: inline-block;
  padding: 12px 20px;
  border-radius: 999px;
  background-color: seagreen;
  color: white;
  text-decoration: none;
}`, caption: "Avec plus de CSS, la même page devient une vraie carte de profil : un fond, des coins arrondis, une ombre, un joli bouton. À la fin du jeu, tu sauras écrire chacune de ces lignes." }
      ]
    },
    anatomy: {
      title: "Comment s’écrit une règle CSS",
      text: "Tout le CSS est fait de **règles** qui suivent ce modèle. Apprends-le une fois, il servira partout.",
      lang: "css",
      code: `h1 {\n  color: seagreen;\n  font-size: 32px;\n}`,
      pieces: [
        ["h1", "le **sélecteur** : il dit *qui* on colore. Ici, tous les titres `<h1>` de la page"],
        ["{ … }", "les **accolades** : elles entourent le **bloc de déclarations**"],
        ["color: seagreen;", "une **déclaration** : une propriété et sa valeur. Un bloc peut en contenir autant que tu veux, une par ligne"],
        ["color", "la **propriété** : *ce qu’on change* (ici, la couleur du texte). Toujours en anglais"],
        [":", "les deux-points séparent la propriété de sa valeur"],
        ["seagreen", "la **valeur** : *comment* on le change (ici, vert d’eau)"],
        [";", "le point-virgule termine la déclaration. Ne l’oublie jamais !"]
      ]
    },
    usesTitle: "Où on trouve du CSS dans la vraie vie",
    uses: [
      { title: "Sur chaque site", text: "Les couleurs de ta banque, la police de ton journal en ligne, les boutons arrondis de ta boutique préférée : tout ça, c’est du CSS." },
      { title: "Le mode sombre", text: "Quand une appli passe en fond noir le soir, le HTML ne bouge pas : c’est un autre jeu de règles CSS qui s’applique." },
      { title: "Sur ton téléphone", text: "Le même site s’affiche différemment sur ordinateur et sur mobile : le CSS adapte la mise en page à la taille de l’écran." },
      { title: "Dans tes e-mails", text: "Les newsletters avec des couleurs, des boutons et des encadrés sont décorées avec du CSS." }
    ],
    jobs: {
      title: "Et dans les métiers du web ?",
      text: "Le CSS est utilisé tous les jours par les personnes qui fabriquent des sites. Voici comment, concrètement :",
      items: [
        { title: "Intégrateur·rice web", text: "Reçoit la maquette dessinée par le designer et la transforme en vraie page. Son outil principal : le CSS. Toute la journée, il ou elle règle des couleurs, des marges, des polices pour que la page ressemble exactement à la maquette." },
        { title: "Développeur·se front-end", text: "Construit la partie visible des sites et des applis (le « front »). Écrit du HTML, du CSS et du JavaScript, et crée des boutons, des menus ou des formulaires réutilisables, tous stylés en CSS." },
        { title: "Webdesigner / UI designer", text: "Dessine l’apparence des sites dans des logiciels comme Figma. Connaître le CSS l’aide à proposer des designs réalisables, et à bien discuter avec les développeurs." },
        { title: "Chargé·e de contenu ou d’e-mailing", text: "Met à jour un site ou prépare des newsletters. Un peu de CSS suffit pour changer une couleur, corriger un espace ou mettre un bouton en valeur sans attendre un développeur." }
      ]
    },
    words: [
      ["**Règle**", "un sélecteur suivi d’un bloc de déclarations entre accolades : `h1 { color: red; }`."],
      ["**Sélecteur**", "le début de la règle : il dit à quels éléments elle s’applique (`h1`, `.carte`, `#titre`)."],
      ["**Propriété**", "ce qu’on veut changer : `color`, `font-size`, `margin`… Toujours en anglais."],
      ["**Valeur**", "le réglage choisi pour la propriété : `red`, `20px`, `bold`…"],
      ["**Classe**", "une étiquette posée dans le HTML (`class=\"carte\"`) pour viser des éléments précis. En CSS, elle commence par un point : `.carte`."],
      ["**Déclaration**", "une consigne `propriété: valeur;` à l’intérieur d’une règle : `color: red;`."]
    ],
    traps: [
      "Oublier le point-virgule `;` à la fin d’une ligne : la ligne suivante ne marche plus non plus.",
      "Écrire en français : `color: rouge;` ne marche pas. C’est `color: red;`.",
      "Oublier le point devant une classe : `carte { }` cherche une balise `<carte>`, qui n’existe pas. Il faut `.carte { }`.",
      "Mettre un espace dans une taille : `20 px` ne marche pas. On colle : `20px`."
    ],
    tools: [
      "Un éditeur de code gratuit : **VS Code**.",
      "Crée un fichier `style.css`, et relie-le à ta page avec `<link rel=\"stylesheet\" href=\"style.css\">` dans le `<head>`.",
      "Sur n’importe quel site : clic droit, puis **Inspecter**. L’onglet **Styles** montre son CSS, et tu peux le modifier pour essayer."
    ],
    before: {
      title: "Ce qu’il faut savoir avant de commencer",
      text: "Ce jeu suppose que tu connais les bases du **HTML**, le langage du contenu. Si un de ces points te paraît flou, fais d’abord le jeu HTML, « La maison de Bip » : tu y apprends tout ça.",
      items: [
        "Une page HTML est faite de **balises** (`<h1>`, `<p>`, `<a>`…) qui forment des **éléments** imbriqués : un élément **parent** contient ses éléments **enfants**.",
        "Un élément peut avoir des **attributs**, comme `class=\"carte\"` ou `id=\"titre\"` : ce sont ces étiquettes que le CSS va viser.",
        "Le `<head>` contient les réglages de la page (le titre de l’onglet, les liens vers les fichiers), le `<body>` contient tout ce qui s’affiche.",
        "On relie un fichier CSS à la page, dans le `<head>`, avec `<link rel=\"stylesheet\" href=\"style.css\">`.",
        "Les balises les plus courantes : titres `h1` à `h6`, paragraphes `p`, liens `a`, listes `ul`/`li`, images `img`, boîtes `div` et `span`, structure `header`/`nav`/`main`/`footer`, formulaires `input`/`button`."
      ],
      link: { label: "Revoir le jeu HTML", url: "https://diurndesign.github.io/Html_game/" }
    },
    ctaTitle: "Prêt à rendre ses couleurs à Kami ?",
    ctaText: "24 missions t’attendent. Chaque atelier terminé rend la couleur d’une partie de Kami : la tête, le corps, la crête, les pattes, la queue et les taches."
  },

  /* ------------------------------------------------------------------
     BAC À SABLE
     ------------------------------------------------------------------ */
  sandbox: {
    id: "bac-a-sable", sandbox: true, title: "Bac à sable",
    say: "Ici, pas de mission : tu peux tout repeindre comme tu veux ! Moi, je change de couleur toute la journée, alors vas-y.",
    ideas: [
      "Change la couleur du titre et le fond de la page.",
      "Arrondis les coins de la `.carte` et ajoute-lui une ombre.",
      "Donne un effet `:hover` au `.bouton`, avec une `transition`.",
      "Écris exprès une faute (oublie un `;`) et lis l’onglet **Remarques**.",
      "Recopie un exemple du **Carnet** et modifie les valeurs."
    ],
    html: `<div class="carte">
  <h1>Mon brouillon</h1>
  <p class="intro">Un paragraphe à styliser comme tu veux.</p>
  <ul>
    <li>une liste</li>
    <li>à décorer</li>
  </ul>
  <button class="bouton">Un bouton</button>
</div>`,
    starter: `h1 {\n  color: tomato;\n}\n`,
    hints: []
  },

  /* ------------------------------------------------------------------
     LEXIQUE, BONNES PRATIQUES, PRÊT POUR LA SUITE ?
     ------------------------------------------------------------------ */
  glossary: [
    ["**CSS**", "*Cascading Style Sheets*, « feuilles de style en cascade » : le langage qui décrit l’apparence d’une page HTML (couleurs, polices, tailles, espaces…)."],
    ["**Feuille de style**", "un fichier `.css` (souvent `style.css`) qui contient les règles d’un site. On le relie à chaque page, dans le `<head>`, avec `<link rel=\"stylesheet\" href=\"style.css\">`."],
    ["**Règle**", "un sélecteur suivi d’un bloc de déclarations entre accolades.", "h1 {\n  color: seagreen;\n}"],
    ["**Sélecteur**", "le début d’une règle : il dit à quels éléments de la page elle s’applique."],
    ["**Sélecteur de balise**", "vise tous les éléments d’une même balise : `p` vise tous les paragraphes.", "p {\n  line-height: 1.6;\n}"],
    ["**Sélecteur de classe**", "vise les éléments qui ont cette classe dans leur attribut `class`. Il commence par un point. Le sélecteur le plus utilisé.", ".carte {\n  padding: 16px;\n}"],
    ["**Sélecteur d’id**", "vise l’élément unique qui a cet `id`. Il commence par un dièse. Il est très fort dans la cascade : à éviter pour styliser.", "#titre {\n  color: teal;\n}"],
    ["**Sélecteur descendant**", "deux sélecteurs séparés par un espace : les éléments qui sont **à l’intérieur** d’un autre.", "nav a {\n  color: white;\n}"],
    ["**Liste de sélecteurs**", "plusieurs sélecteurs séparés par des virgules : une seule règle pour tous.", "h1, h2 {\n  font-family: Georgia, serif;\n}"],
    ["**Bloc de déclarations**", "tout ce qui est écrit entre les accolades `{ }` d’une règle."],
    ["**Déclaration**", "une consigne `propriété: valeur;` à l’intérieur d’un bloc de déclarations.", "h1 {\n  color: seagreen;\n}"],
    ["**Propriété**", "ce qu’on veut changer : `color`, `margin`, `display`… Toujours en anglais."],
    ["**Valeur**", "le réglage choisi pour une propriété : un nom de couleur (`seagreen`), une taille (`20px`), un mot-clé (`bold`, `none`)…"],
    ["**Syntaxe**", "l’orthographe du code. En CSS : `{ }` autour des déclarations, `:` entre la propriété et la valeur, `;` à la fin de chaque déclaration."],
    ["**Commentaire**", "une note pour les humains, ignorée par le navigateur, écrite entre `/*` et `*/`.", "/* En-tête du site */"],
    ["**Cascade**", "la façon dont le navigateur choisit entre deux règles qui se contredisent : la plus spécifique gagne ; à égalité, la dernière écrite."],
    ["**Spécificité**", "la force d’un sélecteur dans la cascade : balise < classe < id."],
    ["**Héritage**", "certaines propriétés, surtout celles du texte (`color`, `font-family`, `font-size`…), passent automatiquement d’un élément parent à ses enfants."],
    ["**Valeur calculée**", "la valeur finale d’une propriété, après la cascade et l’héritage. On la voit dans l’outil **Inspecter**, onglet *Calculé*."],
    ["**`!important`**", "un mot ajouté après une valeur pour lui faire gagner la cascade de force. À éviter : le CSS devient difficile à modifier."],
    ["**Pseudo-classe**", "un mot collé au sélecteur après deux-points, pour viser un élément dans un certain état (`:hover`, `:focus`, `:root`…).", ".bouton:hover {\n  background-color: sienna;\n}"],
    ["**`:hover`**", "la pseudo-classe « survolé par la souris ». Elle n’existe pas sur un écran tactile."],
    ["**`:focus`**", "la pseudo-classe « reçoit le clavier » : le champ actif, ou l’élément atteint avec la touche Tab.", ".champ:focus {\n  outline: 3px solid sienna;\n}"],
    ["**`outline`**", "le contour d’un élément, dessiné par-dessus sans prendre de place. Celui du focus ne se supprime jamais sans être remplacé."],
    ["**`:root`**", "la pseudo-classe qui vise la racine de la page (la balise `<html>`) : l’endroit où l’on range les variables."],
    ["**Variable CSS**", "une valeur à laquelle on donne un nom (avec deux tirets), déclarée une fois et réutilisée avec `var()`. On dit aussi *propriété personnalisée*.", ":root {\n  --principale: darkgreen;\n}\n\nh1 {\n  color: var(--principale);\n}"],
    ["**Hexadécimal**", "une couleur écrite avec un dièse et 6 caractères (0 à 9, A à F) : deux pour le rouge, deux pour le vert, deux pour le bleu.", ".feuille {\n  background-color: #3DCB8B;\n}"],
    ["**`rgb()` et `rgba()`**", "une couleur en quantités de rouge, de vert et de bleu, de 0 à 255. `rgba()` ajoute l’**opacité**, de 0 (transparent) à 1 (opaque).", ".carte {\n  background-color: rgb(31, 181, 168);\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n}"],
    ["**Contraste**", "la différence de luminosité entre le texte et son fond. Il doit être assez fort (au moins 4,5 pour 1) pour que tout le monde puisse lire."],
    ["**Police**", "le dessin des lettres, choisi avec `font-family`. Sa taille se règle avec `font-size`, son épaisseur avec `font-weight`.", "body {\n  font-family: Georgia, serif;\n}"],
    ["**Police de secours**", "la famille générique écrite en dernier dans `font-family` (`serif`, `sans-serif`, `monospace`), utilisée si les autres polices manquent."],
    ["**Interligne**", "l’espace entre les lignes d’un texte, réglé avec `line-height`, de préférence sans unité (`1.6`)."],
    ["**Unité**", "ce qui suit un nombre pour dire comment le compter : `px`, `rem`, `em`, `%`, `vw`, `s` (secondes)… Seul `0` peut s’en passer."],
    ["**Pixel (`px`)**", "une unité fixe, un point de l’écran. Bien pour les bordures et les ombres."],
    ["**`rem`**", "une unité relative à la taille du texte de la page (16px par défaut). L’unité conseillée pour le texte : elle suit le réglage du visiteur.", "h2 {\n  font-size: 1.5rem; /* 24px */\n}"],
    ["**`em`**", "une unité relative à la taille du texte du parent : `0.8em` = 80 % du texte du parent."],
    ["**Pourcentage (`%`)**", "une part de la taille du parent : `width: 50%` = la moitié de la largeur du parent."],
    ["**`vw`**", "1 % de la largeur de la fenêtre : `100vw` = toute la largeur de l’écran."],
    ["**Modèle de boîte**", "chaque élément est une boîte : le contenu, entouré du `padding`, de la `border`, puis de la `margin`."],
    ["**`padding`**", "la marge intérieure, entre le contenu et la bordure. Elle prend la couleur du fond.", ".boite {\n  padding: 20px;\n}"],
    ["**`border`**", "la bordure d’une boîte : épaisseur, style (`solid`, `dashed`, `dotted`), couleur.", ".boite {\n  border: 3px solid seagreen;\n}"],
    ["**`margin`**", "la marge extérieure, transparente, qui éloigne la boîte des autres.", ".boite {\n  margin-bottom: 24px;\n}"],
    ["**`box-sizing`**", "avec `border-box`, la largeur donnée comprend le padding et la bordure. À mettre au début de chaque CSS.", "* {\n  box-sizing: border-box;\n}"],
    ["**`width` et `max-width`**", "la largeur d’une boîte, et sa largeur maximale (elle peut rétrécir). Avec `margin: 0 auto`, une boîte qui a une largeur se centre.", ".page {\n  max-width: 480px;\n  margin: 0 auto;\n}"],
    ["**`border-radius`**", "arrondit les coins d’une boîte. `50%` sur un carré donne un cercle."],
    ["**`display`**", "le type d’affichage d’un élément : `block`, `inline`, `inline-block`, `none`… et bientôt `flex` et `grid`."],
    ["**Élément de bloc**", "`display: block` : commence sur une nouvelle ligne et prend toute la largeur (`h1`, `p`, `div`, `ul`…)."],
    ["**Élément en ligne**", "`display: inline` : reste dans la ligne de texte et ignore `width`, `height` et les marges du haut et du bas (`a`, `span`, `strong`…)."],
    ["**`box-shadow`**", "une ombre sous une boîte : décalage horizontal, décalage vertical, flou, couleur.", ".carte {\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n}"],
    ["**`cursor`**", "la forme du curseur de la souris. `pointer` affiche la petite main des éléments cliquables."],
    ["**`transition`**", "rend un changement de valeur progressif. Elle se met sur l’état normal, pas dans `:hover`.", ".bouton {\n  transition: background-color 0.4s;\n}"],
    ["**Flux**", "l’ordre normal dans lequel les éléments se placent, les uns après les autres, de haut en bas."],
    ["**`position`**", "`relative` sur le parent (il devient le repère), `absolute` sur l’enfant, qui sort du flux et se place avec `top`, `right`, `bottom`, `left`.", ".badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}"],
    ["**Responsive**", "se dit d’une page qui s’adapte à la taille de l’écran : ordinateur, tablette, téléphone."],
    ["**Media query**", "un bloc `@media` dont les règles ne s’appliquent que si la condition est vraie, par exemple une largeur d’écran.", "@media (max-width: 600px) {\n  h1 {\n    font-size: 2rem;\n  }\n}"],
    ["**Point de rupture**", "la largeur d’écran à laquelle la mise en page change, par exemple `600px`."],
    ["**Mobile d’abord**", "une méthode : penser et tester la version téléphone en premier, puis l’enrichir pour les grands écrans."],
    ["**Accessibilité**", "rendre un site utilisable par tout le monde : bon contraste, navigation au clavier avec un focus visible, texte qu’on peut agrandir…"],
    ["**Inspecter**", "l’outil du navigateur (clic droit › Inspecter) qui montre le HTML et le CSS de chaque élément, les règles qui gagnent et celles qui perdent."]
  ],
  practices: [
    "Range ton CSS dans un fichier `style.css`, relié à chaque page par `<link rel=\"stylesheet\" href=\"style.css\">` dans le `<head>`.",
    "Écris une déclaration par ligne, indentée de 2 espaces, et laisse une ligne vide entre deux règles.",
    "Termine chaque déclaration par un `;`, même la dernière.",
    "Nomme tes classes selon leur rôle (`.alerte`, `.bouton-principal`), jamais selon leur apparence (`.rouge`) : en minuscules, sans accent, avec des tirets.",
    "Stylise avec des classes : évite les `id` et `!important`, qui gagnent la cascade de force et rendent le CSS difficile à modifier.",
    "Organise ton fichier du général au particulier (variables, `body`, balises, classes, puis media queries) et titre chaque zone avec un commentaire.",
    "Règle la police et la couleur du texte une seule fois, sur `body` : l’héritage fait le reste.",
    "Écris les tailles de texte en `rem`, et commence ton CSS par `* { box-sizing: border-box; }`.",
    "Range tes couleurs dans des variables, dans `:root` : tu les changeras en une seule ligne.",
    "Vérifie le contraste entre le texte et le fond, et ne supprime jamais le contour de `:focus` sans le remplacer.",
    "Pense mobile d’abord : teste ta page sur un petit écran dès le début, et écris tes media queries à la fin du fichier.",
    "Quand quelque chose ne marche pas, vérifie d’abord la syntaxe `{ } : ;`, puis ouvre **Inspecter** pour voir quelle règle gagne."
  ],
  checklist: [
    { text: "Je sais écrire une règle CSS complète : sélecteur, bloc de déclarations, propriété, valeur.", mission: "regle" },
    { text: "Je sais viser des éléments par leur balise, leur classe (`.`) ou leur id (`#`).", mission: "classes" },
    { text: "Je sais relier un fichier `style.css` à une page HTML avec `<link>`.", mission: "quiz1" },
    { text: "Je sais trouver et corriger une faute de syntaxe : `{ } : ;`.", mission: "casse" },
    { text: "Je sais expliquer qui gagne quand deux règles se contredisent, et ce qu’est l’héritage.", mission: "cascade" },
    { text: "Je sais choisir une unité : `px`, `rem`, `em`, `%`.", mission: "unites" },
    { text: "Je sais régler le modèle de boîte : `padding`, `border`, `margin`.", mission: "boite" },
    { text: "Je sais ce que fait `box-sizing: border-box`, et je sais calculer la largeur réelle d’une boîte.", mission: "arrondi" },
    { text: "Je connais la différence entre `block`, `inline`, `inline-block` et `none`.", mission: "display" },
    { text: "Je sais centrer une boîte avec `max-width` et `margin: 0 auto`.", mission: "centrer" },
    { text: "Je sais utiliser une pseudo-classe (`:hover`, `:focus`) et garder le focus visible.", mission: "focus" },
    { text: "Je sais déclarer une variable dans `:root` et l’utiliser avec `var()`.", mission: "variables" },
    { text: "Je sais viser les éléments à l’intérieur d’un autre avec un sélecteur descendant (`nav a`).", mission: "combines" },
    { text: "Je sais placer un élément avec `position: relative` et `absolute`.", mission: "position" },
    { text: "Je sais écrire une media query `@media (max-width: 600px)` et la placer à la fin du fichier.", mission: "responsive" }
  ],

  /* ------------------------------------------------------------------
     ATELIERS
     ------------------------------------------------------------------ */
  chapters: [
    { n: 1, title: "Le pinceau", piece: "La tête", notions: ["règle", "sélecteur", "déclaration", "classe et id", "syntaxe"],
      skills: ["Je sais ce qu’est le CSS et comment on le relie à une page HTML.", "Je sais écrire une règle complète : sélecteur, bloc de déclarations, propriété, valeur.", "Je sais viser des éléments par leur balise, leur classe (`.`) ou leur id (`#`).", "Je sais repérer et corriger une faute de syntaxe : `{ } : ;`."] },
    { n: 2, title: "Les couleurs", piece: "Le corps", notions: ["color", "background-color", "#hexa et rgb()", "cascade", "spécificité", "héritage"],
      skills: ["Je sais colorer le texte avec `color` et le fond avec `background-color`.", "Je sais écrire une couleur avec un nom, un code hexadécimal ou `rgb()`.", "Je sais expliquer qui gagne quand deux règles se contredisent : l’ordre et la spécificité.", "Je sais ce qu’est l’héritage, et quelles propriétés s’héritent.", "Je pense à vérifier le contraste entre le texte et le fond."] },
    { n: 3, title: "Les lettres", piece: "La crête", notions: ["font-family", "font-size", "text-align", "line-height", "unités"],
      skills: ["Je sais choisir une police, avec une police de secours (`font-family`).", "Je sais régler la taille, le gras, l’alignement et l’interligne d’un texte.", "Je connais les unités `px`, `rem`, `em`, `%` et `vw`, et je sais laquelle choisir.", "Je sais pourquoi on écrit les tailles de texte en `rem`."] },
    { n: 4, title: "Les boîtes", piece: "Les pattes", notions: ["modèle de boîte", "padding, border, margin", "box-sizing", "display", "margin: 0 auto"],
      skills: ["Je connais le modèle de boîte : contenu, `padding`, `border`, `margin`.", "Je sais fixer une largeur, arrondir les coins et utiliser `box-sizing: border-box`.", "Je sais changer le type d’affichage avec `display` : `block`, `inline`, `inline-block`, `none`.", "Je sais centrer une boîte avec `max-width` et `margin: 0 auto`."] },
    { n: 5, title: "Les états et les variables", piece: "La queue", notions: [":hover", ":focus", "transition", "variables CSS"],
      skills: ["Je sais utiliser les pseudo-classes `:hover` et `:focus`.", "Je garde toujours un contour de focus visible, pour la navigation au clavier.", "Je sais adoucir un changement d’état avec `transition`.", "Je sais déclarer une variable dans `:root` et l’utiliser avec `var()`."] },
    { n: 6, title: "La carte de Kami", piece: "Les taches", notions: ["sélecteurs combinés", "box-shadow", "position", "media query", "mission finale"],
      skills: ["Je sais combiner des sélecteurs : descendant (espace) et liste (virgule).", "Je sais ajouter une ombre douce avec `box-shadow` et `rgba()`.", "Je sais placer un badge avec `position: relative` et `position: absolute`.", "Je sais adapter une page au téléphone avec une media query.", "Je sais habiller une page complète à partir d’un modèle."] }
  ],

  levels: [
  /* ------------------------------ ATELIER 1 ------------------------------ */
  {
    id: "regle", ch: 1, title: "Le premier coup de pinceau", notion: "une règle CSS",
    say: "Salut, moi c’est Kami ! Ce matin, je me suis réveillé tout gris… et ma page aussi. Tu veux bien m’aider à retrouver mes couleurs ? On commence par le titre.",
    lesson: {
      what: ["Le CSS est une liste de **règles**. Une règle dit : « tels éléments de la page doivent ressembler à ça ».", "Elle commence par un **sélecteur** (qui on vise), suivi d’un **bloc de déclarations** entre accolades `{ }`. Chaque **déclaration** s’écrit `propriété: valeur;` : la **propriété** dit *ce qu’on change*, la **valeur** dit *comment*.", "Le sélecteur le plus simple est le **nom d’une balise** : `h1` vise tous les éléments `<h1>` de la page, `p` tous les paragraphes. On l’appelle le **sélecteur de balise**."],
      why: "Avec une seule règle, tu changes **tous** les éléments du même type d’un coup. Si ta page a 20 paragraphes, une règle `p` les colore tous : pas besoin de le faire 20 fois.",
      code: `h1 {\n  color: seagreen;\n}\n\np {\n  color: teal;\n}`,
      pieces: [["h1", "le **sélecteur** de balise : tous les titres `<h1>` de la page"], ["{ }", "les accolades entourent le **bloc de déclarations** de la règle"], ["color: seagreen;", "une **déclaration** : une propriété, deux-points, une valeur, point-virgule"], ["color", "la **propriété** : la couleur du **texte**. Toujours en anglais"], ["seagreen", "la **valeur** : un nom de couleur, en anglais (*vert d’eau*)"], [";", "le point-virgule termine chaque déclaration"]],
      example: { code: `h1 {\n  color: tomato;\n}`, html: `<h1>Un titre tomate</h1>\n<p>Le paragraphe, lui, ne change pas.</p>` },
      trap: "Écrire les couleurs en français : `color: vert;` ne fonctionne pas. Le CSS ne parle qu’anglais : `green`, `red`, `blue`… Il existe 140 noms de couleurs, comme `seagreen`, `tomato` ou `gold`.",
      good: "Écris **une déclaration par ligne**, décalée de 2 espaces (on dit *indentée*), ferme l’accolade seule sur sa ligne et laisse une ligne vide entre deux règles. Ton CSS se lit d’un coup d’œil, par toi comme par tes collègues."
    },
    html: `<h1>Kami le caméléon</h1>
<p>Bonjour ! Je suis Kami, un petit caméléon de la forêt.</p>
<p>Avant, j’étais vert, orange et turquoise. Aujourd’hui, je suis tout gris…</p>`,
    steps: ["Écris une règle pour le sélecteur `h1`, avec la couleur `seagreen`.", "En dessous, écris une deuxième règle pour `p`, avec la couleur `teal`.", "Regarde l’aperçu changer pendant que tu tapes, puis clique sur **Vérifier**."],
    starter: `/* Écris ton CSS sous cette ligne */\n`,
    goals: [
      { label: "Le titre `h1` est `seagreen`", test: c => sameColor(cs(c, "h1", "color"), "seagreen") || (isColorSet(c, "h1", "color", "#1B2440") ? "Ton titre a changé de couleur, mais il doit être seagreen." : false) },
      { label: "Les deux paragraphes sont `teal`", test: c => kAll(c, "p", "color", "teal") || (kHasRule(c, /\bp\b/) ? "Écris la couleur teal dans la règle p." : false) },
      { label: "Deux règles bien écrites, sans erreur", test: noErrors }
    ],
    hints: ["Une règle s’écrit : le sélecteur, une accolade ouvrante, la déclaration, une accolade fermante.", "Pour le titre : `h1 { color: seagreen; }`", "Ajoute en dessous : `p {` puis `color: teal;` puis `}`."],
    solution: `/* Écris ton CSS sous cette ligne */\nh1 {\n  color: seagreen;\n}\n\np {\n  color: teal;\n}`,
    debrief: "**Sélecteur**, **propriété**, **valeur** : c’est la forme de tout le CSS, et tu viens de l’écrire deux fois. Remarque que tu n’as pas touché au HTML : le CSS s’applique *par-dessus*. Dans un vrai site, ces règles sont rangées dans un fichier `style.css`, relié à chaque page HTML par la balise `<link>` : toutes les pages du site partagent le même style."
  },
  {
    id: "classes", ch: 1, title: "Viser juste", notion: "classes . et id #",
    say: "Dans mon carnet, deux phrases sont très importantes. Je veux qu’elles soient en rouge, mais pas les autres ! Comment viser seulement elles ?",
    lesson: {
      what: ["Le sélecteur `p` vise **tous** les paragraphes. Pour en viser seulement certains, le HTML leur donne une **classe** grâce à l’**attribut** `class` : une étiquette, comme `class=\"important\"`.", "En CSS, le **sélecteur de classe** s’écrit avec un **point** devant : `.important`. Il existe aussi l’**id** (`id=\"titre\"`), une étiquette **unique** dans la page, qui s’écrit avec un **dièse** : `#titre`."],
      why: "Les classes sont l’outil le plus utilisé du CSS. On peut poser la même classe sur plusieurs éléments, même de balises différentes : tous ceux qui ont l’étiquette reçoivent le même style.",
      code: `.important {\n  color: crimson;\n}\n\n#titre {\n  color: darkcyan;\n}`,
      pieces: [[".important", "le point = « tous les éléments qui ont la classe `important` »"], ["#titre", "le dièse = « l’élément dont l’id est `titre` » (un seul dans la page)"], ["class=\"…\"", "dans le HTML, sans le point"], ["id=\"…\"", "dans le HTML, sans le dièse"]],
      example: { code: `.bonus {\n  color: sienna;\n}`, html: `<p>Un paragraphe normal.</p>\n<p class="bonus">Un paragraphe avec la classe bonus.</p>\n<p>Encore un normal.</p>` },
      trap: "Oublier le point : `important { … }` cherche une balise `<important>`, qui n’existe pas. Le point (ou le dièse) est obligatoire dans le CSS, mais on ne l’écrit **pas** dans le HTML.",
      good: "Nomme tes classes selon leur **rôle**, pas leur apparence : `.important`, `.alerte`, `.bouton-principal` plutôt que `.rouge` ou `.gros` (si l’alerte devient orange, `.rouge` mentirait). Écris-les en minuscules, sans accent ni espace, avec des tirets. Et pour styliser, préfère les classes aux id."
    },
    showHTML: true,
    html: `<h1 id="titre">Le carnet de Kami</h1>
<p>Lundi : j’ai grimpé sur la plus haute branche.</p>
<p class="important">Ne jamais manger les mouches bleues : elles piquent.</p>
<p>Mardi : sieste au soleil, toute la journée.</p>
<p class="important">Rendre son tournevis à Bip avant vendredi.</p>`,
    steps: ["Lis le HTML de la page (le volet ci-dessus) : repère la classe et l’id.", "Avec la classe `important`, colore ces deux paragraphes en `crimson`.", "Avec l’id `titre`, colore le titre en `darkcyan`."],
    starter: `/* Une classe commence par un point, un id par un dièse */\n`,
    goals: [
      { label: "Les deux paragraphes `.important` sont `crimson`", test: c => kAll(c, ".important", "color", "crimson") || (kHasRule(c, /^important\b/) ? "Il manque le point devant important." : false) },
      { label: "Les autres paragraphes ne sont pas rouges", test: c => qa(c, "p:not(.important)").every(p => !sameColor(cs(c, p, "color"), "crimson")) || "Tous les paragraphes sont rouges : vise seulement la classe, avec .important." },
      { label: "Le titre est `darkcyan`, grâce à `#titre`", test: c => (sameColor(cs(c, "h1", "color"), "darkcyan") && kRules(c, s => s.includes("#titre")).length > 0) || (sameColor(cs(c, "h1", "color"), "darkcyan") ? "La bonne couleur, mais utilise l’id : #titre." : false) },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Une classe dans le CSS : un point, puis son nom. `.important { }`", "Dedans : `color: crimson;`", "Pour l’id : `#titre { color: darkcyan; }`"],
    solution: `/* Une classe commence par un point, un id par un dièse */\n.important {\n  color: crimson;\n}\n\n#titre {\n  color: darkcyan;\n}`,
    debrief: "Retiens : **point** = classe, **dièse** = id. Dans la vraie vie, on utilise surtout des classes : elles se réutilisent autant qu’on veut (`.bouton`, `.carte`, `.menu`…). L’id, unique, sert plutôt pour les liens internes ou le JavaScript."
  },
  {
    id: "casse", ch: 1, title: "Le code cassé", notion: "la syntaxe : { } : ;",
    say: "Oh non ! J’ai voulu décorer la liste de mon goûter, mais j’ai fait trois fautes dans mon CSS. Rien ne marche… Tu peux les trouver ?",
    lesson: {
      what: ["La **syntaxe**, c’est l’orthographe du code. En CSS, elle tient en trois signes : les **accolades** `{ }` autour du bloc de déclarations, les **deux-points** `:` entre la propriété et la valeur, et le **point-virgule** `;` à la fin de chaque déclaration.", "Une seule faute, et le navigateur ignore la déclaration, parfois toute la règle. Il ne te prévient pas : il saute ce qu’il ne comprend pas. Seuls les **commentaires**, écrits entre `/*` et `*/`, sont ignorés exprès : ce sont des notes pour les humains."],
      why: "Savoir repérer une faute de syntaxe, c’est 80 % du travail quand « ça ne marche pas ». Dans ce jeu, l’onglet **Remarques** t’indique la ligne de chaque faute, comme le ferait un éditeur de code.",
      code: `sélecteur {\n  propriété: valeur;\n  propriété: valeur;\n}`,
      pieces: [["{", "ouvre le bloc de déclarations, juste après le sélecteur"], [":", "sépare la propriété et la valeur"], [";", "termine **chaque** déclaration, même la dernière (c’est plus sûr)"], ["}", "ferme la règle"], ["/* … */", "un **commentaire** : le navigateur l’ignore. Il sert à expliquer ou à titrer une partie du code"]],
      trap: "Oublier un `;` casse aussi la ligne **suivante** : le navigateur lit les deux lignes comme une seule déclaration, qui n’a plus de sens.",
      good: "Commente ton CSS pour le ranger par zones (`/* En-tête */`, `/* Boutons */`) et mets toujours un `;`, même après la dernière déclaration : le jour où tu en ajoutes une en dessous, rien ne casse."
    },
    html: `<h1>Le goûter de Kami</h1>
<p class="intro">Ce soir, menu spécial insectes !</p>
<ul>
  <li>Trois grillons croustillants</li>
  <li>Une mouche à la vanille</li>
  <li>Un ver de farine (pour le dessert)</li>
</ul>`,
    steps: ["Ouvre l’onglet **Remarques** sous l’éditeur : il signale les fautes et leur ligne.", "Corrige les trois fautes : il manque un `;`, un `:` et une accolade `}`.", "Quand tout est réparé, le titre est orange sur fond jaune et l’intro est verte. La liste est déjà violette : le navigateur a deviné l’accolade qui manque… mais le vérificateur, lui, la voit !"],
    starter: `h1 {\n  color: sienna\n  background-color: lightyellow;\n}\n\n.intro {\n  color seagreen;\n  font-style: italic;\n}\n\nli {\n  color: slateblue;\n`,
    goals: [
      { label: "Le titre est `sienna` sur fond `lightyellow`", test: c => sameColor(cs(c, "h1", "color"), "sienna") && sameColor(cs(c, "h1", "background-color"), "lightyellow") },
      { label: "L’intro est `seagreen` et en italique", test: c => sameColor(cs(c, ".intro", "color"), "seagreen") && cs(c, ".intro", "font-style") === "italic" },
      { label: "Chaque règle est fermée par une accolade `}`", test: c => (c.clean.match(/{/g) || []).length === (c.clean.match(/}/g) || []).length || "Compte tes accolades : il faut autant de { que de }." },
      { label: "Les éléments de la liste sont `slateblue`", test: c => kAll(c, "li", "color", "slateblue") },
      { label: "Plus aucune faute dans les remarques", test: noErrors }
    ],
    hints: ["Ligne 2 : la déclaration ne se termine pas. Il manque le `;` après `sienna`.", "Ligne 7 : entre `color` et `seagreen`, il manque les deux-points.", "Tout à la fin : la règle `li` n’est jamais fermée. Ajoute l’accolade fermante `}` sur la dernière ligne."],
    solution: `h1 {\n  color: sienna;\n  background-color: lightyellow;\n}\n\n.intro {\n  color: seagreen;\n  font-style: italic;\n}\n\nli {\n  color: slateblue;\n}\n`,
    debrief: "Trois petits signes, trois grosses pannes. Remarque que la faute de la ligne 2 cassait **aussi** la ligne 3 : c’est le piège classique du point-virgule. Et l’accolade oubliée à la fin ne se voyait pas : le navigateur l’avait devinée. Mais si tu avais ajouté une règle après, elle aurait été cassée. Bon réflexe pour la suite : quand quelque chose ne marche pas, vérifie d’abord `{ } : ;` avant de chercher plus loin."
  },
  {
    id: "quiz1", ch: 1, quiz: true, title: "Contrôle du pinceau", notion: "quiz",
    say: "Avant de rendre la couleur à ma tête, un petit contrôle. Tout juste, et je retrouve mon vert !",
    questions: [
      { q: "À quoi sert le CSS ?", opts: ["À écrire le contenu de la page", "À décrire l’apparence de la page", "À faire des calculs"], a: 1, why: "Le HTML écrit le contenu, le CSS décide de l’apparence (couleurs, polices, tailles…), le JavaScript fait réagir la page." },
      { q: "Pour relier le fichier `style.css` à ta page HTML, tu écris dans le `<head>` :", opts: ["`<link rel=\"stylesheet\" href=\"style.css\">`", "`<style src=\"style.css\">`", "`<css>style.css</css>`"], a: 0, why: "La balise `<link>` relie un fichier externe. `rel=\"stylesheet\"` dit que c’est une feuille de style, `href` donne le chemin du fichier." },
      { q: "Quel sélecteur vise `<p class=\"note\">` ?", opts: ["`note`", "`#note`", "`.note`"], a: 2, why: "Une classe se vise avec un point. Le dièse est pour les id, et `note` sans rien chercherait une balise `<note>`." },
      { q: "Dans la règle `h1 { color: seagreen; }`, comment s’appelle `color: seagreen;` ?", opts: ["une déclaration", "un sélecteur", "une balise"], a: 0, why: "C’est une **déclaration** : une propriété (`color`) et sa valeur (`seagreen`). Le sélecteur, c’est `h1`, et l’ensemble entre accolades est le bloc de déclarations." },
      { q: "Dans ce code, que manque-t-il ?", code: `h1 {\n  color: seagreen\n  font-size: 40px;\n}`, opts: ["Une accolade", "Un point-virgule", "Rien, il est correct"], a: 1, why: "Il manque le `;` après `seagreen`. Résultat : ni la couleur ni la taille ne s’appliquent." }
    ],
    debrief: "Tu connais la forme d’une règle (sélecteur + bloc de déclarations), les sélecteurs de balise, de classe et d’id, et tu sais réparer une règle cassée. La tête de Kami retrouve ses couleurs !"
  },

  /* ------------------------------ ATELIER 2 ------------------------------ */
  {
    id: "couleurs", ch: 2, title: "Le panneau de la forêt", notion: "color et background-color",
    say: "Ma tête est verte, merci ! Maintenant, je dois repeindre le panneau à l’entrée de ma forêt. Il faut qu’on le voie de loin !",
    lesson: {
      what: ["Deux propriétés pour colorer : `color` change la couleur du **texte**, `background-color` change la couleur du **fond** (l’arrière-plan) d’un élément.", "Tu peux viser `body` (le corps de la page, qui contient tout) pour changer le fond de toute la page."],
      why: "Les couleurs donnent l’identité d’un site : pense au rouge de Netflix ou au vert de Spotify. Elles servent aussi à guider l’œil : un panneau, un bouton, une alerte.",
      code: `body {\n  background-color: honeydew;\n}\n\n.panneau {\n  background-color: darkgreen;\n  color: white;\n}`,
      pieces: [["color", "la couleur du texte"], ["background-color", "la couleur du fond de l’élément"], ["body", "la balise qui contient toute la page visible"], ["héritage", "la couleur du texte se transmet du **parent** à ses **enfants**, les éléments à l’intérieur : le `h2` du panneau devient blanc lui aussi"]],
      example: { code: `.alerte {\n  background-color: gold;\n  color: black;\n}`, html: `<p class="alerte">Attention, peinture fraîche !</p>` },
      trap: "Mettre du texte clair sur un fond clair (jaune sur blanc) : c’est illisible, surtout pour les personnes qui voient mal. Vérifie toujours qu’il y a assez de **contraste** entre le texte et le fond.",
      good: "Vérifie le contraste avec un outil gratuit comme le *Contrast Checker* de WebAIM : vise une note d’au moins **4,5 pour 1** pour le texte normal. Un site lisible l’est pour tout le monde, même au soleil sur un téléphone. C’est pour ça que le panneau est en `darkgreen` : avec un texte blanc, `seagreen` n’atteint que 4,2 pour 1."
    },
    showHTML: true,
    base: `.panneau { padding: 12px 18px; }\n.panneau h2 { margin: 0 0 4px; }\n.panneau p { margin: 0; }`,
    html: `<div class="panneau">
  <h2>Forêt de Kami</h2>
  <p>Attention : caméléons en liberté !</p>
</div>
<p>Merci de ne pas déranger Kami pendant sa sieste.</p>`,
    steps: ["Donne au fond de toute la page (`body`) la couleur `honeydew`.", "Donne au `.panneau` un fond `darkgreen`.", "Écris son texte en `white`."],
    starter: `/* Le fond de la page */\n\n\n/* Le panneau */\n`,
    goals: [
      { label: "Le fond de la page est `honeydew`", test: c => sameColor(cs(c, "body", "background-color"), "honeydew") },
      { label: "Le fond du `.panneau` est `darkgreen`", test: c => sameColor(cs(c, ".panneau", "background-color"), "darkgreen") || (sameColor(cs(c, ".panneau", "color"), "darkgreen") ? "Tu as coloré le texte : pour le fond, c’est background-color." : false) },
      { label: "Le texte du panneau (titre compris) est `white`", test: c => (sameColor(cs(c, ".panneau h2", "color"), "white") && sameColor(cs(c, ".panneau p", "color"), "white")) },
      { label: "Le paragraphe sous le panneau garde sa couleur normale", test: c => !sameColor(cs(c, "body > p", "color"), "white") || "Le dernier paragraphe est blanc : il est devenu invisible ! Mets color: white seulement dans .panneau." },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Le fond de la page : `body { background-color: honeydew; }`", "Le panneau : `.panneau {` puis deux déclarations, puis `}`.", "`.panneau { background-color: darkgreen; color: white; }`"],
    solution: `/* Le fond de la page */\nbody {\n  background-color: honeydew;\n}\n\n/* Le panneau */\n.panneau {\n  background-color: darkgreen;\n  color: white;\n}`,
    debrief: "Tu as écrit `color: white` sur le panneau, et son titre `h2` est devenu blanc aussi : c’est l’**héritage**. Le texte hérite de la couleur de son parent, comme un enfant hérite des yeux de ses parents. C’est pour ça qu’on règle souvent la police et la couleur sur `body` : toute la page en profite."
  },
  {
    id: "hexa", ch: 2, title: "Le nuancier de Kami", notion: "#hexadécimal et rgb()",
    say: "Les noms de couleurs, c’est bien, mais il n’y en a que 140. Moi, je veux **mon** vert exact ! Il paraît qu’il existe des codes secrets…",
    lesson: {
      what: ["Pour choisir parmi 16 millions de couleurs, on utilise des **codes**. Le plus courant est l’**hexadécimal** : un dièse suivi de 6 caractères, comme `#3DCB8B`. Les deux premiers donnent la quantité de rouge, les deux suivants le vert, les deux derniers le bleu.", "On peut aussi écrire `rgb(31, 181, 168)` : la quantité de **r**ouge, de **g**reen (vert) et de **b**lue (bleu), chacune de 0 à 255."],
      why: "Les designers donnent leurs couleurs en codes, jamais en noms. Avec un code, la couleur est exactement la même partout : sur le site, l’appli et les affiches de la marque.",
      code: `.feuille {\n  background-color: #3DCB8B;\n}\n\n.lagon {\n  background-color: rgb(31, 181, 168);\n}`,
      pieces: [["#3DCB8B", "un code hexadécimal : 3D de rouge, CB de vert, 8B de bleu. Chiffres de 0 à 9 et lettres de A à F"], ["#000000", "zéro partout : du noir. `#FFFFFF`, le maximum partout : du blanc"], ["rgb(31, 181, 168)", "la même idée avec des nombres de 0 à 255, séparés par des virgules"], ["pipette", "dans Figma ou dans l’outil **Inspecter** du navigateur, un clic sur une couleur donne son code"]],
      example: { code: `.a { background-color: #FFD43B; }\n.b { background-color: rgb(232, 51, 122); color: white; }`, html: `<p class="a">#FFD43B, un jaune soleil</p>\n<p class="b">rgb(232, 51, 122), un rose vif</p>` },
      trap: "Oublier le dièse (`3DCB8B`) ou mettre une lettre qui n’existe pas en hexadécimal (`#3DCG8B` : le G n’existe pas). Seuls les chiffres 0-9 et les lettres A-F sont permis.",
      good: "Choisis une petite **palette** de 3 à 5 couleurs et réutilise toujours les mêmes codes. Un site avec trente verts différents a l’air brouillon. Dans l’atelier 5, tu apprendras à ranger ces codes dans des variables."
    },
    showHTML: true,
    base: `.pastille { padding: 14px 18px; margin: 8px 0; border-radius: 12px; font-weight: 700; background-color: #E5E7EB; }`,
    html: `<h1>Le nuancier de Kami</h1>
<p>Mes trois couleurs préférées, pour le jour où je les retrouverai :</p>
<div class="pastille feuille">Vert feuille</div>
<div class="pastille mangue">Orange mangue</div>
<div class="pastille lagon">Bleu lagon</div>`,
    steps: ["Donne à `.feuille` le fond `#3DCB8B`.", "Donne à `.mangue` le fond `#FF9F43`.", "Donne à `.lagon` le fond `rgb(31, 181, 168)`, écrit avec `rgb()`."],
    starter: `.feuille {\n  \n}\n\n.mangue {\n  \n}\n\n.lagon {\n  \n}\n`,
    goals: [
      { label: "`.feuille` a le fond `#3DCB8B`", test: c => sameColor(cs(c, ".feuille", "background-color"), "#3DCB8B") || (decl(c, ".feuille", "background-color") ? "Presque : recopie bien les 6 caractères, #3DCB8B." : false) },
      { label: "`.mangue` a le fond `#FF9F43`", test: c => sameColor(cs(c, ".mangue", "background-color"), "#FF9F43") || (decl(c, ".mangue", "background-color") ? "Presque : recopie bien les 6 caractères, #FF9F43." : false) },
      { label: "`.lagon` a le fond `rgb(31, 181, 168)`, écrit avec `rgb()`", test: c => (sameColor(cs(c, ".lagon", "background-color"), "rgb(31, 181, 168)") && /rgb\s*\(/i.test(decl(c, ".lagon", "background-color") || "")) || (sameColor(cs(c, ".lagon", "background-color"), "rgb(31, 181, 168)") ? "La bonne couleur, mais écris-la avec rgb(…), pour t’entraîner." : false) },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Dans `.feuille`, écris `background-color: #3DCB8B;` (n’oublie pas le dièse).", "Même chose pour `.mangue` avec `#FF9F43`.", "Pour `.lagon` : `background-color: rgb(31, 181, 168);`"],
    solution: `.feuille {\n  background-color: #3DCB8B;\n}\n\n.mangue {\n  background-color: #FF9F43;\n}\n\n.lagon {\n  background-color: rgb(31, 181, 168);\n}\n`,
    debrief: "Hexadécimal ou `rgb()`, c’est la même chose écrite autrement : `#FFFFFF` = `rgb(255, 255, 255)` = `white`. Les majuscules ne comptent pas (`#3dcb8b` marche aussi). En entreprise, la charte graphique d’une marque liste ses couleurs en codes : tu les recopieras dans ton CSS. Avec les couleurs, il reste une question à régler : que se passe-t-il quand deux règles se disputent le même élément ?"
  },
  {
    id: "cascade", ch: 2, title: "Le règlement de la forêt", notion: "cascade, spécificité et héritage",
    say: "Bip m’a aidé à colorer le règlement de la forêt, mais ses règles se contredisent ! Le titre reste gris et l’article 3 est devenu invisible…",
    lesson: {
      what: ["Quand deux règles donnent une valeur différente à la même propriété d’un même élément, le navigateur doit choisir : c’est la **cascade**, le « C » de CSS. Il regarde d’abord la **spécificité**, c’est-à-dire la précision du sélecteur : un sélecteur de balise (`p`) est le plus faible, une classe (`.alerte`) est plus forte, un id (`#urgent`) encore plus.", "À spécificité égale, c’est **l’ordre** qui décide : la règle écrite **le plus bas** gagne. Enfin, l’**héritage** : les propriétés du texte (`color`, `font-family`, `font-size`…) se transmettent du parent à ses enfants. Mais une règle qui vise directement l’élément gagne toujours sur une valeur héritée."],
      why: "Comprendre la cascade, c’est comprendre pourquoi « ma couleur ne s’applique pas ». Ce n’est presque jamais un bug : une autre règle, plus précise ou écrite plus bas, a gagné. Dans l’outil **Inspecter** du navigateur, les déclarations perdantes sont barrées, et l’onglet **Calculé** montre la **valeur calculée** : celle qui s’applique vraiment.",
      code: `/* Balise : la plus faible */\np {\n  color: dimgray;\n}\n\n/* Classe : gagne sur p */\n.alerte {\n  color: crimson;\n}\n\n/* Classe écrite plus bas :\n   gagne sur .alerte */\n.urgente {\n  color: white;\n}`,
      pieces: [["l’ordre", "à spécificité égale, la règle écrite **en dernier** gagne"], ["la spécificité", "balise `p` < classe `.alerte` < id `#urgent`. La plus précise gagne, même si elle est écrite plus haut"], ["l’héritage", "`color` et les propriétés du texte passent du parent aux enfants. `background-color`, `border`, `padding` ne s’héritent pas"], ["la valeur calculée", "la valeur finale, après la cascade et l’héritage : celle que tu vois à l’écran"]],
      example: { code: `.alerte {\n  color: crimson;\n}\n\np {\n  color: dimgray;\n}`, html: `<p>Gris : la règle p s’applique.</p>\n<p class="alerte">Rouge : la classe gagne, même écrite plus haut.</p>` },
      trap: "Ajouter `!important` pour « forcer » une valeur (`color: white !important;`). Ça marche une fois, puis il faut un autre `!important` pour le battre, et le CSS devient impossible à maintenir. Cherche plutôt **quelle** règle gagne, et pourquoi.",
      good: "Écris ton CSS du plus général au plus précis : d’abord `body` et les balises, puis les classes. Stylise avec des classes plutôt qu’avec des id : elles ont toutes la même force, c’est donc l’ordre de ton fichier qui décide, et il reste facile à lire."
    },
    showHTML: true,
    base: `p { padding: 6px 10px; border-radius: 8px; }`,
    html: `<h1>Le règlement de la forêt</h1>
<p>Article 1 : on ne réveille pas Kami pendant sa sieste.</p>
<p class="alerte">Article 2 : on ne marche pas sur la queue de Kami.</p>
<p class="alerte urgente">Article 3 : on ne mange jamais les grillons de Kami !</p>`,
    steps: ["Le titre doit être `seagreen`, mais il reste gris : une vieille règle `h1`, tout en bas, gagne parce qu’elle est écrite après. Supprime-la.", "L’article 3 a deux classes, `alerte` et `urgente`. La règle `.urgente` (texte `white`) est écrite **avant** `.alerte` (texte `crimson`) : à force égale, elle perd. Déplace-la **après** `.alerte`.", "Ajoute une règle `body` avec `color: dimgray` : l’article 1 en hérite. Les articles 2 et 3 gardent leur couleur, car leurs classes les visent directement.", "Interdit d’utiliser `!important` !"],
    starter: `/* Le CSS de Bip : trois problèmes de cascade */\n\nh1 {\n  color: seagreen;\n}\n\n.urgente {\n  background-color: crimson;\n  color: white;\n}\n\n.alerte {\n  color: crimson;\n}\n\n/* Une vieille règle oubliée */\nh1 {\n  color: gray;\n}\n`,
    goals: [
      { label: "Le titre est `seagreen`", test: c => sameColor(cs(c, "h1", "color"), "seagreen") || (sameColor(cs(c, "h1", "color"), "gray") ? "Le titre est encore gris : la deuxième règle h1, plus bas, gagne. Supprime-la." : false) },
      { label: "L’article 3 est écrit en `white` sur fond `crimson`", test: c => (sameColor(cs(c, ".urgente", "color"), "white") && sameColor(cs(c, ".urgente", "background-color"), "crimson")) || (sameColor(cs(c, ".urgente", "color"), "crimson") ? "Le texte est crimson sur fond crimson : .alerte gagne car elle est écrite après. Déplace la règle .urgente sous .alerte." : false) },
      { label: "L’article 2 reste `crimson`", test: c => sameColor(cs(c, ".alerte:not(.urgente)", "color"), "crimson") },
      { label: "L’article 1 est `dimgray`, hérité de `body`", test: c => (sameColor(cs(c, "body", "color"), "dimgray") && sameColor(cs(c, "p:not(.alerte)", "color"), "dimgray")) || (sameColor(cs(c, "p:not(.alerte)", "color"), "dimgray") ? "Le paragraphe est bien gris, mais mets la couleur sur body : l’article 1 en héritera." : false) },
      { label: "Sans `!important`", test: c => !(c.rules || []).some(r => r.decls.some(d => d.important)) || "Retire !important : range plutôt tes règles dans le bon ordre." },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Tout en bas, la règle `h1 { color: gray; }` est écrite après la bonne : supprime ces lignes (et le commentaire au-dessus).", "Coupe les 4 lignes de la règle `.urgente` et colle-les **sous** la règle `.alerte`. Les deux classes ont la même force : la dernière gagne.", "Ajoute en haut : `body { color: dimgray; }`."],
    solution: `/* Le CSS de Bip : trois problèmes de cascade */\n\nbody {\n  color: dimgray;\n}\n\nh1 {\n  color: seagreen;\n}\n\n.alerte {\n  color: crimson;\n}\n\n.urgente {\n  background-color: crimson;\n  color: white;\n}\n`,
    debrief: "L’ordre, la spécificité, l’héritage : ce sont les trois lois de la cascade. Le titre a gardé `seagreen` alors que `body` est gris, car une règle qui vise directement l’élément gagne sur l’héritage. Sur un vrai site, quand une couleur « ne marche pas », fais clic droit puis **Inspecter** : la déclaration barrée est celle qui a perdu. Le corps de Kami reprend des couleurs !"
  },

  /* ------------------------------ ATELIER 3 ------------------------------ */
  {
    id: "police", ch: 3, title: "Le poème de Kami", notion: "font-family, font-size, font-weight",
    say: "J’ai écrit un poème sur ma couleur perdue. Mais avec cette écriture toute simple, il n’a aucune élégance. Tu peux changer les lettres ?",
    lesson: {
      what: ["Trois propriétés pour les lettres : `font-family` choisit la **police** (le dessin des lettres), `font-size` la **taille**, `font-weight` l’**épaisseur** (normal ou gras).", "Pour `font-family`, on donne plusieurs polices séparées par des virgules : si l’ordinateur du visiteur n’a pas la première, il prend la suivante. La dernière est une **famille générique** (`serif`, `sans-serif`), qui existe partout : c’est la **police de secours**."],
      why: "La police change complètement l’ambiance : une police à empattements (avec des petits pieds, comme `Georgia`) fait classique et littéraire, une police sans empattements (`Arial`) fait moderne. La taille et le gras créent une hiérarchie : on voit tout de suite ce qui est important.",
      code: `body {\n  font-family: Georgia, serif;\n}\n\nh1 {\n  font-size: 40px;\n}\n\n.auteur {\n  font-weight: bold;\n}`,
      pieces: [["font-family", "la police. `Georgia` d’abord, sinon n’importe quelle police `serif`"], ["serif", "une famille de secours : « une police à empattements ». `sans-serif` = sans empattements"], ["font-size: 40px", "la taille des lettres, en pixels. Le texte normal fait `16px`"], ["font-weight: bold", "en gras. `normal` pour revenir à l’épaisseur normale"]],
      example: { code: `p {\n  font-family: "Courier New", monospace;\n  font-size: 20px;\n}`, html: `<p>Une police de machine à écrire.</p>` },
      trap: "Oublier l’unité : `font-size: 40;` ne marche pas. Il faut `40px`, collé, sans espace. Et un nom de police avec des espaces s’écrit entre guillemets : `\"Courier New\"`.",
      good: "Termine toujours `font-family` par une **famille générique** (`serif`, `sans-serif` ou `monospace`), et limite-toi à deux polices par site : une pour les titres, une pour le texte."
    },
    showHTML: true,
    html: `<h1>Le poème de Kami</h1>
<p class="auteur">par Kami, caméléon et poète</p>
<p>Je suis vert sur la feuille,<br>Je suis brun sur la branche,<br>Mais ce matin, sans couleur,<br>Je suis gris comme un dimanche.</p>`,
    steps: ["Donne à toute la page (`body`) la police `Georgia, serif`.", "Donne au titre `h1` une taille de `40px`.", "Mets le paragraphe `.auteur` en gras (`bold`)."],
    starter: `/* Les lettres du poème */\n`,
    goals: [
      { label: "Toute la page est en `Georgia`, avec `serif` en secours", test: c => (/georgia/i.test(cs(c, "p", "font-family")) && /\bserif/i.test(cs(c, "body", "font-family"))) || (/georgia/i.test(cs(c, "body", "font-family")) ? "Ajoute une police de secours après une virgule : Georgia, serif." : (/georgia/i.test(cs(c, "h1", "font-family")) ? "Seul le titre a changé : mets la police sur body pour toute la page." : false)) },
      { label: "Le titre fait `40px`", test: c => px(cs(c, "h1", "font-size")) === 40 || (decl(c, "h1", "font-size") === "40" ? "Il manque l’unité : 40px." : false) },
      { label: "`.auteur` est en gras", test: c => px(cs(c, ".auteur", "font-weight")) >= 600 },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["`body { font-family: Georgia, serif; }` : tous les textes de la page héritent de cette police.", "Le titre : `h1 { font-size: 40px; }`", "Le gras : `.auteur { font-weight: bold; }`"],
    solution: `/* Les lettres du poème */\nbody {\n  font-family: Georgia, serif;\n}\n\nh1 {\n  font-size: 40px;\n}\n\n.auteur {\n  font-weight: bold;\n}`,
    debrief: "Tu as mis la police sur `body`, et tous les textes l’ont prise : encore l’**héritage**. C’est le réflexe pro : une police pour tout le site sur `body`, puis des réglages précis pour les titres. Sur les vrais sites, on utilise souvent des polices gratuites de **Google Fonts**, qu’on ajoute avec une ligne de HTML."
  },
  {
    id: "texte", ch: 3, title: "Le journal de la forêt", notion: "text-align, line-height, text-transform",
    say: "Le journal de la forêt parle de moi en première page ! Mais l’article est mal mis en page. On le rend plus agréable à lire ?",
    lesson: {
      what: ["`text-align` aligne le texte : à gauche (`left`), au centre (`center`) ou à droite (`right`).", "`line-height` règle l’**interligne**, l’espace entre les lignes d’un paragraphe. `text-transform: uppercase` écrit en MAJUSCULES, et `letter-spacing` espace les lettres."],
      why: "Un texte serré se lit mal et fatigue les yeux : un interligne de 1.5 à 1.7 est bien plus confortable. Les majuscules espacées sont parfaites pour de petits titres, comme les rubriques d’un journal.",
      code: `h1 {\n  text-align: center;\n}\n\n.rubrique {\n  text-transform: uppercase;\n  letter-spacing: 3px;\n}\n\np {\n  line-height: 1.6;\n}`,
      pieces: [["text-align: center", "centre le texte dans sa ligne"], ["line-height: 1.6", "l’interligne vaut 1,6 fois la taille des lettres. **Sans unité** : c’est voulu"], ["text-transform: uppercase", "affiche en majuscules, sans retaper le texte"], ["letter-spacing: 3px", "ajoute 3 pixels entre chaque lettre"]],
      example: { code: `p {\n  text-align: right;\n  letter-spacing: 2px;\n}`, html: `<p>Un texte aligné à droite</p>` },
      trap: "Taper le texte en majuscules dans le HTML. Si un jour tu veux changer de style, il faudra tout retaper. Avec `text-transform`, le texte reste normal et c’est le CSS qui décide.",
      good: "Pour un texte long, garde un interligne entre `1.4` et `1.7` et aligne-le à gauche : un long texte centré ou justifié se lit mal. Réserve les majuscules aux petits titres et aux étiquettes."
    },
    showHTML: true,
    html: `<p class="rubrique">Le journal de la forêt</p>
<h1>Kami a perdu ses couleurs</h1>
<p>Ce matin, les habitants de la forêt ont eu une drôle de surprise : Kami, le caméléon le plus coloré du coin, est devenu tout gris. Personne ne sait pourquoi. Son ami Bip le robot mène l’enquête. Il a un indice : un pot de peinture renversé au pied du grand arbre.</p>`,
    steps: ["Centre le titre `h1`.", "Écris la `.rubrique` en majuscules, avec un espacement des lettres de `3px`.", "Donne aux paragraphes `p` un interligne de `1.6`."],
    starter: `/* La mise en page de l’article */\n`,
    goals: [
      { label: "Le titre est centré", test: c => cs(c, "h1", "text-align") === "center" },
      { label: "La rubrique est en majuscules", test: c => cs(c, ".rubrique", "text-transform") === "uppercase" || (/[A-Z]{5}/.test(txt(c, ".rubrique")) ? "N’écris pas en majuscules : utilise text-transform." : false) },
      { label: "Les lettres de la rubrique sont espacées de `3px`", test: c => px(cs(c, ".rubrique", "letter-spacing")) === 3 },
      { label: "L’article a un interligne de `1.6`", test: c => { const p = q(c, "h1 + p"); const r = p ? px(cs(c, p, "line-height")) / px(cs(c, p, "font-size")) : 0; return Math.abs(r - 1.6) < 0.03 || (r > 1.46 ? "L’interligne a changé, mais il doit valoir 1.6." : false); } },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Le titre : `h1 { text-align: center; }`", "La rubrique : `.rubrique { text-transform: uppercase; letter-spacing: 3px; }`", "L’interligne : `p { line-height: 1.6; }` (sans unité)."],
    solution: `/* La mise en page de l’article */\nh1 {\n  text-align: center;\n}\n\n.rubrique {\n  text-transform: uppercase;\n  letter-spacing: 3px;\n}\n\np {\n  line-height: 1.6;\n}`,
    debrief: "Compare avec le début : le texte respire, le titre est posé au centre, la rubrique a l’air d’un vrai journal. Ce sont ces petits réglages, invisibles quand ils sont bien faits, qui rendent un site agréable à lire. On appelle ça la **typographie**."
  },
  {
    id: "unites", ch: 3, title: "L’affiche du concours", notion: "les unités : px, rem, em, %, vw",
    say: "J’organise un grand concours de camouflage ! Mon affiche doit rester lisible sur tous les écrans, même chez ceux qui ont réglé leur navigateur en grands caractères.",
    lesson: {
      what: ["Une **unité** dit dans quelle mesure on compte une taille. Le `px` (**pixel**) est une taille **fixe**. Les autres unités sont **relatives** : elles dépendent d’autre chose.", "`rem` dépend de la taille du texte de la page (16px par défaut) : `2rem` = 2 × 16 = 32px. `em` dépend de la taille du texte du **parent**. `%` dépend aussi du parent : `width: 50%` = la moitié de la largeur du parent. Et `vw` dépend de la fenêtre : `100vw` = toute la largeur de l’écran."],
      why: "Beaucoup de personnes agrandissent le texte de leur navigateur pour mieux lire. Avec `rem`, tes textes grandissent avec ce réglage ; en `px`, ils restent bloqués. Et avec `%`, une boîte s’adapte à la place disponible : c’est le début du **responsive**, une page qui s’adapte à la taille de l’écran.",
      code: `h1 {\n  font-size: 2.5rem; /* 40px */\n}\n\n.affiche {\n  width: 80%; /* du parent */\n}\n\n.petit {\n  font-size: 0.8em; /* du parent */\n}`,
      pieces: [["px", "le pixel : une taille fixe. Parfait pour les petits détails (`border: 2px`)"], ["rem", "relatif à la taille du texte de la page : `1rem` = 16px par défaut. L’unité conseillée pour le texte"], ["em", "relatif à la taille du texte du parent : `0.8em` = 80 % de la taille du parent"], ["%", "un pourcentage du parent. Avec `width`, de la largeur du parent"], ["vw", "1 % de la largeur de la fenêtre : `50vw` = la moitié de l’écran"], ["width", "la **largeur** d’une boîte. Tu la retrouveras dans l’atelier des boîtes"]],
      example: { code: `.a { font-size: 1rem; }\n.b { font-size: 1.5rem; }\n.c {\n  width: 50%;\n  background-color: gold;\n}`, html: `<p class="a">1rem = 16px</p>\n<p class="b">1.5rem = 24px</p>\n<p class="c">width: 50%</p>` },
      trap: "Oublier l’unité ou mettre un espace : `font-size: 2.5;` et `2.5 rem` ne marchent pas. Seul le zéro peut s’écrire sans unité (`margin: 0`). Et `line-height: 1.6`, lui, est **voulu** sans unité : c’est un multiple de la taille du texte.",
      good: "Utilise `rem` pour les tailles de texte, `px` pour les petits détails fixes (bordures, ombres), et `%` ou `max-width` pour les largeurs. Ta page restera lisible quel que soit l’écran ou le réglage du visiteur."
    },
    showHTML: true,
    base: `body { background-color: #EAF3EF; }\n.affiche { background-color: white; padding: 20px; border: 4px solid #FF9F43; }\n.affiche h1 { margin: 0 0 8px; color: #E8337A; }\n.date { margin: 0 0 8px; color: #138A80; font-weight: 700; }`,
    html: `<div class="affiche">
  <h1>Grand concours de camouflage</h1>
  <p class="date">Samedi, au pied du grand arbre</p>
  <p>Viens te cacher avec Kami et ses amis. Le dernier trouvé gagne un pot de peinture !</p>
</div>`,
    steps: ["Le titre `h1` fait `40px` : écris la même taille en `rem` (40 ÷ 16 = `2.5rem`).", "Donne à la `.date` une taille de `1.25rem` (soit 20px).", "Donne à l’`.affiche` une largeur (`width`) de `80%` : elle prendra 80 % de la largeur de la page, quel que soit l’écran."],
    starter: `/* Les tailles de l’affiche */\nh1 {\n  font-size: 40px;\n}\n`,
    goals: [
      { label: "Le titre fait `2.5rem` (40px)", test: c => (px(cs(c, "h1", "font-size")) === 40 && /rem$/.test(decl(c, "h1", "font-size") || "")) || (px(cs(c, "h1", "font-size")) === 40 ? "La bonne taille, mais en px : écris-la en rem (40 ÷ 16 = 2.5rem)." : false) },
      { label: "La `.date` fait `1.25rem` (20px)", test: c => (px(cs(c, ".date", "font-size")) === 20 && /rem$/.test(decl(c, ".date", "font-size") || "")) || (px(cs(c, ".date", "font-size")) === 20 ? "La bonne taille, mais écris-la en rem : 1.25rem." : false) },
      { label: "L’`.affiche` fait `80%` de la largeur de la page", test: c => { const r = px(cs(c, ".affiche", "width")) / px(cs(c, "body", "width")); return (/%$/.test(decl(c, ".affiche", "width") || "") && Math.abs(r - 0.8) < 0.01) || (decl(c, ".affiche", "width") ? "Écris la largeur en pourcentage : width: 80%;" : false); } },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Remplace `40px` par `2.5rem` dans la règle `h1` : un point, pas de virgule, et pas d’espace avant `rem`.", "Ajoute une règle : `.date { font-size: 1.25rem; }`", "Et une dernière : `.affiche { width: 80%; }`"],
    solution: `/* Les tailles de l’affiche */\nh1 {\n  font-size: 2.5rem;\n}\n\n.date {\n  font-size: 1.25rem;\n}\n\n.affiche {\n  width: 80%;\n}\n`,
    debrief: "À l’écran, rien n’a bougé pour le titre : `2.5rem` vaut bien 40px. Mais chez quelqu’un qui a réglé son navigateur en grand texte, ton titre grandira avec lui. Et l’affiche, en `%`, s’adapte toute seule à la largeur de l’écran. C’est pour ça que les sites modernes écrivent leurs textes en `rem`. La crête de Kami se colore !"
  },

  /* ------------------------------ ATELIER 4 ------------------------------ */
  {
    id: "boite", ch: 4, title: "La boîte à souvenirs", notion: "padding, border, margin",
    say: "Je range mes souvenirs dans des boîtes. Mais là, tout est collé, sans bord… On dirait un tas de feuilles. Tu m’aides à faire de vraies boîtes ?",
    lesson: {
      what: ["En CSS, **chaque élément est une boîte** : c’est le **modèle de boîte**. Autour du contenu, il y a trois couches, de l’intérieur vers l’extérieur :", "le `padding` (l’espace **intérieur**, entre le contenu et le bord), la `border` (la **bordure**, le trait du bord) et la `margin` (l’espace **extérieur**, qui éloigne la boîte des autres)."],
      why: "Les espaces sont aussi importants que les couleurs : ils regroupent ce qui va ensemble et séparent le reste. Sans `padding`, le texte touche le bord ; sans `margin`, les boîtes se collent les unes aux autres.",
      code: `.souvenir {\n  padding: 20px;\n  border: 3px solid seagreen;\n  margin-bottom: 24px;\n}`,
      pieces: [["padding: 20px", "20 pixels d’espace **à l’intérieur**, sur les 4 côtés. Le fond de la boîte s’étend dessous"], ["border: 3px solid seagreen", "une bordure : son **épaisseur**, son **style** (`solid` = trait plein, `dashed` = tirets, `dotted` = points) et sa **couleur**"], ["margin-bottom: 24px", "24 pixels d’espace **à l’extérieur**, seulement en bas"], ["-top, -right, -bottom, -left", "on peut viser un seul côté : `padding-left`, `margin-top`…"]],
      example: { code: `.boite {\n  padding: 16px;\n  border: 4px dashed tomato;\n  margin: 12px;\n  background-color: mistyrose;\n}`, html: `<div class="boite">Le contenu</div>` },
      trap: "Confondre `padding` et `margin`. Repère simple : le `padding` est **dans** la boîte (il a la couleur du fond), la `margin` est **dehors** (elle est transparente).",
      good: "Utilise `padding` pour l’espace **dans** une boîte et `margin` pour l’espace **entre** les boîtes. Garde des valeurs régulières (8, 16, 24, 32px…) : la page paraît tout de suite plus ordonnée."
    },
    showHTML: true,
    base: `.souvenir { background-color: #E1F7EC; }\n.souvenir h2 { margin: 0 0 6px; font-size: 20px; }\n.souvenir p { margin: 0; }`,
    html: `<h1>Mes souvenirs</h1>
<div class="souvenir">
  <h2>La maison de Bip</h2>
  <p>Le jour où j’ai aidé Bip à construire sa nouvelle maison.</p>
</div>
<div class="souvenir">
  <h2>La panne de Bip</h2>
  <p>Bip s’est arrêté en pleine forêt. On l’a réparé avec une liane.</p>
</div>`,
    steps: ["Donne aux `.souvenir` un espace intérieur (`padding`) de `20px`.", "Ajoute-leur une bordure : `3px`, trait plein (`solid`), couleur `seagreen`.", "Éloigne-les avec une marge en bas (`margin-bottom`) de `24px`."],
    starter: `.souvenir {\n  \n}\n`,
    goals: [
      { label: "Un `padding` de `20px` sur les 4 côtés", test: c => ["top", "right", "bottom", "left"].every(s => px(cs(c, ".souvenir", "padding-" + s)) === 20) || (px(cs(c, ".souvenir", "margin-top")) === 20 ? "C’est une marge, pas un padding : le padding est à l’intérieur." : false) },
      { label: "Une bordure `3px solid seagreen`", test: c => (px(cs(c, ".souvenir", "border-top-width")) === 3 && cs(c, ".souvenir", "border-left-style") === "solid" && sameColor(cs(c, ".souvenir", "border-bottom-color"), "seagreen")) || (decl(c, ".souvenir", "border") ? "Vérifie les trois morceaux, séparés par des espaces : 3px solid seagreen." : false) },
      { label: "Une marge de `24px` en bas", test: c => px(cs(c, ".souvenir", "margin-bottom")) === 24 },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Tout se passe dans la règle `.souvenir`, une déclaration par ligne.", "`padding: 20px;` puis `border: 3px solid seagreen;`", "Et pour finir : `margin-bottom: 24px;`"],
    solution: `.souvenir {\n  padding: 20px;\n  border: 3px solid seagreen;\n  margin-bottom: 24px;\n}\n`,
    debrief: "Contenu, `padding`, `border`, `margin` : c’est le **modèle de boîte**, la base de toute mise en page en CSS. Fais clic droit puis **Inspecter** sur n’importe quel site : l’outil dessine ces quatre couches pour chaque élément. Les cartes de produits, les encadrés, les boutons… ce sont toutes des boîtes réglées comme ça."
  },
  {
    id: "display", ch: 4, title: "Le menu de Kami", notion: "display : block, inline, inline-block, none",
    say: "Sur ma page, les liens du menu se chevauchent, l’annonce ne prend pas toute la largeur et… ma cachette secrète est visible par tout le monde !",
    lesson: {
      what: ["Chaque élément a un **type d’affichage**, réglé par la propriété `display`. Les éléments **de bloc** (`block` : `h1`, `p`, `div`, `ul`…) commencent sur une nouvelle ligne et prennent toute la largeur. Les éléments **en ligne** (`inline` : `a`, `span`, `strong`…) restent dans le texte, à la suite, et ignorent `width`, `height` et les marges du haut et du bas.", "Avec `display`, on change ce comportement : `inline-block` garde l’élément dans la ligne **mais** accepte toutes les tailles et les marges, `block` le transforme en bloc, et `none` le **cache** complètement."],
      why: "C’est `display` qui explique pourquoi un `padding` « déborde » sur un lien, ou pourquoi un `span` refuse sa largeur. Les boutons d’un menu sont souvent des liens en `inline-block`. Et c’est aussi avec `display` que tu activeras **Flexbox** (`display: flex`) et **Grid** (`display: grid`) dans les prochains jeux.",
      code: `.onglet {\n  display: inline-block;\n  padding: 8px 16px;\n}\n\n.annonce {\n  display: block;\n}\n\n.secret {\n  display: none;\n}`,
      pieces: [["block", "nouvelle ligne, toute la largeur. Accepte `width`, `height` et toutes les marges"], ["inline", "dans la ligne, à la suite du texte. Sa largeur dépend de son contenu"], ["inline-block", "dans la ligne, mais se comporte comme une boîte : `width`, `padding`, `margin` marchent"], ["none", "l’élément disparaît de l’affichage, et sa place avec"]],
      example: { code: `span {\n  display: inline-block;\n  width: 80px;\n  padding: 6px;\n  background-color: gold;\n}`, html: `<p>Un <span>span</span> et un autre <span>span</span>, dans la ligne.</p>` },
      trap: "Croire que `display: none` supprime l’élément : il est toujours dans le HTML, seulement caché. Ne t’en sers jamais pour cacher un secret ou un mot de passe : n’importe qui peut le lire avec **Inspecter** !",
      good: "Respecte le sens du HTML : ne transforme pas un `span` en titre avec `display: block`, choisis la bonne balise (`h2`). Le HTML dit **ce que c’est**, `display` règle seulement **comment ça s’affiche**."
    },
    showHTML: true,
    base: `.onglet { background-color: darkgreen; color: white; text-decoration: none; border-radius: 8px; margin: 4px 2px; }\n.annonce { background-color: #FFD43B; padding: 10px 14px; margin-top: 12px; border-radius: 8px; font-weight: 700; }\n.secret { background-color: #FDE2E4; padding: 10px 14px; border-radius: 8px; }`,
    html: `<h1>La page de Kami</h1>
<p>Menu :
  <a class="onglet" href="#jeux">Jeux</a>
  <a class="onglet" href="#amis">Amis</a>
  <a class="onglet" href="#couleurs">Couleurs</a>
</p>
<span class="annonce">Nouveau : le concours de camouflage est ouvert !</span>
<p class="secret">Ma cachette secrète : sous la troisième feuille du grand arbre.</p>`,
    steps: ["Les `.onglet` sont des liens, donc des éléments **en ligne** : leur `padding` déborde sur les lignes voisines. Passe-les en `inline-block`.", "L’`.annonce` est un `span`, en ligne lui aussi : passe-la en `block` pour qu’elle prenne toute la largeur (et que sa marge du haut marche).", "Cache le paragraphe `.secret` avec `display: none`."],
    starter: `.onglet {\n  padding: 8px 16px;\n}\n\n.annonce {\n  \n}\n\n.secret {\n  \n}\n`,
    goals: [
      { label: "Les `.onglet` sont en `inline-block`", test: c => cs(c, ".onglet", "display") === "inline-block" || (cs(c, ".onglet", "display") === "block" ? "En block, chaque lien prend toute une ligne : il faut inline-block pour qu’ils restent côte à côte." : false) },
      { label: "Les onglets gardent leur `padding` de `8px 16px`", test: c => px(cs(c, ".onglet", "padding-top")) === 8 && px(cs(c, ".onglet", "padding-left")) === 16 },
      { label: "L’`.annonce` est en `block`, sur toute la largeur", test: c => (cs(c, ".annonce", "display") === "block" && Math.abs(q(c, ".annonce").getBoundingClientRect().width - px(cs(c, "body", "width"))) < 2) || (cs(c, ".annonce", "display") === "inline-block" ? "En inline-block, l’annonce garde la largeur de son texte : il faut block." : false) },
      { label: "Le `.secret` est caché avec `display: none`", test: c => cs(c, ".secret", "display") === "none" || (cs(c, ".secret", "visibility") === "hidden" || px(cs(c, ".secret", "opacity")) === 0 ? "Il est invisible, mais il garde sa place : utilise display: none." : false) },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Dans `.onglet`, ajoute `display: inline-block;` au-dessus du padding.", "Dans `.annonce` : `display: block;`", "Dans `.secret` : `display: none;`"],
    solution: `.onglet {\n  display: inline-block;\n  padding: 8px 16px;\n}\n\n.annonce {\n  display: block;\n}\n\n.secret {\n  display: none;\n}\n`,
    debrief: "Block, inline, inline-block, none : avec ces quatre valeurs, tu comprends pourquoi chaque élément se place comme il le fait. Retiens surtout que `display` se règle **sur l’élément lui-même**. Dans le jeu Flexbox, tu écriras `display: flex` sur un parent, et ses enfants se placeront côte à côte : ce sera encore `display` !"
  },
  {
    id: "arrondi", ch: 4, title: "Le badge du club", notion: "border-radius, width, box-sizing",
    say: "Je suis membre n° 7 du club des caméléons ! Mon badge est trop carré et trop large. On l’arrondit et on lui donne la bonne taille ?",
    lesson: {
      what: ["Tu connais `width`, la **largeur** d’une boîte (et `height`, sa **hauteur**). `border-radius`, lui, arrondit ses **coins**. Avec `border-radius: 50%` sur un carré, on obtient un rond parfait.", "Piège : par défaut, `width` règle seulement le contenu. Le `padding` et la `border` s’**ajoutent** autour ! Avec `box-sizing: border-box`, la largeur choisie devient la largeur **totale**, bordure comprise."],
      why: "Les coins arrondis sont partout : boutons, cartes, photos de profil. Et `box-sizing: border-box` évite des calculs pénibles : tu demandes 260 pixels, tu obtiens 260 pixels. Presque tous les sites l’utilisent.",
      code: `.badge {\n  width: 260px;\n  box-sizing: border-box;\n  border-radius: 20px;\n}\n\n.photo {\n  border-radius: 50%;\n}`,
      pieces: [["width: 260px", "la largeur de la boîte"], ["box-sizing: border-box", "la largeur compte **tout** : contenu, padding et bordure"], ["border-radius: 20px", "des coins arrondis, avec un rayon de 20 pixels"], ["border-radius: 50%", "sur un carré : un cercle. Idéal pour les photos de profil"]],
      example: { code: `.pastille {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background-color: gold;\n}`, html: `<div class="pastille"></div>` },
      trap: "Sans `box-sizing: border-box`, une boîte de `width: 260px` avec `20px` de padding et `4px` de bordure fait en réalité 260 + 40 + 8 = **308 pixels**. Tout déborde, et on ne comprend pas pourquoi.",
      good: "Commence chaque `style.css` par `* { box-sizing: border-box; }` (l’étoile `*` vise tous les éléments) : toutes tes boîtes auront la taille que tu leur donnes, bordure comprise. C’est le premier réflexe des pros."
    },
    showHTML: true,
    base: `.badge { background-color: #E1F7EC; border: 4px solid #3DCB8B; padding: 20px; text-align: center; }\n.badge h2 { margin: 10px 0 4px; }\n.badge p { margin: 0; }\n.photo { width: 80px; height: 80px; margin: 0 auto; background-color: #3DCB8B; color: white; font-size: 36px; font-weight: 700; line-height: 80px; }`,
    html: `<div class="badge">
  <div class="photo">K</div>
  <h2>Kami</h2>
  <p>Membre n° 7 du club des caméléons</p>
</div>`,
    steps: ["Donne au `.badge` une largeur de `260px`, bordure comprise, grâce à `box-sizing: border-box`.", "Arrondis les coins du `.badge` avec un rayon de `20px`.", "Transforme la `.photo` carrée en rond avec `border-radius: 50%`."],
    starter: `.badge {\n  \n}\n\n.photo {\n  \n}\n`,
    goals: [
      { label: "Le badge fait `260px` de large au total", test: c => { const w = kWidth(c, ".badge"); return w === 260 || (w === 308 ? "Ton badge fait 308px : le padding (2 × 20px) et la bordure (2 × 4px) s’ajoutent. Ajoute box-sizing: border-box." : (decl(c, ".badge", "width") ? `Ton badge fait ${w}px au total.` : false)); } },
      { label: "Le badge utilise `box-sizing: border-box`", test: c => cs(c, ".badge", "box-sizing") === "border-box" },
      { label: "Les coins du badge sont arrondis à `20px`", test: c => cs(c, ".badge", "border-top-left-radius") === "20px" && cs(c, ".badge", "border-bottom-right-radius") === "20px" },
      { label: "La photo est ronde", test: c => cs(c, ".photo", "border-top-left-radius") === "50%" || px(cs(c, ".photo", "border-top-left-radius")) >= 40 || (px(cs(c, ".photo", "border-top-left-radius")) > 0 ? "C’est arrondi, mais pas encore rond : essaie 50%." : false) },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Dans `.badge` : `width: 260px;` et `box-sizing: border-box;`", "Toujours dans `.badge` : `border-radius: 20px;`", "Dans `.photo` : `border-radius: 50%;`"],
    solution: `.badge {\n  width: 260px;\n  box-sizing: border-box;\n  border-radius: 20px;\n}\n\n.photo {\n  border-radius: 50%;\n}\n`,
    debrief: "Essaie d’enlever `box-sizing: border-box` : le badge grossit de 48 pixels ! C’est pour ça que les développeurs écrivent au début de leur CSS `* { box-sizing: border-box; }`. Et le rond de la photo, tu le retrouveras sur toutes les photos de profil des réseaux sociaux."
  },
  {
    id: "centrer", ch: 4, title: "La lettre bien au milieu", notion: "centrer une boîte : max-width et margin: 0 auto",
    say: "J’écris une lettre à mes amis de la forêt. Sur un grand écran, les lignes sont beaucoup trop longues et la lettre est collée à gauche. On la met bien au milieu ?",
    lesson: {
      what: ["`max-width` fixe une largeur **maximale** : la boîte peut être plus étroite si la place manque (sur un téléphone), mais jamais plus large. C’est plus souple que `width`.", "Pour centrer une boîte de bloc qui a une largeur, on lui donne des marges **automatiques** à gauche et à droite : `margin: 0 auto;`. Le navigateur partage l’espace libre en deux parts égales, une de chaque côté."],
      why: "Presque tous les sites centrent leur contenu dans une colonne de largeur limitée : sur un grand écran, une ligne de 200 caractères est fatigante à lire (on vise 60 à 80 caractères par ligne). `max-width` + `margin: 0 auto`, c’est le duo le plus utilisé du web pour ça.",
      code: `.lettre {\n  max-width: 480px;\n  margin: 0 auto;\n}`,
      pieces: [["max-width: 480px", "jamais plus de 480 pixels de large, mais moins si l’écran est plus petit"], ["margin: 0 auto", "deux valeurs : `0` en haut et en bas, `auto` à gauche et à droite"], ["auto", "le navigateur calcule la marge : il partage l’espace libre à égalité"], ["text-align: center", "centre le **texte** à l’intérieur d’une boîte, pas la boîte elle-même"]],
      example: { code: `.boite {\n  max-width: 200px;\n  margin: 0 auto;\n  padding: 10px;\n  background-color: gold;\n}`, html: `<div class="boite">Je suis centrée !</div>` },
      trap: "Utiliser `text-align: center` pour centrer une boîte : il centre seulement le texte **à l’intérieur**. Et `margin: 0 auto` ne fait rien sans largeur : une boîte de bloc prend déjà toute la place, il n’y a rien à partager.",
      good: "Préfère `max-width` à `width` pour les grandes boîtes : sur un téléphone plus étroit que 480px, la boîte rétrécit au lieu de déborder. Et garde des lignes de texte de longueur raisonnable."
    },
    showHTML: true,
    base: `body { background-color: #EAF3EF; }\n.lettre { background-color: white; padding: 24px; border-radius: 16px; }\n.lettre h1 { margin-top: 0; font-size: 1.5rem; color: seagreen; }\n.lettre p { line-height: 1.6; }\n.signature { font-weight: 700; margin-bottom: 0; }`,
    html: `<div class="lettre">
  <h1>Chers amis de la forêt,</h1>
  <p>Grâce à vous, j’ai retrouvé presque toutes mes couleurs : ma tête est verte, mon corps est orange et ma crête est turquoise. Merci à Bip, qui a mené l’enquête, et aux lucioles, qui ont éclairé mes nuits.</p>
  <p>Je vous invite tous à fêter ça samedi, au pied du grand arbre. Apportez des grillons !</p>
  <p class="signature">Kami</p>
</div>`,
    steps: ["Bip a essayé `text-align: center` : la boîte n’a pas bougé, seul le texte s’est centré. Enlève cette ligne.", "Limite la largeur de la `.lettre` à `480px` avec `max-width`, puis centre-la avec `margin: 0 auto`.", "Aligne la `.signature` à droite (`text-align: right`), comme dans une vraie lettre."],
    starter: `.lettre {\n  text-align: center;\n}\n`,
    goals: [
      { label: "La `.lettre` fait au maximum `480px` (`max-width`)", test: c => cs(c, ".lettre", "max-width") === "480px" || (decl(c, ".lettre", "width") ? "Utilise max-width plutôt que width : la lettre pourra rétrécir sur un petit écran." : false) },
      { label: "La lettre est centrée dans la page", test: c => { const l = px(cs(c, ".lettre", "margin-left")), r = px(cs(c, ".lettre", "margin-right")); return (l > 0 && Math.abs(l - r) < 1) || (cs(c, ".lettre", "text-align") === "center" ? "text-align: center centre le texte, pas la boîte : utilise margin: 0 auto." : false); } },
      { label: "Le texte de la lettre est aligné à gauche", test: c => cs(c, ".lettre p", "text-align") !== "center" || "Le texte est centré : enlève text-align: center, il centre le texte et pas la boîte." },
      { label: "La `.signature` est alignée à droite", test: c => cs(c, ".signature", "text-align") === "right" },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Remplace `text-align: center;` par `max-width: 480px;` dans la règle `.lettre`.", "Toujours dans `.lettre`, ajoute `margin: 0 auto;`.", "Nouvelle règle : `.signature { text-align: right; }`"],
    solution: `.lettre {\n  max-width: 480px;\n  margin: 0 auto;\n}\n\n.signature {\n  text-align: right;\n}\n`,
    debrief: "Deux lignes, et la lettre se pose au centre, avec des lignes agréables à lire. Retiens la différence : `text-align` aligne le **contenu** d’une boîte, `margin: 0 auto` centre **la boîte** elle-même. Les articles de presse, les blogs, les pages de connexion : tous utilisent ce duo."
  },
  {
    id: "quiz2", ch: 4, quiz: true, title: "Contrôle des boîtes", notion: "quiz",
    say: "Les pattes, c’est pour bientôt ! Un dernier contrôle sur les couleurs, les lettres et les boîtes.",
    questions: [
      { q: "De quelle couleur est le paragraphe `<p class=\"note\">` ?", code: `.note {\n  color: teal;\n}\n\np {\n  color: black;\n}`, opts: ["`black`, car la règle `p` est écrite en dernier", "`teal`, car une classe est plus précise qu’une balise", "les deux couleurs se mélangent"], a: 1, why: "C’est la **spécificité** : une classe est plus précise qu’un sélecteur de balise, elle gagne même si elle est écrite plus haut. L’ordre ne compte qu’entre deux sélecteurs de même force." },
      { q: "Avec la taille de texte par défaut (16px), combien mesure `1.5rem` ?", opts: ["24px", "15px", "1,5px"], a: 0, why: "`1rem` = la taille du texte de la page, 16px par défaut. Donc `1.5rem` = 1,5 × 16 = 24px. Et si le visiteur agrandit son texte, ça grandit aussi." },
      { q: "L’espace **entre le contenu et la bordure** d’une boîte, c’est…", opts: ["la `margin`", "le `border-spacing`", "le `padding`"], a: 2, why: "Le `padding` est l’espace intérieur, il a la couleur du fond. La `margin` est l’espace extérieur, transparent." },
      { q: "Sans `box-sizing`, quelle est la largeur totale de cette boîte ?", code: `.boite {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n}`, opts: ["200px", "250px", "240px"], a: 1, why: "200 de contenu + 2 × 20 de padding + 2 × 5 de bordure = 250px. Avec `box-sizing: border-box`, elle ferait 200px." },
      { q: "Un lien `<a>` refuse le `width` que tu lui donnes. Pourquoi ?", opts: ["C’est un élément en ligne (`inline`) : il faut `display: inline-block`", "Il faut écrire `width` en `rem`", "Les liens ne peuvent jamais changer de taille"], a: 0, why: "Les éléments en ligne (`a`, `span`, `strong`…) ignorent `width`, `height` et les marges du haut et du bas. En `inline-block` ou en `block`, ils les acceptent." },
      { q: "Comment centrer une boîte `.page` qui a `max-width: 600px` ?", opts: ["`text-align: center;`", "`align: middle;`", "`margin: 0 auto;`"], a: 2, why: "Des marges `auto` à gauche et à droite partagent l’espace libre en deux. `text-align: center` ne centre que le texte à l’intérieur, et `align` n’existe pas." }
    ],
    debrief: "Cascade, unités, modèle de boîte, `display`, centrage : tu as les fondations de toute mise en page. Les pattes de Kami retrouvent leurs couleurs !"
  },

  /* ------------------------------ ATELIER 5 ------------------------------ */
  {
    id: "survol", ch: 5, title: "Le bouton qui réagit", notion: ":hover et cursor",
    say: "Sur la page de mon club, les boutons ne réagissent pas quand on passe la souris dessus. Moi, quand on me touche, je change de couleur ! Les boutons devraient faire pareil.",
    lesson: {
      what: ["Une **pseudo-classe** vise un élément dans un certain **état**. La plus connue est `:hover` (« survolé ») : la règle `.bouton:hover` s’applique seulement **quand la souris passe dessus**.", "La propriété `cursor` change la forme du curseur de la souris. `cursor: pointer` affiche la petite main, qui veut dire « tu peux cliquer ici »."],
      why: "Un bouton qui réagit rassure le visiteur : il comprend que c’est cliquable. C’est un petit détail, mais tous les sites professionnels le font.",
      code: `.bouton {\n  background-color: darkgreen;\n  cursor: pointer;\n}\n\n.bouton:hover {\n  background-color: sienna;\n}`,
      pieces: [[".bouton", "le style **normal** du bouton"], [":hover", "collé au sélecteur, sans espace : « quand la souris est dessus »"], ["cursor: pointer", "la petite main au survol"], ["deux règles", "dans `:hover`, on n’écrit que ce qui **change**"]],
      example: { code: `.lien:hover {\n  color: crimson;\n}`, html: `<p class="lien">Passe ta souris sur cette phrase.</p>` },
      trap: "Mettre un espace : `.bouton :hover` ne veut pas dire la même chose et ne marche pas. Écris `.bouton:hover`, tout collé. Et sur téléphone, il n’y a pas de souris : le survol n’existe pas, alors le bouton doit être compréhensible **sans** lui.",
      good: "Mets `cursor: pointer` seulement sur ce qui est cliquable (liens, boutons). Et ne cache jamais une information importante derrière le survol : sur téléphone, il n’y a pas de souris."
    },
    showHTML: true,
    base: `.bouton { font: inherit; font-weight: 700; color: white; background-color: darkgreen; border: 0; padding: 12px 20px; margin: 4px 8px 4px 0; border-radius: 999px; }`,
    html: `<h1>Le club des caméléons</h1>
<p>Tu veux rejoindre le club ? Choisis ton bouton :</p>
<button class="bouton">Je m’inscris</button>
<button class="bouton">En savoir plus</button>`,
    steps: ["Ajoute `cursor: pointer` aux `.bouton` : passe ta souris dessus, la petite main apparaît.", "Écris une nouvelle règle `.bouton:hover`.", "Dedans, change le fond en `sienna`. Survole les boutons dans l’aperçu pour tester !"],
    starter: `.bouton {\n  background-color: darkgreen;\n}\n`,
    goals: [
      { label: "La petite main apparaît sur les boutons (`cursor: pointer`)", test: c => cs(c, ".bouton", "cursor") === "pointer" || kHover(c, ".bouton", "cursor") === "pointer" },
      { label: "Une règle `.bouton:hover` existe", test: c => kRules(c, s => s.includes(".bouton:hover")).length > 0 || (kRules(c, s => /\.bouton\s+:hover/.test(s)).length ? "Pas d’espace avant :hover : .bouton:hover, tout collé." : false) },
      { label: "Au survol, le fond devient `sienna`", test: c => { const v = kHover(c, ".bouton", "background-color"); return (!!v && sameColor(v, "sienna")) || (v ? "La règle de survol existe, mais le fond doit devenir sienna." : false); } },
      { label: "Sans survol, le bouton reste `darkgreen`", test: c => sameColor(cs(c, ".bouton", "background-color"), "darkgreen") || "Le bouton a changé de couleur tout le temps : mets sienna seulement dans .bouton:hover." },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Dans la règle `.bouton` existante, ajoute la ligne `cursor: pointer;`.", "En dessous, crée une nouvelle règle : `.bouton:hover { }`.", "Dedans : `background-color: sienna;`"],
    solution: `.bouton {\n  background-color: darkgreen;\n  cursor: pointer;\n}\n\n.bouton:hover {\n  background-color: sienna;\n}\n`,
    debrief: "Avec `:hover`, ta page réagit pour la première fois ! Il existe d’autres états : `:focus` (le champ où l’on tape, ou l’élément atteint avec la touche Tab du clavier), `:active` (pendant le clic). Les personnes qui naviguent au clavier ne survolent jamais rien : c’est la prochaine mission."
  },
  {
    id: "focus", ch: 5, title: "Le clavier de Bip", notion: ":focus et l’accessibilité",
    say: "Bip n’a pas de souris : il navigue avec la touche Tab du clavier. Sur le formulaire de mon club, il ne voit jamais où il se trouve ! Quelqu’un a supprimé le contour…",
    lesson: {
      what: ["La pseudo-classe `:focus` vise l’élément qui a le **focus** : celui qui reçoit le clavier. C’est le champ dans lequel on tape, ou le lien et le bouton atteints avec la touche **Tab**.", "Par défaut, le navigateur dessine un **contour** autour de l’élément qui a le focus : la propriété `outline`. Elle s’écrit comme `border` (épaisseur, style, couleur), mais elle ne prend pas de place : elle est dessinée par-dessus, sans pousser les autres éléments."],
      why: "Beaucoup de personnes naviguent **sans souris** : au clavier, avec une synthèse vocale, ou à cause d’un handicap moteur. Pour elles, le contour du focus, c’est le curseur : sans lui, elles sont perdues. Rendre un site utilisable par tout le monde, c’est l’**accessibilité**, et c’est même une obligation légale pour beaucoup de sites.",
      code: `.champ:focus {\n  outline: 3px solid sienna;\n  outline-offset: 2px;\n}\n\n.bouton:focus {\n  outline: 3px solid sienna;\n  outline-offset: 2px;\n}`,
      pieces: [[":focus", "l’état « reçoit le clavier » : le champ actif, ou l’élément atteint avec Tab"], ["outline", "le contour : épaisseur, style, couleur, comme `border`, mais sans prendre de place"], ["outline-offset: 2px", "éloigne le contour de 2 pixels du bord : il est plus lisible"], ["Tab", "la touche du clavier qui passe d’un élément à l’autre (Maj + Tab pour revenir)"]],
      example: { code: `input:focus {\n  outline: 3px solid deeppink;\n}`, html: `<p>Clique dans le champ :</p>\n<input type="text" placeholder="Écris ici">` },
      trap: "Écrire `outline: none;` parce que le contour « n’est pas joli ». C’est l’erreur d’accessibilité la plus répandue du web. Si tu veux changer le contour, **remplace-le** par un autre bien visible, ne le supprime jamais.",
      good: "Teste toujours ta page au clavier : clique dans la page, appuie sur Tab plusieurs fois, et vérifie que tu vois à chaque instant où tu te trouves. Donne au focus un style au moins aussi visible que le survol."
    },
    showHTML: true,
    base: `.formulaire { max-width: 360px; }\nlabel { display: block; margin-bottom: 6px; font-weight: 700; }\n.champ { display: block; width: 100%; box-sizing: border-box; padding: 10px 12px; margin-bottom: 14px; font: inherit; border: 2px solid silver; border-radius: 8px; }\n.bouton { font: inherit; font-weight: 700; color: white; background-color: darkgreen; border: 0; padding: 12px 20px; border-radius: 999px; cursor: pointer; }`,
    html: `<h1>Inscription au club</h1>
<form class="formulaire">
  <label for="nom">Ton nom de caméléon</label>
  <input id="nom" class="champ" type="text" placeholder="Par exemple : Kami">
  <label for="couleur">Ta couleur préférée</label>
  <input id="couleur" class="champ" type="text" placeholder="Par exemple : vert feuille">
  <button class="bouton" type="submit">Je m’inscris</button>
</form>`,
    steps: ["Clique dans un champ de l’aperçu, puis appuie sur Tab : on ne voit pas où l’on est. C’est la faute des deux `outline: none`.", "Dans `.champ:focus`, remplace `outline: none` par un vrai contour : `3px solid sienna`, avec `outline-offset: 2px`.", "Fais la même chose dans `.bouton:focus`, puis reteste avec la touche Tab."],
    starter: `/* Bip trouvait le contour « pas joli »… */\n.champ:focus {\n  outline: none;\n}\n\n.bouton:focus {\n  outline: none;\n}\n`,
    goals: [
      { label: "`.champ:focus` a un contour bien visible", test: c => { const v = kState(c, ".champ", ":focus", "outline"); return kVisible(v) || (v && /none/.test(v) ? "Le contour est encore supprimé : remplace none par 3px solid sienna." : false); } },
      { label: "`.bouton:focus` a un contour bien visible", test: c => { const v = kState(c, ".bouton", ":focus", "outline"); return kVisible(v) || (v && /none/.test(v) ? "Le bouton aussi doit montrer le focus : outline: 3px solid sienna;" : false); } },
      { label: "Les contours sont décalés avec `outline-offset`", test: c => (px(kState(c, ".champ", ":focus", "outline-offset")) > 0 && px(kState(c, ".bouton", ":focus", "outline-offset")) > 0) || (kState(c, ".champ", ":focus", "outline-offset") ? "Ajoute aussi outline-offset: 2px; dans .bouton:focus." : false) },
      { label: "Plus aucun `outline: none`", test: c => !(c.rules || []).some(r => r.decls.some(d => d.prop === "outline" && /none|^0(px)?$/.test(d.value))) || "Il reste un outline: none : ne supprime jamais le contour sans le remplacer." },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Garde les deux règles, change seulement ce qu’il y a dedans.", "Dans `.champ:focus` : `outline: 3px solid sienna;` puis `outline-offset: 2px;`", "Copie ces deux lignes dans `.bouton:focus`, à la place de `outline: none;`."],
    solution: `/* Bip trouvait le contour « pas joli »… */\n.champ:focus {\n  outline: 3px solid sienna;\n  outline-offset: 2px;\n}\n\n.bouton:focus {\n  outline: 3px solid sienna;\n  outline-offset: 2px;\n}\n`,
    debrief: "Maintenant, Bip voit toujours où il est. Tu as remplacé le contour au lieu de le supprimer : c’est **le** bon réflexe d’accessibilité. Sur les vrais sites, essaie de naviguer avec Tab : tu verras vite lesquels ont pensé à `:focus`… et lesquels l’ont oublié."
  },
  {
    id: "transition", ch: 5, title: "La cabine d’essayage", notion: "transition",
    say: "Dans ma cabine, j’essaie des couleurs. Mais là, ça change d’un coup, clac ! Moi, quand je change de couleur, c’est tout en douceur…",
    lesson: {
      what: ["Par défaut, un changement de style est **instantané**. La propriété `transition` le rend **progressif** : le navigateur passe doucement de l’ancienne valeur à la nouvelle.", "On lui donne la propriété à animer et la **durée**, en secondes (`s`) : `transition: background-color 0.4s;`."],
      why: "Une transition douce rend l’interface plus agréable et plus naturelle. Les boutons, les menus, les cartes qui se soulèvent : presque tous les effets de survol des sites utilisent `transition`.",
      code: `.bouton {\n  background-color: darkgreen;\n  transition: background-color 0.4s;\n}\n\n.bouton:hover {\n  background-color: sienna;\n}`,
      pieces: [["transition", "« quand cette propriété change, fais-le en douceur »"], ["background-color", "la propriété à animer. `all` pour toutes"], ["0.4s", "la durée : 0,4 seconde. On écrit un **point**, pas une virgule"], ["dans .bouton", "la transition se met sur l’état **normal**, pas dans `:hover`"]],
      example: { code: `.carre {\n  width: 60px;\n  height: 60px;\n  background-color: gold;\n  transition: background-color 1s;\n}\n\n.carre:hover {\n  background-color: crimson;\n}`, html: `<div class="carre"></div>` },
      trap: "Mettre la `transition` dans `.bouton:hover` : l’aller est doux, mais le retour est brutal, car la transition disparaît dès que la souris s’en va. Mets-la dans `.bouton` : elle marche dans les deux sens.",
      good: "Garde des transitions courtes, entre `0.2s` et `0.5s`, et anime seulement ce qui change (`background-color` plutôt que `all`). Une interface doit rester rapide."
    },
    showHTML: true,
    base: `.bouton { font: inherit; font-weight: 700; color: white; border: 0; padding: 12px 20px; margin: 4px 8px 4px 0; border-radius: 999px; }`,
    html: `<h1>La cabine de Kami</h1>
<p>Passe la souris sur les boutons : Kami essaie une nouvelle couleur.</p>
<button class="bouton">Vert forêt</button>
<button class="bouton">Vert lagon</button>
<button class="bouton">Vert pomme</button>`,
    steps: ["Dans la règle `.bouton`, ajoute une transition sur `background-color`.", "Donne-lui une durée de `0.4s`.", "Survole les boutons pour voir la différence."],
    starter: `.bouton {\n  background-color: darkgreen;\n  cursor: pointer;\n}\n\n.bouton:hover {\n  background-color: sienna;\n}\n`,
    goals: [
      { label: "Le `.bouton` a une transition sur son fond", test: c => { const p = cs(c, ".bouton", "transition-property"); const d = cs(c, ".bouton", "transition-duration"); return (d !== "0s" && /background-color|all/.test(p)) || (kHover(c, ".bouton", "transition") ? "Ta transition est dans .bouton:hover : elle ne marche qu’à l’aller. Mets-la dans .bouton." : false); } },
      { label: "La transition dure `0.4s`", test: c => cs(c, ".bouton", "transition-duration") === "0.4s" || (cs(c, ".bouton", "transition-duration") !== "0s" ? `Ta transition dure ${cs(c, ".bouton", "transition-duration")} : il faut 0.4s.` : false) },
      { label: "Le survol change toujours le fond en `sienna`", test: c => { const v = kHover(c, ".bouton", "background-color"); return !!v && sameColor(v, "sienna"); } },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Ajoute une ligne dans `.bouton`, pas dans `.bouton:hover`.", "La forme : `transition: propriété durée;`", "`transition: background-color 0.4s;`"],
    solution: `.bouton {\n  background-color: darkgreen;\n  cursor: pointer;\n  transition: background-color 0.4s;\n}\n\n.bouton:hover {\n  background-color: sienna;\n}\n`,
    debrief: "Une seule ligne, et les boutons changent de couleur comme Kami : en douceur. Garde des durées courtes, entre `0.2s` et `0.5s` : plus long, l’interface paraît lente."
  },

  {
    id: "variables", ch: 5, title: "La palette de Kami", notion: "les variables CSS",
    say: "Ma couleur principale est écrite trois fois dans mon CSS. Et voilà que je change d’avis : je préfère le vert lagon ! Il faut tout chercher et tout remplacer… Il n’y a pas plus malin ?",
    lesson: {
      what: ["Une **variable CSS** (on dit aussi *propriété personnalisée*) est une valeur à laquelle on donne un **nom**, pour la réutiliser partout. Son nom commence par deux tirets : `--principale`.", "On la déclare en général dans la règle `:root`, une pseudo-classe qui vise la **racine** de la page (la balise `<html>`) : toute la page en profite grâce à l’héritage. Puis on l’utilise avec la fonction `var()` : `color: var(--principale);`."],
      why: "Une charte graphique compte 3 à 6 couleurs, utilisées des dizaines de fois. Avec des variables, chaque couleur est écrite **une seule fois** : pour changer le vert de tout le site, tu changes une ligne. C’est aussi comme ça que les sites font leur **mode sombre** : ils changent seulement la valeur de leurs variables.",
      code: `:root {\n  --principale: #3DCB8B;\n  --accent: #FF9F43;\n}\n\nh1 {\n  color: var(--principale);\n}\n\n.bouton {\n  background-color: var(--principale);\n}`,
      pieces: [[":root", "la racine de la page (`<html>`) : l’endroit habituel pour ranger ses variables"], ["--principale: #3DCB8B;", "la déclaration de la variable : deux tirets, un nom, puis la valeur"], ["var(--principale)", "utilise la valeur de la variable. Si la valeur change, tout change"], ["le nom", "un nom clair, selon le **rôle** : `--principale`, `--accent`, `--texte`, `--espace`…"]],
      example: { code: `:root {\n  --rose: #E8337A;\n}\n\nh2 {\n  color: var(--rose);\n}\n\np {\n  border-left: 4px solid var(--rose);\n  padding-left: 8px;\n}`, html: `<h2>Un titre rose</h2>\n<p>Un paragraphe avec une bordure rose.</p>` },
      trap: "Oublier `var()` : `color: --principale;` ne marche pas. Et le nom doit être écrit exactement pareil partout : `var(--Principale)` ou `var(-principale)` ne trouvent rien, et la couleur disparaît sans message.",
      good: "Range toutes tes couleurs (et les tailles qui reviennent souvent) dans des variables, tout en haut de ton `style.css`, dans `:root`. Nomme-les selon leur **rôle** (`--principale`, `--texte`) plutôt que leur couleur : si la marque passe du vert au bleu, le nom reste juste."
    },
    showHTML: true,
    base: `.encadre { padding: 12px 16px; margin-bottom: 14px; border-radius: 10px; }\n.bouton { font: inherit; font-weight: 700; color: white; border: 0; padding: 12px 20px; border-radius: 999px; }`,
    html: `<h1>La palette de Kami</h1>
<p>Ma couleur principale revient partout : dans le titre, l’encadré et le bouton.</p>
<div class="encadre">Astuce de Kami : pour te camoufler, reste immobile et respire doucement.</div>
<button class="bouton">Changer de couleur</button>`,
    steps: ["Dans `:root`, déclare la variable `--principale` avec la valeur `#3DCB8B`.", "Remplace les trois `#3DCB8B` du titre, de l’encadré et du bouton par `var(--principale)`.", "Kami change d’avis : change **seulement** la valeur de la variable en `#0F766E` (vert lagon). Les trois éléments changent d’un coup !"],
    starter: `:root {\n  /* Déclare ta variable ici */\n  \n}\n\nh1 {\n  color: #3DCB8B;\n}\n\n.encadre {\n  border: 3px solid #3DCB8B;\n}\n\n.bouton {\n  background-color: #3DCB8B;\n}\n`,
    goals: [
      { label: "`:root` déclare la variable `--principale`", test: c => !!decl(c, ":root", "--principale") || (kRules(c, s => s === ":root").some(r => r.decls.some(d => d.prop.startsWith("-"))) ? "Le nom de la variable doit être exactement --principale (deux tirets)." : false) },
      { label: "Le titre, l’encadré et le bouton utilisent `var(--principale)`", test: c => { const v = x => /var\(\s*--principale\s*\)/.test(x || ""); const ok = [v(decl(c, "h1", "color")), v(decl(c, ".encadre", "border")) || v(decl(c, ".encadre", "border-color")), v(decl(c, ".bouton", "background-color")) || v(decl(c, ".bouton", "background"))]; return ok.every(Boolean) || (ok.some(Boolean) ? `Il manque var(--principale) dans : ${["h1", ".encadre", ".bouton"].filter((t, k) => !ok[k]).join(", ")}.` : false); } },
      { label: "Les trois sont maintenant vert lagon `#0F766E`", test: c => (sameColor(cs(c, "h1", "color"), "#0F766E") && sameColor(cs(c, ".encadre", "border-top-color"), "#0F766E") && sameColor(cs(c, ".bouton", "background-color"), "#0F766E")) || (sameColor(cs(c, "h1", "color"), "#3DCB8B") && /var\(/.test(decl(c, "h1", "color") || "") ? "Dernière étape : change la valeur de --principale en #0F766E." : false) },
      { label: "Le code `#0F766E` n’est écrit qu’une seule fois", test: c => (c.clean.match(/#0F766E/gi) || []).length === 1 || ((c.clean.match(/#0F766E/gi) || []).length > 1 ? "Écris #0F766E une seule fois, dans la variable, et var(--principale) partout ailleurs." : false) },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Dans `:root`, à la place du commentaire : `--principale: #3DCB8B;`", "Dans les trois règles, remplace `#3DCB8B` par `var(--principale)`. Pour la bordure : `border: 3px solid var(--principale);`", "Pour finir, une seule ligne change dans `:root` : `--principale: #0F766E;`"],
    solution: `:root {\n  --principale: #0F766E;\n}\n\nh1 {\n  color: var(--principale);\n}\n\n.encadre {\n  border: 3px solid var(--principale);\n}\n\n.bouton {\n  background-color: var(--principale);\n}\n`,
    debrief: "Une ligne changée, trois éléments repeints : c’est toute la force des variables. Sur un vrai site, la variable `--principale` peut servir cent fois. Bonus : ce vert lagon foncé est aussi bien plus **lisible** avec un texte blanc que le vert clair du début (vérifie avec un outil de contraste). Les grandes entreprises appellent ces variables des *design tokens* : les couleurs, tailles et espacements de la marque, rangés à un seul endroit. La queue de Kami reprend ses couleurs !"
  },

  /* ------------------------------ ATELIER 6 ------------------------------ */
  {
    id: "combines", ch: 6, title: "Le site de Kami", notion: "sélecteurs combinés",
    say: "J’ai fait mon propre site ! Mais les liens du menu sont bleus sur fond bleu nuit : on ne voit rien. Et je voudrais la même police pour tous mes titres.",
    lesson: {
      what: ["On peut **combiner** les sélecteurs. Avec un espace, `nav a` veut dire « les liens `a` qui sont **à l’intérieur** d’un `nav` » : c’est le sélecteur **descendant**. Les autres liens de la page ne sont pas touchés.", "Avec une virgule, `h1, h2` veut dire « les `h1` **et** les `h2` » : c’est une **liste de sélecteurs**, une seule règle pour plusieurs sélecteurs."],
      why: "Le sélecteur descendant évite d’ajouter des classes partout dans le HTML : on vise les liens du menu grâce à leur place. La virgule évite de recopier les mêmes lignes : moins de code, moins d’oublis.",
      code: `nav a {\n  color: white;\n}\n\nh1, h2 {\n  font-family: Georgia, serif;\n}`,
      pieces: [["nav a", "l’**espace** veut dire « à l’intérieur de » : les liens dans le menu"], ["h1, h2", "la **virgule** veut dire « et aussi » : la règle s’applique aux deux"], [".carte p", "marche aussi avec des classes : les paragraphes dans une `.carte`"]],
      example: { code: `.encadre p {\n  color: seagreen;\n}`, html: `<p>Un paragraphe dehors.</p>\n<div class="encadre"><p>Un paragraphe dans l’encadré.</p></div>` },
      trap: "Confondre l’espace et la virgule. `nav a` = les liens **dans** un nav. `nav, a` = tous les nav **et** tous les liens de la page : ce n’est pas du tout pareil !",
      good: "Garde des sélecteurs courts : deux niveaux suffisent (`.menu a`). Un sélecteur comme `body main div ul li a` est fragile : il casse dès qu’on change le HTML. Et écris une liste de sélecteurs longue avec un sélecteur par ligne, après chaque virgule."
    },
    showHTML: true,
    base: `.entete { background-color: #1B2440; color: white; padding: 16px; margin: -16px -16px 16px; }\n.entete h1 { margin: 0 0 8px; }\nnav a { margin-right: 14px; }`,
    html: `<header class="entete">
  <h1>Chez Kami</h1>
  <nav>
    <a href="#accueil">Accueil</a>
    <a href="#amis">Mes amis</a>
    <a href="#couleurs">Mes couleurs</a>
  </nav>
</header>
<main>
  <h2>Bienvenue dans ma forêt</h2>
  <p>Ici, tout le monde peut changer de couleur, même toi ! <a href="#essayer">Essayer</a></p>
</main>`,
    steps: ["Avec le sélecteur descendant `nav a`, écris les liens du menu en `white`.", "Le lien « Essayer » du paragraphe doit rester bleu.", "Avec une seule règle `h1, h2`, donne aux deux titres la police `Georgia, serif`."],
    starter: `/* Les liens du menu */\n\n\n/* Les titres */\n`,
    goals: [
      { label: "Les liens du menu sont `white`", test: c => kAll(c, "nav a", "color", "white") },
      { label: "Le lien du paragraphe n’est pas blanc", test: c => !sameColor(cs(c, "main a", "color"), "white") || "Tous les liens sont blancs : vise seulement ceux du menu, avec nav a (un espace entre les deux)." },
      { label: "Les liens du menu sont visés avec un sélecteur descendant", test: c => kRules(c, s => /\S\s+\S/.test(s) && /\ba$/.test(s)).length > 0 || (kAll(c, "nav a", "color", "white") ? "Écris le sélecteur avec un espace : nav a." : false) },
      { label: "Une seule règle `h1, h2` donne `Georgia` aux deux titres", test: c => { const r = kRules(c, () => true).filter(r => { const p = r.sel.split(",").map(norm); return p.includes("h1") && p.includes("h2"); }); return (r.length > 0 && /georgia/i.test(cs(c, "h1", "font-family")) && /georgia/i.test(cs(c, "h2", "font-family"))) || (/georgia/i.test(cs(c, "h1", "font-family")) && /georgia/i.test(cs(c, "h2", "font-family")) ? "Les deux titres sont en Georgia, mais écris une seule règle : h1, h2 { … }." : false); } },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Les liens dans le menu : `nav a { }`, avec un espace.", "Dedans : `color: white;`", "Les titres : `h1, h2 { font-family: Georgia, serif; }`, avec une virgule."],
    solution: `/* Les liens du menu */\nnav a {\n  color: white;\n}\n\n/* Les titres */\nh1, h2 {\n  font-family: Georgia, serif;\n}\n`,
    debrief: "L’**espace** cherche à l’intérieur, la **virgule** regroupe. Les menus de presque tous les sites sont stylés avec un sélecteur comme `nav a` ou `.menu a`. Lis toujours un sélecteur combiné **de droite à gauche** : `nav a` = « des liens… qui sont dans un nav »."
  },
  {
    id: "ombre", ch: 6, title: "La carte postale", notion: "box-shadow",
    say: "J’envoie une carte postale à Bip pour lui dire que j’ai presque retrouvé mes couleurs. Mais elle est toute plate, posée sur la page… Elle pourrait flotter un peu ?",
    lesson: {
      what: ["`box-shadow` ajoute une **ombre** sous une boîte. On lui donne, dans l’ordre : le décalage horizontal, le décalage vertical, le **flou**, puis la couleur.", "Pour la couleur, on utilise souvent `rgba()` : c’est `rgb()` avec une quatrième valeur, l’**opacité**, de 0 (invisible) à 1 (opaque). `rgba(0, 0, 0, 0.2)` est un noir transparent à 20 %."],
      why: "L’ombre donne de la profondeur : la carte semble posée **au-dessus** de la page. Les designers s’en servent pour montrer ce qui est important ou cliquable : cartes de produits, fenêtres, menus déroulants.",
      code: `.carte-postale {\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n}`,
      pieces: [["0", "décalage horizontal : 0, l’ombre est bien centrée"], ["8px", "décalage vertical : l’ombre descend de 8 pixels, comme si la lumière venait d’en haut"], ["20px", "le flou : plus il est grand, plus l’ombre est douce"], ["rgba(0, 0, 0, 0.2)", "un noir à 20 % d’opacité : une ombre légère"]],
      example: { code: `.boite {\n  padding: 16px;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);\n}`, html: `<div class="boite">Je flotte un peu !</div>` },
      trap: "Une ombre trop noire et trop nette (`box-shadow: 5px 5px 0 black;`) fait vieillot et lourd. Les ombres modernes sont **douces** : beaucoup de flou, peu d’opacité.",
      good: "Utilise la même ombre pour tous les éléments du même type (toutes les cartes, tous les menus) : le site paraît cohérent. Une bonne idée : la ranger dans une variable, `--ombre: 0 8px 20px rgba(0, 0, 0, 0.2);`."
    },
    showHTML: true,
    base: `body { background-color: #EAF3EF; padding: 8px; }\n.carte-postale { background-color: white; padding: 24px; border-radius: 16px; max-width: 420px; }\n.carte-postale h2 { margin: 0 0 8px; color: seagreen; }\n.carte-postale p { margin: 0; line-height: 1.6; }\n.signature { margin-top: 12px; font-weight: 700; }`,
    html: `<div class="carte-postale">
  <h2>Bons baisers de la forêt !</h2>
  <p>Cher Bip, ici il fait chaud et les grillons sont délicieux. J’ai presque retrouvé toutes mes couleurs : il ne me manque plus que mes taches.</p>
  <p class="signature">À bientôt, Kami</p>
</div>`,
    steps: ["Ajoute une ombre à la `.carte-postale` avec `box-shadow`.", "Décalage horizontal `0`, vertical `8px`, flou `20px`.", "Couleur : un noir transparent, `rgba(0, 0, 0, 0.2)`."],
    starter: `.carte-postale {\n  \n}\n`,
    goals: [
      { label: "La carte a une ombre", test: c => cs(c, ".carte-postale", "box-shadow") !== "none" },
      { label: "L’ombre descend de `8px` avec un flou de `20px`", test: c => { const s = cs(c, ".carte-postale", "box-shadow"); const n = s.replace(/rgba?\([^)]*\)/, "").match(/-?[\d.]+px/g) || []; return (px(n[0]) === 0 && px(n[1]) === 8 && px(n[2]) === 20) || (s !== "none" ? "L’ordre est : horizontal, vertical, flou, couleur. Ici : 0 8px 20px." : false); } },
      { label: "La couleur de l’ombre est transparente (`rgba`)", test: c => { const m = cs(c, ".carte-postale", "box-shadow").match(/rgba\([^)]*,\s*([\d.]+)\)/); return (!!m && +m[1] < 0.6) || (cs(c, ".carte-postale", "box-shadow") !== "none" ? "Une ombre opaque est trop lourde : utilise rgba(0, 0, 0, 0.2)." : false); } },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Tout tient en une ligne dans `.carte-postale`.", "L’ordre : `box-shadow: horizontal vertical flou couleur;`", "`box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);`"],
    solution: `.carte-postale {\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n}\n`,
    debrief: "La carte décolle de la page ! Joue avec les valeurs : un grand flou et une faible opacité donnent une ombre douce et élégante. Les cartes de produits des boutiques en ligne, les fenêtres qui s’ouvrent par-dessus la page (les *modales*), les boutons flottants des applis utilisent tous `box-shadow`."
  },
  {
    id: "position", ch: 6, title: "Le badge « Nouveau »", notion: "position : relative et absolute",
    say: "Mon livre sur le camouflage vient de sortir ! Je voudrais une petite étiquette « Nouveau » dans le coin de sa fiche, comme dans les vraies boutiques.",
    lesson: {
      what: ["Normalement, les éléments se placent les uns après les autres, de haut en bas : c’est le **flux** de la page. La propriété `position` permet d’en sortir un élément pour le placer précisément.", "Avec `position: absolute`, l’élément sort du flux et se place avec `top` (la distance depuis le haut), `right` (depuis la droite), `bottom` et `left`. Ces distances se comptent depuis le premier **parent positionné** : on donne donc `position: relative` au parent, qui devient le **repère**."],
      why: "C’est la technique des étiquettes « Nouveau » ou « -20 % » sur les produits, des pastilles rouges de notification sur les icônes, des croix de fermeture dans le coin des fenêtres. `relative` sur le parent, `absolute` sur l’enfant : c’est un duo à connaître par cœur.",
      code: `.fiche {\n  position: relative;\n}\n\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}`,
      pieces: [["position: relative", "sur le **parent** : il ne bouge pas, mais il devient le repère de ses enfants positionnés"], ["position: absolute", "sur l’**enfant** : il sort du flux, les autres éléments font comme s’il n’était plus là"], ["top: 12px", "12 pixels sous le bord du haut du repère"], ["right: 12px", "12 pixels avant le bord droit du repère"]],
      example: { code: `.boite {\n  position: relative;\n  height: 80px;\n  background-color: honeydew;\n}\n\n.pastille {\n  position: absolute;\n  bottom: 8px;\n  left: 8px;\n  padding: 2px 8px;\n  background-color: firebrick;\n  color: white;\n}`, html: `<div class="boite"><span class="pastille">En bas à gauche</span></div>` },
      trap: "Oublier `position: relative` sur le parent : le badge se place alors par rapport à **toute la page** et s’envole dans le coin de l’écran. Si ton élément part au mauvais endroit, vérifie d’abord le parent.",
      good: "Garde `position: absolute` pour les petits détails posés par-dessus (badges, pastilles, icônes). Pour placer les grandes parties d’une page côte à côte, on utilise **Flexbox** et **Grid** : ce sont les prochains jeux."
    },
    showHTML: true,
    base: `body { background-color: #EAF3EF; }\n.fiche { max-width: 360px; background-color: white; padding: 24px; border-radius: 16px; }\n.fiche h2 { margin: 0 0 8px; color: seagreen; }\n.fiche p { margin: 0; line-height: 1.6; }\n.badge { background-color: #C2185B; color: white; font-size: 0.8rem; font-weight: 700; padding: 4px 10px; border-radius: 999px; }`,
    html: `<div class="fiche">
  <span class="badge">Nouveau</span>
  <h2>Le camouflage pour les nuls</h2>
  <p>Le livre de Kami : 100 astuces pour disparaître dans le décor. Préface de Bip le robot.</p>
</div>`,
    steps: ["Donne à la `.fiche` (le parent) `position: relative` : elle devient le repère.", "Donne au `.badge` (l’enfant) `position: absolute`.", "Place-le à `12px` du haut (`top`) et à `12px` de la droite (`right`) de la fiche."],
    starter: `/* Le parent : le repère */\n.fiche {\n  \n}\n\n/* L’enfant : le badge */\n.badge {\n  \n}\n`,
    goals: [
      { label: "La `.fiche` est le repère (`position: relative`)", test: c => cs(c, ".fiche", "position") === "relative" },
      { label: "Le `.badge` est en `position: absolute`", test: c => cs(c, ".badge", "position") === "absolute" },
      { label: "Le badge est à `12px` du haut et de la droite de la fiche", test: c => { const f = q(c, ".fiche"), b = q(c, ".badge"); if (!f || !b) return false; const F = f.getBoundingClientRect(), B = b.getBoundingClientRect(); return (Math.abs(B.top - F.top - 12) < 1.5 && Math.abs(F.right - B.right - 12) < 1.5) || (cs(c, ".badge", "position") === "absolute" && cs(c, ".fiche", "position") === "static" ? "Le badge se place par rapport à la page : ajoute position: relative à .fiche." : (cs(c, ".badge", "position") === "absolute" ? "Vérifie top: 12px; et right: 12px; dans .badge." : false)); } },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Dans `.fiche` : `position: relative;`", "Dans `.badge` : `position: absolute;`", "Toujours dans `.badge` : `top: 12px;` et `right: 12px;`"],
    solution: `/* Le parent : le repère */\n.fiche {\n  position: relative;\n}\n\n/* L’enfant : le badge */\n.badge {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n}\n`,
    debrief: "Le badge est sorti du flux : le titre est remonté à sa place, et le badge flotte dans le coin. Essaie d’enlever `position: relative` de la fiche : le badge s’envole tout en haut de la page. Ce duo parent `relative` / enfant `absolute`, tu le retrouveras sur toutes les boutiques en ligne."
  },
  {
    id: "responsive", ch: 6, title: "Kami sur téléphone", notion: "le responsive : @media",
    devices: true,
    say: "Bip a ouvert mon site sur son téléphone : le titre est énorme, les marges mangent toute la place, et la publicité prend tout l’écran ! Il faut une version pour les petits écrans.",
    lesson: {
      what: ["Un site **responsive** s’adapte à la taille de l’écran. Son outil principal est la **media query** : un bloc `@media (condition) { … }` qui contient des règles appliquées **seulement** si la condition est vraie.", "`@media (max-width: 600px)` veut dire « si la fenêtre fait 600 pixels de large **ou moins** ». Cette largeur où la mise en page change s’appelle un **point de rupture**. Les règles à l’intérieur s’ajoutent aux autres et, comme elles sont écrites plus bas, elles gagnent la cascade à spécificité égale."],
      why: "Plus de la moitié des visites sur le web se font sur téléphone. Un site qui ne s’adapte pas oblige à zoomer et à glisser dans tous les sens : les visiteurs partent. Les moteurs de recherche classent même moins bien les sites qui ne sont pas adaptés aux mobiles.",
      code: `h1 {\n  font-size: 3rem;\n}\n\n/* Sur téléphone : 600px de large ou moins */\n@media (max-width: 600px) {\n  h1 {\n    font-size: 2rem;\n  }\n}`,
      pieces: [["@media", "« si l’écran… » : le début d’une media query"], ["(max-width: 600px)", "la condition : une largeur de 600 pixels **au maximum**. `min-width` veut dire « au minimum »"], ["{ … }", "les accolades de la media query entourent des règles complètes, qui ont leurs propres accolades"], ["600px", "le point de rupture : la largeur où la mise en page change"], ["à la fin", "écris tes media queries à la fin du fichier, pour qu’elles gagnent la cascade"]],
      trap: "Oublier une accolade : une media query contient des règles, il y a donc **deux niveaux** d’accolades. Indente bien l’intérieur pour les voir. Et une media query écrite **avant** la règle normale perd : à force égale, c’est la dernière qui gagne.",
      good: ["Pense **mobile d’abord** : vérifie ta page sur petit écran dès le début, pas à la fin. Beaucoup de pros écrivent même le CSS du téléphone en premier, puis ajoutent `@media (min-width: 601px)` pour les grands écrans.", "Ta page HTML doit contenir `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` dans le `<head>` : sans elle, le téléphone affiche une version d’ordinateur rétrécie, et tes media queries ne servent à rien."]
    },
    showHTML: true,
    base: `body { margin: 0; background-color: #EAF3EF; }\n.entete { background-color: darkgreen; color: white; text-align: center; padding: 24px 16px; }\n.entete h1 { margin: 0; font-family: Georgia, serif; line-height: 1.1; }\n.slogan { margin: 8px 0 0; }\n.contenu { background-color: white; }\n.contenu p { margin-top: 0; line-height: 1.6; }\n.pub { padding: 40px 16px; background-color: #FFD43B; text-align: center; font-weight: 700; border-radius: 12px; }`,
    html: `<header class="entete">
  <h1>Chez Kami</h1>
  <p class="slogan">Le caméléon qui a retrouvé ses couleurs</p>
</header>
<main class="contenu">
  <p>Bienvenue sur mon site ! Ici, je raconte mes aventures dans la forêt avec Bip le robot et les lucioles de l’étang.</p>
  <aside class="pub">Publicité : peinture Arc-en-ciel, deux pots achetés, un offert !</aside>
</main>`,
    steps: ["Au-dessus de l’aperçu, clique sur **Téléphone** pour voir le problème, puis reviens sur **Ordinateur**.", "À la fin du code, écris une media query `@media (max-width: 600px) { }`.", "Dedans, écris trois règles : le `h1` passe à `2rem`, la `.contenu` a un `padding` de `16px`, et la `.pub` est cachée (`display: none`).", "Vérifie en mode **Téléphone**, puis en mode **Ordinateur** : sur ordinateur, rien ne doit changer."],
    starter: `/* Pour tous les écrans */\nh1 {\n  font-size: 3rem;\n}\n\n.contenu {\n  padding: 48px;\n}\n\n/* Sur téléphone : 600px de large ou moins */\n\n`,
    goals: [
      { label: "Une media query `@media (max-width: 600px)` existe", test: c => (c.rules || []).some(r => r.media && /max-width\s*:\s*600px/i.test(r.media)) || ((c.rules || []).some(r => r.media) ? "Ta media query doit avoir la condition (max-width: 600px)." : (/@media/.test(c.clean) ? "Ta media query est vide : écris des règles complètes entre ses accolades." : false)) },
      { label: "Sur téléphone, le `h1` passe à `2rem`", test: c => norm(kMQ(c, ["h1", ".entete h1"], "font-size")) === "2rem" },
      { label: "Sur téléphone, la `.contenu` a un `padding` de `16px`", test: c => norm(kMQ(c, [".contenu"], "padding")) === "16px" },
      { label: "Sur téléphone, la `.pub` est cachée", test: c => norm(kMQ(c, [".pub", ".contenu .pub"], "display")) === "none" },
      { label: "Sur ordinateur, rien ne change", test: c => (px(cs(c, "h1", "font-size")) === 48 && px(cs(c, ".contenu", "padding-left")) === 48 && cs(c, ".pub", "display") !== "none") || "Sur ordinateur aussi, la page a changé : les nouvelles règles doivent être À L’INTÉRIEUR des accolades de la media query." },
      { label: "La media query est écrite après les règles normales", test: c => { const a = kIndex(c, ["h1", ".entete h1"], true), b = kIndex(c, ["h1"], false); return a < 0 || b < 0 || a > b || "Ta media query est écrite avant la règle h1 normale : sur téléphone, c’est la règle normale qui gagne. Déplace la media query à la fin."; } },
      { label: "Chaque accolade est fermée, celles des règles et celle de la media query", test: c => (c.clean.match(/{/g) || []).length === (c.clean.match(/}/g) || []).length || "Compte tes accolades : il faut autant de { que de }. La media query se ferme tout à la fin, après la dernière règle." },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Sous le dernier commentaire : `@media (max-width: 600px) {` puis, plus bas, l’accolade fermante `}`.", "Entre ces accolades, des règles complètes, décalées de 2 espaces : `h1 { font-size: 2rem; }` et `.contenu { padding: 16px; }`.", "Et la troisième : `.pub { display: none; }`. Attention à bien fermer chaque règle, puis la media query."],
    solution: `/* Pour tous les écrans */\nh1 {\n  font-size: 3rem;\n}\n\n.contenu {\n  padding: 48px;\n}\n\n/* Sur téléphone : 600px de large ou moins */\n@media (max-width: 600px) {\n  h1 {\n    font-size: 2rem;\n  }\n\n  .contenu {\n    padding: 16px;\n  }\n\n  .pub {\n    display: none;\n  }\n}\n`,
    debrief: "Une même page, deux mises en page : c’est ça, le **responsive**. Les règles de la media query ne s’appliquent que sous 600px, et elles gagnent parce qu’elles sont écrites à la fin. Sur un vrai site, on a souvent deux ou trois points de rupture (téléphone, tablette, ordinateur). Dans les jeux Flexbox et Grid, tu utiliseras les media queries pour passer d’une colonne à plusieurs."
  },
  {
    id: "finale", ch: 6, boss: true, title: "La carte de profil de Kami", notion: "mission finale",
    say: "Dernière mission ! Il me manque mes taches. Fais-moi la plus belle carte de profil de la forêt, avec tout ce que tu as appris. Le modèle est à côté !",
    lesson: {
      what: "Cette mission réunit tout le jeu : variables, couleurs, polices, modèle de boîte, centrage, coins arrondis, ombre, survol, focus et transition. Avance zone par zone, en suivant les commentaires du code de départ, et vérifie souvent : les **Objectifs** te disent ce qui manque.",
      why: "C’est exactement le travail d’un intégrateur web : partir d’une page HTML brute et d’un modèle, puis écrire le CSS jusqu’à ce que les deux se ressemblent. Une carte de profil comme celle-ci existe sur tous les réseaux sociaux.",
      code: `:root {\n  --principale: darkgreen;\n  --accent: sienna;\n}\n\n.profil {\n  max-width: 340px;\n  box-sizing: border-box;\n  margin: 0 auto;\n  padding: 24px;\n  background-color: white;\n  border-radius: 20px;\n  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);\n  text-align: center;\n}`,
      pieces: [["Le modèle", "clique sur « Le modèle à reproduire » au-dessus de l’aperçu pour le comparer avec ton résultat"], ["Le HTML", "ouvre le volet du HTML pour voir les classes : `.profil`, `.avatar`, `.role`, `.bio`, `.infos`, `.bouton`"], [":root", "commence par tes variables de couleur : tu les réutiliseras dans le titre, le bouton, le survol et le focus"], ["margin: 0 auto", "avec `max-width`, la carte se centre dans la page"]],
      trap: "Tout écrire d’un coup, puis chercher les erreurs. Écris une règle, regarde l’aperçu, vérifie. C’est plus rapide.",
      good: "Travaille comme un pro : une zone à la fois, une règle à la fois, et vérifie l’aperçu après chaque changement. Range ton CSS dans l’ordre de la page, avec un commentaire par zone : dans six mois, tu t’y retrouveras du premier coup."
    },
    showHTML: true,
    base: `.bouton { font: inherit; border: 0; }\n.infos { text-align: left; }`,
    html: `<div class="profil">
  <div class="avatar">K</div>
  <h1>Kami</h1>
  <p class="role">Caméléon · as du cache-cache</p>
  <p class="bio">Je vis dans la forêt, je mange des grillons, et j’ai retrouvé toutes mes couleurs grâce à toi !</p>
  <ul class="infos">
    <li><strong>Couleur préférée :</strong> vert feuille</li>
    <li><strong>Amis :</strong> Bip et les lucioles</li>
  </ul>
  <button class="bouton">Devenir ami avec Kami</button>
</div>`,
    steps: [
      "Les couleurs : dans `:root`, déclare au moins deux variables (par exemple `--principale: darkgreen;` et `--accent: sienna;`), et utilise-les avec `var()`. Le fond de la page (`body`) : une couleur douce, par exemple `#EAF3EF`.",
      "La carte `.profil` : `max-width: 340px` avec `box-sizing: border-box`, centrée avec `margin: 0 auto`, un `padding`, un fond blanc, des coins arrondis, une ombre, et le texte centré.",
      "L’`.avatar` : un rond coloré de `90px` sur `90px`, centré avec `margin: 0 auto`.",
      "Les textes : le `h1` en `Georgia, serif`, le `.role` en majuscules, la `.bio` avec un interligne de `1.6`.",
      "Le `.bouton` : un fond coloré, la petite main, une transition, une autre couleur au survol, et un contour bien visible au focus."
    ],
    starter: `/* La carte de profil de Kami */\n\n/* 1. Les couleurs (variables) et le fond de la page */\n:root {\n  \n}\n\n\n/* 2. La carte .profil */\n\n\n/* 3. L’avatar rond */\n\n\n/* 4. Les textes : h1, .role, .bio */\n\n\n/* 5. Le bouton : survol et focus */\n\n`,
    goals: [
      { label: "Des variables déclarées dans `:root` et utilisées avec `var()`", test: c => { const dec = kRules(c, s => s === ":root").some(r => r.decls.some(d => d.prop.startsWith("--"))); const uses = (c.clean.match(/var\(\s*--[\w-]+\s*\)/g) || []).length; return (dec && uses >= 2) || (dec ? "Tes variables sont déclarées : utilise-les au moins deux fois avec var(--nom)." : false); } },
      { label: "La page a une couleur de fond", test: c => isColorSet(c, "body", "background-color", "white") },
      { label: "`.profil` : fond blanc, coins arrondis et ombre", test: c => { const ok = [sameColor(cs(c, ".profil", "background-color"), "white"), px(cs(c, ".profil", "border-top-left-radius")) >= 8, cs(c, ".profil", "box-shadow") !== "none"]; return ok.every(Boolean) || (ok.some(Boolean) ? `Il manque : ${["le fond blanc", "les coins arrondis (border-radius)", "l’ombre (box-shadow)"].filter((t, k) => !ok[k]).join(", ")}.` : false); } },
      { label: "`.profil` : `340px` au total, centrée, avec un `padding` et le texte centré", test: c => { const w = kWidth(c, ".profil"); const ml = px(cs(c, ".profil", "margin-left")), mr = px(cs(c, ".profil", "margin-right")); const ok = w === 340 && ml > 0 && Math.abs(ml - mr) < 1 && px(cs(c, ".profil", "padding-left")) >= 12 && cs(c, ".profil", "text-align") === "center"; return ok || (decl(c, ".profil", "width") || decl(c, ".profil", "max-width") ? `La carte fait ${w}px au total : pense à box-sizing: border-box, à margin: 0 auto, à un padding d’au moins 12px et à text-align: center.` : false); } },
      { label: "`.avatar` : un rond coloré de `90px`", test: c => { const a = q(c, ".avatar"); if (!a) return false; const r = a.getBoundingClientRect(); const round = cs(c, ".avatar", "border-top-left-radius") === "50%" || px(cs(c, ".avatar", "border-top-left-radius")) >= 45; return (Math.round(r.width) === 90 && Math.round(r.height) === 90 && round && isColorSet(c, ".avatar", "background-color")) || (decl(c, ".avatar", "width") ? "Il faut width et height de 90px, un border-radius de 50% et un background-color." : false); } },
      { label: "Textes : `h1` en `Georgia`, `.role` en majuscules, `.bio` interligne `1.6`", test: c => { const b = q(c, ".bio"); const ok = [/georgia/i.test(cs(c, "h1", "font-family")), cs(c, ".role", "text-transform") === "uppercase", !!b && Math.abs(px(cs(c, b, "line-height")) / px(cs(c, b, "font-size")) - 1.6) < 0.03]; return ok.every(Boolean) || (ok.some(Boolean) ? `Il manque : ${["la police Georgia du h1", "les majuscules du .role", "l’interligne 1.6 de la .bio"].filter((t, k) => !ok[k]).join(", ")}.` : false); } },
      { label: "`.bouton` : fond coloré, petite main, transition et survol", test: c => { const ok = [isColorSet(c, ".bouton", "background-color", "rgb(239, 239, 239)"), cs(c, ".bouton", "cursor") === "pointer", cs(c, ".bouton", "transition-duration") !== "0s", !!kHover(c, ".bouton", "background-color")]; return ok.every(Boolean) || (ok.some(Boolean) ? `Il manque : ${["un background-color", "cursor: pointer", "une transition", "une règle .bouton:hover qui change le fond"].filter((t, k) => !ok[k]).join(", ")}.` : false); } },
      { label: "`.bouton:focus` : un contour bien visible", test: c => kVisible(kState(c, ".bouton", ":focus", "outline")) || (kState(c, ".bouton", ":focus", "outline") ? "Le contour doit être visible : par exemple outline: 3px solid var(--accent);" : false) },
      { label: "Le CSS est propre : aucune erreur", test: noErrors }
    ],
    hints: ["Les variables : `:root { --principale: darkgreen; --accent: sienna; }`. La carte : `.profil { max-width: 340px; box-sizing: border-box; margin: 0 auto; padding: 24px; background-color: white; }`, puis ajoute `border-radius`, `box-shadow` et `text-align: center`.", "L’avatar : `.avatar { width: 90px; height: 90px; margin: 0 auto; border-radius: 50%; background-color: var(--principale); }`. Pour centrer le K verticalement : `line-height: 90px;`.", "Le bouton : `.bouton { background-color: var(--principale); color: white; cursor: pointer; transition: background-color 0.3s; }`, puis `.bouton:hover { background-color: var(--accent); }` et `.bouton:focus { outline: 3px solid var(--accent); }`."],
    solution: `/* La carte de profil de Kami */\n\n/* 1. Les couleurs (variables) et le fond de la page */\n:root {\n  --principale: darkgreen;\n  --accent: sienna;\n  --fond: #EAF3EF;\n}\n\nbody {\n  background-color: var(--fond);\n}\n\n/* 2. La carte .profil */\n.profil {\n  max-width: 340px;\n  box-sizing: border-box;\n  margin: 0 auto;\n  padding: 24px;\n  background-color: white;\n  border-radius: 20px;\n  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);\n  text-align: center;\n}\n\n/* 3. L’avatar rond */\n.avatar {\n  width: 90px;\n  height: 90px;\n  margin: 0 auto;\n  border-radius: 50%;\n  background-color: var(--principale);\n  color: white;\n  font-size: 2.5rem;\n  font-weight: bold;\n  line-height: 90px;\n}\n\n/* 4. Les textes : h1, .role, .bio */\nh1 {\n  margin: 12px 0 0;\n  font-family: Georgia, serif;\n  color: var(--principale);\n}\n\n.role {\n  margin-top: 4px;\n  color: var(--accent);\n  font-size: 0.8rem;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n}\n\n.bio {\n  line-height: 1.6;\n}\n\n.infos {\n  padding: 12px 12px 12px 32px;\n  border-radius: 12px;\n  background-color: #E1F7EC;\n}\n\n/* 5. Le bouton : survol et focus */\n.bouton {\n  padding: 12px 20px;\n  border-radius: 999px;\n  background-color: var(--principale);\n  color: white;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.bouton:hover {\n  background-color: var(--accent);\n}\n\n.bouton:focus {\n  outline: 3px solid var(--accent);\n  outline-offset: 3px;\n}\n`,
    debrief: "Bravo : tu as habillé une page entière, des variables de couleur jusqu’au contour de focus du bouton. Le HTML dit **ce qu’il y a**, le CSS dit **à quoi ça ressemble** : tu maîtrises maintenant les deux, avec le bon vocabulaire et les bons réflexes. Avant de partir, passe par le **Lexique** et sa liste « Prêt pour la suite ? ». Il reste une grande question : comment **placer** les éléments côte à côte ? C’est le rôle de Flexbox, et Kami t’attend à l’étang avec les lucioles !"
  }
  ]
};
