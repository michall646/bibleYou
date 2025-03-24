import { useEffect, useState } from 'react';
import { Text, SegmentedButtons, Switch} from 'react-native-paper';
import ListItem from './ListItem';
import { ScrollView, View } from 'react-native';
import ColorIcon from './ColorIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const empty = () => {return <></>}
const ApperancePage = (props) => {
    const t = props.t;
    const [darkMode, setDarkMode] = useState('auto');
    const [selectedColor, setSelectedColor] = useState(0);
    const [autoColor, setAutoColor] = useState(0);

    const loadStates = async () => {
        let copy = JSON.parse(await AsyncStorage.getItem("Settings"));
        setDarkMode(copy.darkMode);
        setSelectedColor(copy.themeIndex);
        setAutoColor(copy.autoColor);
    }

    useEffect(() => {
        loadStates();
    }, [])

    const handleDarkModeChange = (value) => {
        let copy = {...props.settings};
        copy.darkMode = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy))
        setDarkMode(value)
    }
    const handleColorChange = (value) => {
        let copy = {...props.settings};
        copy.themeIndex = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy))
        setSelectedColor(value)
    }
    const handleAutoColorChange = (value) => {
        let copy = {...props.settings};
        copy.autoColor = value;
        props.setSettings(copy);
        AsyncStorage.setItem("Settings", JSON.stringify(copy))
        setAutoColor(value)
    }
    const isSelected = (value) =>{
        return selectedColor == value
    }

    return(
        <ScrollView contentContainerStyle={{padding: 10, paddingTop: 10}}>
            <Text variant='titleLarge' style={{marginBottom: 10}}>{t("darkMode")}</Text>

            <SegmentedButtons
                style={{marginBottom: 10}}
                value={darkMode}
                onValueChange={handleDarkModeChange}
                buttons={[
                {
                    value: 'light',
                    icon: 'brightness-5'
                },
                {
                    value: 'auto',
                    icon: 'brightness-auto',
                },
                {
                    value: 'dark',
                    icon: 'brightness-4',
                },
                ]}
            />
            
             <Text variant='titleLarge' style={{marginBottom: 10}}>{t("appTheme")}</Text>
             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 10}}>
                <ColorIcon selected={isSelected(0)} primary={"#c199e0"} secondary={"#c9dbf5"} tertiary={"#f0b1ef"} click={()=> handleColorChange(0)}/>
                <ColorIcon selected={isSelected(1)} primary={"#fadaa7"} secondary={"#ffc3bf"} tertiary={"#b3fcb3"} click={()=> handleColorChange(1)}/>
                <ColorIcon selected={isSelected(2)} primary={'#b7f481'} secondary={'#dae7c9'} tertiary={'#bbece9'} click={()=> handleColorChange(2)}/>
                <ColorIcon selected={isSelected(3)} primary={'#94d6c4'} secondary={'#bbece9'} tertiary={'#bda9d4'} click={()=> handleColorChange(3)}/>
                <ColorIcon selected={isSelected(4)} primary={'#9cb7e6'} secondary={'#9ce6ab'} tertiary={'#cce69c'} click={()=> handleColorChange(4)}/>
                <ColorIcon selected={isSelected(5)} primary={'#9497d6'} secondary={'#bda9d4'} tertiary={'#a9d4c5'} click={()=> handleColorChange(5)}/>
                <ColorIcon selected={isSelected(6)} primary={'#d6949e'} secondary={'#d694cb'} tertiary={'#d6bc94'} click={()=> handleColorChange(6)}/>
            </ScrollView>

            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text variant='titleLarge' style={{marginBottom: 10}}>{t("useSystemColor")}</Text>
            <Switch value={autoColor} onValueChange={handleAutoColorChange}></Switch>

            </View>
        </ScrollView>
    )
}
export default ApperancePage


