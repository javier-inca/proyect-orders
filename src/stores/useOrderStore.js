import { defineStore } from 'pinia'
import axios from '../connection/axiosConfig'

export const useOrderStore = defineStore('orderStore' , () => {
    //Obtain orders
    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders')

            if(response.status === 200){
                return response.data.data
            }
        } 
        catch (error) {
            return error.message || 'Error loading orders'    
        }
    }

    //Create new order
    const createOrder = async (orderData) => {
        try {
            const response = await axios.post('/api/orders' , orderData)

            if(response.status === 201) {
                return response
            }
        } catch (error) {  
            return error.message || 'Error creating order'
        }
    }

    return {
        fetchOrders,
        createOrder,
    }
})