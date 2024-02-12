<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(["closePopup"]);

defineProps({
  errorText: String,
});
</script>

<template>
  <div class="popup">
    <div class="popup-error">
      <h3 class="popup-error__title">Ошибка!</h3>
      <p class="popup-error__text">{{ errorText }}</p>
      <div class="popup-close" @click="() => emit('closePopup')">
        <XMarkIcon />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popup {
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;

  .popup-error {
    width: 420px;
    padding: 30px;
    border-radius: 20px;
    background: #fff;
    transition: all 1s;
    position: relative;

    &__title {
      text-align: center;
    }

    &__text {
      margin-top: 20px;
      text-align: center;
    }
  }

  .popup-close {
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
