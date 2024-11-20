<script setup>
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'

const props = defineProps({
    valueNumber:{
        type: Number,
        default: 1
    }
})

const emit = defineEmits()

const modelNumber = computed({
    get: () => props.valueNumber,
    set: (newValue) =>{
        emit('update:valueNumber' , newValue)
    }
})
</script>

<template>
    <div class="flex items-center border rounded-xl border-primary">
        <button
            :class="{
                '!bg-light-primary !rounded-l-xl':modelNumber <= 1,
                'text-white': modelNumber > 1
            }"
            :disabled="modelNumber <= 1"
            @click="modelNumber = modelNumber - 1"
            class="bg-primary p-1 rounded-l-lg">
            <MinusIcon
                class="size-5"/>
        </button>

        <p
            class="w-10 text-center">
            {{ modelNumber }}
        </p>

        <button
            :class="{
                '!bg-light-primary !rounded-r-xl':modelNumber >= 99,
                'text-white': modelNumber < 99
            }"
            :disabled="modelNumber >= 99"
            @click="modelNumber = modelNumber + 1"
            class="bg-primary p-1 rounded-r-lg">
            <PlusIcon
                class="size-5"/>
        </button>
    </div>    
</template>