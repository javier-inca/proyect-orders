<script setup>
import { ExclamationTriangleIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    users:{
        type:Array,
        default:[]
    },

    userBackend :{
        type:Array,
        default:[]
    }
})
</script>

<template>
    <div class="w-full h-80 border-2 overflow-y-auto">
        <table class="w-full">
            <thead class=" sticky top-0 text-xs text-black uppercase bg-gray-200">
                <tr>
                    <th  class="px-6 py-3 text-center w-1/5">
                        Name
                    </th>

                    <th 
                        class="px-6 py-3 w-1/5 text-center">
                        Payment
                    </th>

                    <th 
                        class="px-6 py-3 w-1/5 text-center">
                        Total Price
                    </th>

                    <th 
                        class="px-6 py-3 w-1/5 text-center">
                        Change
                    </th>

                    <th  class="px-6 py-3 text-center w-1/5" >
                        Options
                    </th>
                </tr>
            </thead>

            <tbody
                class="border-opacity-25 overflow-y-auto"
                v-if="users.length > 0">
                <tr 
                    v-for="(user, index) in users"
                    :key="index"
                    class="hover:bg-slate-50">
                    <td class="px-6 py-4 font-medium text-gray-900">
                        {{ user.user_id }}
                    </td>

                    <td class="px-6 py-4 text-end">
                        {{ user.amount_money }} Bs.
                    </td>

                    <td class="px-6 py-4 text-end">
                        {{ user.totalPrice }} Bs.
                    </td>

                    <td class="px-6 py-4 text-end">
                        {{ user.change }} Bs.
                    </td>

                    <td class="px-6 py-4 flex justify-center gap-2">
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
            v-if="users.length === 0" 
            class="w-full h-80 flex justify-center items-center flex-col">
            <ExclamationTriangleIcon
                class="size-20"/>

            <p class=" font-bold">
                There are no orders in the list
            </p>
        </div>
    </div>
</template>