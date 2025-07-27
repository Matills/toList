<template>
  <nav class="bg-background-primary shadow-sm">
    <div class="flex justify-between items-center h-16 px-4">
      <div class="flex-shrink-0">
        <h1 class="text-2xl font-bold text-text-primary">toList</h1>
      </div>

      <div class="flex items-center space-x-6">
        <Button variant="success" size="sm" class="gap-1">
          <Plus class="h-3 w-3" />
          <span class="font-medium leading-none">LOG</span>
          <div class="w-px h-3 bg-text-primary opacity-50"></div>
          <ChevronDown class="h-3 w-3" />
        </Button>

        <a href="#" class="text-text-secondary hover:text-text-primary transition-colors text-sm font-medium">
          LISTS
        </a>

        <div class="relative">
          <Button 
            variant="ghost" 
            size="sm"
            @click="toggleSearch"
            v-if="!isSearchExpanded"
          >
            <Search class="h-5 w-5" />
          </Button>

          <div 
            v-if="isSearchExpanded"
            class="flex items-center space-x-2"
          >
            <Input
              v-model="searchQuery"
              type="search"
              placeholder="Search series, movies..."
              size="md"
              class="w-64"
              ref="searchInputRef"
            />
            <Button 
              variant="ghost" 
              size="sm"
              @click="closeSearch"
            >
              <X class="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div class="w-px h-6 bg-border"></div>

        <div class="flex items-center space-x-2">
          <div v-if="!isLoggedIn">
            <a href="#" class="text-text-secondary hover:text-text-primary transition-colors">
              SIGN IN
            </a>
            <Button variant="primary" size="md" class="ml-2">
              SIGN UP
            </Button>
          </div>
          <div v-else>
            <div class="flex items-center space-x-2">
              <Avatar size="md" />
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
import { Search, Plus, X, ChevronDown } from 'lucide-vue-next'
import { Button, Input, Avatar } from './base'

const isLoggedIn = ref(false)
const username = ref('')

const isSearchExpanded = ref(false)
const searchQuery = ref('')
const searchInputRef = ref<InstanceType<typeof Input>>()

const toggleSearch = () => {
  isSearchExpanded.value = true
  nextTick(() => {
    searchInputRef.value?.focus()
  })
}

const closeSearch = () => {
  isSearchExpanded.value = false
  searchQuery.value = ''
}
</script> 