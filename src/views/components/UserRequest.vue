<script setup>
import { computed, ref } from 'vue';
import InputSelect from '../../components/InputSelect.vue';
import ProductForm from './productForm.vue';
import Button from '../../components/Button.vue';

const getUsers = ref(JSON.parse(localStorage.getItem('userArray')) || []);
const getProducts = ref(JSON.parse(localStorage.getItem('productArray')))
const searchUser = ref('');
const searchProduct = ref('')

const selectProduct = ref()

const filterProduct = computed(()=>{
    if(!searchProduct.value){
        return getProducts.value
    }
    return getProducts.value.filter(product=>
        product.name.toLowerCase().includes(searchProduct.value.toLocaleLowerCase())
    )
})

const filterUser = computed(() => {
    if (!searchUser.value) {
        return getUsers.value;
    }

    return getUsers.value.filter(user =>
        user.name.toLowerCase().includes(searchUser.value.toLowerCase())
    );
});


const filterUsers = computed(() => {
    return getUsers.value;
  
});

const test =ref()
</script>

<template>
    <div class="relative">
        <div class="my-5 border-2 border-blue-800 rounded p-2">
            <InputSelect
                v-model="searchUser"
                placeholder="Insert User"
                :options="filterUser" />


            <InputSelect
                v-model="test"
                placeholder="Insert User"
                :options="filterUsers" />

            <ProductForm
                v-model="selectProduct"
                :products="filterProduct"/>
        </div>

        <div 
            class=" absolute z-20 inset-0 flex justify-center items-center m-2"
            v-if="viewOrderDetails">
            <div class="bg-white rounded w-full h-full border-2 border-blue-800 overflow-y-auto">
                <View
                    @buttonClosed="(viewOrderDetails = false)"
                    :content="findOrder"
                    type="product"/>
            </div>
        </div>
        
        <div 
            v-if="viewEditProduct"
            class="absolute z-20 inset-0 flex justify-center items-center m-2">
            <EditProduct 
                @buttonClick="(action => editAction (action))"
                :product="product"/>
        </div>
    </div>
    
    <div 
        v-if="viewNotification"
        class="absolute z-20 inset-0 w-full h-full">
        <Modal
            :message="'Delete '+ productName "
            @buttonClick="(type => deleteProduct(type))"/>
    </div>
</template>