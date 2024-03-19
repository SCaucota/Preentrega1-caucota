import express from "express";
import CartManager from "../controllers/cartManager.js";
const router = express.Router();
const cartManager = new CartManager;

router.get("/api/carts", async (req, res) => {
    try{
        const carts = await cartManager.getCarts();

        res.send(carts)
    }catch (error) {
        console.log("Error al obtener los libros:", error);
        res.send("Error al obtener los libros");
    }
});


router.get("/api/carts/:cid", async (req, res) => {
    try{
        let id = parseInt(req.params.cid)

        const selectedCart = await cartManager.getCartProducts(id)

        if(selectedCart) {
            res.send(selectedCart);
        }else {
            res.send({ error: "Carrito no encontrado" });
        }

    }catch (error) {
        console.log(error);
        res.send("Error al obtener el carrito requerido");
    }
});

router.post("/api/carts", async (req, res) => {
    try {

        await cartManager.addCart();

        res.status(200).send({ message: "Carrito agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    try{
        let productId = parseInt(req.params.pid);
        let cartId = parseInt(req.params.cid);
        const { quantity } = req.body;

        await cartManager.addProductToCart(cartId, productId, quantity);
        res.status(200).send({ message: "Producto agregado correctamente" });
    } catch (error) {
        console.error("Error al agregar el producto:", error);
        res.status(500).send({ error: "Error interno del servidor" });
    }
});

export default router;
