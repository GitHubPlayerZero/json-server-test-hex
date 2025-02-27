# JSON Server with Render

- [專案拷貝來源](https://github.com/gonsakon/json-server-vercel)

由於 Vercel 無法長時間保留資料，因此此範例將部署於 Render，故將 Vercel 相關設定移除。<br>
原說明亦不再適用於本專案，因此移除之。

---

## 安裝

下載後若想運行於本機，請先安裝套件：
```javascript
npm i
```

<br>

## 腳本運行說明
- `npm run start`<br>
  啟動 Node Server 作為 JSON Server 服務，存取資料時**不會**實際寫入 db.json 中，具有身份驗證功能。
  
- `npm run watch`<br>
  直接啟動 JSON Server 服務，本機須安裝 json-server 套件於**全域**，資料會實際寫入 db.json 中，本身**不**具有身份驗證功能。
  
- `npm run auth`<br>
  啟動 JSON Server Auth 服務（本身亦為 JSON Server 服務），須於此專案中安裝 json-server、json-server-auth 套件，資料會實際寫入 db.json 中，具有身份驗證功能。

<br>

## JSON Server URL
http://localhost:3000/

<br>

## 範例說明
sample 資料夾中提供測試的寫法範例，可以拷貝至另外的專案進行測試，測試時請打開 console 觀看訊息。<br>
若想與 json-server 同一個專案測試，請以 `npm run start` 啟動 json-server，這樣才不會因為實際異動到 db.json 而使專案自動重整，造成無法觀看 console 訊息。<br>
但建議最好的方式還是拷貝到另外的專案執行，這樣比較好實際觀察 db.json 的異動情形。<br>

兩隻測試：
- **jsonServerTest.html：**json-server 各種寫法測試。
- **jsonServerAuthTest.html：**json-server-auth 身份驗證測試。
