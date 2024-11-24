<script setup lang="ts">  
import { ref, onMounted, computed } from 'vue'
import {  useApiStore } from '@/stores/apiStore'
import moment from 'moment';

const store = useApiStore();
const getLocations = computed<any>(() => {
  if(filterText.value){
    return store.getLocations.filter(item=>
    item.title.toLowerCase().includes(filterText.value.toLowerCase())
    ||
    (item.words.length>1 && item.words[0].toLowerCase().includes(filterText.value.toLowerCase()))
    ||
    (item.words.length>1 && item.words[1].toLowerCase().includes(filterText.value.toLowerCase()))

    );
  }else{
    return store.getLocations;
  }
});
const formatDate = (date:string)=> {
      return moment(date).format('YYYY-MM-DD HH:mm');
    };
// lifecycle hooks
onMounted(() => {

  store.fetchGetLocations();
  store.fetchGetCities();
})
const filterText = ref('');
const updateSetting = ref({
  _id: '',
  city:'kh',
  title: '',
  words_0: '',
  words_1: '',
  lat: null,
  lng: null,
  
});
const initUpdateSetting = (item:any)=>{
  console.log(item);
  if(item){
    updateSetting.value._id=item._id;
    updateSetting.value.title=item.title;
    updateSetting.value.words_0=item.words[0];
    updateSetting.value.words_1=item.words.length>1?item.words[1]:'';
    updateSetting.value.lat=item.lat;
    updateSetting.value.lng=item.lng;
    updateSetting.value.city = item.city;
  }else{
    updateSetting.value={
      _id: '',
      title: '',
      words_0: '',
      words_1: '',
      lat: null,
      lng: null,
      city:updateSetting.value.city
    };
  }
  console.log(updateSetting);
}
const saveUpdateSetting= ()=>{
  let words:string[]=[];
  if(updateSetting.value.words_0) words.push(updateSetting.value.words_0);
  if(updateSetting.value.words_1) words.push(updateSetting.value.words_1);
  if(updateSetting.value.lat.split){
    let l = updateSetting.value.lat.split(",")
    if(l.length>1){
      updateSetting.value.lat = l[0]
      updateSetting.value.lng = l[1]
    }
  }
  
  store.updateLocations(updateSetting.value._id, updateSetting.value.title, words,
    updateSetting.value.lat, updateSetting.value.lng, updateSetting.value.city

  );
  store.fetchGetLocations();
}
</script>

<template>
  <div class="about">
    <h1>Locations</h1> 
    <select v-model="updateSetting.city">
      <option  v-for="city in store.getCities" :key="city.code" :value="city.code" >{{ city.title}}</option>

    </select>
    <button v-on:click="initUpdateSetting(null)">new</button>
    <br/>
    <input 
      v-model="filterText" 
      type="text">
      <hr>
  <div>
    id: {{updateSetting}}<br/>
    title: <input type="text" v-model="updateSetting.title" /><br/>
    word 0: <textarea type="text" v-model="updateSetting.words_0" /><br/>
    word 1: <textarea type="text" v-model="updateSetting.words_1" /><br/>
    lat: <input type="text" v-model="updateSetting.lat" /><br/>
    lng: <input type="text" v-model="updateSetting.lng" /><br/>
    <button v-on:click="saveUpdateSetting()">Save</button>

  </div>

    <ul v-for="arb in getLocations" :key="arb.id">
      <li>{{ arb.city}} - {{ arb.title}} {{ formatDate(arb.date) }}
      </li>

      <small v-for="word in arb.words" :key="word">
        <b>{{ word}} </b>,
      </small>
      <button @click="initUpdateSetting(arb)">edit</button>
  </ul>

  </div>
</template>

