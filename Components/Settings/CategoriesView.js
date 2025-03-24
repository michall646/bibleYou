import { ScrollView } from "react-native";
import ListItem from "./ListItem"
import { useNavigation } from '@react-navigation/native';

const CategoriesView = (props) => {
    const empty = () => <></>
    const t = props.t;
    const navigation = useNavigation();
    
    return(
    <ScrollView style={{flex: 1}}>
        <ListItem
            title={t("apperancePageTitle")}
            disc={t("apperancePageDisc")}
            icon="palette"
            isRight={false}
            right={empty}
            onPress={()=> navigation.navigate("Apperance")}
        />
        <ListItem
            title={t("languagePageTitle")}
            disc={t("languagePageDisc")}
            icon="translate"
            isRight={false}
            right={empty}
            onPress={()=> navigation.navigate("Language")}
        />
        <ListItem
            title={t("readPageTitle")}
            disc={t("readPageDisc")}
            icon="book"
            isRight={false}
            right={empty}
            onPress={()=> navigation.navigate("Read")}
        />
        
    </ScrollView>)
}
export default CategoriesView