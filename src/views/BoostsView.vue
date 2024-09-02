<script setup lang="ts">  
import { ref, onMounted, computed } from 'vue'
import {  useApiStore } from '@/stores/apiStore'
import moment from 'moment';

const store = useApiStore();
const getStonFiBoosts = computed(() => {
  return store.getStonFiBoosts;
});
const getDeDustBoosts = computed(() => {
  return store.getDeDustBoosts;
});
const formatDate = (date)=> {
      return moment(date).format('YYYY-MM-DD HH:mm');
    };
// lifecycle hooks
onMounted(() => {
  setInterval(()=>{
    store.fetchStonFiBoosts();
    store.fetchDeDustBoosts();

  },10_000);
  store.fetchStonFiBoosts();
  store.fetchDeDustBoosts();
})
</script>


<template>
  <div class="about">
    <h1>Ston.Fi</h1>
    <div v-for="boost in getStonFiBoosts" :key="boost.symbol">
      <ul>
          <li>
          {{ boost.title }},  apy: {{ (boost.apy*100).toFixed(1) }}% 
        </li>
        <li> Started At: {{ formatDate(boost.start_time) }}, status: {{ boost.status }}, dex: {{ boost.type }}       </li>
    </ul>
    </div>

  </div>
  <div class="about">
    <h1>DeDust</h1>
    <div v-for="boost in getDeDustBoosts" :key="boost.symbol">
      <ul>
          <li>
          {{ boost.title }},  apy: {{ (boost.apy*100).toFixed(1) }}% 
        </li>
        <li> Started At: {{ formatDate(boost.start_time) }}, status: {{ boost.status }}, dex: {{ boost.type }}       </li>
    </ul>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
