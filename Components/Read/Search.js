import { useState } from "react"
import { ScrollView, View } from "react-native";
import { ActivityIndicator, IconButton, Searchbar, TextInput } from "react-native-paper"
import Fuse from 'fuse.js'
import getBible from "../../Engine/getBible";
import ResultCard from "./ResultCard";
import fuzzysort from 'fuzzysort'
import variants from "../../Engine/textVariants";
import { useNavigation } from "@react-navigation/native";

const Search  = (props) => {
    const [query, setQuery] = useState("");
    const [bible] = useState(getBible(props.settings.bibleVersion));
    const [data, setData] = useState([])
    const navigation = useNavigation();
    const t = props.t;

    /*const fuse = new Fuse(bible.verses, {
        keys: ['text']
    })*/

    const getSiglum = (item) => {
        return t(item.book_name) + " " + item.chapter + " " + item.verse
    }

    const getItems = (items) => {
        return items.map((x, index) => <ResultCard 
                                            key={index} 
                                            item={x.obj} 
                                            siglum={getSiglum(x.obj)} 
                                            font={props.settings.font} 
                                            textVariant={variants[props.settings.size]} 
                                            sigVariant={variants[Math.max(props.settings.size - 1, 0)]} 
                                            onPress={() => onPress(x.obj.verse, x.obj.chapter, x.obj.book, x.obj.book_name)}/>)
    }

    const onPress = (verse, chapter, book, name) => {
        props.setCurrentBook(book - 1);
        props.setCurrentChapter(chapter - 1);
        props.setCurrentVerse(verse - 1);

        props.title = 
        navigation.navigate("TextView", {title: `${t(name)} ${chapter}`});
    }

    const onSearch = () => {
        const results = fuzzysort.go(query, bible.verses, {
            key: 'text',
            limit: 50
        })
        setData(getItems(results));
    }



    return (<>
        <ScrollView contentContainerStyle={{padding: 10}}>
        <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10}}>
            <TextInput value={query} onChangeText={setQuery} style={{flex: 1}} onSubmitEditing={onSearch} mode='outlined'/>
            <IconButton mode='contained' icon='magnify' selected={true} onPress={onSearch}/>
        </View>
        {data}
        </ScrollView>

    </>)
}
export default Search