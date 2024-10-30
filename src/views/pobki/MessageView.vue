<script setup lang="ts">  
import { ref, onMounted, computed } from 'vue'
import {  useApiStore } from '@/stores/apiStore'
import moment from 'moment';

const store = useApiStore();
const getMessages = computed<any>(() => {
  return store.getMessages;
});
const formatDate = (date:string)=> {
      return moment(date).format('YYYY-MM-DD HH:mm');
    };
// lifecycle hooks
onMounted(() => {
  setInterval(()=>{
    store.fetchGetMessages();

  },10_000);
  store.fetchGetMessages();
})
</script>


<template>
  <div class="about">
    <h1>Messages</h1>
    
    <ul v-for="arb in getMessages" :key="arb.id">
      <li>{{ arb.title}} {{ formatDate(arb.date) }}</li>
    </ul>

  </div>
</template>

