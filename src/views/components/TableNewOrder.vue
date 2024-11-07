<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    users:{
        type:Array,
        default:[]
    }
})
</script>

<template>
    <div class="w-full">
        <table class="w-full border">
            <thead class="text-xs text-black uppercase bg-gray-200">
                <tr>
                    <th  class="px-6 py-3 text-start w-1/3">
                        Name
                    </th>

                    <th 
                        :class="{
                            'text-center': users.length < 1,
                            'text-end':users.length > 0
                        }"
                        class="px-6 py-3 w-1/3">
                        Total Price
                    </th>

                    <th  class="px-6 py-3 text-end w-1/3" >
                        Options
                    </th>
                </tr>
            </thead>

            <tbody
                class="h-80 border-opacity-25 overflow-y-auto"
                v-if="users.length > 0">
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
        </table>

        <div
            v-if="users.length < 1" 
            class="w-full h-80 flex justify-center items-center border flex-col">
            <ExclamationTriangleIcon
                class="size-20"/>

            <p class=" font-bold">
                There are no orders in the list
            </p>
        </div>
    </div>
</template>