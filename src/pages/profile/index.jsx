import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import profileImg from "../../assets/principe.jpg";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { auth, db } from "../../config/firebase";
import logoImg from "../../assets/logo.png";
import { ref, get } from "firebase/database";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [loading, setLoading] = useState(false);
  const [pickedImagePath, setPickedImagePath] = useState('');

  const navigation = useNavigation();
  

  const showImagePicker = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Sem permissão de acesso as imagens!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      saveImageToGallery(result.uri);
    }
  }

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Sem permissão de acesso a câmera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      saveImageToGallery(result.uri);
    }
  }

  const saveImageToGallery = async (imageUri) => {
      await MediaLibrary.saveToLibraryAsync(imageUri);
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error.message);
      });
  };

  function navigateBack() {
    navigation.goBack();
  }

  async function editProfile() {
    navigation.navigate("EditProfile");
  }

  async function loadProfile() {
    if (loading) {
      return;
    }

    setLoading(true);

    const user = auth.currentUser;

    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      try {
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (userData) {
          setFullName(userData.fullName);
          setPhoneNumber(userData.phoneNumber);
          setEmail(userData.email);
          setCity(userData.city);
          setUf(userData.uf);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error.message);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
      <Image 
          source={pickedImagePath ? { uri: pickedImagePath } : profileImg} 
          style={styles.profilePicture} 
        />
        <Text style={styles.fullName}>{fullName}</Text>
        <View style={styles.contactInfoContainer}>
          <View style={styles.contactInfoItem}>
            <Text style={styles.contactInfoLabel}>Telefone:</Text>
            <Text style={styles.contactInfoValue}>{phoneNumber}</Text>
          </View>
          <View style={styles.contactInfoItem}>
            <Text style={styles.contactInfoLabel}>Email:</Text>
            <Text style={styles.contactInfoValue}>{email}</Text>
          </View>
          <View style={styles.contactInfoItem}>
            <Text style={styles.contactInfoLabel}>Cidade:</Text>
            <Text style={styles.contactInfoValue}>{city}</Text>
          </View>
          <View style={styles.contactInfoItem}>
            <Text style={styles.contactInfoLabel}>UF:</Text>
            <Text style={styles.contactInfoValue}>{uf}</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={openCamera}>
            <Text style={styles.actionText}>Tirar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={showImagePicker}>
            <Text style={styles.actionText}>Selecionar imagem</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={editProfile}>
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={handleSignOut}>
            <Text style={styles.actionText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Profile;
