<script>
  export let data;
  import { goto } from '$app/navigation';
</script>

<svelte:head>
  <script src=""></script>
</svelte:head>
<main>
  <h1 class="text-center font-thin" style="
  font-size: 24px;
  margin-top:20px;
  margin-bottom:20px;
  
  ">Home Page</h1>
  <div class="p40" style="
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-around;
  ">
   {#each data.images as img}
          <a class="card w-96 bg-base-100 shadow-xl" href="/image/{img.id}" style="margin:10px;"  onclick={() => goto(`/image/${img.id}`)}>
                  <div class="card-body" style="overflow-wrap: anywhere;">
                    <figure style="height: 350px" class="relative">
                      <img src={img.url} alt="" />
                    </figure>
                      <div>
                          <div class="text-sm mt-1 ml-10">
                              <span class="text-sm">{img.price}</span>
                          </div>
                          <div style="padding: var(--padding-card, 2rem);">
                              {img.description.slice(0, 240)}...
                          </div>
                      </div>
                  </div>
          </a>
  
              
      {/each}
  </div>
</main>
