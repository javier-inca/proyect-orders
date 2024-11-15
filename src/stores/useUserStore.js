import { ref } from 'vue'

import { defineStore } from 'pinia'
import axios from '../connection/axiosConfig'

export const useUserStore = defineStore('userStore', () => {
    //Statuses
    const loading = ref(false)

    //Obtain users
    const fetchUsers = async () => {
        loading.value = true

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
