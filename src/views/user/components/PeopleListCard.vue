<script setup>
import { UserIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
    peopleList: {
        type: Array,
        default: []
    }
})

const emit = defineEmits()

const buttonOption = (type , userId) => {    
    emit('buttonOption' , {
        type: type,
        id: userId,
    })
}
</script>

<template>
    <div class="flex w-full p-3 bg-light-primary rounded-t">
        <div 
            class="w-[10%]">
        </div>

        <h2
            class=" w-[70%] font-semibold">
            Name
        </h2>

        <h2
            class=" w-[20%] text-center font-semibold">
            Options
        </h2>
    </div>

    <div class="overflow-y-auto overflow-x-hidden">
        <div 
            v-for="people in peopleList"
            :key="people.id"
            class="border-b p-3 border-primary flex w-full mb-2 hover:scale-105 transition-all">
            <UserIcon
                class="size-6 text-primary w-[10%]"/>

            <div class=" w-[70%]">
                <p>
                    {{ people.name }}
                </p>
            </div>

            <div class="flex space-x-4 w-[20%] justify-center">
                <PencilIcon 
                    class="text-primary size-6 cursor-pointer" 
                    @click="buttonOption('update', people.id)"/>
                
                <TrashIcon 
                    class="text-danger size-6 cursor-pointer" 
                    @click="buttonOption('delete', people.id)"/>
            </div>
        </div>
    </div>
</template>