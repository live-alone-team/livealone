import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handlePress = async () => {
    try {
      const response = await fetch('http://172.30.1.49:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          nickname
        })
      });
      
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{paddingTop: 42, padding: 40}}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
      />
      <TextInput
        value={nickname}
        onChangeText={setNickname}
        placeholder="Enter nickname"
      />
      <Button title="Submit" onPress={handlePress} />
    </View>
  );
};

export default Profile;
