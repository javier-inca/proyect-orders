<script setup>
import Navbar from './Navbar.vue'
import Title from '../components/Title.vue'
import Button from '../components/Button.vue'
import Input from '../components/Input.vue';
import Select from '../components/Select.vue';
import { ref, watch } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';
import ProductSelect from '../components/ProductSelect.vue';

const idUserSelect = ref('0')
const idProductSelect = ref('0')

const viewCreate = ref(true)
const viewProductSection = ref(false)
const viewProductDetails = ref(false)


if (!localStorage.getItem('orderArray')) {
    localStorage.setItem('orderArray', JSON.stringify([]))
}

const getUsers = ref(JSON.parse(localStorage.getItem('userArray')))

const getProducts = ref(JSON.parse(localStorage.getItem('productArray')))

watch(idUserSelect , () =>{
    idUserSelect.value > 0 ? viewProductSection.value=true : viewProductSection.value=false
})

watch(idProductSelect, () => {
    idProductSelect.value > 0 ? viewProductDetails.value=true : viewProductDetails.value=false
})
</script>

<template>
    
    <div class="relative">
        <div
            v-if="viewCreate"
            class="fixed h-full z-20 w-full bg-black bg-opacity-75 flex justify-center items-center">
            <div class=" bg-blue-100 m-5 w-5/6 p-5 rounded-md">
                <Title 
                    class="mb-5"
                    title="New Order"
                    size="md"/>

                <div class="grid grid-cols-2 gap-3">
                    <Input
                        placeholder="Name"/>

                    <Input
                        type="date"/>

                    <Input
                        class="col-span-2"
                        placeholder="Description"/>
                </div>

                <div class="my-5 border-2 border-blue-800 rounded p-2">
                    <div class="flex justify-between">
                        <Select
                            v-model="idUserSelect"
                            size="md"
                            :disabled="false">
                            <option
                                value="0"
                                disabled>
                                Select User
                            </option>

                            <option 
                                :value="user.id"
                                v-for="user in getUsers" 
                                :key="user.id">
                                {{ user.name }}
                            </option>
                        </Select>

                        <button
                            v-if="viewProductSection">
                            <TrashIcon
                                class="size-7 text-blue-800 hover:text-red-800"/>
                        </button>
                    </div>

                    <div
                        v-if="viewProductSection" 
                        class="border-2 border-blue-800 my-2 p-2 rounded bg-white">
                        <ProductSelect 
                            :products="getProducts"/>
                    </div>
                </div>
            </div>
        </div>

        <div class=" fixed z-0 w-full">       
            <Navbar/>

            <div class=" mt-5">
                <div class="w-full bg-blue-50 p-5">
                    <div class="flex justify-between">
                        <Title 
                            title="Order List"
                            size="md"/>

                        <Button
                            xSize="sm"
                            name="New"
                            type="accept"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>