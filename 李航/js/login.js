var loginMod = (function(){
    function loginCheck(name,pwd,btn){
        $(btn).on('click',function(){
            if($(name).val() === 'fanfan' && $(pwd).val() === '123'){
                alert('登陆成功！');
                setInterval(function(){
                    window.location.href = './home.html';
                },500)
            }else{
                alert('账户名或密码错误！');
            }
        })
    }

    return{
        loginCheck:loginCheck
    }
}());