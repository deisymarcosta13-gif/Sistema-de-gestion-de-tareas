import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import { repositorioUsuarios } from "../persistence/user.repository"; 
import { env } from "../config/env";

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
    },

    async login(email: string, password: string){

        const usuario = repositorioUsuarios.buscarPorEmail(email);

        if(!usuario){
            throw new Error("Usuario no encontrado");
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);

        if(!passwordValido){
            throw new Error("Contraseña incorrecta");
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token };
    }
};
