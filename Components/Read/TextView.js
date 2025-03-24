import { useEffect, useState, useRef, useCallback} from "react"
import { Text, useTheme } from "react-native-paper";
import BidirectionalFlatlist from "react-native-bidirectional-flatlist";
import variants from "../../Engine/textVariants";
import getBible from "../../Engine/getBible";
import TextLine from "./TextLine";
const TextView = (props) => {

    const [originIndex, setOriginIndex] = useState();
    const [initialScroll, setInitialScroll] =  useState(0);
    const [data, setData] = useState([]);
    const [upDistance, setUpDistance] = useState();
    const [downDistance, setDownDistance] = useState();
    const [hasCentered, setHasCentered] = useState();
    const [bible] = useState(getBible(props.settings.bibleVersion));
    const t = props.t;

    

    useEffect(()=> {
        setData([]);
        const origin = bible.verses.findIndex(x=> x.book === props.currentBook + 1 && x.chapter === props.currentChapter + 1 && x.verse === props.currentVerse + 1);
        setOriginIndex(origin);
        loadInitial(origin, bible);
        setHasCentered(false);
        
        
    },[props.currentBook, props.currentChapter, props.currentVerse]);


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

    const loadStart = () => {
        const filtered = bible.verses.slice(Math.max(originIndex - upDistance - 30, 0), Math.max(originIndex - upDistance, 0),);
        const copy = data.slice();
        const returnData = getReturnData(filtered);
        copy.unshift(...returnData);
        setUpDistance(originIndex - Math.max(originIndex - upDistance - 30, 0))
        setData([...copy]);
        return copy
    }

    const loadEnd = () => {
        const filtered = bible.verses.slice(Math.max(originIndex + downDistance, 0), originIndex + downDistance + 30);
        const copy = data.slice();
        const returnData = getReturnData(filtered);
        copy.push(...returnData);
        setDownDistance(downDistance + 30)
        setData([...copy]);

    }

    const getReturnData = (filtered) => {
        const returnData = [];
        for(let i in filtered){
            returnData.push(...getTextObject(filtered[i]));
        }
        return returnData
    }
    
    const loadInitial = (initial, bible) => {
        //const filtered = [bible.verses[initial]];
        const filtered = bible.verses.slice(Math.max(initial - 70, 0), Math.max(initial + 70, 0));
        const returnData = getReturnData(filtered);
        setInitialScroll(returnData.findIndex(x =>x.type === "initial"));
        setData(returnData);
        setDownDistance(70);
        setUpDistance(70);
    }


    const renderData = ({item , index}) => {
        const verseMark = props.settings.verseMark && <Text variant={variants[props.settings.verseMarkSize]} style={{alignSelf: 'center', color: 'gray'}}>{item.verse} </Text>
        return <TextLine item={item} verseMark={verseMark} size={props.settings.size} font={props.settings.font}/>
    }




    if(data.length === 0) return <></>
    
    return(<>
        <BidirectionalFlatlist
                contentContainerStyle={{paddingLeft: 10, paddingRight: 10}}
                data={data}
                renderItem={renderData}
                keyExtractor={item => item.id}
                onEndReached={loadEnd}
                onStartReached={loadStart}
                onEndReachedThreshold={1}
                onStartReachedThreshold={1}
                initialScrollIndex={initialScroll}
                /></>)
}
export default TextView