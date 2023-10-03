<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useGlobalStore } from '@/stores/globalStore'

const globalStore = useGlobalStore()
const router = useRouter()

type StateShape = {
  form: {
    label: string
    startTime: Date
    endTime: Date
  }
  error: string
}
const state = reactive<StateShape>({
  form: {
    label: '',
    startTime: new Date(),
    endTime: new Date()
  },
  error: ''
})
const isSameDay = (date1, date2): boolean => {
  //check if the two dates are in the same day
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}
const isGreaterThan8Hours = (dateInMs1, dateInMs2): boolean => {
  //check if the two dates dont exceed 8hours
  return dateInMs2 - dateInMs1 >= 28800000
}
const createTask = () => {
  //check if endtime > startTime
  if (new Date(state.form.startTime).getTime() >= new Date(state.form.endTime).getTime()) {
    state.error = 'La date de début ne peut pas être antérieur à la date de fin'
  }
  //check if startTime & endTime is in same day & !> 8 hours
  else if (
    isSameDay(new Date(state.form.startTime), new Date(state.form.endTime)) &&
    isGreaterThan8Hours(
      new Date(state.form.startTime).getTime(),
      new Date(state.form.endTime).getTime()
    )
  ) {
    state.error = 'La tâche ne peut pas faire plus de 8heures le même jour'
  } else {
    //create task request
    axios
      .post('http://localhost:3000/tasks', state.form, {
        headers: { Authorization: 'Bearer ' + globalStore.userData.userToken }
      })
      .then((res) => {
        if (res.status == 200) {
          router.push('/dashboard')
        }
      })
      .catch((err) => {
        console.log(err)
        state.error = err
      })
  }
}
</script>

<template>
  <div class="container bg-dark">
    <h2 class="color-white">Création d'une tâche</h2>
    <form class="bg-white" @submit.prevent="createTask">
      <div>
        <label for="email">Label</label>
        <input placeholder="Label" type="text" v-model="state.form.label" />
      </div>
      <div>
        <label for="email">Début</label>
        <input placeholder="Label" type="datetime-local" v-model="state.form.startTime" />
      </div>
      <div>
        <label for="email">Fin</label>
        <input placeholder="Label" type="datetime-local" v-model="state.form.endTime" />
      </div>
      <p v-if="state.error" class="error animate__animated animate__shakeX">{{ state.error }}</p>
      <button @click="router.back()" class="button bg-dark">Retour</button>
      <button type="submit" class="button bg-blue">Valider</button>
    </form>
  </div>
</template>


<style scoped>
.container {
  width: 100%;
  margin: 5rem auto;
  text-align: center;
  padding: 1rem 0;
  padding-bottom: 2rem;
}

form {
  color: black;
  width: 30%;
  margin: 0 auto;
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
}

.button {
  margin-top: 1rem;
  margin-right: 5px;
}
</style>