import { defineStore } from 'pinia'
interface State {
    userData: {
        userId: number,
        userFirstname: string,
        userLastname: string,
        userEmail: string
        userToken: string
        authenticated: boolean
    },
}
export const useGlobalStore = defineStore('globalStore', {
    persist: true,
    state: (): State => ({
        userData: {
            userId: 0,
            userFirstname: '',
            userLastname: '',
            userEmail: '',
            userToken: '',
            authenticated: false
        }
    }),
    actions: {
        logIn(payload: any) {
            this.userData = payload
            this.userData.authenticated = true
        }
    }
})