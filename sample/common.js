// const url = "https://json-server-test-hex.onrender.com/";
const url = "http://localhost:3000/";

const finalProcesser = () => {
  console.log(``);
};

const checkId = (idName) => {
  if (!idName) {
    alert("必須輸入 ID！");
    return undefined;
  }
  const id = document.querySelector(`#${idName}`).value;
  // console.log(idName);
  return id;
};
