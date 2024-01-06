<script>
	import { getUserId} from "../../../../utils/auth";
  import { goto } from '$app/navigation';
    
    const userId = getUserId();
    console.log(userId)
    
    export let data;
    console.log(data.image.UserID)

    export const imageId  = data.image.id; // Assuming the imageId is sent in the request body
    console.log(imageId)

    const downloadImage = () => {
    // 画像のURLを取得
    const imageUrl = data.image.url;

    // 画像をダウンロードするために <a> 要素を作成
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "image.jpg"; // ダウンロード時のファイル名

    // <a> 要素をクリックしてダウンロードを開始
    link.click();
  };

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
        font-size: 24px;">Thank you for your payment!</h1>
        <figure class="mb-10">
            <img src={data.image.url} alt="" />
        </figure>
        <button on:click={downloadImage} class="btn-cross mb-10">Download Image</button>
        <a href="/" onclick={() => goto(`/`)} class="btn-cross">Back to Home</a>
         
    </div>  
</main>
            