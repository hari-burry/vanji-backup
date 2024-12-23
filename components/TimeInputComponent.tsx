import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimeInputComponent = ({ setBftime, timesubmit,open,close,setOpen,setClose }) => {
  const [openTime, setOpenTime] = useState(new Date());
  const [closeTime, setCloseTime] = useState(new Date());
  const [isOpenPickerVisible, setIsOpenPickerVisible] = useState(false);
  const [isClosePickerVisible, setIsClosePickerVisible] = useState(false);


  const showOpenPicker = () => setIsOpenPickerVisible(true);
  const showClosePicker = () => setIsClosePickerVisible(true);

  const onOpenTimeChange = (event, selectedDate) => {
    setIsOpenPickerVisible(Platform.OS === 'ios');
    if (selectedDate) {
      setOpenTime(selectedDate);
     const hours=selectedDate.getHours()<10?'0'+selectedDate.getHours():selectedDate.getHours();
     const minutes=selectedDate.getMinutes()<10?'0'+selectedDate.getMinutes():selectedDate.getMinutes();
      setOpen(`${hours}:${minutes}`);
    }
  };

  const onCloseTimeChange = (event, selectedDate) => {
    setIsClosePickerVisible(Platform.OS === 'ios');
    if (selectedDate) {
      setCloseTime(selectedDate);
      const hours=selectedDate.getHours()<10?'0'+selectedDate.getHours():selectedDate.getHours();
     const minutes=selectedDate.getMinutes()<10?'0'+selectedDate.getMinutes():selectedDate.getMinutes();
      setClose(`${hours}:${minutes}`);

    }
  };

  return (
    <View style={styles.container2}>
      <View style={styles.timeContainer}>
        <View style={styles.inputWrapper}>
          <Text>Enter opening time</Text>
          <TouchableOpacity style={styles.timeInput} onPress={showOpenPicker}>
            <Text>{openTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          {isOpenPickerVisible && (
            <DateTimePicker
              value={openTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onOpenTimeChange}
            />
          )}
        </View>
        <View style={styles.inputWrapper}>
          <Text>Enter closing time</Text>
          <TouchableOpacity style={styles.timeInput} onPress={showClosePicker}>
            <Text>{closeTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
          </TouchableOpacity>
          {isClosePickerVisible && (
            <DateTimePicker
              value={closeTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onCloseTimeChange}
            />
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.changeButton} onPress={timesubmit}>
          <Text style={styles.buttonText}>Change</Text>
        </TouchableOpacity>
        <TouchableOpacity onPressOut={()=>setBftime(false)} style={styles.cancelButton} onPress={() => setBftime(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 20,
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

export default TimeInputComponent;
