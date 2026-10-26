// Depuis le 22 octobre 2026 (habillage « La nuit, puis le Carnet »), les lucioles ne sont plus dessinées :
// le conteneur .lucioles est caché par la feuille de style, le code reste pour y revenir.
// Le menu du haut prend un fond plein dès qu'on a défilé (classe « pose »).
(function () {
  var menu = document.querySelector('.menu-haut');
  if (!menu) return;
  function poser() { menu.classList.toggle('pose', window.scrollY > 40); }
  poser();
  window.addEventListener('scroll', poser, { passive: true });
})();

// Les lucioles du fond, comme dans la maquette d'Audrey : 28 petites lumières,
// toujours aux mêmes places (tirage fixe), qui scintillent et dérivent doucement.
(function () {
  var conteneur = document.querySelector('.lucioles');
  if (!conteneur) return;
  var couleurs = document.documentElement.classList.contains('jeu')
    ? ['#f2c66a', '#c69af2', '#f5b07e', '#fff1c4']
    : ['#74e3d4', '#c69af2', '#f5b07e', '#e8c98a'];
  var graine = 7;
  function hasard() { graine = (graine * 9301 + 49297) % 233280; return graine / 233280; }
  for (var i = 0; i < 28; i++) {
    var c = couleurs[i % couleurs.length];
    var taille = 2 + hasard() * 5;
    var point = document.createElement('span');
    point.style.left = (hasard() * 100) + '%';
    point.style.top = (hasard() * 100) + '%';
    point.style.width = taille + 'px';
    point.style.height = taille + 'px';
    point.style.background = c;
    point.style.boxShadow = '0 0 ' + (taille * 3) + 'px ' + taille + 'px ' + c + '66';
    var duree = 8 + hasard() * 10;
    var retard = -hasard() * 12;
    var scintillement = 2.6 + hasard() * 3.2;
    point.style.setProperty('--dur', duree + 's');
    point.style.setProperty('--tw', scintillement + 's');
    point.style.animationDelay = retard + 's, ' + retard + 's';
    conteneur.appendChild(point);
  }
})();

// Un lien vers « #mentions » ouvre les mentions légales, repliées d'habitude.
(function () {
  function ouvrir() {
    var m = document.getElementById('mentions');
    if (m && m.tagName === 'DETAILS' && location.hash === '#mentions') m.open = true;
  }
  ouvrir();
  window.addEventListener('hashchange', ouvrir);
})();
