import { useState } from "react";
import BookSelection from "./BookSelection"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import structure from '../../TextSource/structure.json' 
import ChapterSelection from "./ChapterSelection";
import VerseSelection from "./VerseSelection";
import TextView from "./TextView";
import Search from "./Search";
import { Roboto_400Regular } from "@expo-google-fonts/roboto";
import { useTheme } from "react-native-paper";
import ChapterView from "./ChapterView";

const Stack = createNativeStackNavigator();

const ReadMode = (props) => {
    const [currentBook, setCurrentBook] = props.bookState;
    const [currentChapter, setCurrentChapter] = props.chapterState;
    const [currentVerse, setCurrentVerse] = props.verseState;
    const t = props.t;
    const theme = useTheme();
    
    return (
        <Stack.Navigator screenOptions={{animation: 'fade', headerShadowVisible: false, headerStyle:{backgroundColor: theme.colors.surfaceVariant}}}>
        <Stack.Screen name="BookSelection"  options={{ title: t("bookSelection")}}>
        {() =>( <BookSelection structure={structure} setCurrentBook={setCurrentBook} t={t}/> )}
        </Stack.Screen>
        <Stack.Screen name="ChapterSelection" options={{ title: t("chapterSelection")}}>
        {() =>( <ChapterSelection structure={structure} currentBook={currentBook} setCurrentChapter={setCurrentChapter}/>)}
        </Stack.Screen>
        <Stack.Screen name="VerseSelection" options={{ title: t("verseSelection")}}>
        {() =>( <VerseSelection t={t} structure={structure} currentBook={currentBook} currentChapter={currentChapter} setCurrentVerse={setCurrentVerse}/>)}
        </Stack.Screen>
        <Stack.Screen name="TextView" options={({ route }) => ({ title: route.params.title })}>
        {() =>( <ChapterView structure={structure} setCurrentBook={setCurrentBook} currentBook={currentBook} setCurrentChapter={setCurrentChapter} currentChapter={currentChapter} setCurrentVerse={setCurrentVerse} currentVerse={currentVerse} t={t} settings={props.settings} setSettings={props.setSettings}/>)}
        </Stack.Screen>
        <Stack.Screen name="Search" options={{ title: t("search")}}>
        {() =>( <Search structure={structure} setCurrentBook={setCurrentBook} setCurrentChapter={setCurrentChapter} setCurrentVerse={setCurrentVerse} t={t} settings={props.settings} setSettings={props.setSettings}/>)}
        </Stack.Screen>
        
        </Stack.Navigator>
    )
}
export default ReadMode