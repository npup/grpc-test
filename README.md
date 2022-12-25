# Test av gRPC

Testar att skapa en gRPC-klient och -server i nodejs.  


Det finns två services, `hello.Greeter` och `diceroll.Dice` (se filerna i `./protos`).

De har sina respektive implementationer i filerna i `./src/server/services`.

## Kör exemplet


### Klona och installera dependencies:

    git clone git@github.com:npup/grpc-test.git
    cd grpc-test
    npm i

### Kopiera `.env-template` till en egen lokal `.env`-fil

    cp .env-template .env

...som är `.gitignore`-ead.  Den innehåller inget hemligt just nu, men är tänkt att kunna ha lösenord och liknande i senare exempel.


### Starta servern

    npm run start:server

### Starta klienten och skicka med ditt önskade användarnamn:

    npm run start:client 'Brad Pitt'


Som en välkomnande gest görs ett anrop till `hello.Greeter#sayHello`, vilket tar emot ett användarnamn och svarar med en hälsning som visas på skärmen.

Därefter visas en meny, där man kan välja att rulla tärningar, visa/rensa statistik, eller avsluta programmet.  När man rullar tärningar görs anrop till `diceroll.Dice#diceRoll`, vilket tar emot data om vilken tärning som skall rullas, och svarar med resultatet.

Anropet för tärningskastet görs i `./src/client/menu.js`, se funktionen `performRoll`.

