import { Pressable, View } from "react-native"
import { Divider, Icon, Text, useTheme, TouchableRipple } from "react-native-paper"
import { memo } from "react";

const BookCard = (props) => {
    const theme = useTheme();
    return<>
        <TouchableRipple onPress={() => props.onPress(props.index)}>
            <>
            <View style={{width: props.width, height: 50, marginHorizontal: 15, marginVertical: 5, borderRadius: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10}}>
                <View style={{height: 50, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                    <Text variant="titleMedium">{props.text}</Text> 
                </View>
                <Icon source={props.icon} size={30} color={theme.colors.tertiary}/>
            </View>
            <Divider style={{marginHorizontal: 15}}/>
            </>
        </TouchableRipple>
        
    </>
}
export default memo(BookCard)