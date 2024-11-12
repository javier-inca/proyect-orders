<script setup>
import { ArrowLeftIcon, ShoppingCartIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import axios from '../../connection/axiosConfig'
import Title from '../../components/Title.vue';
import ProductSelectionForm from './ProductSelectionForm.vue';
import { onMounted, ref } from 'vue';
import ProductSelectionTable from './ProductSelectionTable.vue';

const productArray = ref([]);
const productData = ref()
const isViewTableProducts = ref(false)
const buttonClass = ref('')

const props = defineProps({
    person:{
        type:Object,
        default:{}
    },
})

const emit = defineEmits()

const clickButton =(type)=>{
    emit('clickButton', type)
}

const registerProduct = (product) => {    
    productArray.value.push(JSON.parse(JSON.stringify(product)));

    getProductData()

    vibrarBoton()
}


const getProductData = async ()=>{
    try {
        const response = await axios.get('/api/products')
        if(response.status === 200){
            productData.value = response.data.data
        }
    } catch (error) {
        console.error('Error Get Product Data',error);
        
    }
}

onMounted(
    getProductData
)

const tableOptions = (type) => {
    if(type.type === 'return'){
        isViewTableProducts.value = false

        return
    }

    if(type.type === 'registerProduct'){
        emit('registerProduct',{
            user_id:props.person.id,
            amount_money:type.amount_money,
            totalPrice:type.totalPrice,
            change:type.change,
            products:productArray.value,
        })
    }
}

const vibrarBoton = () => {
  let count = 0
  const interval = setInterval(() => {
    if (count % 2 === 0) {
      buttonClass.value = 'translate-y-4'
    } else {
      buttonClass.value = 'translate-y-[-4px]'
    }
    count++

    if (count >= 5) {
      clearInterval(interval)
      buttonClass.value = ''
    }
  }, 50)
}
</script>

<template>
    <div 
        class="w-4/5 md:w-3/5 lg:w-3/6 2xl:w-2/6 h-1/2 bg-white rounded-xl border border-black-custom shadow-2xl">
        <div class="w-full h-10 bg-black-custom rounded-t-xl flex justify-start">
            <button
                @click="clickButton('cancel')"
                class="mx-3">
                <XMarkIcon
                    class="size-6 text-white"/>
            </button>
        </div>

        <div class="flex justify-between m-2 my-4 items-center">
            <Title
                class=" font-bold"
                size="sm">
                Order from {{ person.name }} 
            </Title>

            <butt1on
                @click="isViewTableProducts = !isViewTableProducts"
                :class="buttonClass"
                class=" bg-black-custom p-1 mr-3 rounded-full transform transition-all">
                <ShoppingCartIcon
                    v-if="!isViewTableProducts"
                    class="size-6 text-white"/>

                <ArrowLeftIcon
                    v-if="isViewTableProducts"
                    class="size-6 text-white"/>

                <span 
                    v-if="productArray.length > 0 && !isViewTableProducts"
                    class="absolute -right-3 -top-2 text-xs text-white bg-primary rounded-full w-5 h-5 flex items-center justify-center">
                    {{ productArray.length }}
                </span>
            </butt1on>
        </div>

        <div class="relative w-full h-[calc(100%-6.5rem)]">
            <div class="absolute z-0 w-full">
                <ProductSelectionForm
                    @productRegister="(product => registerProduct(product))"
                    type="create"/>
            </div>

            <div 
                v-if="isViewTableProducts"
                class="absolute z-10 h-full w-full ">
                <ProductSelectionTable
                    :listProduct = "productArray"
                    :listProductBackend="productData"
                    @clickButton="(type =>tableOptions(type))"
                    class="h-full w-full"/>
            </div>
        </div>
    </div>
</template>