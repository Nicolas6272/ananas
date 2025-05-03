import * as admin from "firebase-admin";
import * as logger from "firebase-functions/logger";
import { onDocumentUpdated } from "firebase-functions/v2/firestore";

admin.initializeApp();

export const onTournamentUpdated = onDocumentUpdated(
  "tournaments/{tournamentId}",
  (event) => {
    const before = event.data?.before?.data();
    const after = event.data?.after?.data();
    const id = event.params.tournamentId;

    logger.info(`Tournoi ${id} mis à jour`);
    logger.debug("Avant :", before);
    logger.debug("Après :", after);

    return;
  },
);
