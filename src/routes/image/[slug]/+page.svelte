<script>
	import { getUserId,isLoggedInStore } from "../../../utils/auth";
    
    const userId = getUserId();
    
    export let data;
</script>

<svelte:head>
  <script src=""></script>
</svelte:head>

<p>slug page</p>

<main>
    <div class="p40">
        <div class="flex" style="overflow-wrap: anywhere;">
            <figure style="height: 350px" class="relative">
                <img src={data.image.url} alt="" />
              </figure>
            </div>
            <div class="flex-1">
                <h1 class="text-3xl font-extrabold ml-5">{data.image.title}</h1>
            </div>
    
        <div class="flex flex-row w-full mt-8" style="overflow-wrap: anywhere;"az>
            <div class="basis-2/3 prose max-w-none w-full ml-5" >
                <h2 class="text-xl font-thin">Description</h2>
                <div class="mt-4 ml-10">
                    {data.image.description}
                  </div>
            </div>
            <div class="basis-1/3 ml-4">
                <h2 class="text-xl font-thin" style="margin-bottom: 1em;">Price</h2>
                <p>
                    {data.image.price} 
                </p>
            </div>
        </div>
        <!-- {#if userId === data.image.user}
        {#if $isLoggedInStore} -->
        <a class="link-hover text-xs uppercase btn ml-20 mt-10 "
          href="./edit/{data.image.id}">Edit Image</a>
          <!-- {/if}
          {/if} -->
    </div>
</main>
