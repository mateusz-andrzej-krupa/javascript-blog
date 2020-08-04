'use strict';
{

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

  /* --------------------------- */

  const optArticleSelector = '.post',
    optTitleListSelector = '.titles',
    optTitleSelector = '.post-title',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function (){
  //  //console.log('leftLinksGenerator-tested');

    /* [DONE] clear left panel - remove links list constent */

    const titleLinks = document.querySelector(optTitleListSelector);
    //titleLinks.innerHTML = '';
    let html = '';

    /* [DONE] for all articles: */ 

    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(articles);

    
    
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
      //[v3]
      html = html + linkHTML;
      //console.log('htmllink', html);
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
  
      /* START LOOP: for each tag */
      for (let tag of tagsArray){
        
        /* [DONE] generate HTML of the link */
        const taglink = '<li><a href="#' + tag + '">' + tag + '</a></li>';
        //console.log('taglink', taglink);
        
        /* [DONE] add generated code to html variable */
        html = html + taglink;
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
  
  
}