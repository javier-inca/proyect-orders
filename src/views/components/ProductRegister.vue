<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import Input from '../../components/Input.vue';
import Button from '../../components/Button.vue'




</script>

<template>
    <div class="w-3/5 md:w-2/5 lg:w-2/6 2xl:w-1/6 h-2/6 bg-white rounded-xl border border-black-custom shadow-2xl ">
        <div class="w-full h-10 bg-black-custom rounded-t-xl flex justify-end">
            <button
                class="mx-3">
                <XMarkIcon
                    class="size-6 text-white hover:text-secondary"/>
            </button>
        </div>

        <div class="flex items-center flex-col mt-10 w-full h-full">
            <ShoppingCartIcon
                class=" size-2/6 text-black-custom"/>

            <Input
                placeholder="Product Name"/>

            <Input
                class=" mt-2"
                placeholder="Product Price"/>

            <Button
                class="mt-5"
                name="Register"/>
        </div>
    </div>
</template>