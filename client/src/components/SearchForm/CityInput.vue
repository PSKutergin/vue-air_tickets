<script setup>
import { ref, computed } from "vue";
import { useCitiesStore } from "../../store/cities.js";

defineProps({
  placeholder: String,
});

const emit = defineEmits(["select"]);

const inputValue = ref("");
const showList = ref(false);
const cities = useCitiesStore();
const originCities = ref([]);

const handleInput = () => {
  filterCities();
};

const hideList = () => {
  showList.value = false;
};

const selectCity = (city) => {
  inputValue.value = city.name;
  showList.value = false;
  emit("select", city);
};

const filterCities = () => {
  const query = inputValue.value.toLowerCase();
  const allCities = cities.getCitiesAll;
  const filteredCities = allCities.filter(
    (city) => city.name && city.name.toLowerCase().startsWith(query)
  );
  originCities.value = filteredCities;
  showList.value = true;
};

const filteredCities = computed(() => {
  return originCities.value;
});
</script>

<template>
  <div class="city-input">
    <input
      v-model="inputValue"
      @input="handleInput"
      @blur="hideList"
      :placeholder="placeholder"
    />
    <ul v-if="filteredCities.length && showList" class="city-list">
      <li
        v-for="city in filteredCities"
        :key="city.code"
        @mousedown="selectCity(city)"
      >
        {{ city.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.city-input {
  position: relative;
  max-width: 300px;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;

  input {
    border: none;
    outline: none;
    width: 100%;
    padding: 5px;
    font-size: 16px;
    background: #f9f9f9;
  }
}

.city-list {
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  grid-template: 5px;

  li {
    padding: 5px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
