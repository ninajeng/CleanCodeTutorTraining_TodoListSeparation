const API_URL = "https://todolist-api.hexschool.io/";
const COOKIE_NAME = "HexTodo";
const COOKIE_VALID_DAYS = 5;

const getConfig = () => {
  const token = getCookie(COOKIE_NAME);
  return {
    headers: {
      authorization: token,
    },
  };
};

const apiPostSignUp = (userData) =>
  axios.post(`${API_URL}users/sign_up`, userData);

const apiPostSignIn = (userData) =>
  axios.post(`${API_URL}users/sign_in`, userData);

const apiGetTodos = () => axios.get(`${API_URL}todos`, getConfig());

const apiPostTodo = (todo) => axios.post(`${API_URL}todos`, todo, getConfig());

const setCookie = (token) => {
  const expireData = new Date();
  expireData.setDate(expireData.getDate() + COOKIE_VALID_DAYS);
  document.cookie = `${COOKIE_NAME}=${token}; expires=${expireData}`;
};

const clearCookie = () => {
  document.cookie = `${COOKIE_NAME}=""; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

const getCookie = (cookieName) => {
  const cookieData =
    document.cookie.match(
      new RegExp(
        "(?:^|; )" +
          cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    ) || [];
  const cookieValue = cookieData[1] || undefined;

  return cookieValue;
};

const isLogined = (() => getCookie(COOKIE_NAME))();

export {
  apiPostSignUp,
  apiPostSignIn,
  apiGetTodos,
  apiPostTodo,
  setCookie,
  clearCookie,
  isLogined,
};
