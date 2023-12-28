<script>
import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
import { uploadMedia } from '../../../utils/s3-uploader.js';
import { goto } from '$app/navigation';

let formErrors = {}; // formErrorsを宣言

function postSignUp() {
      goto('/');
    }

  async function uploadImage(evt) {
    const [fileName, fileUrl] = await uploadMedia(evt.target['fileInput'].files[0]);

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/img', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(displayImages)
      });

    if (resp.status == 200) {
          postSignUp(); 
      } else {
        const res = await resp.json();
        formErrors = res.error;
      }
  }


</script>

<svelte:head>
  <script src="/aws-sdk-s3.min.js"></script>
</svelte:head>


<form on:submit|preventDefault={uploadImage} class="w-1/3">
  <div class="form-control w-full mt-2">
    <input type="file" name="file" />
    {#if 'file' in formErrors }
      <label class="label" for="file">
        <span class="label-text-alt text-red-500">{formErrors['file']} </span>
      </label>
    {/if}
  </div>
  <div class="form-control w-full mt-4">
    <button class="btn btn-md">Upload</button>
  </div>
</form>