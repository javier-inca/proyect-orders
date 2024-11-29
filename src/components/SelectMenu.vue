<script setup>

/* props necesarios */
const props= defineProps({
    options:{
        type: Array,
        default: ['a-z', 'z-a']
    }
})

const emit = defineEmits(['clickOption'])

/* enviar opcion seleccionada */
const clickOption = (name) => {    
    emit('clickOption', name)
}
</script>

<template>
    <div class="w-full bg-white border-2 border-primary rounded-b-md overflow-y-auto overflow-x-auto shadow-2xl">
        <div class="max-h-28 px-2">
            <!-- desplegar opciones -->
            <div 
                @click="clickOption(option)"
                v-for="option in options"
                :key="option"
                class="capitalize text-nowrap my-2 cursor-pointer">
                {{ option }}
            </div>
        </div>
    </div>
</template>