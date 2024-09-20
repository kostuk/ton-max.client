<script setup lang="ts">  
import { ref, onMounted, computed } from 'vue'
import {  useApiStore } from '@/stores/apiStore'
import moment from 'moment';
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useApiStore();
const order = computed<any>(() => {
  return store.getOrder;
});
const options = computed<any>(() => {});
const priceSeries =computed<any>(() => {
    
    let points = store.getOrder.points || [];
  if (!Array.isArray(points)) {
    return []; 
  }
    let dataLow = [];
    let dataPrice = [];
    let dataHi = [];
    for(let p of points){
      dataLow.push({x:p.tiks, y:p.low});
      dataHi.push({x:p.tiks, y:p.hi});
      dataPrice.push({x:p.tiks, y:p.value});
    }
    let o =  [{
            name: "Hi",
            color: "#F7C705",
            data: dataHi
          }, {
            name: "Low",
            color: "#012066",
            data: dataLow
          }, {
            name: "Price",
            color: "#012033",
            data: dataPrice
          }];
        return o;
});

const apySeries =computed<any>(() => {
    
  let points = store.getOrder.points || [];
  if (!Array.isArray(points)) {
    return []; 
  }
    let data = [];
    for(let p of points){
      data.push({x:p.tiks, y:p.apy});
    }
    let o = [{
            name: "Apy",
            color: "#F7C705",
            data: data
          }]
        
      return o;

});

const lpSeries =computed<any>(() => {
    
  let points = store.getOrder.points || [];
  if (!Array.isArray(points)) {
    return []; 
  }
    let data = [];
    for(let p of points){
      data.push({x:p.tiks, y:p.lp});
    }
    let o =  [{
            name: "LP",
            color: "#F7C705",
            data: data
          }]
        
        return o;

});


const formatDate = (date:string)=> {
      return moment(date).format('YYYY-MM-DD HH:mm');
    };
    const formatCoinValue = (value:number)=> {
      if(!value) return '-'
      if(value>0.1) return value.toFixed(2);
      if(value>0.01) return value.toFixed(3);
      if(value>0.001) return value.toFixed(4);
      return value.toExponential(2);
};
// lifecycle hooks
onMounted(() => {
  setInterval(()=>{
    store.fetchOrder(<string>route.params.id);

  },10_000);
  store.fetchOrder(<string>route.params.id);
})
</script>


<template>

<h1>Order</h1>
      <ul>
          <li>
          symbol: {{ order.symbol }}, balance: {{ formatCoinValue(order.balance) }}, buy Price: {{ formatCoinValue(order.buyPrice) }}
        </li>
        <li> Low/ Current /  Price: 
          <span :class="{ warning: order?.lowPrecent<0.05 }">
            {{ formatCoinValue(order.lowPrice) }}({{ order.lowPrecent?(order.lowPrecent*100).toFixed(1):'' }}%)
          </span>
          /
           <strong>{{ formatCoinValue(order.currentPrice) }}</strong>  
           /
           <span :class="{ warning: order.hiPrecent<0.05 }">
           {{ formatCoinValue(order.hiPrice) }}({{ order.hiPrecent?(order.hiPrecent*100).toFixed(1):'' }}%)    
          </span>
          <router-link :to="{ name: 'order', params: { id: order.id } }">Chart</router-link>

        </li>
        <li> Status: <strong>{{ order.status }}</strong> DEX: {{ order.dex_type }}     </li>
        <li>Profit:   {{ (100*(order.currentPrice-order.buyPrice)/order.buyPrice).toFixed(1) }}%     </li>
    </ul>

    <div>
      <apexchart width="500" type="line" :options="options" :series="priceSeries"></apexchart>
    </div>
    <div>
      <apexchart width="500" type="line" :options="options" :series="apySeries"></apexchart>
    </div>
    <div>
      <apexchart width="500" type="line" :options="options" :series="lpSeries"></apexchart>
    </div>

</template>

