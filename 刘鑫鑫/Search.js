import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Dimensions, Image, ImageBackground } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign';
const ScreenWidth = Dimensions.get('window').width;
const screenScale = ScreenWidth / 640;
const styles = StyleSheet.create({
    positionStyle: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    navStyle: { width: "100%", height: 70 * screenScale, backgroundColor: '#212025' },
    iconStyle: { marginLeft: 40 * screenScale },
    textStyle: { marginLeft: 190 * screenScale, fontSize: 20, color: '#d8b865' },
    searchBox: { width: '75%', height: 300 * screenScale, backgroundColor: '#e1e1e1', marginTop: 30 * screenScale, borderRadius: 20 },
    titleImg: { width: '100%', height: 170 * screenScale, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
    searchLine: { width: '100%', height: 70 * screenScale, marginLeft: 30 * screenScale },
})
export default class Search extends Component {
    constructor() {
        super();
        this.state = {
            mysearch: []
        }
    }
    componentWillMount() {
        fetch('https://www.kkknet.cn/search', {
            method: "POST",
            body: JSON.stringify({
                iptData: this.props.content
            }),
            headers: {
                "Content-type": "application/json;charset=utf-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ mysearch: data }, () => {
                    //console.log(this.state.mysearch)
                });
            })
            .catch(error => {
                console.log(error)
            })
    }
    backPage = () => {
        Actions.pop()
    }
    goToDetail = (item)=>{
        Actions.detailSearch({content:item})
    }
    render() {
        return (
            <View>
                <View style={[styles.navStyle, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Icon onPress={this.backPage} style={styles.iconStyle} name="left" size={26} color="#d8b865" />
                    <Text style={styles.textStyle}>搜索结果</Text>
                </View>
                <ImageBackground source={require('../../img/timg.jpg')} style={{ opacity: 0.9, width: '100%', height: '100%' }}>
                    <View>
                        {
                            this.state.mysearch.map((item, idx) => (
                                <TouchableOpacity  onPress={()=>this.goToDetail(item)}>
                                    <View style={styles.positionStyle}>
                                        <View style={[styles.searchBox, { alignItems: 'center', justifyContent: 'center' }]} key={idx}>
                                            <Image style={styles.titleImg} alt='/' source={{ uri: item.titleImg }} />
                                            <View style={[{ width: '100%', height: 60 * screenScale, borderBottomWidth: 1, borderBottomColor: '#a3a3a6' }, styles.positionStyle]}>
                                                <Text style={{ fontSize: 18 }}>{item.title}</Text>
                                            </View>
                                            <View style={[styles.searchLine, { alignItems: 'center', flexDirection: 'row' }]}>
                                                <Image style={{ width: 60 * screenScale, height: 60 * screenScale, borderRadius: 30 }} source={{ uri: item.userImg }} />
                                                <Text style={{ marginLeft: 30 * screenScale, fontSize: 16 }}>{item.nickname}</Text>
                                                <Icon style={{ marginLeft: 90 * screenScale }} size={20} color={'red'} name='hearto' />
                                                <Text style={{ marginLeft: 20 * screenScale, fontSize: 16 }}>{item.menuNum}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
