import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView,Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign'

var ScreenWidth = Dimensions.get('window').width;
var screenScale = ScreenWidth / 640;
const styles = StyleSheet.create({
    postionStyle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    navStyle: { width: "100%", height: 70 * screenScale, backgroundColor: 'rgb(255,150,173)' },
    iconStyle: { marginLeft: 40 * screenScale },
    textStyle: { marginLeft: 165 * screenScale, fontSize: 20, color: '#fff' },
    boxStyle: { marginLeft: 45 * screenScale, marginTop: 20 * screenScale, width: 550 * screenScale, height: 500 * screenScale },
    boxTextStyle:{width:'100%',height:80*screenScale,backgroundColor:'rgb(255,150,173)'},
    imgBoxStyle:{width:'100%',height:420*screenScale},
    imgStyle:{width:'100%',height:420*screenScale}
})
export default class CuisineContent extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            titleData: [],
            imgData: [],
        }
    }
    backPage = () => {
        Actions.pop();
    }
    componentDidMount() {
        var dataArray = this.props.content.contentImg.split('https');
        var dataNewArray = [];
        for (var i = 0; i < dataArray.length; i++) {
            if (dataArray[i] !== '') {
                var str = 'https' + dataArray[i]
                dataNewArray.push(str);
            }
        }
        this.setState({
            title: this.props.content.title,
            titleData: this.props.content.content.split('&'),
            imgData: dataNewArray
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {/* 头部返回栏 */}
                <View style={[styles.navStyle, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Icon onPress={this.backPage} style={styles.iconStyle} name="left" size={26} color="#fff" />
                    <Text style={styles.textStyle}>{this.state.title}</Text>
                </View>
                <ScrollView>
                    {
                        this.state.titleData.map((item, idx) =>
                            <View key={idx} style={styles.boxStyle}>
                                <View style={[styles.boxTextStyle,{ flexDirection: 'row', alignItems: 'center'}]}>
                                    <Text style={{paddingLeft:10*screenScale,fontSize:16,color:'#fff'}}>{item}</Text>
                                </View>
                                <View style={[styles.imgBoxStyle,styles.postionStyle]}>
                                    <Image style={styles.imgStyle} source={{uri:this.state.imgData[idx]}}/>
                                </View>
                            </View>
                        )
                    }
                </ScrollView>


            </View>
        )
    }
}
