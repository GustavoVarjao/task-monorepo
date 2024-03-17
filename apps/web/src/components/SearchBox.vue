<script setup lang="ts">
import { ref } from 'vue';
import { taskRequest } from '../services/taskRequest';

const searchTerm = ref('');
</script>

<template>
  <div class="flex justify-center">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="procurar tarefas"
      class="h-10 w-1/3 rounded-l-full bg-dark-gray p-1 pl-4 text-white focus:outline-none"
    />
    <button
      class="h-10 w-10 rounded-r-full bg-dark-gray text-center"
      @click="
        taskRequest({
          method: 'GET',
          searchTerm,
        })
      "
    >
      <img src="../assets/img/search.svg" class="h-6 w-6" />
    </button>
  </div>
</template>
