import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "@/config/theme";
import { typography } from "@/config/typography";

type MenuItem = {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  onPress: () => void;
};

export default function PerfilScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.editAvatarButton}>
            <MaterialIcons name="edit" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nombre}>Laura Martinez</Text>
        <Text style={styles.email}>laura55@gmail.com</Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>General</Text>
        <TouchableOpacity style={styles.optionItem}>
          <MaterialIcons name="person-outline" size={24} color="#1e293b" />
          <Text style={styles.optionText}>Editar Datos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <MaterialIcons name="lock-outline" size={24} color="#1e293b" />
          <Text style={styles.optionText}>Actualiza la contraseña</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <TouchableOpacity style={styles.optionItem}>
          <MaterialIcons name="accessibility" size={24} color="#1e293b" />
          <Text style={styles.optionText}>Accesibilidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#ef4444" />
          <Text style={[styles.optionText, { color: "#ef4444" }]}>
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: "absolute",
    right: -5,
    bottom: -5,
    backgroundColor: "#2563eb",
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  nombre: {
    ...typography.bold.regular,
    color: colors.accent,
    marginBottom: 2,
  },
  email: {
    ...typography.bold.regular,
    color: colors.accent,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 10,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
    color: "#1e293b",
  },
});
