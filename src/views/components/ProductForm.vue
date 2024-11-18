<script setup>
import { computed, ref, watch } from 'vue'
import InputSelect from '../../components/InputSelect.vue'
import Input from '../../components/Input.vue'
import TextArea from '../../components/TextArea.vue'
import Title from '../../components/Title.vue'
import Button from '../../components/Button.vue'

const props = defineProps({
    productName:{
        type:String,
        default:''
    },

    quantity:{
        type:Number,
        default:''
    },

    unitPrice:{
        type:Number,
        default:''
    },

    totalPrice:{
        type:Number,
        default:''
    },

    description:{
        type:String,
        default:''
    },

    nameButton:{
        type:String,
        default:'Add'
    },

    products:{
        type:Array,
        default:{}
    },

    isViewButton:{
        type:Boolean,
        default:true
    },

    type:{
        type:String,
        default:'create'
    }
})

const emit = defineEmits(['update:productName', 'update:quantity', 'update:unitPrice', 'update:totalPrice', 'update:description'])

const modelProductName = computed({
    get: () => props.productName,
    set: (newValue) => {
        emit ('update:productName', newValue)
    }
})

const modelQuantity = computed({
    get: () => props.quantity,
    set: (newValue) => {
        emit ('update:quantity', newValue)
    }
})

const modelUnitPrice = computed({
    get: () => props.unitPrice,
    set: (newValue) => {
        emit ('update:unitPrice', newValue)
    }
})

const modelTotalPrice = computed({
    get: () => props.totalPrice,
    set: (newValue) => {
        emit ('update:totalPrice', newValue)
    }
})

const modelDescription = computed({
    get: () => props.description,
    set: (newValue) => {
        emit ('update:description', newValue)
    }
})

const emitButton = (type)=>{
    emit('clickButton', type)
}  
</script>

<template>
    <div class="border-2 border-blue-800 p-2 rounded">
        <div 
            v-if="type==='create'"
            class="flex justify-between items-center py-1">
            <strong
                class="text-sm">
                Select Product
            </strong>

            <InputSelect
                v-model="modelProductName"
                textAlignment="end"
                :options="products"/>
        </div>

        <Title
            v-if="type === 'edit'"
            :title="''+productName"
            size="sm"/>

        <div class="flex justify-between items-center py-1">
            <strong
                class="text-sm">
                Quantity:
            </strong>

            <Input
                v-model="modelQuantity"
                textAlignment="end"
                class="bg-green-800"
                type="number"/>
        </div>

        <div class="flex justify-between items-center py-1">
            <strong
                class="text-sm">
                Unit Price:
            </strong>

            <Input
                v-model="modelUnitPrice"
                textAlignment="end"
                class="bg-green-800"
                type="number"/>
        </div>

        <div class="flex justify-between items-center py-1">
            <strong
                class="text-sm">
                Total Price:
            </strong>

            <Input
                v-model="modelTotalPrice"
                textAlignment="end"
                :disabled="true"
                class="bg-green-800"
                type="number"/>
        </div>

        <div class="flex flex-col py-1">
            <strong
                class="text-sm">
                Description:
            </strong>

            <TextArea
                v-model="modelDescription"/>
        </div>

        <div
            class="flex gap-12 py-1">
            <Button
                @click="emitButton('cancel')"
                name="Cancel"
                type="danger"
                xSize="lg"/>
            
            <Button
                :disabled="!isViewButton"
                @click="emitButton('add')"
                type="accept"
                :name="nameButton"
                xSize="lg"/>
        </div>
    </div>
</template>