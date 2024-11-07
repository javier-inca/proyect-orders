<script setup>
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import moment from 'moment';

const props = defineProps({
    orders:{
        type:Array,
        default:[
            {
            id:1,
            description:'Compra de desayunos',
            date:'07-11-2024',
            },
            {
            id:2,
            description:'Compra de salteñas',
            date:'06-11-2024',
            },
        ]
    },
})
</script>

<template>
    <table class="w-full">
        <thead class="text-xs text-black uppercase bg-gray-200">
            <tr>
                <th  class="px-6 py-3 text-start">
                    Order Description
                </th>

                <th  class="px-6 py-3 text-center">
                    Date
                </th>

                <th  class="px-6 py-3 text-end">
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
                    {{ moment(order.date,'DD-MM-YYYY').format('DD/MM/YYYY') }}
                </td>

                <td class="px-6 py-4 flex justify-end gap-2">
                    <button>
                        <EyeIcon
                            class="size-5 hover:text-primary hover:scale-125 transition-transform duration-75"/>
                    </button>

                    <button>
                        <PencilIcon
                            class="size-5 hover:text-primary hover:scale-125 transition-transform duration-75"/>
                    </button>

                    <button>
                        <TrashIcon
                            class="size-5 hover:text-secondary hover:scale-125 transition-transform duration-75"/>
                            
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