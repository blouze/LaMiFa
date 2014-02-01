WebFontConfig = {
	google: { families: [ 'Lato:400,700,900,400italic:latin' ] }
};
(function() {
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();

L.Icon.Default.imagePath = "/packages/leaflet/images";

(function(a) {
	if (window.filepicker) {
		return
	}
	var b = a.createElement("script");
	b.type = "text/javascript";
	b.async = !0;
	b.src = ("https:" === a.location.protocol ? "https:" : "http:") + "//api.filepicker.io/v1/filepicker.js";
	var c = a.getElementsByTagName("script")[0];
	c.parentNode.insertBefore(b, c);
	var d = {};
	d._queue = [];
	var e = "pick,pickMultiple,pickAndStore,read,write,writeUrl,export,convert,store,storeUrl,remove,stat,setKey,constructWidget,makeDropPane".split(",");
	var f = function(a, b) {
		return function() {
			b.push([a, arguments])
		}
	};
	for (var g = 0; g < e.length; g++) {
		d[e[g]] = f(e[g], d._queue)
	}
	window.filepicker = d
})(document);
filepicker.setKey('A6uyubo4LT5eNfQ2ofok6z');



moment.lang('fr', {
	months : "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
	monthsShort : "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
	weekdays : "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
	weekdaysShort : "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
	weekdaysMin : "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
	longDateFormat : {
		LT : "HH:mm",
		L : "DD/MM/YYYY",
		LL : "D MMMM YYYY",
		LLL : "D MMMM YYYY LT",
		LLLL : "dddd D MMMM YYYY LT"
	},
	calendar : {
		sameDay: "[ce soir]",
		nextDay: '[demain]',
		nextWeek: 'dddd [prochain]',
		lastDay: '[hier]',
		lastWeek: 'dddd [dernier]',
		sameElse: 'dddd L'
	},
	relativeTime : {
		future : "dans %s",
		past : "il y a %s",
		s : "quelques secondes",
		m : "une minute",
		mm : "%d minutes",
		h : "une heure",
		hh : "%d heures",
		d : "un jour",
		dd : "%d jours",
		M : "un mois",
		MM : "%d mois",
		y : "une année",
		yy : "%d années"
	},
	ordinal : function (number) {
		return number + (number === 1 ? 'er' : 'ème');
	},
	week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

Session.set("position", null);
Session.set("searchRadius", 500);

if (navigator.geolocation)
	var watchId = navigator.geolocation.watchPosition(function (position) {
		Session.set("userPosition", position.coords);
	}, function () {
		console.log("Désolé, nous n'avons pas pu déterminer votre position :(");
	}, {
		enableHighAccuracy: true, 
		timeout           : 30000, 
		maximumAge        : 0
	});
else
	alert("La géolocalisation n'est pas supportée par votre navigateur.");