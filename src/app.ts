import express from "express";
import authRoutes from "./api/routes/auth.routes";

const app=express();
app.use(express.json()); 

app.use("/auth", authRoutes);

app.listen(3000,()=>{
    console.log("Servidor corriendo en http://localhost:3000");
});