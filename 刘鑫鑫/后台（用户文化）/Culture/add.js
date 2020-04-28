
$('#addImg').change(function(){
      var file = $('#addImg').get(0).files[0];
    //创建用来读取此文件的对象
      var reader = new FileReader();
    //使用该对象读取file文件
      reader.readAsDataURL(file);
    //读取文件成功后执行的方法函数
      reader.onload=function(e){
    //读取成功后返回的一个参数e，整个的一个进度事件
        console.log(e);
    //选择所要显示图片的img，要赋值给img的src就是e中target下result里面
    //的base64编码格式的地址
        $('#showImg').get(0).src = e.target.result;
      }
    })
$("#goNow").click(function(){
  window.location.href="./culture.html"  ;rel="external nofollow" ;  
})
$("#up").click(function(){
    var title=$("#addtitle").val();
    var culImg=$("#showImg")[0].src;
    var culCon=$("#addText").val();
    var isUp=confirm('确认提交吗？')
    if (isUp==true){
      if(title!=''&&culCon!=''&&culImg!=''){
        console.log("1");
        $.ajax({
          type: 'post',
          url: "https://www.kkknet.cn/addCulture",
          data:{
              title:title,
              culImg:culImg,
              culCon:culCon
          },
          dataType: "Json",
          success: function(data){
            alert(data.data)
          }
        })
      }else{
        alert('内容不能为空！')
      }
      
    }else{
      return false;
    }
    
});