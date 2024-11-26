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
            console.log(error);
        }
    }

    //Get an order by Idw
    const fetchOrderById = async (orderId) => {
        try {
            const response = await axios.get(`/api/orders/${orderId}`)

            if(response.status === 200){
                return response
            }
        } catch (error) {
            return error
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
            return error || 'Error creating order'
        }
    }

    //Update order
    const updateOrder = async (orderId , orderData) => {
        try {
            const response = await axios.put(`/api/orders/${orderId}`, orderData)

            if(response.status === 200) {
                return response
            }
        } catch (error) {  
            return error || 'Error updating order'
        }
    }

    return {
        fetchOrders,
        fetchOrderById,
        createOrder,
        updateOrder,
    }
})