import { View } from "react-native-web";
import { StyleSheet } from "react-native";


export default function StatusBox({bool,sentence,setBool}){
      
    return(
        
        <View>
    
            <Text>
                {sentence}
            
            </Text>
            <button onClick={()=>setBool(false)}>OKAY</button>
            
        </View>
        
    );
}

const styles = StyleSheet.create({
      card:{
        

      },



});

