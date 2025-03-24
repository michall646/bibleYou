import { ScrollView } from "react-native"
import { FlatList } from "react-native"
import SelectionIcon from "./SelectionIcon"
import { useNavigation } from "@react-navigation/native";
import { memo } from "react";
const VerseSelection = (props) => {
    const verses = props.structure[props.currentBook].chapters[props.currentChapter];
    const t = props.t;
    
    const navigation = useNavigation();
    const onSelection = (index) => {
        const title = `${t(props.structure[props.currentBook].book_name)} ${props.currentChapter + 1}`;
        navigation.navigate("TextView", {title: title});
        props.setCurrentVerse(index);
    }
    const getBooksIcons = (data ) => {
        return new Array(data).fill(1).map((item, index) => <SelectionIcon text={index + 1} key={index} onPress={() => onSelection(index)}/>);
    }
    return (
        <>
            <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'center'}}>
                {getBooksIcons(verses)}
            </ScrollView>
        </>
    )
}
export default memo(VerseSelection)