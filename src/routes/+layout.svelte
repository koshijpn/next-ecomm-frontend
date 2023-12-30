<script>
  import logo from "../../src/logo.png"
  import "../app.css";
  import { onMount } from 'svelte';
  import { isLoggedInStore, logOut, showuser, checkLoginStatus} from '../utils/auth';

  let user = {};

    // コンポーネントがマウントされたときにログイン状態を確認
    onMount(() => {
      updateUserInfo();
      checkLoginStatus();
    });

	// トップレベルでリアクティブ宣言を行う
	$: user;

    // isLoggedInStoreが変更されたときにユーザー情報を更新
    $: if ($isLoggedInStore) {
    updateUserInfo(user.name);
  }

    // Define a function to handle the logout click event
    const handleLogoutClick = () => {
    logOut(); // Call the logout function
    checkLoginStatus();
  };

  // ユーザー情報をロードする関数
  async function updateUserInfo() {
    // ユーザーがログインしているか確認
    const loggedIn = await isLoggedInStore;

    if (loggedIn) {
      // ログインしている場合はユーザー情報を取得
      const userData = await showuser();
      // console.log('User Data:', userData);

      // ユーザー情報を更新
      user = userData;
    }
  }
</script>

<header style = "
background-color:#000;
">
  <nav class="flex">
    <a style = "margin-left:10px;"
      href="/"><img src={logo} alt="download icon" style = "
      max-height:100px;
      "
      /></a>
      
      {#if $isLoggedInStore}
        <a class="hover-line font-thin " 
        style = "margin-right:10px;

                top: 0;
                bottom: 0;
                margin-top: auto;
                margin-bottom: auto;
                color:#fff" 
        href="/image/upload">Post Jobs</a>

        <a class="hover-line font-thin " 
        style = "margin-right:10px;

                top: 0;
                bottom: 0;
                margin-top: auto;
                margin-bottom: auto;
                color:#fff" 
        href="/user/edit">Edit User</a>

        <button class="hover-line font-thin " 
          style = "margin-right:10px;
          top: 0;
          bottom: 0;
          margin-top: auto;
          margin-bottom: auto;
          color:#fff" 
          on:click={handleLogoutClick}>Logout</button>
      {:else}
      <a class="hover-line font-thin " 
      style = "margin-left:10px;
              margin-right:10px;
              top: 0;
              bottom: 0;
              margin-top: auto;
              margin-bottom: auto;
              color:#fff" 
      href="/user/new">Signup</a>

    <a class="hover-line font-thin "  
      style = "margin-left:10px;
      margin-right:10px;
      top: 0;
      bottom: 0;
      margin-top: auto;
      margin-bottom: auto;
      color:#fff" 
      href="/user/login">login</a>
      {/if}

  </nav>

  {#if $isLoggedInStore}
  <p style = "margin-left:10px;
  margin-right:10px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 30px;
  padding-top:10px;
  padding-bottom:10px;
  color:#fff"
  class="font-thin">HELLO! {user.name}</p>
  {/if}

</header>

<slot/>
