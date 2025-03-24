import { Text } from "react-native-paper";
import variants from "../../Engine/textVariants";
import { useTheme } from "react-native-paper";
import { memo } from "react";

const TextLine = (props) => {
    const item = props.item;
    const theme = useTheme();
    if(item.type === "text"){
            return <Text variant={variants[props.size]} style={{fontFamily: props.font}}>{props.verseMark}{item.text}</Text>
        }
        if(item.type === "initial"){
            return <Text variant={variants[props.size]} style={{color: theme.colors.primary, fontFamily: props.font}}>{props.verseMark}{item.text}</Text>
        }
        if(item.type === "book"){
            return <Text variant={variants[Math.min(props.size + 4, variants.length - 1)]}  style={{textAlign: 'center', fontFamily: props.font}}>{item.text}</Text>
        }
        if(item.type === "chapter"){
            return <Text variant={variants[Math.min(props.size + 2, variants.length - 1)]} style={{fontFamily: props.font}}>{item.text}</Text>
        }
}

export default memo(TextLine);