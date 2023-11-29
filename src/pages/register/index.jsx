import { auth, db } from "../../config/firebase";
import { ref, set } from "firebase/database";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";

import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(require("../../assets/blank-profile.png"));

  const navigation = useNavigation();

  const handleCreate = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userId = auth.currentUser.uid;
      const userRef = ref(db, `users/${userId}`);
      set(userRef, {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        city: city,
        uf: uf,
        donations: [],
        // profile_picture : image
      })
        .then(() => {
          console.log(
            "Dados do usuário adicionados ao Realtime Database com sucesso"
          );
          navigation.replace("Login");
        })
        .catch((error) => {
          console.log(
            "Erro ao adicionar dados do usuário ao Realtime Database: " +
              error.message
          );
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    } else {
      const defaultImage = require("../../assets/blank-profile.png");
      setImage({ uri: defaultImage });
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Realizar Cadastro</Text>

      <Image source={image} style={styles.profilePicture} />
      <TouchableOpacity onPress={handleImagePicker}>
        <Text>Alterar Imagem</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome Completo"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Telefone"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.input}
          maxLength={11}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Cidade"
          value={city}
          onChangeText={(text) => setCity(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="UF"
          value={uf}
          onChangeText={(text) => setUf(text)}
          style={styles.input}
          maxLength={2}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleCreate}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;
