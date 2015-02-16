/**
 * Plugin AutoSave
 *
 * @package	PLX
 * @version	0.4bis
 * @date	16/02/2015
 * @author	Cyril MAGUIRE
 **/
;function AutoSave() {
	var form_article = $('#form_article')
	var form_static = $('#form_static');
	
	var newBlocMsg = document.createElement('p');
	newBlocMsg.innerHTML = '<img src="../../plugins/AutoSave/autosave.png" alt="Save locally enable" title="Sauvegarde localle activée"/>' ;

	if (form_article.length > 0 ) {
		form_article.sisyphus({
			autoRelease:true,
			locationBased:true
		});
    	$('h2').append(newBlocMsg);
	}
	if (form_static.length > 0) {
		form_static.sisyphus({
			autoRelease:true,
			locationBased:true
		});
    	form_static.prepend(newBlocMsg);
	}
};
AutoSave();