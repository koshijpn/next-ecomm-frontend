<script>
	import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
	import { onMount } from 'svelte';
	import { getUserId, isLoggedInStore, showuser, getTokenFromLocalStorage,logOut } from '../../../utils/auth';
	import { goto } from '$app/navigation';
  
	let user = {};
	let isLoading = false;
	let formErrors = {};
	const userId = getUserId();

	// トップレベルでリアクティブ宣言を行う
	$: user;

	  // isLoggedInStoreが変更されたときにユーザー情報を更新
	  $: if ($isLoggedInStore) {
    updateUserInfo();
  }


	// マウント時にユーザー情報をロード
	onMount(async () => {
	  updateUserInfo();
	});
  
	// isLoggedInStoreが変更されたときにユーザー情報を更新
	$: if ($isLoggedInStore) {
	  updateUserInfo();
	}
	
// ユーザー情報を更新する関数
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

	function afterUpdateUsername() {
	  goto('/');
	}
  
    async function updateUsername(evt) {
  evt.preventDefault();

  if (!userId) {
    console.error('User ID is undefined');
    return;
  }

  const inputData = {
    "id": userId,
    "name": evt.target['username'].value,
	"email": evt.target['email'].value,
  };
  isLoading = true;

  const apiUrl = PUBLIC_BACKEND_BASE_URL + `/user/` + userId;
  console.log('API URL:', apiUrl);

  try {
    const resp = await fetch(apiUrl, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getTokenFromLocalStorage(),
      },
      body: JSON.stringify(inputData),
    });

    const res = await resp.json();
    if (resp.status === 200) {
      await updateUserInfo();
      await showuser();
      afterUpdateUsername();
    } else {
      formErrors = res.data;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    formErrors = { message: 'An error occurred while processing the request.' };
  } finally {
    isLoading = false;
  }
}


  async function deleteUser(evt) {
  evt.preventDefault();
  const userId = getUserId();

  if (!userId) {
    console.error('User ID is undefined');
    return;
  }

  const userData = {
    "id": userId
  };

  isLoading = true;

  try {
    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/delete-user/` + userId, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getTokenFromLocalStorage(),
      },
      body: JSON.stringify(userData),
    });

    if (resp.status === 200) {
		logOut();
    } else {
      console.error('Error:', resp.statusText);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    isLoading = false;
  }
}


</script>

<main>
	<div class="p40">
		<h1 class="text-center text-3xl font-thin display-flex align-middle mb-10">EDIT USER</h1>
		
		<form on:submit={updateUsername}>
		  <div class="md:form-control md:w-full md:left md:px-36 mt-5">
			<label class="label " for="username">
			  <span class="label-text">Username</span>
			</label>
			<input
			  type="text"
			  name="username"
        class="mb-10" 
        style="border-width: 0 0 2px 0;"
			  value={user.name}
			  required
			/>
		  </div>
		  <div class="md:form-control md:w-full md:left md:px-36 mt-5">
			<label class="label mb-5" for="job title">
			  <span class="label-text">Email</span>
			</label>
			<input
			  type="text"
			  name="email"
			  class="mb-10" 
        style="border-width: 0 0 2px 0;"
			  value={user.email}
			  required
			/>
		  </div>
		  <div class="md:form-control md:w-full md:left md:px-36 mt-5" style="    display: flex;
      justify-content: center;">
			{#if isLoading}
			  <div class="flex justify-center mt-5">
				<div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
			  </div>
			{:else}
			  <button class="btn-cross">UPDATE</button>
			{/if}
		  </div>
		</form>
		
		<div class="md:form-control md:w-full md:left md:px-36 mt-5" style="    display: flex;justify-content: center;">
		  {#if isLoading}
			  <div class="flex justify-center mt-5">
				  <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
			  </div>
		  {:else}
			  <button class="btn-cross" on:click={deleteUser}>DELETE User</button>
		  {/if}
	  </div>
	</div>
</main>
