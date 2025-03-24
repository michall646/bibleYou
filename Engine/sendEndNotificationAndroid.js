import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Alert } from 'react-native';
const sendEndNotificationAndroid = async (title,body) => {
  console.log('alert');
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    console.log({existingStatus})
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;

    }
    if (finalStatus !== 'granted') {
      Alert.alert('Failed to get push token for push notification!');
      console.log('alert');
      return;
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
    
    await Notifications.setNotificationChannelAsync('timerDone', {
      name: 'Timer',
      importance: Notifications.AndroidImportance.HIGH,
    });

    const notification = await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
      },
      trigger: null,
    });
    console.log(notification);
    }
    

export default sendEndNotificationAndroid