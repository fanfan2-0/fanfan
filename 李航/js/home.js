var homeMod = (function(){
    function leftSlide(classname,classname1){
        for(var i = 0;i < $(classname).length;i++){
            (function(j){
                $($(classname)[j]).on('click',function(){
                    $('.title-list'+(j+1)).slideToggle();
                    $($(classname)[j]).toggle();
                    $($(classname1)[j]).toggle();
                });
                $($(classname1)[j]).on('click',function(){
                    $('.title-list'+(j+1)).slideToggle();
                    $($(classname1)[j]).toggle();
                    $($(classname)[j]).toggle();
                });
            })(i);
        }
    }

    function listCheck(classname,arr){
        var len = $(classname+' '+'li').length;
        for(var i = 0;i < len;i++){
            (function(j,length){
                $($(classname+' '+'li')[j]).on('click',function(){
                    for(var k = 0;k < length;k++){
                        $($(classname+' '+'li')[k]).css('background','rgb(128,128,128,0.3)').css('color','black');
                    }
                    $($(classname+' '+'li')[j]).css('background','rgb(255,99,71,0.5)').css('color','rgb(218, 218, 218)');
                    for(var m = 0;m < length;m++){
                        $(arr[m]).hide();
                    }
                    switch(j){
                        case 0:
                            $(arr[j]).show();
                            break;
                        case 1:
                            $(arr[j]).show();
                            break;
                        case 2:
                            $(arr[j]).show();
                            break;
                        case 3:
                            $(arr[j]).show();
                            break;
                        case 4:
                            $(arr[j]).show();
                            break;
                    }
                });
            })(i,len);
        }
    }

    return{
        leftSlide:leftSlide,
        listCheck:listCheck
    }
}());