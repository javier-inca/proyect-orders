<script setup>

const props = defineProps({
    status: {
        type: String,
        default : 'draft'
    }
})
</script>

<template>
    <div class="flex flex-col">
        <div class="p-1 bg-primary rounded-t-md w-full"></div>
        <div class="flex justify-between">
            <p
                class="text-sm px-1 text-black">
                Status
            </p>

            <p
                class="text-sm bg-primary w-10 px-1 text-white rounded-b-md">
                {{ status }}
            </p>
        </div>
    </div>
</template>