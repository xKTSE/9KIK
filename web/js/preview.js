App.populator('preview', function(page, data){
     p = $(page);

     /* To make the entire page black */
     p.find('.app-content').css('background','black');
     p.css('background','black');

     if(App.platform === 'ios'){
          p.find('.app-topbar .app-button.semiright.home').text('Home');
     }

     p.find('.app-button.semiright').on('click', function(){
          App.load('home', 'fade');
     });




     /* Main Page Builder */
     var previewTitle = data.title;
     var previewImage = extract(data.description,'img','src');

     p.find(".app-button.right").click(function(){

          cards.kik.send({
               title: data.title,
               text: 'So funny it\'s UNREAL',
               pic: extract(data.description, 'img', 'src'),
               linkData: JSON.stringify(data)
          });

     });


     p.find('.preview-title').html(previewTitle);

     var photoViewer = new PhotoViewer(page, [previewImage], {
          automaticTitles: false
     });
     
});