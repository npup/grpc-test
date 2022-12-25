import menu from "cli-menu";
import { createClient } from "../util.js";
import dotenv from "dotenv";
dotenv.config();

// skapa hello-klient
const diceClient = createClient("diceroll", "Dice");

// Menyn med dess olika val
export function mainMenu(name) {
    performReset(name);
    menu({
        menu_items: [
            {
                key: "1",
                name: `Rulla tärning (1d6)`,
                action() {
                    performRoll(1, 6);
                },
            },
            {
                key: "2",
                name: `Rulla tärning (1d20)`,
                action() {
                    performRoll(1, 20);
                },
            },
            {
                key: "3",
                name: `Rulla tärning (1d100)`,
                action() {
                    performRoll(1, 100);
                },
            },
            {
                key: "v",
                name: "Visa statistik",
                action() {
                    performStats();
                },
            },
            {
                key: "n",
                name: "Nollställ statistik",
                action() {
                    performReset(name);
                },
            },
            {
                key: "a",
                name: "Avsluta",
                action() {
                    performExit();
                },
            },
        ],
    });
}

// lokalt state, för statistik
let state = {
    statsShown: 0,
    resets: 0,
};

/**
 * Menyalternativen
 */
function performReset(name) {
    console.log(`\n\nStatistik rensad.`);
    state = {
        ...state,
        name,
        resets: state.resets + 1,
        rolls: [],
    };
}

// rulla önskad tärning
function performRoll(diceCount, diceSize) {
    // anropa Dice-servicen, uppdatera state med resultatet
    diceClient.diceRoll({ diceCount, diceSize }, (err, response) => {
        const { dice, roll } = response;
        console.log(`\n\nTärning rullad. ${dice} => ${roll}`);
        state.rolls.push({ dice, roll });
    });
}

// visa statistik
function performStats() {
    const { rolls } = state;
    console.log(`\n\nDu har rullat tärning ${rolls.length} gång/er.`);
    if (rolls.length < 1) {
        return;
    }
    state.statsShown += 1;
    const sums = rolls.map(({ roll }) => roll);
    const max = Math.max(...sums);
    const min = Math.min(...sums);
    const sum = sums.reduce((sum, score) => sum + score, 0);
    console.log(`\nHögsta resultat: ${max}`);
    console.log(`Lägsta resultat: ${min}`);
    console.log(`  Medelresultat: ${(sum / rolls.length).toFixed(2)}`);
    console.log(`Du har visat statistik ${state.statsShown} gång/er.`);
    console.log(`Du har nollställt statistik ${state.resets} gång/er.`);
}

// avsluta
function performExit() {
    console.log(`\n\n---- Hej då, ${state.name}.`);
    process.exit(0);
}
