import { Pressable, View } from "react-native"
import { Text, Button, TouchableRipple, Divider, useTheme } from "react-native-paper"

const ResultCard = (props) => {
    const theme = useTheme();

    return(
        <>
            <TouchableRipple onPress={props.onPress}>
                <View style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                    <Text variant={props.sigVariant} style={{color: theme.colors.primary}}>{props.siglum}</Text>
                    <Text variant={props.textVariant} style={{fontFamily: props.font}}>{props.item.text}</Text>
                </View>
            </TouchableRipple>
            <Divider style={{marginVertical: 10}}/>
        </>
    )
}
export default ResultCard