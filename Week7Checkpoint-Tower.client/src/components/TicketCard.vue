<template>
<div class="container-fluid">
  <section class="row">
    <div>{{ ticket.ownerName }}</div>
    <img class="ticketimg" :src="ticket.ownerImg" alt="">
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
width:10%;
aspect-ratio: 1/1;
border-radius: 25px;
object-fit: cover;
}
</style>