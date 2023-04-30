<template>
  <div id="app">
    <el-input
      type="textarea"
      placeholder="请输入内容"
      spellcheck="false"
      :rows="6"
      v-model="textarea"
    >
    </el-input>
    <el-button type="primary" @click="sendText()">发送</el-button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      textarea: "",
    };
  },
  methods: {
    sendText() {
      myApi.handleSend(this.textarea);
    },
  },
};
</script>

<style>
</style>
