<script setup>
import Title from '../components/Title.vue'
import Input from '../components/Input.vue'
import Button from '../components/Button.vue'
import { PencilSquareIcon } from '@heroicons/vue/16/solid'
import { TrashIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import Modal from '../components/Modal.vue'
import Notification from '../components/Toast.vue'
import Navbar from './Navbar.vue'

const name=ref('')
const nameDelete=ref('')
const clickUpdate=ref(false)
const viewNotification = ref(false)
const viewRegister = ref(false)
const viewMessage= ref(false)
const message = ref('')
const typeMessage =ref('danger')
let globalId=null
 

if (!localStorage.getItem('userArray')) {
    localStorage.setItem('userArray', JSON.stringify([]))
}

const getUsers = ref(JSON.parse(localStorage.getItem('userArray')))

const create = () => {
    const userId = globalId !== null ? globalId : (getUsers.value.length ? getUsers.value[getUsers.value.length - 1].id + 1 : 1)
    
    if (globalId !== null) {
        const userIndex = getUsers.value.findIndex(user => user.id === globalId)
        getUsers.value[userIndex].name = name.value
        clickUpdate.value = false
        message.value='Updated user'
    } else {
        getUsers.value.push({ id: userId, name: name.value })
        message.value='Registered user'
    }

    localStorage.setItem('userArray', JSON.stringify(getUsers.value))
    name.value = ''
    globalId = null
    viewRegister.value=false
    typeMessage.value='success'
    viewMessage.value=true

    setTimeout(()=>{
        viewMessage.value = false
    }, 1500)
}

const findUser =(id)=>{
    globalId = id
    const user = getUsers.value.find(user => user.id === id)
    name.value=user.name
    clickUpdate.value=true
    viewRegister.value=true
}

const cancelUpdateUser = () =>{
    globalId = null
    clickUpdate.value=false
    viewRegister.value=false
    name.value=''
}

const notification = (type) => {
    type === 'delete' ? deleteUser() : cancelDelete()
}

const cancelDelete = () =>{
    globalId = null
    nameDelete.value=''
    viewNotification.value=false
}

const clickDelete = (name , id)=>{
    globalId = id
    nameDelete.value='Delete user '+name
    viewNotification.value=true
}

const deleteUser = () =>{
    const index = getUsers.value.findIndex(user => user.id === globalId)
    getUsers.value.splice(index,1)
    localStorage.setItem('userArray', JSON.stringify(getUsers.value))
    cancelDelete()
    message.value='Deleted user'
    typeMessage.value='danger'
    viewMessage.value=true

    setTimeout(()=>{
        viewMessage.value = false
    }, 1500)
}

const clickRegister = ()=>{
    viewRegister.value=true
}
</script>

<template>
    <div class=" relative">
        <div
            v-if="viewNotification" 
            class="fixed z-30 w-full h-full">
            <Modal
                :message="nameDelete"
                @buttonClick="(type => notification(type))"/>
        </div>

        <div
            v-if="viewRegister"
            class="fixed z-20 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
            <div 
                class=" grid grid-cols-1 bg-blue-50 p-5 my-5 w-2/3 gap-4 rounded-lg shadow-md">
                <Title 
                    :title="clickUpdate ? 'Update User' : 'Register User'" 
                    size="md" />

                <Input 
                    v-model="name"
                    class="mt-5 flex justify-center" 
                    placeholder="Name" 
                    xSize="lg" />            

                <div class="flex justify-center gap-6">
                    <Button 
                        @click="cancelUpdateUser"
                        type="danger"
                        class="mt-5" 
                        name="Cancel"
                        xSize="md" />

                    <Button 
                        :name="clickUpdate ? 'Update' : 'Register'"                            
                        @click="create"
                        class="mt-5" 
                        xSize="md" />
                </div>
            </div>
        </div>

        <div 
            :class="{
                'fixed':viewNotification
            }"
            class="z-0 w-full">
            <Navbar/>

            <Notification
                v-if="viewMessage"
                :message="message"
                :type="typeMessage"/>

            <div class=" mt-5">
                <div class="w-full bg-blue-50 p-5">
                    <div class="flex justify-between">
                        <Title 
                            title="User List"
                            size="md"/>

                        <Button
                            xSize="sm"
                            @click="clickRegister"
                            name="New"
                            type="accept"/>
                    </div>
                
                    <div 
                        class="flex justify-center flex-grow border-b-2 border-blue-900 gap-6"
                        v-for="user in getUsers" 
                        :key="user.id">
                        <div 
                            class="m-2 p-2 rounded w-2/3 lg:w-96">
                            {{ user.name }}
                        </div>

                        <button
                            :disabled="clickUpdate"
                            @click="findUser(user.id)">
                            <PencilSquareIcon
                                :class="{
                                    'text-black hover:text-black' :clickUpdate,
                                    'text-blue-900 hover:text-green-600': !clickUpdate,
                                }"
                                class="w-6" />
                        </button>
                            
                        <button
                            :disabled="clickUpdate"
                            @click="clickDelete(user.name , user.id)">
                            <TrashIcon
                                :class="{
                                    'text-black hover:text-black':clickUpdate,
                                    'text-blue-900 hover:text-red-600':!clickUpdate,
                                }"
                                class="w-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>