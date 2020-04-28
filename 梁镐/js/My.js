import React, { Component } from 'react';
import {View, Text, FlatList, Image, StyleSheet, Dimensions,ToastAndroid,TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux'

const {width} = Dimensions.get('window')

export default class My extends Component {
    constructor(){
        super();
        this.state={
            myselfData: [{fans:[],following:[],likes:[]}],
            menuData:[],
            userimg:'',
            nickname:''
        }
    }
    componentDidMount(){
        fetch('https://www.kkknet.cn/myself',{
            method:"POST",
            body:JSON.stringify({
                userId:'13582410275'
            }),
            headers:{
                "Content-type":"application/json;charset=utf-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({myselfData:data});
        })
        .catch(error => {
            ToastAndroid.show(error)
        })

        fetch('https://www.kkknet.cn/mymenu',{
            method:"POST",
        body:JSON.stringify({
            userId : '13582410275'
        }),
        headers:{
            "Content-type":"application/json;charset=utf-8"
        }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({menuData:data});
         
        })
        .catch(error => {
            ToastAndroid.show(error)
        })

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
            this.setState({nickname:data[0].nickname});
        })
        .catch(error => {
            ToastAndroid.show(error)
        })
    }
    tiaozhuan = (index) =>{
        if(index==0 || index==3){
            Actions.fans();
        }else if(index==1 || index== 4){
            Actions.following();
        }else if(index==2 || index==5){
            Actions.mylike();
        }
    }
    render() {
        return (
            <View>
                <View style={styles.view1}>
                    <View style={{alignItems:"center"}}>
                        <TouchableOpacity style={styles.img1} onPress={()=>Actions.shezhi()}>
                            <Image style={styles.img1} source={require('../img/shezhi.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:160,alignItems:"center"}}>
                        <Image style={styles.img2} source={{uri:this.state.userimg}}/>
                        <Text style={{color:'#fff',marginTop:15,fontSize:18}}>{this.state.nickname}</Text>
                    </View>
                </View>
                <View>
                    <View style={{backgroundColor:'#fff',marginTop:20,height:50}}>
                    <FlatList
                        numColumns={3}
                        data={[this.state.myselfData[0].fans.length,
                            this.state.myselfData[0].following.length,
                            this.state.myselfData[0].likes.length,
                            "粉丝","关注","赞过"]}
                        renderItem={
                            ({item,index})=>
                                <TouchableOpacity onPress={()=>this.tiaozhuan(index)}>
                                    <View style={{justifyContent:"center",alignItems:"center",width:width/3,paddingTop:4}}>
                                        <Text style={{color:'rgb(255,150,173)'}}>{item}</Text>
                                    </View>   
                                </TouchableOpacity>
                        }
                    ></FlatList>
                    </View>
                </View>
                <View style={styles.view2}>
                    <View style={{height:40,justifyContent:"center"}}>
                        <Text style={{color:'rgb(255,150,173)',marginLeft:10}}>>>&nbsp;&nbsp;我的发布</Text>
                    </View>
                    <View>
                        <FlatList
                            numColumns={1}
                            data={this.state.menuData}
                            renderItem={
                                ({item})=>
                                    <View style={{marginBottom:2,alignItems:"center",width:width,borderTopColor:'rgb(255,150,173)',borderTopWidth:1,flexDirection:'row'}}>
                                        <Image style={styles.img3} source={{uri:item.titleImg}}/>
                                        <Text>{item.title}</Text>
                                        <View style={{alignItems:"center",flexDirection:"row",position:"absolute",right:10}}>
                                            <Image style={styles.img4} source={require('../img/my_like.png')}/>
                                            <Text>{item.menuNum}</Text>
                                        </View>
                                    </View>   
                            }
                        ></FlatList>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    img1:{
        height:20,
        width:20,
        position:"absolute",
        right:5,
        top:5
    },
    img2:{
        height:80,
        width:80,
        borderRadius:40,
        marginTop:30
    },
    img3:{
        height:50,
        width:100,
        marginRight:10
    },
    img4:{
        height:13,
        width:13,
        marginRight:5
    },
    view1:{
        backgroundColor:'rgb(255,150,173)'
    },
    view2:{
        backgroundColor:'#fff',
        width:width,
        marginTop:20
    }
})