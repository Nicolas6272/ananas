import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FIREBASE_DB } from "../../../FirebaseConfig";
import { useSession } from "../../../ctx";

export default function FavPage() {
  const { signOut } = useSession();
  const [players, setPlayers] = useState([]);

  const playerRef = collection(FIREBASE_DB, "player");

  useEffect(() => {
    const fetchPlayers = async () => {
      const snapshot = await getDocs(playerRef);
      const playersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(playersList);
    };

    fetchPlayers();
  });

  return (
    <View className="flex h-full items-center justify-center bg-red-500">
      <Text>Fav</Text>
      {players.map((player, index) => (
        <Text key={index}>{player.firstname}</Text>
      ))}
      <Text onPress={signOut}>LOGOUT!</Text>
    </View>
  );
}
