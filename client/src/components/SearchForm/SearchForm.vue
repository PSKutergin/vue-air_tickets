<script setup>
import { ref } from "vue";
import CityInput from "./CityInput.vue";
import OneWayCheckbox from "./OneWayCheckbox.vue";
import SearchButton from "./SearchButton.vue";

const emit = defineEmits(["search"]);

const origin = ref("");
const originCode = ref("");
const destination = ref("");
const destinationCode = ref("");
const oneWay = ref(true);
const originCities = ref([]);
const destinationCities = ref([]);

const selectCity = (input, city) => {
  if (input === "origin") {
    origin.value = city.name;
    originCode.value = city.code;
  } else if (input === "destination") {
    destination.value = city.name;
    destinationCode.value = city.code;
  }
};

const search = () => {
  emit("search", originCode.value, destinationCode.value, oneWay.value);
};

const updateOneWay = (value) => {
  oneWay.value = value;
};
</script>

<template>
  <div class="form">
    <div class="form-group">
      <div class="form-inputs">
        <CityInput
          :cities="originCities"
          v-model="origin"
          @select="selectCity('origin', $event)"
          placeholder="Пункт отправления"
        />
        <CityInput
          :cities="destinationCities"
          v-model="destination"
          @select="selectCity('destination', $event)"
          placeholder="Пункт назначения"
        />
      </div>
      <OneWayCheckbox :oneWay="oneWay" @update-one-way="updateOneWay" />
    </div>
    <SearchButton @search="search" />
  </div>
</template>

<style scoped lang="scss">
.form {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
}
.form-group {
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-inputs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

@media (max-width: 519px) {
  .form {
    flex-direction: column;
    align-items: center;
  }

  .form-group {
    max-width: 300px;
  }

  .form-inputs {
    flex-direction: column;
  }
}
</style>
