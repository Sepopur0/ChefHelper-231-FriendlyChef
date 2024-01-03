import BackTopBarNavigator from "../components/backTopBarNavigator";
import { ManageAccountStyle } from "../style/manageAccountStyle";
import { View, SafeAreaView, StatusBar, Text, Image, TouchableOpacity, TextInput} from "react-native";
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import useProfile from "../services/auth/profile";
import CommonTextInput from "../components/textInput";

export default ManageAccountPage = ({route}) => {
  const accessToken = route?.params?.accessToken;
  const navigation = useNavigation();
  
  const { data: profileData, isError, isLoading, error: profileError } = useProfile(accessToken);

  const [avatar, setAvatar] = useState(profileData.data.avatar);
  const [name, setName] = useState(profileData.data.fullName);
  const [email, setEmail] = useState(profileData.data.email);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if(isLoading){
    return (
      <SafeAreaView style={ManageAccountStyle.container}>
        <StatusBar style={ManageAccountStyle.statusBar} />
        <BackTopBarNavigator pageName={"Manage Account"} />
        <Text style={[ManageAccountStyle.loadingText,{marginTop:'50%'}]}>Loading...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={ManageAccountStyle.container}>
      <StatusBar style={ManageAccountStyle.statusBar} />
      <BackTopBarNavigator pageName={"Manage Account"} />

      <View style={ManageAccountStyle.imageContainer}>
        <Image
          source={{uri:avatar}}
          style={ManageAccountStyle.image}
        />
      </View>

      <Text style={ManageAccountStyle.normalText}>Name</Text>
      <CommonTextInput 
        type="cancelable" 
        value={name} 
        onChangeText={(e)=>{setName(e)}}
        // style={ManageAccountStyle.textInput}
      />

      <Text style={ManageAccountStyle.normalText}>Email</Text>
      <CommonTextInput 
        type="cancelable" 
        value={email} 
        onChangeText={(e)=>{setEmail(e)}}
        // style={ManageAccountStyle.textInput}
      />

      <Text style={ManageAccountStyle.normalText}>Password</Text>
      <CommonTextInput
        type="hide" 
        value={password} 
        onChangeText={(e)=>{setPassword(e)}}
        // style={ManageAccountStyle.textInput}
      />

      <Text style={ManageAccountStyle.normalText}>New password</Text>
      <CommonTextInput
        type="hide" 
        value={newPassword} 
        onChangeText={(e)=>{setNewPassword(e)}}
        // style={ManageAccountStyle.textInput}
      />

      <Text style={ManageAccountStyle.normalText}>Confirm Password</Text>
      <CommonTextInput
        type="hide" 
        value={confirmPassword} 
        onChangeText={(e)=>{setConfirmPassword(e)}}
        // style={ManageAccountStyle.textInput}
      />

      <TouchableOpacity style={ManageAccountStyle.button}>
        <Text style={ManageAccountStyle.loadingText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
