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
          <p>Date: {{ event.startDate.toLocaleDateString() }}</p>
          <p>Capacity: {{ event.capacity }}</p>
          <p>Tickets Remaining: {{ ticketsLeft }}</p>

          <p>Description: {{ event.description }}</p>
          <p>Cancelled: {{ event.isCanceled }}</p>


          
          
          <div v-if="!event.isCanceled">
  <button v-if="!hasTicket && user.isAuthenticated" :disabled="inProgress" @click="createTicket" role="button" class="btn btn-primary">Get a ticket!</button>
          <!-- FIXME for delete...pass id of ticket that the account/user has -->
          <button v-else-if="user.isAuthenticated" @click="deleteTicket()" role="button" >Refund Ticket</button>
          <button v-else disabled role="button" >Login to purchase ticket</button>
        </div>
        <!-- FIXME same idea for sold-out -->
      <div v-else>
        <span>CANCELLED</span>
      </div>

        </div>
      </section>
      <!-- //TODO - Add image/name of ticket holders -->
      <h1 class="text-center">Tickets</h1>
      <div class="col-12" v-for="ticket in tickets" :key="ticket.id">
        <!-- {{ ticket.ownerName }}
        <img  :src="ticket.ownerImg" alt=""> -->
        <TicketCard :ticket="ticket"/>
      </div>


      <!-- //SECTION - Comments -->
      <div class="container-fluid">
      <h1 class="text-center">Comments</h1>
      <div>
        <CommentForm/>
      </div>
      <div v-for="comment in comments" :key="comment.id">
          <!-- <p>Name:{{ comment.creatorName }}</p>
          <p>Comment:{{ comment.body }}</p> -->
          <CommentCard :comment="comment"/>
      </div>
    </div>
</div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { AppState } from '../AppState';
import {ticketsService} from '../services/TicketsService.js'

export default {
setup() {
  const inProgress = ref(false)
  const route = useRoute();
  watchEffect(() => {
    getEventById();
    getCommentsByEventId();
    getTicketsByEventId();
  });
async function getEventById(){
  try {
    await eventsService.getEventById(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}

async function getCommentsByEventId(){
try {
  await eventsService.getCommentsByEventId(route.params.eventId)
} catch (error) {
  Pop.error(error)
}
}

async function getTicketsByEventId(){
  try {
    await eventsService.getTicketsByEventId(route.params.eventId)
  } catch (error) {
    Pop.error(error)
  }
}


  return {
    user: computed(()=> AppState.user),
    event: computed(()=> AppState.activeEvent),
    comments: computed(()=> AppState.activeEventComments),
    tickets: computed(()=> AppState.activeEventTickets),
    hasTicket: computed(()=> AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)),
ticketsLeft: computed(()=>AppState.activeEvent.capacity-AppState.activeEvent.ticketCount),



async createTicket(){
  try {
    inProgress.value = true
    let ticketData = {eventId: route.params.eventId}
    await ticketsService.createTicket(ticketData)
    inProgress.value = false
  } catch (error) {
    Pop.error(error)
  }
}




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