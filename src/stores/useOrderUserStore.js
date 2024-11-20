import { defineStore } from 'pinia'
import axios from '../connection/axiosConfig'

export const useOrderUserStore = defineStore('orderUserStore' , () => {
    //Create Order User
    const createOrderUser = async (orderUserData) => {
        try {
            const response = await axios.post( '/api/order-users' , orderUserData)

            if (response.status === 201){
                return response
            }
        } catch (error) {
            return error || 'Error creating order user'
        }
    }

    //Update Order User
    const updateOrderUser = async (orderUserId  ,orderUserData) => {
        try {
            const response = await axios.put( `/api/orders/${orderUserId}` , orderUserData)

            if(response.status === 200){
                return  response
            }
        } catch (error) {
            return error || 'Error updating order user'
        }
    }

    return{
        createOrderUser,
        updateOrderUser,
    }
} )