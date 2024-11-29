<script setup>
import { UserIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'
import Spinner from '../../../components/Spinner.vue';

/* props necesarios */
const props = defineProps({
    userList: {
        type: Array,
        default: []
    },

    dataStatus: {
        type: Boolean,
        default: true
    },
})

const emit = defineEmits(['buttonOption'])

/* Enviar al padre las opciones seleccionadas */
const buttonOption = (type , id) => {    
    emit('buttonOption' , {
        type: type,
        userId: id,
    })
}
</script>

<template>
    <div class="overflow-x-auto">
        <div class="border-2 rounded-md border-primary w-full min-w-[400px]">
            <!-- Titulos de la tabla -->
            <div class="flex w-full py-3 bg-light-primary rounded-t border-b-2 border-primary gap-2">
                <p
                    class="w-[10%]">
                </p>

                <h2
                    class=" w-[70%] font-semibold uppercase ">
                    Name
                </h2>
        
                <h2
                    class=" w-[20%] font-semibold uppercase">
                    Options
                </h2>
            </div>

            <!-- Lista de usuarios ya cargados  -->
            <div 
                v-if="!dataStatus && userList.length > 0"
                class="overflow-y-auto overflow-x-hidden max-h-[65vh]">
                <div 
                    v-for="user in userList"
                    :key="user.id"
                    class="border-b py-3 border-primary flex w-full mb-2 sm:hover:scale-105 sm:transition-all gap-2">
                    <div class="w-[10%] flex justify-center">
                        <UserIcon
                            class="size-6"/>
                    </div>

                    <p class="w-[70%]">
                        {{ user.name }}
                    </p>

                    <div class="flex space-x-3 w-[20%]">
                        <PencilIcon
                            @click="buttonOption('update', user.id)"
                            class="text-primary size-6"/>

                        <TrashIcon
                            @click="buttonOption('delete', user.id)"
                            class="text-danger size-6"/>
                    </div>
                </div>
            </div>

            <!-- Seccion de carga -->
            <div 
                v-if="dataStatus"
                class="relative w-full h-[65vh] overflow-y-hidden">
                <!-- Animacion de carga pulse -->
                <div class="absolute z-0 animate-pulse w-full">
                    <div 
                        v-for="index in 20"
                        :key="index"
                        class="border-b-2 py-3 border-gray-200 flex w-full mb-2 px-2">
                        <div class="w-[10%] flex justify-center">
                            <p
                                class="p-3 bg-gray-200">
                            </p>
                        </div>

                        <div class="w-[70%]">
                            <p
                                class="w-32 bg-gray-200 py-3">
                            </p>
                        </div>

                        <div class="flex space-x-3 w-[20%]">
                            <p
                                class="p-3 bg-gray-200 ml-3">
                            </p>

                            <p
                                class="p-3 bg-gray-200 ml-3">
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Spinner de carga -->
                <div class="w-full h-full">
                    <div class="absolute z-10 bg-gray-200 bg-opacity-30 w-full h-full flex justify-center items-center">
                        <Spinner
                            size="lg"/>
                    </div>
                </div>
            </div>

            <!-- Estado sin usuarios -->
            <div 
                v-if="!dataStatus && userList.length <= 0"
                class="w-full h-[65vh] flex justify-center items-center flex-col">
                <img 
                    src="../../../assets/empty_products.png"
                    class="h-56">

                <p
                    class=" font-semibold">
                    They have no users registered.
                </p>
            </div>
        </div>
    </div>
</template>