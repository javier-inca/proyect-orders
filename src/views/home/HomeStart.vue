<script setup>
import { PlusIcon } from '@heroicons/vue/24/solid';
import Button from '../../components/Button.vue';
import Input from '../../components/Input.vue';
</script>

<template>
    <div class="w-full h-full">
        <Button
            :leftIcon="PlusIcon"/>

            <div class="bg-success p-60 bg-opacity-20"></div>
    </div>
</template>