<script setup>
import { computed } from 'vue';
import IconButton from '../../../components/IconButton.vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import Title from '../../../components/Title.vue';
import { UserIcon } from '@heroicons/vue/24/solid';
import Input from '../../../components/Input.vue';
import Button from '../../../components/Button.vue';
import Spinner from '../../../components/Spinner.vue';

/* Props necesario */
const props = defineProps({
    userName: {
        type: String,
        default: '',
    },

    title: {
        type: String,
        default: 'Register new person'
    },

    buttonName: {
        type: String,
        default: 'register'
    },

    statusForm: {
        type: Boolean,
        default: false,
    },

    error: {
        type: String,
        default: '',
    },
})

const emit = defineEmits(['update:userName', 'clickButton'])

/* Cambiar el valor de userName y enviar al padre */
const inputName = computed({
    get: () => props.userName,

    set: (newValue) => {
        emit('update:userName', newValue)
    }
})

/* enviar estado de boton y accion */
const clickButton = (action) => {
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

                <UserIcon
                    class="size-32 text-primary"/>

                <Input
                    v-model="inputName"
                    :isPadding="false"
                    :isRounded="false"
                    :errorMessage="error"
                    desing="lineBelow"
                    label="Person name"
                    class=" w-3/4 mb-3"/>

                <!-- Botones de accion -->
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

            <!-- Estado de carga -->
            <div 
                v-if="statusForm"
                class=" absolute top-0 bg-gray-200 bg-opacity-70 w-full h-full flex justify-center items-center rounded">
                <Spinner
                    size="md"/>
            </div>
        </div>
    </div>    
</template>