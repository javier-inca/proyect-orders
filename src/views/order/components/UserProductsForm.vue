<script setup>
import Title from '../../../components/Title.vue';
import IconButton from '../../../components/IconButton.vue';
import ProductSelectionForm from '../../components/ProductSelectionForm.vue';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import InputSelect from '../../../components/InputSelect.vue';
import ButtonAmount from '../../../components/ButtonAmount.vue';
import Input from '../../../components/Input.vue';
import TextArea from '../../../components/TextArea.vue';
import Button from '../../../components/Button.vue';
import { computed, ref } from 'vue';


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
        default: [{}]
    },

    selectedProduct: {
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

    isButtonDisabled: {
        type: Boolean,
        default: true 
    },

    errorSelectedProduct: String,

    errorQuantity: String,

    errorUnitPrice: String,
    
    errorDescription: String,
})

const emit = defineEmits() 

const inputProduct = computed({
    get: () => props.selectedProduct,
    
    set: (newValue) => {
        emit('update:selectedProduct', newValue)
    }
})

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

const inputTotalPrice = computed({
    get: () => (props.totalPrice).toFixed(2) ,

    set: (newValue) => {
        emit('update:totalPrice' , newValue)
    }
})

const clickButton = (type) => {
    emit ('sentButton', type )
}

const blur = () => {
    emit ('blurInput')
}
const isTableVisible = ref(false)
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
                        v-if="!isTableVisible"
                        title="Select Product"/>

                    <Title
                        v-if="isTableVisible"
                        title="Product List"/>

                    <IconButton 
                        :icon="ShoppingCartIcon"
                        :number="productList.length"/>
                </div>

                <div
                    v-if="!isTableVisible" 
                    class="mx-5">
                    <InputSelect
                        @blurInput="blur"
                        placeholder="Insert Product"
                        v-model:inputValue="inputProduct"
                        :selectData="productData"/>

                    <div class="flex justify-between my-3 items-center">
                        <p
                            class=" font-bold">
                            Quantity
                        </p>

                        <ButtonAmount
                            v-model:valueNumber="inputQuantity"/>
                    </div>

                    <Input
                        v-model:modelValue="inputUnitPrice"
                        class="my-3"
                        label="Unit Price"
                        type="number"
                        textAlignment="end"
                        optionText="Bs."
                        :isPadding="false"/>

                    <Input
                        v-model:modelValue="inputTotalPrice"
                        class="my-3"
                        label="Total Price"
                        type="number"
                        textAlignment="end"
                        optionText="Bs."
                        :isPadding="false"
                        :isDisabled="true"/>

                    <TextArea
                        class="my-3"
                        label="Description"/>

                    <div class="flex flex-col items-center sm:flex-row-reverse gap-2 my-3 justify-center">
                        <Button
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
                    class="mx-2">
                    <div class="overflow-auto border-2 border-primary rounded h-[175px]">
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
                                <tr class="border-b border-primary">
                                    <td class="text-start p-2">
                                        Salteña de pollo picante     
                                    </td>

                                    <td class="text-start p-2">
                                        3 units
                                    </td>

                                    <td class="text-end p-2">
                                        232.00 Bs.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Input
                        class="my-3"
                        label="Total Price"
                        textAlignment="end"
                        optionText="Bs."
                        :isDisabled="true"
                        :isPadding="false"/>

                    <Input
                        class="my-3"
                        label="Amount Money"
                        textAlignment="end"
                        optionText="Bs."
                        :isDisabled="false"
                        :isPadding="false"/>

                    <div class="flex flex-col items-center sm:flex-row-reverse gap-2 my-3 justify-center">
                        <Button
                            :isDisabled="true"
                            buttonName="Add to cart"/>

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