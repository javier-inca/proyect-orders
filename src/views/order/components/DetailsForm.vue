<script setup>
import Input from '../../../components/Input.vue'
import Title from '../../../components/Title.vue'
import Select from '../../../components/Select.vue'
import TextArea from '../../../components/TextArea.vue'
import { computed, ref } from 'vue'

const props = defineProps({
    userData:{
        type: Array,
        default: []
    },

    date: {
        type: Date,
        default: () => {
            const today = new Date()
            return today
        }
    },

    delivery: {
        type: String,
        default : 'dw'
    },

    description: {
        type: String,
        default: ''
    },

    errorDelivery: String,
    
    errorDescription: String,

    errorDate: String,
})
const emit = defineEmits()

const inputDate = computed({
    get: () => {
        const date = props.date
        return date.toISOString().split('T')[0] 
    },

    set: (newValue) => {
        const newDate = new Date(newValue) 
        emit('update:date', newDate)
    }
})

const inputDelivery = computed({
    get: () => props.delivery,

    set: (newValue) => {
        emit('update:delivery' , newValue)
    }
})

const inputDescription = computed({
    get: () => props.description,

    set: (newValue) => {
        emit('update:description', newValue)
    }
})
</script>

<template>
    <div class="w-full p-2 border border-primary rounded my-2">
        <Title
            title="Order Details"
            :isUppercase="false"
            aling="start"/>

        <div class="flex flex-col gap-2 sm:flex-row mt-3">
            <div class="w-full sm:w-1/2">
                <Select
                    :errorMessage="errorDelivery"
                    v-model:inputValue="inputDelivery"
                    :selectData="userData"
                    label="Delivery Person"/>
            </div>

            <div class="w-full sm:w-1/2">
                <Input
                    v-model="inputDate"
                    :errorMessage="errorDate"
                    label="Date"
                    type="date"/>
            </div>
        </div>

        <div class="w-full mt-3 mb-2">
            <TextArea
                v-model="inputDescription"
                label="Description"
                :errorMessage="errorDescription"/>
        </div>
    </div>    
</template>