const XLSX = require("xlsx");
const { dialog } = require('electron');


const exportExcel = async ({ tableData, header }) => {
  const result = await dialog.showSaveDialog({
    title: '保存文件至',
    defaultPath: Date.parse(new Date()) + "关键词.xlsx",
    filters: [{
      name: "文件类型",
      extensions: ["xlsx", "xls"]
    }]
  });
  if (!result.filePath) {
    return
  }
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(tableData, { header: header })
  XLSX.utils.book_append_sheet(wb, ws)
  XLSX.writeFile(wb, result.filePath);
}
exports.exportExcel = exportExcel