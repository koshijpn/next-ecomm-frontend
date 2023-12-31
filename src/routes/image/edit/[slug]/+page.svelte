<script>
    export let data;
    import { PUBLIC_BACKEND_BASE_URL} from '$env/static/public';
    import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    import { getUserId, getTokenFromLocalStorage} from '../../../../utils/auth';

    let isLoading = false   
    let formErrors = {}
	let user = {};

	const userId = getUserId();

	console.log(userId)
	console.log(data.image)


    function afterUpdateImage(){
        goto('/')
    }

    async function updateImage(evt){
        evt.preventDefault() 
    
    const inputData = {
        UserID: getUserId(),
        price: parseInt(evt.target['price'].value, 10), 
        filename: data.image.fileName,
        title: evt.target['title'].value,
        description: evt.target['description'].value,
        url: data.image.fileUrl,
        name: user.name,
		email: user.email,
		password: user.password
		};
        isLoading = true

		const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/img/${data.image.id}`, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': getTokenFromLocalStorage()
			},
			body: JSON.stringify(inputData)
		});

		if (resp.status === 200) {
			afterUpdateImage();
		} else {
			const res = await resp.json;
			formErrors = res.data;
		}
        isLoading = false
    }

    async function deleteImage() {
    isLoading = true;

    const resp = await fetch(PUBLIC_BACKEND_BASE_URL + `/img/${data.image.id}`, {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': getTokenFromLocalStorage()
        },
    });

    if (resp.status === 200) {
        // 削除成功時の処理
        // 例: 削除後に別のページにリダイレクトするなど
        goto('/');
    } else {
        console.error('Error:', resp.statusText);
        // エラー時の処理を追加
        // 例: エラーメッセージを表示するなど
    }
    isLoading = false;
}

</script>
<main>
	<div class="p40">
		
		
		<h1 class="text-center text-3xl font-bold display-flex align-middle mb-10">EDIT IMAGE</h1>
		{#if userId !== data.image.UserID}
		<h2 class="text-center text-3l font-bold display-flex align-middle">You cannot change </h2>
		{/if}
		{#if userId === data.image.UserID}
		<div>
			<form on:submit={updateImage}>
				<figure style="
				display:flex;
				justify-content:center;
				">
					<img src={data.image.url} alt="" />
				  </figure>
				<div class="form-control w-full left px-36 mt-5">
					<label class="label" for="title">
						<span class="label-text">Title</span>
					</label>
					<input
						type="text"
						name="title"
						class="input input-bordered w-full"
						value={data.image.title}
						required
					/>
				</div>
				<div class="form-control w=full px-36 mt-5">
					<label class="label" for="price">
						<span class="label-text">Price</span>
					</label>
					<input
						type="number"
						name="price"
						class="input input-bordered w-full"
						value={data.image.price}
						required
					/>
				</div>
				<div class="form-control w=full px-36 mt-5">
					<label class="label" for="description">
						<span class="label-text">Description</span>
					</label>
					<textarea
						type="text"
						name="description"
						class="textarea textarea-bordered w-full h-56"
						value={data.image.description}
						required
					/>
				</div>


				<div class="form-control w-full px-36 mt-5">
					{#if isLoading}
					<div class="flex justify-center mt-5">
					  <div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
					</div>
				  {:else}
					<button class="btn text 3xl">UPDATE IMAGE</button>
				  {/if}
				</div>
			</form>
		</div>
		<div class="form-control w-full px-36 mt-5">
			{#if isLoading}
				<div class="flex justify-center mt-5">
					<div class="loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-12 w-12"></div>
				</div>
			{:else}
				<button class="btn text-3xl" on:click={deleteImage}>DELETE IMAGE</button>
			{/if}
		</div>
		{/if}
		
		
		

	</div>	
</main>	
