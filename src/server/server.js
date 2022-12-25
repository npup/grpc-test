import grpc from "@grpc/grpc-js";
import dotenv from "dotenv";
dotenv.config();
import { getServerAddress, loadDefinition } from "../util.js";
import { diceRoll } from "./services/dice.js";
import { sayHello } from "./services/hello.js";

// Ladda definitioner för endpoints
const helloDefinition = loadDefinition("hello");
const { hello } = helloDefinition;

const diceRollDefinition = loadDefinition("diceroll");
const { diceroll } = diceRollDefinition;

function start() {
    // Skapa server
    const server = new grpc.Server();
    // Lägg till services från de olika endpointsen
    server.addService(hello.Greeter.service, { sayHello });
    server.addService(diceroll.Dice.service, { diceRoll });
    // Starta server på konfigurerad adress
    server.bindAsync(
        getServerAddress(),
        grpc.ServerCredentials.createInsecure(),
        () => {
            server.start();
        }
    );
}

start();
