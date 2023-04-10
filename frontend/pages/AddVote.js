import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AddVote = () => {

  const [inputs, setInputs] = useState([{ key: 1, text: '', focus: false }, {key: 2, text: '', focus: false}]); // TextInput 배열 상태
  const navigation = useNavigation();

  // TextInput의 내용을 변경할 때 호출되는 함수
  const handleInputChange = (text, key) => {
    setInputs(inputs.map((input) => (input.key === key ? { ...input, text } : input)));
  };

  // TextInput을 추가할 때 호출되는 함수
  const handleAddInput = () => {
    if(inputs.length == 5){
      Alert.alert('투표항목은 최대 5개 입니다.','',[{text: '확인'},]);
    }else{
      const newKey = inputs.length + 1;
      setInputs([...inputs, { key: newKey, text: '', focus: false }]);
    }
  };

  // TextInput의 포커스 상태를 변경할 때 호출되는 함수

  const handleFocusChange = (key) => {
    setInputs(inputs.map((input) => {
      return input.key === key ? { ...input, focus: true } : { ...input, focus: false }
    }));
  };

  // TextInput을 제거할 때 호출되는 함수
  const handleRemoveInput = (key) => {
    if(inputs.length == 2){
      Alert.alert('투표항목은 최소 2개 입니다.','',[{text: '확인'},]);
    }else{
      setInputs(inputs.filter((input) => input.key !== key));
    }
  };

  // 완료 버튼을 눌렀을 때 호출되는 함수
  const moveComplete = () => {
    for (const input of inputs) {
      if (input.text === '') {
        Alert.alert('항목을 입력하여주세요.', '', [{text: '확인'},]);
        return;
      }  
    }
    const serializedInputs = inputs.map((input) => ({ ...input, text: input.text.trim() }));
    navigation.navigate('RegisterVotePage', {inputs: serializedInputs});
  };

  return (
    <View style={styles.container}>
      {inputs.map((input) => (
        <View key={input.key} style={styles.inputContainer}>
          <View style={[styles.textInputContainer , input.focus && styles.focusContainer]}>
            <TextInput
              style={styles.textInput}
              placeholder="항목입력"
              value={input.text}
              onChangeText={(text) => handleInputChange(text, input.key)}
              onFocus={() => handleFocusChange(input.key)}
            />
          </View>
          <TouchableOpacity onPress={() => handleRemoveInput(input.key)}>
            <AntDesign name="close" size={24} color="#FF4545" style={{ marginLeft: 20 }} />
          </TouchableOpacity>
        </View>
      ))}

      <View style={{alignItems: 'center', width:'100%', height:'100%', position: 'absolute', marginTop:530}}>
        <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', width:'90%'}}>
          <View style={{flex: 1, width:'100%', height:'100%'}}>
              <TouchableOpacity onPress={handleAddInput} style={{width:'100%', height:'100%'}}>
                <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '12', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF4545'}}>
                  <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'white'}}>
                    추가하기
                  </Text>
                </View>
              </TouchableOpacity>
          </View>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center', height:'8%', width:'90%', marginTop:20}}>
          <View style={{flex: 1, width:'100%', height:'100%'}}>
            <TouchableOpacity onPress={() => moveComplete()} style={{width:'100%', height:'100%'}}>
              <View style={{width:'100%', height:'100%', borderWidth: 1, borderColor: '#D6D6D6', borderRadius: '12', justifyContent: 'center', alignItems: 'center', backgroundColor:'#FF4545'}}>
                <Text style={{fontSize:20, textAlign: 'center', textAlignVertical: 'center', color:'white'}}>
                  완료
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

    </View>
  );
}

// css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#FFFFFF',
  },
  inputContainer: {
    width: '95%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInputContainer: {
    flex: 1,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 5,
  },
  focusContainer:{
    borderColor: '#FF4545',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 20,
    color: '#545454',
  },
  addButtonContainer: {
    width: '90%',
    height: 60,
    borderWidth: 1,
    borderColor: '#D6D6D6',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    fontSize: 18,
  },
});

export default AddVote;
