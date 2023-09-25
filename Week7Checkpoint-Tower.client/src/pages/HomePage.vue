<template>
<div>
  <EventForm/>
</div>


<!-- <section class="row">
  <h1 class="text-center">My tickets</h1>
  <div v-for="ticket in myTickets" :key=ticket.id>
      <EventCard :event="ticket.event" />
  </div>
</section> -->


<section class="row gap-2 p-2 m-2">
  <h1 class="text-center">Event Categories</h1>
  <button class="btn col btn-success border-black border-1" @click="filterBy = ''">All Events</button>
  <button class="btn col btn-primary border-black border-1" @click="filterBy = 'concert'">Concerts</button>
  <button class="btn col btn-primary border-black border-1" @click="filterBy = 'convention'">Conventions</button>
  <button class="btn col btn-primary border-black border-1" @click="filterBy = 'sport'">Sports</button>
  <button class="btn col btn-primary border-black border-1" @click="filterBy = 'digital'">Digitals</button>
</section>

<Section class="row p-3 m-0">

  <div v-for="e in events" :key="e.id" class="col-6 col-md-3">
    <!-- <img :src="e.coverImg" alt="">
    {{ e.name }} -->
<EventCard :event="e"/>
  </div>


</Section>


</template>

<script>
import { computed, onMounted, ref, watch, watchEffect } from "vue";
import Pop from "../utils/Pop.js";
import { eventsService} from '../services/EventsService.js'
import {AppState} from '../AppState.js'
import EventCard from '../components/EventCard.vue';



export default {
  setup() {
    watchEffect(() => {
getEvents();
    });
    const filterBy = ref('')
    async function getEvents(){
try {
await eventsService.getEvents();
} catch (error) {
  Pop.error(error)
}
    }
    return {
      filterBy,
      events: computed(() =>{
        if(!filterBy.value){
          return AppState.events
        }else{
          return AppState.events.filter(event => event.type == filterBy.value)
        }
      }),
      myTickets: computed(() => AppState.myTickets)
    };
  },
components: {EventCard}
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
