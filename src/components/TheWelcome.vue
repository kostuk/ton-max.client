<script setup lang="ts">  
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { ref, onMounted, computed } from 'vue'
import { TreaderOrderTdo, useApiStore } from '@/stores/apiStore'
import moment from 'moment';

const store = useApiStore();
const getOrders = computed<any[]>(() => {
  return store.getOrders;
});
const getWalletStatus = computed<any>(() => {
  return store.getWalletStatus;
});
const getSettings = computed<any[]>(() => {
  return store.getSettings;
});
const getMaxBoosts = computed<any[]>(() => {
  return store.getMaxBoosts;
});
const formatDate = (date:string)=> {
      return moment(date).format('YYYY-MM-DD HH:mm');
    };
// lifecycle hooks
onMounted(() => {
  setInterval(()=>{
    store.fetchOrders();
    store.fetchMaxBoosts();
    store.fetchWalletStatus();

  },10_000);
  store.fetchOrders();
  store.fetchMaxBoosts();
  store.fetchWalletStatus();
  store.fetchSettings();
})
</script>

<template>

<WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Wallet</template>
    <ul>
      <li>
        updatedAt : {{ formatDate(getWalletStatus.updatedAt) }} 
        </li>
        <li>
          Bid In Ton : {{ getWalletStatus.bitInTon }} tons
        </li>
          <li>
            <span v-for="token in getWalletStatus.tokens" :key="token.symbol">
              {{ token.symbol }} : {{ token.balance.toFixed(3) }},

            </span>

          </li>
        </ul>


  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Orders</template>
    <h1 v-if="getOrders.length==0">Oreder Empty</h1>
    <div v-for="order in getOrders" :key="order.symbol">
      <ul>
          <li>
          symbol: {{ order.symbol }}, balance: {{ order.balance.toFixed(3) }}, buy Price: {{ order.buyPrice.toFixed(3) }}
        </li>
        <li> Low/ Current /  Price: {{ order.lowPrice?order.lowPrice.toFixed(3):'' }}
           <strong>{{ order.currentPrice?order.currentPrice.toFixed(3):'' }}</strong>  {{ order.hiPrice?order.hiPrice.toFixed(3):'' }}    </li>
        <li> Status: <strong>{{ order.status }}</strong> DEX: {{ order.dex_type }}     </li>
        <li>Profit:   {{ (100*(order.currentPrice-order.buyPrice)/order.buyPrice).toFixed(1) }}%     </li>
    </ul>
  </div>
</WelcomeItem>

 

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Max Boosts</template>
    <div v-for="boost in getMaxBoosts" :key="boost.symbol">
      <ul>
          <li>
          {{ boost.title }},  apy: {{ (boost.apy*100).toFixed(1) }}% 
        </li>
        <li> Started At: {{ formatDate(boost.start_time) }}, status: {{ boost.status }}, dex: {{ boost.type }}       </li>
    </ul>
    </div>


  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Setting</template>
    <ul>
      <li v-for="setting in getSettings" :key="setting.name">
        {{setting.name}}: {{ setting.value }}
         </li>
         </ul>


  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support </template>

  </WelcomeItem>
</template>
