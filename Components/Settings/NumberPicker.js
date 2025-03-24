import { TextInput } from 'react-native-paper';
import { useEffect, useState } from 'react';
const NumberPicker = (props) => {
    const [text, setText] = useState(String(props.start));
    const [error, setError] = useState(false);
    const t= props.t;

    const handleValueChange = (value) => {
        if(value !== "" && Number.isInteger(Number(value))){
          setError(false);
          props.change(value,props.mode)
        }
        else setError(true)

        setText(value);
    };

    useEffect(()=> {
      setText(String(props.start));
    },[props.start])
    
    return (
        <TextInput
          label={props.label ? props.label: t("min", {count: Number(text)})}
          keyboardType='numeric'
          value={text}
          error={error}
          style={{width: 100}}
          onChangeText={handleValueChange}
        />
      );
}
export default NumberPicker