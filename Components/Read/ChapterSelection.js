import { ScrollView } from "react-native"
import { FlatList } from "react-native"
import SelectionIcon from "./SelectionIcon"
import { useNavigation } from "@react-navigation/native";
const ChapterSelection = (props) => {
    const chapters = props.structure[props.currentBook];
    
    const navigation = useNavigation();

    const onSelection = (index) => {
        navigation.navigate("VerseSelection");
        props.setCurrentChapter(index);
    }
    const getBooksIcons = (data ) => {
        return data.chapters.map((item, index) => <SelectionIcon text={index + 1} key={index} onPress={() => onSelection(index)}/>);
    }
    return (
        <>
            <ScrollView contentContainerStyle={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                {getBooksIcons(chapters)}
            </ScrollView>
        </>
    )
}
export default ChapterSelection