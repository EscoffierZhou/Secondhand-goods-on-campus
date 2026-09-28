import { defineStore } from 'pinia'
import { verifyStudentAccount, createGuestSession } from '../services/storage'

export const useUserStore = defineStore('user', {
  state: () => {
    let savedUser = null
    try {
      savedUser = JSON.parse(localStorage.getItem('campus_2nd_user') || 'null')
    } catch {
      savedUser = null
    }

    return {
      currentUser: savedUser || createGuestSession(), // 默认内置快速演示已认证状态
      currentCampus: localStorage.getItem('campus_2nd_selected_campus') || '圣井校区',
      authDialogOpen: false
    }
  },

  getters: {
    isLoggedIn: (state) => !!state.currentUser?.studentId,
    studentId: (state) => state.currentUser?.studentId || '',
    nickName: (state) => state.currentUser?.nickName || '未登录'
  },

  actions: {
    login(studentId, passWord) {
      const res = verifyStudentAccount(studentId, passWord)
      if (res.success) {
        this.currentUser = res.user
        localStorage.setItem('campus_2nd_user', JSON.stringify(res.user))
        return { success: true }
      }
      return res
    },

    loginAsGuest() {
      const guest = createGuestSession()
      this.currentUser = guest
      localStorage.setItem('campus_2nd_user', JSON.stringify(guest))
      return { success: true }
    },

    logout() {
      this.currentUser = null
      localStorage.removeItem('campus_2nd_user')
    },

    setCampus(campusName) {
      this.currentCampus = campusName
      localStorage.setItem('campus_2nd_selected_campus', campusName)
    },

    openAuthDialog() {
      this.authDialogOpen = true
    },

    closeAuthDialog() {
      this.authDialogOpen = false
    }
  }
})
