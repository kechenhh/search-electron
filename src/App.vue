<template>
  <div id="app">
    <button type="button" @click="showDialog">显示对话框</button>
  </div>
</template>

<script>
export default {
  name: "App",

  methods: {
    showDialog() {
      //发给主进程
      window.electronApi.ipcRenderer.send("show-dialog");
    },
  },
};
</script>

<style>
</style>
