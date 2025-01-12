import { StyleSheet,FlatList,TouchableOpacity,View,Text } from "react-native";
import CustomSVG from '@/components/CustomSVG'

export default function MenuList({arr,setName,setDel,add,bftime}){




    return(
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
              
                  <CustomSVG></CustomSVG>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
        
      )}
    </View>
    );
}


const styles = StyleSheet.create({
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



});

