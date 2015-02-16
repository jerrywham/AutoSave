<?php
/**
 * Plugin AutoSave
 *
 * @package	PLX
 * @version	0.4bis
 * @date	16/02/2015
 * @author	Rockyhorror, Cyril MAGUIRE
 **/
 

class AutoSave extends plxPlugin {
	
	/**
	 * Constructeur de la classe AutoSave
	 *
	 * @param	default_lang	langue par défaut utilisée par PluXml
	 * @return	null
	 * @author	Rockyhorror, Cyril MAGUIRE
	 **/
	public function __construct($default_lang) {

		# Appel du constructeur de la classe plxPlugin (obligatoire)
		parent::__construct($default_lang);
		
		# Déclarations des hooks
		$this->addHook('AdminFootEndBody', 'AdminFootEndBody');
		$this->addHook('AdminPrepend', 'AdminPrepend');
	}

	/**
	 * Méthode qui charge les fichiers javascripts nécessaires
	 *
	 * @return	stdio
	 * @author	Cyril MAGUIRE
	 **/
	public function AdminFootEndBody() {
		echo "\t".'<script type="text/javascript">
				if(typeof(jQuery) === "undefined") {document.write(\'<script  type="text/javascript" src="'.PLX_PLUGINS.'AutoSave/js/jQuery.1.8.1.min.js"><\/script>\');}
			</script>'."\n";
		echo "\t".'<script type="text/javascript" src="'.PLX_PLUGINS.'AutoSave/js/sisyphus/sisyphus.min.js"></script>'."\n";
		echo "\t".'<script type="text/javascript" src="'.PLX_PLUGINS.'AutoSave/js/AutoSave.js"></script>'."\n";
	}
}
?>