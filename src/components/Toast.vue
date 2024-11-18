<script setup>
import { computed, ref, watch } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheckBold, mdiExclamationThick, mdiInformationVariant, mdiClose } from '@mdi/js'

const props = defineProps({
    type:{
        type:String,
        default:'success'
    },

    message:{
        type:String,
        default:'message'
    },

    isVisible: {
        type: Boolean,
        default: false
    }
})

const visible = ref()

watch(() => props.isVisible, () => {
    visible.value = props.isVisible
})

// Types of toast
const types = {
    'success' : ' bg-light-success border border-success shadow-lg shadow-light-success',
    'information' : 'bg-light-information border border-information shadow-lg shadow-light-information',
    'warning' : 'bg-light-warning border border-warning shadow-lg shadow-light-warning',
    'danger' : 'bg-light-danger border border-danger shadow-lg shadow-light-danger',
}

const type = computed(()=>{
    return types[props.type] ? types[props.type] : 'bg-success bg-opacity-20 border border-success shadow-md shadow-success'
})

const icon = computed(() => {
    let icon = mdiCheckBold
        
    if(props.type === 'info') {
        icon = mdiInformationVariant
    } 

    if(props.type === 'warning') {
        icon = mdiExclamationThick
    } 

    if(props.type === 'danger') {
        icon = mdiExclamationThick
    } 

    return icon
})

const closeToast = () => {
    // visible.value = false
}
</script>

<template>
        <div 
            v-if="visible"
            class="flex items-center p-2 rounded-lg relative"
            :class="[
                type
            ]">
            <div 
                class="bg-success p-2 rounded-2xl">                
                <svg-icon 
                    type="mdi"
                    :path="icon"
                    :class="{
                        'text-success' : props.type === 'success',
                        'text-warning' : props.type === 'warning',
                        'text-danger' : props.type === 'danger',
                        'text-information' : props.type === 'info',
                    }"
                    class="bg-white rounded-full size-6 p-1" />
            </div>
    
            <p
                class="pl-2">
                {{ message }}
            </p>

            <!-- Close button -->
            <svg-icon 
                type="mdi"
                :path="mdiClose"
                class="absolute top-4 right-2 p-1 size-6" />
    </div>
</template>