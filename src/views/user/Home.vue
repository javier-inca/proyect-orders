<script setup>
import Title from '../../components/Title.vue'
import Button from '../../components/Button.vue'
import { UserPlusIcon, XMarkIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
import { useUserStore } from '../../stores/useUserStore';
import { onMounted, ref } from 'vue';
import PeopleListCard from './components/PeopleListCard.vue';
import Input from '../../components/Input.vue';
import { useToastStore } from '../../stores/useToastStore';
import UserForm from './components/UserForm.vue';
import Modal from '../../components/Modal.vue';

const userStore = useUserStore()
const toastStore = useToastStore()

/* estado de carga y array de usuarios */
const loadingUser = ref(true)
const userData = ref([])

/* activar o deactivar fondo borrozo */
const isBackgroundBlurred = ref(false)

/* activar o desactivar el modal */
const isShowModal = ref(false)

/* estado formulario de producto */
const isShowUserForm = ref(false)
const isLoadingUserForm = ref(false)

/* Usuario para editar o eliminar */
const selectedUser = ref()

/* Datos del formulario */
const userFormData = ref({
    title: 'Register new user',
    buttonName: 'register',
    name: '',
    error: '',
})

/* Limpiar el formulario */
const cleanForm = () => {
    userFormData.value = {
        title: 'Register new user',
        buttonName: 'register',
        name: '',
        error: '',
    }
}

/* obtener todos los ususarios  */
const fetchUsers = async () => {
    loadingUser.value = true
    userData.value = await userStore.fetchUsers()
    loadingUser.value = false
}

/* Crear nuevo usuario */
const createUser = async () => {
    isLoadingUserForm.value = true

    const data = {
        name: userFormData.value.name
    }

    const response = await userStore.createUser(data)

    if(response.status === 422){
        const error = response.response.data.errors

        showToast('error', 'Error', 'Error registering person')

        userFormData.value.error = error.name ? error.name[0] : ''

        isLoadingUserForm.value =false
    }

    if(response.status === 201){
        showToast('success', 'Success', 'Person registered')

        formOptions('cancel')

        fetchUsers()
    }
}

/* Actualizar usuario */
const updateUser = async () => {
    isLoadingUserForm.value = true

    const data = {
        name: userFormData.value.name,
    }

    const response = await userStore.updateUser(selectedUser.value.id, data)

    if(response.status === 422){
        const error = response.response.data.errors

        showToast('error', 'Error', 'Error updating the person')

        userFormData.value.error = error.name ? error.name[0] : ''

        isLoadingUserForm.value = false
    }

    if(response.status === 200){
        showToast('success', 'Success', 'Person updated')

        formOptions('cancel')

        fetchUsers()
    }
}

/* Eliminar usuario */
const deleteUser = async (userId) => {
    const response = await userStore.deleteUser(userId)

    if(response.status === 204){
        showToast('success', 'Success', 'Person deleted successfully')

        isShowModal.value = false

        selectedUser.value = ''

        fetchUsers()
    }
}

/* Obtener al opcion del formulario */
const formOptions = (action) => {
    if(action === 'cancel'){
        cleanForm()

        isLoadingUserForm.value = false
        isShowUserForm.value = false
        isBackgroundBlurred.value = false
    }

    if(action === 'register'){
        createUser()
    }

    if(action === 'update'){
        updateUser()
    }    
}

/* Obtener la accion de la tabla */
const tableOptions = async (action) => {
    await fetchUsers()

    selectedUser.value = userData.value.find(user => user.id === action.userId)

    if(action.type === 'delete' && selectedUser.value){
        isShowModal.value = true
        return
    }
    
    if(action.type === 'update' && selectedUser.value){
        userFormData.value = {
            title: 'Update person',
            buttonName: 'update',
            name: selectedUser.value.name,
            error: '',
        }

        showUserForm()
        return
    }
    
    showToast('warn', 'Warning', 'This person does not exist in the list')
}

/* Obtener la accion del modal */
const modalOptions = (action) => {
    if(action === 'cancel'){
        selectedUser.value = ''

        isShowModal.value = false
    }

    if(action === 'delete'){
        deleteUser(selectedUser.value.id)
    }
}

/* Mostrar el toast */
const showToast = (type, title, description) => {
    toastStore.showToast(type, title, description)
}

const showUserForm = () => {
    isBackgroundBlurred.value = true
    isShowUserForm.value = true
}

/* Obtener todos los usuario al inicio */
onMounted(
    fetchUsers
)
</script>

<template>
    <div class="flex justify-center mx-5">
        <div class="relative max-w-3xl w-full">
            <div class="absolute z-0 w-full">
                <!-- Seccion de titulo y boton de agregar nuevo usuario -->
                <div class="flex justify-between items-center mb-2">
                    <Title
                        title="list of people"/>

                    <Button
                        @click="showUserForm"
                        buttonName="Add Person"
                        :rightIcon="UserPlusIcon"
                        class="!max-w-[150px]"/>        
                </div>

                <!-- Componente tabla de usuarios -->
                <PeopleListCard
                    @buttonOption="(option => tableOptions(option))"
                    :userList="userData"
                    :dataStatus="loadingUser"/>    
            </div>

            <!-- Formulario de usuario registro y actualizacion -->
            <div class="absolute z-20 w-full">
                <UserForm
                    v-if="isShowUserForm"
                    @clickButton="(action => formOptions(action))"
                    v-model:userName="userFormData.name"
                    :error="userFormData.error"
                    :statusForm="isLoadingUserForm"
                    :title="userFormData.title"
                    :buttonName="userFormData.buttonName"/>
            </div>

            <!-- Fondo borroso -->
            <div 
                v-if="isBackgroundBlurred"
                class="fixed z-10 w-full h-full top-0 right-0 backdrop-blur">
            </div>

            <!-- Modal de confirmacion -->
            <Modal
                v-if="isShowModal"
                title="Delete person"
                @clickButton="(action => modalOptions(action))">
                Are you sure you want to delete the person named "{{ selectedUser.name }}"?
            </Modal>
        </div>
    </div>
</template>