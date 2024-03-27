<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SearchBox from './components/SearchBox.vue';
import Modal from './components/Modal.vue';
import Tasks from './components/Tasks.vue';
import { taskRequest } from './services/taskRequest';

onMounted(() => {
  taskRequest({ method: 'GET' });
});

const isOpen = ref(false);

function modalSwitch() {
  isOpen.value = !isOpen.value;
}
</script>
<template>
  <div>
    <div class="border-b border-green p-4 text-center">
      <SearchBox />
    </div>
    <Tasks />
    <Modal
      v-show="isOpen"
      @close-modal="modalSwitch"
    />
    <button
      class="fixed bottom-5 right-5 grid h-20 w-20 place-content-center rounded-full bg-green text-8xl text-white"
      @click="modalSwitch()"
    >
      <p class="mb-3">
        +
      </p>
    </button>
  </div>
</template>
<style>
html {
  overflow-x: hidden;
}

body {
  background-color: #222;
}
</style>
