// ----------------
// HTML Extractor
// ----------------
function extract(data, tag, attr)
{
	var html = $("<div>" + data + "</div>");
	return html.find(tag).attr(attr);
}

// ----------------
// HTML Special Char Decoder
// ----------------
function decodeSpecialChars(string)
{
	return $('<div />').html(string).text();
}

// ----------------
// Android Back Button Handler
// ----------------
function handleBackButton()
{
 	if (cards.kik.returnToConversation) {
     	cards.kik.returnToConversation();
 	} else {
		return false;
  	}
}

// ----------------
// Android onBack()
// ----------------
function onBack()
{
	if ( cards.picker && cards.picker.cancel ) {
		cards.picker.cancel();
	}
	App.back();
}
