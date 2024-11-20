import { defineStore } from 'pinia'
import axios from '../connection/axiosConfig'

export const useUserStore = defineStore('userStore', () => {
    //Obtain users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users')

            if(response.status === 200){
                return response.data.data
            }
        } 
        catch (error) {            
            return error.message || 'Error loading users'
        }
    }

    return {
        fetchUsers,
    }
})
