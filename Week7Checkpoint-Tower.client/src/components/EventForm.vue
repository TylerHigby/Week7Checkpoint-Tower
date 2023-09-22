<template>
<div class="container-fluid">
  
  <h1>Create an event!</h1>
  <form class="row" @submit.prevent="createEvent">
    <div>
      <label for="event-name">Name</label>
      <input  id="event-name" v-model="eventData.name" type="text" placeholder="Event title" required>
    </div>
    <div>
      <label for="event-category">Category</label>
      <select class="" v-model="eventData.category" id="event-category" required>
        <option disabled value="">please select a category</option>
        <option value="concert">Concert</option>
        <option value="convention">Convention</option>
        <option value="sport">Sport</option>
        <option value="digital">Digital</option>
      </select>
    </div>
    <div>
      <label for="">location</label>
      <input v-model="eventData.location" type="text" required>
    </div>
    <div>
      <label for="">description</label>
      <input v-model="eventData.description" type="text" name="" id="" required>
    </div>
    <div>
      <label for="">capacity</label>
      <input v-model="eventData.capacity" type="number" name="" id="" required>
    </div>
    <div>
      <label for="album-cover">Cover Image</label>
      <input v-model="eventData.coverImg" type="url" required>
    </div>
    <div>
      <label for="">startDate</label>
      <input v-model="eventData.startDate" type="Date" required>
    </div>
    <button>submit</button>
  </form>
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