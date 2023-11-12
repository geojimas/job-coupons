// languageStore.js
import { defineStore } from 'pinia'

export const useLanguageStore = defineStore('languageStore', {
  state: () => ({
    language: localStorage.getItem('appLanguage') || 'el'
  }),
  getters: {
    getAppLanguage: state => state.language
  },
  actions: {
    setAppLanguage(newLanguage) {
      this.language = newLanguage
      localStorage.setItem('appLanguage', newLanguage)
    }
  }
})
