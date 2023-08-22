<template>
  <h1>Vue-Tree-Dnd Demo</h1>
  <div class="container">
    <button @click="newFolder" class="new-button">
      <span style="width: 1rem; height: 1rem"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
          />
        </svg>
      </span>
      <span> New Folder </span>
    </button>
    <div style="padding-top: 1rem; padding-bottom: 1rem">
      <VueTreeDnd :component="TreeItemRenderer" :tree="tree" @move="onMove" />
    </div>
  </div>

  <div>
    Open source draggable tree component for Vue 3 ·
    <a href="https://github.com/jcuenod/vue-tree-dnd">Code</a> ·
    <a href="https://www.npmjs.com/package/vue-tree-dnd">Package</a> ·
    <a href="https://github.com/jcuenod/vue-tree-dnd/issues">Issues</a>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import VueTreeDnd, { MoveMutation, TreeItem, TreeItemId } from "vue-tree-dnd";
import TreeItemRenderer from "./components/TreeItemRenderer.vue";
import { deleteNodeFromTree, moveMutation } from "./tree-helper";
import { getRandomName } from "./naming-helper";

const tree = ref<TreeItem[]>([]);

const onMove = (event: MoveMutation) => {
  tree.value = moveMutation(tree.value, event);
};

const newFolder = () => {
  const name = getRandomName();
  const newNode = {
    id: name,
    name: name,
    children: [],
  };
  tree.value = [...tree.value, newNode];
};

provide("delete", (id: TreeItemId) => {
  tree.value = deleteNodeFromTree(tree.value, id);
});
</script>

<style scoped>
.container {
  margin: 4rem auto 0;
  width: 400px;
  padding: 2em;
  background-color: white;
  border: 1px solid #e7e5e4;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.new-button {
  margin: 0 auto;
  background-color: #60a5fa;
  border: none;
  border-radius: 0.3rem;
  padding: 0.25rem 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
}
.new-button:hover {
  background-color: #3b82f6;
  color: #f8f8f8;
}
.new-button:active {
  background-color: #1d4ed8;
  color: #fff;
}
.new-button span {
  margin: 0.2rem;
}
</style>
