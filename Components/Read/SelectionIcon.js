import { Pressable, View } from "react-native"
import { Text, useTheme } from "react-native-paper"

const SelectionIcon = (props) => {
    const theme = useTheme();
    return <Pressable onPress={props.onPress}>
            <View style={{width: 60, height: 60, backgroundColor: theme.colors.primaryContainer, margin: 3, borderRadius: 15, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Text>{props.text}</Text>
            </View>
        </Pressable>
}
export default SelectionIcon