import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ref, get } from "firebase/database";
import { db } from "../../config/firebase";

import Header from "../../components/header";

import styles from "./styles";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  function navigateToDetail(incident) {
    navigation.navigate("Detail", { incident });
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

      setIncidents([...incidents, ...incidentsArray]);
      setTotal(incidentsArray.length);
      setPage(page + 1);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
       <Header
        total={total}
      />
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALOR</Text>
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
              <Feather name="arrow-right" size={16} color="#E02041" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
