<script setup>
import { ref, watch } from 'vue';
import Select from '../../components/Select.vue';
import ProductSelect from './ProductSelect.vue';
import { EyeIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { PencilIcon } from '@heroicons/vue/24/outline';
import Button from '../../components/Button.vue';

const idUserSelect = ref('0')
const findOrder =ref()
const products = ref([])

const viewProductSection = ref(false)
const viewTable = ref(false)
const viewOrderDetails = ref(false)


if (!localStorage.getItem('orderArray')) {
    localStorage.setItem('orderArray', JSON.stringify([]))
}

const getUsers = ref(JSON.parse(localStorage.getItem('userArray')))

const productRegister = (product) => {
    const newId = products.value.length > 0 ? products.value[products.value.length - 1].id + 1 : 1;
    const productWithId = { ...product, id: newId };
    products.value.push(productWithId);
    viewTable.value = products.value.length > 0; 
};

const viewOrder = (id) => {
    viewOrderDetails.value = true
    findOrder.value = products.value.find(product => product.id === id)
}

watch(idUserSelect, () => {
    idUserSelect.value > 0 ? viewProductSection.value = true : viewProductSection.value = false
})

const emit = defineEmits('orderRegister')

const registerOrder =()=>{
    const order = {
        idUser : getUsers.value.find(user => user.id === idUserSelect.value).id,
        userName: getUsers.value.find(user => user.id === idUserSelect.value).name,
        products: [products.value]
    }
    emit('orderRegister', order)  
    idUserSelect.value = 0 
    products.value=[]
    viewTable.value=false
}
</script>

<template>
    <div class="relative">
        <div class="my-5 border-2 border-blue-800 rounded p-2 z-0">
            <div class="flex justify-between">
                <Select 
                    v-model="idUserSelect" 
                    size="md" 
                    :disabled="viewProductSection">
                    <option 
                        value="0" 
                        disabled>
                        Select User
                    </option>

                    <option 
                        v-for="user in getUsers" 
                        :value="user.id" 
                        :key="user.id">
                        {{ user.name }}
                    </option>
                </Select>

                <button 
                    v-if="viewProductSection">
                    <TrashIcon 
                        class="size-7 text-blue-800 hover:text-red-800" />
                </button>
            </div>

            <div 
                class=" overflow-x-auto my-2 border-2 border-blue-600 rounded"
                v-if="viewTable">
                <table class="w-full text-sm text-left rtl:text-right">
                    <thead class="text-xs uppercase bg-gray-200">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product
                            </th>

                            <th scope="col" class="px-6 py-3">
                                Amount
                            </th>

                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>

                            <th scope="col" class="px-6 py-3 text-center">
                                Options
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b"
                            v-for="product in products"
                            :key="product.id">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                                {{ product.product }}
                            </th>

                            <td class="px-6 py-4">
                                {{ product.amount }}
                            </td>

                            <td class="px-6 py-4">
                                {{ product.price }} Bs.
                            </td>

                            <td class="px-6 py-4 flex justify-center gap-3">
                                <button>
                                    <EyeIcon
                                        @click="viewOrder(product.id)"
                                        class="size-6 text-blue-700"/>
                                </button>

                                <button>
                                    <PencilIcon
                                        class="size-6 text-blue-700"/>
                                </button>

                                <button>
                                    <TrashIcon
                                        class="size-6 text-blue-700"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div 
                v-if="viewProductSection"
                class="border-2 border-blue-800 my-2 p-2 rounded bg-white">
                <ProductSelect 
                    @productRegister="(product => productRegister(product))" />
            </div>

            <div 
                v-if="viewTable"
                class="flex flex-row gap-3">
                <Button
                    type="danger"
                    xSize="md"
                    name="Cancel Order"/>

                <Button
                    @click="registerOrder"
                    xSize="md"
                    name="Order"/>
            </div>
        </div>

        <div 
            class=" absolute z-20 inset-0 flex justify-center items-center m-2"
            v-if="viewOrderDetails">
            <div class="bg-white rounded w-full h-full border-2 border-blue-800 overflow-y-auto">
                <div class="m-2 mx-10 grid grid-cols-2 gap-y-2">
                    <p class=" text-start border-b-2 border-b-gray-200">
                        Product
                    </p>

                    <p class=" text-end border-b-2 border-b-gray-200">
                        {{ findOrder.product }}
                    </p>

                    <p class=" text-start border-b-2 border-b-gray-200">
                        Amount
                    </p>

                    <p class=" text-end border-b-2 border-b-gray-200">
                        {{ findOrder.amount }}
                    </p>

                    <p class=" text-start border-b-2 border-b-gray-200">
                        Description
                    </p>

                    <p class=" text-end border-b-2 border-b-gray-200">
                        {{ findOrder.description }}
                    </p>

                    <p class=" text-start border-b-2 border-b-gray-200">
                        Cash
                    </p>

                    <p class=" text-end border-b-2 border-b-gray-200">
                        {{ findOrder.cash }} Bs.
                    </p>

                    <p class=" text-start border-b-2 border-b-gray-200">
                        Price
                    </p>

                    <p class=" text-end border-b-2 border-b-gray-200">
                        {{ findOrder.price }} Bs.
                    </p>

                    <p class=" text-start border-b-2 border-b-gray-200">
                        Change
                    </p>

                    <p class=" text-end border-b-2 border-b-gray-200">
                        {{ findOrder.change }} Bs.
                    </p>
                </div>
                <div class="flex justify-center pt-2 pb-5">
                    <Button 
                        @click="viewOrderDetails = false"
                        xSize="md"
                        name="Return"
                        type="danger"/>
                </div>
            </div>
        </div>
    </div>
</template>