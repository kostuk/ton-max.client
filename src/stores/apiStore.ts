import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export  class TreaderOrderTdo{
  symbol: string;
  token_address: string;
  pool_address: string;

  balance: number;

  bigBalance: number;

  saleTonBalance: number;

  buyPrice: number;
 
  currentPrice: number;

  lowPrice: number;

  hiPrice: number;

  startedAt: Date;
  updatedAt: Date;
  status: 'init'| 'end'| 'run' ;
  dex_type: string;
}

export const useApiStore = defineStore('api', {
  state: () => ({
    apiUrl: 'http://213.171.25.36:3000/', 
    //apiUrl: 'http://localhost:3000/', 
    orders: [],
    walletStatus: {},
    status: [],
    maxBoosts: [],
    stonFiBoosts: [],
    deDustBoosts:[],
  }),
  getters: {
    getApiUrl: (state) => state.apiUrl,
    getOrders: (state) => state.orders,
    getWalletStatus: (state) => state.walletStatus,
    getSettings: (state) => state.status,
    getMaxBoosts: (state) => state.maxBoosts,
    getStonFiBoosts: (state) => state.stonFiBoosts,
    getDeDustBoosts: (state) => state.deDustBoosts,

  },
  actions: {
    setApiUrl(newUrl) {
      this.apiUrl = newUrl;
    },
    async fetchOrders() {
        try {
          const data = await axios.get(this.getApiUrl+'boosts/active')
            this.orders = data.data
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async fetchSettings() {
        try {
          const data = await axios.get(this.getApiUrl+'settings')
            this.status = data.data
          }
          catch (error) {
            console.log(error)
        }
            
      },
      
      async fetchMaxBoosts() {
        try {
          const data = await axios.get(this.getApiUrl+'boosts/max')
            this.maxBoosts = data.data
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async fetchStonFiBoosts() {
        try {
          const data = await axios.get(this.getApiUrl+'ston-fi/boosts')
            this.stonFiBoosts = data.data
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async fetchDeDustBoosts() {
        try {
          const data = await axios.get(this.getApiUrl+'de-dust/boosts')
            this.deDustBoosts = data.data
          }
          catch (error) {
            console.log(error)
        }
            
      },

      async fetchWalletStatus() {
        try {
          const data = await axios.get(this.getApiUrl+'wallet/status?db=1')
            this.walletStatus = data.data
          }
          catch (error) {
            console.log(error)
        }
            
      },
      
    }
  
});
