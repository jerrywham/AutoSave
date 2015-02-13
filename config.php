<?php
/**
 * Plugin AutoSave
 *
 * @package	PLX
 * @version	0.4
 * @date	13/02/2015
 * @author	Rockyhorror, Cyril MAGUIRE
 **/
 
if(!defined('PLX_ROOT')) exit; 
	
	# Control du token du formulaire
	plxToken::validateFormToken($_POST);
	
	if(!empty($_POST)) {
		$plxPlugin->setParam('duration', $_POST['duration'], 'numeric');
		$plxPlugin->saveParams();
		header('Location: parametres_plugin.php?p=AutoSave');
		exit;
	}
?>

<h2><?php $plxPlugin->lang('L_TITLE') ?></h2>
<p><?php $plxPlugin->lang('L_CONFIG_DESCRIPTION') ?></p>

<form action="parametres_plugin.php?p=AutoSave" method="post">
	<fieldset class="withlabel">
		<p><?php echo $plxPlugin->getLang('L_CONFIG_DURATION') ?></p>
		<?php plxUtils::printInput('duration',plxUtils::strCheck($plxPlugin->getParam('duration')), 'text'); ?>

	</fieldset>
	<br />
	<?php echo plxToken::getTokenPostMethod() ?>
	<input type="submit" name="submit" value="<?php echo $plxPlugin->getLang('L_CONFIG_SAVE') ?>" />
</form>