<script setup>
import { ChevronDownIcon, UserPlusIcon } from '@heroicons/vue/24/outline';
import Title from '../components/Title.vue';
import Navbar from './Navbar.vue';
import Select from '../components/Select.vue';
import { onMounted, ref } from 'vue';
import axios from '../connection/axiosConfig'
import TableNewOrder from './components/TableNewOrder.vue';

const props = defineProps({
    titleName:{
        type:String,
        default:'New Order'
    }
})

const dataUsers = ref([])

const isLoadingUserData = ref(false)

onMounted( async () =>{
    getUserData()
})

const getUserData = async () =>{
    isLoadingUserData.value = true

    try {
        const response = await axios.get('/api/users')
        if(response.status === 200) {
            dataUsers.value = response.data.data
        }
        isLoadingUserData.value = false
    } catch (error) {
        console.error(error);
        isLoadingUserData.value = false
    }
}

const isViewSelect = ref(false)

</script>

<template>
    <div class="relative">
        <div class=" fixed z-0 w-full">
            <Navbar/>
            
            <Title
                class="m-4 font-bold"
                :title="titleName"
                size="sm"/> 

            <div class="flex justify-center">
                <div class="flex justify-between w-full mx-6 md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12 items-center ">
                    <Title 
                        class="font-bold"
                        size="sm"
                        title="List of orders"/>

                    <!-- Wrapper -->
                    <div 
                        class="relative">

                        <!-- Dropdown -->
                        <button
                            @click="isViewSelect = true"
                            :class="{
                                'rounded-b-none':isViewSelect
                            }"
                            class="p-2 rounded-md bg-white border-2 border-black border-b-0 flex">
                            <p class=" text-sm px-2 font-bold">
                                Select person
                            </p>

                            <ChevronDownIcon
                                class="size-5 text-black-custom "/>
                        </button>

                        <!-- Dropdown -->
                        <Select
                            class="z-20"
                            :options="dataUsers"
                            v-if="isViewSelect" />
                    </div>

                    <!-- Backdrop -->
                    <div
                        @click="isViewSelect = false"
                        v-if="isViewSelect" 
                        class="fixed top-0 left-0 w-full h-full -z-0">
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="w-full mx-6 md:w-2/3 lg:w-1/2 2xl:w-2/6 3xl:w-3/12 my-3">
                    <TableNewOrder/>
                </div>
            </div>
        </div>
    </div>
</template>