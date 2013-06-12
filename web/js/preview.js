App.populator('preview', function(page, params){
     var data = params.data;

     p = $(page);
     
     if(App.platform === 'ios'){
          p.find('.app-button.back').text('9KIKS').css('font-family','Oswald').css('font-size','20px');

          if(App.platformVersion < 5){
               p.find('.app-topbar .app-title').css('font-family', 'helvetica');
               p.find('.app-topbar .title-bar-container').css('font-family', 'helvetica');
               p.find('.app-topbar .app-button.back').css('border-shadow','none').css('font-family', 'helvetica');
          }
     }

     /* To make the entire page black */
     p.find('.app-content').css('background','black');
     p.css('background','black');



     if (params.fromKik) {
          p.find('.app-button.back').on('click', function(){
               _gaq.push(['_trackEvent', 'PageOpen', 'Home']);

               if ( cards.picker && cards.picker.cancel ) {
                    cards.picker.cancel();
               }

               // Load home page & remove the preview page from the stack if opened from content message
               App.load('home', App.getReverseTransition());
               App.removeFromStack(-1);
          });
     }




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

          _gaq.push(['_trackEvent', 'KikContent', 'Kikked']);

     });


     p.find('.preview-title').html(previewTitle);

     var photoViewer = new PhotoViewer(page, [previewImage], {
          automaticTitles: false
     });
     
},
     function (page, data) {
          if (App.platform === 'android'){
               cards.browser.unbindBack(handleBackButton);
          }
     }
);