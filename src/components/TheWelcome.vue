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
          {{ boost.title }},  apy: {{ (boost.apy*100).toFixed(1) }}% LP : {{ boost.lp_total_supply_usd.toFixed(0)}} $
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
<style>
.warning {
  background-color: rgba(255, 0, 0, 0.5); /* красный с 50% прозрачности */
  width: 200px;
  height: 200px;
  animation: fade 2s infinite alternate; /* Анимация, меняющая прозрачность */
}

@keyframes fade {
  from {
    background-color: rgba(255, 0, 0, 0.1); /* начальная прозрачность 50% */
  }
  to {
    background-color: rgba(255, 0, 0, 0.7); /* полная непрозрачность */
  }
}
</style>