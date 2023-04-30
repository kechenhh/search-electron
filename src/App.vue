<template>
  <div id="app">
    <el-button type="primary" @click="choosePath()">选择路径</el-button>
    {{ path }}
    <el-input
      type="textarea"
      placeholder="请输入内容"
      spellcheck="false"
      :rows="6"
      v-model="searchData"
    >
    </el-input>
    <el-button type="primary" @click="sendText()">发送</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="checkStr" label="关键字" width="180">
      </el-table-column>
      <el-table-column prop="aroundStr" label="相关文字" width="180">
      </el-table-column>
      <el-table-column prop="filePath" label="路径"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      searchData: "",
      path: "",
      tableData: [],
    };
  },
  methods: {
    choosePath() {
      myApi.handleOpenDirs((res) => {
        let path = res.filePaths[0];
        console.log(path);
        this.path = path;
      });
    },
    //发送查找
    sendText() {
      let searchList = this.searchData.split("\n");
      searchList = searchList.filter(function (s) {
        return s && s.trim();
      });
      myApi.handleSend({ path: this.path, searchList }, (res) => {
        console.log(res, "res");
        this.tableData = res;
      });
    },
  },
};
</script>

<style>
</style>
