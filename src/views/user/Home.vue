<script setup>
import { ref } from 'vue' 
import { onMounted } from 'vue';
import { useUserStore } from '../../stores/useUserStore'
import { useToastStore } from '../../stores/useToastStore'
import Title from '../../components/Title.vue'

const toastStore = useToastStore()

const userStore = useUserStore()
const { fetchUsers } = userStore 

const userList = ref([])
const isLoadingUserList = ref(false)

const showToast = (message, type) => {
    toastStore.showToast(message, type)
}

onMounted(async()=>{
    isLoadingUserList.value = true
    userList.value =  await fetchUsers()
    isLoadingUserList.value = false
})
</script>

<template>
    <div class="flex justify-center">
        <div class="relative w-full max-w-3xl">
            <div class="absolute z-0 w-full">
                <div class="flex justify-between m-3 mx-6 items-center">
                    <Title
                        title="User List"/>

                    <button
                        />
                </div>
            </div>

            <!-- <div class="absolute z-10 bg-danger p-2 w-full">
                dwd
            </div> -->
            
        </div>
    </div>
    <button
        @click="showToast('mensaje de prueba ' , 'success')">
        ad
    </button>
</template>


<!-- <Title
                title="dwdaw"/>
            <div class="flex justify-between ">
                <Title 
                    size="sm"
                    title="Orders List"/>

                <router-link
                    to="/orders/create"
                    class="p-2 rounded-full bg-primary flex hover:scale-105 transition-transform">
                    <p class=" text-sm px-2 text-white">
                        New Order
                    </p>

                    <PlusIcon
                        class="size-5 text-white"/>
                </router-link>
            </div> -->