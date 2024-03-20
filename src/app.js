import express from "express";
const app = express();
const PUERTO = 8080;
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api", productsRouter);
app.use("/api", cartsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto http//localhost:${PUERTO}`)
})