import { create } from "node:domain";

type Usuario={
    id: number,
    nombre: string,
    email: string,
    password: string,
};

const usuarios: Usuario[]=[];

export const repositorioUsuarios={
    create (usuario: Usuario){
        usuarios.push(usuario);
        return usuario;
    },

    buscarPorEmail(email: string){
        return usuarios.find(u=>u.email===email);
    }
};