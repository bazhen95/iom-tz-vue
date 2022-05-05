<script setup>
import { useStore } from 'vuex';
import TreeComponent from './components/TreeComponent.vue';

const store = useStore();
</script>

<template>
  <TreeComponent :nodes="store.state.tree" isRoot />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
