import express from "express";
const app = express();
const PUERTO = 8080;
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", productsRouter);
app.use("/", cartsRouter);
/* app.use("/", petsRouter); */

/* const PUERTO = 8080;
const express = require("express");
const ProductManager = require("./productManager");
const app = express();

const bookManager = new ProductManager();

app.get("/", async (req, res) => {
    res.send("Funciona el servidor");
});

app.get("/products", async (req, res) => {
    try{
        const books = await bookManager.getProducts();

        let limit = parseInt(req.query.limit);

        if(limit){
            let selectedBooks = books.slice(0, limit);
            res.send(selectedBooks);
        }else {
            res.send(books);
        }
    }catch (error) {
        console.log("Error al obtener los libros:", error);
        res.send("Error al obtener los libros");
    }
});

app.get("/products/:pid", async (req, res) => {
    try{
        let id = parseInt(req.params.pid)

        const selectedBook = await bookManager.getProductById(id)

        if(selectedBook) {
            res.send(selectedBook);
        }else {
            res.send({ error: "Producto no encontrado" });
        }

    }catch (error) {
        console.log(error);
        res.send("Error al obtener el libro requerido");
    }
});

*/

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto http//localhost:${PUERTO}`)
})