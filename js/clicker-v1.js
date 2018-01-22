$(function(){
    var currentNum = 1;
    var counters = [0, 0, 0, 0, 0];
    var names = ['Cat1', 'Cat2', 'Cat3', 'Cat4', 'Cat5'];
    var imgs = ['cat.jpg', 'cat2.jpg', 'cat3.jpg', 'cat4.jpg', 'cat5.jpg'];
    for (var i = 0; i < names.length; i++) {
        var elem = document.createElement('div');
        elem.textContent = names[i];
        //set cat space values
        elem.addEventListener('click', (function (catNum) {
            return function () {
                currentNum = catNum;
                document.getElementById('counter').textContent = counters[catNum];
                document.getElementById('name').textContent = names[catNum];
                document.getElementById('image').src = imgs[catNum];
            }
        })(i)
        );
        document.getElementById('catPicker').appendChild(elem);
    }
    document.getElementById('image').addEventListener('click', function () {
        counters[currentNum] += 1;
        document.getElementById('counter').textContent = counters[currentNum];
    })
});

