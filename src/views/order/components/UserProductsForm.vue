<script setup>
import Title from '../../../components/Title.vue'
import IconButton from '../../../components/IconButton.vue'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import InputSelect from '../../../components/InputSelect.vue'
import ButtonAmount from '../../../components/ButtonAmount.vue'
import Input from '../../../components/Input.vue'
import TextArea from '../../../components/TextArea.vue'
import Button from '../../../components/Button.vue'
import { computed, ref } from 'vue'


const props = defineProps({
    userName: {
        type:String,
        default: 'Person'
    },

    productData: {
        type: Array,
        default: []
    },

    productList: {
        type: Array,
        default: []
    },

    productName: {
        type: String,
        default: ''
    },

    quantity: {
        type: Number,
        default: 1
    },

    unitPrice: {
        type: Number,
        default: ''
    },

    totalPrice: {
        type: Number,
        default: 0
    },

    description: {
        type: String,
        default: ''
    },

    amountMoney: {
        type:Number,
        default: 0
    },

    isButtonDisabled: {
        type: Boolean,
        default: false 
    },

    errorSelectedProduct: String,

    errorQuantity: String,

    errorUnitPrice: String,
    
    errorDescription: String,

    errorAmountMoney: String,
})

const emit = defineEmits(['update:productName', ]) 

const inputProduct = computed({
    get: () => props.productName,
    
    set: (newValue) => {
        if(findPriceByName(newValue)){
            const product = findPriceByName(newValue)
            
            emit('update:unitPrice' , product.reference_price)
        }

        if(!findPriceByName(newValue)){
            emit('update:unitPrice' , (0).toFixed(2))
        }
        
        emit('update:productName', newValue)
    }
})

const findPriceByName = (productName) => {
    return props.productData.find(product => product.name === productName)
}

const inputQuantity = computed({
    get: () => props.quantity,

    set: (newValue) => {
        emit('update:quantity', newValue)
    }
})

const inputUnitPrice = computed({
    get: () => (props.unitPrice),

    set: (newValue) => {  
        emit('update:unitPrice', newValue)
    }
})

const inputDescription = computed({
    get: () => props.description,

    set: (newValue) => {
        emit('update:description' , newValue)
    }
})

const inputAmountMoney = computed({
    get: ()=> props.amountMoney,

    set: (newValue) => {
        emit('update:amountMoney', newValue)
    }
})

const clickButton = (type) => {        
    emit ('clickButton', type )
}

const totalSum = computed(() => {
    const sum = props.productList.reduce((total, product) => {
        const price = parseFloat(product.final_price)
        const quantity = product.quantity
        return total + (quantity * price)
    }, 0)

    return (sum).toFixed(2)
})
const isTableVisible = ref(false)

const viewProductList = () => {
    if(props.productList.length > 0){
        isTableVisible.value = !isTableVisible.value
    }
}


</script>

<template>
    <div class="flex justify-center">
        <div class="max-w-md w-full border-2 border-primary rounded">
            <div class="flex w-full bg-primary">
                <IconButton
                    @click="clickButton('close')"
                    :isButton="true"
                    :icon="XMarkIcon"/>
            </div>

            <div class="bg-white p-2">
                <div class=" flex justify-between p-2 items-center">
                    <Title
                        v-if="!isTableVisible">
                        {{ userName }}'s order
                    </Title>

                    <Title
                        v-if="isTableVisible">
                        {{ userName }}'s order list
                    </Title>

                    <IconButton 
                        @click="viewProductList"
                        :isButton="true"
                        :icon="ShoppingCartIcon"
                        :number="productList.length"/>
                </div>

                <div
                    v-if="!isTableVisible" 
                    class="mx-5">
                    <InputSelect
                        :isReset="false"
                        label="Select Product"
                        :errorMessage="errorSelectedProduct"
                        placeholder="Insert Product"
                        v-model:inputValue="inputProduct"
                        :selectData="productData"/>

                    <div class="flex justify-between my-3 items-center">
                        <p>
                            Quantity
                        </p>

                        <ButtonAmount
                            v-model:valueNumber="inputQuantity"/>
                    </div>

                    <Input
                        :errorMessage="errorUnitPrice"
                        v-model:modelValue="inputUnitPrice"
                        class="my-3"
                        label="Unit Price"
                        type="number"
                        textAlignment="end"
                        optionText="Bs."
                        :isPadding="false"/>

                    <Input
                        v-model:modelValue="props.totalPrice"
                        class="my-3"
                        label="Total Price"
                        type="number"
                        textAlignment="end"
                        optionText="Bs."
                        :isPadding="false"
                        :isDisabled="true"/>

                    <TextArea
                        :errorMessage="errorDescription"
                        v-model="inputDescription"
                        class="my-3"
                        label="Description"/>

                    <div class="flex flex-col items-center sm:flex-row-reverse gap-2 my-3 justify-center">
                        <Button
                            @click="clickButton('create')"
                            :isDisabled="isButtonDisabled"
                            buttonName="Add to cart"/>

                        <Button
                            v-if="productList.length > 0"
                            @click="isTableVisible = true"
                            buttonName="View cart"
                            buttonType="ghost"/>
                    </div>
                </div>

                <div 
                    v-if="isTableVisible"
                    class="mx-5">
                    <div class="overflow-auto border-2 border-primary rounded h-[200px]">
                        <table class="w-full min-w-[350px]">
                            <thead>
                                <tr>
                                    <th
                                        class="text-start bg-light-primary p-2 w-[55%]">
                                        Name
                                    </th>

                                    <th
                                        class="text-start bg-light-primary p-2 w-[10%]">
                                        Quantity
                                    </th>

                                    <th
                                        class="text-end bg-light-primary p-2 w-[35%]">
                                        Price
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr 
                                    v-for="product in productList"
                                    :key="product.product_id"
                                    class="border-b border-primary">
                                    <td class="text-start p-2">
                                        {{ product.product_name }}     
                                    </td>

                                    <td class="text-start p-2">
                                        {{ product.quantity }} units
                                    </td>

                                    <td class="text-end p-2">
                                        {{ (product.final_price * product.quantity).toFixed(2) }} Bs.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Input
                        v-model="totalSum"
                        class="my-3"
                        label="Total Price"
                        textAlignment="end"
                        optionText="Bs."
                        :isDisabled="true"
                        :isPadding="false"/>

                    <Input
                        :errorMessage="errorAmountMoney"
                        v-model="inputAmountMoney"
                        type="number"
                        class="my-3"
                        label="Amount Money"
                        textAlignment="end"
                        optionText="Bs."
                        :isDisabled="false"
                        :isPadding="false"/>

                    <div class="flex flex-col items-center sm:flex-row-reverse gap-2 my-3 justify-center">
                        <Button
                            @click="clickButton('registerOrder')"
                            buttonName="Register order"/>

                        <Button
                            @click="isTableVisible =  false"
                            buttonName="Back"
                            buttonType="ghost"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>