<script setup>
import TicketItem from "./TicketItem.vue";

defineProps({
  isOneWay: Boolean,
});
</script>

<template>
  <ul class="tickets-list">
    <TicketItem :isOneWay="isOneWay" />
  </ul>
</template>

<style scoped>
.tickets-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

@media (max-width: 910px) {
  .tickets-list {
    width: fit-content;
  }
}
</style>
