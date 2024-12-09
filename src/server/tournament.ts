import axios from "axios";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { type ApiTournament, type FirebaseTournament } from "~/types";

/// FETCH ///

export const fetchLiveTennisTournamentsIds = async () => {
  console.log("\n🚀 ~ fetchLiveTennisTournamentsIds ~");
  const options = {
    method: "GET",
    url: "https://allsportsapi2.p.rapidapi.com/api/tennis/tournament/all/category/785", ///FOR ATP TOURNAMENTS
    headers: {
      "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
      "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.activeUniqueTournamentIds;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTounamentInfo = async (tournamentId: number) => {
  console.log("Fetching tournament info");
  const options = {
    method: "GET",
    url: `https://allsportsapi2.p.rapidapi.com/api/tennis/tournament/${tournamentId}/info`,
    headers: {
      "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
      "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    console.log("Tournament info fetched successfully.");
    return response.data.meta;
  } catch (error) {
    console.error(error);
  }
};

///MAP
export const mapTournament = (
  tournamentId: number,
  tournamentInfo: ApiTournament,
): FirebaseTournament => {
  const { surfaceType, gender, uniqueTournament } = tournamentInfo;
  const { name, tennisPoints } = uniqueTournament;

  const surface = surfaceType.includes("Hard")
    ? "hard"
    : surfaceType.includes("Clay")
      ? "clay"
      : "grass";

  const level = tennisPoints.toString().includes("2000")
    ? "grand slam"
    : tennisPoints.toString().includes("1000")
      ? "1000"
      : tennisPoints.toString().includes("500")
        ? "500"
        : "250";

  const playerSexe = gender === "M" ? "men" : "female";

  return {
    id: tournamentId,
    name,
    surface,
    level,
    playerSexe,
  };
};

///SET
export const setTournament = async (
  tournamentId: number,
  db: any,
): Promise<void> => {
  console.info("\n🚀 ~ setTournament ~ tournamentId:", tournamentId);
  const tournamentCollection = collection(db, "tournaments");
  const q = query(tournamentCollection, where("id", "==", tournamentId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    console.log("Tournament with this ID already exists. No action taken.");
    return;
  }

  // fetch tournament info
  const tournamentInfo = (await fetchTounamentInfo(
    tournamentId,
  )) as ApiTournament;

  if (tournamentInfo.uniqueTournament.slug.includes("doubles")) {
    console.log("Tournament is a doubles event. No action taken.");
    return;
  }

  //map tournament info
  const newTournamentData = mapTournament(tournamentId, tournamentInfo);

  try {
    await addDoc(tournamentCollection, newTournamentData);
    console.log("New tournament created successfully.");
  } catch (error) {
    console.error("Error creating tournament:", error);
  }
};
