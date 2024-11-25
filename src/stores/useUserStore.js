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

    //Create new user
    const createUser = async (userData) => {
        try {
            const response = await axios.post('/api/users', userData)

            if (response.status === 201) {
                return response
            }
        } catch (error) {
            return error || 'Error creating user'
        }
    }

    //Update user by id
    const updateUser = async (userId, userData) => {
        try {
            const response = await axios.put(`/api/users/${userId}`, userData)

            if(response.status === 200){
                return response
            }
        } catch (error) {
            return error || 'Error updated user'
        }
    }

    //Delete user
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`/api/users/${userId}`)

            if(response.status === 204){
                return response
            }
        } catch (error) {
            return error || 'Error deleting user'
        }
    }

    return {
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
    }
})
