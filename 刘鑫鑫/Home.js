import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, TextInput, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import Attention from './Attention';
import Find from './Find';
import Tab from '../tabs/Tab';
import CultureChina from '../cultureChina/CultureChina';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux'


var ScreenWidth = Dimensions.get('window').width;
var screenScale = ScreenWidth / 640;
const styles = StyleSheet.create({
    postionStyle: { flexDirection: "row", justifyContent: 'center', alignItems: "center" },
    searxhBoxStyle: { width: '100%', height: 80 * screenScale, backgroundColor: '#212025' },
    imgBoxStyle: { width: 65 * screenScale, height: 65 * screenScale, borderRadius: 50, marginLeft: 30 * screenScale },
    imgStyle: { width: 65 * screenScale, height: 65 * screenScale, borderRadius: 50 },
    textInpBoxStyle: { width: 420 * screenScale, height: 60 * screenScale, marginLeft: 25 * screenScale, borderRadius: 20 },
    iconBoxStyle: { width: 50 * screenScale, height: 50 * screenScale, marginLeft: 20 * screenScale },
    textInpStyle: { width: 420 * screenScale, height: 52 * screenScale, backgroundColor: 'rgb(230, 230, 230)', borderRadius: 20, fontSize: 14, paddingLeft: 25 * screenScale },
    lineStyle: { width: ScreenWidth / 4, height: 2, backgroundColor: '#d8b865' },
    textStyle: { fontSize: 16 },
    btnStyle: { width: ScreenWidth / 4, height: 20 * screenScale }
})
export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            searchContent: '',
            imgSource: '',
            flag:false
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('loginLocal').
            then(res => {
                if(res){
                    var msg = JSON.parse(res);
                    this.setState({
                        imgSource: msg.user_img
                    })
                }
            })
    }
    goSearch=()=>{
        Actions.search({content:this.state.searchContent});
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* 头部搜索框 */}
                <View style={[{ flexDirection: "row", alignItems: 'center' }, styles.searxhBoxStyle]}>
                    <View style={[styles.imgBoxStyle, styles.postionStyle]}>
                        <Image style={styles.imgStyle} source={{ uri: this.state.imgSource }} />
                    </View>
                    <View style={[styles.textInpBoxStyle, styles.postionStyle]}>
                        <TextInput style={styles.textInpStyle} placeholder='请搜索菜式、菜谱' onChangeText={(text) => this.setState({ searchContent: text })}></TextInput>
                    </View>
                    <TouchableOpacity onPress={()=>this.goSearch()}>
                        <View style={[styles.iconBoxStyle, styles.postionStyle]}>
                            <Icon name='search1' size={28} color='#d8b865' />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* 路由 */}
                <ScrollableTabView
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarTextStyle={styles.textStyle}
                    tabBarActiveTextColor='#d8b865'
                    tabBarInactiveTextColor='#fff'
                    tabBarBackgroundColor='#212025'
                    initialPage={1}
                >
                    <Button tabLabel='关注'><Attention /></Button>
                    <Button tabLabel='发现'><Find /></Button>
                    <Button tabLabel='菜式'><Tab /></Button>
                    <Button tabLabel='美食中国'><CultureChina /></Button>
                </ScrollableTabView>
            </View>

        )
    }
}
