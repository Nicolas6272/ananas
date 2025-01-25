import { exec } from "child_process";
import { CronJob } from "cron";

// Fonction pour exécuter un script
const runScript = (scriptName: string) => {
  exec(`yarn ts-node ${scriptName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(
        `Erreur lors de l'exécution de ${scriptName}:`,
        error.message,
      );
      return;
    }
    if (stderr) {
      console.error(`Erreur (stderr) pour ${scriptName}:`, stderr);
      return;
    }
    console.log(`Résultat pour ${scriptName}:\n${stdout}`);
  });
};

// Planifiez une tâche toutes les secondes
const job = new CronJob("0 * * * *", () => {
  console.log("Exécution du script à : ", new Date().toISOString());
  runScript("scripts/setLiveMatch.ts");
});

job.start();
