<script>
	import { getUserId,isLoggedInStore } from "../../../utils/auth";
    
    const userId = getUserId();
    console.log(userId)
    
    export let data;
    console.log(data.image.UserID)
</script>

<svelte:head>
  <script src=""></script>
</svelte:head>

<main>
    <div class="p40">

        <figure style="
        display:flex;
        justify-content:center;
        ">
            <img src={data.image.url} alt="" />
          </figure>
          <div class="flex-1 mt-10">
              <h1 class="text-3xl font-extrabold ml-5">{data.image.title}</h1>
          </div>

        <div class="flex" style="overflow-wrap: anywhere;">
            
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
        </div>
          <!-- Use action="/create-checkout-session.php" if your server is PHP based. -->
          <form action="/create-checkout-session" method="POST">
            <button type="submit">Checkout</button>
          </form>
        {#if userId === data.image.UserID}
            <a class="link-hover text-xs uppercase btn  mt-10 "
            href="./edit/{data.image.id}" style="
            display:flex;
            justify-content:center;">Edit Image</a>
                {/if}
            </div>   
        </main>
            