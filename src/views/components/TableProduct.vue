<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    products:{
        type:Array,
        default:{}
    },

    stateLoading:{
        type:Boolean,
        default:true
    }
})

const emit =defineEmits()

const clickOptions =(type, id)=>{
    emit('clickOptions',{
        type:type,
        id:id
    })
}
</script>

<template>
    <div class="flex justify-center">
        <table class="w-full text-sm text-left md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12">
            <thead class="text-xs text-black uppercase bg-gray-200">
                <tr>
                    <th  class="px-6 py-3">
                        Product name
                    </th>
                    <th  class="px-6 py-3 text-end">
                        Price
                    </th>
                    <th  class="px-6 py-3 text-center">
                        Options
                    </th>
                </tr>
            </thead>
            <tbody
                class=" border-b-2 border-b-black border-opacity-25"
                v-if="!stateLoading">
                <tr 
                    v-for="product in products"
                    :key="product.id"
                    class="hover:bg-slate-50">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {{ product.name }}
                    </td>

                    <td class=" px-6 py-4 text-end">
                        {{ product.reference_price}} Bs.
                    </td>

                    <td class="px-6 py-4 flex justify-center gap-3">
                        <button
                            @click="clickOptions('edit', product.id)">
                            <PencilIcon
                                class="size-5 hover:text-primary hover:scale-125 transition-transform duration-75"/>
                        </button>

                        <button
                            @click="clickOptions('viewDelete',product.id)">
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
    </div>
</template>