<script setup>

const props = defineProps({
    status: {
        type: Boolean,
        default : false
    },

    statusType: {
        type: String,
        default: 'Not Saved'
    }
})
</script>

<template>
    <div class="flex flex-col">
        <div 
            class="p-1 bg-primary rounded-t-md rounded-bl-md w-full"
            :class="{ 'rounded-br-md': statusType === 'Not Saved'}">
        </div>

        <div class="flex justify-between">
            <p
                class="text-sm px-1 text-black">
                {{ status ? 'Saved' : 'Not Saved' }}
            </p>

            <p
                v-if="statusType !== 'Not Saved'"
                class="text-sm bg-primary px-2 text-white rounded-b-md">
                {{ statusType }}
            </p>
        </div>
    </div>
</template>