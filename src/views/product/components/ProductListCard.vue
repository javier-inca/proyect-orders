<script setup>
import { PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';


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

const emit= defineEmits()

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
                class="relative w-full h-[65vh] overflow-y-auto">
                <div class="absolute z-0 animate-pulse w-full">
                    <div 
                        v-for="index in 20"
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
                <div class="w-full">
                    <div class="fixed z-10 bg-gray-200 bg-opacity-30 w-full h-[65vh] flex justify-center items-center">
                        <svg 
                            class="inline w-16 h-16 animate-spin dark:text-gray-300 fill-primary" 
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