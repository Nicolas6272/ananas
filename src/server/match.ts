import axios from "axios";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import { ApiMatch, ApiMatchInfo, FirebaseMatch } from "~/types";
import { getTodayDate } from "../helpers/date";

/// FETCH
export const fetchTodayEvent = async () => {
  const todayDate = getTodayDate();
  const options = {
    method: "GET",
    url: `https://allsportsapi2.p.rapidapi.com/api/tennis/category/3/events/${todayDate}`,
    headers: {
      "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
      "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.events;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchEventInfo = async (eventId: number) => {
  const options = {
    method: "GET",
    url: `https://allsportsapi2.p.rapidapi.com/api/tennis/event/${eventId}`,
    headers: {
      "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
      "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.event;
  } catch (error) {
    console.error(error);
    return {};
  }
};

/// MAP
export const mapMatch = (event: ApiMatch): FirebaseMatch => {
  return {
    id: event.id,
    startTimestamp: event.startTimestamp,
    statusCode: event.status.code,
    playerAName: event.homeTeam.name,
    playerBName: event.awayTeam.name,
    period1A: event.homeScore.period1 || 0,
    period2A: event.homeScore.period2 || 0,
    period3A: event.homeScore.period3 || 0,
    pointA: event.homeScore.point || "0",
    period1B: event.awayScore.period1 || 0,
    period2B: event.awayScore.period2 || 0,
    period3B: event.awayScore.period3 || 0,
    pointB: event.awayScore.point || "0",
  };
};

/// UPDATE
export const updateMatchInTournament = async (
  tournamentQuerySnapshot: QuerySnapshot<DocumentData, DocumentData>,
  matchData: Partial<FirebaseMatch>,
) => {
  try {
    const update = await updateDoc(
      tournamentQuerySnapshot.docs[0].ref,
      matchData,
    );
    console.log("Match updated successfully.");
    return update;
  } catch (error) {
    console.error("Error updating match:", error);
  }
};

//SET

export const setEventToTournament = async (db: any, matchData: ApiMatch) => {
  /// test if match tournament is set in the database
  const tournamentId = matchData.tournament.uniqueTournament.id;
  const tournamentCollection = collection(db, "tournaments");
  const q = query(tournamentCollection, where("id", "==", tournamentId));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.log("Tournament with this ID does not exist. No action taken.");
    return;
  }

  ///test if match already exist in the database
  const matchCollection = collection(querySnapshot.docs[0].ref, "matches");
  const q2 = query(matchCollection, where("id", "==", matchData.id));
  const querySnapshot2 = await getDocs(q2);
  const mapMatchData = mapMatch(matchData);

  if (!querySnapshot2.empty) {
    if (mapMatchData.statusCode === 9) {
      await updateMatchInTournament(querySnapshot2, mapMatchData);
    }
    return;
  }

  /// add match to the tournament
  try {
    const matchInfo = (await fetchEventInfo(matchData.id)) as ApiMatchInfo;

    await addDoc(matchCollection, {
      ...mapMatchData,
      stadium: matchInfo.venue.stadium.name,
    });
    console.log("Match added successfully.");
  } catch (error) {
    console.error("Error adding match:", error);
  }
};
