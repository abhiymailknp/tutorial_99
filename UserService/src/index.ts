import {config} from "dotenv"
import fastify, {FastifyInstance} from "fastify";
import cors from "@fastify/cors"
import parser from "@fastify/formbody"
import { RouteIndex } from "./Routes/routeIndex";
import DatabaseConnection from "./Database/connection";

config() // to load env variables
class UserService{
    private app : FastifyInstance;
    private dbConnection : DatabaseConnection;

    constructor(){
        this.app = fastify();
        this.dbConnection = DatabaseConnection.getInstance(process.env.DB_URL as string) ;
    }
    private registerRoutes() : void {
        const routeIndex = new RouteIndex();
        routeIndex.registerRoutes(this.app);
        console.log("Fastify has registered the routes");
        
    }

    public async startServer() : Promise<void>{ 
        try{
            await this.dbConnection.connect();
            this.app.register(cors);
            this.app.register(parser);
            this.registerRoutes();
            const option  = {port : 3000};
            await this.app.listen(option);
            console.log(`UserService server is running on port ${option.port}`);
        }catch(error){
            console.error('Failed to start UserService',error);
            process.exit(1);
        }
        
    }
}

const userService = new UserService();
userService.startServer();