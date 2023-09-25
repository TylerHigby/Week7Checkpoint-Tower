<template>
<div class="container-fluid">
  <section class="row">
    <div>
    <div><b>{{ ticket.profile.name }}</b></div>
    <img class="ticketimg" :src="ticket.profile.picture" alt="">
    </div>
  </section>
</div>
</template>

<script>
import { Ticket } from "../models/Ticket.js";

export default {
  props: {ticket: {type: Ticket, required: true}},
setup() {
  return {};
},
};
</script>


<style>
.ticketimg{
width:5%;
aspect-ratio: 1/1;
border-radius: 25px;
object-fit: cover;
}
</style>