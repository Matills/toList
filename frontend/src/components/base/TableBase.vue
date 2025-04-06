<template>
  <div class="overflow-x-auto">
    <table :class="['min-w-full divide-y divide-gray-700', className]">
      <thead class="bg-gray-800">
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            :class="[
              'px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider',
              column.className || '',
            ]"
          >
            {{ column.title }}
          </th>
          <th v-if="hasActions" scope="col" class="relative px-6 py-3">
            <span class="sr-only">Acciones</span>
          </th>
        </tr>
      </thead>
      <tbody class="bg-dark-bg divide-y divide-gray-700">
        <template v-if="data.length">
          <tr
            v-for="(item, rowIndex) in data"
            :key="rowIndex"
            :class="[
              'hover:bg-gray-800 transition-colors',
              rowClassName && rowClassName(item, rowIndex),
            ]"
          >
            <td
              v-for="(column, colIndex) in columns"
              :key="colIndex"
              :class="[
                'px-6 py-4 whitespace-nowrap text-sm text-white',
                column.cellClassName || '',
              ]"
            >
              <slot
                :name="`cell(${column.key})`"
                :value="item[column.key]"
                :item="item"
                :index="rowIndex"
              >
                {{ item[column.key] }}
              </slot>
            </td>
            <td
              v-if="hasActions"
              class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
              <slot name="actions" :item="item" :index="rowIndex"></slot>
            </td>
          </tr>
        </template>
        <tr v-else>
          <td
            :colspan="hasActions ? columns.length + 1 : columns.length"
            class="px-6 py-4 text-center text-sm text-gray-400"
          >
            <slot name="empty"> No hay datos disponibles </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed, useSlots } from "vue";

const slots = useSlots();

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  rowClassName: {
    type: Function,
    default: null,
  },
  className: {
    type: String,
    default: "",
  },
});

const hasActions = computed(() => !!slots.actions);
</script>
