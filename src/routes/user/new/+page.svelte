<script>
    import { PUBLIC_BACKEND_BASE_URL } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { authenticateUser } from '../../../utils/auth';
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
        await authenticateUser(userData.email, userData.password);
        postSignUp()
      } else {
        const res = await resp.json();
        formErrors = res.error;
      }
    }

  </script>

  <main>
    <div class="p40">

      
      <h1 class="text-center text-3xl font-thin display-flex align-middle mb-10">Create an Account to Post Images</h1>
      <div class="text-center">
          <a class="link-hover italic text-xs" href="/login">Already have an account? Click here to login instead.</a>
      </div>
      <div class="flex justify-center items-center mt-8">
          <form on:submit={createUser} class="w-1/3">
              <div class="form-control w-full">
                  <label class="label" for="username" >
                      <span class="label-text mb-3">Username</span>
                  </label>
                  <input type="text" name="username" class=" w-full mb-10" style="border-width: 0 0 2px 0;"/>
                  {#if 'username' in formErrors}
                    <label class="label" for="username">
                        <span class="label-text-alt text-red-500">{formErrors['username'].message}</span>
                    </label>
                  {/if}
              </div>
      
              <div class="form-control w-full">
                  <label class="label" for="email">
                      <span class="label-text mb-3">Email</span>
                  </label>
                  <input type="email" name="email" class=" w-full mb-10" style="border-width: 0 0 2px 0;" required />
                  {#if 'email' in formErrors}
                  <label class="label" for="email">
                      <span class="label-text-alt text-red-500">{formErrors.email}</span>
                  </label>
                  {/if}
              </div>
      
              <div class="form-control w-full">
                  <label class="label" for="password">
                      <span class="label-text mb-3">Password</span>
                  </label>
                  <input type="password" name="password"  class=" w-full mb-10" style="border-width: 0 0 2px 0;" required />
                  {#if 'password' in formErrors}
                  <label class="label" for="password">
                      <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
                  </label>
                  {/if}
              </div>
      
              <div class="form-control w-full">
                  <label class="label" for="password">
                      <span class="label-text mb-3">Confirm Password</span>
                  </label>
                  <input type="password" name="password-confirmation" placeholder="" class=" w-full mb-10" style="border-width: 0 0 2px 0;"required />
                  {#if 'password' in formErrors}
                  <label class="label" for="password">
                      <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
                  </label>
                  {/if}
              </div>
      
              <div class="form-control w-full mt-4">
                  <button class="btn-cross ">Create an Account</button>
              </div>
          </form>
      </div>
    </div>
  </main>