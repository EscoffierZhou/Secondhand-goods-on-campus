import { defineStore } from 'pinia'
import {
  getBooks,
  saveBook,
  deleteBook,
  getGoods,
  saveGood,
  deleteGood,
  getJobs,
  saveJob,
  deleteJob,
  getWants,
  addWant,
  toggleWantStatus
} from '../services/storage'

export const useMarketStore = defineStore('market', {
  state: () => ({
    books: [],
    goods: [],
    jobs: [],
    wants: [],
    globalSearchKeyword: ''
  }),

  actions: {
    loadAll() {
      this.books = getBooks()
      this.goods = getGoods()
      this.jobs = getJobs()
      this.wants = getWants()
    },

    publishBook(bookData) {
      const newBook = saveBook(bookData)
      this.loadAll()
      return newBook
    },

    removeBook(bookId) {
      deleteBook(bookId)
      this.loadAll()
    },

    publishGood(goodData) {
      const newGood = saveGood(goodData)
      this.loadAll()
      return newGood
    },

    removeGood(goodId) {
      deleteGood(goodId)
      this.loadAll()
    },

    publishJob(jobData) {
      const newJob = saveJob(jobData)
      this.loadAll()
      return newJob
    },

    removeJob(jobId) {
      deleteJob(jobId)
      this.loadAll()
    },

    publishWant(wantData) {
      const newWant = addWant(wantData)
      this.loadAll()
      return newWant
    },

    toggleWant(wantId) {
      const res = toggleWantStatus(wantId)
      this.loadAll()
      return res
    }
  }
})

