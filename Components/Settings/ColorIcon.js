import { View, StyleSheet, Touchable, Pressable } from "react-native";
import { useTheme } from "react-native-paper";

const ColorIcon = (props) => {
    const theme = useTheme()
    const borderColor = props.selected ?theme.colors.primary:  theme.colors.surfaceVariant ;
  return (
    <Pressable onPress={props.click}>
    <View style={{ display: "flex", flexDirection: "row", marginRight: 10}}>
      <View style={{...styles.leftIcon, borderColor: borderColor, backgroundColor: props.primary}}
      />
      <View style={{ display: "flex", flexDirection: "column" }}>
        <View style={{...styles.TopRightIcon, borderColor: borderColor, backgroundColor: props.secondary}}
        />
        <View style={{...styles.BottomLeftIcon, borderColor: borderColor, backgroundColor: props.tertiary}}
        />
      </View>
    </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  leftIcon: {
    height: 80,
    width: 40,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderColor: "gray",
    borderLeftWidth: 5,
    borderTopWidth: 5,
    borderBottomWidth: 5
  },
  TopRightIcon: {
    height: 40,
    width: 40,
    borderTopRightRadius: 15,
    borderColor: "gray",
    borderRightWidth: 5,
    borderTopWidth: 5,
  },
  BottomLeftIcon:{
    height: 40,
    width: 40,
    borderBottomRightRadius: 15,
    borderColor: "gray",
    borderRightWidth: 5,
    borderBottomWidth: 5,
  }
  
});

export default ColorIcon;
