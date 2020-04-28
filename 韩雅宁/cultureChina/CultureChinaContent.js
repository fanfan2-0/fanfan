import React, { Component } from 'react'
import { Text, View ,Dimensions,StyleSheet} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign'



var ScreenWidth = Dimensions.get('window').width;
var screenScale = ScreenWidth / 640;
const styles = StyleSheet.create({
    postionStyle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    navStyle: { width: "100%", height: 70 * screenScale, backgroundColor: 'rgb(255,150,173)' },
    iconStyle: { marginLeft: 40 * screenScale },
    textStyle: { marginLeft: 100* screenScale, fontSize: 20, color: '#fff' },
    contentStyle:{marginTop:'5%',width:'90%',marginLeft:'5%',marginRight:'5%',fontSize:16,letterSpacing:2,lineHeight:20,color:'#333'}
})
export default class CultureChinaContent extends Component {
    constructor(){
        super();
        this.state={
            title:'',
            content:''
        }
    }
    componentDidMount(){
        this.setState({
            title:this.props.msg.culTitle,
            content:this.props.msg.culCon
        })
        //console.log(this.props.msg)
    }
    backPage = ()=>{
        Actions.pop()
    }
    render() {
        return (
            <View>
                {/* 头部导航 */}
                <View style={[styles.navStyle, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Icon onPress={this.backPage} style={styles.iconStyle} name="left" size={26} color="#fff" />
                    <Text style={styles.textStyle}>{this.state.title}</Text>
                </View>
                {/* 底部介绍 */}
                <View>
                    <Text style={styles.contentStyle}>
                        {this.state.content}
                    </Text>
                </View>
            </View>
        )
    }
}
