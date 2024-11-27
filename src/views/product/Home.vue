<script setup>
import { onMounted, ref } from 'vue'
import { useProductStore } from '../../stores/useProductStore'
import { useToastStore } from '../../stores/useToastStore'
import Title from '../../components/Title.vue';
import Button from '../../components/Button.vue';
import { ShoppingBagIcon } from '@heroicons/vue/24/solid';
import ProductListCard from './components/ProductListCard.vue';
import ProductForm from './components/ProductForm.vue';
import Modal from '../../components/Modal.vue';

const productStore = useProductStore()
const toastStore = useToastStore()

/* Estado de carga y array de datos de los productos */
const loadingProduct = ref(true)
const productData = ref([])

/* activar o descativar fondo borrozo */
const isBackgroundBlurred = ref(false)

/* activar o desactivar el modal */
const isShowModal = ref(false)

/* estado formulario de producto */
const isShowProductForm = ref(false)
const isLoadingProductForm = ref(false)

/* Producto para editar o eliminar */
const selectedProduct = ref()

/* datos del formulario */
const productFormData = ref({
    title: 'Register new product',
    buttonName: 'register',
    name: '',
    price: (0).toFixed(2),
    errors: {
        name:'',
        price:'',
    },
})

/* volver el formulario al primer estado */
const cleanForm = () => {
    productFormData.value = {
        title: 'Register new product',
        buttonName: 'register',
        name: '',
        price: (0).toFixed(2),
        errors: {
            name:'',
            price:'',
        },
    }
}

/* Obtener todos los productos */
const fetchProducts = async () => {
    loadingProduct.value = true
    productData.value = await productStore.fetchProducts()
    loadingProduct.value = false    
}

/* Crear nuevo producto */
const createProduct = async () => {
    isLoadingProductForm.value = true

    const data = {
        name: productFormData.value.name,
        reference_price: productFormData.value.price,
    }

    const response = await productStore.createProduct(data) 

    if(response.status === 422){
        const error = response.response.data.errors

        showToast('error', 'Error','Error registering product')

        productFormData.value.errors.name = error.name ? error.name[0] : ''
        productFormData.value.errors.price = error.reference_price ? error.reference_price[0] : ''

        isLoadingProductForm.value = false
    }

    if(response.status === 201){
        showToast('success', 'Success', 'Product registered')

        formOptions('cancel')

        fetchProducts()
    }
}

const updateProduct = async() => {
    isLoadingProductForm.value = true

    const data = {
        name: productFormData.value.name,
        reference_price: productFormData.value.price,
    }

    const response = await productStore.updateProduct(selectedProduct.value.id, data)
    
    if(response.status === 422 ){
        const error = response.response.data.errors

        showToast('error', 'Error','Error updating the product')

        productFormData.value.errors.name = error.name ? error.name[0] : ''
        productFormData.value.errors.price = error.reference_price ? error.reference_price[0] : ''

        isLoadingProductForm.value = false
    }

    if(response.status === 200){
        showToast('success', 'Success', 'Product updated')

        formOptions('cancel')

        fetchProducts()
    }
}

/* Eliminar producto */
const deleteProduct = async (productId) => {
    const response = await productStore.deleteProduct(productId)

    if(response.status === 204){
        showToast('success', 'Success', 'Product deleted successfully')

        isShowModal.value = false

        selectedProduct.value = ''

        fetchProducts()
    }
}

/* obtener la accion del formulario */
const formOptions = (action) => {
    if(action === 'cancel'){
        cleanForm()
        
        isLoadingProductForm.value = false
        isShowProductForm.value = false
        isBackgroundBlurred.value = false
    }

    if(action === 'register'){
        createProduct()
    }

    if(action === 'update'){
        updateProduct()
    }
}

/* obtener la accion de la tabla */
const tableOptions = async (action) => {    
    await fetchProducts()
    
    selectedProduct.value = productData.value.find(product => product.id === action.productId)

    if(action.type === 'delete' && selectedProduct.value){
        isShowModal.value = true
        return
    }

    if(action.type === 'update' && selectedProduct.value){        
        productFormData.value = {
            title: 'Update product',
            buttonName: 'update',
            name: selectedProduct.value.name,
            price: selectedProduct.value.reference_price,
            errors: {
                name:'',
                price:'',
            },
        }

        showProductForm()
        return
    }

    showToast('warn', 'Warning', 'This product does not exist in the list')
}

/* Obtener la accion del modal */
const modalOptions = (action) => {    
    if(action === 'cancel'){
        selectedProduct.value = ''

        isShowModal.value = false
    }

    if(action === 'delete'){
        deleteProduct(selectedProduct.value.id)
    }
}

/* Mostar toast */
const showToast = (type, title, description) => {
    toastStore.showToast(type, title, description)
}

/* Abrir formulario */
const showProductForm = () => {
    isBackgroundBlurred.value = true
    isShowProductForm.value = true
}

/* Obtener todos los productos al ingreso */
onMounted(
    fetchProducts
);
</script>

<template>
    <div class="flex justify-center mx-2">
        <div class="relative max-w-3xl w-full">
            <div class="absolute z-0 w-full">
                <!-- Seccion del titulo y boton agregar nuevo producto -->
                <div class="flex justify-between items-center mb-2">
                    <Title
                        title="List of Products"/>

                    <Button
                        @click="showProductForm"
                        buttonName="Add Product"
                        :rightIcon="ShoppingBagIcon"
                        class="!max-w-[150px]"/>
                </div>

                <!-- Componenete de la tabla de productos -->
                <ProductListCard
                    @buttonOption="(action => tableOptions(action))"
                    :productList="productData"
                    :dataStatus="loadingProduct"/>
            </div>

            <!-- Formulario de producto registro y actualizacion -->
            <div class=" absolute z-20 w-full">
                <ProductForm
                    v-if="isShowProductForm"
                    @clickButton="(action => formOptions(action))"
                    v-model:productName="productFormData.name"
                    v-model:productPrice="productFormData.price"
                    :errors="productFormData.errors"
                    :statusForm="isLoadingProductForm"
                    :title="productFormData.title"
                    :buttonName="productFormData.buttonName"/>
            </div>

            <!-- Fondo borroso -->
            <div 
                v-if="isBackgroundBlurred"
                class="fixed z-10 w-full h-full top-0 right-0 backdrop-blur">
            </div>

            <!-- mostrar modal -->
            <Modal
                v-if="isShowModal"
                title="Delete product"
                @clickButton="(action => modalOptions(action))">
                Are you sure you want to delete the product "{{ selectedProduct.name }}"?
            </Modal>
        </div>
    </div>
</template>