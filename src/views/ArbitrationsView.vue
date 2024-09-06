<script setup lang="ts">  
import { ref, onMounted, computed } from 'vue'
import {  useApiStore } from '@/stores/apiStore'
import moment from 'moment';

const store = useApiStore();
const getArbitrations = computed<any>(() => {
  return store.getArbitrations;
});
const getArbitrationOrders = computed<any>(() => {
  return store.getArbitrationOrders;
});
const formatDate = (date:string)=> {
      return moment(date).format('YYYY-MM-DD HH:mm');
    };
// lifecycle hooks
onMounted(() => {
  setInterval(()=>{
    store.fetchArbitrations();
    store.fetchArbitrationOrders();

  },10_000);
  store.fetchArbitrations();
  store.fetchArbitrationOrders();
})
</script>


<template>
  <div class="about">
    <h1>Arbitrations Order</h1>

    <div v-for="arb in getArbitrationOrders" :key="arb.id">
      <ul>
          <li>
            <RouterLink to="/arbitrations/" >{{ arb.symbol }}</RouterLink>,  profit: {{ (arb.profitPercent).toFixed(1) }}% get {{arb.ton2}} ton
            , lp: {{ arb.lp?.toFixed(0) }}$
        </li>
        <li>  {{ formatDate(arb.updateAt) }}, status: {{ arb.status }}, dex: {{ arb.dex_type0 }}=>{{ arb.dex_type1 }}       </li>
    </ul>
    </div>

    <h1>Arbitrations Activity</h1>
    <div v-for="arb in getArbitrations" :key="arb.symbol">
      <ul>
          <li>
            <RouterLink to="/arbitrations/" >{{ arb.symbol }}</RouterLink>
            profit: {{ (arb.profitPercent).toFixed(1) }}%
            lp: {{ (arb.lp1<arb.lp0?arb.lp1:arb.lp0).toFixed(0) }}$
          {{ formatDate(arb.updateAt) }},  dex: {{ arb.dex_type0 }}=>{{ arb.dex_type1 }}       </li>
    </ul>
    </div>

  </div>
</template>

