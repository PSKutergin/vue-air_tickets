<script setup>
import { onMounted, ref, watch } from "vue";
import { useCitiesStore } from "./store/cities.js";
import { useTicketsStore } from "./store/tickets";
import { useAirportsStore } from "./store/airports";
import { useAirlinesStore } from "./store/airlines";
import SearchForm from "./components/SearchForm/SearchForm.vue";
import FilterForm from "./components/FilterForm/FilterForm.vue";
import TicketsList from "./components/Tickets/TicketsList.vue";
import PopupError from "./components/Popup/PopupError.vue";

const token = "b060afdc4b6c296653c6a16c277c53ef";
const cities = useCitiesStore();
const airports = useAirportsStore();
const airlines = useAirlinesStore();
const tickets = useTicketsStore();
const isOneWay = ref(true);
const ticketsAll = ref([]);
const isError = ref(false);
const errorText = ref("");

const getTicketsList = async (originCode, destinationCode, oneWay) => {
  try {
    await tickets.getTicketsFromApi({
      token: token,
      origin: originCode,
      destination: destinationCode,
      oneWay: oneWay,
    });

    isOneWay.value = oneWay;
  } catch (error) {
    errorText.value = error.message;
    isError.value = true;
  }
};

const closePopup = () => {
  isError.value = false;
};

watch(
  () => tickets,
  () => {
    ticketsAll.value = tickets.getTicketsAll;
  },
  { deep: true }
);

onMounted(async () => {
  try {
    await cities.getCitiesFromApi();
    await airports.getAirportsFromApi();
    await airlines.getAirlinesFromApi();
  } catch (error) {
    errorText.value = `Ошибка в хуке mounted: ${error}`;
    isError.value = true;
  }
});
</script>

<template>
  <div class="layout">
    <SearchForm @search="getTicketsList" />
    <div v-show="ticketsAll.length" class="result">
      <FilterForm />
      <TicketsList :isOneWay="isOneWay" />
    </div>
  </div>
  <PopupError
    v-show="isError"
    :errorText="errorText"
    @close-popup="closePopup"
  />
</template>

<style scoped lang="scss">
.layout {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 100%;
  align-items: center;
}

.result {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

@media (max-width: 910px) {
  .result {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
}
</style>
