<script>
  export let data;

</script>
<svelte:head>
  <script src=""></script>
</svelte:head>

<h1 class="text-center text-xl font-bold">Home Page</h1>

<div class="overflow-x-auto w-full">
    {#each data.images as img}
        <div class="flex flex-col mt-10">
            <div class=card>
              <figure style="height: 350px" class="relative">
              <img src={img.url} alt="" />
              </figure>
                <a class="font-bold text-2xl ml-5" href="/img/{img.id}">{img.title}</a>
                <div class="text-sm mt-1 ml-10">
                    {img.price}   
               </div>
            </div>

            <div class="mt-4 ml-10">
                {img.description.slice(0, 240)}...
            </div>
        </div>
    {/each}
</div>

