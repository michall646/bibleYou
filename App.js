
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState, useMemo, StrictMode, useCallback } from 'react';
import firstTimeLaunch from './Engine/firstTimeLaunch';
import { useTranslation} from "react-i18next";
import './Translation/i18n'
import { PaperProvider, MD3LightTheme, MD3DarkTheme,adaptNavigationTheme} from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { generatedTheme } from './Engine/GeneratedThemes';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import Tabs from './Components/Tabs';
import * as SplashScreen from 'expo-splash-screen';
import {  useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import {OpenSans_400Regular } from '@expo-google-fonts/open-sans';
import { Merriweather_400Regular } from "@expo-google-fonts/merriweather";
import { PTSerif_400Regular } from "@expo-google-fonts/pt-serif";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 100,
  fade: true,
});
SplashScreen.hide();

export default function App() {
  const { t, i18n } = useTranslation();
  const [settings, setSettings] = useState({ darkMode: "light", themeIndex: 5, isAutoTheme: false, pomodoriLength: 1000, shortBreakLength:  300, longBreakLength:  1000, goal: 1800, check: false});
  const [statistics, setStatistics] = useState([])
  const [currentBook, setCurrentBook] = useState(0);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [currentVerse, setCurrentVerse] = useState(0);
  const [materialTheme, setMaterialTheme] = useState(
    useMaterial3Theme({ fallbackSourceColor: "#3400e0" }).theme
  );
  const [autoColorScheme, setColorScheme] = useState(useColorScheme());
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    OpenSans_400Regular,
    Merriweather_400Regular,
    PTSerif_400Regular

})


  const colorScheme =
    settings.darkMode === "auto"
      ? autoColorScheme
      : settings.darkMode;

  const capitalizeFirstLetter =useCallback((string) => {
    return string?.charAt(0).toUpperCase() + string.slice(1);
  }, [])

  const paperTheme = useMemo(() => {
    if (colorScheme === "dark") {
      if (settings.autoColor) {
        return { ...MD3DarkTheme, colors: materialTheme.dark };
      } else {
        return {
          ...MD3DarkTheme,
          colors:
            generatedTheme[settings.themeIndex][
              capitalizeFirstLetter(colorScheme)
            ].colors,
        };
      }
    } else {
      if (settings.autoColor) {
        return { ...MD3DarkTheme, colors: materialTheme.light };
      } else {
        return {
          ...MD3DarkTheme,
          colors:
            generatedTheme[settings.themeIndex][
              capitalizeFirstLetter(colorScheme)
            ].colors,
        };
      }
    }
  }, 
  [
    colorScheme,
    materialTheme,
    settings.themeIndex,
    settings.autoColor,
  ]);
  const navigationTheme = useMemo(() =>
    colorScheme === "dark"
      ? adaptNavigationTheme({
          reactNavigationDark: MD3DarkTheme,
          materialDark: paperTheme,
        }).DarkTheme
      : adaptNavigationTheme({
          reactNavigationLight: MD3LightTheme,
          materialLight: MD3LightTheme,
        }).LightTheme[paperTheme]
  , [
    colorScheme,
    materialTheme,
    settings.themeIndex,
    settings.autoColor,
  ]);


  useEffect(() => {
    i18n.changeLanguage(settings.language);
  },[settings])

  


  const statusBarMode = settings.darkMode ? "dark-content" : "light-content";

  useEffect(()=> {
    firstTimeLaunch("Settings", { darkMode: "light", themeIndex: 5, isAutoTheme: false, font: 'Roboto_400Regular', language: 'en', size: 9, verseMark: true, verseMarkSize: 6, randomCount: 3, check: true, bibleVersion: 'kjv', randomFilter: [true, true]}).then(x => setSettings(x));
  },[])

  

if(!settings.check) return <></>

  return (
    <ThemeProvider theme={navigationTheme}>
      <PaperProvider theme={paperTheme}>
          <NavigationContainer theme={navigationTheme}>
            <StatusBar backgroundColor={paperTheme.colors.surfaceVariant} barStyle={statusBarMode}/>
          <Tabs 
            t={t} 
            settings={settings} 
            setSettings={setSettings} 
            statistics={statistics} 
            setStatistics={setStatistics}
            bookState={[currentBook, setCurrentBook]}
            chapterState={[currentChapter, setCurrentChapter]}
            verseState={[currentVerse, setCurrentVerse]}
            />
          </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}

