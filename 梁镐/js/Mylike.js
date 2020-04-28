import React, { Component } from 'react';
import {View, Text, FlatList, Image, StyleSheet, Dimensions,ToastAndroid} from 'react-native';

const {width} = Dimensions.get('window')

export default class Mylike extends Component {
    constructor(){
        super();
        this.state={
            myselfData:[{likes:[]}],
        }
    } 
    componentDidMount(){
        fetch('https://www.kkknet.cn/myself',{
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
            this.setState({myselfData:data});
        })
        .catch(error => {
            ToastAndroid.show(error)
        })
    }
    render() {
        return (
            <View>
                <FlatList
                    numColumns={2}
                    data={this.state.myselfData[0].likes}
                    renderItem={
                        ({item})=>
                            <View style={styles.view2}>
                                <Image style={styles.img1} source={{uri:item.titleImg}} />
                                <View style={styles.view1}>
                                    <Text>{item.title}</Text>
                                    <Image style={styles.img2} source={require('../img/xihuan.png')}/>
                                    <Text style={{color:'rgb(235, 74, 74)',position: 'absolute',right: 5}}>{item.menuNum}</Text>
                                </View>
                            </View>
                    }
                ></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view1:{
        flexDirection:"row",
        alignItems:"center",
        height:30
    },
    view2:{
        marginLeft:width*0.05,
        marginRight:width*0.05,
        marginTop:10,
        backgroundColor:'#fff',
        height:130,
        borderRadius:10
    },
    img1:{
        width:width*0.4,
        height:100
    },
    img2:{
        width:13,
        height:13,
        position: 'absolute',
        right: 45
    }
})