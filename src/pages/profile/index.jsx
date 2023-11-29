import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import profileImg from "../../assets/principe.jpg";
import { TouchableOpacity } from "react-native-web";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { auth } from "../../config/firebase";
import logoImg from "../../assets/logo.png"

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
        navigation.replace("Login")
      })
  }

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

    const response = {
      headers: {},
      data: {
        id: 1,
        fullName: "Leonardo Cunha",
        phoneNumber: "3299999999",
        email: "l@email.com",
        city: "Juiz de Fora",
        uf: "MG",
      },
    };

    setFullName(response.data.fullName);
    setPhoneNumber(response.data.phoneNumber);
    setEmail(response.data.email);
    setCity(response.data.city);
    setUf(response.data.uf);

    setLoading(false);
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
        <Image source={profileImg} style={styles.profilePicture} />
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
