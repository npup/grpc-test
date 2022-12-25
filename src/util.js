import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import url from "url";
import dotenv from "dotenv";
dotenv.config();

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export function getServerAddress() {
    return `${process.env.GRPC_HOST}:${process.env.GRPC_PORT}`;
}

export function loadDefinition(protoName, options = {}) {
    const packageDefinition = protoLoader.loadSync(
        `${__dirname}/../protos/${protoName}.proto`,
        {
            keepCase: true,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
            ...options,
        }
    );
    return grpc.loadPackageDefinition(packageDefinition);
}

export function createClient(protoName, serviceName) {
    const packageName = protoName;
    const definition = loadDefinition(protoName);

    const { [packageName]: proto } = definition;

    const client = new proto[serviceName](
        getServerAddress(),
        grpc.credentials.createInsecure()
    );
    return client;
}
