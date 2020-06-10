import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, TextInput, TouchableOpacity,Image, AsyncStorage ,ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'react-native-button';
import ImagePicker from 'react-native-image-picker';


const ScreenWidth = Dimensions.get('window').width;
const screenScale = ScreenWidth / 640;
const styles = StyleSheet.create({
    positionStyle: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    navBoxStyle: { width: '100%', height: 70 * screenScale, backgroundColor: '#212025' },
    textStyle: { color: "#d8b865", fontSize: 22 },
    addTitle: { width: '100%', height: 50, backgroundColor: '#fff', marginTop: 10 },
    addImge: { width: 100, height: 100, borderWidth: 1, borderColor: '#212025', textAlign: 'center', justifyContent: 'center', alignItems: 'center', marginLeft: 20 },
    imgBox: { width: '100%', height: 150, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    addEve: { width: 500, height: 100, backgroundColor: '#fff', textAlignVertical: 'top' },
    addMsg: { width: 500, height: 200, backgroundColor: '#fff', justifyContent: 'flex-start', textAlignVertical: 'top', },
    addImgs: { width: '100%', height: 150, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    navTitle: { color: '#9aacf9', fontSize: 20, fontFamily: '楷体' },
    add: { width: 150, height: 50, backgroundColor: 'red', color: '#fff', justifyContent: 'center', marginTop: 10, borderRadius: 10, lineHeight: 40 }
})

const options = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const option = {
    title: '请选择',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '选择相册',
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class Publish extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            dishes: '',
            doingWay: '',
            avatarSource:null,
            avatarSources:null
        }
    }
    takePhoto = () => {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    takePhotos = ()=>{
        ImagePicker.showImagePicker(option, (response) => {
            if (response.didCancel) {
                return;
            } else if (response.error) {
                console.log('Error:', response.error);
            } else if (response.customButton) {
                console.log('custom:', response.customButton);
            } else {
                
                const source = { uri: response.uri };
                console.log(response.uri);
                this.setState({
                    avatarSources: source,
                });
            }
        });
    }
    publish = ()=>{
        AsyncStorage.getItem('loginLocal').
        then(res=>{
            if(res){
                var msg = JSON.parse(res);
                // console.log(this.state.avatarSource,this.state.avatarSources)
                fetch('https://www.kkknet.cn/release',{
                    method:'POST',
                    body:JSON.stringify({
                        userId: msg.user_id,
                        title:this.state.title, 
                        titleImg:this.state.avatarSource,       
                        content:this.state.doingWay,
                        contentImg:this.state.avatarSources
                    }),
                    headers:{
                        "Content-type":'application/json;charset=utf-8'
                    }
                })
                ToastAndroid.showWithGravity('上传成功', ToastAndroid.SHORT, 0, 0, 0);
            }
        })
    }
    render() {
        return (
            <View>
                {/* 头部位置 */}
                <View style={[styles.positionStyle, styles.navBoxStyle]}>
                    <Text style={styles.textStyle}>发布</Text>
                </View>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <View style={{ width: '100%', height: 1000, backgroundColor: '#f2f7f2', paddingTop: 10 }}>
                            <View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Icon color='#8799e7' size={25} name="star-half-full" />
                                <Text style={styles.navTitle}>标题</Text>
                            </View>
                            <TextInput onChangeText={(text) => { this.setState({ title: text }) }} style={styles.addTitle} placeholder='请设置标题'></TextInput>
                            <View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Icon color='#8799e7' size={25} name="star-half-full" />
                                <Text style={styles.navTitle}>菜谱封面</Text>
                            </View>
                            <View style={styles.imgBox}>
                                <View style={{ justifyContent: 'center', width: 120 }}><Text style={{ color: '#9f9f9f' }}>请设置封面</Text></View>
                                <TouchableOpacity
                                    style={styles.addImge}
                                    placeholder='+'
                                    onPress={() => { this.takePhoto() }}
                                >
                                    <Text style={{ fontSize: 20, color: '#212025' }}>+</Text>
                                </TouchableOpacity>
                                {
                                    this.state.avatarSource === null ? <Image style={styles.addImge} source={require('../../img/meal.gif')}/>
                                    :
                                    <Image style={styles.addImge} source={this.state.avatarSource}/>
                                }
                                
                            </View>
                            <View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Icon color='#8799e7' size={25} name="star-half-full" />
                                <Text style={styles.navTitle}>配料</Text>
                            </View>
                            <View style={{ width: '100%', height: 100, backgroundColor: '#fff', marginTop: 10 }}>
                                <TextInput onChangeText={(text)=>{this.setState({dishes:text})}} style={styles.addEve} placeholder='请输入配料' multiline={true}></TextInput>
                            </View>
                            <View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Icon color='#8799e7' size={25} name="star-half-full" />
                                <Text style={styles.navTitle}>步骤</Text>
                            </View>
                            <View style={{ width: '100%', height: 200, backgroundColor: '#fff', marginTop: 10 }}>
                                <TextInput onChangeText={(text)=>{this.setState({doingWay:text})}} style={styles.addMsg} placeholder='请输入步骤' multiline={true}></TextInput>
                            </View>
                            <View style={{ width: '100%', height: 30, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                <Icon color='#8799e7' size={25} name="star-half-full" />
                                <Text style={styles.navTitle}>步骤图片</Text>
                            </View>
                            <View style={styles.imgBox}>
                                <View style={{ justifyContent: 'center', width: 120 }}><Text style={{ color: '#9f9f9f' }}>请添加步骤图片</Text></View>
                                <TouchableOpacity
                                    style={styles.addImge}
                                    placeholder='+'
                                    onPress={() => this.takePhotos()}
                                >
                                    <Text style={{ fontSize: 20, color: '#212025' }}>+</Text>
                                </TouchableOpacity>
                                {
                                    this.state.avatarSources === null ? <Image style={styles.addImge} source={require('../../img/meals.jpg')}/>
                                    : <Image style={styles.addImge} source={this.state.avatarSources}/>
                                }
                            </View>
                            <TouchableOpacity onPress={this.publish} style={{ width: 350 * screenScale, height: 60 * screenScale, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: '#212025', marginTop: 20 * screenScale, borderRadius: 20, marginLeft: 130 * screenScale }}>
                                <Text style={{ color: '#d8b865' }}>确认上传</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}
