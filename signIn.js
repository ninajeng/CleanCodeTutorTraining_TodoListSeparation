import { showMessage, showModal, isEmptyField } from "./all.js";
import { apiPostSignIn, setCookie } from "./api.js";

const signInButton = document.getElementById("signIn-btn");
const singInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPassword");
signInButton.addEventListener("click", () =>
  signIn({ email: singInEmail.value, password: signInPassword.value })
);

// 使用 async await 寫法
async function signIn(userData) {
  isEmptyField(userData.email, userData.password);

  // 加入 try catch
  // 使用 SweetAlert2 有效呈現錯誤資訊
  // 函式一次只做一件事
  try {
    const response = await apiPostSignIn({
      email: userData.email,
      password: userData.password,
    });
    setCookie(response.data.token);
    const signUpMessage = {
      status: "success",
      title: "登入成功",
      text: "前往 To-do 頁面",
      path: "./index.html",
    };
    showModal(signUpMessage);
  } catch (error) {
    console.log(error);
    showMessage("warning", error.response.data.message);
  }
}
