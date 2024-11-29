<script setup>
import moment from 'moment'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenuSwap } from '@mdi/js'
import SelectMenu from '../../../components/SelectMenu.vue';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

/* Props necesarios */
const props = defineProps({
    orderList: {
        type: Array,
        default: []
    },

    dataStatus: {
        type: Boolean,
        default: true
    },
})

const test = () => {
    console.log('hola');
    
}
</script>

<template>
    <div class="overflow-x-auto">
        <div class="border-2 rounded-md border-primary w-full min-w-[700px]">
            <!-- Titulos de la tabla  -->
            <div class="flex w-full py-3 bg-light-primary rounded-t border-b-2 border-primary gap-2">
                <h2
                    class="w-[30%] font-semibold uppercase pl-2 flex items-center">
                    reason
                    <!-- icono de filtro de razon -->
                    <svg-icon
                        type="mdi"
                        :path="mdiMenuSwap"
                        class=" size-6 cursor-pointer"/>
                </h2>

                <div class="relative w-[15%] pl-2">
                    <div class=" flex items-center">
                        <p class="font-semibold uppercase">
                            buyer
                        </p>
                        
                        <!-- icono de filtro de buyer -->
                        <svg-icon
                            type="mdi"
                            :path="mdiMenuSwap"
                            class="size-6 cursor-pointer"/>
                    </div>

                    <!-- menu desplegable de flitro buyer -->
                    <div 
                        v-if="false"
                        class="absolute z-10 w-full">
                        <SelectMenu
                            />
                    </div>
                </div>

                <h2
                    class="w-[20%] font-semibold uppercase pl-2">
                    date
                </h2>

                <h2
                    class="w-[20%] font-semibold uppercase pl-2 flex items-center">
                    status
                    <!-- icono de filtro de razon -->
                    <svg-icon
                        type="mdi"
                        :path="mdiMenuSwap"
                        class="size-6 cursor-pointer"/>
                </h2>

                <h2
                    class="w-[15%] font-semibold uppercase pl-2">
                    options
                </h2>
            </div>

            <!-- fondo para ocultar los filtros -->
            <div 
                v-if="false"
                class=" fixed w-full h-full top-0 right-0">
            </div>

            <!--lista de productos cargados -->
            <div
                v-if="!dataStatus && orderList.length > 0" 
                class=" overflow-y-auto overflow-x-hidden max-h-[65vh]">
                <div 
                    v-for="order in orderList"
                    :key="order.id"
                    class="border-b py-3 border-primary flex w-full mb-2 gap-2">
                    <p
                        class="w-[30%] pl-2">
                        {{ order.reason }}
                    </p>

                    <p
                        class="w-[15%] pl-2">
                        {{ order.d_user_name }}
                    </p>

                    <p
                        class="w-[20%] pl-2">
                        {{ moment(order.order_date).format('DD-MMM-YY') }}
                    </p>

                    <p
                        class="w-[20%] pl-2 capitalize">
                        {{ order.state }}
                    </p>

                    <div class="w-[15%] pl-2 flex gap-2">
                        <EyeIcon
                            class="size-6 text-primary cursor-pointer"/>

                        <button
                            class="flex items-start"
                            :disabled="( order.state === 'completed' || order.state === 'canceled' )"
                            @click="test">
                            <PencilIcon
                                :class="{' !text-gray-300 cursor-not-allowed' : order.state === 'completed' || order.state === 'canceled' }"
                                class="size-6 text-primary"/>
                        </button>

                        <TrashIcon
                            class="size-6 text-danger cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>