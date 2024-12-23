import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import CustomHeader from '@/components/CustomHeader';
import io from 'socket.io-client';
import { AppProvider } from '../AppContext';


export default function StackLayout() {
  

  return (
    <AppProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="explore"
        options={{ header: (props) => <CustomHeader {...props} /> }}
      />
      <Stack.Screen
        name="Orders"
        options={{ header: (props) => <CustomHeader {...props} /> }}
      />
    </Stack>
    </AppProvider>
  );
}
