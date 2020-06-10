import React, { Component } from 'react';
import {Text, View, Dimensions, StyleSheet, ImageBackground, SafeAreaView,ScrollView ,Image} from 'react-native';
import Button from 'react-native-button';


const ScreenWidth = Dimensions.get('window').width;
const screenScale = ScreenWidth / 640;
const styles = StyleSheet.create({
    positionStyle: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    navBoxStyle: { width: '100%', height: 70 * screenScale, backgroundColor: '#212025' },
    textStyle: { color: "#d8b865", fontSize: 22 },
    button:{width:100,height:50,backgroundColor:'#90c1e3',color:'#fff',
    borderColor:'#ecbfde',borderWidth:2,borderRadius:10,alignItems:'center',
    justifyContent:'center',lineHeight:35,
},
    chooseBun:{ width:100,height:50,color:'#fff',
    borderColor:'#ecbfde',borderWidth:2,borderRadius:10,alignItems:'center',
    justifyContent:'center',lineHeight:35,backgroundColor:'#6b9aae'},
    buttonBox:{width:'33%',height:60,alignItems:'center',marginTop:10},
    well:{width:200,height:50,backgroundColor:'#90c1e3',color:'#fff',borderColor:'#ecbfde',borderWidth:2,borderRadius:10,alignItems:'center',justifyContent:'center',lineHeight:35},
    buttonLine:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:10,
        width:500,
        height:60,
        alignItems:'center'
    },
    chooseTag:{ justifyContent: 'center', alignItems: 'center', flex: 1 },
    chooseTags:{display:'none'},
    chooseResult:{justifyContent: 'center', alignItems: 'center', flex: 1},
    chooseResults:{display:'none'},
    itembox:{width:'100%',height:110,backgroundColor:'#3e3c3c',marginTop:10},
    itemLine:{flexDirection:'row',flex:1,width:500,height:75,justifyContent:'space-around',alignItems:'center'},
    cuiImg:{width:70,height:70},
    itemTitle:{width:500,height:30,color:'#fff',borderBottomColor:'#fff',borderBottomWidth:2},
    cuiTitle:{width:120,height:70,lineHeight:70,color:'#fff',fontSize:15},
    fan:{width:120,height:70,lineHeight:70,color:'#949191',fontSize:20},
    rig:{width:50,height:50,position:'absolute',right:10,top:35},
    buttonChoose:{width:200,height:50,backgroundColor:'#3e3c3c',color:'#fff',borderColor:'black',borderWidth:1,borderRadius:10,alignItems:'center',justifyContent:'center',lineHeight:35}

})
export default class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                hot: false,
                cold: false,
                soup: false,
                rice: false,
                drink: false,
                snack: false,
                baking: false,
                westfood: false,
                self: false
            },
            choose:{
                hot:false,
                cold: false,
                soup: false,
                rice: false,
                drink: false,
                snack: false,
                baking: false,
                westfood: false,
                self: false
            },
            isChoose: false,
            mymeun: []
        }
    }
    getClick = (e) => {
        console.log(e);
        console.log(this.state.data[e]);
        if (this.state.data[e] == false) {
            let obj = {};
            obj = this.state.data;
            obj[e] = true;
            let obj2 = {};
            obj2 = this.state.choose;
            obj2[e] = true;
            this.setState({
                data: obj,
                choose:obj2
            });
            console.log(e);
            console.log(this.state);
        } else {
            let obj = {};
            obj = this.state.data;
            obj[e] = false;
            let obj2 = {};
            obj2 = this.state.choose;
            obj2[e] = false;
            this.setState({
                data: obj,
                choose:obj2
            })
        }
        console.log(this.state)
    }
    goOther=(e)=>{
        var flag=0;
        var objs={};
        objs=this.state.data;
        for(let i in objs){
            if(objs[i]===true){
                flag=1;
                break;
            }
        }
        if(flag==1){
            console.log(1);
            fetch('https://www.kkknet.cn/create',{
                method:"POST",
            body:JSON.stringify({
                data : this.state.data
            }),
            headers:{
                "Content-type":"application/json;charset=utf-8"
            }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({mymeun:data});
                console.log(this.state.mymeun)
                console.log(1);
            })
            .catch(error => {
                console.log(error)
            })
    
            this.setState({
                isChoose:true
            })
        }else{
            alert('请选择相应菜系')
        }
       
    }
    goReturn = () => {
        this.setState({
            data: {
                hot: false,
                cold: false,
                soup: false,
                rice: false,
                drink: false,
                snack: false,
                baking: false,
                westfood: false,
                self: false
            },
            choose:{
                hot:false,
                cold: false,
                soup: false,
                rice: false,
                drink: false,
                snack: false,
                baking: false,
                westfood: false,
                self: false
            },
            isChoose: false,
            mymeun: []
        })
    }
    newShow = () => {
        fetch('/create', {
            method: "POST",
            body: JSON.stringify({
                data: this.state.data
            }),
            headers: {
                "Content-type": "application/json;charset=utf-8"
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ mymeun: data });
                console.log(this.state.mymeun)
                console.log(1);
            })
            .catch(error => {
                console.log(error)
            })
    }
    render() {
        return (
            <View>
                {/* 头部导航 */}
                <View style={[styles.positionStyle, styles.navBoxStyle]}>
                    <Text style={styles.textStyle}>定制饭饭</Text>
                </View>
                <View>
                    <ImageBackground source={require('../../img/cou2.jpg')} style={{  opacity: 0.9, width: '100%', height: '100%' }}>
                        <ScrollView>
                            <View style={this.state.isChoose?styles.chooseTags:styles.chooseTag}>
                                <View style={{ width: '100%', height: 300, justifyContent: 'center', alignItems: 'center', marginTop: 200 }}>
                                    <View style={styles.buttonLine}>
                                        <Button style={this.state.choose.hot?styles.chooseBun:styles.button} onPress={()=>{this.getClick('hot')}}>热菜</Button>
                                        <Button style={this.state.choose.cold?styles.chooseBun:styles.button } onPress={()=>{this.getClick('cold')}}>凉菜</Button>
                                        <Button style={this.state.choose.soup?styles.chooseBun:styles.button } onPress={()=>{this.getClick('soup')}}>汤类</Button>
                                    </View>
                                    <View style={styles.buttonLine}>
                                        <Button style={this.state.choose.rice?styles.chooseBun:styles.button } onPress={()=>{this.getClick('rice')}}>主食</Button>
                                        <Button style={this.state.choose.drink?styles.chooseBun:styles.button } onPress={()=>{this.getClick('drink')}}>饮品</Button>
                                        <Button style={this.state.choose.snack?styles.chooseBun:styles.button } onPress={()=>{this.getClick('snack')}}>小吃</Button>
                                    </View>
                                    <View style={styles.buttonLine}>
                                        <Button style={this.state.choose.cake?styles.chooseBun:styles.button } onPress={()=>{this.getClick('cake')}}>烘焙</Button>
                                        <Button style={this.state.choose.westfood?styles.chooseBun:styles.button } onPress={()=>{this.getClick('westfood')}}>西餐</Button>
                                        <Button style={this.state.choose.self?styles.chooseBun:styles.button } onPress={()=>{this.getClick('self')}}>自制冷饮</Button>
                                    </View>
                                </View>
                                <View style={{ width: '100%',justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                                    <Button style={styles.well} onPress={()=>this.goOther()}>我选好了！</Button>
                                </View>
                            </View>
                            <View style={this.state.isChoose?styles.chooseResult:styles.chooseResults}>
                                <View style={{width:'100%',height:500}}>
                                {
                                    this.state.mymeun.map((item,idx)=>(
                                        <View style={styles.itembox} key={idx}>
                                            <Text style={styles.itemTitle}>{item.cuisine}</Text>
                                            <View style={styles.itemLine}>
                                                <Text style={styles.cuiTitle}>{item.title}</Text>
                                                <Image alt='/' source={{uri:item.titleImg}} style={styles.cuiImg}></Image>
                                                <Text style={styles.fan}>fanfan定制</Text>
                                            </View>
                                            <Image alt='/' source={require('../../img/xiangyou2.png')} style={styles.rig}></Image>
                                        </View>
                                    ))
                                }
                                </View>
                                <View style={{width:'100%',flex:1,flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                                    <Button onPress={()=>this.newShow()} style={styles.buttonChoose}>重新生成</Button>
                                    <Button onPress={()=>this.goReturn()} style={styles.buttonChoose}>重新选择</Button>
                                </View>
                            </View>
                        </ScrollView>
                    </ImageBackground>
                </View>
            </View>
        )
    }
}
