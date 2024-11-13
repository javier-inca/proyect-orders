<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    orderUsers: {
        type: Array,
        default: []
    },

    dataProducts:{
            type:Array,
            default:[]
    },
});

const getProductName = (productId) => {
    const product = props.dataProducts.find(findProduct => findProduct.id === productId)
    return product.name
}  

const getProductPrice = (productId) => {
  const product = props.dataProducts.find(findProduct => findProduct.id === productId);
  return product ? product.reference_price : 0;
};

const productSummary = computed(() => {
  const summary = {};

  props.orderUsers.forEach(order => {
    order.products.forEach(product => {
      if (summary[product.product_id]) {
        summary[product.product_id] += product.quantity;
      } else {
        summary[product.product_id] = product.quantity;
      }
    });
  });

  return Object.keys(summary).map(productId => ({
    product_id: Number(productId),
    quantity: summary[productId]
  }));
});
</script>

<template>
  <div
    class="mx-7 mt-5">
    <div class="flex justify-between">
        <p 
            class=" font-bold w-[50%]">
            Product
        </p>

        <p
            class="font-bold w-[25%] text-end">
            Quantity
        </p>

        <p  
            class=" font-bold w-[25%] text-end">
            Total Price
        </p>
    </div>

    <div class="flex justify-between mt-3 border-b border-dashed"
        v-for="product in productSummary"
        :key="product.product_id">
        <p
            class=" w-[50%]">
            {{ getProductName(product.product_id) }}
        </p>

        <p
            class="w-[25%] text-end">
            {{ product.quantity }}
        </p>

        <p
            class="w-[25%] text-end">
            {{ (getProductPrice(product.product_id) * product.quantity).toFixed(2) }} Bs.
        </p>
    </div>
  </div>
</template>