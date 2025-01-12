
import { StyleSheet, Image, Platform, Pressable,Text } from 'react-native';
import { View,TouchableOpacity,FlatList,KeyboardAvoidingView,TextInput } from 'react-native';
import {Svg, Path,Circle } from 'react-native-svg';
import TimeInputComponent from '@/components/TimeInputComponent';
import DelItemComponent from '@/components/DelItem';
import AddItemComponent from '@/components/AddItem';
import { useState } from 'react';
import { useEffect } from 'react';
import ItemsTable from '@/components/ItemsTable';
import BASE_URL from '@/config';
import io from 'socket.io-client';
import { ScrollView ,GestureHandlerRootView} from 'react-native-gesture-handler';
import Header from '@/components/Header';
import TimeCard from '@/components/TimeCard';
import MenuList from '@/components/MenuList';
import StatusBox from '@/components/StatusBox';

export default function Explore(){
  const [bftime,setBftime]=useState(false);
  const [open,setOpen]=useState('');
  const [close,setClose]=useState('');
  const [del,setDel]=useState(false);
  const [name,setName]=useState("");
  const [add,setAdd]=useState(false);
 const [arr,setArr]=useState([]);
 const [meal,setMeal]=useState([]);
 const [bool,setBool]=useState(false);
 const [sentence,setSent]=useState('');



 

 const socket=io("http://192.168.1.6:3000");
  useEffect(() => {
    
    socket.on("changes happened",(data)=>{
      console.log("CHANGES HAPPENED");
      console.log(data);
  })

    socket.emit("fullMealRequest","breakfast");

    socket.on("fullMealResponse",(data)=>{
       console.log(data);
       setArr(data.itemlist);
       setMeal(data);

    });

    fetch("http://192.168.1.6:3000/time?meal=breakfast")
      .then((response) => response.json())
      .then((data) => {
        console.log("Menu fetched:", data);
        setOpen(data[0].openingTime);
        setClose(data[0].closingTime);
        
      })
      .catch((error) => console.error("Error fetching menu:", error));
  }, []);

  function mealChange(name){
    fetch(`http://192.168.1.6:3000/time?meal=${name}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Menu fetched:", data);
        setOpen(data[0].openingTime);
        setClose(data[0].closingTime);
        
      })
      .catch((error) => console.error("Error fetching menu:", error));

    socket.emit("fullMealRequest",name);
    socket.on("fullMealResponse",(data)=>{
       setArr(data.itemlist);
       setMeal(data);
    })



  }





  function timesubmit(){
    const timejson={
      opening:open,
      closing:close,
      meal:`${meal.mealtime}`
    }
    console.log(timejson);
    fetch("http://192.168.1.6:3000/time",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(timejson)
    })
    .then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch(error => console.error("Error:", error));
    setBftime(false);
}


   



  return (
    
    <GestureHandlerRootView style={{ flex: 1 }}>
     <ScrollView>



      <Header mealChange={mealChange} ></Header>
      








      <TimeCard meal={meal} setBftime={setBftime} open={open} close={close} del={del} add={add}></TimeCard>

      
      



      
      
      {
        bftime && 
      <TimeInputComponent
      setBftime={setBftime}
      open={open}
      close={close}
      setOpen={setOpen}
      setClose={setClose}
      timesubmit={timesubmit}

      
      ></TimeInputComponent>
}

{bool && 
  <StatusBox
   bool={bool}
   sentence={sentence}
   setBool={setBool}
  >

  </StatusBox>
 

}




{
  del &&
   <DelItemComponent 
   name={name}
   setDel={setDel}
   mealname={meal.mealtime}
   setBool={setBool}
   >

   </DelItemComponent>
}



<View style={styles.view}>
<Text style={styles.menutitle2}>Menu</Text>
<TouchableOpacity
onPressOut={()=>{if(!del && !bftime)setAdd(true)}}
>
<Svg
        style={styles.icon2}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M3 10V18C3 19.1046 3.89543 20 5 20H11M3 10V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V10M3 10H21M21 10V13"
          stroke="#000000"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M17 14V17M17 20V17M17 17H14M17 17H20"
          stroke="#000000"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Circle cx="6" cy="7" r="1" fill="#000000" />
        <Circle cx="9" cy="7" r="1" fill="#000000" />
      </Svg>
      </TouchableOpacity>
</View>



    <MenuList arr={arr} setName={setName} setDel={setDel} add={add} bftime={bftime}></MenuList>






    {
      add &&
     <AddItemComponent  
      setAdd={setAdd}
      mealname={meal.mealtime}
      setBool={setBool}
      >

     </AddItemComponent>

    }




     </ScrollView>
     </GestureHandlerRootView>
  );
}



const styles = StyleSheet.create({
  overall:{
    marginTop:5,
    padding:4
},
   view:{
     flexDirection:'row',
     justifyContent:'space-between',
     paddingHorizontal:10,
     alignItems:'center',
     marginTop:15,
     padding:4
   },
   navbar:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    height:50,
    alignItems:'center',
    paddingTop:4
   },
   menubtn:{
     backgroundColor:'#ffbe0b',
     borderRadius:50,
     padding:8,
     justifyContent:'center',
     alignItems:'center',
     width:120,
     borderWidth:1,
     borderColor:'transparent'

   },
   menubtnpressed:{
    borderColor:'black'
     
   },
   menubtntext:{
      fontSize:15,
      fontWeight:"bold"
   },

   timecard:{
    marginTop:18,
    borderRadius:10,
    padding:8,
     width:370,
     margin:'auto',
     height:170,
     backgroundColor:'#ffbe0b',  
   },
   menutitle:{
     fontWeight:'bold',
     fontSize:20
   },
   menutitle2:{
    fontWeight:'bold',
    fontSize:30,
  },
   timenav:{

     justifyContent:'space-between',
     flexDirection:'row',
   },
   timedisplayer:{
    flexDirection:'row',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
   },
   svg:{
    width:30,
    height:30
   },
   timeinddis:{
    flex:1,
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
   },
   time:{
     fontWeight:'bold',
     fontSize:40
   },
   timetext:{
     borderWidth:1,
     borderColor:'#ffbe0b',
     marginTop:2,
     fontSize:17
   },
   container: {
    padding: 16,
    zIndex:0
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cellLeft: {
    flex: 1,
    paddingHorizontal: 8,
    textAlign: 'left',
  },
  cellCenter: {
    flex: 1,
    paddingHorizontal: 8,
    textAlign: 'center',
  },
  button: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: 'transparent', // Set appropriate background color
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24, // Size of your icon
  },
  icon2: {
    backgroundColor:'transparent', // Example active effect for bg-gray-200
    borderRadius: 8,
    width: 45,
    height: 45,
  },
  
});
