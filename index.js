 const videoCardcontainer = document.queryselector(".video-wrapper");
 
//  let api_key ="AIzaSyAhuRHwjVbebdg_sbDL9qEVu-qcY_mNC-8";
let api_key="AIzaSyDxLs1lcIBOb5xS2N3fcn_rCfXQ125HGJQ";
 let video_http =" https://www.googleapis.com/youtube/v3/videos?";
 let channel_http ="https://www.googleapis.com/youtube/v3/channels?";

 fetch(
    video_http +new URLSearchParams({
       part: "snippet,contentDetails,statistics,player", 
       chart:"mostPopular",
       maxResults: 20,
       regionCode:"IN",
       key: api_key,
    })
 )
 .then((res)=> res.json())
 .then((data)=>{
    data.items.forEach((item) =>{
        getChannelIcon(item);
    });
 })
 .catch((err)=> console.log(err));
 const getChannelIcon =(video_data)=>{
    fetch(
        channel_http + new URLSearchParams{(
            key: api_key,
            part: "snippet",
            id: video_data.snippet.channelId,
        )}
     )

    .then((res) => res.json())
    .then((data)=>{
        video_data.channelThumbnail =data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    });
   
};
 const makeVideoCard =(data) =>{
    const videoCard = document.createElement("div");
    videoCard.classList.add("video");
    videocard.innerHTML = `
    
        <><div class="video-content">
            <img src="${data.snippet.thumbnails.high.url}"class="thumbnail" alt="" />

        </div><div class="video-details">
                <div class="channel-logo">
                    <img src="${data.channelThumbnail}" class="channel-icon" alt="" />

                </div>
                <div class="details">
                    <h3 class="title">${data.snippet.title}</h3>
                    <div class="channel-name">${data.snippet.channelTitle
 }</div>
                </div>
            </div>

    `;
    videoCardcontainer.appendChild(videoCard);
 };