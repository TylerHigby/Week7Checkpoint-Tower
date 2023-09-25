<template>
<div class="container-fluid">
    <!-- //SECTION - EventDetails -->
      <section v-if="event" class="row elevation-5 bg-white">




        <div class="col-md-6 col-12 p-0 ">
          <img class="event-image" :src="event.coverImg" :alt="event.name + 'Image'">
        </div>

        <div class="col-12 col-md-6">

<div class="text-center mt-3">
  <button v-if="event.creatorId == account.id" :disabled="event.isCanceled == true" @click="cancelEvent()" class="btn btn-danger">
      Cancel Event
  </button>
</div>

          <h1 class="text-center mt-3">{{ event.name }}</h1>
          <p class="p-2 ms-5">Event Type: {{ event.type }}</p>
          <p class="p-2 ms-5">Created By: {{ event.creatorName }}</p>
          <p class="p-2 ms-5">Location: {{ event.location }}</p>
          <p class="p-2 ms-5">Date: {{ event.startDate.toLocaleDateString() }}</p>
          <p class="p-2 ms-5">Capacity: {{ event.capacity }}</p>
          <p class="p-2 ms-5 text-danger" v-if="ticketsLeft == 0" > Tickets Remaining: Sold Out</p>
          <p class="p-2 ms-5" v-else>Tickets Remaining: {{ ticketsLeft }}</p>

          <p class="p-2 ms-5">Description: {{ event.description }}</p>


          <p v-if="event.isCanceled == true" class=" p-2 ms-5 text-danger"> Sorry, this event has been cancelled <i class="mdi mdi-emoticon-frown"></i></p>
          <p v-else class="text-success p-2 ms-5">Event is still happening! See you there!</p>

          
          
          <div class="text-center mb-3" v-if="!event.isCanceled">
  <button v-if="!hasTicket && user.isAuthenticated && ticketsLeft > 0" :disabled="inProgress" @click="createTicket" role="button" class="btn btn-primary">Get a ticket!</button>
          <!-- FIXME for delete...pass id of ticket that the account/user has -->
          <button v-else-if="user.isAuthenticated && ticketsLeft > 0" @click="deleteTicket" role="button" class="btn btn-danger">Refund Ticket</button>
          <button v-else-if="!user.isAuthenticated"  disabled role="button" class="btn btn-primary">Login to purchase ticket</button>
          <button v-else-if="event.isCanceled" class="text-danger">sorry the event has been cancelled</button>
          <button v-else class="text-danger">Sorry the event is sold out</button>
        </div>
        <!-- FIXME same idea for sold-out -->
      <div v-else>
        <span>CANCELLED</span>
      </div>
      <!-- <div>
        <button v-if="event.creatorId == account.id">hello</button>
        <button v-else>hi</button>
      </div> -->

        </div>
      </section>
      <h1 class="text-center container mt-5">Tickets</h1>
      <div class="col-12 container" v-for="ticket in tickets" :key="ticket.id">
        <!-- {{ ticket.ownerName }}
        <img  :src="ticket.ownerImg" alt=""> -->
        <TicketCard class="row" :ticket="ticket"/>
      </div>


      <!-- //SECTION - Comments -->
      <div class="container-fluid">
      <h1 class="text-center m-3">Comments</h1>
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
import { computed, popScopeId, ref, watchEffect } from "vue";
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
    account: computed(() => AppState.account),
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
},

async deleteTicket(){
  try {
    let ticket = AppState.activeEventTickets.find(ticket => ticket.accountId == AppState.account.id)
    await ticketsService.deleteTicket(ticket.id)
  } catch (error) {
    Pop.error(error)
  }
},

async cancelEvent(){
try {
  let event = AppState.activeEvent
if (await Pop.confirm ('do u want to cancel the event?')){
  await eventsService.cancelEvent(event)
  Pop.success('cancelled event')
}
// if(await Pop.confirm()){
//   await eventsService.cancelEvent(route.params.id)
// }
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
  height: 100%;
  object-position: center;
  object-fit: cover;
}

</style>