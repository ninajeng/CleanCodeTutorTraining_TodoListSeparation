const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
const Modal = Swal.mixin({
  timer: 3000,
  timerProgressBar: true,
});

function showMessage(status = "warning", message = "") {
  Toast.fire({
    icon: status,
    title: message,
  });
}

async function showModal({
  status = "warning",
  title = "",
  text = "",
  path = null,
}) {
  try {
    console.log(1);
    await Modal.fire({
      icon: status,
      title,
      text,
    });
    console.log(2);
    if (path) {
      location.replace(path);
    }
  } catch (error) {
    showMessage("warning", error);
  }
}

function isEmptyField(email, password) {
  if (!email || !password) {
    showMessage("warning", "用戶名稱和密碼不能為空");
    return;
  }
}

export { showMessage, showModal, isEmptyField };
