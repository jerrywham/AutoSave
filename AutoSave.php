<?php
/**
 * Plugin AutoSave
 *
 * @package	PLX
 * @version	0.4ter
 * @date	17/02/2015
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
		$this->addHook('plxMotorConstructLoadPlugins', 'plxMotorConstructLoadPlugins');
		$this->addHook('AdminFootEndBody', 'AdminFootEndBody');
		$this->addHook('AdminPrepend', 'AdminPrepend');
	}

	/**
	 * Méthode qui permet de vérifier que le plugin est chargé après tynimce
	 *
	 * @return bool
	 * @author Cyril MAGUIRE
	 */
	public function plxMotorConstructLoadPlugins() {
	echo '<?php
		$aActivePlugins = $this->plxPlugins->aPlugins;
		$keys = array_keys($aActivePlugins);
		$kautosave = 0;
		$ktynimce = 0;
		foreach ($keys as $k => $p) {
			if ($p == \'AutoSave\'){
				$kautosave = $k;
			} else if (stripos($p,\'tynimce\') !== false) {
				$ktynimce = $k;
			}
		}
		if ($kautosave < $ktynimce) {
			unset($this->plxPlugins->aPlugins[\'AutoSave\']);
			unset($this->plxPlugins->aPlugins[\'spxtynimce\']);

			$this->plxPlugins->aPlugins[\'spxtynimce\'] = $aActivePlugins[\'spxtynimce\'];
			$this->plxPlugins->aPlugins[\'AutoSave\'] = $aActivePlugins[\'AutoSave\'];
		}

		# Début du fichier XML
		$xml = "<?xml version=\'1.0\' encoding=\'".PLX_CHARSET."\'?>\n";
		$xml .= "<document>\n";
		foreach($this->plxPlugins->aPlugins as $k=>$v) {
				$xml .= "\t<plugin name=\"$k\"></plugin>\n";
		}
		$xml .= "</document>";

		# On écrit le fichier
		if(plxUtils::write($xml,path(\'XMLFILE_PLUGINS\')))
			return true;
		else
			return false;
		?>';
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
		echo "\t".'<script type="text/javascript">AutoSave("'.PLX_PLUGINS.'");</script>'."\n";
	}
}
?>