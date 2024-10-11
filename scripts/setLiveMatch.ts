import { deleteApp } from "firebase/app";
import { fetchTodayEvent, setEventToTournament } from "../src/server/match";
import { db } from "./firebaseConfig";

/// ACTUALIZE LIVE MATCHES IN DB ///
const setLiveMatch = async () => {
  console.info("-- Starting to set live matches in the database --");

  // fetch today events
  const todayEvents = await fetchTodayEvent();
  console.info("Today events fetched successfully.");

  for (const event of todayEvents) {
    await setEventToTournament(db, event);
  }
  await deleteApp(db.app);
};

setLiveMatch();
