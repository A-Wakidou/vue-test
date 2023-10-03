<script setup lang="ts">
import { useGlobalStore } from '@/stores/globalStore'
import axios from 'axios'
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TaskAsignementForm from '@/components/TaskAsignementForm.vue'

const globalStore = useGlobalStore()
const router = useRouter()

type Task = {
  id: number
  label: string
  startTime: Date
  endTime: Date
}

type StateShape = {
  tasksData: Task[]
  filterButtons: {
    labelFilter: 'increasing' | 'decreasing' | 'none'
    startTimeFilter: 'increasing' | 'decreasing' | 'none'
    endTimeFilter: 'increasing' | 'decreasing' | 'none'
  }
  assignTask: object
}

const state = reactive<StateShape>({
  tasksData: [
    {
      id: 0,
      label: '',
      startTime: new Date(),
      endTime: new Date()
    }
  ],
  filterButtons: {
    labelFilter: 'none',
    startTimeFilter: 'none',
    endTimeFilter: 'none'
  },
  assignTask: {}
})

const sortByLabel = (): void => {
  //if label filter is in increasing state
  if (state.filterButtons.labelFilter == 'increasing') {
    //descending sorting
    let sortedArray = state.tasksData.sort((a, b) => b.label.localeCompare(a.label))
    state.tasksData = sortedArray
    //disable other filters
    state.filterButtons.labelFilter = 'decreasing'
    state.filterButtons.startTimeFilter = 'none'
    state.filterButtons.endTimeFilter = 'none'
  } else {
    //if label filter is in decreasing state
    //ascending sorting
    let sortedArray = state.tasksData.sort((a, b) => a.label.localeCompare(b.label))
    state.tasksData = sortedArray
    //disable other filters
    state.filterButtons.labelFilter = 'increasing'
    state.filterButtons.startTimeFilter = 'none'
    state.filterButtons.endTimeFilter = 'none'
  }
}
const sortByStartTime = (): void => {
  //if startTimeFilter filter is in increasing state
  if (state.filterButtons.startTimeFilter == 'increasing') {
    //descending sorting
    let sortedArray = state.tasksData.sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    state.tasksData = sortedArray
    //disable other filters
    state.filterButtons.startTimeFilter = 'decreasing'
    state.filterButtons.labelFilter = 'none'
    state.filterButtons.endTimeFilter = 'none'
  } else {
    //if endTimeFilter filter is in decreasing state
    //ascending sorting
    let sortedArray = state.tasksData.sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    state.tasksData = sortedArray
    //disable other filters
    state.filterButtons.startTimeFilter = 'increasing'
    state.filterButtons.labelFilter = 'none'
    state.filterButtons.endTimeFilter = 'none'
  }
}
const sortByEndTime = (): void => {
  //if endTimeFilter filter is in increasing state
  if (state.filterButtons.endTimeFilter == 'increasing') {
    //descending sorting
    let sortedArray = state.tasksData.sort((a, b) => new Date(b.endTime) - new Date(a.endTime))
    state.tasksData = sortedArray
    //disable other filters
    state.filterButtons.endTimeFilter = 'decreasing'
    state.filterButtons.labelFilter = 'none'
    state.filterButtons.startTimeFilter = 'none'
  } else {
    //if endTimeFilter filter is in decreasing state
    let sortedArray = state.tasksData.sort((a, b) => new Date(a.endTime) - new Date(b.endTime))
    state.tasksData = sortedArray
    //disable other filters
    state.filterButtons.endTimeFilter = 'increasing'
    state.filterButtons.labelFilter = 'none'
    state.filterButtons.startTimeFilter = 'none'
  }
}

const deleteTask = (id: number): void => {
  //delete request
  axios
    .delete('http://localhost:3000/tasks', {
      headers: { Authorization: 'Bearer ' + globalStore.userData.userToken },
      data: { id }
    })
    .then((res) => {
      //delete task in state
      let filteredData = state.tasksData.filter((task) => task.id != res.data.id)
      state.tasksData = filteredData
    })
    .catch((err) => {
      console.log(err)
    })
}

onMounted(() => {
  //get all tasks
  axios
    .get('http://localhost:3000/tasks', {
      headers: { Authorization: 'Bearer ' + globalStore.userData.userToken }
    })
    .then((res) => {
      state.tasksData = res.data
    })
    .catch((err) => {
      console.log(err)
    })
})
</script>

<template>
  <div>
    <div class="title-div">
      <h2>Liste des tâches</h2>
      <button class="button bg-dark" @click="router.push('/create-task')">
        <span>Ajouter</span>
        <img src="@/assets/images/add-white.svg" alt="Ajouter" />
      </button>
    </div>
    <table>
      <thead class="bg-dark">
        <th>N°</th>
        <th @click="sortByLabel()">
          <span>Label</span>
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.labelFilter == 'none'"
            src="@/assets/images/filter-white.svg"
            alt="Filter"
          />
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.labelFilter == 'increasing'"
            src="@/assets/images/arrow-up-blue.svg"
            alt="Filter"
          />
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.labelFilter == 'decreasing'"
            src="@/assets/images/arrow-down-blue.svg"
            alt="Filter"
          />
        </th>
        <th @click="sortByStartTime()">
          <span>Heure de début</span>
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.startTimeFilter == 'none'"
            src="@/assets/images/filter-white.svg"
            alt="Filter"
          />
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.startTimeFilter == 'increasing'"
            src="@/assets/images/arrow-up-blue.svg"
            alt="Filter"
          />
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.startTimeFilter == 'decreasing'"
            src="@/assets/images/arrow-down-blue.svg"
            alt="Filter"
          />
        </th>
        <th @click="sortByEndTime()">
          <span>Heure de fin</span>
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.endTimeFilter == 'none'"
            src="@/assets/images/filter-white.svg"
            alt="Filter"
          />
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.endTimeFilter == 'increasing'"
            src="@/assets/images/arrow-up-blue.svg"
            alt="Filter"
          />
          <img
            class="animate__animated animate__heartBeat"
            v-if="state.filterButtons.endTimeFilter == 'decreasing'"
            src="@/assets/images/arrow-down-blue.svg"
            alt="Filter"
          />
        </th>
        <th>Affectation</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="items in state.tasksData" :key="items.id">
          <td>{{ items.id }}</td>
          <td>{{ items.label }}</td>
          <td>
            {{
              new Date(items.startTime).toLocaleDateString('fr-FR') +
              ' ' +
              new Date(items.startTime).toLocaleTimeString().substring(0, 5)
            }}
          </td>
          <td>
            {{
              new Date(items.endTime).toLocaleDateString('fr-FR') +
              ' ' +
              new Date(items.endTime).toLocaleTimeString().substring(0, 5)
            }}
          </td>
          <td class="affectation-td">
            <span>
              {{
                items.usersIdFK ? items.usersIdFK.lastname + ' ' + items.usersIdFK.firstname : ''
              }}
            </span>
            <button class="button affectation" @click="state.assignTask = items">Affecter</button>
          </td>
          <td><button class="button" @click="deleteTask(items.id)">Supprimer</button></td>
        </tr>
      </tbody>
    </table>
    <TaskAsignementForm
      v-if="Object.keys(state.assignTask).length > 0"
      :task="state.assignTask"
      @task-asignement-done=";(state.assignTask = {}), router.go()"
      @close-affectation-form="state.assignTask = {}"
    />
  </div>
</template>

<style scoped>
.title-div > *,
.title-div .button > * {
  display: inline;
  vertical-align: middle;
}

h2 {
  margin: 3rem 1rem;
}

table {
  margin: 2rem 1rem;
  width: calc(100% - 2rem);
}

thead {
  color: white;
}

th > * {
  vertical-align: middle;
}
th,
td {
  padding: 15px;
  text-align: left;
}

th,
td {
  border-bottom: 1px solid #ddd;
}

table .affectation-td {
  display: grid;
  grid-template-columns: 50% 50%;
  align-items: center;
  font-weight: bold;
}

table .button.affectation {
  background-color: #2196f3;
}

table .button {
  background-color: red;
}
</style>
