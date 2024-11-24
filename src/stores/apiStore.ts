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
    //apiUrl: 'http://213.171.25.36:3000/', 
    apiUrl: 'http://localhost:3000/', 
    orders: [],
    walletStatus: {},
    order: {},
    status: [],
    maxBoosts: [],
    stonFiBoosts: [],
    deDustBoosts:[],
    arbitrations: [],
    arbitrationOrders: [],
    messages: [],
    locations: [],
    locActions:[],
    cities:[],
    }),
  getters: {
    getApiUrl: (state) => state.apiUrl,
    getOrders: (state) => state.orders,
    getWalletStatus: (state) => state.walletStatus,
    getSettings: (state) => state.status,
    getMaxBoosts: (state) => state.maxBoosts,
    getStonFiBoosts: (state) => state.stonFiBoosts,
    getDeDustBoosts: (state) => state.deDustBoosts,
    getArbitrations: (state) => state.arbitrations,
    getArbitrationOrders: (state) => state.arbitrationOrders,
    getOrder: (state) => <any>state.order,
    getMessages: (state) => <any>state.messages,
    getLocations: (state) => <any>state.locations,
    getLocActions: (state) => <any>state.locActions,
    getCities: (state) => <any>state.cities,

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
      async fetchArbitrations() {
        try {
          const data = await axios.get(this.getApiUrl+'arbitrations/activity?all=1')
            this.arbitrations = data.data
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async fetchArbitrationOrders() {
        try {
          const data = await axios.get(this.getApiUrl+'arbitrations/orders')
            this.arbitrationOrders = data.data
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
      async fetchOrder(id:string) {
        try {
          const data = await axios.get(this.getApiUrl+'trade/order/'+id)
            this.order = data.data
          }
          catch (error) {
            console.log(error)
        }
            
      },
      
      async updateOrderLimit(id:string, name:string, value:string) {
        try {
           await axios.put(this.getApiUrl+`trade/order/${id}/limit/`,
            {
              name: name,
              value: value

            }
          )
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async addIgnoreTokens(tokens:string) {
        try {
           await axios.get(this.getApiUrl+`wallet/ignore/tokens?tokens=${tokens}`)
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async deleteIgnoreTokens(tokens:string) {
        try {
           await axios.delete(this.getApiUrl+`wallet/ignore/tokens?tokens=${tokens}`)
          }
          catch (error) {
            console.log(error)
        }
            
      },

      async addTokens(tokens:string) {
        try {
           await axios.get(this.getApiUrl+`wallet/reload?tokens=${tokens}`)
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async updateBitInTon(total:string) {
        try {
           await axios.get(this.getApiUrl+`wallet/update/BitInTon?value=${total}`)
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async updateBitInUsd(total:string) {
        try {
           await axios.get(this.getApiUrl+`wallet/update/BitInUsd?value=${total}`)
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async buyBoostUsd(id:string) {
        try {
           await axios.post(this.getApiUrl+`trade/boost/${id}/buy`)
          }
          catch (error) {
            console.log(error)
        }
            
      },
      async fetchGetMessages(){
        try {
          let data =  await axios.get(this.getApiUrl+`probli/locMessages`)
          this.messages = data.data
         }
         catch (error) {
           console.log(error)
       }
      },
      async fetchGetLocations(){
        try {
          let data = await axios.get(this.getApiUrl+`probli/locWords`)
          this.locations = data.data
         }
         catch (error) {
           console.log(error)
       }
      },
      async fetchGetCities(){
        try {
          let data = await axios.get(this.getApiUrl+`probli/cities`)
          this.cities = data.data
         }
         catch (error) {
           console.log(error)
       }
      },
      async fetchGetLastActions(){
        try {
          let data = await axios.get(this.getApiUrl+`probli/locAction/last`)
          this.locActions = data.data
         }
         catch (error) {
           console.log(error)
       }
      },
      
      async  processMessage(id:string){
        try {
          let data = await axios.post(this.getApiUrl+`probli/locMessages/${id}/process`,
              {
                
              }
  
            )
            return data.data;
          }
          catch (error) {
            console.log(error)
        }
      },
      async updateLocations(id:string, title:string, words:string[], lat:number, lng:number, city:string) {
        try {
          if(id){
            await axios.put(this.getApiUrl+`probli/locWords/${id}`,
              {
                title: title,
                words: words,
                lat:lat,
                lng:lng,
                city: city
              }
  
            )
  
          }else{
            await axios.post(this.getApiUrl+`probli/locWords`,
              {
                title: title,
                words: words,
                lat:lat,
                lng:lng,
                city: city
              }
  
            )
  
          }
          }
          catch (error) {
            console.log(error)
        }
            
      },
      
    }
  
});
