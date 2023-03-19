import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

const SearchBar = ({ search, setSearch, selectedValue, setSelectedValue, searchValue, setSearchValue, searchFunc }) => {

  return (
    <View>
      <View style={styles.topTitle}>
        {search ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => {setSearch(!search)}}>
              <AntDesign name="arrowleft" size={22} color="black" />
            </TouchableOpacity>
            <View style={styles.searchBox}>
              <View style={{ marginLeft: 15, marginRight: 15, width: 34 }}>
                <RNPickerSelect
                  disabled={false}
                  placeholder={{
                    label: '선택',
                    value: null
                  }}
                  visible={false}
                  onValueChange={(value) => setSelectedValue(value)}
                  items={[
                    { label: '영화', value: 'movies' },
                    { label: '드라마', value: 'tv' },
                    { label: '유튜브', value: 'youtube' },
                  ]}
                  value={selectedValue}
                />
              </View>
              <View style={{ borderWidth: 0.5, height: 28, borderColor: '#D0D5DA' }} />
              <TextInput onChangeText={setSearchValue} value={searchValue} style={styles.searchBar} placeholder="검색어를 입력하세요"
                onSubmitEditing={() => { searchFunc() }} />
            </View>
          </View>
        ) : (
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>나혼자산다</Text>
        )}

        <TouchableOpacity onPress={() => { search ? searchFunc() : setSearch(!search) }}>
          <AntDesign name="search1" size={22} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    height: 40,
    marginBottom: 20
  },
  searchBox: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#D0D5DA',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  searchBar: {
    width: 197,
    height: 40,
    marginLeft: 15,
  },
});

export default SearchBar;
