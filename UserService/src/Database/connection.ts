import mongoose, { ConnectOptions } from "mongoose";

class DatabaseConnection {
    private static instance : DatabaseConnection;
    private databaseUrl :string;

    private constructor(databaseUrl :string){
        this.databaseUrl = databaseUrl;
    }

    static getInstance(databaseUrl : string): DatabaseConnection{
        if(!DatabaseConnection.instance){
            DatabaseConnection.instance = new DatabaseConnection(databaseUrl);
        }
        return DatabaseConnection.instance;
    }
    async connect(): Promise<void> {
        try{
            await mongoose.connect(this.databaseUrl,{
                useNewUrlParser : true,
                useUnifiedTopology:true

            }as ConnectOptions)
            console.log("Connected to Database");
            
        }
        catch(error){
            console.error('Failed to Connect with DB', error)
            process.exit(1)
        }
    }
}

export default DatabaseConnection;