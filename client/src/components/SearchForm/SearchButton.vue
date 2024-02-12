<script setup>
const emit = defineEmits(["search"]);
</script>

<template>
  <button type="button" @click="() => emit('search')" class="btn-search">
    Поиск
  </button>
</template>

<style scoped lang="scss">
.btn-search {
  padding: 10px;
  background: #006dff;
  color: white;
  border-radius: 5px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:hover {
    background: #0044ff;
  }
}

@media (max-width: 519px) {
  .btn-search {
    width: 100%;
    max-width: 300px;
  }
}
</style>
