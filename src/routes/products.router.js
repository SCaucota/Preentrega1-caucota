import express from "express";
import ProductManager from "../controllers/productManager.js";
const router = express.Router();
const bookManager = new ProductManager;

router.get("/api/products", async (req, res) => {
    try{
        const books = await bookManager.getProducts();

        let limit = parseInt(req.query.limit);

        if(limit){
            let selectedBook = books.slice(0, limit);
            res.send(selectedBook);
        }else{
            res.send(books);
        }
    }catch (error) {
        console.log("Error al obtener los libros:", error);
        res.send("Error al obtener los libros");
    }
});

router.get("/api/products/:pid", async (req, res) => {
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

router.post("/api/products", async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body;

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send({ error: "Todos los campos del producto son obligatorios" });
        }

        await bookManager.addProduct(title, description, code, price, true, stock, category);

        res.status(200).send({ message: "Producto agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

router.put("/api/products/:pid", async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const updateFields = req.body;

        let hasFieldsToUpdate = false;
        for (const field in updateFields) {
            hasFieldsToUpdate = true;
            break;
        }

        if (!hasFieldsToUpdate) {
            return res.status(400).send({ error: "Se requieren campos a actualizar en el cuerpo de la solicitud." });
        }

        await bookManager.updateProduct(id, updateFields);
        res.status(200).send({ message: `Producto con ID ${id} actualizado correctamente` });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

router.delete("/api/products/:pid", async (req, res) => {
    let id = parseInt(req.params.id);
    await bookManager.deleteProduct(id);
    res.status(200).send({ message: "Producto eliminado correctamente" });
});

export default router;