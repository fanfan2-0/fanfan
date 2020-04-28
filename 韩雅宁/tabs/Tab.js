import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
import TabContent from '../component/TabContent'


var ScreenWidth = Dimensions.get('window').width;
var screenScale = ScreenWidth / 640;
export default class Tab extends Component {
    render() {
        return (
            <View style={{width:'100%',height:'100%'}}>
                <ScrollableTabView
                    style={styles.container}
                    renderTabBar={() => <ScrollableTabBar />}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarTextStyle={styles.textStyle}
                    tabBarActiveTextColor='#fe9db2'
                    tabBarInactiveTextColor='#848484'

                >
                    <TouchableOpacity tabLabel='热菜'><TabContent title='热菜' /></TouchableOpacity>
                    <TouchableOpacity tabLabel='烘焙'><TabContent title='烘焙' /></TouchableOpacity>
                    <TouchableOpacity tabLabel='凉菜'><TabContent title='凉菜' /></TouchableOpacity>
                    <TouchableOpacity tabLabel='汤类'><TabContent title='汤类' /></TouchableOpacity>
                    <TouchableOpacity tabLabel='西餐'><TabContent title='西餐' /></TouchableOpacity>
                    <TouchableOpacity tabLabel='小吃'><TabContent title='小吃' /></TouchableOpacity>
                    <TouchableOpacity tabLabel='主食'><TabContent title='主食' /></TouchableOpacity>
                    <TouchableOpacity tabLabel='饮品'><TabContent title='饮品' /></TouchableOpacity>
                    <TouchableOpacity tabLabel='自制食材'><TabContent title='自制食材' /></TouchableOpacity>
                </ScrollableTabView>

            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: { width: '100%' },
    lineStyle: { width: ScreenWidth / 8, height: 2, backgroundColor: '#108ee9', marginLeft: 10 * screenScale },
    textStyle: { fontSize: 15 }
});