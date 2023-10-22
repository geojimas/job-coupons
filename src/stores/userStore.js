import { defineStore } from 'pinia'
import { supabase } from '../boot/supabase'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: {},
      isAuthenticated: false,
      loading: false
    }
  },
  getters: {
    getUserDetails: state => state.user
  },
  actions: {
    async loginUser(userEmail, userPassword) {
      try {
        this.loading = true
        const { data, error } = await supabase.auth.signInWithPassword({
          email: userEmail,
          password: userPassword
        })
        if (error) throw error
        this.user = data.user
        this.isAuthenticated = true
        this.router.push("/")
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        this.loading = false
      }
    },
    async logoutUser() {
      try {
        this.loading = true
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.user = {}
        this.isAuthenticated = false
        this.router.push("/login")
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        this.loading = false
      }
    }
  },
  persist: true
})
