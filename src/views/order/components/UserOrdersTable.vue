<script setup>
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps({
    orderList: {
        type: Array,
        default: []
    },

    userList: {
        type:Array,
        default: []
    },
})

const userNameById = (userId) => {
    const findName = props.userList.find(user => user.id === userId)

    return findName.name
}
</script>

<template>
    <div class="w-full overflow-x-auto my-5 border-2">
        <table
            class="w-full min-w-[400px]">
            <thead>
                <tr
                    class="bg-light-primary">
                    <th
                        class=" text-start p-2 w-[40%]">
                        User Name
                    </th>

                    <th
                        class=" text-end p-2 w-[30%]">
                        Money
                    </th>

                    <th
                        class=" text-center p-2 w-[30%]">
                        Options
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    class="border-b-2 border-primary"
                    v-for="order in orderList"
                    :key="order.id">
                    <td 
                        class="p-2">
                        {{ userNameById(order.user_id) }}
                    </td>

                    <td
                        class="p-2 text-end">
                        {{ order.amount_money }} Bs.
                    </td>

                    <td
                        class="p-2 flex justify-center gap-2">
                        <EyeIcon
                            class="size-6"/>

                        <PencilIcon
                            class="size-6"/>

                        <TrashIcon
                            class="size-6"/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>