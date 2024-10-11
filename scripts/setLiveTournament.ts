import { deleteApp } from "firebase/app";
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
    // const tournamentIds = [2519];

    // set live tournaments in the database
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

setLiveTournament();
