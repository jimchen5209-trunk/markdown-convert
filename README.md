# markdown-convert

一個將 markdown 檔案轉成 html 或 pdf 格式的小程式  
註：pdf 轉檔需使用含圖形介面的環境， 將以 A4 大小輸出  

## 開發環境

- Node.js v16.15.1  
- TypeScript v4.7.4  

## 使用說明

### 安裝相依
```bash
yarn [install]
```
### 編譯成可執行 JavaScrtpt
```bash
yarn build:prod
```
### 指令說明
```bash
yarn start <html|pdf|both> <file1> <file2>...
```
- **&lt;html|pdf|both&gt;** - 選擇要轉成 html 或 pdf，或是輸入 both 同時轉成 html 和 pdf  
- **&lt;file1&gt; &lt;file2&gt;** - 輸入檔案，可同時輸入多檔案，以空格隔開  
- 輸出檔會放在與輸入檔案同一個路徑，並以原始檔名命名

#### Examples:  
將 README.md 轉成 html 格式，輸出檔為 README.html
```bash
yarn start html README.md
```
將 README.md 和 test.md 都轉成 pdf 格式，輸出檔為 README.pdf 和 test.pdf
```bash
yarn start pdf README.md test.md
```
