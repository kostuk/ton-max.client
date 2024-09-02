import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

export  class TreaderOrderTdo{
  symbol: string | undefined;
  token_address: string | undefined;
  pool_address: string | undefined;

  balance: number | undefined;

  bigBalance: number | undefined;

  saleTonBalance: number | undefined;

  buyPrice: number | undefined;
 
  currentPrice: number | undefined;

  lowPrice: number | undefined;

  hiPrice: number | undefined;

  startedAt: Date | undefined;
  updatedAt: Date | undefined;
  status: 'init'| 'end'| 'run' | undefined;
  dex_type: string | undefined;
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
    setApiUrl(newUrl:string) {
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
