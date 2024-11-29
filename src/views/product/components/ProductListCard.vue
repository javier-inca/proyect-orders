<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import Spinner from '../../../components/Spinner.vue';

/* props necesarios */
const props = defineProps({
    productList: {
        type: Array,
        default: []
    },

    dataStatus: {
        type: Boolean,
        default: true
    },
})

const emit= defineEmits(['buttonOption'])

/* Enviar al padre las opciones seleccionadas */
const buttonOption = (type, id) => {    
    emit('buttonOption' , {
        type: type,
        productId : id
    })
}
</script>

<template>
    <div class=" overflow-x-auto ">
        <div class="border-2 rounded-md border-primary w-full min-w-[400px]">
            <!-- titulos de la tabla -->
            <div class="flex w-full py-3 bg-light-primary rounded-t border-b-2 border-primary gap-2">
                <p
                    class="w-[5%]">
                </p>

                <h2
                    class="text-start w-[50%] font-semibold uppercase">
                    Name
                </h2>

                <p
                    class="text-end w-[25%] font-semibold uppercase pr-3">
                    Price
                </p>

                <p
                    class="w-[20%] font-semibold uppercase">
                    Options
                </p>
            </div>

            <!-- Lista de productos ya cargados -->
            <div
                v-if="!dataStatus && productList.length > 0 "
                class="overflow-y-auto overflow-x-hidden max-h-[65vh]">
                <div 
                    v-for="product in productList"
                    :key="product.id"
                    class="border-b py-3 border-primary flex w-full mb-2 sm:hover:scale-105 sm:transition-all gap-2">
                    <p
                        class="w-[5%]">
                    </p>

                    <p class="w-[50%]">
                        {{ product.name }}
                    </p>

                    <p class="w-[25%] text-end pr-3">
                        {{ product.reference_price }} Bs.
                    </p>

                    <div class="flex space-x-3 w-[20%]">
                        <PencilIcon
                            @click="buttonOption('update', product.id)"
                            class="text-primary size-6 cursor-pointer"/>

                        <TrashIcon
                            @click="buttonOption('delete', product.id)"
                            class="text-danger size-6 cursor-pointer"/>
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
                        v-for="index in 12"
                        :key="index"
                        class="border-b-2 py-3 border-gray-200 flex w-full mb-2 px-2">
                        <div 
                            class="w-[5%]">
                        </div>

                        <div class="w-[50%]">
                            <p
                                class="w-36 bg-gray-200 py-3">
                            </p>
                        </div>

                        <div class="w-[25%] flex justify-end pr-3">
                            <p
                                class="w-20 bg-gray-200 py-3">
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

            <!--estado Sin productos -->
            <div 
                v-if="!dataStatus && productList.length <= 0"
                class="w-full h-[65vh] flex justify-center items-center flex-col">
                <img 
                    src="../../../assets/empty_products.png"
                    class="h-56">

                <p
                    class=" font-semibold">
                    They have no products registered.
                </p>
            </div>
        </div>
    </div>
</template>