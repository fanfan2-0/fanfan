import React, { Component } from 'react';
import {View, TextInput,TouchableOpacity,Text, FlatList, Image, StyleSheet, Dimensions,ToastAndroid} from 'react-native';

const {width} = Dimensions.get('window')

export default class nichen extends Component {
    constructor(){
        super();
        this.state={
            oldnickname:'',
            nickname:''
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
            this.setState({oldnickname:data[0].nickname});
        })
        .catch(error => {
            ToastAndroid.show(error)
        })
    }

    getchange(inputData){
        this.setState({nickname:inputData});
    }

    changeNick=()=>{
        if(this.state.nickname!==''){
            fetch('https://www.kkknet.cn/nickname',{
                method:"POST",
                body:JSON.stringify({
                    userId:'13582410275',
                    nickname : this.state.nickname
                }),
                headers:{
                    "Content-type":"application/json;charset=utf-8"
                }
            })
            .then(res => res.json())
            .catch(error => {
                ToastAndroid.show(error)
            })
            ToastAndroid.show('修改成功')
        }else{
            ToastAndroid.show('昵称不能为空')
        }
    }
    render() {
        return (
            <View>
                <View style={styles.view1}>
                    <Text style={{marginLeft:10}}>当前昵称</Text>
                    <Text style={{position:"absolute",right:10,color:'gray'}}>{this.state.oldnickname}</Text>
                </View>
                <View style={styles.view1}>
                    <TextInput placeholder='请输入您的新昵称' onChangeText={this.getchange}/>
                </View>
                <View style={{alignItems:"center",marginTop:30}}>
                    <TouchableOpacity style={styles.touch1} onPress={this.changeNick}>
                        <Text style={{color:'gray'}}>修改完成</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    view1:{
        flexDirection:"row",
        backgroundColor:'#fff',
        height:35,
        width:width,
        marginTop:2,
        alignItems:"center"
    },
    touch1:{
        backgroundColor:'rgb(255,150,173)',
        width:width*0.2,
        height:30,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:15
    }
})