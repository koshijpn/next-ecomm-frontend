<script>
	import { getUserId,isLoggedInStore } from "../../../utils/auth";
    import { PUBLIC_PAYMENT_URL } from '$env/static/public';
    
    const userId = getUserId();
    console.log(userId)
    
    export let data;
    console.log(data.image.UserID)

    export const imageId  = data.image.id; // Assuming the imageId is sent in the request body
    console.log(imageId)

    const paymentUrl = PUBLIC_PAYMENT_URL + "/create-checkout-session";

    async function checkout ( data){
    const imageId = data.image.id;
    

    const resp = await fetch(paymentUrl , {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
		body: JSON.stringify({ imageId })
    });

    if (resp.ok) {
    const sessionUrl = await resp.json();
    // Redirect the user to the Stripe checkout page using the session URL
    window.location.href = sessionUrl;
  } else {
    console.error('Failed to create checkout session:', resp.statusText);
    // Handle error scenario
  }
  }


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
                        USD{data.image.price} 
                    </p>
                </div>
            </div>
        </div>
            <!-- <form action="{paymentUrl}" method="POST" > -->
                <!-- <form action="{paymentUrl}" method="POST"> -->
                <!-- <button type="submit" class="link-hover text-xs uppercase btn mt-10" style="
                display:flex;
                justify-content:center;">Checkout</button>
              </form> -->
              <button on:click={() => checkout(data)} class="btn btn-primary" type="submit" id="checkout-button">Buy Now</button>
        {#if userId === data.image.UserID}
            <a class="link-hover text-xs uppercase btn  mt-10 "
            href="./edit/{data.image.id}" style="
            display:flex;
            justify-content:center;">Edit Image</a>
                {/if}
            </div>   
        </main>
            