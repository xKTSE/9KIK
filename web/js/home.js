App.populator('home', function (page, data) {
     var p = $(page);


     p.find('#refresh').on('click', function(){
          _gaq.push(['_trackEvent', 'PageOpen', 'Refresh']);
          App.load('home', data);
          App.removeFromStack(-1);
     });

     p.find('.app-button.back').css('color', data.color);

     /* For loader purposes */
     var loaderElem = p.find(".app-section.loader").clone();



     cards.ready(function(){
          /* Async callbacks */
          zAPI.getData(data, function(meta, posts){
               if(posts){
                    PageBuilder(posts);
               }else{
                    App.back();
                    App.dialog({title:"Cannot Load Content", text: "Please try again."});
                    _gaq.push(['_trackEvent', 'Error', 'Content Error Loading']);
                    return;
               }
          }).error(function(){
               App.dialog({title:"Network Error Connection", text: "Please make sure you have a network connection then try again."})
               _gaq.push(['_trackEvent', 'Error', 'Network Error']);

          });

     });




     function PageBuilder(posts){
          var data = [];

          for(var j = 0; j < posts.length; j++){
               var item = {
                    title : posts[j].title,
                    video: extract(posts[j].description, 'iframe', 'src'),
                    image_file: extract(posts[j].description, 'img', 'src')
               };

               data.push(item);
          }


          /* Unreal SlideViewer
          - some maths to make slideViewer function incoherent with app-topbar & title-bar-text;
          */
          var wrapper = page.querySelector('.wrapper');

          var height = (p.height() - (p.find(".title-bar-text").height() + p.find(".app-topbar").height()));
          wrapper.innerHTML = '';
          wrapper.style.height = height + "px";
          

          var slideViewer = new SlideViewer(wrapper, source,{startAt: 0, length: data.length});



          p.find("#kik").click(function(){
               var k = slideViewer.page();
               var kikpic;

               if(typeof data[k].video !== 'undefined'){
                    kikpic = '../img/play_preview.png';
               }else if(data[k].image_file.indexOf('.gif') > -1){
                    kikpic = '../img/kikpic_gif.png';
               }else{
                    kikpic = data[k].image_file;
               }


               cards.kik.send({
                    title: decodeSpecialChars(data[k].title),
                    text: 'So funny it\'s UNREAL',
                    pic: kikpic,
                    linkData: JSON.stringify(data[k])
               });

               _gaq.push(['_trackEvent', 'KikContent', 'Kikked']);

          });


          slideViewer.on('flip', function(i){
               if (i >= 0){
                    _gaq.push(['_trackEvent', 'ContentSliding', 'slide']);
                    p.find('.title-bar-text').html(data[i].title);
               }else{
                    return;
               }                 
          });


          /*
          - Force dat SlideViewer to set the title of the first post
          */
          p.find('.title-bar-text').html(data[0].title);


          function source(i){
               /* to bypass undefined-ness; since Slideviewer loads 3 images at a time */
               if ( i < 0 ) {
                    return;
               }


               /* For Future References: Publish date
                    var postDate = data[i].pubDate.substr(0, data[i].pubDate.length - 14);
               */
               var postImage;
               var isVideo = typeof data[i].video !== 'undefined' ? true : false;

               if(isVideo === true){
                    postImage = '../img/play_preview.png'
               }else{
                    postImage = data[i].image_file;
               }

               /* the main slideViewer content */
               var slideContent = $('<div />')
                    .addClass("listwrapper");

               /* Enable iScroll for certain devices */
               if ((App.platform === 'android' && App.platformVersion >= 4) || (App.platform ==='ios' && (App.platformVersion>=5 && App.platformVersion <6))) {
                    slideContent.scrollable(true);
               } else {
                    slideContent.scrollable();
               }

                    var postSection = $('<div />')
                         .addClass('app-section')
                         .css('text-align', 'center')
                         .append(loaderElem.clone());

                    var imageSection = $('<div />')
                         .addClass('image-section')
                         .css('text-align', 'center');

                    var img = $('<img />');
                         if(isVideo === true){
                              img.addClass('main-image video');
                              imageSection.css('background','black');
                         }else{
                              img.addClass('main-image');
                         }

                         

                         /* Show the loader until images are ready to be rendered & displayed */
                         img[0].onload = function() {
                              postSection.find(".loader").remove();
                              imageSection.append(img);
                              postSection.append(imageSection);
                         };


                         img.attr('src', postImage);

                         img.clickable().on('click', function(){

                              if(isVideo === true){

                                   cards.browser.open(data[i].video);
                              
                              }else{
                                   _gaq.push(['_trackEvent', 'PageOpen', 'ImagePreview']);
                                   App.load('preview', { data : data[slideViewer.page()] });
                              }

                         });

               slideContent.scrollableNode().append(postSection);
               return slideContent[0];
          }
     }
});
/* Thanks Ben for helping with the kinks of SlideViewer! */