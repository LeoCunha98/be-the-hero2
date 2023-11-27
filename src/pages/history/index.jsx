import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import logoImg from "../../assets/logo.png";
import styles from "./styles";

export default function History({ route }) {
  const navigation = useNavigation();
  const incidents = [
    { id: 1, title: "Incidente 1", description: "Descrição do incidente 1" },
    { id: 2, title: "Incidente 2", description: "Descrição do incidente 2" },
    { id: 3, title: "Incidente 3", description: "Descrição do incidente 3" },
  ];

  function navigateBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.incidentProperty, { marginTop: 20 }]}>
        Histórico de Incidentes que Você Ajudou:
      </Text>

      {incidents.length > 0 ? (
        <FlatList
          data={incidents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: "white",
                padding: 16,
                marginBottom: 16,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 8 }}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={[styles.incidentProperty, { marginTop: 20 }]}>
          Você não ajudou em nenhum incidente ainda.
        </Text>
      )}
    </View>
  );
}
