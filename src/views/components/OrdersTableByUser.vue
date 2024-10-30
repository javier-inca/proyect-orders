<script setup>
import { ref } from 'vue'
import Title from '../../components/Title.vue'
import Button from '../../components/Button.vue'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import View from './View.vue';

const props = defineProps({
    order: Object,
    default: {
    }
})

const sentObject = ref()
const viewDetails = ref(false)
const getProducts = ref(props.order && props.order.products ? (props.order.products.length > 0 ? props.order.products : {}) : {})
const emit = defineEmits()

const buttonClick = (type) =>{
    emit('buttonClick' , type)
}

const showDetails = (getObject) =>{
    console.log('getObject: ', getObject);

    sentObject.value = getObject
    viewDetails.value = true
}
</script>

<template>
    {{ order }}
    <div 
        class="my-2 border-2 border-blue-600 rounded bg-white">
        <div class="flex justify-between m-2 items-center">
            <Title
                :title="`${order.userName}'s products`"
                size="sm"/>
            <Button
                @click="buttonClick('back')"
                name="Back"
                type="danger"/>
        </div>

        <div
            :class="{
                'h-52 overflow-y-auto' : getProducts.length > 3
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
                            class="px-6 py-3 text-center">
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
                        v-for="order in getProducts" 
                        :key="order.id">
                        <td 
                            scope="row" 
                            class="px-6 py-4 font-medium text-gray-900">
                            {{ order.name }}
                        </td>
    
                        <td 
                            scope="row" 
                            class="px-6 py-4 font-medium text-gray-900 text-center">
                            {{ order.amount }}
                        </td>
    
                        <td 
                            scope="row" 
                            class="px-6 py-4 font-medium text-gray-900 text-center">
                            {{ order.price }}
                        </td>
    
                        <td
                            scope="row" 
                            class="px-6 py-4 flex justify-center gap-2">
                            <button
                                @click="showDetails(order)">
                                <EyeIcon
                                    class="size-6 text-blue-600"/>
                            </button>

                            <button
                                >
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

        <View
            :content="sentObject"
            v-if="viewDetails"/>
    </div>
</template>