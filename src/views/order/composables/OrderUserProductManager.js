/* CRUD de pedidos usuarios productos  */
export function useOrderUserProductManager(userProductStore, toastStore) {
    /* Mostrar toast */
    const showToast = (type, title, description) => {
        toastStore.showToast(type, title, description)
    }

    /* buscar el id de producto */
    const findIdbyProductName = (productData, name) => {
        const findProduct = productData.find(product => product.name === name)
        return findProduct.id
    }

    /* Crear el producto seleccionado de un usuarios */
    const createOrderUserProduct = async (userProductData, productData) => {
        const data = {
            order_user_id: userProductData.orderUserId,
            product_id: findIdbyProductName(productData, userProductData.productName),
            product_name: userProductData.productName,
            quantity: userProductData.quantity,
            final_price: userProductData.finalPrice,
            description: userProductData.description,
        }

        const response = await userProductStore.createOrderUserProduct(data)

        console.log(response);
        
    }

    return {
        createOrderUserProduct,
    }
}