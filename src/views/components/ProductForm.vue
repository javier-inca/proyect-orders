<script setup>
import { computed, ref, watch } from 'vue';
import InputSelect from '../../components/InputSelect.vue'
import Input from '../../components/Input.vue';
import TextArea from '../../components/TextArea.vue'
import Title from '../../components/Title.vue'
import Button from '../../components/Button.vue';

const props = defineProps({
    modelProduct:{
        type:Array,
        default:{
            name:'',
            quantity:'',
            unitPrice:'',
            totalPrice:'',
            description:'',
        }
    },

    nameButton:{
        type:String,
        default:'Add'
    },

    products:{
        type:Array,
        default:{}
    }
})

const emit = defineEmits('update:modelProduct')

const modelInput = computed({
    get: () => props.modelProduct,
    set: (newValue) => { 
        emit ('update:modelProduct', newValue) 
    }   
})
</script>

<template>
    <div class="border-2 border-blue-800 p-2 rounded">
        <div class="flex justify-between items-center py-1">
            <strong
                class="text-sm">
                Select Product
            </strong>

            <InputSelect
                v-model="modelInput.name"
                textAlignment="end"
                :options="products"/>
        </div>

        <Title
            :title="'dw'"
            size="sm"/>

        <div class="flex justify-between items-center py-1">
            <strong
                class="text-sm">
                Quantity:
            </strong>

            <Input
                v-model="modelInput.quantity"
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
                v-model="modelInput.unitPrice"
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
                v-model="modelInput.totalPrice"
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
                v-model="modelInput.description"/>
        </div>

        <div class="flex gap-12 py-1">
            <Button
                name="Cancel"
                type="danger"
                xSize="lg"/>
            
            <Button
                type="accept"
                :name="nameButton"
                xSize="lg"/>
        </div>
    </div>
</template>