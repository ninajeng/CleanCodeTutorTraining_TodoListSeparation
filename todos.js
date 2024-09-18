import { showMessage, showModal } from "./all.js";
import { apiGetTodos, apiPostTodo, isLogined, clearCookie } from "./api.js";

let todoList = [];
const todoInput = document.getElementById("todo-input");
const addTodoButton = document.getElementById("todo-btn");
const signOutButton = document.getElementById("signOut-btn");

addTodoButton.addEventListener("click", () => addTodo());
signOutButton.addEventListener("click", () => signOut());
window.addEventListener("load", () => checkLoginStatus());

function checkLoginStatus() {
  if (!isLogined) {
    const signUpMessage = {
      status: "warning",
      title: "請先登入",
      text: "前往登入頁面",
      path: "./signIn.html",
    };
    showModal(signUpMessage);
    return;
  }
  getTodos();
}

function signOut() {
  clearCookie();
  const signOutMessage = {
    status: "success",
    title: "已登出會員",
    text: "前往登入頁面",
    path: "./signIn.html",
  };
  showModal(signOutMessage);
}

async function getTodos() {
  try {
    const response = await apiGetTodos();
    todoList = response.data.data;
    renderTodos();
  } catch (error) {
    showMessage("warning", error.response.data.message);
  }
}

// 提示：改使用 async await 寫法
async function addTodo() {
  if (!todoInput.value) return;

  // 提示：加入 try catch
  // 提示：使用 SweetAlert2 有效呈現錯誤資訊
  // 提示：將重複程式碼提取出來
  try {
    await apiPostTodo({
      content: todoInput.value,
    });
    showMessage("success", "新增成功");
    todoInput.value = "";
    getTodos();
  } catch (error) {
    showMessage("warning", error.response.data.message);
  }
}

function renderTodos() {
  const todoListContainer = document.getElementById("todo-list");
  let html = "";

  todoList.forEach((todo) => {
    html += `<li><b>${todo.content}</b></li>`;
  });

  todoListContainer.innerHTML = html;
}

export { getTodos, addTodoButton, todoInput };
