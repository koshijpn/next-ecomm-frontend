
<script>
  import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
  import { uploadMedia } from '../../../utils/s3-uploader.js';
  import { isLoggedInStore, getTokenFromLocalStorage, getUserId, getUserInfo } from '../../../utils/auth.js';
  import { goto } from '$app/navigation';

  let isLoading = false;
  let formErrors = {};

  async function uploadImage(evt) {
    evt.preventDefault();

    const fileInput = evt.target['fileInput'];
    const file = fileInput.files[0];

    if (!file) {
      alert('Please select a file.');
      return;
    }

    try {
      const [fileName, fileUrl] = await uploadMedia(file);

      const postData = {
        UserID: getUserId(),
        price: evt.target['price'].value,
        filename: fileName,
        title: evt.target['title'].value,
        description: evt.target['description'].value,
        url: fileUrl,
        name: evt.target['name'].value,  // 追加
        email: evt.target['email'].value,  // 追加
        password: evt.target['password'].value,  // 追加
      };

      console.log(postData)

      isLoading = true;

      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/img', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage(),
        },
        body: JSON.stringify(postData),
      });

      if (resp.ok) {
        goto('/');
      } else {
        const res = await resp.json();
        formErrors = res.error;
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
    }
  }
</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>

{#if $isLoggedInStore}
  <main>
    <div class="p40">
      <h1 class="text-center text-3xl font-thin display-flex align-middle">UPLOAD IMAGE</h1>
      <div>
        <form on:submit={uploadImage} class="w-1/3">
          <!-- Input fields for the form -->
          <div class="form-control w-full mt-2">
            <input type="file" name="fileInput" />
            {#if 'fileInput' in formErrors }
              <label class="label" for="fileInput">
                <span class="label-text-alt text-red-500">{formErrors['fileInput']} </span>
              </label>
            {/if}
            <p>price</p>
            <input type="price" name="price" />
            <p>title</p>
            <input type="title" name="title" />
            <p>discription</p>
            <input type="description" name="description" />
          </div>
          <div class="form-control w-full mt-4">
            {#if isLoading}
              <div class="flex justify-center mt-5">
                <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
              </div>
            {:else}
              <button class="btn btn-md">Upload</button>
            {/if}
          </div>
        </form>
      </div>
    </div>
  </main>
{/if}
