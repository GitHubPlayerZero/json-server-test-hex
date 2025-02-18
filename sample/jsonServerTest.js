// const url = "https://json-server-test-hex.onrender.com/";
const url = "http://localhost:3000/";

const getTitle = () => `json-server-${new Date().getTime()}`;
const getAuthor = () => "typicode";

const finalProcesser = () => {
  console.log(``);
};

const checkId = (idName) => {
  const id = document.querySelector(`#${idName}`).value;
  console.log(idName);
  if (!idName) {
    alert("必須輸入 ID！");
    return undefined;
  }
  return id;
}


/* 新增各資源資料 */
function addData (table, dataObj) {
  console.log(`====== POST ${table} ======`);

  const fullUrl = url + table;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.post(fullUrl, dataObj)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}

// 新增 post
function addPost () {
  addData("posts", {
    title: getTitle(),
    author: getAuthor()
  });
}


/* 修改各資源完整資料 */
function modifyAllData (table, dataObj) {
  console.log(`====== PUT ${table} ======`);

  const fullUrl = url + table;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.put(fullUrl, dataObj)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}

// 修改 post 1 的 title
function putPost1Title () {
  modifyAllData("posts/1", {
    title: getTitle(),
  });
}

// 修改 post 1 的 author
function putPost1Author () {
  modifyAllData("posts/1", {
    author: "putAuthor1"
  });
}

// 修改 post 1 的所有資料
function putPost1All () {
  modifyAllData("posts/1", {
    title: getTitle(),
    author: getAuthor()
  });
}

/* 修改各資源部份資料 */
function modifySomeData (table, dataObj) {
  console.log(`====== PATCH ${table} ======`);

  const fullUrl = url + table;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.patch(fullUrl, dataObj)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}

// 修改 post 1 的 title
function patchPost1Title () {
  modifySomeData("posts/1", {
    title: getTitle(),
  });
}

// 修改 post 1 的 author
function patchPost1Author () {
  modifySomeData("posts/1", {
    author: "patchAuthor1",
  });
}

// 修改 post 1 的所有資料
function patchPost1All () {
  modifySomeData("posts/1", {
    title: getTitle(),
    author: "patchAuthor2"
  });
}


/* 刪除各資源資料 */
function deleteData (table) {
  console.log(`====== DELETE ${table} ======`);

  const deleteId = document.querySelector("#deleteId").value;
  console.log(deleteId);
  if (!deleteId) {
    alert("必須輸入 ID！");
    return;
  }

  const fullUrl = url + table + "/" + deleteId;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.delete(fullUrl)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}


/* 取得各資源資料集 */
function getDatas (table) {
  console.log(`====== GET ${table} ======`);

  const fullUrl = url + table;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.get(fullUrl)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}

/* 以 ID 取得各資源資料 */
function getDataById (table) {
  console.log(`====== GET ${table} ======`);

  const queryId = checkId("queryId");
  if (!queryId) {
    return;
  }
  const fullUrl = url + table + "/" + queryId;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.get(fullUrl)
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}
