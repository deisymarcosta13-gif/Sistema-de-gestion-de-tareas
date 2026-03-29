import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import { usuarioRepository } from "../persistence/usuario.repository"; 
import { env } from "../config/env";

export const servicioAutenticacion = {

    async registrar(nombre: string , email: string, password: string ){
        // Revisar si usuario existe en la DB
        const existe = await usuarioRepository.buscarPorEmail(email);

        if(existe){
            throw new Error("El usuario ya existe");
        }

        // Encriptar contraseña
        const passwordEncriptado = await bcrypt.hash(password,10);

        // Crear usuario en la DB
        const nuevoUsuario = await usuarioRepository.create(nombre, email, passwordEncriptado);

        return nuevoUsuario; // retorna info de la inserción
    },

    async login(email: string, password: string){
        // Buscar usuario en la DB
        const usuario = await usuarioRepository.buscarPorEmail(email);

        if(!usuario){
            throw new Error("Usuario no encontrado");
        }

        // Comparar contraseña
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if(!passwordValido){
            throw new Error("Contraseña incorrecta");
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return { token };
    }
};
