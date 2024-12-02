/* CRUD de pedidos de usuario */
export function useOrderUserManager(orderUserStore, toastStore) {
    /* Mostrar toast */
    const showToast = (type, title, description) => {
        toastStore.showToast(type, title, description)
    }

    /* Crear el pedido de un usuario  */
    const createOrderUser = async (orderUserData) => {
        const data = {
            order_id: orderUserData.orderId,
            user_id: orderUserData.userId,
            user_name: orderUserData.userName,
            amount_money: orderUserData.amountMoney,
        }        
        const response = await orderUserStore.createOrderUser(data)
        
        return response.data.order_user_id
    }

    return {
        createOrderUser,
    }
}