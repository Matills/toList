<template>
  <nav class="bg-background-primary shadow-sm">
    <div class="flex justify-between items-center h-16 px-4">
      <div class="flex-shrink-0">
        <h1 class="text-2xl font-bold text-text-primary">toList</h1>
      </div>

      <div class="flex items-center space-x-6">
        <button class="flex items-center gap-1 bg-success text-text-primary px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm h-6">
          <Plus class="h-3 w-3" />
          <span class="font-medium leading-none">LOG</span>
          <div class="w-px h-3 bg-text-primary opacity-50"></div>
          <ChevronDown class="h-3 w-3" />
        </button>

        <a href="#" class="text-text-secondary hover:text-text-primary transition-colors uppercase text-sm font-medium">
          Lists
        </a>

        <div class="relative">
          <button 
            @click="toggleSearch"
            class="p-2 text-text-secondary hover:text-text-primary transition-colors"
            v-if="!isSearchExpanded"
          >
            <Search class="h-5 w-5" />
          </button>

          <div 
            v-if="isSearchExpanded"
            class="flex items-center space-x-2"
          >
            <input
              ref="searchInput"
              type="text"
              placeholder="Search series, movies..."
              class="w-64 pl-3 pr-10 py-2 bg-background-secondary border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              v-model="searchQuery"
            />
            <button 
              @click="closeSearch"
              class="p-1 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
        </div>

        <div class="w-px h-6 bg-border"></div>

        <div class="flex items-center space-x-2">
          <div v-if="!isLoggedIn">
            <a href="#" class="text-text-secondary hover:text-text-primary transition-colors">
              Sign in
            </a>
            <button class="bg-primary text-text-primary px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-2">
              Sign up
            </button>
          </div>
          <div v-else>
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-background-secondary rounded-full flex items-center justify-center">
                <User class="h-4 w-4 text-text-secondary" />
              </div>
              <span class="text-text-primary text-sm">{{ username }}</span>
              <ChevronDown class="h-4 w-4 text-text-secondary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Search, Plus, User, X, ChevronDown } from 'lucide-vue-next'

const isLoggedIn = ref(false)
const username = ref('example11')

const isSearchExpanded = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement>()

const toggleSearch = () => {
  isSearchExpanded.value = true
  nextTick(() => {
    searchInput.value?.focus()
  })
}

const closeSearch = () => {
  isSearchExpanded.value = false
  searchQuery.value = ''
}
</script> 