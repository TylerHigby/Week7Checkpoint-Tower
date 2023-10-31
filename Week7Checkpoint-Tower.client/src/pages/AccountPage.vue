<template>
  <div class="about text-center m-3">
    <h1 class="p-3">Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <!-- FIXME when passing ticets as props to eventcard component...make sure you are digging into the nested event....ticket.event -->

    <section class="row">
      <h1 class="text-center p-3">My tickets</h1>
      <div v-for="ticket in myTickets" :key=ticket.id>
        <EventCard :event="ticket.event" />
      </div>
    </section>


  </div>
</template>

<script>
import { computed, onMounted, popScopeId, watchEffect } from 'vue';
import { AppState } from '../AppState';
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";
import EventCard from '../components/EventCard.vue';

export default {
  setup() {
    watchEffect(() => {
      getMyTickets();
    });
    async function getMyTickets() {
      try {
        await accountService.getMyTickets()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
      myTickets: computed(() => AppState.myTickets)
    }
  },
  component: { EventCard }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
