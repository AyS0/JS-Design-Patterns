$(function(){
    
    var model = {
        //init cats objects 
        init: function(){
            this.cats=[
                { name: 'Cat 1', image: 'image/cat.jpg' , clickCount: 0, active: true },
                { name: 'Cat 2', image: 'image/cat2.jpg', clickCount: 0, active: false },
                { name: 'Cat 3', image: 'image/cat3.jpg', clickCount: 0, active: false },
                { name: 'Cat 4', image: 'image/cat4.jpg', clickCount: 0, active: false },
                { name: 'Cat 5', image: 'image/cat5.jpg', clickCount: 0, active: false }
            ];   
        },
        getAllCats: function(){
            return this.cats;
        },
        //return active cat object
        getActive: function(){
            //var active is an array of all active cats
            var activeCats = this.cats.filter(function(cat) {
                if(cat.active){
                    return cat;
                }
            });
            return activeCats[0];
        },
        setActive: function(index){
            this.cats.forEach(function(cat){
                cat.active=false;
            });
            this.cats[index].active=true;
        },
        //increment counter for active cat
        inc: function(){
            model.getActive().clickCount += 1;
        }
        
    };


    var octopus={
        init: function(){
            model.init();
            viewList.init(); 
            viewCat.init();
              
        },
        getCats: function(){
           return model.getAllCats();
        },
        getActiveCat: function(){
            return model.getActive();
        },
        setActiveCat:function(catIndex){
            model.setActive(catIndex);
        },
        incCatCounter: function(){
            model.inc();
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
                        viewCat.render();
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
                viewCat.render();
            });
        }
    };

    octopus.init();
});
