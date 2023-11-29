import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import profileImg from "../../assets/principe.jpg";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { auth, db } from "../../config/firebase";
import logoImg from "../../assets/logo.png"
import { getDatabase, ref, get } from "firebase/database";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

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
      console.log(user.uid);
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
        {/* <Image source={profileImg} style={styles.profilePicture} /> */}
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
