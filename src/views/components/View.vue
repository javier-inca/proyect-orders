<script setup>
import Button from '../../components/Button.vue'

const props = defineProps({
    content:{
        type:Object,
        default:{}
    },

    type:{
        type:String,
        default:'product'
    }
})

const emit = defineEmits()

const emitButton = () =>{
    emit('buttonClosed')
}
</script>

<template>
    <div class="m-2 mx-6"
        v-if="type === 'product'">
        <div class="w-full flex justify-between border-b border-dashed border-blue-600 px-2 mb-3">
            <strong 
                class="uppercase text-sm flex items-end">
                Product
            </strong>

            <p 
                class="text-end">
                {{ content.name }}
            </p>
        </div>

        <div class="w-full flex justify-between border-b border-dashed border-blue-600 px-2 mb-3">
            <strong 
                class="uppercase text-sm flex items-end">
                Quantity
            </strong>

            <p 
                class="text-end">
                {{ content.quantity }} unit.
            </p>
        </div>

        <div class="w-full flex justify-between px-2 mb-3">
            <strong 
                class="uppercase text-sm flex items-end">
                Unit Price
            </strong>

            <p 
                class="text-end">
                {{ content.unitPrice }} Bs.
            </p>
        </div>

        <div class="my-4 border border-blue-700">

        </div>

        <div class="w-full flex justify-between border-b border-dashed border-blue-600 px-2 mb-3">
            <strong 
                class="uppercase text-sm flex items-end">
                Total Price
            </strong>

            <p 
                class="text-end">
                {{ content.totalPrice }} Bs.
            </p>
        </div>

        <div 
            :class="{
                'flex justify-between border-b border-dashed border-blue-600 px-2 mb-3' : !content.description
            }"
            class="w-full px-2">
            <strong 
                class="uppercase text-sm">
                Description
            </strong>

            <p class="text-justify">
                {{ content.description ? content.description : '-' }}
            </p>
        </div>

        <div class="flex justify-center">
            <Button
                @click="emitButton"
                class="mt-2"
                name="Back"
                type="danger"
                xSize="md"/>
        </div>
    </div>
</template>