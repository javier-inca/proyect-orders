import { defineStore } from 'pinia'
import axios from '../connection/axiosConfig'

export const useOrderUserProduct = defineStore('orderUserProduct' , () => {
    //Create Order User Product
    const createOrderUserProduct = async ( orderUserProductData ) => {
        try {
            const response = await axios.post('/api/order-user-products' , orderUserProductData )

            if(response.status === 201) {
                return response
            }
        } catch (error) {
            return error || 'Error creating order user product'
        }
    }

    //Update Order User Product
    const updateOrderUserProduct = async (orderUserProductId , orderUserProductData ) => {
        try {
            const response = await axios.put(`/api/order-user-products/${orderUserProductId}` , orderUserProductData)

            if(response.status === 200) {
                return response
            }
        } catch (error) {
            return error || 'Error updating order user product'
        }
    }

    return{
        createOrderUserProduct,
        updateOrderUserProduct,
    }
})
