<script setup>
import Input from '../../../components/Input.vue'
import Title from '../../../components/Title.vue'
import Select from '../../../components/Select.vue'
import TextArea from '../../../components/TextArea.vue'
import { computed, ref } from 'vue'
import Button from '../../../components/Button.vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import moment from 'moment'

const props = defineProps({
    userData:{
        type: Array,
        default: []
    },

    statusOrder: {
        type: Boolean,
        default: true
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

    reason: {
        type: String,
        default: ''
    },

    isShowForm: {
        type: Boolean,
        default: true
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
    get: () => props.reason,

    set: (newValue) => {
        emit('update:reason', newValue)
    }
})

const showForm = computed({
    get: () => props.isShowForm,

    set: (newValue) => {
        emit('update:isShowForm' , newValue)
    }
})

const sentBlur = (type) => {
    emit('save' , type) 
   
}

const name = ref()
</script>

<template>
    <div class="w-full p-2 border border-primary rounded my-2">
        <div class="flex justify-between mb-2">
            <Title
                :title="showForm ? 'Order Details': reason"
                :isUppercase="true"/>

            <ChevronDownIcon
                v-if="statusOrder"
                :class="{
                    'rotate-180': isShowForm
                }"
                @click="showForm = !showForm"
                class="size-6 transition-all duration-500 "/>
        </div>

        <div
            v-if="showForm">    
            <div class="w-full my-3">
                <TextArea
                    @blurInput="sentBlur('autosave')"
                    v-model="inputDescription"
                    label="Reason"
                    placeholder="Example: lunch, breakfast..."
                    :errorMessage="errorDescription"/>
            </div>

            <div class="flex flex-col gap-2 sm:flex-row my-3">
                <div class="w-full sm:w-1/2">
                    <Select
                        @blurInput="sentBlur('autosave')"
                        placeholder="Select"
                        :errorMessage="errorDelivery"
                        v-model:inputValue="inputDelivery"
                        :selectData="userData"
                        label="Order handler"/>
                </div>
    
                <div class="w-full sm:w-1/2">
                    <Input
                        @blurInput="sentBlur('autosave')"
                        v-model="inputDate"
                        :errorMessage="errorDate"
                        label="Date"
                        type="date"/>
    
                </div>
            </div>
    
            <div class="flex justify-center">
                <Button
                    @click="sentBlur('save')"
                    buttonName="Save Order"/>
            </div>
        </div>

        <div 
            v-if="!showForm">
            <div class=" flex flex-col sm:flex-row justify-between w-full gap-2 ">
                <p>
                    <span class=" font-bold">
                        Order handler:
                    </span>

                    {{ delivery }}
                </p>

                <p>
                    <span class=" font-bold">
                        Date:
                    </span>
                    {{ date ? moment(date).format('DD-MMM-YYYY') : 'No date provided' }}
                </p>

            </div>
        </div>
    </div>    
</template>