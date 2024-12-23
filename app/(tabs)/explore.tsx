
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

export default function Explore(){
  const [bftime,setBftime]=useState(false);
  const [open,setOpen]=useState(`XX:XX`);
  const [close,setClose]=useState(`XX:XX`);
  const [del,setDel]=useState(false);
  const [name,setName]=useState("");
  const [add,setAdd]=useState(false);
 const [arr,setArr]=useState([]);
 const [meal,setMeal]=useState([]);

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
      <View style={styles.navbar}>
        <Pressable style={({pressed})=>[
         styles.menubtn,
         pressed?styles.menubtnpressed:null
      ]}
      onPress={()=>mealChange("breakfast")}
      >
          <Text style={styles.menubtntext}>Breakfast</Text>
        </Pressable>
        <Pressable style={({pressed})=>[
         styles.menubtn,
         pressed?styles.menubtnpressed:null
      ]}
       onPress={()=>mealChange("lunch")}
      >
        <Text style={styles.menubtntext}>Lunch</Text>
        </Pressable>
        <Pressable style={({pressed})=>[
         styles.menubtn,
         pressed?styles.menubtnpressed:null
      ]}
      onPress={()=>mealChange("dinner")}
      >
        <Text style={styles.menubtntext}>Dinner</Text>
        </Pressable>
      </View>
      
      <View style={styles.timecard}>
        <View style={styles.timenav}> 
         <Text style={styles.menutitle}>{meal.mealtime}</Text>
         <TouchableOpacity onPress={()=>{if(!del && !add)
          setBftime(true)}}>
         <Svg  style={styles.svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
        stroke="#000000" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        <Path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
        stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
        </TouchableOpacity>
         </View>

         <View style={styles.timedisplayer}>
          <View style={styles.timeinddis}>
          <Text style={styles.time}>{open}</Text>
          <Text style={styles.timetext}>Opening Time</Text>
          </View>
          <View style={styles.timeinddis}>
          <Text style={styles.time}>{close}</Text>
          <Text style={styles.timetext}>Closing Time</Text>
          </View>


         </View>
      </View>
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

{
  del &&
   <DelItemComponent 
   name={name}
   setDel={setDel}
   mealname={meal.mealtime}
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
<View style={styles.container}>
  
      {arr.length > 0 && (
        <FlatList
          data={arr}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.cellLeft}>{item.itemName}</Text>
              <Text style={styles.cellCenter}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => {
                  if(!add && !bftime){
                  setName(item.itemName)
                  setDel(true);
                  

                  }
                  
                }}
                style={styles.button}
              >
                <View style={styles.iconContainer}>
              
                  <Text  style={styles.icon}>🗑️</Text> 
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        
      )}
    </View>

    {
      add &&
     <AddItemComponent  
      setAdd={setAdd}
      mealname={meal.mealtime}
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


