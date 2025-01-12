import { StyleSheet,Text,View,TouchableOpacity } from "react-native";
import {Svg, Path,Circle } from 'react-native-svg';


export default function TimeCard({meal,setBftime,open,close,del,add}){




    return(
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
    );





}


const styles = StyleSheet.create({
    timecard:{
        marginTop:18,
        borderRadius:10,
        padding:8,
         width:370,
         margin:'auto',
         height:170,
         backgroundColor:'#ffbe0b',  
       },
       timenav:{

        justifyContent:'space-between',
        flexDirection:'row',
      },
      menutitle:{
        fontWeight:'bold',
        fontSize:20
      },
      timedisplayer:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
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
       svg:{
        width:30,
        height:30
       },
      



});


