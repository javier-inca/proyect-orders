<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'


const props = defineProps({
    orderUsers:{
        type:Array,
        default:[]
    },

    dataUsers:{
        type:Array,
        default:[]
    },

    dataProducts:{
        type:Array,
        default:[]
    },
})

const getNameUser = (userId) => {
    const user = props.dataUsers.find(findUser => findUser.id === userId)
    return user.name
}

const getProductName = (productId) => {
    const product = props.dataProducts.find(findProduct => findProduct.id === productId)
    return product.name
}  

const selectedToShow = ref(null)

const openDetails = (id) => {
    if(selectedToShow.value !== id){
        selectedToShow.value = id
        return
    }
    selectedToShow.value = null
}

const calculateTotalPrice = (products) => {
    let totalPrice = 0 

    products.forEach(product => {
        const price = parseFloat(product.final_price)  
        const quantity = product.quantity 

        totalPrice += price * quantity
    })

    return (totalPrice).toFixed(2) 
}

const calculateChange = (payment, totalPrice) => {
    const change = parseFloat(payment) - parseFloat(totalPrice)
    return change.toFixed(2)
}
</script>

<template>
    <div 
        :class="{
            'border-transparent' : selectedToShow === user.id
        }"
        class="border-b-2  mt-5 cursor-pointer px-1"
        @click="openDetails(user.id)"
        v-for="user in orderUsers"
        :key="user.id">
        <div 
            :class="{
                ' text-slate-500' : selectedToShow !== user.id && selectedToShow != null,
                
            }" 
            class="flex justify-between">
            <div 
                :class="{ ' transition-transform scale-125 ml-1' : selectedToShow === user.id }"
                class="font-bold">
                {{ getNameUser(user.user_id) }}
            </div>
    
            <ChevronDownIcon
                class="size-6"/>
        </div>

        <div 
            v-if="selectedToShow === user.id"
            class="mt-5 border-x-2 border-b-2">
            <table class="w-full">
                <thead class="text-xs text-black uppercase bg-gray-200">
                    <tr>
                        <th  class="px-6 py-3 w-[30%] text-start">
                            Product name
                        </th>

                        <th  class="px-6 py-3  w-[30%] text-start">
                            Description
                        </th>

                        <th  class="px-6 py-3  w-[15%] text-end">
                            Quantity
                        </th>

                        <th  class="px-6 py-3  w-[25%] text-end">
                            Price
                        </th>
                    </tr>
                </thead>

                <tbody
                    class=" border-b-2">
                    <tr 
                        v-for="product in user.products"
                        :key="product.id"
                        class="hover:bg-slate-50">
                        <td class="px-6 py-4 font-medium text-gray-900">
                            {{ getProductName(product.product_id) }}
                        </td>

                        <td class=" px-6 py-4 text-start">
                            {{ product.description? product.description:'-' }}
                        </td>

                        <td class=" px-6 py-4 text-end">
                            {{ product.quantity }}
                        </td>

                        <td class=" px-6 py-4 text-end">
                            {{ (product.quantity * product.final_price).toFixed(2) }} Bs.
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="flex justify-between px-6 py-3">
                <p
                    class=" font-bold">
                    Payment
                </p>

                <p>
                    {{ user.amount_money }} Bs.
                </p>
            </div>

            <div class="flex justify-between px-6 py-3">
                <p
                    class=" font-bold">
                    Total Price
                </p>

                <p>
                    {{ calculateTotalPrice(user.products) }} Bs.
                </p>
            </div>

            <div class="flex justify-between px-6 py-3">
                <p
                    class=" font-bold">
                    Change
                </p>

                <p>
                    {{ calculateChange(user.amount_money, calculateTotalPrice(user.products)) }} Bs.
                </p>
            </div>
        </div>
    </div>
</template>