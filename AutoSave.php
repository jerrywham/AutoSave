<?php
/**
 * Plugin AutoSave
 *
 * @package	PLX
 * @version	0.4
 * @date	13/02/2015
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
		$this->addHook('AdminTopEndHead', 'AdminTopEndHead');
		$this->addHook('AdminFootEndBody', 'AdminFootEndBody');

		# droits pour accèder à la page config.php du plugin
		$this->setConfigProfil(PROFIL_ADMIN, PROFIL_MANAGER);
	}

	/**
	 * Méthode qui configure le plugin à l'activation
	 *
	 * @return	stdio
	 * @author	Cyril MAGUIRE
	 **/
	public function onActivate() {
		if(!is_file($this->plug['parameters.xml'])) {
			$this->setParam('duration', 10, 'numeric');
			$this->saveParams();
		}
	}


	/**
	 * Méthode qui charge les fichiers javascripts nécessaires
	 *
	 * @return	stdio
	 * @author	Cyril MAGUIRE
	 **/
	public function AdminFootEndBody() {
		echo "\t".'<script type="text/javascript">
				if(typeof(jQuery) === "undefined") {document.write(\'<script  type="text/javascript" src="<?php echo PLX_PLUGINS; ?>AutoSave/js/jQuery.1.8.1.min.js"><\/script>\');}
			</script>'."\n";
		echo "\t".'<script type="text/javascript" src="'.PLX_PLUGINS.'AutoSave/js/sisyphus/sisyphus.min.js"></script>'."\n";
		echo "\t".'<script type="text/javascript" src="'.PLX_PLUGINS.'AutoSave/js/AutoSave.js"></script>'."\n";
		echo "\t".'<script type="text/javascript">AutoSave('.$this->getParam('duration').',$);</script>'."\n";
	}
}
?>
