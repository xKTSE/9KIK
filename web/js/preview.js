App.populator('preview', function(page, data){
     p = $(page);

     /* To make the ENTIRE preview screen black */
     p.find('.app-content').css('background','black');
     p.css('background','black');

     var postTitle = data.title;
     var postImage = extract(data.description,'img','src');

     p.find(".app-button.right").click(function(){
               
          cards.kik.send({
               title: data.title,
               text: 'So funny it\'s UNREAL',
               pic: extract(data.description, 'img', 'src'),
               linkData: JSON.stringify(data)
          });

     });


     p.find('.preview-title').html(postTitle);


     var photoViewer = new PhotoViewer(page, [postImage], {
          automaticTitles: false
     });
     
});