async function doGetRequest() {
    var data;
    var page = Number.parseInt((Math.random() * 34) + 1);

    const config = {
        method: 'get',
        url: `https://picsum.photos/v2/list?page=${page}`,
    }

    console.log(config);

    // axios working via CDN in html
    await axios(config).then(async r => data = await r.data).catch(err => console.log(err));
    return data;
}

function doRemoveAllImages() {
    const imageContainer = document.getElementById("images");
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.lastChild);
    }
}

function doRemoveCarousel() {
    const carousel = document.querySelector(".carousel.slide");
    carousel.remove()
}

function doInsertCarousel(images) {
    const outerContainer = document.querySelector(".container.slideshow");
    let cd = document.createElement("div");
    cd.setAttribute("class","carousel slide");
    cd.setAttribute("data-ride","carousel");
    // cd.setAttribute("data-pause","none");
    cd.setAttribute("data-interval","False");

    let icd = document.createElement("div");
    icd.setAttribute("class","carousel-inner");
    cd.appendChild(icd);
    outerContainer.appendChild(cd);

    images.then(i => i.forEach(u => {
        let p = document.createElement("img");
        p.setAttribute("src",u["download_url"]);
        p.setAttribute("alt",`photo by ${u["author"]}`);
        p.setAttribute("data-toggle","tooltip");
        p.setAttribute("title",`photo by ${u["author"]}`);
        p.setAttribute("class","d-block");
        let pcd = document.createElement("div");
        if (icd.childElementCount < 1) {
            pcd.setAttribute("class","carousel-item active");    
        } else {
            pcd.setAttribute("class","carousel-item");
        }
        pcd.appendChild(p);
        icd.appendChild(pcd);
        
    }));    
    
    cd.setAttribute("data-interval","2000");
    $(".carousel.slide").carousel();

}

function doInsertImages(images) {
    const imageContainer = document.getElementById("images");

    images.then(i => i.forEach(u => {
        let p = document.createElement("img");
        p.setAttribute("src",u["download_url"]);
        p.setAttribute("alt",`photo by ${u["author"]}`);
        p.setAttribute("data-toggle","tooltip");
        p.setAttribute("title",`photo by ${u["author"]}`);
        let a = document.createElement("a");
        a.setAttribute("href",u["url"]);
        a.setAttribute("target","blank");
        a.setAttribute("class","imageLink");
        a.appendChild(p);
        imageContainer.appendChild(a);

    }));    

}

window.onload = function(){
    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click",() => {
        doRemoveAllImages();
        var images = doGetRequest();
        doInsertImages(images);
        doRemoveCarousel();
        doInsertCarousel(images);
    });

    var images = doGetRequest();
    doInsertImages(images);  
    doInsertCarousel(images);
};
