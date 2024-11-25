import { defineStore } from 'pinia'
import axios from '../connection/axiosConfig'

export const useProductStore = defineStore('productStore', () => {
    //Obtain products
    const fetchProducts = async () => {
        try {
            const response = await axios.get('/api/products')

            if(response.status === 200){
                return response.data.data
            }
        } catch (error) {
            return error || 'Error loading products'
        }
    }

    //Create product
    const createProduct = async (productData) => {
        try {
            const response = await axios.post('/api/products', productData)

            if(response.status === 201){
                return response
            }
        } catch (error) {            
            return error || 'Error creating product'
        }
    } 

    return {
        fetchProducts,
        createProduct,
    }
})