/* CRUD de pedidos */
export function useOrderManager(orderStore, toastStore) {

    /* guardar order */
    const createOrder = async (orderData, userData) => {
        const userId = await userData.find(user => user.name === orderData.buyer)

        const data = {
            reason: orderData.reason,
            delivery_user_id: (userId? userId.id : 0),
            d_user_name: orderData.buyer,
            order_date: orderData.date,
        }
        
        const response = await orderStore.createOrder(data)

        console.log(response);
        
    }

    return {
        createOrder
    }
}