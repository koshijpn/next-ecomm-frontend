import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';
import { goto } from '$app/navigation';

export const isLoggedInStore = writable(false);

export function checkLoginStatus() {
  if (isLoggedInStore === false) {
    console.log("logout");
  } else if (isLoggedInStore === true) {
    console.log("login");
  }
}

const emptyAuth = {
  "token": "",
  "userId": ""
}

export function logOut() {
  localStorage.setItem("auth", JSON.stringify(emptyAuth));
  isLoggedInStore.set(false);
  goto("/"); 
  console.log("success");
  return true
}

export function getUserId() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["userId"]
  }
  return null
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["token"]
  }
  return null
}

export async function isLoggedIn() {
  if (!getTokenFromLocalStorage()) {
    return false
  }

  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/users',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
      }
    );

    const res = await resp.json()
    if (resp.status == 200) {

      localStorage.setItem("auth", JSON.stringify({
        "token": res.token,
        "userId": res.record.id
      }));

      isLoggedInStore.set(true)
      return true
    }

    return false
  } catch {
    return false
  }
}

export async function authenticateUser(email, password) {
  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/sign-in',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const res = await resp.json();

    if (resp.status === 200 && res.user && res.user.id) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          token: res.accessToken,
          userId: res.user.id,
          // Add other user information if needed
        })
      );

      isLoggedInStore.set(true);
        console.log("success")
      return {
        success: true,
        res,
      };
    } else {
      console.error('Error during authentication:', res);
      return {
        success: false,
        res,
      };
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return {
      success: false,
      res: error,
    };
  }
}

export async function getUserInfo() {
  const token = getTokenFromLocalStorage();

  if (!token) {
    return null; // ユーザーがサインインしていない場合は null を返す
  }

  try {
    const resp = await fetch(
      PUBLIC_BACKEND_BASE_URL + '/user',
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      }
    );

    const res = await resp.json();

    if (resp.status === 200) {
      return res; // ユーザー情報を含むレスポンスを返す
    } else {
      console.error('Error getting user info:', res);
      return null;
    }
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
}

export async function showuser() {
  let userid = getUserId();
  let user = {};
  let url = PUBLIC_BACKEND_BASE_URL + '/users/' + userid;

  const resp = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getTokenFromLocalStorage()
    },
  });

  const res = await resp.json();
  if (resp.status === 200) {
    user = res; // レスポンスをuserに設定
  }

  return user;
}

