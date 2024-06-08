import { Link } from "expo-router";
import { View } from "react-native";

const Navbar = () => {
  return (
    <View>
      <Link href="/">Home</Link>
      <Link href="/fav">FAV</Link>
    </View>
  );
};

export default Navbar;
