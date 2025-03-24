import getBible from "../../Engine/getBible";
import { FlashList } from "@shopify/flash-list";
import { useState, useEffect, useRef, useCallback, memo, useMemo } from "react";
import variants from "../../Engine/textVariants";
import TextLine from "./TextLine";
import { Button, Text } from "react-native-paper";
import { ScrollView, View, FlatList, InteractionManager, StyleSheet} from "react-native";
import StartList from "./StartList";
import { useNavigation } from "@react-navigation/native";

const ChapterView = (props) => {

    const [data, setData] = useState([]);
    const [bible] = useState(getBible(props.settings.bibleVersion));
    const [initialIndex, setInitialIndex] = useState(0);
    const navigation = useNavigation();
    const t = props.t;


    const getTextObject = (item) => {
        const returnList = [];
        if(item.chapter === 1 && item.verse === 1){
            returnList.push({text: t(item.book_name), type: "book", id: "0" + item.book + "," + item.chapter + "," + item.verse});
        }
        if(item.verse === 1){
            returnList.push({text: item.chapter, type: "chapter", id: "1" + item.book + "," + item.chapter + "," + item.verse});
        }
        if(item.verse === props.currentVerse + 1 && item.chapter === props.currentChapter + 1 && item.book === props.currentBook + 1){
            returnList.push({text: item.text, verse: item.verse, type: "initial" , id: "2" + item.book + "," + item.chapter + "," + item.verse});
        }
        else{
            returnList.push({text: item.text, verse: item.verse, type: "text", id: "3" + item.book + "," + item.chapter + "," + item.verse});
        }
        

        return returnList;
    }
    useEffect(()=> {
            setData([]);
            getWholeChapter();
            
        },[props.currentBook, props.currentChapter, props.currentVerse]);
    const getWholeChapter = () => {
        const verses = bible.verses.filter((x) => x.book === props.currentBook + 1 && x.chapter === props.currentChapter + 1);
        const returnData = getReturnData(verses);
        const initial = returnData.findIndex(x =>x.type === "initial");
        setInitialIndex(initial);
        setData(returnData);
    }
    const getReturnData = (filtered) => {
        const returnData = [];
        for(let i in filtered){
            returnData.push(...getTextObject(filtered[i]));
        }
        return returnData
    }
    const renderItem = useCallback((item, index) => {
        const verseMark = props.settings.verseMark && <Text style={{...styles[variants[props.settings.verseMarkSize]],alignSelf: 'center', color: 'gray'}}>{item.verse} </Text>
        return <TextLine item={item} verseMark={verseMark} size={props.settings.size} font={props.settings.font}/>
    }, [])

    const goBack = () => {
        let newBookIndex = props.currentBook;
        let newChapterIndex = 1;
        if(props.currentChapter === 0 && props.currentBook !== 0){
            newBookIndex=props.currentBook - 1;
            newChapterIndex=props.structure.find(x => x.book_index == props.currentBook).chapters.length - 1;
            props.setCurrentChapter(newChapterIndex);
            props.setCurrentBook(props.currentBook - 1)
        }
        else{
            newChapterIndex=props.currentChapter - 1;
            props.setCurrentChapter(props.currentChapter - 1);
        }
        props.setCurrentVerse(0);  
        const title = `${t(props.structure[newBookIndex].book_name)} ${newChapterIndex + 1}`;
        navigation.setParams({title: title});
    }

    const goForward=() => {
        let newBookIndex = props.currentBook;
        let newChapterIndex = 1;
        if(props.currentChapter === props.structure.find(x => x.book_index == props.currentBook + 1).chapters.length - 1 && props.currentBook !== 65){
            newBookIndex=props.currentBook + 1;
            newChapterIndex=0;
            props.setCurrentBook(props.currentBook + 1);
            props.setCurrentChapter(0);
        }
        else{
            newChapterIndex=props.currentChapter + 1;
            props.setCurrentChapter(props.currentChapter + 1);
        }
        props.setCurrentVerse(0);
        const title = `${t(props.structure[newBookIndex].book_name)} ${newChapterIndex + 1}`;
        navigation.setParams({title: title});
    }

    const prevButton =(props.currentChapter === 0 && props.currentBook === 0)? <></>: <Button mode="contained" icon="arrow-left" onPress={goBack}>{t("previous")}</Button>
    const nextButton = (props.currentChapter === 21 && props.currentBook === 65)? <></>: <Button mode="contained" contentStyle={{flexDirection: 'row-reverse'}} icon="arrow-right" onPress={goForward}>{t("next")}</Button>
    if(data.length === 0) return <></>
    return (
        <StartList
            renderItem={renderItem}
            data={data}
            startIndex={initialIndex}
            header={prevButton}
            footer={nextButton}
            />
    )
}
const styles = StyleSheet.create({
  labelLarge: {fontSize: 13, fontWeight: 'bold'},
  bodyMedium: {fontSize: 15, fontWeight: 'bold'},
  titleSmall: {fontSize: 16, fontWeight: 'bold'},
  titleLarge: {fontSize: 20},
  headlineLarge: {fontSize: 30}

});
export default ChapterView