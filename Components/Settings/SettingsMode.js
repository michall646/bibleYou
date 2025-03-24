import ListItem from "./ListItem"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesView from "./CategoriesView";
import ApperancePage from "./ApperancePage";
import LanguagePage from "./LanguagePage";
import ReadPage from "./ReadPage";
import { useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();



const SettingsMode = (props) => {
  const theme = useTheme();
    const t = props.t;
    return (
        <Stack.Navigator screenOptions={{headerShadowVisible: false, headerStyle:{backgroundColor: theme.colors.surfaceVariant}}}>
        <Stack.Screen name="Categories" options={{ title: t("settingsPageTitle")}}>
        {() =>( <CategoriesView
           t={t}
          
          />)}
        </Stack.Screen>
        <Stack.Screen name="Apperance" options={{ title: t("apperancePageTitle")}}>
        {() =>( <ApperancePage
           t={t}
           settings={props.settings}
           setSettings={props.setSettings}
          
          />)}
        </Stack.Screen>
        <Stack.Screen name="Language" options={{ title: t("languagePageTitle")}}>
        {() =>( <LanguagePage
           t={t}
           settings={props.settings}
           setSettings={props.setSettings}
          
          />)}
        </Stack.Screen>
        <Stack.Screen name="Read" options={{ title: t("readPageTitle")}}>
        {() =>( <ReadPage
           t={t}
           settings={props.settings}
           setSettings={props.setSettings}
          
          />)}
        </Stack.Screen>
        
        </Stack.Navigator>
    )
}
export default SettingsMode