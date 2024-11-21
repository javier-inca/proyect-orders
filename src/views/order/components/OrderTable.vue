<script setup>
import moment from 'moment';


const props = defineProps({
    orderData: {
        type: Array,
        default: []
    },

    userData: {
        type: Array,
        default: []
    },
})

const getUserName = (userId) => {
    const user = props.userData.find(user => user.id === userId);
    return user ? user.name : 'Unknown';
}
</script>

<template>
    <div class="w-full overflow-x-auto overflow-visible border-2 border-primary rounded-md ">
        <table class="w-full min-w-[600px]">
            <thead class=" bg-light-primary uppercase text-sm">
                <tr>    
                    <th class="px-2 py-3 text-start w-[40%]">
                        Description
                    </th>
    
                    <th class="px-2 py-3 text-start w-[20%]">
                        Buyer
                    </th>
    
                    <th class="px-2 py-3 text-start w-[20%]">
                        Date
                    </th>
    
                    <th class="px-2 py-3 text-start w-[20%]">
                        Status
                    </th>
                </tr>
            </thead>
    
            <tbody>
                <tr
                    class="border-b-2"
                    v-for="order in orderData"
                    :key="order.id">
                    <td
                        class="px-2 py-3 text-sm">
                        {{ order.reason }}
                    </td>

                    <td
                        class="px-2 py-3">
                        {{ getUserName( order.delivery_user_id ) }}
                    </td>

                    <td
                        class="px-2 py-3">
                        {{ moment(order.order_date).format('DD-MMM-YY') }}
                    </td>

                    <td
                        class="px-2 py-3">
                        {{ order.state }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>