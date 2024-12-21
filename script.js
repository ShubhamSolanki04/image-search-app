const apikey='bmBMpZ0XnokC3x9yis28OE7olaAtedxoXEvhRo98c8Y'

const formEL=document.querySelector("form")
const input =  document.getElementById('search-input')
const searchResult=document.querySelector('.search-results')
const showMore = document.getElementById('show-more');


let inputdata=""
let page=1;

async function searchImages() {
      inputdata = input.value;
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${
      inputdata}&client_id=${apikey}`;

      const response = await fetch(url)
      const data = await response.json()

      const results = data.results

      if (page===1) {
        searchResult.innerHTML="" 
      }

      results.map((x)=>{
        const imgwrapper=document.createElement('div')
        imgwrapper.classList.add("search-result")

        const image = document.createElement('img')
        image.src = x.urls.small

        const imglink = document.createElement('a')
        imglink.href=x.links.html
        imglink.target="_blank"
        imglink.textContent = x.alt_description

        imgwrapper.appendChild(image)
        imgwrapper.appendChild(imglink)
        searchResult.appendChild(imgwrapper)
    });

    page++

    if(page>1){
        showMore.style.display="block"
    }
}

formEL.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1;
    searchImages()
})

showMore.addEventListener("click",()=>{
    searchImages()
})

