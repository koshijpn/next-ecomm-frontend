<script>
  import "../app.css";
  import { checkLoginStatus, isLoggedInStore, logOut } from '../utils/auth';
   
  import { onMount } from 'svelte';


  // Define a function to handle the logout click event
  const handleLogoutClick = () => {
    logOut(); // Call the logout function
    checkLoginStatus();
  };

    // コンポーネントがマウントされたときにログイン状態を確認
    onMount(() => {
      checkLoginStatus();
    });

</script>

<a href="/">home</a>
<a href="/user/new">new</a>
<a href="/login"> login </a>
<a href="/image/upload"> upload </a>

<!-- Add an event listener to the "logout" link -->
<button on:click={handleLogoutClick}> logout </button>

<slot />
