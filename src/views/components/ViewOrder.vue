<script setup>
import TextArea from '../../components/TextArea.vue'
import Title from '../../components/Title.vue'
import moment from 'moment'


const props = defineProps({
    order: {
        type: Object,
        default: []
    },

    products: {
        type: Array,
        default: []
    },

    users: {
        type: Array,
        default: []
    },
})

const getNameUser = (userId) => {
    const user = props.users.find(findUser => findUser.id === userId)
    return user.name
}

const getProductName = (productId) => {
    const product = props.products.find(findProduct => findProduct.id === productId)
    return product.name
} 

</script>

<template>

    <pre>

        {{ order }}
    </pre>
    <div 
        class=" m-3">
        <Title 
            class="font-bold" 
            size="sm" 
            title="Order Details"/>

        <div class="flex justify-between mb-3">
            <p 
                class=" font-bold">
                Order manager
            </p>

            <p>
                {{ order.delivery_user.name }}
            </p>
        </div>

        <div class="flex justify-between mb-3">
            <p 
                class=" font-bold">
                Date
            </p>

            <p>
                {{ moment(order.order_date).format('DD - MMM - YYYY') }}
            </p>
        </div>

        <div class="flex flex-col mb-3">
            <p
                class=" font-bold">
                Description
            </p>

            <TextArea
                :disabled="true"
                v-model="order.description"/>
        </div>

        <Title
            class=" font-bold mb-3"
            size="sm"
            title="User orders"/>

        
    </div>
</template>