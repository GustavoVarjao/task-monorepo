<script setup lang="ts">
import { reactive } from 'vue';
import { taskData, taskRequest } from '../services/taskRequest';

const taskEditedData = reactive({
  title: '',
  description: '',
  isEditModeOn: false,
});

function openEditMode(index: number) {
  if (taskEditedData.isEditModeOn) return;

  const { title, description } = taskData.value[index];

  Object.assign(taskEditedData, {
    title,
    description,
    isEditModeOn: true,
  });

  taskData.value[index].isEditing = true;
}

function closeEditMode(index: number) {
  taskEditedData.isEditModeOn = false;

  taskData.value[index].isEditing = false;
}

async function sendEditedTask(index: number, id: string) {
  const { title, description } = taskEditedData;
  if (title === '' && description === '') return;

  await taskRequest({
    method: 'PUT',
    taskBody: {
      title,
      description,
    },
    id,
  });

  closeEditMode(index);
}
</script>

<template>
  <ul class="grid h-auto w-screen place-content-center py-5">
    <li
      v-for="(
        {
          title,
          description,
          createdAt,
          updatedAt,
          completedAt,
          id,
          isEditing,
        },
        index
      ) in taskData"
      :key="index"
      class="my-5 h-auto w-160 rounded bg-dark-gray"
    >
      <div class="flex w-160 place-content-between p-4">
        <h2
          v-if="!isEditing"
          class="h-7 text-2xl font-bold text-white"
        >
          {{ title }}
        </h2>
        <input
          v-else
          v-model="taskEditedData.title"
          type="text"
          class="h-7 bg-dark-gray pt-1 text-2xl font-bold text-lighter-gray focus:outline-none"
        >
        <div class="flex space-x-1">
          <button>
            <img
              :src="`/src/assets/img/${isEditing ? 'editing' : 'edit'}.svg`"
              class="h-7 w-7 rounded"
              @click="openEditMode(index)"
            >
          </button>
          <button @click="taskRequest({ method: 'PATCH', id })">
            <img
              :src="`/src/assets/img/${
                completedAt ? 'uncomplete' : 'complete'
              }.svg`"
              class="h-7 w-7 rounded"
            >
          </button>
          <button @click="taskRequest({ method: 'DELETE', id })">
            <img
              src="../assets/img/delete.svg"
              class="h-7 w-7 rounded"
            >
          </button>
        </div>
      </div>
      <div class="m-4 rounded bg-gray px-4 py-2">
        <div
          v-if="!isEditing"
          class="text-white"
        >
          {{ description }}
        </div>
        <textarea
          v-else
          v-model="taskEditedData.description"
          type="text"
          class="w-full resize-none rounded bg-gray text-lighter-gray focus:outline-none"
          rows="4"
          cols="50"
        />
      </div>
      <div
        v-if="!isEditing"
        class="flex place-content-between p-4"
      >
        <p class="text-green">
          criada dia: {{ createdAt }}
        </p>
        <p
          v-if="updatedAt"
          class="text-green"
        >
          editada dia: {{ updatedAt }}
        </p>
        <p
          v-if="completedAt"
          class="text-green"
        >
          completada dia: {{ completedAt }}
        </p>
      </div>
      <div
        v-else
        class="mx-32 mb-4 mt-6 flex justify-between"
      >
        <button
          class="w-40 rounded-lg bg-light-gray text-2xl text-white"
          @click="closeEditMode(index)"
        >
          CANCELAR
        </button>
        <button
          class="w-40 rounded-lg bg-green text-2xl text-white"
          @click="sendEditedTask(index, id)"
        >
          ENVIAR
        </button>
      </div>
    </li>
  </ul>
</template>
