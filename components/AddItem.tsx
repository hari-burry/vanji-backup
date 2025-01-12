
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Platform,TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddItemComponent = ({setAdd,mealname,setBool}) => {
   const [foodname,setFoodname]=useState('');
  async function AddItem(){
    if(foodname){
      const itemName=foodname;
      const mealTime=mealname;
      try{
    const response=await fetch("http://192.168.1.6:3000/items",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({itemName,mealTime})
       

    })
    if (!response.ok) {
                  
      const errorData = await response.json();
      throw new Error(errorData.err || 'Failed to delete item');
      setBool(true);
    }

    const data = await response.json();
    console.log('Item addess:', data);
    
  } catch (error) {
    console.error('Error bro :(', error);
  
  }

  }
  else{
    console.log("empty");
  }
      
   }

  return (
    <View style={styles.container2}>
         <Text style={styles.textstyle}>Enter the Food Item</Text>
         <View style={styles.view}>
         <TextInput value={foodname} 
         onChangeText={text => setFoodname(text)}
         style={styles.input} placeholder='Enter name'></TextInput>
         
         </View>
         <View style={styles.buttonContainer}>
        <TouchableOpacity 
        onPressOut={()=>{
          AddItem();
          setAdd(false)}}
        style={styles.changeButton}>
          <Text style={styles.buttonText}>ADD ITEM</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressOut={()=>setAdd(false)}style={styles.cancelButton}>
          <Text style={styles.buttonText}>CANCEL</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    view:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        marginTop:8,
        

    },
    input:{
    paddingStart:5,    
    borderWidth:2,
    borderRadius:6,
    height:40,
    width:280,
  }, 
  input2:{
    borderWidth:2,
    borderRadius:6,
    paddingStart:5,
    height:40,
    width:100
  }, 
   textstyle:{
   fontSize:16,
   fontStyle:'normal',
   margin:'auto'
  },
  container2: {
    position: 'absolute',
    zIndex:100,
    top:'60%',
    left: '41%',
    transform: [{ translateX: -150 }, { translateY: -150 }],
    width: '93%',
    padding: 10,
    borderRadius: 15,
    backgroundColor: '#ffbe0b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  inputWrapper: {
    alignItems: 'center',
  },
  timeInput: {
    borderColor: '#FDE68A',
    backgroundColor: '#FDE68A',
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop:13,
  },
  changeButton: {
    backgroundColor: '#047857',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: '#DC2626',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddItemComponent;

