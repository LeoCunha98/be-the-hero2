import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function Header({ total, navigateToHistory, navigateToProfile }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Image source={logoImg} style={styles.logo} />
      <Text style={styles.headerText}>
        Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
      </Text>
    </View>
  );
}
