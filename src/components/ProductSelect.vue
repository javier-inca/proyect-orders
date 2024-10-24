<script setup>
import Select from './Select.vue';
import Input from './Input.vue';
import Button from './Button.vue';
import { ref, watch } from 'vue';

const idProduct = ref(0);
const amount = ref();
const cash = ref();
const props = defineProps({ products: Array });

const price = ref(0);
const totalPrice = ref(0);
const change = ref();

const viewProductDetails = ref(false);
const viewPrices = ref(false);
const viewButtons = ref(false);

const calculateValues = () => {
    price.value = idProduct.value > 0 ? props.products.find(product => product.id === idProduct.value)?.price || 0 : 0;
    totalPrice.value = price.value * amount.value || 0;
    change.value = cash.value >= totalPrice.value ? cash.value - totalPrice.value : '';
};

watch([idProduct, amount, cash], calculateValues);

watch(amount, () => {
    viewPrices.value = amount.value > 0;
    calculateValues();
});

watch(idProduct, () => {
    viewProductDetails.value = idProduct.value > 0;
});

const cancelClick = () => {
    idProduct.value = 0;
    cash.value = '';
    change.value = '';
    viewPrices.value = false;
    viewButtons.value = false;
};
</script>

<template>
    <div class="grid grid-cols-2 gap-3">
        <Select
            v-model="idProduct">
            <option value="0" selected disabled>
                Select Product
            </option>

            <option 
                :value="product.id"
                v-for="product in products"
                :key="product.id">
                {{ product.name }}
            </option>
        </Select>

        <Input
            v-if="viewProductDetails"
            v-model="amount"
            placeholder="Amount"
            type="number"/>

        <Input 
            class="col-span-2"
            v-if="viewProductDetails"
            v-model="description"
            placeholder="Descripcion"/>

        <div 
            v-if="viewPrices"
            class="flex justify-between col-span-2 gap-2" >
            <Input 
                v-model="cash"
                type="number"
                placeholder="Cash"/>

            <Input
                v-model="totalPrice"
                :disabled="true"
                placeholder="Price"/>

            <Input
                v-model="change"
                :disabled="true"
                placeholder="Change"/>
        </div>

        <Button 
            @click="cancelClick"
            v-if="viewButtons"
            name="Cancel"
            type="danger"/>

        <Button 
            v-if="viewButtons"
            name="Register"/>
    </div>
</template>