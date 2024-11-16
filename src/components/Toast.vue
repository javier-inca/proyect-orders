<script setup>
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheckBold, mdiExclamationThick, mdiInformationVariant } from '@mdi/js';
import { computed, ref, watch } from 'vue';

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
</script>

<template>
        <div 
            v-if="isVisible"
            class="flex items-center p-2 rounded-lg"
            :class="[
                type
            ]">
            <div 
                v-if="props.type === 'success'"
                class="bg-success p-2 rounded-2xl">                
                <svg-icon 
                    type="mdi"
                    :path="mdiCheckBold"
                    class="text-success bg-white rounded-full size-6 p-1"/>
            </div>
            
            <div 
                v-if="props.type === 'information'"
                class="bg-information p-2 rounded-2xl">
                <svg-icon 
                    type="mdi"
                    :path="mdiInformationVariant"
                    class="text-information bg-white rounded-full size-6"/>
            </div>
    
            <div 
                v-if="props.type === 'warning'"
                class="bg-warning p-2 rounded-2xl">
                <svg-icon 
                    type="mdi"
                    :path="mdiExclamationThick"
                    class="text-warning bg-white rounded-full size-6"/>
            </div>
    
            <div 
                v-if="props.type === 'danger'"
                class="bg-danger p-2 rounded-2xl">
                <svg-icon 
                    type="mdi"
                    :path="mdiExclamationThick"
                    class="text-danger bg-white rounded-full size-6"/>
            </div>
    
            <p
                class="pl-2">
                {{ message }}
            </p>
        </div>
</template>