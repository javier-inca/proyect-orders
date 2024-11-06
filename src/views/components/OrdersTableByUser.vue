<script setup>
import { ref } from 'vue'
import Title from '../../components/Title.vue'
import Button from '../../components/Button.vue'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import View from './View.vue';

const props = defineProps({
    products: Object,
    default: {}
})
const emit = defineEmits()

const buttonClick = (action,product,index ) =>{
    emit('buttonClick' ,{
        type:action,
        product:product,
        index:index
    })
}

</script>

<template>
    <div 
        class="my-2 border-2 border-blue-600 rounded bg-white">
        <div
            :class="{
                'h-52 overflow-y-auto' : products.length > 3
            }">
            <table 
                class="w-full text-sm text-left rtl:text-right">
                <thead 
                    class="text-xs uppercase bg-gray-200 sticky top-0 z-10">
                    <tr>
                        <th 
                            scope="col" 
                            class="px-6 py-3">
                            Product
                        </th>
    
                        <th 
                            scope="col" 
                            class="px-6 py-3 text-center">
                            Amount
                        </th>
    
                        <th 
                            scope="col" 
                            class="px-6 py-3 text-center w-full">
                            Price
                        </th>
    
                        <th 
                            scope="col" 
                            class="px-6 py-3 text-center">
                            Options
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr 
                        class="bg-white border-b" 
                        v-for="order,index in products" 
                        :key="order.id">
                        <td 
                            scope="row" 
                            class="px-6 py-4 font-medium text-gray-900">
                            {{ order.name }}
                        </td>
    
                        <td 
                            scope="row" 
                            class="px-6 py-4 font-medium text-gray-900 text-end">
                            {{ order.quantity }} u.
                        </td>
    
                        <td 
                            scope="row" 
                            class="px-6 py-4 font-medium text-gray-900 text-end">
                            {{ order.totalPrice }} Bs.
                        </td>
    
                        <td
                            scope="row" 
                            class="px-6 py-4 flex justify-center gap-2">
                            <button
                                @click="buttonClick('view',order,index)">
                                <EyeIcon
                                    class="size-6 text-blue-600"/>
                            </button>

                            <button
                                @click="buttonClick('edit',order,index)">
                                <PencilIcon
                                    class="size-6 text-blue-600"/>
                            </button>

                            <button
                                >
                                <TrashIcon
                                    class="size-6 text-blue-600"/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>