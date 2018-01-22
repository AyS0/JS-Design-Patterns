$(function(){
    
    var model = {
        //init cats objects 
        init: function(){
            this.cats=[
                {
                    name: 'Cat 1',
                    image: 'image/cat.jpg' , 
                    clickCount: 0
                },
                {
                    name: 'Cat 2', 
                    image: 'image/cat2.jpg', 
                    clickCount: 0
                },
                { 
                    name: 'Cat 3', 
                    image: 'image/cat3.jpg', 
                    clickCount: 0
                },
                { 
                    name: 'Cat 4', 
                    image: 'image/cat4.jpg', 
                    clickCount: 0
                },
                { 
                    name: 'Cat 5', 
                    image: 'image/cat5.jpg', 
                    clickCount: 0
                }
            ]; 
            this.currentCat=this.cats[0];  
            this.adminVisible=false;
        }
        
    };


    var octopus={
        init: function(){
            model.init();
            viewList.init(); 
            viewCat.init();
            viewAdmin.init();
        },
        getCats: function(){
           return model.cats;
        },
        getActiveCat: function(){
            return model.currentCat;
        },
        setActiveCat:function(catIndex){
            model.currentCat=model.cats[catIndex];
            viewCat.render();
            viewAdmin.render();
        },
        incCatCounter: function(){
            model.currentCat.clickCount+=1;
            viewCat.render();
            viewAdmin.render();
        },
        isAdminVisible: function(){
            return model.adminVisible;
        },
        setAdminVisible: function(visible){
            model.adminVisible=visible;
            if(visible){
                // viewAdmin.adminArea.load('template/adminForm.html');
                viewAdmin.render();
                viewAdmin.adminArea.css("visibility", "visible");
            }else{
                viewAdmin.adminArea.css("visibility", "hidden");             
            }
        },
        updateCurrentCat: function( catName, catImage, catClickCount){
            var currentCat = this.getActiveCat();
            currentCat.name = catName.value;
            currentCat.image = catImage.value;
            currentCat.clickCount = parseInt(catClickCount.value);
            viewCat.render();
        }
    };


    var viewList={
        init: function(){
            this.catList = $('#catPicker');     
            viewList.render();
            viewList.event();
        },
        //render list of available cats in model
        render: function(){
            var c=octopus.getActiveCat();
            var htmlStr='';
            octopus.getCats().forEach(function(cat,index){
                htmlStr += '<button id="catOption-'+index+'"class="catOption">'+ cat.name + '</button>';
                
            });
            this.catList.html(htmlStr);
        },
        event: function () {
            $('.catOption').each(function(index){
                $(this).click((function(i){
                    return function(){
                        octopus.setActiveCat(i);
                    };
                })(index));
                
            });
        }
    };


    var viewCat={
        init: function(){
            this.counter = $('#counter');
            this.image = $('#image');
            this.name = $('#name');
            viewCat.event();
            viewCat.render();
        },
        render: function(){
            var activeCat = octopus.getActiveCat();
            this.counter.text( activeCat.clickCount);
            this.name.text( activeCat.name);
            this.image.attr('src', activeCat.image);
            
        },
        event: function(){
            this.image.click(function(){
                octopus.incCatCounter();
                
            });
        }
    };

    var viewAdmin={
        init: function(){
            this.catName=$('#catName');
            this.catImage=$('#catImage');
            this.catClickCount=$('#catClickCount');
            this.adminArea = $('#adminArea');
            octopus.setAdminVisible(false);
            this.adminBtn = $('#admin');
            this.event();
            this.render();

        },
        render: function () {
            var currentCat = octopus.getActiveCat();
            this.catName.val(currentCat.name);
            this.catImage.val(currentCat.image);
            this.catClickCount.val(currentCat.clickCount);
        },
        event: function(){
            this.adminBtn.click(function(){
                octopus.setAdminVisible(!octopus.isAdminVisible());
            });
            
            $('#adminForm').submit(function(e){
                octopus.updateCurrentCat(this.catName,this.catImage,this.catClickCount);
                octopus.setAdminVisible(false);
                e.preventDefault();  
            });
            $('#cancle').click(function(){
                octopus.setAdminVisible(false);
            });
        }

    };

    octopus.init();
});
