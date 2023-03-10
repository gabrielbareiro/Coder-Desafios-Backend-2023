const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    //-------------Agrego un producto-------------

    async addProducts(product) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf8");
            let dataProductParse = JSON.parse(dataProduct);
            if ((dataProductParse.some(num => num.code == product.code)) !== true
                && product.title !== ""
                && product.description !== ""
                && product.price > 0
                && product.thumbnail !== ""
                && product.stock >= 0
            ) {
                if (dataProductParse.length) {
                    await fs.promises.writeFile(
                        this.path,
                        JSON.stringify(
                            [...dataProductParse, { ...product, id: dataProductParse.length + 1 }],
                            null,
                            2
                        )
                    )
                    console.log(`el producto tiene el id :${dataProductParse.length + 1}`);
                } else {
                    await fs.promises.writeFile(
                        this.path,
                        JSON.stringify([{ ...product, id: dataProductParse.length + 1 }]),
                        null,
                        2
                    );
                    console.log(`el producto tiene el id :${dataProductParse.length + 1}`);
                }
            } else {
                console.log("El producto ya fue agregado");
            }

        } catch (error) {
            console.log("error en la escritura", error);
        }
    }

    //-------------Devuelvo todos los productos guardados-------------

    async getProducts() {
        let dataProduct = await fs.promises.readFile(this.path, "utf8");
        let dataProductParse = JSON.parse(dataProduct);
        if (dataProductParse.length) {

            return dataProductParse;

        } else {
            console.log("No hay productos");
        }

    }

    //-------------Busco un producto por su id-------------

    async getProductById(id) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf8");
            let dataProductParse = JSON.parse(dataProduct);
            let product = dataProductParse.find(product => product.id === id)
            if (product) {
                console.log(`el id corresponde al producto ${product.title}`);
                return product
            } else {
                console.log(`No existe el producto con el id ${id}`);
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

    //-------------actualizo un producto por su id-------------

    async updateProduct(id, prop, newValue) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf8");
            let dataProductParse = JSON.parse(dataProduct);
            let product = dataProductParse.findIndex(product => product.id === id)
            if (product > -1) {
                dataProductParse[product][prop] = newValue
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(dataProductParse, null, 2)
                )
                console.log(`Actualizado con exito!`)
                return product;
            } else {
                console.log(`No existe el producto con el id ${id}`);
                return null;
            }
        } catch (error) {
            console.log("error al actualizar el producto", error);
        }

    }

    //-------------Elimino un producto por su id-------------

    async deleteProduct(id) {
        try {
            let dataProduct = await fs.promises.readFile(this.path, "utf8");
            let dataProductParse = JSON.parse(dataProduct);
            let product = dataProductParse.find(product => product.id === id)
            if (product) {
                const dataProductFilter = dataProductParse.filter(
                    product => product.id !== id
                );
                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(dataProductFilter, null, 2)
                );
                console.log("producto eliminado");
            } else {
                console.log(`no existe un el producto con el id: ${id}`);
                return null;
            }
        } catch (error) {
            console.log("error al eliminar el producto", error);
        }

    }
}

let productos = new ProductManager("./products.txt")

// productos.addProducts({
//     title: "pitusas",
//     description: "dulces",
//     price: 170,
//     thumbnail: "https://www.mialmacenamigo.com.ar/wp-content/uploads/0041-1.jpg",
//     code: 787,
//     stock: 2
// })

// productos.addProducts({
//     title: "manaos",
//     description: "gaseosas",
//     price: 450,
//     thumbnail: "https://http2.mlstatic.com/D_NQ_NP_716200-MLA43739181284_102020-O.jpg",
//     code: 187,
//     stock: 9
// })

// productos.addProducts({
//     title: "banana",
//     description: "fruta",
//     price: 550,
//     thumbnail: "https://www.cucinare.tv/wp-content/uploads/2020/08/Bananas1.jpg",
//     code: 1787,
//     stock: 88
// })






//productos.getProductById(2)

//productos.getProducts()

//productos.getProductById(9)

//productos.updateProduct(1, "stock", 555)

//productos.deleteProduct(3)