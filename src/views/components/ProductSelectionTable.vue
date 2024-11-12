<script setup>
import { ExclamationTriangleIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import Button from '../../components/Button.vue';
import Title from '../../components/Title.vue';
import Input from '../../components/Input.vue';
import { onMounted, ref, watch } from 'vue';

const props = defineProps({
    listProduct :{
        type:Array,
        default:[]
    },

    listProductBackend :{
        type:Array,
        default:{}
    }
})

const payment = ref()
const totalPrice = ref(0)
const change = ref(0)
const messageErrorPayment = ref('')

const isViewButtonRegister = ref(true)
const emit = defineEmits()

const clickButton = (type) =>{
    emit('clickButton',{
        type:type,
        amount_money:payment.value,
        totalPrice:totalPrice.value,
        change:change.value
    })
}

const getProductName = (productId) => {
    const product = props.listProductBackend.find(findProduct => findProduct.id === productId)
    return product.name
} 

const calculateFinalPrice = () => {
    if(props.listProduct.length > 0){
        totalPrice.value = props.listProduct.reduce((acc, product) => {
            return acc + (product.final_price * product.quantity)
        }, 0)
    }
}

watch(payment, ()=>{
    if(payment.value >= totalPrice.value){
        change.value = payment.value - totalPrice.value
        isViewButtonRegister.value = false
    }

    if(payment.value < 0){
        messageErrorPayment.value = 'The value must be greater than 0'
    }

    if(payment.value < totalPrice.value){
        messageErrorPayment.value = ''
        isViewButtonRegister.value = true
    }
})

onMounted(
    calculateFinalPrice
)
</script>

<template>
    <div
        :class="{ 'flex items-center justify-center' : listProduct.length === 0 }" 
        class="bg-white">
        <div class="h-1/2 overflow-x-auto overflow-y-auto border-b-2 ">
            <table
                class="w-full"
                v-if="listProduct.length > 0">
                <thead class="sticky top-0 text-xs text-black uppercase bg-gray-200">
                    <tr>
                        <th  class="px-6 w-1/3 py-3 text-center">
                            Product name
                        </th>

                        <th  class="px-6 w-1/3 py-3 text-center">
                            Price
                        </th>

                        <th  class="px-6 w-1/3 py-3 text-center">
                            Option
                        </th>
                    </tr>
                </thead>

                <tbody
                    class="border-b-black border-opacity-25">
                    <tr 
                        v-for="(product, index) in listProduct"
                        :key="product.product_id"
                        class="hover:bg-slate-50">
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            {{ getProductName(product.product_id)}}
                        </td>

                        <td class=" px-6 py-4 text-end">
                            {{ product.final_price * product.quantity }} Bs.
                        </td>

                        <td class="px-6 py-4 flex justify-center gap-1">
                            <button
                                @click="clickOptions('view', index)">
                                <EyeIcon
                                    class="size-5 hover:text-primary hover:scale-125 transition-transform duration-75"/>
                            </button>

                            <button
                                @click="clickOptions('edit', index)">
                                <PencilIcon
                                    class="size-5 hover:text-primary hover:scale-125 transition-transform duration-75"/>
                            </button>

                            <button
                                @click="clickOptions('delete', index)">
                                <TrashIcon
                                    class="size-5 hover:text-secondary hover:scale-125 transition-transform duration-75"/>
                                    
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div
            v-if="listProduct.length > 0" 
            class="flex flex-col m-6 gap-5">
            <Input
                :messageError="messageErrorPayment"
                v-model="payment"
                textAlignment="end"
                label="Payment"
                complementText="Bs."
                type="number"/>

            <Input
                v-model="totalPrice"
                :disabled="true"
                textAlignment="end"
                label="Total Price"
                complementText="Bs."
                type="number"/>

            <Input
                v-model="change"
                :disabled="true"
                textAlignment="end"
                label="Change"
                complementText="Bs."
                type="number"/>
        </div>  

        <div
            v-if="listProduct.length > 0" 
            class="flex justify-center">
            <Button
                @click="clickButton('registerProduct')"
                :disabled="isViewButtonRegister"
                name="Register Orders"/>
        </div>

        <div
            v-if="listProduct.length === 0" 
            class="flex flex-col items-center">
            <ExclamationTriangleIcon
                class="size-20 text-black-custom"/>

            <Button
                @click="clickButton('return')"
                type="danger"
                name="Return to the register"/>
        </div>
    </div>
</template>