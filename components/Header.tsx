import React from "react";
import { colors } from "../config/theme"; // ✅ Importa los colores desde theme.ts
import { View, Text, Image, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")} // Asegúrate de colocar el logo en la carpeta correcta
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
    paddingHorizontal: 10,

    // 🔥 Asegura que no haya margen que reduzca el ancho
    marginHorizontal: 0,
    zIndex: 2,
  },
  logo: {
    width: "40%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  greenText: {
    color: "#4CAF50", // Ajusta el color según el diseño
  },
});

export default Header;
