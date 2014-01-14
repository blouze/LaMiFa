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

L.Icon.Default.imagePath = "/packages/leaflet-0.6.4/images";

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

if (navigator.geolocation)
	var watchId = navigator.geolocation.watchPosition(function (position) {
		Session.set("userPosition", position.coords);
	}, function () {
		console.log("Sorry, no position available.");
	}, {
		enableHighAccuracy: true, 
		timeout           : 30000, 
		maximumAge        : 0
	});
else
	console.log("Geolocation is not supported by this browser.");