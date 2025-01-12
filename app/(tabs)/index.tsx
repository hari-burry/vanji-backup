import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { View, Text, TextInput,Image } from 'react-native';
import burger from '../../assets/images/burger.png';
import { useState } from 'react';
import { useNavigation } from 'expo-router';
export default function HomeScreen() {
  const [pwd,setPwd]=useState('');
  const [red,setRed]=useState(false);
  const navigation=useNavigation();



  const changepwd=(text)=>{
    setPwd(text);
    setRed(false);
    if(text==='1234'){
      setRed(false);
      navigation.reset({
        index: 0,
        routes: [{ name: 'explore'
      }]});
      setPwd('');
    }
    else{
      if(text==='')setRed(false);
      else setRed(true);
    }

  }



  return (
    <View style={styles.container}>
      <View style={styles.box}>
      <Image
        source={burger}
        style={styles.img}

       />
      <View style={styles.inpdiv}>
        <Text style={red?styles.msg2:styles.msg}>{red?'Incorrect Passcode':'Enter your Passcode'}</Text>
      <TextInput 
      style={red? styles.inputred:styles.input} 
      keyboardType='numeric'
      value={pwd}
      onChangeText={changepwd}
      />
      </View>
      </View>

    </View>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor:'white',
    padding:16,              
  },
 
  input: {
    borderColor: 'black',
    borderWidth:2,
    width:'100%',             
    padding: 10,    
    borderRadius:5, 
    marginTop:2,     
  },
  inputred: {
    borderColor: 'red',
    borderWidth:2,
    width:'100%',             
    padding: 10,    
    borderRadius:5, 
    marginTop:2,     
  },
  inpdiv:{
    width:'94%',
    justifyContent: 'center', 
  },
  box:{
     width:'90%',
     height:'40%',
     justifyContent:'center',
     alignItems:'center'
  },

  msg:{
    marginLeft:2,
    fontSize:18,
  },
  msg2:{
    marginLeft:2,
    fontSize:18,
    color:'red'
  },
  img:{
    width:150,
    height:150,
    marginBottom:35,
  }

});