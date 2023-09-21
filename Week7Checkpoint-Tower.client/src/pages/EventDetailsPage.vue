<template>
<div class="container-fluid">
    <!-- //SECTION - EventDetails -->
      <section v-if="event" class="row elevation-5">

        <div class="col-6 p-0">
          <img class="event-image" :src="event.coverImg" :alt="event.name + 'Image'">
        </div>

        <div class="col-6">
          <h1 class="text-center">{{ event.name }}</h1>
          <p>Event Type: {{ event.type }}</p>
          <p>Created By: {{ event.creatorName }}</p>
          <p>Location: {{ event.location }}</p>
          <p>Date: {{ event.startDate }}</p>
          <p>Capacity: {{ event.capacity }}</p>
          <p>Description: {{ event.description }}</p>
          <p>Cancelled: {{ event.isCanceled }}</p>
        </div>
      </section>
      <!-- //TODO - Add image/name of ticket holders -->
      <!-- //SECTION - Comments -->
      
</div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { AppState } from '../AppState';

export default {
setup() {
  const route = useRoute();
  watchEffect(() => {
  getEventById();
  });
async function getEventById(){
  try {
    await eventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}

  return {
    user: computed(()=> AppState.user),
    event: computed(()=> AppState.activeEvent),
    comments: computed(()=> AppState.activeEventComments),
    tickets: computed(()=> AppState.activeEventTickets),
    hasTicket: computed(()=> AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id))
  };
},
};
</script>


<style lang="scss" scoped>
.event-image{
  width: 100%;
  object-position: center;
  object-fit: cover;

}
</style>