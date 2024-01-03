import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StatusBar, Text, Image, ScrollView, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import useProfile from "../services/auth/profile";
import { useRecipeUploadedByUser, fetchRecipeUploadedByUser } from "../services/recipe/fetchUserRecipes";
import { useRecipeBookmarkedByUser, fetchRecipeBookmarkedByUser } from "../services/recipe/fetchBookmarkedRecipeById";
import { Feather } from '@expo/vector-icons';
import RecipeCard from "../components/recipeCard";
import BottomNavigator from "../components/bottomNavigator";
import CommonTopBarNavigator from "../components/topBarNavigator";
import CommonButton from "../components/button";
import { colorPalette } from "../utils/systemDesign";
export default function ProfilePage() {
    const [accessToken, setAccessToken] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const { data: profileData, isError, isLoading: isLoading, error: profileError } = useProfile(accessToken);
    const [avatar, setAvatar] = useState('https://s.net.vn/wU5m');
    const [name, setName] = useState("user01");
    const [userName, setUserName] = useState("Topher Nguyen");
    const [isUserRecipe, setIsUserRecipe] = useState(true);//recipe or bookmark
    let uploadedData = []
    let bookmarkedData = []
    const navigation = useNavigation();
    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                if (token != null) {
                    setIsLogin(true)
                    setAccessToken(token);
                }
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };
        fetchAccessToken();
    }, []);
    useEffect(() => {
        async function getRecipes(id) {
            const { data: uploadedRecipes, error: uploadedRecipeError, isLoading: uploadedRecipeIsLoading } = await fetchRecipeUploadedByUser(id);
            uploadedData = uploadedRecipes

            const { data: bookmarkedRecipes, error: bookmarkedRecipeError, isLoading: bookmarkedRecipeIsLoading } = await fetchRecipeBookmarkedByUser(id);
            bookmarkedData = bookmarkedRecipes
        }
        if (isLogin && profileData?.data) {
            setAvatar(profileData.data.avatar || 'https://s.net.vn/wU5m');
            setUserName(profileData.data.userName || "Topher Nguyen")
            if (profileData.data.fullName) {
                setName(profileData.data.fullName);
            } else {
                setName(profileData.data.userName || 'user01');
            }
            getRecipes(profileData.data.id);
        }
    }, [isLogin, profileData]);

    const toLogin = () => {
        navigation.navigate('Authencitation')
    }

    const uploadRecipe = () => {
        if(!isLogin){
            navigation.navigate('Authencitation')
        }
        navigation.navigate('UploadPage')
    }

    if (isLoading) {
        return (
            <SafeAreaView style={ProfileStyle.container}>
                <StatusBar style={ProfileStyle.statusBar} />
                <CommonTopBarNavigator pageName={"Profile"} />
                <Text style={ProfileStyle.loadingText}>Loading...</Text>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={ProfileStyle.container}>
            <StatusBar style={ProfileStyle.statusBar} />
            <CommonTopBarNavigator pageName={"Profile"} />
            {!isLogin ?
                <View style={ProfileStyle.centering}>
                    <Text style={ProfileStyle.text}>To view your profile, please login or register</Text>
                    <CommonButton width="60%" action={toLogin} containerStyle={{ margin: '5%' }} style={ProfileStyle.button}>
                        <Text style={ProfileStyle.buttonText}>To Authencitation page</Text>
                    </CommonButton>

                </View> :
                <View style={ProfileStyle.main}>
                    <View style={ProfileStyle.background} />
                    <View style={{ width: '100%' }}>
                        <View style={ProfileStyle.imageContainer}>
                            <Image
                                source={{ uri: avatar }}
                                style={ProfileStyle.image}
                            />
                            <Text style={ProfileStyle.nameText}>{name}</Text>
                            <Text style={[ProfileStyle.text, { color: colorPalette.color13 }]}>{userName}</Text>
                        </View>
                        <View style={ProfileStyle.buttonContainer}>
                            {/* button */}
                            <CommonButton width="45%" style={[ProfileStyle.smallButton, { backgroundColor: isUserRecipe ? colorPalette.color11 : colorPalette.color6 }]} action={() => { setIsUserRecipe(true) }}>
                                <Text style={[ProfileStyle.buttonText, { color: colorPalette.color13 }]}> My recipes</Text>
                            </CommonButton>
                            <CommonButton width="45%" style={[ProfileStyle.smallButton, { backgroundColor: !isUserRecipe ? colorPalette.color11 : colorPalette.color6 }]} action={() => { console.log(uploadedData); setIsUserRecipe(false) }}>
                                <Text style={[ProfileStyle.buttonText, { color: colorPalette.color13 }]}> My bookmark</Text>
                            </CommonButton>
                        </View>
                        <ScrollView>

                        </ScrollView>


                    </View>
                </View>}
            <View style={{ width: '100%', alignItems: 'center', position: 'absolute', bottom: '11%', left: '7%' }}>
                <CommonButton width="50%" style={ProfileStyle.uploadButton} action={uploadRecipe}>
                    <Feather name="plus-circle" size={24} color="black" />
                    <Text style={[ProfileStyle.buttonText, { fontWeight: 300, color: colorPalette.color13 }]}>Upload recipe</Text>
                </CommonButton>
            </View>
            <BottomNavigator buttonIndex={1} />
        </SafeAreaView>
    );
}

const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingHorizontal: 20,
        backgroundColor: colorPalette.color13,
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    main: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    background: {
        backgroundColor: 'white',
        borderTopEndRadius: 450,
        borderTopStartRadius: 450,
        width: 700,
        height: 900,
        marginTop: '20%',
        position: 'absolute',
        overflow: 'hidden'
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: colorPalette.color4
    },
    nameText: {
        color: colorPalette.color13,
        fontSize: 30,
        textAlign: 'center'
    },
    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        color: colorPalette.color4,
        fontWeight: '700'
    },
    button: {
        flexDirection: 'row',
        backgroundColor: colorPalette.color11,
        minHeight: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        opacity: 0.9,
        borderRadius: 20,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallButton: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        opacity: 0.9,
        borderRadius: 20,
        width: '100%'
    },
    uploadButton: {
        flexDirection: 'row',
        paddingHorizontal: '10%',
        justifyContent: 'space-between',
        backgroundColor: colorPalette.color1,
        height: 40,
        alignItems: 'center',
        opacity: 0.9,
        borderRadius: 20,
    },
    statusBar: {
        animated: true,
        backgroundColor: colorPalette.color13,
        barStyle: 'light-content',
        showHideTransition: 'slide'
    },
    imageContainer: {
        width: '100%',
        marginVertical: 20,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    loadingText: {
        color: colorPalette.color4,
        fontWeight: '400',
        fontSize: 20,
        textAlign: 'center',
        marginTop: '50%'
    },
})
