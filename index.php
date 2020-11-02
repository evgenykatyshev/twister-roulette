<!DOCTYPE html>

<html lang="en" prefix="og: http://ogp.me/ns#">

<head>

<base href="//twister-roulette.com/" />

<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="robots" content="index, follow" />
<meta name="viewport" content="width=device-width" />

<link rel='manifest' href='/manifest.json' /><!--
<script type="module">
/*
 This code uses the pwa-update web component https://github.com/pwa-builder/pwa-update to register your service worker,
 tell the user when there is an update available and let the user know when your PWA is ready to use offline.
*/

import 'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate';

const el = document.createElement('pwa-update');
document.body.appendChild(el);
</script>-->

<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="icon" type="image/png" href="favicon.png" />

<!-- jQuery -->
<script type="text/javascript" src="js/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="js/jquery.cookie.js"></script>

<!-- Языки -->
<script type="text/javascript" src="js/i18n.js"></script>

<!-- Лайкли -->
<script src="js/likely-0.91/likely.js"></script>
<link rel="stylesheet" href="js/likely-0.91/likely.css">

<!-- Рулетка -->
<script type="text/javascript" src="js/roulette.js"></script>

<title>Roulette for Twister</title>

<meta name="description" content="Online roulette for playing Twister" />
<meta name="keywords" content="roulette,twister,online" />

<meta property="og:image" content="//twister-roulette.com/img/twister-roulette-ru.png" />

<link href="https://fonts.googleapis.com/css?family=Roboto:400,500&amp;subset=cyrillic,cyrillic-ext,greek,greek-ext,latin-ext,vietnamese" rel="stylesheet" />

<!-- Yandex.Metrika counter -->
<script type="text/javascript">
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter26947902 = new Ya.Metrika({id:26947902,
                    webvisor:true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");
</script>
<!-- /Yandex.Metrika counter -->

</head>

<body>

<?php include_once('img/icons.svg'); ?>

<header id="header">
	<h1 id="title">Roulette for Twister</h1><!--
  <div class="button button_settings">
	  <svg class="button__icon">
			<use xlink:href="#settings_icon"></use>
		</svg>
	</div>--><!--
	<div class="button button_sound">
	  <svg class="button__icon button__icon_off">
			<use xlink:href="#sound_off_icon"></use>
		</svg>
		<svg class="button__icon button__icon_on">
			<use xlink:href="#sound_on_icon"></use>
		</svg>
	</div>-->
  <div class="button button_lang">
    <svg class="button__icon language_icon">
      <use xlink:href="#language_icon"></use>
    </svg>
    <span class="desktop-part">en</span>
  </div>
  <ul id="lang-list">
    <li><a rel="alternate" hreflang="be" href="be" class="lang">Белорусский</a></li>
    <li><a rel="alternate" hreflang="cs" href="cs" class="lang">Čeština</a></li>
    <li><a rel="alternate" hreflang="de" href="de" class="lang">Deutsch</a></li>
    <li><a rel="alternate" hreflang="en" href="en" class="lang">English</a></li>
    <li><a rel="alternate" hreflang="es" href="es" class="lang">Español</a></li>
    <li><a rel="alternate" hreflang="fr" href="fr" class="lang">Français</a></li>
    <li><a rel="alternate" hreflang="he" href="he" class="lang">עברית</a></li>
    <li><a rel="alternate" hreflang="hi" href="hi" class="lang">हिन्दी</a></li>
    <li><a rel="alternate" hreflang="it" href="it" class="lang">Italiano</a></li>
    <li><a rel="alternate" hreflang="ja" href="ja" class="lang">日本語</a></li>
    <li><a rel="alternate" hreflang="po" href="po" class="lang">Polski</a></li>
    <li><a rel="alternate" hreflang="pt" href="pt" class="lang">Português</a></li>
    <li><a rel="alternate" hreflang="ru" href="ru" class="lang">Русский</a></li>
    <li><a rel="alternate" hreflang="uk" href="uk" class="lang">Українська</a></li>
    <li><a rel="alternate" hreflang="zh" href="zh" class="lang">中文</a></li>
  </ul>
	<div id="timer" class="hidden">
	  <div class="button button_minus enable">
			<svg class="button__icon">
				<use xlink:href="#minus_icon"></use>
			</svg>
  	</div>
		<div id="time_period"></div>
		<div id="time"></div>
	  <div class="button button_plus enable">
			<svg class="button__icon plus_icon">
				<use xlink:href="#plus_icon"></use>
			</svg>
	  </div>
	</div>
	<div class="button button_play">
		<svg class="button__icon">
			<use xlink:href="#timer_off_icon"></use>
		</svg>
	</div>
	<div class="button button_stop">
		<svg class="button__icon">
			<use xlink:href="#timer_icon"></use>
		</svg>
	</div>
	<div id="tip" class="desktop-part">Click anywhere or press any key</div>
  <div id="about">
    <span id="author"><span class="desktop-part">Design: </span><a href="//evgenykatyshev.ru/projects/twister-roulette/" class="link"><span class="desktop-part">Evgeny </span>Katyshev</a></span>
    <a id="old" href="//old.twister-roulette.com/" class="link desktop-part">Old version</a>
  </div>
</header>

<div id="settings" class="hidden">
  <div class="button button_close">
	  <svg class="button__icon">
			<use xlink:href="#close_icon"></use>
		</svg>
	</div>
</div>

<div id="main">
	<div id="limb"></div>
	<div id="circle"></div>
	<div id="color-name"></div>
</div>

</body>
</html>