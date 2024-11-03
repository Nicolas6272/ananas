import { Tabs } from "expo-router";
import { Calendar } from "lucide-react-native";

import Header from "~/components/organisms/Header";

export default () => {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#747474",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#272625",
          borderTopColor: "#535252",
          borderTopWidth: 1,
        },
        header: ({ options }) => <Header title={options.title} />,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calendrier",
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="tournament"
        options={{
          title: "Tournament",
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      /> */}
    </Tabs>
  );
};
