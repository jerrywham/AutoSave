/**
 * Plugin AutoSave
 *
 * @package	PLX
 * @version	0.4ter
 * @date	17/02/2015
 * @author	Cyril MAGUIRE
 **/

;function AutoSave(PLX_PLUGINS) {

	if (PLX_PLUGINS == undefined) {
		PLX_PLUGINS = '../../plugins/';
	}

	var form_article = $('#form_article')
	var form_static = $('#form_static');

	if (form_article.length > 0 ) {
		form_article.sisyphus({
			autoRelease:true,
			locationBased:true
		});
	}
	if (form_static.length > 0) {
		form_static.sisyphus({
			autoRelease:true,
			locationBased:true
		});
	}
	if (form_article.length > 0 || form_static.length > 0 ) {
		var newBlocMsg = document.createElement('p');
		newBlocMsg.innerHTML = '<img src="'+PLX_PLUGINS+'AutoSave/autosave.png" alt="Save locally enable" title="Sauvegarde locale activée"/>' ;
    	$('h2').append(newBlocMsg);
	}
};