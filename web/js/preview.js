App.populator('preview', function(page, params){
     var data = params.data;
     var p = $(page);

     var previewImage;
     var previewTitle;

     var isVideo = typeof data.video !== 'undefined' ? true : false;
     
     /* Handle iOS */
     if(App.platform === 'ios'){
          p.find('.app-button.back').text('kikur');

          if(App.platformVersion < 5){
               p.find('.app-topbar .app-button.back').css('border-shadow','none');
          }
     }

     if(App.platform === 'android' && App.platformVersion < 3){
          p.find('.app-button.back').css('background', 'none');
     }
     
     p.find('.app-content').css('background','black');
     p.css('background','black');



     if (params.fromKik) {
          p.find('.app-button.back').on('click', function(){
               _gaq.push(['_trackEvent', 'PageOpen', 'Home']);

               if ( cards.picker && cards.picker.cancel ) {
                    cards.picker.cancel();
               }

               App.load('selector', App.getReverseTransition());
               App.removeFromStack(-1);
          });

          if(isVideo === true){
               previewImage = '../img/play_preview.png';
          }else{
               previewImage = data.image_file;
          }

     }




     /* Main Page Builder */
     previewTitle = data.title;


     p.find("#kik").click(function(){

          if(isVideo === true){
               kikpic = '../img/play_preview.png';
          }else if(data.image_file.indexOf('.gif') > -1){
               kikpic = '../img/kikpic_gif.png';
          }else{
               kikpic = data.image_file;
          }

          cards.kik.send({
               title: decodeSpecialChars(data.title),
               text: 'So funny it\'s UNREAL',
               pic: kikpic,
               linkData: JSON.stringify(data)
          });

          _gaq.push(['_trackEvent', 'KikContent', 'Kikked']);

     });


     p.find('.preview-title').html(previewTitle);

     if(isVideo === true){
          var video = $('<img />')
               .addClass('preview-video')
               .attr('src', '../img/play_preview.png');

          p.find('.app-content')
               .append(video)
               .css('text-align','center');

          p.find('.preview-video').on('click', function(){
               
               cards.browser.open(data.video);
          
          });

     }else{
          previewImage = data.image_file;

          var photoViewer = new PhotoViewer(page, [previewImage], {
               automaticTitles: false
          });
     }
});