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
  confetti: ["#3DCB8B", "#FF9F43", "#FFD43B", "#1FB5A8", "#E8337A"],
  links: { html: "https://diurndesign.github.io/Html_game/", css: null, js: "https://diurndesign.github.io/javascript_game/" },
  next: {
    name: "Kami et les lucioles (Flexbox)",
    url: "https://diurndesign.github.io/Flexbox-game/",
    title: "La suite : aligner les éléments avec Flexbox",
    text: "Tu sais colorer, dimensionner et espacer. Il reste à **placer** les éléments côte à côte : c’est le rôle de **Flexbox**. Kami t’attend au bord de l’étang, avec ses amies les lucioles."
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
      { title: "C’est quoi ?", text: ["CSS veut dire *Cascading Style Sheets*, en français « feuilles de style en cascade ». C’est le langage qui décrit **l’apparence** d’une page web : les couleurs, les polices d’écriture, les tailles, les espaces, les bordures…", "Le HTML dit **ce qu’il y a** dans la page (un titre, un paragraphe, un bouton). Le CSS dit **à quoi ça ressemble**. C’est un langage simple : des listes de consignes du genre « les titres sont verts »."] },
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
  color: darkorange;
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
  color: darkorange;
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
        ["{ … }", "les **accolades** : elles ouvrent et ferment la liste des consignes"],
        ["color", "la **propriété** : *ce qu’on change* (ici, la couleur du texte). Toujours en anglais"],
        [":", "les deux-points séparent la propriété de sa valeur"],
        ["seagreen", "la **valeur** : *comment* on le change (ici, vert d’eau)"],
        [";", "le point-virgule termine la consigne. Ne l’oublie jamais !"]
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
      ["**Règle**", "un sélecteur suivi de consignes entre accolades : `h1 { color: red; }`."],
      ["**Sélecteur**", "le début de la règle : il dit à quels éléments elle s’applique (`h1`, `.carte`, `#titre`)."],
      ["**Propriété**", "ce qu’on veut changer : `color`, `font-size`, `margin`… Toujours en anglais."],
      ["**Valeur**", "le réglage choisi pour la propriété : `red`, `20px`, `bold`…"],
      ["**Classe**", "une étiquette posée dans le HTML (`class=\"carte\"`) pour viser des éléments précis. En CSS, elle commence par un point : `.carte`."],
      ["**Pixel (px)**", "la petite unité de mesure de l’écran. `16px` est la taille normale d’un texte."]
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
    ctaTitle: "Prêt à rendre ses couleurs à Kami ?",
    ctaText: "16 missions t’attendent. Chaque atelier terminé rend la couleur d’une partie de Kami : la tête, le corps, la crête, les pattes, la queue et les taches."
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
     ATELIERS
     ------------------------------------------------------------------ */
  chapters: [
    { n: 1, title: "Le pinceau", piece: "La tête", notions: ["règle", "sélecteur", "classe", "id"] },
    { n: 2, title: "Les couleurs", piece: "Le corps", notions: ["color", "background-color", "#hexa", "rgb()"] },
    { n: 3, title: "Les lettres", piece: "La crête", notions: ["font-family", "font-size", "font-weight", "text-align"] },
    { n: 4, title: "Les boîtes", piece: "Les pattes", notions: ["padding", "border", "margin", "border-radius"] },
    { n: 5, title: "Les états", piece: "La queue", notions: [":hover", "cursor", "transition"] },
    { n: 6, title: "La carte de Kami", piece: "Les taches", notions: ["sélecteurs combinés", "box-shadow"] }
  ],

  levels: [
  /* ------------------------------ ATELIER 1 ------------------------------ */
  {
    id: "regle", ch: 1, title: "Le premier coup de pinceau", notion: "une règle CSS",
    say: "Salut, moi c’est Kami ! Ce matin, je me suis réveillé tout gris… et ma page aussi. Tu veux bien m’aider à retrouver mes couleurs ? On commence par le titre.",
    lesson: {
      what: ["Le CSS est une liste de **règles**. Une règle dit : « tels éléments de la page doivent ressembler à ça ».", "Elle commence par un **sélecteur** (qui on vise), puis, entre accolades `{ }`, des consignes de la forme `propriété: valeur;`. Le sélecteur le plus simple est le **nom d’une balise** : `h1` vise tous les titres `<h1>`, `p` tous les paragraphes."],
      why: "Avec une seule règle, tu changes **tous** les éléments du même type d’un coup. Si ta page a 20 paragraphes, une règle `p` les colore tous : pas besoin de le faire 20 fois.",
      code: `h1 {\n  color: seagreen;\n}\n\np {\n  color: teal;\n}`,
      pieces: [["h1", "le sélecteur : tous les titres `<h1>` de la page"], ["{ }", "les accolades entourent les consignes de la règle"], ["color", "la propriété : la couleur du **texte**"], ["seagreen", "la valeur : un nom de couleur, en anglais (*vert d’eau*)"], [";", "le point-virgule termine chaque consigne"]],
      example: { code: `h1 {\n  color: tomato;\n}`, html: `<h1>Un titre tomate</h1>\n<p>Le paragraphe, lui, ne change pas.</p>` },
      trap: "Écrire les couleurs en français : `color: vert;` ne fonctionne pas. Le CSS ne parle qu’anglais : `green`, `red`, `blue`… Il existe 140 noms de couleurs, comme `seagreen`, `tomato` ou `gold`."
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
    hints: ["Une règle s’écrit : le sélecteur, une accolade ouvrante, la consigne, une accolade fermante.", "Pour le titre : `h1 { color: seagreen; }`", "Ajoute en dessous : `p {` puis `color: teal;` puis `}`."],
    solution: `/* Écris ton CSS sous cette ligne */\nh1 {\n  color: seagreen;\n}\n\np {\n  color: teal;\n}`,
    debrief: "**Sélecteur**, **propriété**, **valeur** : c’est la forme de tout le CSS, et tu viens de l’écrire deux fois. Remarque que tu n’as pas touché au HTML : le CSS s’applique *par-dessus*. Dans un vrai site, ces règles iraient dans un fichier `style.css`, utilisé par toutes les pages."
  },
  {
    id: "classes", ch: 1, title: "Viser juste", notion: "classes . et id #",
    say: "Dans mon carnet, deux phrases sont très importantes. Je veux qu’elles soient en rouge, mais pas les autres ! Comment viser seulement elles ?",
    lesson: {
      what: ["Le sélecteur `p` vise **tous** les paragraphes. Pour en viser seulement certains, le HTML leur donne une **classe** : une étiquette, comme `class=\"important\"`.", "En CSS, une classe s’écrit avec un **point** devant : `.important`. Il existe aussi l’**id** (`id=\"titre\"`), une étiquette **unique** dans la page, qui s’écrit avec un **dièse** : `#titre`."],
      why: "Les classes sont l’outil le plus utilisé du CSS. On peut poser la même classe sur plusieurs éléments, même de balises différentes : tous ceux qui ont l’étiquette reçoivent le même style.",
      code: `.important {\n  color: crimson;\n}\n\n#titre {\n  color: darkcyan;\n}`,
      pieces: [[".important", "le point = « tous les éléments qui ont la classe `important` »"], ["#titre", "le dièse = « l’élément dont l’id est `titre` » (un seul dans la page)"], ["class=\"…\"", "dans le HTML, sans le point"], ["id=\"…\"", "dans le HTML, sans le dièse"]],
      example: { code: `.bonus {\n  color: darkorange;\n}`, html: `<p>Un paragraphe normal.</p>\n<p class="bonus">Un paragraphe avec la classe bonus.</p>\n<p>Encore un normal.</p>` },
      trap: "Oublier le point : `important { … }` cherche une balise `<important>`, qui n’existe pas. Le point (ou le dièse) est obligatoire dans le CSS, mais on ne l’écrit **pas** dans le HTML."
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
      what: ["La **syntaxe**, c’est l’orthographe du code. En CSS, elle tient en trois signes : les **accolades** `{ }` autour des consignes, les **deux-points** `:` entre la propriété et la valeur, et le **point-virgule** `;` à la fin de chaque consigne.", "Une seule faute, et le navigateur ignore la consigne, parfois toute la règle. Il ne te prévient pas : il saute ce qu’il ne comprend pas."],
      why: "Savoir repérer une faute de syntaxe, c’est 80 % du travail quand « ça ne marche pas ». Dans ce jeu, l’onglet **Remarques** t’indique la ligne de chaque faute, comme le ferait un éditeur de code.",
      code: `sélecteur {\n  propriété: valeur;\n  propriété: valeur;\n}`,
      pieces: [["{", "ouvre la liste des consignes, juste après le sélecteur"], [":", "sépare la propriété et la valeur"], [";", "termine **chaque** consigne, même la dernière (c’est plus sûr)"], ["}", "ferme la règle"]],
      trap: "Oublier un `;` casse aussi la ligne **suivante** : le navigateur lit les deux lignes comme une seule consigne, qui n’a plus de sens."
    },
    html: `<h1>Le goûter de Kami</h1>
<p class="intro">Ce soir, menu spécial insectes !</p>
<ul>
  <li>Trois grillons croustillants</li>
  <li>Une mouche à la vanille</li>
  <li>Un ver de farine (pour le dessert)</li>
</ul>`,
    steps: ["Ouvre l’onglet **Remarques** sous l’éditeur : il signale les fautes et leur ligne.", "Corrige les trois fautes : il manque un `;`, un `:` et une accolade `}`.", "Quand tout est réparé, le titre est orange sur fond jaune et l’intro est verte. La liste est déjà violette : le navigateur a deviné l’accolade qui manque… mais le vérificateur, lui, la voit !"],
    starter: `h1 {\n  color: darkorange\n  background-color: lightyellow;\n}\n\n.intro {\n  color seagreen;\n  font-style: italic;\n}\n\nli {\n  color: slateblue;\n`,
    goals: [
      { label: "Le titre est `darkorange` sur fond `lightyellow`", test: c => sameColor(cs(c, "h1", "color"), "darkorange") && sameColor(cs(c, "h1", "background-color"), "lightyellow") },
      { label: "L’intro est `seagreen` et en italique", test: c => sameColor(cs(c, ".intro", "color"), "seagreen") && cs(c, ".intro", "font-style") === "italic" },
      { label: "Chaque règle est fermée par une accolade `}`", test: c => (c.clean.match(/{/g) || []).length === (c.clean.match(/}/g) || []).length || "Compte tes accolades : il faut autant de { que de }." },
      { label: "Les éléments de la liste sont `slateblue`", test: c => kAll(c, "li", "color", "slateblue") },
      { label: "Plus aucune faute dans les remarques", test: noErrors }
    ],
    hints: ["Ligne 2 : la consigne ne se termine pas. Il manque le `;` après `darkorange`.", "Ligne 7 : entre `color` et `seagreen`, il manque les deux-points.", "Tout à la fin : la règle `li` n’est jamais fermée. Ajoute l’accolade fermante `}` sur la dernière ligne."],
    solution: `h1 {\n  color: darkorange;\n  background-color: lightyellow;\n}\n\n.intro {\n  color: seagreen;\n  font-style: italic;\n}\n\nli {\n  color: slateblue;\n}\n`,
    debrief: "Trois petits signes, trois grosses pannes. Remarque que la faute de la ligne 2 cassait **aussi** la ligne 3 : c’est le piège classique du point-virgule. Et l’accolade oubliée à la fin ne se voyait pas : le navigateur l’avait devinée. Mais si tu avais ajouté une règle après, elle aurait été cassée. Bon réflexe pour la suite : quand quelque chose ne marche pas, vérifie d’abord `{ } : ;` avant de chercher plus loin."
  },
  {
    id: "quiz1", ch: 1, quiz: true, title: "Contrôle du pinceau", notion: "quiz",
    say: "Avant de rendre la couleur à ma tête, un petit contrôle. Tout juste, et je retrouve mon vert !",
    questions: [
      { q: "À quoi sert le CSS ?", opts: ["À écrire le contenu de la page", "À décrire l’apparence de la page", "À faire des calculs"], a: 1, why: "Le HTML écrit le contenu, le CSS décide de l’apparence (couleurs, polices, tailles…), le JavaScript fait réagir la page." },
      { q: "Pour relier le fichier `style.css` à ta page HTML, tu écris dans le `<head>` :", opts: ["`<link rel=\"stylesheet\" href=\"style.css\">`", "`<style src=\"style.css\">`", "`<css>style.css</css>`"], a: 0, why: "La balise `<link>` relie un fichier externe. `rel=\"stylesheet\"` dit que c’est une feuille de style, `href` donne le chemin du fichier." },
      { q: "Quel sélecteur vise `<p class=\"note\">` ?", opts: ["`note`", "`#note`", "`.note`"], a: 2, why: "Une classe se vise avec un point. Le dièse est pour les id, et `note` sans rien chercherait une balise `<note>`." },
      { q: "Dans ce code, que manque-t-il ?", code: `h1 {\n  color: seagreen\n  font-size: 40px;\n}`, opts: ["Une accolade", "Un point-virgule", "Rien, il est correct"], a: 1, why: "Il manque le `;` après `seagreen`. Résultat : ni la couleur ni la taille ne s’appliquent." }
    ],
    debrief: "Tu connais la forme d’une règle, les sélecteurs de balise, de classe et d’id, et tu sais réparer une règle cassée. La tête de Kami retrouve ses couleurs !"
  },

  /* ------------------------------ ATELIER 2 ------------------------------ */
  {
    id: "couleurs", ch: 2, title: "Le panneau de la forêt", notion: "color et background-color",
    say: "Ma tête est verte, merci ! Maintenant, je dois repeindre le panneau à l’entrée de ma forêt. Il faut qu’on le voie de loin !",
    lesson: {
      what: ["Deux propriétés pour colorer : `color` change la couleur du **texte**, `background-color` change la couleur du **fond** (l’arrière-plan) d’un élément.", "Tu peux viser `body` (le corps de la page, qui contient tout) pour changer le fond de toute la page."],
      why: "Les couleurs donnent l’identité d’un site : pense au rouge de Netflix ou au vert de Spotify. Elles servent aussi à guider l’œil : un panneau, un bouton, une alerte.",
      code: `body {\n  background-color: honeydew;\n}\n\n.panneau {\n  background-color: seagreen;\n  color: white;\n}`,
      pieces: [["color", "la couleur du texte"], ["background-color", "la couleur du fond de l’élément"], ["body", "la balise qui contient toute la page visible"], ["héritage", "la couleur du texte se transmet aux éléments **à l’intérieur** : le `h2` du panneau devient blanc lui aussi"]],
      example: { code: `.alerte {\n  background-color: gold;\n  color: black;\n}`, html: `<p class="alerte">Attention, peinture fraîche !</p>` },
      trap: "Mettre du texte clair sur un fond clair (jaune sur blanc) : c’est illisible, surtout pour les personnes qui voient mal. Vérifie toujours qu’il y a assez de **contraste** entre le texte et le fond."
    },
    showHTML: true,
    base: `.panneau { padding: 12px 18px; }\n.panneau h2 { margin: 0 0 4px; }\n.panneau p { margin: 0; }`,
    html: `<div class="panneau">
  <h2>Forêt de Kami</h2>
  <p>Attention : caméléons en liberté !</p>
</div>
<p>Merci de ne pas déranger Kami pendant sa sieste.</p>`,
    steps: ["Donne au fond de toute la page (`body`) la couleur `honeydew`.", "Donne au `.panneau` un fond `seagreen`.", "Écris son texte en `white`."],
    starter: `/* Le fond de la page */\n\n\n/* Le panneau */\n`,
    goals: [
      { label: "Le fond de la page est `honeydew`", test: c => sameColor(cs(c, "body", "background-color"), "honeydew") },
      { label: "Le fond du `.panneau` est `seagreen`", test: c => sameColor(cs(c, ".panneau", "background-color"), "seagreen") || (sameColor(cs(c, ".panneau", "color"), "seagreen") ? "Tu as coloré le texte : pour le fond, c’est background-color." : false) },
      { label: "Le texte du panneau (titre compris) est `white`", test: c => (sameColor(cs(c, ".panneau h2", "color"), "white") && sameColor(cs(c, ".panneau p", "color"), "white")) },
      { label: "Le paragraphe sous le panneau garde sa couleur normale", test: c => !sameColor(cs(c, "body > p", "color"), "white") || "Le dernier paragraphe est blanc : il est devenu invisible ! Mets color: white seulement dans .panneau." },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Le fond de la page : `body { background-color: honeydew; }`", "Le panneau : `.panneau {` puis deux consignes, puis `}`.", "`.panneau { background-color: seagreen; color: white; }`"],
    solution: `/* Le fond de la page */\nbody {\n  background-color: honeydew;\n}\n\n/* Le panneau */\n.panneau {\n  background-color: seagreen;\n  color: white;\n}`,
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
      trap: "Oublier le dièse (`3DCB8B`) ou mettre une lettre qui n’existe pas en hexadécimal (`#3DCG8B` : le G n’existe pas). Seuls les chiffres 0-9 et les lettres A-F sont permis."
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
    debrief: "Hexadécimal ou `rgb()`, c’est la même chose écrite autrement : `#FFFFFF` = `rgb(255, 255, 255)` = `white`. Les majuscules ne comptent pas (`#3dcb8b` marche aussi). En entreprise, la charte graphique d’une marque liste ses couleurs en codes : tu les recopieras dans ton CSS. Le corps de Kami reprend des couleurs !"
  },

  /* ------------------------------ ATELIER 3 ------------------------------ */
  {
    id: "police", ch: 3, title: "Le poème de Kami", notion: "font-family, font-size, font-weight",
    say: "J’ai écrit un poème sur ma couleur perdue. Mais avec cette écriture toute simple, il n’a aucune élégance. Tu peux changer les lettres ?",
    lesson: {
      what: ["Trois propriétés pour les lettres : `font-family` choisit la **police** (le dessin des lettres), `font-size` la **taille**, `font-weight` l’**épaisseur** (normal ou gras).", "Pour `font-family`, on donne plusieurs polices séparées par des virgules : si l’ordinateur du visiteur n’a pas la première, il prend la suivante."],
      why: "La police change complètement l’ambiance : une police à empattements (avec des petits pieds, comme `Georgia`) fait classique et littéraire, une police sans empattements (`Arial`) fait moderne. La taille et le gras créent une hiérarchie : on voit tout de suite ce qui est important.",
      code: `body {\n  font-family: Georgia, serif;\n}\n\nh1 {\n  font-size: 40px;\n}\n\n.auteur {\n  font-weight: bold;\n}`,
      pieces: [["font-family", "la police. `Georgia` d’abord, sinon n’importe quelle police `serif`"], ["serif", "une famille de secours : « une police à empattements ». `sans-serif` = sans empattements"], ["font-size: 40px", "la taille des lettres, en pixels. Le texte normal fait `16px`"], ["font-weight: bold", "en gras. `normal` pour revenir à l’épaisseur normale"]],
      example: { code: `p {\n  font-family: "Courier New", monospace;\n  font-size: 20px;\n}`, html: `<p>Une police de machine à écrire.</p>` },
      trap: "Oublier l’unité : `font-size: 40;` ne marche pas. Il faut `40px`, collé, sans espace. Et un nom de police avec des espaces s’écrit entre guillemets : `\"Courier New\"`."
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
      trap: "Taper le texte en majuscules dans le HTML. Si un jour tu veux changer de style, il faudra tout retaper. Avec `text-transform`, le texte reste normal et c’est le CSS qui décide."
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
    debrief: "Compare avec le début : le texte respire, le titre est posé au centre, la rubrique a l’air d’un vrai journal. Ce sont ces petits réglages, invisibles quand ils sont bien faits, qui rendent un site agréable à lire. On appelle ça la **typographie**. La crête de Kami se colore !"
  },

  /* ------------------------------ ATELIER 4 ------------------------------ */
  {
    id: "boite", ch: 4, title: "La boîte à souvenirs", notion: "padding, border, margin",
    say: "Je range mes souvenirs dans des boîtes. Mais là, tout est collé, sans bord… On dirait un tas de feuilles. Tu m’aides à faire de vraies boîtes ?",
    lesson: {
      what: ["En CSS, **chaque élément est une boîte**. Autour du contenu, il y a trois couches, de l’intérieur vers l’extérieur :", "le `padding` (l’espace **intérieur**, entre le contenu et le bord), la `border` (la **bordure**, le trait du bord) et la `margin` (l’espace **extérieur**, qui éloigne la boîte des autres)."],
      why: "Les espaces sont aussi importants que les couleurs : ils regroupent ce qui va ensemble et séparent le reste. Sans `padding`, le texte touche le bord ; sans `margin`, les boîtes se collent les unes aux autres.",
      code: `.souvenir {\n  padding: 20px;\n  border: 3px solid seagreen;\n  margin-bottom: 24px;\n}`,
      pieces: [["padding: 20px", "20 pixels d’espace **à l’intérieur**, sur les 4 côtés. Le fond de la boîte s’étend dessous"], ["border: 3px solid seagreen", "une bordure : son **épaisseur**, son **style** (`solid` = trait plein, `dashed` = tirets, `dotted` = points) et sa **couleur**"], ["margin-bottom: 24px", "24 pixels d’espace **à l’extérieur**, seulement en bas"], ["-top, -right, -bottom, -left", "on peut viser un seul côté : `padding-left`, `margin-top`…"]],
      example: { code: `.boite {\n  padding: 16px;\n  border: 4px dashed tomato;\n  margin: 12px;\n  background-color: mistyrose;\n}`, html: `<div class="boite">Le contenu</div>` },
      trap: "Confondre `padding` et `margin`. Repère simple : le `padding` est **dans** la boîte (il a la couleur du fond), la `margin` est **dehors** (elle est transparente)."
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
    hints: ["Tout se passe dans la règle `.souvenir`, une consigne par ligne.", "`padding: 20px;` puis `border: 3px solid seagreen;`", "Et pour finir : `margin-bottom: 24px;`"],
    solution: `.souvenir {\n  padding: 20px;\n  border: 3px solid seagreen;\n  margin-bottom: 24px;\n}\n`,
    debrief: "Contenu, `padding`, `border`, `margin` : c’est le **modèle de boîte**, la base de toute mise en page en CSS. Fais clic droit puis **Inspecter** sur n’importe quel site : l’outil dessine ces quatre couches pour chaque élément. Les cartes de produits, les encadrés, les boutons… ce sont toutes des boîtes réglées comme ça."
  },
  {
    id: "arrondi", ch: 4, title: "Le badge du club", notion: "border-radius, width, box-sizing",
    say: "Je suis membre n° 7 du club des caméléons ! Mon badge est trop carré et trop large. On l’arrondit et on lui donne la bonne taille ?",
    lesson: {
      what: ["`width` fixe la **largeur** d’une boîte, et `border-radius` arrondit ses **coins**. Avec `border-radius: 50%` sur un carré, on obtient un rond parfait.", "Piège : par défaut, `width` règle seulement le contenu. Le `padding` et la `border` s’**ajoutent** autour ! Avec `box-sizing: border-box`, la largeur choisie devient la largeur **totale**, bordure comprise."],
      why: "Les coins arrondis sont partout : boutons, cartes, photos de profil. Et `box-sizing: border-box` évite des calculs pénibles : tu demandes 260 pixels, tu obtiens 260 pixels. Presque tous les sites l’utilisent.",
      code: `.badge {\n  width: 260px;\n  box-sizing: border-box;\n  border-radius: 20px;\n}\n\n.photo {\n  border-radius: 50%;\n}`,
      pieces: [["width: 260px", "la largeur de la boîte"], ["box-sizing: border-box", "la largeur compte **tout** : contenu, padding et bordure"], ["border-radius: 20px", "des coins arrondis, avec un rayon de 20 pixels"], ["border-radius: 50%", "sur un carré : un cercle. Idéal pour les photos de profil"]],
      example: { code: `.pastille {\n  width: 80px;\n  height: 80px;\n  border-radius: 50%;\n  background-color: gold;\n}`, html: `<div class="pastille"></div>` },
      trap: "Sans `box-sizing: border-box`, une boîte de `width: 260px` avec `20px` de padding et `4px` de bordure fait en réalité 260 + 40 + 8 = **308 pixels**. Tout déborde, et on ne comprend pas pourquoi."
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
    debrief: "Essaie d’enlever `box-sizing: border-box` : le badge grossit de 48 pixels ! C’est pour ça que beaucoup de développeurs écrivent au début de leur CSS `* { box-sizing: border-box; }` (l’étoile `*` vise **tous** les éléments). Et le rond de la photo, tu le retrouveras sur toutes les photos de profil des réseaux sociaux."
  },
  {
    id: "quiz2", ch: 4, quiz: true, title: "Contrôle des boîtes", notion: "quiz",
    say: "Les pattes, c’est pour bientôt ! Un dernier contrôle sur les couleurs, les lettres et les boîtes.",
    questions: [
      { q: "L’espace **entre le contenu et la bordure** d’une boîte, c’est…", opts: ["la `margin`", "le `padding`", "le `border-spacing`"], a: 1, why: "Le `padding` est l’espace intérieur, il a la couleur du fond. La `margin` est l’espace extérieur, transparent." },
      { q: "Sans `box-sizing`, quelle est la largeur totale de cette boîte ?", code: `.boite {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid black;\n}`, opts: ["200px", "240px", "250px"], a: 2, why: "200 de contenu + 2 × 20 de padding + 2 × 5 de bordure = 250px. Avec `box-sizing: border-box`, elle ferait 200px." },
      { q: "Comment transformer une image carrée en rond ?", opts: ["`border-radius: 50%;`", "`border: round;`", "`shape: circle;`"], a: 0, why: "`border-radius: 50%` arrondit chaque coin de la moitié de la taille : un carré devient un cercle." },
      { q: "Pourquoi écrire `font-family: Georgia, serif;` plutôt que `font-family: Georgia;` ?", opts: ["Pour avoir deux polices en même temps", "Pour avoir une police de secours si Georgia n’est pas installée", "Ça ne change rien"], a: 1, why: "Le navigateur prend la première police disponible. `serif` est une famille de secours qui existe partout." }
    ],
    debrief: "Couleurs, lettres, boîtes : tu sais déjà habiller une page entière. Les pattes de Kami retrouvent leurs couleurs !"
  },

  /* ------------------------------ ATELIER 5 ------------------------------ */
  {
    id: "survol", ch: 5, title: "Le bouton qui réagit", notion: ":hover et cursor",
    say: "Sur la page de mon club, les boutons ne réagissent pas quand on passe la souris dessus. Moi, quand on me touche, je change de couleur ! Les boutons devraient faire pareil.",
    lesson: {
      what: ["Une **pseudo-classe** vise un élément dans un certain **état**. La plus connue est `:hover` (« survolé ») : la règle `.bouton:hover` s’applique seulement **quand la souris passe dessus**.", "La propriété `cursor` change la forme du curseur de la souris. `cursor: pointer` affiche la petite main, qui veut dire « tu peux cliquer ici »."],
      why: "Un bouton qui réagit rassure le visiteur : il comprend que c’est cliquable. C’est un petit détail, mais tous les sites professionnels le font.",
      code: `.bouton {\n  background-color: seagreen;\n  cursor: pointer;\n}\n\n.bouton:hover {\n  background-color: darkorange;\n}`,
      pieces: [[".bouton", "le style **normal** du bouton"], [":hover", "collé au sélecteur, sans espace : « quand la souris est dessus »"], ["cursor: pointer", "la petite main au survol"], ["deux règles", "dans `:hover`, on n’écrit que ce qui **change**"]],
      example: { code: `.lien:hover {\n  color: crimson;\n}`, html: `<p class="lien">Passe ta souris sur cette phrase.</p>` },
      trap: "Mettre un espace : `.bouton :hover` ne veut pas dire la même chose et ne marche pas. Écris `.bouton:hover`, tout collé. Et sur téléphone, il n’y a pas de souris : le survol n’existe pas, alors le bouton doit être compréhensible **sans** lui."
    },
    showHTML: true,
    base: `.bouton { font: inherit; font-weight: 700; color: white; background-color: seagreen; border: 0; padding: 12px 20px; margin: 4px 8px 4px 0; border-radius: 999px; }`,
    html: `<h1>Le club des caméléons</h1>
<p>Tu veux rejoindre le club ? Choisis ton bouton :</p>
<button class="bouton">Je m’inscris</button>
<button class="bouton">En savoir plus</button>`,
    steps: ["Ajoute `cursor: pointer` aux `.bouton` : passe ta souris dessus, la petite main apparaît.", "Écris une nouvelle règle `.bouton:hover`.", "Dedans, change le fond en `darkorange`. Survole les boutons dans l’aperçu pour tester !"],
    starter: `.bouton {\n  background-color: seagreen;\n}\n`,
    goals: [
      { label: "La petite main apparaît sur les boutons (`cursor: pointer`)", test: c => cs(c, ".bouton", "cursor") === "pointer" || kHover(c, ".bouton", "cursor") === "pointer" },
      { label: "Une règle `.bouton:hover` existe", test: c => kRules(c, s => s.includes(".bouton:hover")).length > 0 || (kRules(c, s => /\.bouton\s+:hover/.test(s)).length ? "Pas d’espace avant :hover : .bouton:hover, tout collé." : false) },
      { label: "Au survol, le fond devient `darkorange`", test: c => { const v = kHover(c, ".bouton", "background-color"); return (!!v && sameColor(v, "darkorange")) || (v ? "La règle de survol existe, mais le fond doit devenir darkorange." : false); } },
      { label: "Sans survol, le bouton reste `seagreen`", test: c => sameColor(cs(c, ".bouton", "background-color"), "seagreen") || "Le bouton a changé de couleur tout le temps : mets darkorange seulement dans .bouton:hover." },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Dans la règle `.bouton` existante, ajoute la ligne `cursor: pointer;`.", "En dessous, crée une nouvelle règle : `.bouton:hover { }`.", "Dedans : `background-color: darkorange;`"],
    solution: `.bouton {\n  background-color: seagreen;\n  cursor: pointer;\n}\n\n.bouton:hover {\n  background-color: darkorange;\n}\n`,
    debrief: "Avec `:hover`, ta page réagit pour la première fois ! Il existe d’autres états : `:focus` (le champ où l’on tape, ou l’élément atteint avec la touche Tab du clavier), `:active` (pendant le clic). Pense à `:focus` : les personnes qui naviguent au clavier ne survolent jamais rien."
  },
  {
    id: "transition", ch: 5, title: "La cabine d’essayage", notion: "transition",
    say: "Dans ma cabine, j’essaie des couleurs. Mais là, ça change d’un coup, clac ! Moi, quand je change de couleur, c’est tout en douceur…",
    lesson: {
      what: ["Par défaut, un changement de style est **instantané**. La propriété `transition` le rend **progressif** : le navigateur passe doucement de l’ancienne valeur à la nouvelle.", "On lui donne la propriété à animer et la **durée**, en secondes (`s`) : `transition: background-color 0.4s;`."],
      why: "Une transition douce rend l’interface plus agréable et plus naturelle. Les boutons, les menus, les cartes qui se soulèvent : presque tous les effets de survol des sites utilisent `transition`.",
      code: `.bouton {\n  background-color: seagreen;\n  transition: background-color 0.4s;\n}\n\n.bouton:hover {\n  background-color: darkorange;\n}`,
      pieces: [["transition", "« quand cette propriété change, fais-le en douceur »"], ["background-color", "la propriété à animer. `all` pour toutes"], ["0.4s", "la durée : 0,4 seconde. On écrit un **point**, pas une virgule"], ["dans .bouton", "la transition se met sur l’état **normal**, pas dans `:hover`"]],
      example: { code: `.carre {\n  width: 60px;\n  height: 60px;\n  background-color: gold;\n  transition: background-color 1s;\n}\n\n.carre:hover {\n  background-color: crimson;\n}`, html: `<div class="carre"></div>` },
      trap: "Mettre la `transition` dans `.bouton:hover` : l’aller est doux, mais le retour est brutal, car la transition disparaît dès que la souris s’en va. Mets-la dans `.bouton` : elle marche dans les deux sens."
    },
    showHTML: true,
    base: `.bouton { font: inherit; font-weight: 700; color: white; border: 0; padding: 12px 20px; margin: 4px 8px 4px 0; border-radius: 999px; }`,
    html: `<h1>La cabine de Kami</h1>
<p>Passe la souris sur les boutons : Kami essaie une nouvelle couleur.</p>
<button class="bouton">Vert forêt</button>
<button class="bouton">Vert lagon</button>
<button class="bouton">Vert pomme</button>`,
    steps: ["Dans la règle `.bouton`, ajoute une transition sur `background-color`.", "Donne-lui une durée de `0.4s`.", "Survole les boutons pour voir la différence."],
    starter: `.bouton {\n  background-color: seagreen;\n  cursor: pointer;\n}\n\n.bouton:hover {\n  background-color: darkorange;\n}\n`,
    goals: [
      { label: "Le `.bouton` a une transition sur son fond", test: c => { const p = cs(c, ".bouton", "transition-property"); const d = cs(c, ".bouton", "transition-duration"); return (d !== "0s" && /background-color|all/.test(p)) || (kHover(c, ".bouton", "transition") ? "Ta transition est dans .bouton:hover : elle ne marche qu’à l’aller. Mets-la dans .bouton." : false); } },
      { label: "La transition dure `0.4s`", test: c => cs(c, ".bouton", "transition-duration") === "0.4s" || (cs(c, ".bouton", "transition-duration") !== "0s" ? `Ta transition dure ${cs(c, ".bouton", "transition-duration")} : il faut 0.4s.` : false) },
      { label: "Le survol change toujours le fond en `darkorange`", test: c => { const v = kHover(c, ".bouton", "background-color"); return !!v && sameColor(v, "darkorange"); } },
      { label: "Aucune erreur", test: noErrors }
    ],
    hints: ["Ajoute une ligne dans `.bouton`, pas dans `.bouton:hover`.", "La forme : `transition: propriété durée;`", "`transition: background-color 0.4s;`"],
    solution: `.bouton {\n  background-color: seagreen;\n  cursor: pointer;\n  transition: background-color 0.4s;\n}\n\n.bouton:hover {\n  background-color: darkorange;\n}\n`,
    debrief: "Une seule ligne, et les boutons changent de couleur comme Kami : en douceur. Garde des durées courtes, entre `0.2s` et `0.5s` : plus long, l’interface paraît lente. La queue de Kami reprend ses couleurs !"
  },

  /* ------------------------------ ATELIER 6 ------------------------------ */
  {
    id: "combines", ch: 6, title: "Le site de Kami", notion: "sélecteurs combinés",
    say: "J’ai fait mon propre site ! Mais les liens du menu sont bleus sur fond bleu nuit : on ne voit rien. Et je voudrais la même police pour tous mes titres.",
    lesson: {
      what: ["On peut **combiner** les sélecteurs. Avec un espace, `nav a` veut dire « les liens `a` qui sont **à l’intérieur** d’un `nav` » : c’est le sélecteur **descendant**. Les autres liens de la page ne sont pas touchés.", "Avec une virgule, `h1, h2` veut dire « les `h1` **et** les `h2` » : une seule règle pour plusieurs sélecteurs."],
      why: "Le sélecteur descendant évite d’ajouter des classes partout dans le HTML : on vise les liens du menu grâce à leur place. La virgule évite de recopier les mêmes lignes : moins de code, moins d’oublis.",
      code: `nav a {\n  color: white;\n}\n\nh1, h2 {\n  font-family: Georgia, serif;\n}`,
      pieces: [["nav a", "l’**espace** veut dire « à l’intérieur de » : les liens dans le menu"], ["h1, h2", "la **virgule** veut dire « et aussi » : la règle s’applique aux deux"], [".carte p", "marche aussi avec des classes : les paragraphes dans une `.carte`"]],
      example: { code: `.encadre p {\n  color: seagreen;\n}`, html: `<p>Un paragraphe dehors.</p>\n<div class="encadre"><p>Un paragraphe dans l’encadré.</p></div>` },
      trap: "Confondre l’espace et la virgule. `nav a` = les liens **dans** un nav. `nav, a` = tous les nav **et** tous les liens de la page : ce n’est pas du tout pareil !"
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
      trap: "Une ombre trop noire et trop nette (`box-shadow: 5px 5px 0 black;`) fait vieillot et lourd. Les ombres modernes sont **douces** : beaucoup de flou, peu d’opacité."
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
    id: "finale", ch: 6, boss: true, title: "La carte de profil de Kami", notion: "mission finale",
    say: "Dernière mission ! Il me manque mes taches. Fais-moi la plus belle carte de profil de la forêt, avec tout ce que tu as appris. Le modèle est à côté !",
    lesson: {
      what: "Cette mission réunit tout le jeu : couleurs, polices, boîtes, coins arrondis, ombre, survol et transition. Avance zone par zone, en suivant les commentaires du code de départ, et vérifie souvent : les **Objectifs** te disent ce qui manque.",
      why: "C’est exactement le travail d’un intégrateur web : partir d’une page HTML brute et d’un modèle, puis écrire le CSS jusqu’à ce que les deux se ressemblent. Une carte de profil comme celle-ci existe sur tous les réseaux sociaux.",
      code: `.profil {\n  width: 340px;\n  box-sizing: border-box;\n  padding: 24px;\n  background-color: white;\n  border-radius: 20px;\n  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);\n  text-align: center;\n}`,
      pieces: [["Le modèle", "clique sur « Le modèle à reproduire » au-dessus de l’aperçu pour le comparer avec ton résultat"], ["Le HTML", "ouvre le volet du HTML pour voir les classes : `.profil`, `.avatar`, `.role`, `.bio`, `.infos`, `.bouton`"], ["margin: 0 auto", "une astuce bonus : une boîte avec une largeur fixe se centre dans la page avec des marges `auto` à gauche et à droite"]],
      trap: "Tout écrire d’un coup, puis chercher les erreurs. Écris une règle, regarde l’aperçu, vérifie. C’est plus rapide."
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
      "Le fond de la page (`body`) : une couleur douce, par exemple `#EAF3EF`.",
      "La carte `.profil` : `340px` de large au total, un `padding`, un fond blanc, des coins arrondis, une ombre, et le texte centré.",
      "L’`.avatar` : un rond coloré de `90px` sur `90px`, centré avec `margin: 0 auto`.",
      "Les textes : le `h1` en `Georgia, serif`, le `.role` en majuscules, la `.bio` avec un interligne de `1.6`.",
      "Le `.bouton` : un fond coloré, la petite main, une transition, et une autre couleur au survol."
    ],
    starter: `/* La carte de profil de Kami */\n\n/* 1. Le fond de la page */\n\n\n/* 2. La carte .profil */\n\n\n/* 3. L’avatar rond */\n\n\n/* 4. Les textes : h1, .role, .bio */\n\n\n/* 5. Le bouton et son survol */\n\n`,
    goals: [
      { label: "La page a une couleur de fond", test: c => isColorSet(c, "body", "background-color", "white") },
      { label: "`.profil` : fond blanc, coins arrondis et ombre", test: c => { const ok = [sameColor(cs(c, ".profil", "background-color"), "white"), px(cs(c, ".profil", "border-top-left-radius")) >= 8, cs(c, ".profil", "box-shadow") !== "none"]; return ok.every(Boolean) || (ok.some(Boolean) ? `Il manque : ${["le fond blanc", "les coins arrondis (border-radius)", "l’ombre (box-shadow)"].filter((t, k) => !ok[k]).join(", ")}.` : false); } },
      { label: "`.profil` : `340px` au total, avec un `padding` et le texte centré", test: c => { const w = kWidth(c, ".profil"); const ok = w === 340 && px(cs(c, ".profil", "padding-left")) >= 12 && cs(c, ".profil", "text-align") === "center"; return ok || (decl(c, ".profil", "width") ? `La carte fait ${w}px au total : pense à box-sizing: border-box, à un padding d’au moins 12px et à text-align: center.` : false); } },
      { label: "`.avatar` : un rond coloré de `90px`", test: c => { const a = q(c, ".avatar"); if (!a) return false; const r = a.getBoundingClientRect(); const round = cs(c, ".avatar", "border-top-left-radius") === "50%" || px(cs(c, ".avatar", "border-top-left-radius")) >= 45; return (Math.round(r.width) === 90 && Math.round(r.height) === 90 && round && isColorSet(c, ".avatar", "background-color")) || (decl(c, ".avatar", "width") ? "Il faut width et height de 90px, un border-radius de 50% et un background-color." : false); } },
      { label: "Textes : `h1` en `Georgia`, `.role` en majuscules, `.bio` interligne `1.6`", test: c => { const b = q(c, ".bio"); const ok = [/georgia/i.test(cs(c, "h1", "font-family")), cs(c, ".role", "text-transform") === "uppercase", !!b && Math.abs(px(cs(c, b, "line-height")) / px(cs(c, b, "font-size")) - 1.6) < 0.03]; return ok.every(Boolean) || (ok.some(Boolean) ? `Il manque : ${["la police Georgia du h1", "les majuscules du .role", "l’interligne 1.6 de la .bio"].filter((t, k) => !ok[k]).join(", ")}.` : false); } },
      { label: "`.bouton` : fond coloré, petite main, transition et survol", test: c => { const ok = [isColorSet(c, ".bouton", "background-color", "rgb(239, 239, 239)"), cs(c, ".bouton", "cursor") === "pointer", cs(c, ".bouton", "transition-duration") !== "0s", !!kHover(c, ".bouton", "background-color")]; return ok.every(Boolean) || (ok.some(Boolean) ? `Il manque : ${["un background-color", "cursor: pointer", "une transition", "une règle .bouton:hover qui change le fond"].filter((t, k) => !ok[k]).join(", ")}.` : false); } },
      { label: "Le CSS est propre : aucune erreur", test: noErrors }
    ],
    hints: ["Commence par la carte : `.profil { width: 340px; box-sizing: border-box; padding: 24px; background-color: white; }`, puis ajoute `border-radius`, `box-shadow` et `text-align: center`.", "L’avatar : `.avatar { width: 90px; height: 90px; margin: 0 auto; border-radius: 50%; background-color: #3DCB8B; }`. Pour centrer le K : `line-height: 90px;`.", "Le bouton : `.bouton { background-color: seagreen; color: white; cursor: pointer; transition: background-color 0.3s; }` et `.bouton:hover { background-color: darkorange; }`."],
    solution: `/* La carte de profil de Kami */\n\n/* 1. Le fond de la page */\nbody {\n  background-color: #EAF3EF;\n}\n\n/* 2. La carte .profil */\n.profil {\n  width: 340px;\n  box-sizing: border-box;\n  margin: 0 auto;\n  padding: 24px;\n  background-color: white;\n  border-radius: 20px;\n  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.15);\n  text-align: center;\n}\n\n/* 3. L’avatar rond */\n.avatar {\n  width: 90px;\n  height: 90px;\n  margin: 0 auto;\n  border-radius: 50%;\n  background-color: #3DCB8B;\n  color: white;\n  font-size: 40px;\n  font-weight: bold;\n  line-height: 90px;\n}\n\n/* 4. Les textes : h1, .role, .bio */\nh1 {\n  margin: 12px 0 0;\n  font-family: Georgia, serif;\n  color: seagreen;\n}\n\n.role {\n  margin-top: 4px;\n  color: chocolate;\n  font-size: 13px;\n  text-transform: uppercase;\n  letter-spacing: 2px;\n}\n\n.bio {\n  line-height: 1.6;\n}\n\n.infos {\n  padding: 12px 12px 12px 32px;\n  border-radius: 12px;\n  background-color: #E1F7EC;\n}\n\n/* 5. Le bouton et son survol */\n.bouton {\n  padding: 12px 20px;\n  border-radius: 999px;\n  background-color: seagreen;\n  color: white;\n  font-weight: bold;\n  cursor: pointer;\n  transition: background-color 0.3s;\n}\n\n.bouton:hover {\n  background-color: darkorange;\n}\n`,
    debrief: "Bravo : tu as habillé une page entière, de la couleur du fond jusqu’à l’effet de survol du bouton. Le HTML dit **ce qu’il y a**, le CSS dit **à quoi ça ressemble** : tu maîtrises maintenant les deux. Il reste une grande question : comment **placer** les éléments côte à côte ? C’est le rôle de Flexbox, et Kami t’attend à l’étang avec les lucioles !"
  }
  ]
};
