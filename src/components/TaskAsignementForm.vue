<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useGlobalStore } from '@/stores/globalStore'

const emit = defineEmits(['task-asignement-done'])
const props = defineProps(['task'])
const globalStore = useGlobalStore()
type UsersRestrictedInformations = {
  id: number
  firstname: string
  lastname: string
}
type Task = {
  id: number
  label: string
  startTime: Date
  endTime: Date
}
type StateShape = {
  users: UsersRestrictedInformations[]
  selectedUser: UsersRestrictedInformations
  userTasks: Task[]
  error: boolean
}

const state = reactive<StateShape>({
  users: [],
  selectedUser: {
    id: 0,
    firstname: '',
    lastname: ''
  },
  userTasks: [],
  error: false
})

onMounted(() => {
  //get all users for assignement
  axios
    .get('http://localhost:3000/users', {
      headers: { Authorization: 'Bearer ' + globalStore.userData.userToken }
    })
    .then((res) => {
      state.users = res.data
    })
    .catch((err) => {
      console.log(err)
    })
})

const getUserTasks = () => {
  //set error to false if true
  if (state.error) {
    state.error = false
  }
  //get all tasks for the selected user
  axios
    .get('http://localhost:3000/tasks', {
      params: { id: state.selectedUser.id },
      headers: { Authorization: 'Bearer ' + globalStore.userData.userToken }
    })
    .then((res) => {
      state.userTasks = res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

const assignTo = () => {
  //prepare request
  const sendRequest = () => {
    axios
      .put(
        'http://localhost:3000/tasks',
        { userId: state.selectedUser.id, taskId: props.task.id },
        { headers: { Authorization: 'Bearer ' + globalStore.userData.userToken } }
      )
      .then((res) => {
        if (res.status == 200) {
          emit('task-asignement-done')
        }
      })
      .catch((err) => {
        state.error = err
        console.log(err)
      })
  }
  //check if user dont have task in this time
  let flag: boolean = false
  if (state.userTasks.length > 0) {
    state.userTasks.forEach((element) => {
      console.log(
        new Date(props.task.startTime).getTime() +
          ' ' +
          new Date(props.task.startTime).toLocaleDateString() +
          ' ' +
          new Date(props.task.startTime).toLocaleTimeString() +
          ' à ' +
          new Date(props.task.endTime).getTime() +
          ' ' +
          new Date(props.task.endTime).toLocaleDateString() +
          ' ' +
          new Date(props.task.endTime).toLocaleTimeString()
      )
      console.log(
        new Date(element.startTime).getTime() +
          ' ' +
          new Date(element.startTime).toLocaleDateString() +
          ' ' +
          new Date(element.startTime).toLocaleTimeString() +
          ' à ' +
          new Date(element.endTime).getTime() +
          ' ' +
          new Date(element.endTime).toLocaleDateString() +
          ' ' +
          new Date(element.endTime).toLocaleTimeString()
      )
      if (
        (new Date(props.task.startTime).getTime() >= new Date(element.startTime).getTime() &&
          new Date(props.task.startTime).getTime() <= new Date(element.endTime).getTime()) ||
        (new Date(props.task.endTime).getTime() >= new Date(element.startTime).getTime() &&
          new Date(props.task.endTime).getTime() <= new Date(element.endTime).getTime())
      ) {
        flag = true
      }
    })
    if (flag) {
      state.error = true
    } else {
      sendRequest()
    }
  } else {
    sendRequest()
  }
}
</script>

<template>
  <div class="container shadow">
    <div class="header bg-dark color-white">
      <div>
        <h3>Affecter la tâche n°{{ props.task.id }} : {{ props.task.label }}</h3>
        <span>
          Début :
          {{
            new Date(props.task.startTime).toLocaleDateString('fr-FR') +
            ' ' +
            new Date(props.task.startTime).toLocaleTimeString().substring(0, 5) +
            ' - Fin : ' +
            new Date(props.task.endTime).toLocaleDateString('fr-FR') +
            ' ' +
            new Date(props.task.endTime).toLocaleTimeString().substring(0, 5)
          }}
        </span>
      </div>
      <img
        src="@/assets/images/close-red.svg"
        alt="Fermer"
        @click="$emit('close-affectation-form')"
      />
    </div>
    <div class="content">
      <p>Selectionnez un utilisateur</p>
      <select v-model="state.selectedUser" @change="getUserTasks">
        <option :value="items" v-for="items in state.users" :key="items.id">
          {{ items.firstname + ' ' + items.lastname }}
        </option>
      </select>
      <div v-if="state.selectedUser.id">
        <button class="button bg-blue" @click="assignTo()">Affecter</button>
        <p v-if="state.error" class="error animate__animated animate__shakeX">
          Utilisateur possedant déjà une tâche pour cette date
        </p>
        <div v-if="state.userTasks.length > 0">
          <p>
            Liste des tâches actuellement affectées à
            {{ state.selectedUser.firstname + ' ' + state.selectedUser.lastname }}
          </p>
          <ul>
            <li class="color-blue" v-for="items in state.userTasks" :key="items.id">
              {{
                items.label +
                ' : ' +
                new Date(items.startTime).toLocaleDateString('fr-FR') +
                ' ' +
                new Date(items.startTime).toLocaleTimeString().substring(0, 5) +
                ' à ' +
                new Date(items.endTime).toLocaleDateString('fr-FR') +
                ' ' +
                new Date(items.endTime).toLocaleTimeString().substring(0, 5)
              }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
  width: 70%;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid whitesmoke;
}
h3 {
  margin: 0 0.5rem;
}
.header {
  display: grid;
  grid-template-columns: 50% 50%;
  /* justify-content: space-between; */
  padding: 0.5rem 0;
  border-radius: 5px;
}
.header span {
  display: block;
  margin: 0.05rem 0.5rem;
}
.header img {
  display: block;
  margin-left: auto;
  margin-right: 0.5rem;
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
}
.content {
  padding: 1rem;
}
.content .button {
  display: block;
  margin: 1rem auto;
}
</style>