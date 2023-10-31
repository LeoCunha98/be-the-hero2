import { StyleSheet, StatusBar } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight + 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "30px",
  },
  incidentProperty: {
    fontSize: 14,
    color: "#41414d",
    fontWeight: "bold",
    marginTop: 24,
  },
  logo: {
    width: 125,
    height: 50,
  },
});
