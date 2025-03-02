import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import type { MaterialIcons as MaterialIconsType } from "@expo/vector-icons";

type TabScreen = {
  name: string;
  title: string;
  icon: keyof typeof MaterialIconsType.glyphMap;
};

export const MainTabs = () => {
  const tabScreens: TabScreen[] = [
    {
      name: "notificaciones",
      title: "Notificaciones",
      icon: "notifications",
    },
    {
      name: "index",
      title: "Inicio",
      icon: "home",
    },
    {
      name: "perfil",
      title: "Perfil",
      icon: "person",
    },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
      }}
    >
      {tabScreens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name={screen.icon} size={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
};
