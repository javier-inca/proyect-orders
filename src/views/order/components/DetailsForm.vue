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
    userList:{
        type: Array,
        default: []
    },
    
    reason: {
        type: String,
        default: ''
    },
    
    buyer: {
        type: String,
        default : ''
    },
    
    date: {
        type: String,
        default:''
    },

    errors: {
        type: Object,
        default: {
            reason: '',
            buyer: '',
            date: '',
        }
    },

    status: {
        type: Boolean,
        default: false,
    }
})

/* mostrar formulario */
const showForm = ref(true)

const emit = defineEmits(['update:reason', 'update:buyer', 'update:date', 'clickSave'])

/* obtener y cambiar el valor de reason y enviar al padre */
const inputReason = computed({
    get: () => props.reason,

    set: (newValue) => {
        emit('update:reason', newValue)
    }
})

/* obtener y cambiar el valor de buyer y enviar al padre */
const inputBuyer = computed({
    get: () => props.buyer,

    set: (newValue) => {
        emit('update:buyer', newValue)
    }
})

/* obtener y cambiar el valor de date y enviar al padre */
const inputDate = computed({
    get: () => props.date,

    set: (newValue) => {
        emit('update:date', newValue)
    }
})

const clickSave = (action) => {
    emit('clickSave' , action)
}
</script>

<template>
    <div class="w-full p-2 border border-primary rounded my-2">
        <!-- titulo y razon de pedido -->
        <div class="flex justify-between mb-2">
            <Title
                :title="showForm ? 'Order Details' : reason"
                :isUppercase="true"
                aling="start"/>

            <ChevronDownIcon
                v-if="status"
                :class="{ 'rotate-180' : !showForm}"
                @click="showForm = !showForm"
                class="size-6 transition-all duration-500"/>
        </div>

        <!-- Formulario -->
        <div 
            class="relative z-10"
            v-if="showForm">    
            <div class="w-full my-2">
                <TextArea
                    v-model="inputReason"
                    label="Reason"
                    placeholder="Example: lunch, breakfast..."
                    :errorMessage="errors.reason"/>
            </div>

            <div class="flex flex-col gap-2 sm:flex-row my-3">
                <div class="w-full sm:w-1/2">
                    <Select
                        placeholder="Select"
                        :errorMessage="errors.buyer"
                        v-model:inputValue="inputBuyer"
                        :selectData="userList"
                        label="Buyer"/>
                </div>
    
                <div class="w-full sm:w-1/2">
                    <Input
                        v-model="inputDate"
                        :errorMessage="errors.date"
                        label="Date"
                        type="date"/>
    
                </div>
            </div>
    
            <div class="flex justify-center">
                <Button
                    @click="clickSave('save')"
                    buttonName="Save Order"/>
            </div>
        </div>

        <!-- Detalles de formulario -->
        <div 
            class="realtive z-10"
            v-if="!showForm">
            <div class="flex flex-col sm:flex-row justify-between w-full gap-2 my-1">
                <p>
                    <span class=" font-bold">
                        Buyer:
                    </span>

                    {{ buyer }}
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