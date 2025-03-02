import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Notificacion = {
  id: string;
  titulo: string;
  mensaje: string;
  fecha: string;
  leida: boolean;
};

// Datos de ejemplo para las notificaciones
const notificaciones: Notificacion[] = [
  {
    id: "1",
    titulo: "Nuevo consumo registrado",
    mensaje: "Se ha registrado un nuevo consumo en tu predio",
    fecha: "2024-03-01",
    leida: false,
  },
  {
    id: "2",
    titulo: "Factura disponible",
    mensaje: "Tu factura del mes está disponible para pago",
    fecha: "2024-03-01",
    leida: true,
  },
];

export default function NotificacionesScreen() {
  const renderNotificacion = ({ item }: { item: Notificacion }) => (
    <View style={[styles.notificacionItem, !item.leida && styles.noLeida]}>
      <MaterialIcons
        name={item.leida ? "notifications" : "notifications-active"}
        size={24}
        color={item.leida ? "#64748b" : "#2563eb"}
      />
      <View style={styles.notificacionContenido}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.mensaje}>{item.mensaje}</Text>
        <Text style={styles.fecha}>{item.fecha}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notificaciones}
        renderItem={renderNotificacion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    padding: 16,
  },
  notificacionItem: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  noLeida: {
    backgroundColor: "#f8fafc",
    borderColor: "#2563eb",
  },
  notificacionContenido: {
    marginLeft: 12,
    flex: 1,
  },
  titulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  mensaje: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 4,
  },
  fecha: {
    fontSize: 12,
    color: "#94a3b8",
  },
});
