import { Tabs } from "expo-router";
import { Calendar, Trophy } from "lucide-react-native";

export default () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#272625",
          borderTopColor: "#535252",
          borderTopWidth: 1,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="tournament"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Trophy color={color} size={size} />,
        }}
      />
    </Tabs>
  );
};
