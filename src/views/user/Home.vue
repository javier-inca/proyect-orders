<script setup>
import Title from '../../components/Title.vue'
import Button from '../../components/Button.vue'
import { UserPlusIcon, XMarkIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { useUserStore } from '../../stores/useUserStore';
import { onMounted, ref } from 'vue';
import PeopleListCard from './components/PeopleListCard.vue';
import Input from '../../components/Input.vue';
import { useToastStore } from '../../stores/useToastStore';

const userStore = useUserStore()
const toastStore = useToastStore()

const fetchUserData = ref([])

const userData = ref({
    name: '',
    errorName: '',
})

const formTitle = ref('')
const isViewPersonRegisterForm = ref(false)

const fetchUsers = async () => {
    fetchUserData.value = await userStore.fetchUsers()
}

const createUser = async (userId) => {
    const data = {
        name: userData.value.name
    }

    const response = await userStore.createUser(data)

    if(response.status === 422){
        userData.value.errorName = response.response.data.errors.name[0]

        showToast('error', 'Error', 'Person not registered.')
    }

    if(response.status === 201){
        clearUserData()

        isViewPersonRegisterForm.value = false
        
        fetchUsers()
        
        showToast('success', 'Success', 'New person registered')
    }
    
}

const updateUser = async (userId) => {
    await fetchUsers()

    const find = fetchUserData.value.find(user => user.id === userId)

    if(find){
        userData.value.name = find.name

        formTitle.value = 'Update person'

        isViewPersonRegisterForm.value = true
        return
    }

    if(!find){
        formTitle.value = 'Register new person'
        
        isViewPersonRegisterForm.value = true
    }
}

const deleteUser = async (userId) => {
    const response = await userStore.deleteUser(userId)

    if(response.status === 204){
        fetchUsers()

        showToast('success', 'Success', 'Person deleted successfully.')
    }
    
}

const listOption = (option) => {
    if(option.type === 'delete'){
        deleteUser(option.id)
    }

    if(option.type === 'update'){
        updateUser(option.id)
    }
}

const showForm = () => {
    formTitle.value = 'Register new person'

    isViewPersonRegisterForm.value = true
}

const cancelUserRegistration = () => {
    clearUserData()

    isViewPersonRegisterForm.value = false

    showToast('info', 'Information', 'Registration canceled.')
}

const clearUserData = () => {
    userData.value.name = ''
    userData.value.errorName = ''
}

const showToast = (severity, summary, detail) => {
    toastStore.showToast(severity, summary, detail)
}

onMounted(() => {
    fetchUsers()
})

</script>

<template>
    <div class="flex justify-center mx-2">
        <div class="relative max-w-3xl w-full">
            <div
                class="absolute z-0 w-full">
                <div class="flex justify-between items-center mb-2">
                    <Title
                        title="list of people"/>

                    <Button
                        @click="showForm"
                        buttonName="Add Person"
                        :rightIcon="UserPlusIcon"
                        class=" max-w-[150px]"/>        
                </div>

                <PeopleListCard
                    @buttonOption="(option => listOption(option))"
                    :peopleList="fetchUserData"/>    
            </div>

            <div
                v-if="isViewPersonRegisterForm" 
                class="absolute z-20 flex justify-center w-full">
                <div class=" max-w-[350px] border border-primary rounded-md w-full shadow-2xl">
                    <div class="bg-primary p-2 rounded-t">
                        <XMarkIcon
                            @click="cancelUserRegistration"
                            class="size-6 text-white cursor-pointer"/>
                    </div>

                    <div class="bg-white p-2 flex flex-col items-center gap-5 rounded-b">
                        <Title
                            :title="formTitle"/>

                        <UserCircleIcon
                            class=" size-28 text-primary"/>

                        <Input
                            class=" w-2/3"
                            v-model="userData.name"
                            :errorMessage="userData.errorName"
                            label="Name"
                            desing="lineBelow"
                            :isRounded="false"
                            :isPadding="false"
                            placeholder="Insert Name"/>

                        <div class=" flex gap-5 pb-5">
                            <Button
                                @click="cancelUserRegistration"
                                buttonColor="danger"
                                buttonType="ghost"
                                buttonName="Cancel"/>

                            <Button
                                @click="createUser"
                                buttonName="Register"/>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="isViewPersonRegisterForm"
                class="fixed top-0 left-0 w-full h-full z-10 backdrop-blur">
            </div>
        </div>
    </div>
</template>