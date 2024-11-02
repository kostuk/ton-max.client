<script setup lang="ts">  
import { ref, onMounted, computed } from 'vue'
import {  useApiStore } from '@/stores/apiStore'
import moment from 'moment';

const store = useApiStore();
const getLocActions = computed<any>(() => {
  return store.getLocActions;
});
const formatDate = (date:string)=> {
      return moment(date).format('YYYY-MM-DD HH:mm');
    };
// lifecycle hooks
onMounted(() => {
  setInterval(()=>{
    store.fetchGetLastActions();

  },10_000);
  store.fetchGetLastActions();
})

</script>


<template>
  <div class="about">
    <h1>Messages</h1>
    
    <ul v-for="arb in getLocActions" :key="arb.action._id">
      <li>{{ arb.palce.title}} {{ formatDate(arb.action.date) }}  {{arb.action.action}}
        <br/>words:<small>{{ arb.palce.words?.join("|<br/>") }}</small>

        <br/>
        <small><strong>{{ arb.message.message }}</strong></small>

</li>
    </ul>

  </div>
</template>

