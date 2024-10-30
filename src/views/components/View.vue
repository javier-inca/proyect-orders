<script setup>
const props = defineProps({
    content:{
        type:Object,
        default:{}
    }
})
</script>

<template>
    <div>
        <h3>Contenido del Objeto:</h3>
        <ul>
            <li v-for="(value, key) in content" :key="key">
                <strong>{{ key }}:</strong> {{ value }}
            </li>
        </ul>
    </div>
</template>