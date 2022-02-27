let news = []
let menus = document.querySelectorAll("#menu-list button");
menus.forEach(menu=> menu.addEventListener("click", (event)=>getNewsByTopic(event)))
let searchButton = document.getElementById("search-button");
let url;

// 각 함수에서 필요한 url을 만든다.
// api호출 함수를 부른다.

const getNews = async() => {
    try{
        let header = new Headers({'x-api-key':'f47Cd1yxbBat0UnmrAdayloWFfrNn8yV1Yiw9JL6D6o'});
        let response = await fetch(url,{headers:header}); //ajax, http, fetch
        let data = await response.json();
        console.log(data)
        if(response.status == 200){
            if(data.total_hits == 0){
                throw new Error("검색된 결과 값이 없습니다.")
            }
        news = data.articles;
        render();
        } else {
            throw new Error(data.message)
        }
    }
    catch(error){
        console.log("잡힌 에러는 ", error.message)
        errorRender(error.message);
    }
    
}


const getLatesNews = async()=>{
    url= new URL('https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10');
    getNews();
}

const getNewsByTopic = async(event) =>{    
    let topic = event.target.textContent.toLowerCase();
    url = new URL(`https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`)
    getNews();
}

const getNewsByKeyword = async()=>{
    // 1. 검색 키워드 읽어오기
    // 2. url에 검색 키워드 붙이기
    // 3. 헤더 준비
    // 4. url 부르기
    // 5. 데이터 가져오기
    // 6. 데이터 보여주기
    let keyword = document.getElementById("search-input").value;
    url = new URL(`https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`);
    getNews();
    console.log(keyword)
}

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
};

 const render = () => {
     let newsHTML = ''
      newsHTML = news.map(item=>{
          return `<div class="row news">
          <div class="col-lg-4">
          <img class="news-img-size" src="${item.media}"/>
      </div>
      <div class="col-lg-8">
          <a class="title" target="_blank" background="white" href="${item.link}">
                ${item.title}
          </a>
          <p class="txt">
          ${
            item.summary == null || item.summary == ""
              ? "내용없음"
              : item.summary
          }
          </p>
          <div>${item.rights || "no source"}  ${item.published_date}

          </div>
      </div>
    </div>`
      }).join('');

     document.getElementById("news-board").innerHTML=newsHTML

}


const errorRender = (message) => {
    let errorHTML = `<div class="alert alert-danger text-center" role="alert">
    ${message}
  </div>`
    document.getElementById("news-board").innerHTML=errorHTML
}



searchButton.addEventListener("click",getNewsByKeyword);
getLatesNews()


const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
};


const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
};

