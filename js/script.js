//'use strict';
{
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML)
  };
  const optArticleAuthorSelector = '.post-author';
  const optArticleSelector = '.post';
  const optArticleTagsSelector = '.post-tags .list';
  const optCloudClassCount = '5';
  const optTitleListSelector = '.titles';
  const optTitleSelector = '.post-title';

  const titleClickHandler = function(){
    event.preventDefault(); 
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('article.active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
    const articleHref = clickedElement.getAttribute('href');
    const article = document.querySelector(articleHref);
    article.classList.add('active');
  };
  /*--------------------------- */
  const generateTitleLinks = function (CustomSelector = ''){
    const titleLinks = document.querySelector(optTitleListSelector);
    let html = '';
    const articles = document.querySelectorAll(optArticleSelector + CustomSelector);
    for (let article of articles){
      const articleId = article.getAttribute('Id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      html = html + linkHTML;
    }
    titleLinks.innerHTML = html;
    const links = document.querySelectorAll('.titles a');
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  };
  generateTitleLinks();
  /* --------------------------- */
  const calculateTagsParams = function(tags) {
    const params = { max: 0, min: 999999 };
    for( let tag in tags ){
      params.max = tags[tag] > params.max ? tags[tag] : params.max;
      params.min = tags[tag] < params.min ? tags[tag] : params.min;
    }
    return params;
  };
  const calculateTagClass = function(count, params) {
    const classNumber = Math.floor((( count - params.min) / (params.max - params.min)) * optCloudClassCount + 1 );
    return classNumber;
  };
  const generateTags = function(){ 
    let allTags = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles){      
      const tagWrapper = article.querySelector(optArticleTagsSelector);
      let html = '';
      const tags = article.getAttribute('data-tags');
      const tagsArray = tags.split(' ');
      for (let tag of tagsArray){
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData); 
        html = html + linkHTML + (' ');
        if(!allTags[tag]){
          allTags[tag]= 1;
        } else {
          allTags[tag]++;
        }
      }
      tagWrapper.innerHTML = html;
      const tagList = document.querySelector('.tags');
      const tagsParams = calculateTagsParams(allTags);
      let allTagsData = {tag: []};
      for(let tag in allTags){
        allTagsData.tag.push({
          tag: tag,
          count: allTags[tag],
          className: calculateTagClass(allTags[tag], tagsParams)
        });
      }
      tagList.innerHTML = templates.tagCloudLink(allTagsData);
    }
  };
  generateTags();
  /* ----------------------------- */
  const tagClickHandler = function(){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');
    const tagActives = document.querySelectorAll('a.active[href^="#tag-"]');
    for (const tagActive of tagActives){
      tagActive.classList.remove('active');
    }
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    for (const tagLink of tagLinks){
      tagLink.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const tags = document.querySelectorAll('.post-tags a');
  for(let tag of tags){
    tag.addEventListener('click', tagClickHandler);
  }

  const addClickListenersToTags = function(){
    const linksToTags = document.querySelectorAll('a[href^="#tag-"]');
    for (const linkToTag of linksToTags){
      linkToTag.addEventListener('click', tagClickHandler);
    }
  };
  addClickListenersToTags();
  /*-------------------*/
  const generateAuthors = function(){
    let allAuthors = {};
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles){
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const author = article.getAttribute('data-author');
      const authorName = author.replace(' ', '_');
      const linkHTMLData = {id: authorName, title: author};
      const authorLink = templates.authorLink(linkHTMLData);
      html = html + authorLink;
      if(!allAuthors[author]){
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
      authorWrapper.innerHTML = html;
    }
    const authorList = document.querySelector('.authors');
    let allAuthorHTML = '';
    for(let author in allAuthors){
      const authorName = author.replace(' ', '_');
      allAuthorHTML += `<li><a href="#author_${ authorName }"><span> ${ author } (${ allAuthors[author] }) </span></a></li>`;
    }
    authorList.innerHTML = allAuthorHTML;
  };
  generateAuthors();
  /* ----------------------------- */
  const authorClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author_', '');
    const authorWithout_ = author.replace('_', ' ');
    const authorActives = document.querySelectorAll('a.active[href^="#author"]');
    for (let authorDeactive of authorActives){
      authorDeactive.classList.remove('active');
      console.log('deaktywne tagiAutorow:', authorDeactive);
    }
    const authorLinks = document.querySelectorAll('article[href="' + href + '"]');
    for (let authorLink of authorLinks){
      authorLink.classList.add('active');
      console.log('autorzy aktywni: ', authorLink);
    }
    generateTitleLinks('[data-author="' + authorWithout_ + '"]');
  };
  const Auhtors = document.querySelectorAll('.post-author a');
  for(let author of Auhtors){
    author.addEventListener('click', authorClickHandler);
  }
  const addClickListenersToAuthors = function(){
    const linksToAuthors = document.querySelectorAll('a[href^="#author"]');
    for (const linkToAuthor of linksToAuthors){
      linkToAuthor.addEventListener('click', authorClickHandler);
    }
  };
  addClickListenersToAuthors();

  /* ----------------------------- */
  /* do usuniecia - cwiczenia tablic i objektow */
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
  */
  const myHome = {
    floor1: 5,
    floor2: {
      livingroom: 1,
      badroom: 2,
      kitchen: 1,
      corridor: 1,
    },
  };
  //console.log('myHome: ', myHome);
  //const count = myHome.rooms.livingroom+myHome.rooms.badroom+myHome.rooms.kitchen+myHome.rooms.corridor;
  //console.log('count: ', count);
  /*
  const sumAllWindows = function() {
    let allWindows = '';
    for( let key in myHome ){
      if (typeof myHome[key] === Object) {
        for ( let window in myHome.floor2 ) {
          allWindows += parseFloat(myHome.floor2[window]);
          console.log('okien jest: ', allWindows);
        }
      } else if (typeof myHome[key] === Number) {
        allWindows += Number(myHome[key]);
      }
    }
    console.log('wszystkich okien jest: ', allWindows);
  };
  sumAllWindows();
  */
  /*
  ---sum of values in object's element---
  const object = { a: 1, b: 2, c: 3 };
  let sum = 0;
  for (let property in object) {    
    sum += parseFloat(object[property]);
    console.log('kazda iteracja', sum);
  }
  console.log('poza petla', sum);
  

  
  const yourHome = Object.assign({}, myHome);
  console.log('yourHome: ', yourHome);
  
  yourHome.windows = 555;
  yourHome.rooms.badroom = 1;
  
  console.log('myHome: ', myHome);
  
  console.log('yourHome: ', yourHome);
  */
 
  
}