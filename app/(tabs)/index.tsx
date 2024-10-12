import { useEffect } from "react";
import { View } from "react-native";

export default function HomePage() {
  // const { logout, user } = useAuth();
  // const handleLogout = async () => {
  //   await logout();
  // };
  // const matchRef = collection(db, "match");
  // const [matchs, setMatchs] = useState<ApiMatch[]>([]);

  useEffect(() => {
    // const fetchMatch = async () => {
    //   const snapshot = onSnapshot(matchRef, querySnapshot => {
    //     const matchs: ApiMatch[] = [];
    //     querySnapshot.forEach(doc => {
    //       matchs.push(doc.data() as ApiMatch);
    //     });
    //     setMatchs(matchs);
    //   });
    // };
    // fetchMatch();
  }, []);

  return <View className="h-full bg-blue-500" />;
}
