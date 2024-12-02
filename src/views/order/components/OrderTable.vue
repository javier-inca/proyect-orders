<script setup>
import moment from 'moment'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiMenuSwap } from '@mdi/js'
import SelectMenu from '../../../components/SelectMenu.vue';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';
import Spinner from '../../../components/Spinner.vue';
import { ref } from 'vue';
import { useOrderFilters } from '../composables/OrderFilters';

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

/* llamada de composable de filtros  */
const orderFilters = useOrderFilters()

/* ver menu de filtros */
const isShowFilterReason = ref(false)
const isShowFilterBuyer = ref(false)
const isShowFilterStatus = ref(false)

/* lista de datos filtrados */
const filteredData = ref([])
const isFiltered = ref(false)

/* nombre de todos los compradores y estados */
const buyersData = ref()
const statusData = ref()

/* conseguir los nombres de buyers para el filtro */
const showFilterBuyer =  () => {
    const uniqueName = [...new Set(props.orderList.map(order => order.d_user_name))]
    uniqueName.push('All')
    buyersData.value = uniqueName.sort()

    isShowFilterBuyer.value = true
}

/*  los nombres de status */
const showFilterStatus = () => {
    const uniqueStatus = [
        'all','draft','in_process','completed','canceled'
    ]
    statusData.value = uniqueStatus

    isShowFilterStatus.value = true
}

/* Filtros de reason */
const filterReason = async (option) => {
    filteredData.value = await orderFilters.filterReason(props.orderList , option)

    isFiltered.value = true
    closeFilters()
}

/* filtros de buyer */
const filterBuyer = async (option) => {
    filteredData.value = await orderFilters.filterBuyer(props.orderList, option)
    
    isFiltered.value = true
    closeFilters()
}

/* filtros de status */
const filterStatus = async (option) => {
    filteredData.value = await orderFilters.filterStatus(props.orderList, option)

    isFiltered.value = true
    closeFilters()
}

/* Cerrar el menu de filtros */
const closeFilters = () => {
    isShowFilterReason.value = false
    isShowFilterBuyer.value = false
    isShowFilterStatus.value = false
}
</script>

<template>
    <div class="overflow-x-auto">
        <div class="border-2 rounded-md border-primary w-full min-w-[700px]">
            <!-- Titulos de la tabla  -->
            <div class="flex w-full py-3 bg-light-primary rounded-t border-b-2 border-primary gap-2">
                <!-- Titulo reason -->
                <div class="relative w-[30%] pl-2">
                    <div class=" flex items-center">
                        <p class="font-semibold uppercase">
                            reason
                        </p>
                        
                        <!-- icono de filtro de reason -->
                        <svg-icon
                            @click="isShowFilterReason = true"
                            type="mdi"
                            :path="mdiMenuSwap"
                            class="size-6 cursor-pointer"/>
                    </div>

                    <!-- menu desplegable de filtro reason -->
                    <div 
                        v-if="isShowFilterReason"
                        class="absolute z-10 w-full">
                        <SelectMenu
                            @clickOption="(option => filterReason(option))"/>
                    </div>
                </div>

                <!-- Titulo buyer -->
                <div class="relative w-[15%] pl-2">
                    <div class=" flex items-center">
                        <p class="font-semibold uppercase">
                            buyer
                        </p>
                        
                        <!-- icono de filtro de buyer -->
                        <svg-icon
                            @click="showFilterBuyer"
                            type="mdi"
                            :path="mdiMenuSwap"
                            class="size-6 cursor-pointer"/>
                    </div>

                    <!-- menu desplegable de filtro buyer -->
                    <div 
                        v-if="isShowFilterBuyer"
                        class="absolute z-10 w-full">
                        <SelectMenu
                            :options="buyersData"
                            @clickOption="(option => filterBuyer(option))"/>
                    </div>
                </div>

                <!-- titulo date -->
                <p
                    class="w-[20%] font-semibold uppercase pl-2">
                    date
                </p>

                <!-- Titulo status -->
                <div class="relative w-[20%] pl-2">
                    <div class=" flex items-center">
                        <p class="font-semibold uppercase">
                            status
                        </p>
                        
                        <!-- icono de filtro de status -->
                        <svg-icon
                            @click="showFilterStatus"
                            type="mdi"
                            :path="mdiMenuSwap"
                            class="size-6 cursor-pointer"/>
                    </div>

                    <!-- menu desplegable de filtro status -->
                    <div 
                        v-if="isShowFilterStatus"
                        class="absolute z-10 w-full">
                        <SelectMenu
                            :options="statusData"
                            @clickOption="(option => filterStatus(option))"/>
                    </div>
                </div>

                <p
                    class="w-[15%] font-semibold uppercase pl-2">
                    options
                </p>
            </div>

            <!-- fondo para ocultar los filtros -->
            <div 
                v-if="isShowFilterReason || isShowFilterBuyer || isShowFilterStatus"
                @click="closeFilters"
                class=" fixed w-full h-full top-0 right-0">
            </div>

            <!--lista de productos cargados -->
            <div
                v-if="!dataStatus && orderList.length > 0" 
                class=" overflow-y-auto overflow-x-hidden h-[65vh]">
                <div 
                    v-for="order in (isFiltered ? filteredData : orderList)"
                    :key="order.id"
                    class="border-b py-3 border-primary flex w-full mb-2 gap-2">
                    <p
                        class="w-[30%] pl-2 break-words">
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

                        <TrashIcon
                            class="size-6 text-danger cursor-pointer"/>
                    </div>
                </div>
            </div>

            <!-- estado de carga de pedidos -->
            <div 
                v-if="dataStatus"
                class="relative w-full h-[65vh] overflow-y-hidden">
                <!-- animacion pulse -->
                <div class="absolute z-0 animate-pulse w-full">
                    <div 
                        v-for="index in 15"
                        :key="index"
                        class="border-b-2 py-3 border-gray-200 flex w-full mb-2">
                        <div class="w-[30%] pl-2">
                            <p
                                class=" w-32 bg-gray-200 py-3">
                            </p>
                        </div>

                        <div class="w-[15%] pl-2">
                            <p
                                class=" w-14 bg-gray-200 py-3">
                            </p>
                        </div>

                        <div class="w-[20%] pl-2">
                            <p
                                class="w-20 bg-gray-200 py-3">
                            </p>
                        </div>

                        <div class="w-[20%] pl-2">
                            <p
                                class="w-20 bg-gray-200 py-3">
                            </p>
                        </div>

                        <div class="w-[15%] pl-2 flex gap-2">
                            <p
                                class="p-3 bg-gray-200">
                            </p>

                            <p
                                class="p-3 bg-gray-200">
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Spinner de carga -->
                <div class="w-full h-full">
                    <div class=" absolute z-20 bg-gray-200 bg-opacity-30 w-full h-full flex justify-center items-center">
                        <Spinner
                            size="lg"/>
                    </div>
                </div>
            </div>

            <div 
                v-if="orderList.length <= 0 && !dataStatus"
                class="w-full h-[65vh]">

            </div>
        </div>
    </div>
</template>