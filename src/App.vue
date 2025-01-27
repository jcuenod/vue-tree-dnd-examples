<template>
  <div class="header">
    <h1>Vue-Tree-Dnd Demo</h1>
    <h2>Open source draggable tree component for Vue 3</h2>
    <div style="text-align: center">
      <!-- npm badge -->
      <a href="https://www.npmjs.com/package/vue-tree-dnd"
        ><img
          src="https://img.shields.io/npm/v/vue-tree-dnd.svg?style=for-the-badge"
          alt="npm version"
          height="18"
      /></a>
      {{ " " }}
      <!-- github (license) badge -->
      <a href="https://github.com/jcuenod/vue-tree-dnd"
        ><img
          src="https://img.shields.io/github/license/jcuenod/vue-tree-dnd.svg?style=for-the-badge"
          alt="npm version"
          height="18"
      /></a>
    </div>
  </div>
  <div class="container">
    <div style="display: flex; flex-direction: row; justify-content: center">
      <div style="flex: 1"></div>
      <button @click="newFolder" class="new-button" style="justify-self: end">
        <span style="width: 1rem; height: 1rem">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.75 3A1.75 1.75 0 002 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-8.5A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
        <span> New Folder </span>
      </button>
      <button @click="locked = !locked" class="lock-button">
        <span style="width: 1rem; height: 1rem">
          <svg
            v-if="locked"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M14.5 1A4.5 4.5 0 0010 5.5V9H3a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1.5V5.5a3 3 0 116 0v2.75a.75.75 0 001.5 0V5.5A4.5 4.5 0 0014.5 1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div style="flex: 1"></div>
    </div>
    <div style="padding-top: 1rem; padding-bottom: 1rem">
      <VueTreeDnd
        :component="TreeItemRenderer"
        :locked="locked"
        v-model="tree"
        @move="onMove"
      />
    </div>
  </div>

  <div class="footer">
    Made with <span style="color: #e25555">&#9829;</span> by James Cuénod ·
    <a href="https://github.com/jcuenod/vue-tree-dnd">Code</a> ·
    <a href="https://www.npmjs.com/package/vue-tree-dnd">Package</a> ·
    <a href="https://github.com/jcuenod/vue-tree-dnd/issues">Issues</a>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import VueTreeDnd, {
  MoveMutation,
  TreeItem,
  TreeItemId,
} from "vue-tree-dnd";
import TreeItemRenderer from "./components/TreeItemRenderer.vue";
import { deleteNodeFromTree, moveMutation } from "./tree-helper";
import { getRandomName } from "./naming-helper";

const tree = ref<TreeItem[]>([]);
const locked = ref<boolean>(false);

const onMove = (event: MoveMutation) => {
  tree.value = moveMutation(tree.value, event);
};

const newFolder = () => {
  const name = getRandomName();
  const newNode = {
    id: name,
    name: name,
    expanded: true,
    children: [],
  };
  tree.value = [...tree.value, newNode];
};

provide("delete", (id: TreeItemId) => {
  const areYouSure = window.confirm(
    "Are you sure you want to delete this item?"
  );
  if (!areYouSure) return;
  tree.value = deleteNodeFromTree(tree.value, id);
});
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 0;
  padding: 0;
}
h2 {
  text-align: center;
  margin-top: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: normal;
}
.container {
  margin: 2rem auto 0;
  width: 400px;
  padding: 2em;
  background-color: white;
  border: 1px solid #e7e5e4;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.new-button,
.lock-button {
  margin: 0 auto;
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
  background-color: #60a5fa;
}
.new-button {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
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

.lock-button {
  background-color: #2563eb;
  color: #dbeafe;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.lock-button:hover {
  background-color: #1e40af;
  color: #eff6ff;
}
.lock-button:active {
  background-color: #172554;
  color: #fff;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #eee;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.8rem;
}
</style>
