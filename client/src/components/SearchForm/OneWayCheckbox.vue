<script setup>
import { ref } from "vue";

const emit = defineEmits(["updateOneWay"]);
const props = defineProps({
  oneWay: Boolean,
});

const isChecked = ref(props.oneWay);

const handleChange = () => {
  emit("updateOneWay", isChecked.value);
};
</script>

<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      id="oneWayCheckbox"
      v-model="isChecked"
      @change="handleChange"
    />
    <label class="form-check-label" for="oneWayCheckbox">
      В одну сторону
    </label>
  </div>
</template>

<style scoped lang="scss">
.form-check {
  display: flex;
  align-items: center;
  gap: 5px;
}

.form-check-input {
  width: 15px;
  height: 15px;
  cursor: pointer;
}

.form-check-label {
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  color: #5d5d5d;
}
</style>
