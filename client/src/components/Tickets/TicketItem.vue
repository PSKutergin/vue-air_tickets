<script setup>
import { useTicketsStore } from "../../store/tickets";
import { useAirportsStore } from "../../store/airports.js";
import { useAirlinesStore } from "../../store/airlines.js";
import { useCitiesStore } from "../../store/cities.js";
import { formatDate, formatTime } from "../../helpers/formatDate.js";
import { secondsToText } from "../../helpers/secondsToText.js";
import { ref, watch } from "vue";

defineProps({
  isOneWay: Boolean,
});

const queryTickets = useTicketsStore();
const cities = useCitiesStore();
const airports = useAirportsStore();
const airlines = useAirlinesStore();
const tickets = ref([]);

watch(
  () => queryTickets,
  () => {
    tickets.value = queryTickets.getTicketsFiltered();
  },
  { deep: true }
);
</script>

<template>
  <li
    v-if="tickets.length"
    v-for="ticket in tickets"
    :key="ticket"
    class="ticket-item"
  >
    <div class="info-block">
      <p class="airline">
        Авиакомпания:
        <span>{{ airlines.getAirlineByCode(ticket.airline) }}</span>
      </p>
      <p class="flight">
        Рейс: <span>{{ ticket.flight_number }}</span>
      </p>
      <p class="price">{{ ticket.price }}₽</p>
    </div>
    <div class="main-block">
      <div class="route-block">
        <p class="city">
          {{ cities.getCityByCode(ticket.origin) }}
          <span class="city-airport">{{
            airports.getAirportByCode(ticket.origin_airport)
          }}</span>
        </p>
        <p class="time">
          В пути:
          <span>{{ secondsToText(ticket.duration_to) }}</span>
        </p>
        <p class="city">
          {{ cities.getCityByCode(ticket.destination) }}
          <span class="city-airport">{{
            airports.getAirportByCode(ticket.destination_airport)
          }}</span>
        </p>
      </div>
      <div class="date-block">
        <p>
          Дата:
          <span>{{ formatDate(ticket.departure_at) }}</span>
        </p>
        <p>
          Время вылета:
          <span>{{ formatTime(ticket.departure_at) }}</span>
        </p>
        <p>
          {{
            ticket.transfers
              ? `Количество пересадок: ${ticket.transfers}`
              : "Без пересадок"
          }}
        </p>
      </div>
      <div class="route-block" v-show="!isOneWay">
        <p class="city">
          {{ cities.getCityByCode(ticket.destination) }}
          <span class="city-airport">{{
            airports.getAirportByCode(ticket.destination_airport)
          }}</span>
        </p>
        <p class="time">
          В пути:
          <span>{{ secondsToText(ticket.duration_back) }}</span>
        </p>
        <p class="city">
          {{ cities.getCityByCode(ticket.origin) }}
          <span class="city-airport">{{
            airports.getAirportByCode(ticket.origin_airport)
          }}</span>
        </p>
      </div>
      <div class="date-block">
        <p>
          Дата:
          <span>{{ formatDate(ticket.return_at) }}</span>
        </p>
        <p>
          Время вылета:
          <span>{{ formatTime(ticket.return_at) }}</span>
        </p>
        <p>
          {{
            ticket.transfers
              ? `Количество пересадок: ${ticket.return_transfers}`
              : "Без пересадок"
          }}
        </p>
      </div>
    </div>
  </li>
  <div v-else class="no-tickets">Билетов с выбранными опциями нет</div>
</template>

<style scoped lang="scss">
.no-tickets {
  width: 638px;
  text-align: center;
}
.ticket-item {
  display: flex;
  gap: 15px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #f9f9f9;
    transform: scale(1.01);
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
  }
}

.info-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px;

  .airline {
    width: 130px;
    display: flex;
    align-items: center;
    gap: 3px;
    flex-direction: column;
    text-align: center;
  }

  .flight {
    font-size: 14px;
    font-weight: 400;
    color: #999;
  }

  .price {
    font-weight: bold;
    font-size: 20px;
  }
}

.main-block {
  width: 450px;
}
.route-block {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .time {
    font-size: 14px;
    font-weight: 400;
    color: #999;
  }

  .city {
    width: 120px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    font-size: 20px;
    font-weight: 700;

    .city-airport {
      font-size: 14px;
      font-weight: 400;
      color: #999;
    }
  }
}

.date-block {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 10px 0;
  font-size: 14px;
}

@media (max-width: 669px) {
  .ticket-item {
    flex-direction: column;
    padding: 8px;
  }

  .info-block {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }

  .route-block {
    border-top: 1px solid #ccc;
    padding-top: 10px;
  }
}

@media (max-width: 519px) {
  .main-block {
    width: 100%;
    max-width: 450px;
  }

  .route-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    align-items: start;

    .time {
      grid-row: 2/3;
      grid-column: 2/3;
      font-size: 12px;
    }
  }
}

@media (max-width: 419px) {
  .info-block {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    align-items: start;
    .airline {
      font-size: 12px;
    }

    .flight {
      font-size: 12px;
      grid-row: 2/3;
      grid-column: 2/3;
      text-align: right;
    }

    .price {
      font-size: 16px;
      text-align: right;
    }
  }

  .route-block {
    .city {
      font-size: 16px;

      .city-airport {
        font-size: 11px;
      }
    }

    .time {
      font-size: 11px;
    }
  }

  .date-block {
    font-size: 12px;
    p {
      span {
        white-space: pre;
      }
    }
  }
}
</style>
