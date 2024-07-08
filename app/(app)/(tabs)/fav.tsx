import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { db } from "~/db/firebaseConfig";
import { Player } from "~/types";
// import { useSession } from "../../../src/context/";

const FavPage = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  const playerRef = collection(db, "player");

  useEffect(() => {
    console.log("fetching players");
    const fetchPlayers = async () => {
      const playerQuery = query(playerRef, where("age", ">", 22));

      const snapshot = onSnapshot(playerQuery, querySnapshot => {
        const players: Player[] = [];
        querySnapshot.forEach(doc => {
          players.push(doc.data() as Player);
        });
        setPlayers(players);
      });
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
    </View>
  );
};

export default FavPage;
