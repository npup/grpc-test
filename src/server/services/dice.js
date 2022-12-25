/**
 * implementation av endpoints i dice proto
 */
export function diceRoll(call, callback) {
    const { diceCount, diceSize } = call.request;
    const roll = getDiceResult(diceCount, diceSize);
    callback(null, {
        dice: `${diceCount}D${diceSize}`,
        roll,
    });
}

/**
 * Simulerar kast med ett antal tärningar av
 * samma typ, tex 4 st. 6-sidiga eller 2 st.
 * 20-sidiga ("4d6" resp. "2d20" på rollspelsspråk)
 * @param diceCount antal tärningar
 * @param diceSize antal sidor för tärningstypen
 * @returns slumpvärde i heltalsform
 */
function getDiceResult(diceCount, diceSize) {
    let result = 0;
    while (diceCount-- > 0) {
        result += rnd(diceSize);
    }
    return result;
}

function rnd(max = 100, min = 1) {
    return min + Math.floor(Math.random() * max);
}
