// 測試資料輸入區域控制
class TestDataArea {
  elemTestDataArea;
  elemInputContent;

  constructor() {
    this.elemTestDataArea = document.querySelector("#testDataArea");
    this.elemInputContent = document.querySelector("#inputContent");
  }

  // 顯示／隱藏輸入區
  showOrHideTestDataArea () {
    this.elemTestDataArea.classList.toggle("d-none");
  }

  // 隱藏／顯示內容
  hideOrShowContent () {
    this.elemInputContent.classList.toggle("d-none");
  }
}
const testDataArea = new TestDataArea();


const elemMsg = document.querySelector("#msg");
const elemEmail = document.querySelector("#userEmail");
const elemPassword = document.querySelector("#userPassword");
const elemName = document.querySelector("#userName");

// 取得表單資料
function getUserFormData () {
  return {
    "email": elemEmail.value,
    "password": elemPassword.value,
    "name": elemName.value,
  };
}

// 取得 userId
function getUserId () {
  const userId = checkId("userId");
  if (!userId) {
    throw new Error("請輸入使用者 ID！");
  }
  return userId;
}

// 新增 user
function addUser (route) {
  console.log(`====== POST ${route} ======`);

  elemMsg.textContent = "";

  const userData = getUserFormData();
  console.log(`userData ==>`, userData);

  const fullUrl = url + route;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.post(fullUrl, userData)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      elemMsg.textContent = JSON.stringify(res.data);
    })
    .catch((error) => {
      console.error(error);
      elemMsg.textContent = error.response.data;
    })
    .finally(finalProcesser);
}

// PATCH / PUT 資料
function patchPutData (route, dataObj, method = "patch") {
  console.log(`====== ${method} ${route} ======`);
  console.log(`dataObj ==>`, dataObj);

  const fullUrl = url + route;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios({
    method,
    url: fullUrl,
    data: dataObj,
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}

// 修改 user
function patchPutUser (route, dataObj, method = "patch") {
  // 組出完整 route
  const userId = getUserId();
  route += `/${userId}`;

  patchPutData(route, dataObj, method);
}

// 以 patch 修改姓名
function patchUserName (route) {
  const userData = {
    // "email": elemEmail.value,
    // "password": elemPassword.value,
    "name": elemName.value,
  }

  patchPutUser(route, userData);
}

// 以 patch 修改 Email
function patchUserEmail (route) {
  const userData = {
    "email": elemEmail.value,
    // "password": elemPassword.value,
    // "name": elemName.value,
  }

  patchPutUser(route, userData);
}

// 以 patch 修改密碼
function patchUserPassword (route) {
  const userData = {
    // "email": elemEmail.value,
    "password": elemPassword.value,
    // "name": elemName.value,
  }

  patchPutUser(route, userData);
}

// 以 put 修改姓名
function putUserName (route) {
  const userData = {
    "name": elemName.value,
  }
  patchPutUser(route, userData, "put");
}

// 以 put 修改 user
function putUser (route) {
  patchPutUser(route, getUserFormData(), "put");
}


// 刪除資料
function deleteData2 (route) {
  console.log(`====== DELETE ${route} ======`);

  const fullUrl = url + route;
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

// 刪除 user
function deleteUser (route) {
  // 組出完整 route
  const userId = getUserId();
  route += `/${userId}`;

  deleteData2(route);
}


// 取得使用者資料
function getUsers (route) {
  console.log(`====== GET ${route} ======`);

  const fullUrl = url + route;
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

// 以 ID 取得使用者資料
function getUserById (route) {
  const userId = getUserId();
  getUsers(`${route}/${userId}`);
}


const elemUserMsg = document.querySelector("#userMsg");
const unLoginMsg = "請先登入";
let user = {};

// 登入
function loginSignin (route) {
  console.log(`====== POST ${route} ======`);

  user = {};

  const userData = {
    "email": elemEmail.value,
    "password": elemPassword.value
  }
  console.log(`userData ==>`, userData);

  const fullUrl = url + route;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.post(fullUrl, userData)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      user = res.data.user;
      user.token = res.data.accessToken;
      console.log(`user ==>`, user);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      if (user.token) {
        elemUserMsg.textContent = `${user.name} (${user.id})`;
      } else {
        elemUserMsg.textContent = unLoginMsg;
      }
    });
}
function login () {
  loginSignin('login');
}
function signin () {
  loginSignin('signin');
}

// 登出
function logout () {
  console.log(`====== 登出 ======`);
  user = {};
  elemUserMsg.textContent = unLoginMsg;
  console.log(`user ==>`, user);
  console.log(``);
}


// 守衛路由 - 查詢
function queryByAuth (route) {
  console.log(`====== GET ${route} ======`);

  const fullUrl = url + route;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.get(fullUrl, {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}

// 以 ID 取得使用者資料
function getAuthUserById (route) {
  const userId = getUserId();
  queryByAuth(`${route}/${userId}`);
}


// 守衛路由 - POST / PATCH / PUT 資料
function writeDataByAuth (route, dataObj, method = "patch") {
  console.log(`====== ${method} ${route} ======`);
  console.log(`dataObj ==>`, dataObj);

  const fullUrl = url + route;
  console.log(`fullUrl ==> ${fullUrl}`);

  axios({
    method,
    url: fullUrl,
    data: dataObj,
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
    .then((res) => {
      console.log(res);
      console.log(res.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}

// 守衛路由 - 修改 user
function patchPutUserByAuth (route, dataObj, method = "patch") {
  // 組出完整 route
  const userId = getUserId();
  route += `/${userId}`;

  writeDataByAuth(route, dataObj, method);
}

// 守衛路由 - 以 patch 修改姓名
function patchUserNameByAuth (route) {
  const userData = {
    // "email": elemEmail.value,
    // "password": elemPassword.value,
    "name": elemName.value,
  }

  patchPutUserByAuth(route, userData);
}

// 守衛路由 - 以 put 修改 user
function putUserByAuth (route) {
  patchPutUserByAuth(route, getUserFormData(), "put");
}

const elemUserPostContent = document.querySelector("#userPostContent");

// 守衛路由 - 新增 userPosts (沒有 userId)
function addUserPostByAuthNoId (route) {
  const dataObj = {
    "content": elemUserPostContent.value,
  };
  writeDataByAuth(route, dataObj, "post");
}

// 守衛路由 - 新增 userPosts (有 userId)
function addUserPostByAuth (route) {
  const dataObj = {
    "content": elemUserPostContent.value,
    "userId": user.id
  };
  writeDataByAuth(route, dataObj, "post");
}

// 守衛路由 - 新增 userPosts (嵌套路徑寫法)
function addUserPostByAuth2 (routeCode, resource) {
  const dataObj = {
    "content": elemUserPostContent.value
  };
  const route = `${routeCode}/users/${user.id}/${resource}`;
  writeDataByAuth(route, dataObj, "post");
}

// 守衛路由 - 修改 userPosts
function updateUserPostByAuth (route, dataObj, method = "patch") {
  // 組出完整 route
  const userId = getUserId();
  route += `/${userId}`;

  writeDataByAuth(route, dataObj, method);
}
// 守衛路由 - PATCH userPosts content
function patchUserPostByAuth (route) {
  const dataObj = {
    "content": elemUserPostContent.value,
  };
  updateUserPostByAuth(route, dataObj, "patch");
}

// 守衛路由 - 刪除各資源資料
function deleteDataByAuth (route) {
  console.log(`====== DELETE ${route} ======`);

  const fullUrl = url + route + "/" + getUserId();
  console.log(`fullUrl ==> ${fullUrl}`);

  axios.delete(fullUrl, {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(finalProcesser);
}
