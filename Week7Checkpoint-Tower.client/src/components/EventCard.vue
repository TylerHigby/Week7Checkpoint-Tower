<template>
<router-link :to="{path: `events/${event.id}`}">
<div class="elevation-5 rounded album-card">
  <img :src="event.coverImg" alt="" class="rounded">
  <div class="text-center text-black m-0 p-0 fw-bold">
    <p>{{ event.name }}</p>
  </div>
</div>
</router-link>
</template>

<script>
import { TowerEvent } from "../models/Event.js";

export default {
  props: {event: {type: TowerEvent||Object, required: true}},
setup() {
  return {};
},
};
</script>


<style lang="scss" scoped>
.album-card{
  img{
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
  }
}
</style>