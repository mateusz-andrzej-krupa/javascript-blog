//'use strict';
{
  const optArticleSelector = '.post',
    optTitleListSelector = '.titles',
    optTitleSelector = '.post-title',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author';
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
  const generateTags = function(){   
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
        const tagLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
        //console.log('tagLink', tagLink);     
        /* [DONE] add generated code to html variable */
        html = html + tagLink + (' ');
        //console.log('htmllink', html);
      /* [OK] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagWrapper.innerHTML = html;
      //console.log('tagWrapper ', tagWrapper );    
    /* [OK] END LOOP: for every article: */
    }
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
    /* [process] START LOOP: for each active tag link */ 
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
    /* [] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const tags = document.querySelectorAll('.post-tags a');
  //console.log('tagi:', tags);
  for(let tag of tags){
    tag.addEventListener('click', tagClickHandler);
  }
  const addClickListenersToTags = function(){
  /* [DONE] find all links to tags */
    const LinksToTags = document.querySelectorAll('a[href^="#tag-"]');
    /* [DONE] START LOOP: for each link */
    for (const linkToTag of LinksToTags){
      /* [DONE] add tagClickHandler as event listener for that link */
      linkToTag.addEventListener('click', tagClickHandler);
      //console.log('this is link to tag', linkToTag);
      /* [OK] END LOOP: for each link */
    }
  };
  addClickListenersToTags();
  /*-------------------*/
  const generateAuthors = function(){
  /* [PROC] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);
    /* [OK] START LOOP: for every article: */
    for (let article of articles){
      /* [---] find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      //console.log('wrappery autorow: ', authorWrapper);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get author from data-autor attribute */
      const tagAuthor = article.getAttribute('data-author');
      //console.log('autor to: ', tagAuthor);
      /* [DONE] generate HTML of the link */
      const authorLink = '<a href="#tagAuthor' + tagAuthor + '"> by: ' + tagAuthor + '</a>';
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
  /* [ TO CORRECT ] */
  const authorClickHandler = function(){
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
    /* [process] START LOOP: for each active tag link */ 
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
    /* [] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const Auhtors = document.querySelectorAll('.post-tags a');
  //console.log('tagi:', tags);
  for(let tag of tags){
    tag.addEventListener('click', tagClickHandler);
  }
  const addClickListenersToAuthors = function(){
  /* [DONE] find all links to tags */
    const LinksToAuthors = document.querySelectorAll('a[href^="#tagAuthor"]');
    console.log('linki do autorów', LinksToAuthors);
    /* [DONE] START LOOP: for each link */
    for (const linkToAuthor of LinksToAuthors){
      /* [DONE] add tagClickHandler as event listener for that link */
      linkToAuthor.addEventListener('click', authorClickHandler);
      //console.log('this is link to Author', linkToAuthor);
      /* [OK] END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}