/* CRUD de pedidos */
export function useOrderManager(orderStore, toastStore) {
    /* Mostrar toast */
    const showToast = (type , title, description) => {
        toastStore.showToast(type, title, description)
    }

    /* Buscar el id de buyer */
    const findIdByName = async (userData, name) => {
        const userId = await userData.find(user => user.name === name)
        return userId
    }
    
    /* guardar order */
    const createOrder = async (orderData, userData) => {
        const userId = await findIdByName(userData, orderData.buyer)
        
        const data = {
            reason: orderData.reason,
            delivery_user_id: (userId? userId.id : 0),
            d_user_name: orderData.buyer,
            order_date: orderData.date,
        }
        
        const response = await orderStore.createOrder(data)

        /* Error al guardar order */
        if(response.status === 422) {
            showToast('error', 'Error', 'Error saving order details')

            const error = response.response.data.errors

            const errors = {
                reason: error.reason? error.reason[0] : '',
                buyer: error.d_user_name? error.d_user_name[0] : '',
                date: error.order_date? error.order_date[0] : '',
            }

            return errors
        }

        /* Guardado exitoso de order */
        if(response.status === 201) {
            showToast('success', 'Saved', 'The order details were successfully saved')
            
            return response.data
        }
    }

    /* actualizar order */
    const updateOrder = async (orderData, userData, orderId) => {        
        const userId = await findIdByName(userData, orderData.buyer)
        
        const data = {
            reason: orderData.reason,
            delivery_user_id: (userId? userId.id : 0),
            d_user_name: orderData.buyer,
            order_date: orderData.date,
        }

        const response = await orderStore.updateOrder(orderId, data) 

        /* Error al actualizar order */
        if(response.status === 422) {
            showToast('error', 'Error', 'Error updating order details')

            const error = response.response.data.errors

            const errors = {
                reason: error.reason? error.reason[0] : '',
                buyer: error.d_user_name? error.d_user_name[0] : '',
                date: error.order_date? error.order_date[0] : '',
            }

            return errors
        }

        /* se actualizo el order */
        if(response.status === 200) {
            showToast('success', 'Updated', 'The order details were successfully updated')
        }
    }

    return {
        findIdByName,
        createOrder,
        updateOrder,
    }
}