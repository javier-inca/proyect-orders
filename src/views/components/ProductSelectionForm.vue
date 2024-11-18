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

const quantity = ref(1)
const description = ref('')
const final_price = ref(0)

const getProductData = async ()=>{
    try {
        const response = await axios.get('/api/products')
        if(response.status === 200){
            productData.value = response.data.data
        }
    } catch (error) {
        console.error('Error Get Product Data',error)
        
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

        const productSave = {
            product_id : foundProduct.id,
            quantity : quantity.value,
            description : description.value,
            final_price : final_price.value
        }

        emit('productRegister',productSave)

        cleanForm()
        return
    }

    if(!foundProduct){
        const id = await createProduct()

        const productSave = {
            product_id : id,
            quantity : quantity.value,
            description : description.value,
            final_price : final_price.value
        }
        
        emit('productRegister', productSave)

        cleanForm()
        return
    } 
}

const createProduct = async ()=>{
    try {
        const response = await axios.post('/api/products',{
            name : productSelect.value,
            reference_price : final_price.value
        })
        
        if(response.status === 201){
            return response.data.product.id
        }
    } catch (error) {
        console.error(error)
    }
}

const cleanForm = () => {
    quantity.value = 1
    description.value = ''
    final_price.value = 0
    productTotalPrice.value = 0
    productSelect.value = ''
}

watch(productSelect, ()=>{
    const foundProduct = productData.value.find(product => product.name.toLowerCase() === productSelect.value.toLowerCase())

    if(foundProduct){
        final_price.value = foundProduct.reference_price 
        productTotalPrice.value = quantity.value * final_price.value
        return
    }

    final_price.value = 0
    productTotalPrice.value = 0
})

watch([ final_price,quantity ] , ()=>{
    if(final_price.value > 0 ){
        productTotalPrice.value = (quantity.value * final_price.value)
        return
    }
    
    final_price.value = 0
})
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
                v-model:valueNumber="quantity"/>
        </div>

        <div class="my-7">
            <Input
                :disabled="productSelect.length <= 0"
                label="Unit Price"
                complementText="Bs."
                :messageError ="(final_price < 0 ? 'The value must be greater than 0': '')"
                v-model="final_price"
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
                v-model="description"
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