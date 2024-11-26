<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import Title from './Title.vue'
import Button from './Button.vue';


const props = defineProps({
    modalColor: {
        type: String,
        default: 'danger'
    },

    title: {
        type: String,
        default: ''
    },

    message: {
        type: String,
        default: ''
    },

    nameButtonLeft: {
        type: String,
        default: 'Cancel'
    },

    nameButtonRight: {
        type: String,
        default: 'Delete'
    }
})

const modalColors = {
    'primary' : 'bg-primary border-primary text-primary',
    'secondary' : 'bg-secondary border-secondary text-secondary',
    'danger' : 'bg-danger border-danger text-danger',
    'warning' : 'bg-warning border-warning text-warning',
    'information' : 'bg-information border-information text-information',
    'success' : 'bg-success border-success text-success',
}

const modalColor = computed(() => {
    return modalColors[props.modalColor]? modalColors[props.modalColor] : 'bg-primary'
})

const emit = defineEmits()

const clickButton = (type) => {
    console.log(type);
    
    emit('clickButton', type)
}
</script>

<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div 
            :class="[
                modalColor,
            ]"
            class="relative z-10 min-w-[300px] max-w-[350px] rounded-md border-2">
            <div class=" mt-4 bg-white w-full rounded-b flex items-center flex-col p-2">
                <div class="mt-1 mb-1">
                    <InformationCircleIcon
                        :class="modalColor"
                        class="size-10 !bg-white rounded-full"/>
                </div>

                <Title
                    class="!text-black"
                    :title="title"/>

                <p
                    class=" my-2 text-center !text-black"
                    v-if="message">
                    {{ message }}
                </p>

                <p
                    v-if="!message"
                    class=" my-2 text-center !text-black">
                    <slot/>
                </p>

                <div class="flex gap-2 my-3">
                    <Button
                        @click="clickButton(nameButtonLeft)"
                        :buttonColor="props.modalColor"
                        :buttonName="nameButtonLeft"
                        buttonType="ghost"/>

                    <Button
                        @click="clickButton(nameButtonRight)"
                        :buttonName="nameButtonRight"
                        :buttonColor="props.modalColor"/>
                </div>
            </div>
        </div>
    </div>
</template>