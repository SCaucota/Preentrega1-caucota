import {promises as fs} from "fs";
import ProductManager from "./productManager.js";

class cartManager {
    static idCart = 0;
    constructor() {
        this.path = "./src/cart.json";
        this.carts = [];
        this.productManager = new ProductManager();
        this.loadCarts();
    }

    async loadCarts() {
        try {
            const allCarts = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(allCarts);

            if (this.carts.length > 0) {
                const maxId = Math.max(...this.carts.map(cart => cart.id));
                cartManager.idCart = maxId;
            }
        } catch (error) {
            if (error.code !== 'ENOENT') {
                console.log("Error al cargar los carritos:", error);
            }
        }
    }

    async addCart() {
        try {
            cartManager.idCart++;
            const newCart = { id: cartManager.idCart, products: [] };
            this.carts.push(newCart);
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log(`Nuevo carrito agregado con ID ${cartManager.idCart}`);
            return cartManager.idCart;
        } catch (error) {
            console.log("Error al agregar el nuevo carrito:", error);
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
            const product = await this.productManager.getProductById(productId);

            if (!product) {
                console.error(`El producto con ID "${productId}" no existe.`);
                return;
            }

            const cartIndex = this.carts.findIndex(cart => cart.id === cartId);

            if (cartIndex === -1) {
                console.error(`El carrito con ID "${cartId}" no existe.`);
                return;
            }

            const cart = this.carts[cartIndex];

            // Verificar si el producto ya está en el carrito
            const existingProductIndex = cart.products.findIndex(prod => prod.id === productId);

            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, actualiza la cantidad
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                // Si el producto no está en el carrito, agrégalo
                cart.products.push({
                    id: productId,
                    quantity: quantity
                });
            }

            // Guardar los cambios en el archivo cart.json
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log(`Producto con ID "${productId}" agregado al carrito con ID ${cartId}`);
        } catch (error) {
            console.log("Error al agregar el producto al carrito", error);
        }
    }

    getCarts = async () => {
        try {
            const allCarts = await fs.readFile(this.path, "utf-8");
            const parsedCarts = JSON.parse(allCarts);
    
            if (parsedCarts.length === 0) {
                console.log("No hay carritos disponibles.");
            }
            
            return parsedCarts;
        } catch (error) {
            console.error("Error al obtener los carritos:", error);
            return this.carts;
        }
    }

    async getCartProducts(cartId) {
        try {
            const cart = this.carts.find(cart => cart.id === cartId);

            if (!cart) {
                console.error(`El carrito con ID "${cartId}" no existe.`);
                return;
            }

            return cart.products;
        } catch (error) {
            console.error("Error al obtener los productos del carrito:", error);
        }
    }
}

export default cartManager;