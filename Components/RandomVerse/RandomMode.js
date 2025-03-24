import { Button, Text, useTheme , Checkbox} from "react-native-paper"
import { ScrollView, View } from "react-native"
import variants from "../../Engine/textVariants"
import { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import getBible from "../../Engine/getBible"


const RandomMode = (props) => {
    const [index, setIndex] = useState(0);
    const [currentBook, setCurrentBook] = props.bookState;
    const [currentChapter, setCurrentChapter] = props.chapterState;
    const [currentVerse, setCurrentVerse] = props.verseState;
    const [bible] = useState(getBible(props.settings.bibleVersion));
    const [selected, setSelected] = useState(props.settings.randomFilter)
    const navigation = useNavigation();
    const theme = useTheme();
    const t = props.t;


    useEffect(() => {
        generateIndex();
    }, [])


    const generateIndex = () => {
        let nextIndex;
        7,957
        if(selected[0] && !selected[1]) {
            nextIndex = Math.floor(Math.random() * 23145);
        }
        if(selected[0] && selected[1]) {
            nextIndex = Math.floor(Math.random() * bible.verses.length);
        }
        if(!selected[0] && selected[1]) {
            nextIndex = Math.floor(Math.random() * 7957) + 23145;
        }

        setIndex(nextIndex);
    }

    const handleChecking = (index) => {
        const copy = [...selected];
        copy[index] = !copy[index];
        if(!copy[0] && !copy[1]) return
        setSelected(copy);

    }

    const showInReadMode = () => {
        setCurrentBook(bible.verses[index].book - 1);
        setCurrentChapter(bible.verses[index].chapter - 1);
        setCurrentVerse(bible.verses[index].verse - 1);
        navigation.navigate("Read", {
            screen: 'TextView',
            params: {title: `${t(bible.verses[index].book_name)} ${bible.verses[index].chapter}`},
            initial: false,

        })
    }
    const getText = (index) => {
        const returnList = [];
        const startingChapter = bible.verses[index].chapter;
        for(let i = 0; i < props.settings.randomCount; i++){
            if(bible.verses[index + i].chapter !== startingChapter) break
            returnList.push(<Text key={i} variant={variants[props.settings.size]} style={{fontFamily: props.settings.font}}>{bible.verses[index + i].text}</Text>)
        }
        return returnList
    }
    const getSiglum = (text) => {
        const sum = bible.verses[index].verse + text.length
        const verses = text.length > 1? bible.verses[index].verse + "-" + sum: bible.verses[index].verse;
        const siglum = t(bible.verses[index].book_name) + " " + bible.verses[index].chapter + ' ' + verses;
        return siglum
    }
    const text = getText(index);
    return (<>
        <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'column', justifyContent: 'center',  margin: 5,flexWrap: 'wrap'}}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', justifyContent: 'space-around', gap: 5, paddingTop: 20}}>
                <Button mode={'contained'} icon={"refresh"} onPress={generateIndex}>{t("refresh")}</Button>
                <Button mode={'contained-tonal'} style={{flex: 1}} icon={"open-in-new"} onPress={showInReadMode}>{getSiglum(text)}</Button>
            </View>
            <View style={{backgroundColor: theme.colors.surfaceVariant, borderRadius: 40, padding: 40, marginTop: 20}}>
                {text}
            </View>
            <View style={{padding: 40, marginTop: 20}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <Text variant="headlineSmall">{t("oldTestament")}</Text>
                    <Checkbox status={selected[0] ? 'checked' : 'unchecked'} disabled={false} onPress={() => {handleChecking(0)}}></Checkbox>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text variant="headlineSmall">{t("newTestament")}</Text>
                    <Checkbox status={selected[1] ? 'checked' : 'unchecked'} disabled={false} onPress={() => {handleChecking(1)}}></Checkbox>
                </View>
            </View>
        </ScrollView>
    </>)
}
export default RandomMode