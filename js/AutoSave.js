;(function(window,undefined,duration,$) {

    'use_strict';

    function isIE() {
        var nav = navigator.userAgent.toLowerCase();
        return (nav.indexOf('msie') != -1) ? parseInt(nav.split('msie')[1]) : false;
    }

   	function Remove(idToRemove) {
        if (isIE()) {
            document.getElementById(idToRemove).removeNode(true);
        } else {
            var Node1 = document.body; 
            var len = Node1.childNodes.length;
            
            for(var i = 0; i < len; i++){           
                if (Node1.childNodes[i] != undefined && Node1.childNodes[i].id != undefined && Node1.childNodes[i].id == idToRemove){
                    Node1.removeChild(Node1.childNodes[i]);
                }
            }
        }   
    }

    function createMsgAutoSave(timeOutToCreateMsg) {
    	Remove('msg');
    	var DomParent = document.body;
    	var newBlocMsg = document.createElement('p');

    	newBlocMsg.setAttribute('id','msg');
    	newBlocMsg.setAttribute('class','notification success');
    	newBlocMsg.innerHTML = 'AutoSave' ;

    	DomParent.appendChild(newBlocMsg);
    	setMsg();
    	setTimeout(function() {
    		createMsgAutoSave(timeOutToCreateMsg);
    	}, timeOutToCreateMsg);
    }

	function AutoSave(duration,$) {

		var timeOutToCreateMsg = duration *1000; //timeoutForSaving seconds
		var form_article = $('#form_article')
		var form_static = $('#form_static');
		
    	if (form_article.length > 0 ) {
    		form_article.sisyphus({
    			timeout: duration,
    			onSave: createMsgAutoSave(timeOutToCreateMsg)
    		});
    	}
    	if (form_static.length > 0) {
    		form_static.sisyphus({
    			timeout: duration,
    			onSave: createMsgAutoSave(timeOutToCreateMsg)
    		});
    	}
	};

    window.AutoSave = AutoSave;
    window.createMsgAutoSave = createMsgAutoSave;

})(window);