// import axios from "axios";
// import { deleteApp } from "firebase/app";
// import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "./firebaseConfig";

// const fetchLiveTennisTournamentsIds = async () => {
//   const options = {
//     method: "GET",
//     url: "https://allsportsapi2.p.rapidapi.com/api/tennis/tournament/all/category/3", ///FOR ATP TOURNAMENTS
//     headers: {
//       "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
//       "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     return response.data.activeUniqueTournamentIds;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const fetchTounamentInfo = async (tournamentId: number) => {
//   console.log("🚀 ~ fetchTounamentInfo ~ tournamentId:", tournamentId);
//   const options = {
//     method: "GET",
//     url: `https://allsportsapi2.p.rapidapi.com/api/tennis/tournament/${tournamentId}/info`,
//     headers: {
//       "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
//       "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
//     },
//   };

//   try {
//     const response = await axios.request(options);
//     return response.data.meta;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const setTournament = async (tournamentId: number): Promise<void> => {
//   console.log("🚀 ~ setTournament ~ tournamentId:", tournamentId);

//   const tournamentCollection = collection(db, "tournaments");
//   const q = query(tournamentCollection, where("id", "==", tournamentId));
//   const querySnapshot = await getDocs(q);

//   if (!querySnapshot.empty) {
//     console.log("Tournament with this ID already exists. No action taken.");
//     return;
//   }

//   const { surfaceType, cityName, uniqueTournament, numberOfTeams, gender } =
//     await fetchTounamentInfo(tournamentId);
//   const { slug, tennisPoints } = uniqueTournament;

//   if (slug.includes("doubles")) {
//     console.log("Tournament is a doubles event. No action taken.");
//     return;
//   }

//   const surface = surfaceType.includes("Hard")
//     ? "hard"
//     : surfaceType.includes("Clay")
//       ? "clay"
//       : "grass";

//   const level = tennisPoints.toString().includes("2000")
//     ? "grand slam"
//     : tennisPoints.toString().includes("1000")
//       ? "1000"
//       : tennisPoints.toString().includes("500")
//         ? "500"
//         : "250";

//   const playerSexe = gender === "M" ? "men" : "female";

//   try {
//     await addDoc(tournamentCollection, {
//       id: tournamentId,
//       city: cityName,
//       surface,
//       level,
//       nbOfPlayer: numberOfTeams,
//       playerSexe,
//     });
//     console.log("New tournament created successfully.");
//   } catch (error) {
//     console.error("Error creating tournament:", error);
//   }
// };

// const setLiveTournament = async () => {
//   try {
//     const tournamentIds = await fetchLiveTennisTournamentsIds();
//     for (const tournamentId of tournamentIds) {
//       await setTournament(tournamentId);
//     }
//     console.log("Tournament operation completed successfully.");
//   } catch (error) {
//     console.error("Error in main:", error);
//   } finally {
//     await deleteApp(db.app);
//     console.log("App deleted successfully.");
//   }
// };

// const setEventToTournament = async (tournamentId: number, matchData: any) => {
//   /// test if match tournament is set in the database
//   const tournamentCollection = collection(db, "tournaments");
//   const q = query(tournamentCollection, where("id", "==", tournamentId));
//   const querySnapshot = await getDocs(q);
//   if (querySnapshot.empty) {
//     console.log("Tournament with this ID does not exist. No action taken.");
//     await deleteApp(db.app);
//   }

//   ///test if match already exist in the database
//   const matchCollection = collection(querySnapshot.docs[0].ref, "matches");
//   const q2 = query(matchCollection, where("id", "==", matchData.id));
//   const querySnapshot2 = await getDocs(q2);
//   if (!querySnapshot2.empty) {
//     console.log("Match with this ID already exists.");
//     await querySnapshot2[0].ref.update(matchData);
//     await deleteApp(db.app);
//     return;
//   }

//   /// add match to the tournament
//   try {
//     await addDoc(matchCollection, matchData);
//     console.log("Match added successfully.");
//   } catch (error) {
//     console.error("Error adding match:", error);
//   } finally {
//     await deleteApp(db.app);
//     console.log("App deleted successfully.");
//   }
// };

////////// EVENT //////

// const main2 = async () => {
//   // const today = new Date();
//   // const year = today.getFullYear();
//   // const month = today.getMonth() + 1;
//   // const day = today.getDate();
//   // const date = `${day}/${month}/${year}`;
//   // const options = {
//   //   method: "GET",
//   //   url: `https://allsportsapi2.p.rapidapi.com/api/tennis/category/6/events/${date}`,
//   //   headers: {
//   //     "x-rapidapi-key": "0285a688b9mshffca91e7709c68fp193cfbjsn1a821f7fe710",
//   //     "x-rapidapi-host": "allsportsapi2.p.rapidapi.com",
//   //   },
//   // };
//   // try {
//   //   const response = await axios.request(options);
//   //   console.log(response.data);
//   // } catch (error) {
//   //   console.error(error);
//   // }
// };

// main2();
// setLiveTournament();
// setEventToTournament(2449, {
//   id: 2342,
//   teamA: "Nadal R.",
//   teamB: "Djokovic N.",
//   scoreA: 2,
//   scoreB: 1,
// });

console.log("Hello world");
