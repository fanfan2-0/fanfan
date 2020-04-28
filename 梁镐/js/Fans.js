import React, { Component } from 'react';
import {View, Text, FlatList, Image, StyleSheet, Dimensions,ToastAndroid} from 'react-native';

const {width} = Dimensions.get('window')

export default class Fans extends Component {
    constructor() {
        super();
        this.state={
            myselfData:[{fans:[]}],
        }
    }
    componentDidMount(){
        fetch('https://www.kkknet.cn/myself',{
            method:"POST",
        body:JSON.stringify({
            userId : '13582410270'
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
                    numColumns={1}
                    data={this.state.myselfData[0].fans}
                    renderItem={
                        ({item})=>
                        <View style={{alignItems:"center"}}>
                            <View style={styles.flatlistview}>
                                <Image style={{height:30,width:30,borderRadius:15,marginRight:10}} source={{uri:item.userImg}}/>
                                <Text>{item.nickname}</Text>
                            </View>
                        </View>
                    }
                ></FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatlistview:{
        flexDirection:"row",
        alignItems:"center",
        height:50,
        width:width*0.8,
        borderBottomColor:'#e88686',
        borderBottomWidth:1
    }
})