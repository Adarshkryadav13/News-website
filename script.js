const API_KEY ="42b94f2b31644eb5a12d78b63731855e";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchnews("india"));
function reload(){
    window.location.reload();
}

async function fetchnews(query) {
   const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
   const data= await res.json();
   bindData(data.articles);
}

function bindData(articles){
    const cardscontainer=document.getElementById("cards-container");
    const newscardtemplate=document.getElementById("template-news-card");
    cardscontainer.innerHTML="";
    
    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardclone=newscardtemplate.content.cloneNode(true);
        fillDataIncard(cardclone, article);
        cardscontainer.appendChild(cardclone);
    });
} 
function fillDataIncard(cardclone,article){
    const newsImage=cardclone.querySelector('#news-image');
    const newsTitle=cardclone.querySelector('#news-title');
    const newssource=cardclone.querySelector('#news-source');
    const newsDecs=cardclone.querySelector('#news-decs');

     newsImage.src=article.urlToImage;
     newsTitle.innerHTML=article.title;
     newsDecs.innerHTML=article.description;

      const date=new Date(article.publishedAt).toLocaleString("en-us",{
        timeZone:"Asia/jakarta", 
      });
newssource.innerHTML=`${article.source.name} . ${date}`;

cardclone.firstElementChild.addEventListener('click',()=>{
   window.open(article.url,"_blank");
});

}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchnews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav= navItem;
    curSelectedNav.classList.add("active");
}
const searchButton=document.getElementById('search-button' );
const searchText=document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query)return;
    fetchnews(query);

});
