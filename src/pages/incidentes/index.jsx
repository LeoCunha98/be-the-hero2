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

import logoImg from "../../assets/logo.png";

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

  function navigateToHistory() {
    navigation.navigate("History", { incidents: incidents });
  }


  async function loadIncidents() {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length >= total) {
      return;
    }

    setLoading(true);

    const response = {
      headers: { "x-total-count": 2 },
      data: [
        {
          id: 1,
          name: "ONG 1",
          title: "Incidente 1",
          name: "Incidente 1",
          value: 50,
          email: "asdasd@sadas.com",
          whatsapp: "22123123",
          city: "Juiz de fora",
          uf: "MG",
        },
        {
          id: 2,
          name: "ONG 1",
          title: "Incidente 2",
          name: "Incidente 2",
          value: 50,
          email: "asdad@asda.com",
          whatsapp: "12123123",
          city: "Juiz de fora",
          uf: "MG",
        },
      ],
    };

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
        <TouchableOpacity
          style={styles.historyButton}
          onPress={navigateToHistory}
        >
          <Text style={styles.historyButtonText}>Ver Histórico</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>
        Escolha um dos casos abaixo e salve o dia.
      </Text>

      <FlatList
        style={styles.incidentList} // Correção de 'styles' para 'style'
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
