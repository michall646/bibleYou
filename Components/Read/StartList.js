import { ScrollView, View } from "react-native";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
const StartList = (props) => {
    const scrollViewRef = useRef(null);
    const [verseLayouts, setVerseLayouts] = useState({});
    const didScrollRef = useRef();

    const renderData = useCallback(({item , index}) => {

        return<View onLayout={(event) => onLayoutVerse(index, event)} key={index}>{props.renderItem(item, index)}</View>
    },[props.renderItem])

    const onLayoutVerse = (index, event) => {
        if (!didScrollRef.current) {
            const { y } = event.nativeEvent.layout;
            setVerseLayouts(prev => ({ ...prev, [index]: y }));
        }
    };

    useEffect(() => {
        didScrollRef.current = false;
      }, [props.startIndex]);
    
      useEffect(() => {
        if (scrollViewRef.current && verseLayouts[props.startIndex] !== undefined) {
          if (!didScrollRef.current) {
            scrollViewRef.current.scrollTo({ y: verseLayouts[props.startIndex], animated: true });
            didScrollRef.current = true;
          }
        }
      }, [props.startIndex, verseLayouts]);
    

    const renderedItems = useMemo(() => {
        return props.data.map((x, i) => renderData({item: x, index: i}))
    }, [props.data, renderData])

    return (
    <ScrollView ref={scrollViewRef} contentContainerStyle={{padding: 5}}>
        {props.header}
        {renderedItems}
        {props.footer}
    </ScrollView>)
}
export default StartList