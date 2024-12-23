import { View, Text, TouchableOpacity, StyleSheet,Pressable } from 'react-native';

const CustomHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
       <View style={styles.btndiv}> 
      <Pressable 
      onPress={()=>navigation.navigate('explore')}
      style={({pressed})=>[
        styles.btn,
        pressed ? styles.btnpressed : null

      ]}>
        <Text style={styles.title}>Menu</Text>
      </Pressable>
      <Pressable 
     onPress={()=>navigation.navigate('Orders')}
      style={({pressed})=>[
        styles.btn,
        pressed ? styles.btnpressed : null

      ]}>
        <Text style={styles.title}>Orders</Text>
      </Pressable>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    backgroundColor: '#ffbe0b',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign:'center'
  },
  btndiv:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%'

  },
  btn:{
    width:'50%',
    justifyContent:'center',
    paddingBottom:3,
    borderBottomWidth:2,
    borderBottomColor:'transparent'
  },
  btnpressed:{
    borderBottomWidth:2,
    borderBottomColor:'black'
    
  }


});

export default CustomHeader;
