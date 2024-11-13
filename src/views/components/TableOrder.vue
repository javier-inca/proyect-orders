<script setup>
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import moment from 'moment';

const props = defineProps({
    orders:{
        type:Array,
        default:[]
    },
})

const emit = defineEmits()

const clickButton = (type , orderId) => {
    emit('clickButton', [type , orderId])
}

</script>

<template>
    <table class="w-full">
        <thead class="text-xs text-black uppercase bg-gray-200">
            <tr>
                <th  class="px-6 py-3 w-1/3 text-center">
                    Order Description
                </th>

                <th  class="px-6 py-3 w-1/3 text-center">
                    Date
                </th>

                <th  class="px-6 py-3 w-1/3 text-center">
                    Options
                </th>
            </tr>
        </thead>

        <tbody
            class=" border-b-2 border-b-black border-opacity-25"
            v-if="!stateLoading">
            <tr 
                v-for="order in orders"
                :key="order.id"
                class="hover:bg-slate-50">
                <td class="px-6 py-4 font-medium text-gray-900">
                    {{ order.description }}
                </td>

                <td class=" px-6 py-4 text-center">
                    {{ moment(order.order_date).format('DD - MMM - YYYY') }}
                </td>

                <td class="px-6 py-4 flex justify-center gap-2">
                    <button
                        @click="clickButton( 'view' , order.id )">
                        <EyeIcon
                            class="size-5 hover:text-primary hover:scale-125 transition-transform duration-75"/>
                    </button>

                    <button
                        class=" cursor-not-allowed"
                        disabled>
                        <PencilIcon
                            class="size-5 text-slate-700"/>
                    </button>

                    <button
                        class="cursor-not-allowed"
                        disabled>
                        <TrashIcon
                            class="size-5 text-slate-700"/>
                            
                    </button>
                </td>
            </tr>
        </tbody>
            
        <div
            v-if="stateLoading" 
            class="">
            <div class="">
                Loading...
            </div>
        </div>
    </table>
</template>