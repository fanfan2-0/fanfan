var quanxianMod = (function(){
    function listShow(sp1,sp2,n,arr){
        $(sp1).on('click',function(){
            $(sp1).toggle()
            $(sp2).toggle();
            if(n === '1'){
                // console.log($('.quanxian-body')[0]);
                $($(arr[0])[0]).slideToggle();
                $($(arr[1])[0]).slideToggle();
                // $($('.quanxian-body')[n]).toggle()
            }else if(n === '2'){
                $($(arr[0])[1]).slideToggle();
                $($(arr[1])[1]).slideToggle();
            }
        });
        $(sp2).on('click',function(){
            $(sp2).toggle()
            $(sp1).toggle();
            if(n === '1'){
                // console.log($('.quanxian-body')[0]);
                $($(arr[0])[0]).slideToggle();
                $($(arr[1])[0]).slideToggle();
                // $($('.quanxian-body')[n]).toggle()
            }else if(n === '2'){
                $($(arr[0])[1]).slideToggle();
                $($(arr[1])[1]).slideToggle();
            }
        });
    }

    return{
        listShow:listShow
    }
}());