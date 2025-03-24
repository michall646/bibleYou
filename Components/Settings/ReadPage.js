import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { ScrollView, View } from "react-native"
import { Switch, Text } from "react-native-paper"
import { Dropdown } from "react-native-paper-dropdown";

const ReadPage = (props) => {
    const t = props.t;
    const [font, setFont] = useState(props.settings.font);
    const [size, setSize] = useState(props.settings.size);
    const [isVerse, setVerse] = useState(props.settings.verseMark);
    const [verseSize, setVerseSize] = useState(props.settings.verseMarkSize);
    const [randomVerseCount, setRandomVerseCount] = useState(props.settings.randomCount);
    const fontOptions = [
        { label: 'Roboto', value: 'Roboto_400Regular' },
        { label: 'Merriweather', value: 'Merriweather_400Regular' },
        { label: 'PT Serif', value: 'PTSerif_400Regular' },
        { label: 'Open Sans', value: 'OpenSans_400Regular' },
      ];
    const sizeOptions = [
      { label: t("extraSmall"), value: 5 },
      { label: t("small"), value: 8 },
      { label: t("medium"), value: 9 },
      { label: t("large"), value: 11 },
      { label: t("extraLarge"), value: 13 },
    ];
    const verseSizeOptions = [
      { label: t("extraSmall"), value: 2 },
      { label: t("small"), value: 4 },
      { label: t("medium"), value: 6 },
      { label: t("large"), value: 8 },
      { label: t("extraLarge"), value: 11 },
    ];
    const randomVerseOptions = [
      { label: '1', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '5', value: 5 },
      { label: '10', value: 10 },
    ];

      const handleFontChange = (value) => {
        const copy = {...props.settings};
        copy.font = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        setFont(value);
      }
      const handleSizeChange = (value) => {
        const copy = {...props.settings};
        copy.size = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        setSize(value);
      }
      const handleVerseMarkChange = (value) => {
        const copy = {...props.settings};
        copy.verseMark = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        setVerse(value);
      }
      const handleVerseSizeChange = (value) => {
        const copy = {...props.settings};
        copy.verseMarkSize = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        setVerseSize(value);
      }
      const handleRandomCountChange = (value) => {
        const copy = {...props.settings};
        copy.randomCount = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        setRandomVerseCount(value);
      }
    return <ScrollView contentContainerStyle={{padding: 10, paddingTop: 10}}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 3, marginBottom: 3}}>
            <Text variant='titleLarge' style={{marginBottom: 10, flex: 1}}>{t("font")}</Text>
            <Dropdown options={fontOptions} value={font} onSelect={handleFontChange}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 3, marginBottom: 3}}>
            <Text variant='titleLarge' style={{marginBottom: 10, flex: 1}}>{t("textSize")}</Text>
            <Dropdown options={sizeOptions} value={size} onSelect={handleSizeChange}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 3, marginBottom: 3}}>
            <Text variant='titleLarge' style={{marginBottom: 10, flex: 1}}>{t("enableVerseMark")}</Text>
            <Switch value={isVerse} onValueChange={handleVerseMarkChange}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 3, marginBottom: 3}}>
            <Text variant='titleLarge' style={{marginBottom: 10, flex: 1}}>{t("verseMarkSize")}</Text>
            <Dropdown options={verseSizeOptions} value={verseSize} onSelect={handleVerseSizeChange}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 3, marginBottom: 3}}>
            <Text variant='titleLarge' style={{marginBottom: 10, flex: 1}}>{t("randomVerseCount")}</Text>
            <Dropdown options={randomVerseOptions} value={randomVerseCount} onSelect={handleRandomCountChange}/>
        </View>
        
    </ScrollView>
}

export default ReadPage