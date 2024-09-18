import { showMessage, showModal, isEmptyField } from "./all.js";
import { apiPostSignUp } from "./api.js";

const signUpButton = document.getElementById("signUp-btn");
const singUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
signUpButton.addEventListener("click", () =>
  signUp({ email: singUpEmail.value, password: signUpPassword.value }, "admin")
);

async function signUp(userData, nickname) {
  isEmptyField(userData.email, userData.password);

  try {
    await apiPostSignUp({
      ...userData,
      nickname,
    });
    const signUpMessage = {
      status: "success",
      title: "註冊成功",
      text: "前往登入頁面",
      path: "./signIn.html",
    };
    showModal(signUpMessage);
  } catch (error) {
    showMessage("warning", error.response.data.message);
  }
}
