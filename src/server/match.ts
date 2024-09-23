import axios from "axios";
import { DocumentData, QuerySnapshot, updateDoc } from "firebase/firestore";

/// FETCH
export const fetchEvent = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const date = `${day}/${month}/${year}`;
  const options = {
    method: "GET",
    url: `https://allsportsapi2.p.rapidapi.com/api/tennis/category/6/events/${date}`,
    headers: {
      "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
      "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

/// UPDATE
export const updateMatchInTournament = async (
  tournamentQuerySnapshot: QuerySnapshot<DocumentData, DocumentData>,
  matchId: number,
  matchData: any,
) => {
  console.info("Updating match :", matchId);

  try {
    await updateDoc(tournamentQuerySnapshot.docs[0].ref, matchData);
    console.log("Match updated successfully.");
  } catch (error) {
    console.error("Error updating match:", error);
  }
};
