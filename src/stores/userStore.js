import { defineStore } from 'pinia'
import { supabase } from 'boot/supabase'
import jsCookie from 'js-cookie'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      user: {},
      isAuthenticated: false,
      loading: false,
      acceptCookies: false
    }
  },
  getters: {
    getUserDetails: state => state.user,
    getIfUserAcceptCookies: state => state.user.acceptCookies,
    getCookieIfExists: () => (jsCookie.get('userLastSign') ? jsCookie.get('userLastSign') : '')
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
        this.router.push('/')
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
        this.router.push('/login')
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        this.loading = false
      }
    },
    handleCookies(acceptCookies) {
      if (acceptCookies && !jsCookie.get('userInfo')) {
        jsCookie.set('userLastSign', this.user.last_sign_in_at, { expires: 7 })
        this.user.acceptCookies = true
      } else if (jsCookie.get('userInfo')) {
        jsCookie.remove('userInfo')
        this.user.acceptCookies = false
      }
    }
  },
  persist: true
})
