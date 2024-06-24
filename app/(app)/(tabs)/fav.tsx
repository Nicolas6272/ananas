import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { FIREBASE_DB } from "../../../FirebaseConfig";
import { useSession } from "../../../ctx";

const FavPage = () => {
  const { signOut } = useSession();
  const [players, setPlayers] = useState([]);

  const playerRef = collection(FIREBASE_DB, "player");

  useEffect(() => {
    console.log("fetching players");
    const fetchPlayers = async () => {
      const playerQuery = query(playerRef, where("age", ">", 22));

      const snapshot = await getDocs(playerRef);
      const playersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(playersList);
    };

    fetchPlayers();
  }, []);

  return (
    <View className="flex h-full items-center justify-center bg-red-500">
      <Text>Fav</Text>
      {players.map((player, index) => (
        <View className="flex flex-row gap-2" key={index}>
          <Text>{player.firstname}</Text>
          <Text>{player.lastname}</Text>
        </View>
      ))}
      <Text onPress={signOut}>LOGOUT!</Text>
    </View>
  );
};

export default FavPage;
