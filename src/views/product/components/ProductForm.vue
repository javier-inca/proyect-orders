<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline';
import IconButton from '../../../components/IconButton.vue';
import Title from '../../../components/Title.vue';
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';
import Input from '../../../components/Input.vue';
import { computed } from 'vue';
import Button from '../../../components/Button.vue';


/* Props para recibir campo de errores y campos de actualizacion */
const props = defineProps({
    productName: {
        type: String,
        default: '',
    },
    
    productPrice: {
        type: [Number, String],
        default: 0.00,
    },

    title: {
        type: String,
        default: 'Register new product'
    },

    buttonName: {
        type: String,
        default: 'register'
    },

    statusForm: {
        type:Boolean,
        default: false,
    },

    errors: {
        type: Object,
        default: {
            name: '',
            price: ''
        }
    }
})

const emit = defineEmits(['update:productName', 'update:productPrice' , 'clickButton'])

/* Cambiar el valor de productName y enviar al padre */
const inputName = computed({
    get: () => props.productName,

    set: (newValue) => {
        emit('update:productName', newValue)
    }
})

/* Cambiar el valir de productPrice y enviar al pabre */
const inputPrice = computed({
    get: () => props.productPrice,

    set: (newValue) => {        
        emit('update:productPrice', newValue)
    }
})

/* Enviar estado de boton y accion */
const clickButton = ( action ) => {
    emit('clickButton', action)
}
</script>

<template>
    <div class="relative w-full flex justify-center">
        <div class="absolute border-2 rounded-md border-primary w-full min-w-[250px] max-w-[300px] bg-white">
            <!-- Cerrar formulario -->
            <div class="flex w-full bg-primary">
                <IconButton
                    @click="clickButton('cancel')"
                    :isButton="true"
                    :icon="XMarkIcon"/>
            </div>
    
            <!-- Formulario -->
            <div class="px-2 flex flex-col items-center my-3">
                <Title
                    :title="title"/>
    
                <ShoppingCartIcon
                    class=" size-32 text-primary"/>
    
                <Input
                    v-model:modelValue="inputName"
                    :isPadding="false"
                    :isRounded="false"
                    :errorMessage="errors.name"
                    desing="lineBelow"
                    label="Product name"
                    class=" w-3/4 mb-3"/>
    
                <Input
                    v-model:modelValue="inputPrice"
                    :isPadding="false"
                    :isRounded="false"
                    :errorMessage="errors.price"
                    textAlignment="end"
                    desing="lineBelow"
                    label="Product price"
                    type="number"
                    optionText="Bs."
                    class=" w-3/4 mb-4"/>
    
                <!-- Botones de accion  -->
                <div class="flex flex-col-reverse items-center justify-center sm:flex-row gap-2 w-full sm:w-3/4">
                    <Button
                        @click="clickButton('cancel')"
                        buttonType="ghost"
                        buttonColor="danger"
                        buttonName="Cancel"/>
    
                    <Button
                        @click="clickButton(buttonName)"
                        class="capitalize"
                        :buttonName="buttonName"/>
                </div>
            </div>

            <!-- estado de carga -->
            <div 
                v-if="statusForm"
                class=" absolute top-0 bg-gray-200 bg-opacity-70 w-full h-full flex justify-center items-center rounded">
                <svg 
                    class="inline size-14 animate-spin dark:text-gray-300 fill-primary" 
                    viewBox="0 0 100 101">
                    <path 
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" 
                        fill="currentColor"/>

                    <path 
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" 
                        fill="currentFill"/>
                </svg>
            </div>
        </div>
    </div>
</template>