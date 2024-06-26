import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, Linking, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import * as MailComposer from "expo-mail-composer";
//import { ProgressCircle } from 'react-native-svg-charts'
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
//import MapView, { Marker } from "react-native-maps";


import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  // const [mapRegion, setMapRegion] = useState({
  //   latitude: -21.762103515874447,
  //   longitude: -43.348698703673286,
  //   latitudeDelta: 0.009,
  //   longitudeDelta: 0.009,
  // });

  const screenWidth = Dimensions.get('window').width;

  const data = {
    data: [0.8]
  };
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(224, 32, 65, ${opacity})`,
    strokeWidth: 6, // Espessura do traço
    barPercentage: 0.5,
  };


  const { incident, isFromHistory } = route.params;

  const message = `Olá ${incident.name
    }, estou entrando em contato pois gostaria de ajudar no caso "${incident.title
    }" com o valor de ${Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(incident.value)}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} style={styles.logo} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#E02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>
          {`${incident.name} de ${incident.city}/${incident.uf}`}
        </Text>

        <Text style={styles.incidentProperty}>CASO</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALOR</Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(incident.value)}
        </Text>
      </View>
      {!isFromHistory && (
        <View style={styles.contactBox}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
          <Text style={styles.heroDescription}>Entre em contato: </Text>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
              <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={sendMail}>
              <Text style={styles.actionText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={styles.contactBox}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Meta:</Text>
        <ProgressChart
          data={data}
          width={screenWidth * 0.8}
          height={220}
          strokeWidth={25}
          radius={80}
          chartConfig={chartConfig}
          hideLegend={true}
        />
      </View>
      {/* <View style={styles.map}>
        <MapView
          style={{ alignSelf: 'stretch', height: 300 }}
          region={mapRegion}
        >
          <Marker coordinate={mapRegion} title='ONG AJUDA' />
        </MapView>
      </View> */}
    </ScrollView>
  );
}
