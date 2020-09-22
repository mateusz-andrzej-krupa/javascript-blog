//'use strict';
{
  const optArticleSelector = '.post',
    optTitleListSelector = '.titles',
    optTitleSelector = '.post-title',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    //optTagListSelector = '.tag.list';
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';

  /* [DONE] Click listener on lef column */
  const titleClickHandler = function(){
    //console.log('this: ', this);
    event.preventDefault(); //ok-blokada przewijania strony do #
    const clickedElement = this; //do czego to służy?
    //console.log('Link was clicked!');
    //console.log('event', event);
    /* [DONE] remove class 'active' from all article links  */ 
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    //console.log('clickedElement', clickedElement);  //console.log('clickedElement+: ' + clickedElement);
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    /* [DONE] get 'href' attribute from the clicked link */
    const articleHref = clickedElement.getAttribute('href');
    //console.log('this is a articleHref:' , articleHref);
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const article = document.querySelector(articleHref); //TEGO NIE KUMAM
    //console.log(article);
    /* [DONE] add class 'active' to the correct article */ 
    article.classList.add('active');
  };
  /* [DONE] genertor links - left column */
  /*--------------------------- */
  const generateTitleLinks = function (CustomSelector = ''){
  //  //console.log('leftLinksGenerator-tested');
    /* [DONE] clear left panel - remove links list constent */
    const titleLinks = document.querySelector(optTitleListSelector);
    //titleLinks.innerHTML = '';
    let html = '';
    /* [DONE] for all articles: */ 
    const articles = document.querySelectorAll(optArticleSelector + CustomSelector);
    //console.log('to sa artykuły ', articles);
    //console.log('a to sa customSelector:', CustomSelector);
    for (let article of articles){
      /* [DONE] get a id of article and save as a const */
      const articleId = article.getAttribute('Id');
      //console.log('Id: ', articleId);
      /* [DONE] - find 'title' of article save as a const */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      //console.log('tytuł artykułu: ', articleTitle);     
      /* [DONE] generate HTML code and save as a const */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log('HTML code: ', linkHTML);    
      /* [DONE] display links in a  column */     
      //[v1] titleLinks.innerHTML = titleLinks.innerHTML + linkHTML;
      //[v2] titleLinks.insertAdjacentHTML("beforeend", linkHTML);
      //[v3]:
      html = html + linkHTML;
      //console.log('htmllink', html);
      //console.log(optTitleSelector, CustomSelector);
    }
    titleLinks.innerHTML = html;
    //console.log('tt ', titleLinks);    
    /* Initiate titleClickHandler */
    const links = document.querySelectorAll('.titles a');
    //console.log('to sa linki', links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();
  /* --------------------------- */
  const calculateTagsParams = function(tags) {
    const params = { max: 0, min: 999999 };
    for( let tag in tags ){
      //console.log(`${tag} is used: ${allTags[tag]}`);
      /*if(allTags[tag] > params.max) {
        params.max = allTags[tag];
        console.log(params);
      }*/
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      //console.log(params.max);
      //params.max = Math.max(allTags[tag], params.max);
      //console.log(params.max);
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
      //console.log('paramMin', params.min);
    }
    console.log(params);
    return params;
  };
  const calculateTagClass = function(count, params) {
    /*const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount -1));
    */
    const classNumber = Math.floor((( count - params.min) / (params.max - params.min)) * optCloudClassCount + 1 );
    console.log('numer klasy', classNumber);
    return;
  };
  const generateTags = function(){ 

    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};
    //console.log('obiekt tagow: ', allTags);
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    /* [DONE] START LOOP: for every article: */
    for (let article of articles){      
      /* [DONE] find tags wrapper */
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      //console.log('tagWrapper: ', tagWrapper); 
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-tags attribute */
      const tags = article.getAttribute('data-tags');
      //console.log('data-tags are:' , tags);
      /* [DONE] split tags into array */
      const tagsArray = tags.split(' ');
      //console.log('tagsArray: ', tagsArray);
      /* [DONE] START LOOP: for each tag */
      for (let tag of tagsArray){
        /* [DONE] generate HTML of the link */
        const tagLink = `<li><a href="#tag-${ tag }">${ tag }</a></li>`;
        //console.log('tagLink', tagLink);     
        /* [DONE] add generated code to html variable */
        html = html + tagLink + (' ');
        //console.log('htmllink', html);~~
        /* [DONE] check if this link is NOT already in allTags */
        if(!allTags[tag]){
          /* [DONE] add generated code to allTags array */
          allTags[tag]= 1;
        } else {
          allTags[tag]++;
        }
      /* [OK] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;
      //console.log('tagWrapper ', tagWrapper );    
      /* [OK] END LOOP: for every article: */

      /* [NEW] find list of tags in right column */
      const tagList = document.querySelector('.tags');

      /* [NEW] add html from allTags to tagList */
      //tagList.innerHTML = allTags.join(' ');
      const tagsParams = calculateTagsParams(allTags);
      //console.log('tagsParams', tagsParams);
      let allTagsHTML = '';
      for(let tag in allTags){
        //allTagsHTML += tag + ' (' + allTags[tag] +') ';
        allTagsHTML += 
        //<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>
        `<li><a class="${ calculateTagClass(allTags[tag], tagsParams)} " href="#tag-${ tag }"><span> ${ tag } ( ${ allTags[tag] } ) </span></a></li>`;
        //console.log('allTagsHTML',allTagsHTML);
      }
      tagList.innerHTML = allTagsHTML;
      //console.log('lista tagow', tagList);
    }
    //console.log('obiekt linkow tagow: ', tagList);
  };
  generateTags();
  /* ----------------------------- */
  const tagClickHandler = function(){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    //console.log('event', event);
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('this', clickedElement);
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    //console.log('href to: ', href);
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    //console.log('tag bez #: ', tag);
    /* [DONE] find all tag links with class active */
    const tagActives = document.querySelectorAll('a.active[href^="#tag-"]');
    //console.log('tagi aktywne: ', tagActives); // !!! wyswietla wartość "NodeList []"" !!!
    /* [DONE] START LOOP: for each active tag link */ 
    for (const tagActive of tagActives){
      //console.log('test');
      /* [DONE] remove class active */
      tagActive.classList.remove('active');
      //console.log('deaktywne tagi: ', tagActive);
    /* [OK] END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    //console.log('equal', tagLinks);
    /* [DONE] START LOOP: for each found tag link */
    for (const tagLink of tagLinks){
    /* [DONE] add class active */
      tagLink.classList.add('active');
      //console.log('tagi aktywne: ', tagLink);
    /* [OK] END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const tags = document.querySelectorAll('.post-tags a');
  //console.log('tagi:', tags);
  for(let tag of tags){
    tag.addEventListener('click', tagClickHandler);
  }

  const addClickListenersToTags = function(){
  /* [DONE] find all links to tags */
    const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
    /* [DONE] START LOOP: for each link */
    for (const linkToTag of linksToTags){
      /* [DONE] add tagClickHandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);
      //console.log('this is link to tag', linkToTag);
      /* [OK] END LOOP: for each link */
    }

  };
  addClickListenersToTags();
  /*-------------------*/
  const generateAuthors = function(){
  /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    /* [OK] START LOOP: for every article: */
    for (let article of articles){
      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      //console.log('wrappery autorow: ', authorWrapper);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get author from data-autor attribute */
      const author = article.getAttribute('data-author');
      //console.log('autor to: ', author);
      /* replace ' ' with '_'  in author name */
      const author_name = author.replace(' ', '_');
      //console.log('author_name', author_name);
      /* [DONE] generate HTML of the link */
      const authorLink = '<a href="#author_' + author_name + '"> by: ' + author + '</a>';
      //console.log('linki dla autorow:', authorLink);
      /* [DONE] add generated code to html variable */
      html = html + authorLink;
      //console.log('html dla autorow', html);
      /* [DONE] insert HTML of all the links into the tags wrapper */
      authorWrapper.innerHTML = html;
      //console.log('html: ', html);
      /* [OK] END LOOP: for every article: */
    }
  };
  generateAuthors();
  /* ----------------------------- */
  /* [ IN PROCESS ] */
  const authorClickHandler = function(event){
    event.preventDefault();
    //console.log('event', event);
    const clickedElement = this;
    //console.log('this', clickedElement, 'ENDTHIS');
    const href = clickedElement.getAttribute('href');
    //console.log('AUTHOR href to: ', href);
    const author = href.replace('#author_', '');
    //console.log('Autor bez #: ', author);
    const authorWithout_ = author.replace('_', ' ');
    //console.log('author bez _:', authorWithout_);
    const authorActives = document.querySelectorAll('a.active[href^="#author"]');
    //console.log('autorzy aktywni:', authorActives); // !!! wyswietla wartość "NodeList []"" !!!
    for (let authorDeactive of authorActives){
      authorDeactive.classList.remove('active');
      console.log('deaktywne tagiAutorow:', authorDeactive); // wyswietla sie po drugim kliknieciu i wykonuje trzykrotnie; 
    }
    const authorLinks = document.querySelectorAll('article[href="' + href + '"]');
    //console.log('equal', authorLinks);
    for (let authorLink of authorLinks){
      authorLink.classList.add('active');
      console.log('autorzy aktywni: ', authorLink);
    }
    generateTitleLinks('[data-author="' + authorWithout_ + '"]');
    //console.log(generateTitleLinks);
  };
  const Auhtors = document.querySelectorAll('.post-author a');
  //console.log('autorzy: :', Auhtors);
  for(let author of Auhtors){
    author.addEventListener('click', authorClickHandler);
    //console.log(author);
  }
  const addClickListenersToAuthors = function(){
    const linksToAuthors = document.querySelectorAll('a[href^="#author"]');
    //console.log('linki do autorów', linksToAuthors);
    for (const linkToAuthor of linksToAuthors){
      linkToAuthor.addEventListener('click', authorClickHandler);
      //console.log('this is link to Author', linkToAuthor);
    }
  };
  addClickListenersToAuthors();

  /* do usuniecia - cwiczenia tablic------------------------------------ */
  /*
  const categories = [];
  categories.push('animals');
  categories.push('travel');
  console.log('cat', categories);
  const categoriesLength = categories.length;
  console.log('catLength', categoriesLength);
  const firstCategory = categories[0];
  console.log('piersza kategoria:', firstCategory);
  const indexOfSecondCategory = 1;
  const secondCategory = categories[indexOfSecondCategory];
  console.log('druga kategoria:', secondCategory);
  const indexOfTravel = categories.indexOf('travel');
  console.log('indexOfTravel to:', indexOfTravel);
  const indexOfCars = categories.indexOf('cars');
  console.log('czy w tablicy jest/sa cars? :', indexOfCars);
  categories.push('fruits');
  categories.push('food');
  categories.push('phones');
  console.log(categories);
  const indexOfFruits = categories.indexOf('fruits');
  console.log('indeks dla fruit', indexOfFruits);
  const removedValues = categories.splice(indexOfFruits,1);
  console.log(categories);
  const indexOfFood = categories.indexOf('food');
  console.log('indexOfFood:', indexOfFood);
  categories.splice(indexOfFood, 2);
  console.log(categories);
  const joinedArrayElement = categories.join('- ');
  console.log(joinedArrayElement);
  const html = '<ul><li>' +  categories.join('</li><li>')+ '</li></ul>';
  console.log('html', html);
  const topic = 'uno, dos, tres';
  console.log('topic', topic);
  const topicArray = topic.split(', ');
  console.log(topicArray);
    
  const keywords = ['travel', 'France'];
  keywords.push('Paris');
  console.log('keywords',keywords);
  */

  /* do usuniecia - cwiczenia objiektow------------------------------------ */
  /*
  const points = {};
  console.log('points', points);
  const playerColors = {eve: 'blue', bob: 'green'}
  console.log('playerColors', playerColors);
  const bestScores = {'!best': 123, '777': 118, 'Mr. doctor': 103};
  console.log(bestScores);
  points.eve = 2222;
  points['bob'] = 987987;
  console.log(points);
  const evesPoints =points.eve;
  console.log(evesPoints);
  const bobsPoints=points['bob'];
  console.log(bobsPoints);
  const keyFor777 = '777';
  const bestScore = bestScores[keyFor777];
  console.log('bestScore:', bestScore);
  points['eve']=17;
  console.log('newPoints:', points);
  points.bob=23;
  console.log('newPoints:', points);
  points.eve++;
  console.log('newPoints:', points);
  const eveKey = 'eve';
  playerColors[eveKey]='black';
  console.log(playerColors);
  const keyBobExist = playerColors.hasOwnProperty('bob');
  console.log('czy istnieje klucz o nazwie "bob"',keyBobExist);
  const keyElyExist = playerColors.hasOwnProperty('ely');
  console.log('czy istnieje klucz o nazwie "ely"',keyElyExist);
  const address = {
    street: 'mickiewicza',
    building: 'A',
    room: '55'
  };
  for (let key in address) {
  console.log('klucz: ' + key + ' ma wartosc: ' + address[key]);
  }
  
  const calculate = {
    multiply: function(a, b){
      return a * b;
    }
  };
  
  const multiplyOf = calculate.multiply(3, 5);
  console.log('wynik mnozenia 2 x 5 =', multiplyOf);
  
  const fav= {
    food:'pizza',
    film: 'good father',
    music: 'disco',
  };
  console.log(fav);
  const newFav = {
    sport: 'football',
    food: 'coffee'
  };
  Object.assign( fav, newFav);
  console.log(fav);
  
  const myHome = {
    windows: 5,
    rooms: {
     livingroom: 1,
     badroom: 2,
     kitchen: 1,
     corridor: 1,
    },
  };
  console.log('myHome: ', myHome);
  const yourHome = Object.assign({}, myHome);
  console.log('yourHome: ', yourHome);
  
  yourHome.windows = 555;
  yourHome.rooms.badroom = 1;
  
  console.log('myHome: ', myHome);
  
  console.log('yourHome: ', yourHome);
  */
}