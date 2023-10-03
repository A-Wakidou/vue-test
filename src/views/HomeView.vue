<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useGlobalStore } from '@/stores/globalStore'

const router = useRouter()
const globalStore = useGlobalStore()

type StateShape = {
  loginForm: {
    email: string
    password: string
  }
  error: string
}
const state = reactive<StateShape>({
  loginForm: {
    email: '',
    password: ''
  },
  error: ''
})
const signin = (): void => {
  //verify if email & password are filled
  if (state.loginForm.email && state.loginForm.password) {
    //authentication request
    axios
      .post('http://localhost:3000/users/signin', state.loginForm)
      .then((res) => {
        if (res.data) {
          //put user data in store
          globalStore.logIn(res.data)
          //go to dashboard page
          router.push('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err)
        state.error = 'Identifiant incorrects'
      })
  } else {
    state.error = 'Veuillez renseignez votre email et votre mot de passe'
  }
}
</script>

<template>
  <div class="container bg-dark">
    <h2 class="color-white">Accès sécurisé à l'interface de saisie</h2>
    <form @submit.prevent="signin">
      <h3 class="color-blue">Authentification</h3>
      <div>
        <label for="email">Email</label>
        <input placeholder="Votre email" type="text" v-model="state.loginForm.email" />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input placeholder="*********" type="password" v-model="state.loginForm.password" />
      </div>
      <span v-if="state.error" class="error animate__animated animate__shakeX">{{
        state.error
      }}</span>
      <button class="button bg-blue" type="submit">Valider</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
  padding: 1rem 0;
  height: 500px;
  width: 40%;
  margin: 0 auto;
  margin-top: 50px;
  border-radius: 15px;
}

.container > span {
  font-size: 1.2rem;
  font-weight: bolder;
  display: block;
}

h3 {
  margin: 0;
}

form {
  color: black;
  background-color: #fff;
  padding: 1.5rem;
  width: 60%;
  margin: 2rem auto;
  border-radius: 5px;
}

.button {
  margin: 0;
}

input[type='password'] {
  background: url('@/assets/images/lock-black.svg');
  background-repeat: no-repeat;
  background-position: 99% 50%;
}
input[type='text'] {
  background: url('@/assets/images/person-black.svg');
  background-repeat: no-repeat;
  background-position: 99% 50%;
}
</style>
