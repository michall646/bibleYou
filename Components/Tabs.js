import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {FAB, Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsMode from "./Settings/SettingsMode";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Dimensions} from 'react-native';
import { DrawerActions } from "@react-navigation/native";
import BookSelection from "./Read/BookSelection";
import ReadMode from "./Read/ReadMode";
import RandomMode from "./RandomVerse/RandomMode";

const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Tabs = (props) => {
  const t = props.t;
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  if(windowWidth> windowHeight) {
    return (<>
    <FAB
    icon="menu"
    style={{margin: 16, position: 'absolute', right: 0, top: 0, zIndex: 10}}
    onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
  />
    <Drawer.Navigator screenOptions={{drawerActiveTintColor: theme.colors.primary, headerShown: false, drawerStyle: {backgroundColor: theme.colors.surface, width: 200}}}>
      <Drawer.Screen 
          name="Read"
          options={{
            drawerLabel: t("readPageTitle"),
            drawerItemStyle: {borderRadius: 50, paddingHorizontal: 5},
            drawerIcon: ({ color, focused }) => {
              let icon = focused ? "book-open" : "book-open-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <ReadMode 
                    t={props.t} 
                    settings={props.settings} 
                    setSettings={props.setSettings}
                    bookState={props.bookState}
                    chapterState={props.chapterState}
                    verseState={props.verseState}
                    />}
        </Drawer.Screen>
        <Drawer.Screen 
          name="Random"
          options={{
            drawerLabel: t("randomPageTitle"),
            drawerItemStyle: {borderRadius: 50, paddingHorizontal: 5},
            drawerIcon: ({ color, focused }) => {
              let icon = focused ? "dice-multiple" : "dice-multiple-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <RandomMode 
                    t={props.t} 
                    settings={props.settings} 
                    setSettings={props.setSettings} 
                    bookState={props.bookState}
                    chapterState={props.chapterState}
                    verseState={props.verseState}/>}
        </Drawer.Screen>
        <Drawer.Screen 
          name="Settings"
          options={{
            drawerLabel: t("settingsPageTitle"),
            drawerItemStyle: {borderRadius: 50, paddingHorizontal: 5},
            drawerIcon: ({ color, focused }) => {
              let icon = focused ? "cog" : "cog-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <SettingsMode t={props.t} settings={props.settings} setSettings={props.setSettings}/>}
        </Drawer.Screen>
    </Drawer.Navigator> </>)
  }
  return (
      
      <Tab.Navigator>
        <Tab.Screen 
          name="Read"
          options={{
            drawerLabel: t("readPageTitle"),
            
            tabBarIcon: ({ color, focused }) => {
              let icon = focused ? "book-open" : "book-open-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <ReadMode 
                    t={props.t} 
                    settings={props.settings} 
                    setSettings={props.setSettings}
                    bookState={props.bookState}
                    chapterState={props.chapterState}
                    verseState={props.verseState}
                    />}
        </Tab.Screen>
        <Tab.Screen 
          name="Random"
          options={{
            tabBarLabel: t("randomPageTitle"),
            
            tabBarIcon: ({ color, focused }) => {
              let icon = focused ? "dice-multiple" : "dice-multiple-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <RandomMode 
                    t={props.t} 
                    settings={props.settings} 
                    setSettings={props.setSettings} 
                    bookState={props.bookState}
                    chapterState={props.chapterState}
                    verseState={props.verseState}/>}
        </Tab.Screen>
        <Tab.Screen 
          name="Settings"
          options={{
            tabBarLabel: t("settingsPageTitle"),
            tabBarIcon: ({ color, focused }) => {
              let icon = focused ? "cog" : "cog-outline";
              return (
                <MaterialCommunityIcons
                  name={icon}
                  color={color}
                  size={26}
                />
              );
            },
          }}
          >
            {()=> <SettingsMode t={props.t} settings={props.settings} setSettings={props.setSettings}/>}
        </Tab.Screen>
      </Tab.Navigator>
    
  );
};
export default Tabs
