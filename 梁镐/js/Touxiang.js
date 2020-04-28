import React, { Component } from 'react';
import {View, TouchableOpacity,Text, Image,  Dimensions,ToastAndroid} from 'react-native';

const {width} = Dimensions.get('window')

export default class Touxiang extends Component {
    constructor(){
        super();
        this.state={
            userimg : '',
            files:'',
            base:''
        }
    }
    componentDidMount(){
        fetch('https://www.kkknet.cn/searchuser',{
            method:"POST",
            body:JSON.stringify({
                userid : '13582410275'
            }),
            headers:{
                "Content-type":"application/json;charset=utf-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({userimg:data[0].userImg});
        })
        .catch(error => {
            ToastAndroid.show(error)
        })
    }

    takePhotos = ()=>{
        ImagePicker.showImagePicker(options,(response)=>{
            if (response.didCancel) {
                return;
            } else if (response.error) {
                ToastAndroid.show('Error:', response.error);
            } else if (response.customButton) {
                ToastAndroid.show('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    files: source
                });
            }
        })
    }

    onChange = () => {
        let str=this.state.files.uri
        this.setState({
          base:str
        });
        if(this.state.base!==''){
            fetch('/header',{
                method:"POST",
            body:JSON.stringify({
                userId:'13582410275',
                userImg :str
            }),
            headers:{
                "Content-type":"application/json;charset=utf-8"
            }
            })
            .then(res => res.json())
            .catch(error => {
                ToastAndroid.show(error)
            })
            sessionStorage.setItem('userImg',str);
            ToastAndroid.show('修改成功')
        }else{
            ToastAndroid.show('昵称不能为空')
        }
    };
    render() {
        return (
            <View>
                <View style={{height:400,backgroundColor:'rgb(255,150,173)',alignItems:"center"}}>
                    <Image style={{height:width*0.4,width:width*0.4,borderRadius:width*0.2,marginTop:80}} source={{uri:this.state.userimg}}/>
                    <Text style={{color:'#fff',fontSize:20,marginTop:30}}>当前头像</Text>
                </View>
                <View style={{flexDirection:"row",alignItems:"center",marginTop:20}}>
                    <TouchableOpacity
                        style={{backgroundColor:'#fff',height:130,width:width*0.3,marginLeft:10}}
                        onPress={()=>this.takePhotos()}
                        onChange={()=>this.onChange()}
                    >
                        <Image style={{height:130,width:width*0.3}} source={require('../img/tianjia.png')} />
                    </TouchableOpacity>
                    <Text style={{color:'gray',marginLeft:width*0.1,marginRight:width*0.05}}>点击左侧按钮</Text>
                    <Image style={{height:130,width:width*0.3}} source={require('../img/click.png')}/>
                </View>
            </View>
        );
    }
}