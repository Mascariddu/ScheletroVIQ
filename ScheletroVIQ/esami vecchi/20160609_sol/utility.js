/*
 * Aggiunge una funzione alla catena
 * delle funzioni da richiamare al
 * termine del caricamento della pagina
 */
function addOnload(f){
	var prev = window.onload;
	window.onload = function(evt){
		f(evt);
		prev(evt);
	};
}
