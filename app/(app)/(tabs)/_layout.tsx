import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="fav"
        options={{
          headerShown: false,
          title: "Fav",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="star" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};
