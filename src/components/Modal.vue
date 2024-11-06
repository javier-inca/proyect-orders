<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';
import Button from './Button.vue';
const props = defineProps({
    message:{
        type:String,
        default:'message'
    },

    product:{
        type:String,
        default:'product'
    }
})

const emit = defineEmits()

const clickButton = (type)=> {
    emit('clickOptions',{
        type:type
    })
}
</script>

<template>
    <div class="w-3/5 md:w-2/5 lg:w-2/6 2xl:w-1/6 3xl:w-3/12 bg-white rounded-xl border border-black-custom shadow-2xl">
        <div class="w-full h-10 bg-black-custom rounded-t-xl flex justify-end">
            <button
                @click="clickButton('cancel')"
                class="mx-3">
                <XMarkIcon
                    class="size-6 text-white hover:text-secondary"/>
            </button>
        </div>

        <div class="m-5">
            <p
                class="text-center text-lg">
                {{ message }} {{ product }}
            </p>
        </div>

        <div class=" flex justify-center items-center my-10 gap-20">
            <Button
                @click="clickButton('cancel')"
                type="danger"
                name="Cancel"/>

            <Button
                @click="clickButton('delete')"
                name="Delete"/>
        </div>
    </div>
</template>