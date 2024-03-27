<script setup lang="ts">
import { reactive, ref } from 'vue';
import { taskRequest } from '../services/taskRequest';

const emit = defineEmits(['closeModal']);

const isInputEmpty = ref(false);

function closeModal() {
  emit('closeModal');
  isInputEmpty.value = false;
}

const postFormInitialState = {
  title: '',
  description: '',
};

const postForm = reactive({ ...postFormInitialState });

function sendPostForm() {
  const { title, description } = postForm;
  if (title === '' || description === '') {
    isInputEmpty.value = true;
    return;
  }

  taskRequest({
    method: 'POST',
    taskBody: {
      title,
      description,
    },
  });

  Object.assign(postForm, postFormInitialState);

  closeModal();
}
</script>

<template>
  <div
    class="fixed left-0 top-0 z-10 grid h-screen w-screen place-content-center bg-black bg-opacity-60"
  >
    <div class="h-112 w-128 rounded-lg bg-dark-gray text-center">
      <h1 class="m-5 text-3xl font-bold text-white">
        CRIAR TAREFA
      </h1>
      <form
        method="post"
        @submit.prevent="sendPostForm"
        @keydown.enter.prevent="sendPostForm"
      >
        <input
          v-model="postForm.title"
          type="text"
          placeholder="nome"
          class="mt-5 h-10 w-3/4 rounded-full bg-gray p-1 pl-4 text-white focus:outline-none"
        >
        <textarea
          v-model="postForm.description"
          rows="6"
          cols="50"
          placeholder="descrição"
          class="mt-5 w-3/4 resize-none rounded-3xl bg-gray p-1 pl-4 pt-3 text-white focus:outline-none"
        />
        <p
          v-show="isInputEmpty"
          class="text-lg text-red"
        >
          OS DOIS CAMPOS SÃO OBRIGATÓRIOS
        </p>
        <div class="mx-auto my-10 flex h-10 w-3/4 justify-between">
          <button
            type="button"
            class="w-40 rounded-lg bg-light-gray text-2xl text-white"
            @click="closeModal()"
          >
            CANCELAR
          </button>
          <button
            type="submit"
            class="w-40 rounded-lg bg-green text-2xl text-white"
          >
            CRIAR
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
