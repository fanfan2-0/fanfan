import React, { Component } from 'react';
import {View, TouchableOpacity,Text, StyleSheet, Dimensions} from 'react-native';
import {Actions} from 'react-native-router-flux'

const {width} = Dimensions.get('window')

export default class Shezhi extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={()=>Actions.touxiang()}>
                    <View style={styles.view1}>
                        <Text style={styles.text1}>修改头像</Text>
                        <Text style={styles.text2}>></Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Actions.nichen()}>
                    <View style={styles.view1}>
                        <Text style={styles.text1}>修改昵称</Text>
                        <Text style={styles.text2}>></Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    view1:{
        flexDirection:"row",
        height:30,
        width:width,
        backgroundColor:'#fff',
        marginTop:2,
        alignItems:"center"
    },
    text1:{
        marginLeft:10,
        fontSize:15
    },
    text2:{
        position:"absolute",
        right:20
    }
})