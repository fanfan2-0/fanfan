import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'


var ScreenWidth = Dimensions.get('window').width;
var screenScale = ScreenWidth / 640;
const styles = StyleSheet.create({
    positionStyle: { flexDirection: 'row', alignItems: 'center', justifyContent: "center" },
    boxStyle: { width: 280 * screenScale, height: 290 * screenScale, backgroundColor: '#fff', marginLeft: 27 * screenScale, marginTop: 20 * screenScale,borderRadius:10 },
    btnStyle: { width: 280 * screenScale, height: 240 * screenScale },
    btnTextStyle: { width: 280 * screenScale, height: 50 * screenScale },
    imgStyle: { width: 280 * screenScale, height: 240 * screenScale,borderTopLeftRadius:10,borderTopRightRadius:10 },
    textStyle: { color: 'gray', fontSize: 16 }
})
export default class TabContent extends Component {
    constructor() {
        super();
        this.state = {
            dishData: [],
        }
    }
    componentDidMount() {
        fetch('https://www.kkknet.cn/cuisine').
            then(res => res.json()).
            then(data => {
                var dataArray = []
                for (var i = 0; i < data.length; i++) {
                    if (this.props.title === data[i].cuisine) {
                        dataArray.push(data[i])
                        this.setState({
                            dishData: dataArray
                        }, () => {
                            //console.log(this.state.dishData.length)
                        })
                    }
                }
            }).
            catch(err => {
                console.log(err);
            });
    }
    gotoDetail = (item) => {
        Actions.details({content:item});
    }
    render() {
        if (this.state.dishData.length === 0) {
            console.log(this.state.dishData)
            return (
                <ActivityIndicator size='large' color='#fe9db2' />
            )
        } else {
            return (
                <FlatList
                    numColumns={2}
                    data={this.state.dishData}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1 }}>
                            <View key={item} style={styles.boxStyle}>
                                <TouchableOpacity onPress={()=>{this.gotoDetail(item)}} style={[styles.btnStyle], styles.positionStyle}>
                                    <Image style={styles.imgStyle} source={{ uri: item.titleImg }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{this.gotoDetail(item)}} style={[styles.btnTextStyle, styles.positionStyle]}>
                                    <Text style={styles.textStyle}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                />
            )
        }
    }
}
