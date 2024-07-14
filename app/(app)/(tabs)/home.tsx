import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import ButtonPrimary from "~/components/atoms/button/ButtonPrimary";
import { useAuth } from "~/context/authContext";
import { db } from "~/db/firebaseConfig";
import { Match } from "~/types";

export default function HomePage() {
  const { logout, user } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  const matchRef = collection(db, "match");
  const [matchs, setMatchs] = useState<Match[]>([]);
  console.log("🚀 ~ HomePage ~ matchs:", matchs);

  useEffect(() => {
    const fetchMatch = async () => {
      const snapshot = onSnapshot(matchRef, querySnapshot => {
        const matchs: Match[] = [];
        querySnapshot.forEach(doc => {
          matchs.push(doc.data() as Match);
        });
        setMatchs(matchs);
      });
    };

    fetchMatch();
  }, []);

  return (
    <View className="h-full bg-blue-500">
      <View className="flex h-full flex-col items-center justify-center space-y-2 bg-green-400">
        <Text>Bonjour {user?.username}</Text>
        {matchs.map((match, index) => (
          <View className="flex flex-row gap-2" key={index}>
            <Text>{match.player1}</Text>
            <Text>{match.player1Score.period1}</Text>
            <Text>{match.player1Score.period2}</Text>
            <Text>{match.player2}</Text>
            <Text>{match.player2Score.period1}</Text>
            <Text>{match.player2Score.period2}</Text>
          </View>
        ))}
        <ButtonPrimary />
      </View>
    </View>
  );
}
