<template >

<p  class="text-center m-3">
  <button class="btn btn-warning text-center border-black border-1" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Create an Event!
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="m-5 card card-body">

    <div class="container">
  <h1 class="text-center">Event Details</h1>
  <form class="row" @submit.prevent="createEvent">
    <div class="p-2">
      <label for="event-name">Name:</label>
      <input class="form-control" id="event-name" v-model="eventData.name" type="text"  required>
    </div>
    <div class="p-2">
      <label for="event-category">Category:</label>
      <select class="form-control" v-model="eventData.type" id="event-category" required>
        <option disabled value="">Please select a category</option>
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
    </div>
    <div class="p-2">
      <label for="">Location: </label>
      <input class="form-control" v-model="eventData.location" type="text" required>
    </div>
    <div class="p-2">
      <label for="">Description: </label>
      <input class="form-control" v-model="eventData.description" type="text" name="" id="" required>
    </div>
    <div class="p-2">
      <label for="">Capacity:</label>
      <input class="form-control" v-model="eventData.capacity" type="number" name="" id="" required>
    </div>
    <div class="p-2">
      <label for="album-cover">Cover Image:</label>
      <input class="form-control" v-model="eventData.coverImg" type="url" required>
    </div>
    <div class="p-2">
      <label for="">Start date: </label>
      <input class="form-control" v-model="eventData.startDate" type="Date" required>
    </div>
    <div class="p-3">
    <button class="btn btn-primary">submit</button>
    </div>
  </form>
</div>


  </div>
</div>



</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";

export default {
setup() {
  const eventData = ref({})
  const router = useRouter()
  return {
    eventData,
    async createEvent(){
      try {
        let newEvent = await eventsService.createEvent(eventData.value)
        Pop.toast('Event Created','success')
        router.push({name: 'Event Details', params: { eventId: newEvent.id}})
      } catch (error) {
        Pop.error(error)
      }
    }
  };
},
};
</script>


<style>
</style>