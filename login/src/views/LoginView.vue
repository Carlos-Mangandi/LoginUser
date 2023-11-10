<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
       <div class="bg-white p-8 shadow-md rounded-md w-96">
         <h2 class="text-2xl font-semibold mb-4" align="center">Inicio de Sesión</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label for="email" class="block text-sm font-medium text-gray-700">Username</label>
                    <input v-model="email" type="email" id="email" name="email" required class="w-full px-3 py-2 mt-1 bg-gray-100 border rounded-md focus:ring focus:ring-gray-300">
                </div>
                <div class="mb-4">
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="password" type="password" id="password" name="password" required class="w-full px-3 py-2 mt-1 bg-gray-100 border rounded-md focus:ring focus:ring-gray-300">
                </div>
                <button type="submit" class="border-solid border-2 border-indigo-600 w-full py-2 bg bg-white text-black rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300" >Login</button>
                
            </form>
        </div>
    </div>
</template>
 
<script lang="ts" setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import  router  from '../routes';
    import  {useAuthStore} from '../components/auth' 
    import Swal from 'sweetalert2/dist/sweetalert2.js';

    const authStore = useAuthStore();
    const email = ref('');
    const password = ref('');

    const login = async () => {
        try {
            const response = await axios.post('https://reqres.in/api/login', {
                email: email.value,
                password: password.value,
            });
       
            console.log('Successful Login', response.data);
            authStore.setAuthenticated(true);
            router.push('/home');
            alert("Successful Login")
            Swal.fire({
                title: "Good job!",
                text: "You clicked the button!",
                icon: "success"
            });
        } 
        catch (error) {
            console.error('Failed to Login', error);
            alert("Failed to Login")

            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    };   
</script>