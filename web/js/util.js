// HTML Tag Extractor
function extract(data, tag, attr){
	var html = $("<div>" + data + "</div>");
     return html.find(tag).attr(attr);
}