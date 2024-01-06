<script>
  import logo from "../../src/logo.png";
  import "../app.css";
  import { onMount } from 'svelte';
  import { user, isLoggedInStore, logOut, updateUserInfo } from '../utils/auth';

  onMount(async () => {
    await updateUserInfo();
    console.log($user);
    console.log(isLoggedInStore);
  });

  const handleLogoutClick = async () => {
    logOut();
    await updateUserInfo();
  }

  $: if (isLoggedInStore) {async () => {
    await updateUserInfo();
    console.log($user);
    console.log(isLoggedInStore);
  }
  }
</script>

<header style="
  background-color:#000;
">
  <nav id="navi">
    <a style="margin-left:10px;" href="/">
      <img src={logo} alt="download icon" style="max-height:100px;" /></a>

    {#if $user && $user.id === undefined}

        <a class="hover-line font-thin " 
          style="margin-left:10px; margin-right:10px; top: 0; bottom: 0; margin-top: auto; margin-bottom: auto; color:#fff" 
          href="/user/new">Signup</a>
    
        <a class="hover-line font-thin "  
          style="margin-left:10px; margin-right:10px; top: 0; bottom: 0; margin-top: auto; margin-bottom: auto; color:#fff" 
          href="/user/login">Login</a>
      {/if}

    {#if $isLoggedInStore}
      {#if $user && $user.id !== undefined}
        <a class="hover-line font-thin " 
          style="margin-right:10px; top: 0; bottom: 0; margin-top: auto; margin-bottom: auto; color:#fff" 
          href="/image/upload">Upload Image</a>

        <a class="hover-line font-thin " 
          style="margin-right:10px; top: 0; bottom: 0; margin-top: auto; margin-bottom: auto; color:#fff" 
          href="/user/edit">Edit User</a>

        <button class="hover-line font-thin " 
          style="margin-right:10px; top: 0; bottom: 0; margin-top: auto; margin-bottom: auto; color:#fff" 
          on:click={handleLogoutClick}>Logout</button>
      {/if}
  {/if}
  </nav>

    {#if $isLoggedInStore && $user && $user.id !== undefined}
      <p id="hello" class="font-thin">HELLO! {$user.name}</p>
    {/if}
  </header>

<slot/>
