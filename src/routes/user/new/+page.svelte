<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    let formErrors = {};
  
    function postSignUp() {
      goto('/');
    }
  
    async function createUser(evt) {
      evt.preventDefault()
  
      const userData = {
        name: evt.target['username'].value,
        email: evt.target['email'].value,
        password: evt.target['password'].value,
      };
  
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
  
      if (resp.status == 200) {
          postSignUp(); 
      } else {
        const res = await resp.json();
        formErrors = res.error;
      }
    }

  </script>
  
  <h1 class="text-center text-xl" style = "margin-top:20px;">Create an Account to Post a Job</h1>
  <div class="text-center">
      <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
  </div>
  <div class="flex justify-center items-center mt-8">
      <form on:submit={createUser} class="w-1/3">
          <div class="form-control w-full">
              <label class="label" for="username">
                  <span class="label-text">Username</span>
              </label>
              <input type="text" name="username" placeholder="johndoe" class="input input-bordered w-full" />
              {#if 'username' in formErrors}
                <label class="label" for="username">
                    <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
                </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="email">
                  <span class="label-text">Email</span>
              </label>
              <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
              {#if 'email' in formErrors}
              <label class="label" for="email">
                  <span class="label-text-alt text-red-500">{formErrors.email}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text">Password</span>
              </label>
              <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full">
              <label class="label" for="password">
                  <span class="label-text">Confirm Password</span>
              </label>
              <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
              {#if 'password' in formErrors}
              <label class="label" for="password">
                  <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
              </label>
              {/if}
          </div>
  
          <div class="form-control w-full mt-4">
              <button class="btn btn-md">Create an Account</button>
          </div>
      </form>
  </div>