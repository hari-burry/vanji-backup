
import { StyleSheet,Text,Pressable,View } from "react-native";
export default function Header({mealChange}){



return(
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
);


}

const styles = StyleSheet.create({
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




})