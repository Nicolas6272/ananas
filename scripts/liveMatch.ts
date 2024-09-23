import { deleteApp } from "firebase/app";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { updateMatchInTournament } from "../src/server/match";
import {
  fetchLiveTennisTournamentsIds,
  setTournament,
} from "../src/server/tournament";
import { db } from "./firebaseConfig";

/// ACTUALIZE LIVE TOURNAMENTS IN DB ///
const setLiveTournament = async () => {
  console.info("-- Starting to set live tournaments in the database --");
  try {
    const tournamentIds = await fetchLiveTennisTournamentsIds();
    console.info(
      "Tournament IDs fetched successfully with ids: ",
      tournamentIds,
    );
    for (const tournamentId of tournamentIds) {
      await setTournament(tournamentId, db);
    }
    console.info("\nTournament operation completed successfully.");
  } catch (error) {
    console.error("Error in main:", error);
  } finally {
    await deleteApp(db.app);
    console.log("👌 App deleted successfully.");
  }
};

const setEventToTournament = async (tournamentId: number, matchData: any) => {
  /// test if match tournament is set in the database
  const tournamentCollection = collection(db, "tournaments");
  const q = query(tournamentCollection, where("id", "==", tournamentId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log("Tournament with this ID does not exist. No action taken.");
    await deleteApp(db.app);
  }

  ///test if match already exist in the database
  const matchCollection = collection(querySnapshot.docs[0].ref, "matches");
  const q2 = query(matchCollection, where("id", "==", matchData.id));
  const querySnapshot2 = await getDocs(q2);
  if (!querySnapshot2.empty) {
    await updateMatchInTournament(querySnapshot, matchData.id, matchData);
    await deleteApp(db.app);
    return;
  }

  /// add match to the tournament
  try {
    await addDoc(matchCollection, matchData);
    console.log("Match added successfully.");
  } catch (error) {
    console.error("Error adding match:", error);
  } finally {
    await deleteApp(db.app);
    console.log("App deleted successfully.");
  }
};

////////// EVENT //////

setLiveTournament();
// setEventToTournament(2449, {
//   id: 2342,
//   teamA: "Nadal R.",
//   teamB: "Djokovic N.",
//   scoreA: 6,
//   scoreB: 4,
// });
