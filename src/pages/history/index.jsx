import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import logoImg from "../../assets/logo.png";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";

import styles from "./styles";

export default function History() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", {
      incident,
      isFromHistory: true,
    });
  }

  function navigateBack() {
    navigation.goBack();
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length >= total) {
      return;
    }

    setLoading(true);

    const incidentsRef = ref(db, "incidents");
    const snapshot = await get(incidentsRef);
    const data = snapshot.val();

    if (data) {
      const incidentsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setTotal(incidentsArray.length);
      setIncidents([...incidents, ...incidentsArray]);
      setPage(page + 1);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

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
          keyExtractor={(incident) => String(incident.id)}
          onEndReached={loadIncidents}
          onEndReachedThreshold={0.2}
          renderItem={({ item: incident }) => (
            <View
              style={{
                marginTop: 30,
                backgroundColor: "white",
                padding: 10,
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
                {incident.title}
              </Text>
              <Text style={styles.incidentValue}>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(incident.value)}
              </Text>
              <Pressable
                style={styles.detailsButton}
                onPress={() => navigateToDetail(incident)}
              >
                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              </Pressable>
            </View>
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
