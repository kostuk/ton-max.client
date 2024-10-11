<script setup lang="ts">  
import { ref, onMounted, computed, watch } from 'vue'
import {  useApiStore } from '@/stores/apiStore'
import moment from 'moment';
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useApiStore();
const order = computed<any>(() => {
  return store.getOrder;
});

const priceOptions =computed<any>(() => {
          return {
            chart: {
              height: 350,
              type: 'line',
              
            },
            stroke: {
              width: [1, 1, 1],
              curve: 'straight',
              dashArray: [0, 0, 0]
            },
            dataLabels: {
              enabled: false
            },
            title: {
              text: 'Limit price',
              align: 'left'
            },
          }
        });

        const apyOptions =computed<any>(() => {
          return {
            chart: {
              height: 350,
              type: 'line',
              
            },
            stroke: {
              width: [1],
              curve: 'straight',
              dashArray: [0]
            },
            dataLabels: {
              enabled: false
            },
            title: {
              text: 'Apy',
              align: 'left'
            },
          }
        });


        const lpOptions =computed<any>(() => {
          return {
            chart: {
              height: 350,
              type: 'line',
              
            },
            stroke: {
              width: [1],
              curve: 'straight',
              dashArray: [0]
            },
            dataLabels: {
              enabled: false
            },
            title: {
              text: 'Lp k$',
              align: 'left'
            },
          }
        });

const priceSeries =computed<any>(() => {
    
    let points = store.getOrder.points || [];
  if (!Array.isArray(points)) {
    return []; 
  }
    let dataLow = [];
    let dataPrice = [];
    let dataHi = [];
    for(let p of points){
     let t =  Math.floor(p.tiks/60);
      dataLow.push({x:t, y:p.low});
      dataHi.push({x:t, y:p.hi});
      dataPrice.push({ x:t, y:p.value});
    }
    let o =  [{
            name: "Hi",
            color: "#F7C705",
            data: dataHi
          }, {
            name: "Price",
            color: "#012033",
            data: dataPrice
          },
          {
            name: "Low",
            color: "#012066",
            data: dataLow
          }, ];
        return o;
});

const apySeries =computed<any>(() => {
    
  let points = store.getOrder.points || [];
  if (!Array.isArray(points)) {
    return []; 
  }
    let data = [];
    for(let p of points){
      let t =  Math.floor(p.tiks/60);
      data.push({x:t, y: Math.floor(p.apy*100)});
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
      let t =  Math.floor(p.tiks/60);
      data.push({x:t, y: Math.floor(p.lp/1000)});
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
      if(value>0.1) return value.toFixed(4);
      if(value>0.01) return value.toFixed(5);
      if(value>0.001) return value.toFixed(6);
      return value.toExponential(2);
};

const limit = ref({
  low: '', // начальное значение
  hi: '', // начальное значение
});


watch(() => store.getOrder, (newOrder) => {
  if (newOrder && newOrder.lowUserPrice) {
    limit.value.low = newOrder.lowUserPrice;
  }
  
  if (newOrder && newOrder.hiUserPrice) {
    limit.value.hi = newOrder.hiUserPrice;
  }
}, { immediate: true });
// Логика обновления лимитов
const updateLimit = (key: string, value: string) => {
  console.log(`Обновление лимита для ${key}: новое значение = ${value}`);
  // Допустим, здесь можно добавить логику для отправки данных на сервер
    console.log(order);
    store.updateOrderLimit(<string>route.params.id, key, <string>value);
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
          

        </li>
        <li> Status: <strong>{{ order.status }}</strong> DEX: {{ order.dex_type }}     </li>
        <li>Profit:   {{ (100*(order.currentPrice-order.buyPrice)/order.buyPrice).toFixed(1) }}%     </li>
        <div>
         HI <input name="hiPrice" type="number" v-model="limit.hi"/></input> <button @click="updateLimit('hiPrice', limit.hi)">update</button>
          <button @click="limit.hi = formatCoinValue(order.hiPrice)">{{formatCoinValue(order.hiPrice)}}</button>

          {{ order.hiUserPrice?((order.hiUserPrice-order.buyPrice)/order.currentPrice*100).toFixed(1):'' }}%    
        </div>
        <div>
         Low <input name="lowPrice" type="number" v-model="limit.low"/></input> 
          <button @click="updateLimit('lowPrice', limit.low)">update</button>
           <button @click="limit.low = formatCoinValue(order.lowPrice)">{{formatCoinValue(order.lowPrice)}}</button>
           {{ order.lowUserPrice?((order.lowUserPrice-order.buyPrice)/order.currentPrice*100).toFixed(1):'' }}%    
          </div>
      </ul>


    <div>
      <apexchart width="1000" height="300" type="line" :options="priceOptions" :series="priceSeries"></apexchart>
    </div>
    <div>
      <apexchart width="1000" height="300" type="line" :options="apyOptions" :series="apySeries"></apexchart>
    </div>
    <div>
      <apexchart width="1000" height="300" type="line" :options="lpOptions" :series="lpSeries"></apexchart>
    </div>
</template>

