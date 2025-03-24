import AsyncStorage from "@react-native-async-storage/async-storage";
import ListItem from "./ListItem";
import { useState } from "react";
import { Dropdown } from "react-native-paper-dropdown";
import { View , ScrollView} from "react-native";
import { Text } from "react-native-paper";

const LanguagePage = (props) => {

    const [language, setLanguage] = useState(props.settings.language);
    const [bibleVersion, setBibleVersion] = useState(props.settings.bibleVersion);
    const t = props.t;

    const handleLanguageSelect = (value) => {
        const copy = {...props.settings}
        copy.language = value
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        props.setSettings(copy)
        setLanguage(value);
    }
    const handleVersionSelect = (value) => {
        const copy = {...props.settings}
        copy.bibleVersion = value
        AsyncStorage.setItem("Settings", JSON.stringify(copy));
        props.setSettings(copy)
        setBibleVersion(value);
    }

    const langOptions = [
        { label: 'English', value: 'en' },
        { label: 'Polski', value: 'pl' },
      ];
    const bibleOptions = [
    { label: 'King James Version', value: 'kjv' },
    { label: 'American Standard Version', value: 'asv' },
    {label: 'Nowa Biblia Gdańska', value: 'nbg'},
    {label: 'Unowocześniona Biblia Gdańska', value: 'ubg'},
    ];

    return(
        <ScrollView contentContainerStyle={{padding: 10, paddingTop: 10}}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 3, marginBottom: 3}}>
                <Text variant='titleLarge' style={{marginBottom: 10, flex: 1}}>{t("appLanguage")}</Text>
                <Dropdown options={langOptions} value={language} onSelect={handleLanguageSelect}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 3, marginBottom: 3}}>
                <Text variant='titleLarge' style={{marginBottom: 10, flex: 1}}>{t("bibleVersion")}</Text>
                <Dropdown options={bibleOptions} value={bibleVersion} onSelect={handleVersionSelect}/>
            </View>
        </ScrollView>)
}
export default LanguagePage