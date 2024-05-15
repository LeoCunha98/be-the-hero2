import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: StatusBar.currentHeight + 20,
  },
  profileContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "30px",
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  contactInfoContainer: {
    alignItems: "center",
  },
  contactInfoItem: {
    flexDirection: "row",
    marginBottom: 5,
  },
  contactInfoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  contactInfoValue: {
    fontSize: 16,
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  action: {
    backgroundColor: "#e02041",
    borderRadius: 8,
    height: 50,
    width: 140,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
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

export default styles;
