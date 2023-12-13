import {View, Image, TouchableOpacity, TextInput} from 'react-native';
import {HomeSearchBarStyle} from '../style/homeSearchBarStyle';

const HomeSearchBar = ({searchPhrase, setSearchPhrase, searchButtonClick}) => {
  const handleTextChange = (text) => {
    setSearchPhrase(text);
  };
  return (
    <View style={HomeSearchBarStyle.container}>
    <TextInput
      style={HomeSearchBarStyle.textField}
      placeholder={"Search"}
      value={searchPhrase}
      onChangeText={handleTextChange}
    />
    <TouchableOpacity 
      style={HomeSearchBarStyle.searchIconContainer}
      onPress={searchButtonClick}
    >
      <Image
        style={HomeSearchBarStyle.searchIcon}
        source={require('../../assets/search-icon.png')}
      />
    </TouchableOpacity>
    </View>
  )
}
export default HomeSearchBar;