import { defineStore } from 'pinia'
interface State {
    userData: {
        userId: number,
        userFirstname: string,
        userLastname: string,
        userEmail: string
        userToken: string
    }
}
export const useGlobalStore = defineStore('globalStore', {
    persist: true,
    state: (): State => ({
        userData: {
            userId: 0,
            userFirstname: '',
            userLastname: '',
            userEmail: '',
            userToken: ''
        }
    }),
    actions: {
        logIn(payload: any) {
            this.userData = payload
        }
    }
})