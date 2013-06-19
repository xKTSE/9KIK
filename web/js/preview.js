App.populator('preview', function(page, params){
     var data = params.data;
     var p = $(page);

     var previewImage;
     var previewTitle;

     var isVideo = typeof data.video !== 'undefined' ? true : false;
     
     /* Handle iOS */
     if(App.platform === 'ios'){
          if(App.platformVersion < 5){
               p.find('.app-topbar .app-button.back').css('border-shadow','none');
          }
     }


     if((App.platform === 'android' && App.platformVersion < 3) || (App.platform === 'ios' && App.platformVersion < 5)){
          p.find('.app-topbar .app-button.back').css('border-right', '1px solid black');
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
               previewImage = data.imgsrc;
          }

     }




     /* Main Page Builder */
     previewTitle = data.title;


     p.find("#kik").click(function(){

          if(isVideo === true){
               kikpic = '../img/play_preview.png';
          }else if(data.imgsrc.indexOf('.gif') > -1){
               kikpic = '../img/kikpic_gif.png';
          }else{
               kikpic = data.imgsrc;
          }

          cards.kik.send({
               title: decodeSpecialChars(data.title),
               text: 'Check this out!',
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

     }else if(data.imgsrc.indexOf('.gif') > -1){
          console.log(data.imgsrc);
          var gif = $('<img />')
               .addClass('preview-gif')
               .attr('src', data.imgsrc);

          p.find('.app-content')
               .append(gif)
               .css('text-align', 'center');

     }else{
          previewImage = data.imgsrc;

          var photoViewer = new PhotoViewer(page, [previewImage], {
               automaticTitles: false
          });
     }
});