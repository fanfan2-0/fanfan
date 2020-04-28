import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'


var ScreenWidth = Dimensions.get('window').width;
var screenScale = ScreenWidth / 640;
const styles = StyleSheet.create({
    positionStyle: { flexDirection: 'row', alignItems: "center", justifyContent: 'center' },
    boxStyle: { width: 550 * screenScale, height: 260 * screenScale, marginLeft: 45 * screenScale, marginTop: 10 * screenScale, backgroundColor: '#fff', borderRadius: 10 },
    imgStyle: { width: 250 * screenScale, height: 260 * screenScale, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
    titleBoxStyle: { width: 300 * screenScale, height: 260 * screenScale, borderTopRightRadius: 10, borderBottomRightRadius: 10 },
    imgBoxStyle: { width: 250 * screenScale, height: 260 * screenScale, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 },
    textStyle: { color: 'gray', fontSize: 16 }
})
export default class CultureChina extends Component {
    constructor() {
        super();
        this.state = {
            culture: []
        }
    }
    componentDidMount() {
        fetch('https://www.kkknet.cn/culture').
            then((res) => res.json()).
            then(data => {
                this.setState({
                    culture: data
                }, () => {
                    //console.log(this.state.culture)
                })
            })
    }
    gotoPage = (item) => {
        Actions.cultureChinaContent({ msg: item })
    }
    render() {
        if (this.state.culture.length === 0) {
            return (
                <ActivityIndicator size='large' color='#fe9db2' />
            )
        } else {
            return (
                    <ScrollView>
                        <FlatList
                            data={this.state.culture}
                            renderItem={({ item }) =>
                                <View style={[styles.positionStyle, styles.boxStyle]}>
                                    {/* 图像部分 */}
                                    <View style={[styles.imgStyle, styles.positionStyle]}>
                                        <TouchableOpacity onPress={() => { this.gotoPage(item) }}>
                                            <Image style={styles.imgBoxStyle} source={{ uri: item.culImg }} />
                                        </TouchableOpacity>
                                    </View>
                                    {/* 文字部分 */}
                                    <TouchableOpacity onPress={() => { this.gotoPage(item) }}>
                                        <View style={[styles.titleBoxStyle, { alignItems: "center" }]}>
                                            <Text style={styles.textStyle}>{item.culTitle}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </ScrollView>
            )
        }
    }
}
