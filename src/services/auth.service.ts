import bcrypt from "bcrypt"; 
import { repositorioUsuarios } from "../persistence/user.repository"; 

export const servicioAutenticacion={

    async registrar(nombre: string , email: string, password: string ){

        const existe=repositorioUsuarios.buscarPorEmail(email);

        if(existe){

            throw new Error("El usuario ya existe");
        }

        const passwordEncriptado=await bcrypt.hash(password,10); /* encripta la contraseña del usuario*/

        const nuevoUsuario={
            id: Date.now(), 
            nombre,
            email,
            password: passwordEncriptado
        };

        return repositorioUsuarios.create(nuevoUsuario);
    }
};
