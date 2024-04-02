import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight + 20,
  },

  map: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "30px",
  },

  incident: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 16,
    marginTop: 48,
  },

  incidentProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold",
    marginTop: 24,
  },

  incidentValue: {
    marginTop: 0,
    fontSize: 15,
    color: "#737380",
  },

  contactBox: {
    padding: 24,
    borderRadius: 8,
    backgroundColor: "#FFF",
    marginBottom: 16,
  },

  heroTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#13131a",
    lineHeight: 30,
  },

  heroDescription: {
    fontSize: 15,
    color: "#737380",
    marginTop: 16,
  },

  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  action: {
    backgroundColor: "#e02041",
    borderRadius: 8,
    height: 50,
    width: "48%",
    justifyContent: "center",
    alignItems: "center",
  },

  actionText: {
    color: "#FFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  logo: {
    width: 125,
    height: 50,
  },
});
