<script>
  import { goto } from '$app/navigation';

</script>

<svelte:head>
  <script src=""></script>
</svelte:head>

<main>
    <div class="p40"  style="
    display: flex;
    flex-direction: column;
    align-items:center;
    ">
        <h1 class="mb-10 text-center font-thin" style="
        font-size: 24px;">Payment Failed...</h1>

        <a href="/" onclick={() => goto(`/`)} class="btn-cross">Back to Home</a>
         
    </div>  
</main>
            