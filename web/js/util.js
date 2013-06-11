// HTML Tag Extractor
function extract(data, tag, attr){
	var html = $("<div>" + data + "</div>");
	return html.find(tag).attr(attr);
}

// Android Back Button Handler
function handleBackButton () {
 	if (cards.kik.returnToConversation) {
     	cards.kik.returnToConversation();
 	}else{
		return false;
  	}
}

function onBack(){
	if ( cards.picker && cards.picker.cancel ) {
				cards.picker.cancel();
			}

			App.back();
}