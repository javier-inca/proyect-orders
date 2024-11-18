<script setup>
import { InformationCircleIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import Title from './Title.vue'


const props = defineProps({
    modalColor: {
        type: String,
        default: 'danger'
    },

    title: {
        type: String,
        default: 'insert product'
    },

    message: {
        type: String,
        default: 'Lorem ipsum dolor sit amet consectetur adipiscing, elit enim per sodales metus, conubia senectus fermentum justo iaculis. Malesuada molestie vehicula turpis cubilia pharetra feugiat eleifend, non nam felis velit aenean suspendisse auctor, purus ante arcu aptent ligula pellentesque, sollicitudin facilisi dapibus quisque inceptos rhoncus. Tristique habitasse mus in, congue commodo.'
    },

    
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
</script>

<template>
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
        </div>

    </div>
</template>