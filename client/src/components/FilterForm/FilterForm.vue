<script setup>
import MultiSelect from "primevue/multiselect";
import { computed, ref, watch } from "vue";
import { useTicketsStore } from "../../store/tickets";

const queryTickets = useTicketsStore();
const airlines = computed(() => queryTickets.getAirlinesFromTickets());
const airportsOrigin = computed(() => queryTickets.getAirportsByOrigin());
const airportsDestination = computed(() =>
  queryTickets.getAirportsByDestination()
);
const selectedAirlines = ref([]);
const selectedAirportsOrigin = ref([]);
const selectedAirportsDestination = ref([]);
const minPrice = ref(0);
const maxPrice = ref(0);
const minPriceValue = ref(0);
const maxPriceValue = ref(0);
const sliderTrackStyle = ref({});
const sliderMaxValue = ref(0);

const handleAirportsOriginChange = () => {
  queryTickets.setFilterAirportsOrigin(selectedAirportsOrigin.value);
};

const handleAirportsDestinationChange = () => {
  queryTickets.setFilterAirportsDestination(selectedAirportsDestination.value);
};

const handleAirlinesChange = () => {
  queryTickets.setFilterAirlines(selectedAirlines.value);
};

const handleMinPriceChange = (event) => {
  minPriceValue.value = parseInt(event.target.value);
  queryTickets.setFilterMinPrice(minPriceValue.value);
};

const handleMaxPriceChange = (event) => {
  maxPriceValue.value = parseInt(event.target.value);
  queryTickets.setFilterMaxPrice(maxPriceValue.value);
};

const setRangeSlider = () => {
  let minGap = 100;

  sliderMaxValue.value = maxPrice.value - minPrice.value;

  if (+minPriceValue.value > +maxPriceValue.value)
    minPriceValue.value = +maxPriceValue.value - minGap;
  if (+maxPriceValue.value <= +minPriceValue.value)
    maxPriceValue.value = +minPriceValue.value + minGap;
  if (+minPriceValue.value < minPrice.value)
    minPriceValue.value = minPrice.value;
  if (+maxPriceValue.value > maxPrice.value)
    maxPriceValue.value = maxPrice.value;

  fillColor();
};

const fillColor = () => {
  let percent1 =
    ((minPriceValue.value - minPrice.value) / sliderMaxValue.value) * 100;
  let percent2 =
    ((maxPriceValue.value - minPrice.value) / sliderMaxValue.value) * 100;

  sliderTrackStyle.value = {
    background: `linear-gradient(to right, #999 ${percent1}%, #006dff ${percent1}%, #006dff ${percent2}%, #999 ${percent2}%)`,
  };
};

watch([minPrice, maxPrice], () => {
  minPriceValue.value = minPrice.value;
  maxPriceValue.value = maxPrice.value;
  fillColor();
});

watch(selectedAirlines, handleAirlinesChange);
watch(selectedAirportsOrigin, handleAirportsOriginChange);
watch(selectedAirportsDestination, handleAirportsDestinationChange);

watch(
  () => queryTickets,
  () => {
    minPrice.value = queryTickets.getMinPriceTickets();
    maxPrice.value = queryTickets.getMaxPriceTickets();
    sliderMaxValue.value = maxPrice.value - minPrice.value;
  },
  { deep: true }
);
</script>

<template>
  <div class="filter-form">
    <MultiSelect
      v-model="selectedAirlines"
      :options="airlines"
      :maxSelectedLabels="3"
      placeholder="Авиакомпании"
      class="multi-select"
      @change="handleAirlinesChange"
    />

    <MultiSelect
      v-model="selectedAirportsOrigin"
      :options="airportsOrigin"
      :maxSelectedLabels="3"
      placeholder="Аэропорты отправления"
      class="multi-select"
      @change="handleAirportsOriginChange"
    />

    <MultiSelect
      v-model="selectedAirportsDestination"
      :options="airportsDestination"
      :maxSelectedLabels="3"
      placeholder="Аэропорты назначения"
      class="multi-select"
      @change="handleAirportsDestinationChange"
    />

    <div class="range-slider">
      <h4 class="slider-title">Стоимость билета:</h4>
      <div class="range-values">
        <p>{{ minPriceValue }}₽</p>
        <p>{{ maxPriceValue }}₽</p>
      </div>
      <div class="price-range">
        <div class="slider-track" :style="sliderTrackStyle"></div>
        <input
          type="range"
          v-model="minPriceValue"
          :min="minPrice"
          :max="maxPrice"
          step="10"
          @input="setRangeSlider"
          @change="handleMinPriceChange"
        />
        <input
          type="range"
          v-model="maxPriceValue"
          :min="minPrice"
          :max="maxPrice"
          step="10"
          @input="setRangeSlider"
          @change="handleMaxPriceChange"
        />
      </div>
    </div>
  </div>
</template>

<style src="primevue/resources/primevue.min.css"></style>
<style lang="scss" scoped>
.filter-form {
  padding: 10px;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.multi-select {
  width: 100%;
  padding: 5px;
  font-size: 14px;
}

.range-slider {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  position: relative;
  height: 50px;

  .range-values {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    p {
      font-size: 14px;
      color: #999;
    }
  }

  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: none;
    position: absolute;
    margin: auto;
    left: 0;
    bottom: -6px;
    background-color: transparent;
    pointer-events: none;
  }

  .slider-track {
    width: 100%;
    height: 12px;
    background: #999;
    border-radius: 8px;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
  }

  input[type="range"]::-moz-range-track {
    -moz-appearance: none;
    height: 5px;
  }

  input[type="range"]::-ms-track {
    appearance: none;
    height: 5px;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #006dff;
    margin-top: -14px;
    pointer-events: auto;
  }

  input[type="range"]::-moz-slider-thumb {
    -moz-appearance: none;
    height: 20px;
    width: 20px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #006dff;
    border: none;
    pointer-events: auto;
  }

  input[type="range"]::-ms-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #006dff;
    pointer-events: auto;
  }
}

@media (max-width: 910px) {
  .filter-form {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  .range-slider {
    grid-column: 1 / 3;
  }
}

@media (max-width: 669px) {
  .filter-form {
    grid-template-columns: repeat(1, 1fr);
  }

  .range-slider {
    grid-column: 1 / 2;
  }
}
</style>
