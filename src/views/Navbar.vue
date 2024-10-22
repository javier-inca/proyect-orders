<script setup>

</script>

<template>
    <nav class="bg-gray-800 p-5 flex justify-end border-b-2 border-gray-700 gap-10 text-white">
        <router-link 
            to="/">
            Home
        </router-link>

        <router-link 
            to="/users">
            Users
        </router-link>

        <router-link 
            to="/products">
            Products
        </router-link>

        <router-link 
            to="/orders">
            Orders
        </router-link>
    </nav>
</template>
