async function doGetRequest() {
    var data;
    var page = Number.parseInt((Math.random() * 34) + 1);

    const config = {
        method: 'get',
        url: `https://picsum.photos/v2/list?page=${page}`,
    }

    console.log(config);

    await axios(config).then(async r => data = await r.data).catch(err => console.log(err));
    return data;
}

function doRemoveAllImages() {
    const imageContainer = document.getElementById("images");
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.lastChild);
    }
}

function doInsertImages() {
    var images = doGetRequest();

    const imageContainer = document.getElementById("images");
    images.then(i => i.forEach(u => {
        let p = document.createElement("img");
        p.setAttribute("src",u["download_url"]);
        // let a = document.createElement("a");
        // p.setAttribute("alt",`photo by: ${u["author"]}`);
        // a.setAttribute("href",u["download_url"]);
        // a.setAttribute("target","blank");
        // a.setAttribute("id","imageLink");
        // a.appendChild(p);
        imageContainer.appendChild(p);
    }));    
}

window.onload = function(){
    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click",() => {
        doRemoveAllImages();
        doInsertImages(images);
    });

    doInsertImages(images);  
};
