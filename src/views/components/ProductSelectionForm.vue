<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import InputSelect from '../../components/InputSelect.vue'
import axios from '../../connection/axiosConfig'
import { computed, onMounted, ref, watch } from 'vue'
import ButtonAmount from '../../components/ButtonAmount.vue'
import Input from '../../components/Input.vue'
import TextArea from '../../components/TextArea.vue'
import Button from '../../components/Button.vue'

const props = defineProps({
    type:{
        type:String,
        default:''
    },
})

const productData = ref()
const productSelect = ref('')
const productTotalPrice = ref(0.00)

const emit = defineEmits()

const productRegister = ref({
    product_id:0,
    quantity:1,
    description:'',
    final_price:0
})

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

const filteredProducts = computed(() => {
    if (!productSelect.value) {
        return productData.value
    }
    return productData.value.filter(product => 
        product.name.toLowerCase().includes(productSelect.value.toLowerCase())
    )
})

const saveProduct = async ()=>{
    const foundProduct = productData.value.find(product => product.name.toLowerCase() === productSelect.value.toLowerCase())

    if(foundProduct){
        productRegister.value.product_id = foundProduct.id        

        emit('productRegister',productRegister.value)
        productSelect.value = ''
        productRegister.value.description = ''
        return
    }

    if(!foundProduct){
        await createProduct()

        emit('productRegister', productRegister.value)

        productSelect.value = ''
        productRegister.value.description = ''

        return
    }
}

const createProduct = async ()=>{
    try {
        const response = await axios.post('/api/products',{
            name : productSelect.value,
            reference_price : productRegister.value.final_price,
        })
        
        if(response.status === 201){
            productRegister.value.product_id = response.data.product.id
        }
    } catch (error) {
        console.error(error)
    }
}

watch(productSelect, ()=>{
    const foundProduct = productData.value.find(product => product.name.toLowerCase() === productSelect.value.toLowerCase())
    
    productRegister.value.quantity = 1

    if(foundProduct){
        productRegister.value.final_price = foundProduct.reference_price
        productTotalPrice.value = productRegister.value.quantity * productRegister.value.final_price
        return
    }

    productRegister.value.final_price = 0
    productRegister.value.description = ''
    productTotalPrice.value = 0
})

watch(productRegister, () => {
    if(productSelect.value.length > 0 && productRegister.value.final_price > 0){
        productTotalPrice.value = productRegister.value.quantity * productRegister.value.final_price
        return
    }

    productTotalPrice.value = 0
    productRegister.value.quantity = 1
}, { deep: true });

</script>

<template>
    <div class="m-5">
        <div class="flex justify-between items-center my-7">
            <p
                class=" font-bold">
                Select Product
            </p>

            <div class="flex items-center">
                <InputSelect
                    v-model="productSelect"
                    :options="filteredProducts"
                    textAlignment="start"
                    placeholder="Insert Product"/>
            </div>
        </div>

        <div class="flex justify-between items-center my-7">
            <p
                class=" font-bold">
                Quantity
            </p>

            <ButtonAmount
                v-model:valueNumber="productRegister.quantity"/>
        </div>

        <div class="my-7">
            <Input
                :disabled="productSelect.length <= 0"
                label="Unit Price"
                complementText="Bs."
                :messageError ="(productRegister.final_price < 0 ? 'The value must be greater than 0': '')"
                v-model="productRegister.final_price"
                class="flex justify-end"
                textAlignment="end"
                xSize="md"
                type="number"/>
        </div>

        <div class="my-7">
            <Input
                label="Total Price"
                complementText="Bs."
                v-model="productTotalPrice"
                :disabled="true"
                class="flex justify-end"
                textAlignment="end"
                xSize="md"
                type="number"/>
        </div>

        <div class="flex flex-col">
            <p
                class=" font-bold mb-2">
                Description
            </p>

            <TextArea
                v-model="productRegister.description"
                rowSize="3"/>
        </div>

        <div class=" flex justify-center mt-10">
            <Button
                @click="saveProduct"
                :disabled="productTotalPrice <= 0"
                name="Add to the list"/>
        </div>
    </div>
</template>