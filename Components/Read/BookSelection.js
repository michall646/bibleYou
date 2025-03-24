import { ScrollView, Dimensions, View} from "react-native"
import { FlatList } from "react-native"
import SelectionIcon from "./SelectionIcon"
import { useNavigation } from "@react-navigation/native";
import bible from '../../TextSource/pol_ubg.json'
import BookCard from "./BookCard";
import { Button, Searchbar } from "react-native-paper";
import { useCallback, useEffect, useMemo, useState, memo} from "react";

const BookSelection = (props) => {
    const screenWidth = Dimensions.get('window').width;
    const books = props.structure;
    const t = useCallback(props.t);

    const navigation = useNavigation();

    const icons = useMemo(
        () => {return [
        "sprout",
        "grave-stone",
        "fire",
        "compass",
        "script-text",
        "trumpet",
        "gavel",
        "barley",
        "crown",
        "crown",
        "chess-rook",
        "chess-rook",
        "script-text",
        "script-text",
        "wall",
        "gate",
        "star-four-points",
        "help",
        "music-note-quarter",
        "book-open-blank-variant",
        "white-balance-sunny",
        "heart-multiple",
        "fruit-grapes",
        "castle",
        "emoticon-cry-outline",
        "tire",
        "fireplace",
        "heart-broken",
        "pine-tree-fire",
        "image-broken",
        "shoe-print",
        "ship-wheel",
        "sheep",
        "waves",
        "account-question",
        "smoke",
        "tape-measure",
        "donkey",
        "window-open",
        "crown",
        "shield-cross",
        "lightbulb-on",
        "bread-slice",
        "ferry",
        "handshake",
        "wrench",
        "wrench",
        "fruit-grapes",
        "home-lightning-bolt",
        "run-fast",
        "image-filter-hdr",
        "church",
        "church",
        "torch",
        "torch",
        "family-tree",
        "puzzle-heart",
        "anchor",
        "mirror-rectangle",
        "lighthouse-on",
        "lighthouse-on",
        "candle",
        "candle",
        "candle",
        "block-helper",
        "weather-lightning"
    ]}, []);

    const [bookCards, setBookCards] = useState([]);
    const getBooksIcons = (data) => {
        return data.sort((a,b) => a.book_index - b.book_index);
    }
    const onSelection = useCallback((index) => {
        navigation.navigate("ChapterSelection");
        props.setCurrentBook(index);
    }, [])

    useEffect(() => {
        setBookCards(getBooksIcons(books));
    }, []);

    const renderItem = (item, index) => {
        const width = screenWidth > 700? Number(((screenWidth - 150) / 3).toFixed()):  Number((screenWidth - 50).toFixed());
        return <BookCard key={index} text={t(item.book_name)} width={width} icon={icons[index]} index={index} onPress={onSelection}/>
    }

    const renderedItems = useMemo(() => {return bookCards.map(renderItem);}, [bookCards, t])

    
    
    return (
        <>
            <ScrollView contentContainerStyle={{paddingTop: 10, }}>
                {<Button mode="contained" style={{marginHorizontal: 60, marginHorizontal: 10, flex: 1}} icon="magnify" onPress={() => navigation.navigate("Search")}>{t("search")}</Button>}
                <View style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-around',}}>
                {renderedItems}
                </View>
                
            </ScrollView>
        </>
    )
}
export default memo(BookSelection)