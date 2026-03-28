import dotenv from "dotenv";

dotenv.config();

class ConfigEnv{ /*Creo clase definiendo los atributos de env*/

    public readonly PORT: number;
    public readonly JWT_SECRET: string;

    constructor(){ /*Constructor asignando valores de env o valores por defect dependiendo del caso*/
        this.PORT=Number(process.env.PORT) || 3000;
        this.JWT_SECRET=(process.env.JWT_SECRET)||"default_secret";
    }
}

export const env=new ConfigEnv();