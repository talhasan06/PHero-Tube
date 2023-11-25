const loadVideos=async(id)=>{
        const url =`https://openapi.programming-hero.com/api/videos/category/${id}`
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        data.status?displayVideos(data.data):displaySorry();
}

const displayVideos=videos=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.textContent=' ';
    const noVideo = document.getElementById("no-video");
    noVideo.textContent=' ';
    videos.forEach(video => {
        
        let postedDate=video.others.posted_date;
        let timeInSecs = Number(postedDate);
        let hours = Math.floor(timeInSecs / 3600);  
        timeInSecs = timeInSecs % 3600;
        let minutes = Math.floor(timeInSecs / 60);
        let seconds = timeInSecs % 60;

        const videoDiv=document.createElement('div');
        videoDiv.classList.add('col');
        videoDiv.innerHTML=`
            <div class="card">
            <img src=${video.thumbnail} class="card-img-top" alt="..." style="height:250px;">
            <p class="text-warning ms-auto pe-3" style="margin-top:-40px;">${hours} hours ${minutes} min ${seconds} sec</p>            
            <div class="card-body">
                <div class="d-flex">
                    <img class="me-3" src=${video.authors[0].profile_picture} alt="" style="height:40px; width:40px; border-radius:50%;">
                    <h5 class="card-title">${video.title}</h5>
                </div>
                <div style="margin-left:60px;">
                    <div class="d-flex align-items-center"> 
                        <h6 class="m-0 text-body-secondary">${video.authors[0].profile_name}</h6>
                        <span class="ms-1"> ${video.authors[0].verified ? `<img src="./images/check.png" style="width:20px"> ` : ""} </span>
                    </div>
                    <p class="m-0 text-body-secondary">${video.others.views} views</p>
                </div>
            </div>
            </div>
        `;
        videoContainer.appendChild(videoDiv);
    });
}

const displaySorry=()=>{
    const videoContainer=document.getElementById("video-container");
    videoContainer.textContent=' ';
    const noVideo = document.getElementById("no-video");
    // const noVideoPage=document.createElement('div');
    noVideo.innerHTML=`
        <div class="d-flex flex-column justify-content-center align-items-center">
            <img src="./images/no_video.svg" alt="">
            <h4>Oops!! Sorry, There is no content here</h4>
        </div>
    `
}

const openBlog=()=>{
    const url='blog.html'
    window.open(url,'_blank');
}

const loadAndSortVideos = (id) => {
    currentCategoryId = id;
    loadVideos(currentCategoryId);
};


const all = () => {
    setActiveButton("button-1");
    loadVideos("1000");
};

const music = () => {
    setActiveButton("button-2");
    loadVideos("1001");
};

const comedy = () => {
    setActiveButton("button-3");
    loadVideos("1003");
};

const drawing = () => {
    setActiveButton("button-4");
    // displaySorry();
    loadVideos("");
};

const setActiveButton = (buttonId) => {
    const buttons = ["button-1", "button-2", "button-3", "button-4"];
    buttons.forEach(btnId => {
        const button = document.getElementById(btnId);
        if (btnId === buttonId) {
            button.classList.add("active2");
        } else {
            button.classList.remove("active2");
        }
    });
};

loadVideos("1000");