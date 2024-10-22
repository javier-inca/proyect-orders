<script setup>
import Button from './Button.vue';
const props = defineProps({
    message:{
        type:String,
        default:'message'
    }
})

const emit = defineEmits(['clickCancel', 'clickDelete'])

const buttonClick = (type)=> {
    emit('buttonClick', type)
}
</script>

<template>
    <div class="bg-black bg-opacity-75 h-full flex justify-center items-center">
        <div class=" w-1/2 h-1/6 bg-blue-100 shadow-lg rounded-lg">
            <div class="grid grid-rows-2 grid-cols-2 h-full">
                <p class="flex justify-center items-center col-span-2 text-xl">
                    {{ message }}
                </p>
                
                <div class="flex justify-center items-center">
                    <Button 
                        @click="buttonClick('cancel')"
                        name="Cancel"
                        xSize="md"/>
                </div>
                
                <div class="flex justify-center items-center">
                    <Button 
                        @click="buttonClick('delete')"
                        name="Delete"
                        type="danger"
                        xSize="md"/>
                </div>
            </div>
        </div>
    </div>
</template>