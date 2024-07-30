import axios from "axios";
import { deleteApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Match } from "~/types";
import { db } from "./firebaseConfig";

const fetchLiveTennisEvents = async (): Promise<Match[]> => {
  const options = {
    method: "GET",
    url: "https://allsportsapi2.p.rapidapi.com/api/tennis/events/live",
    headers: {
      "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
      "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
    },
  };

  try {
    const response = await axios.request(options);
    const events = response.data.events;
    const liveMatch: Match[] = events.map((event: any) => {
      const player1 = event.awayTeam.name;
      const player1Score = event.awayScore;
      const player2 = event.homeTeam.name;
      const player2Score = event.homeScore;
      return { player1, player1Score, player2, player2Score } as Match;
    });
    return liveMatch;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const addOrUpdateMatch = async (match: Match) => {
  const matchesCollection = collection(db, "match");

  // Create a query against the collection
  const q = query(
    matchesCollection,
    where("player1", "==", match.player1),
    where("player2", "==", match.player2),
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    // No matching documents, add new match
    const newMatchRef = doc(matchesCollection);
    try {
      await setDoc(newMatchRef, match);
      console.log(
        `Match between ${match.player1} and ${match.player2} added successfully!`,
      );
    } catch (error) {
      console.error("Error adding match: ", error);
    }
  } else {
    // Matching document found, update it
    querySnapshot.forEach(async doc => {
      try {
        console.log("Updating match: ", doc.id);
        await setDoc(doc.ref, match, { merge: true });
        console.log(
          `Match between ${match.player1} and ${match.player2} updated successfully!`,
        );
      } catch (error) {
        console.error("Error updating match: ", error);
      }
    });
  }
};

const addMatchesToFirestore = async () => {
  const liveMatch = await fetchLiveTennisEvents();
  for (const match of liveMatch) {
    await addOrUpdateMatch(match);
  }

  console.log("All matches processed successfully!");
  try {
    await deleteApp(db.app);
  } catch (error) {
    console.error("Error deleting app: ", error);
  }
};

addMatchesToFirestore();
