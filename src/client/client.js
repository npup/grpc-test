import parseArgs from "minimist";

import { createClient } from "../util.js";
import { mainMenu } from "./menu.js";

// skapa hello-klient
const helloClient = createClient("hello", "Greeter");

// Hämta användarnamn från cli-anrop
const argv = parseArgs(process.argv.slice(2));
const [userName] = argv._;
if (!userName) {
    console.error(
        "#ERROR: Ange användarnamn som argument när du startar klienten!"
    );
    process.exit(1);
}

// Hälsa användaren med ett gRPC-anrop och visa sedan menyn.
helloClient.sayHello({ name: userName }, (err, response) => {
    console.log(response.message);
    console.log("Välkommen till detta test av gRPC.");
    mainMenu(userName);
});
