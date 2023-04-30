<template>
  <div id="app">
    <h2>关键词搜索工具</h2>
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
    <el-button type="primary" @click="sendText()">查找</el-button>
    <el-button type="primary" @click="exportExcel()">导出</el-button>

    <el-table :data="tableData" style="width: 100%" height="500">
      <el-table-column prop="checkStr" label="关键字" width="180">
      </el-table-column>
      <el-table-column prop="aroundStr" label="相关文字" width="180">
      </el-table-column>
      <el-table-column prop="filePath" label="路径"> </el-table-column>
    </el-table>
    <div v-if="this.tableData.length > 0" style="float: right">
      总数：{{ this.tableData.length }}
    </div>
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
    //选择路径
    choosePath() {
      myApi.handleOpenDirs((res) => {
        let path = res.filePaths[0];
        this.path = path;
      });
    },
    //发送查找
    sendText() {
      if (!this.path) {
        return this.$message.error("请先选择路径");
      }
      if (!this.searchData) {
        return this.$message.error("请输入信息");
      }
      let searchList = this.searchData.split("\n");
      searchList = searchList.filter(function (s) {
        return s && s.trim();
      });
      myApi.handleSend({ path: this.path, searchList }, (res) => {
        this.tableData = res;
        if (res.length == 0) {
          return this.$message.error("无数据");
        }
      });
    },
    exportExcel() {
      if (this.tableData.length == 0) {
        return this.$message.error("请先查找数据");
      }
      let header = ["关键字", "相关文字", "路径"];
      let tableData = this.tableData.map((item) => {
        return {
          关键字: item.checkStr,
          相关文字: item.aroundStr,
          路径: item.filePath,
        };
      });
      myApi.handleExport({ tableData, header });
    },
  },
};
</script>

<style>
</style>
