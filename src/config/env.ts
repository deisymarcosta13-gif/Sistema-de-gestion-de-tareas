import dotenv from "dotenv";

dotenv.config();

class ConfigEnv{

    public readonly PORT: number;
    public readonly JWT_SECRET: string;

    constructor(){
        this.PORT=Number(process.env.PORT) || 3000;
        this.JWT_SECRET=(process.env.JWT_SECRET)||"default_secret";
    }
}

export const env=new ConfigEnv();