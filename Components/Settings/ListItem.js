import { List } from 'react-native-paper';
import { Pressable, TouchableOpacity, View } from 'react-native';
const ListItem = (props) => {
    ;
    return ( <View>
        <TouchableOpacity onPress={props.onPress}>
        <List.Item
            title={props.title}
            description={props.disc}
            style={{marginLeft: 13}}
            titleStyle={{fontWeight: 500}}
            left={x => <List.Icon icon={props.icon} />}
            right={() =>props.isRight ?  props.right :<></>}
        />
        </TouchableOpacity>
    
        </View>
      
    )
}
export default ListItem