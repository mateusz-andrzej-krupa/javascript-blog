'use strict';
{

/* [DONE] Click listener on lef column */

const titleClickHandler = function(){
    event.preventDefault(); //ok-blokada przewijania strony do #
    const clickedElement = this; //do czego to służy?
    console.log('Link was clicked!');
    console.log('event', event);

  /* [DONE] remove class 'active' from all article links  */
  
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }

  /* [DONE] add class 'active' to the clicked link */

  console.log('clickedElement', clickedElement);  //console.log('clickedElement+: ' + clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  
  const activeArticles = document.querySelectorAll('article.active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleHref = clickedElement.getAttribute('href');
  console.log('this is a articleHref:' , articleHref);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const article = document.querySelector(articleHref); //TEGO NIE KUMAM
  console.log(article)

  /* [DONE] add class 'active' to the correct article */
    
  article.classList.add('active');

}
  
/* [DONE] genertor links - left column */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){
//  console.log('leftLinksGenerator-tested');

  /* [DONE] clear left panel - remove links list constent */

  const titleLinks = document.querySelector('.titles');
  //titleLinks.innerHTML = '';
  let html = '';

  /* [DONE] for all articles: */ 

  const articles = document.querySelectorAll('.post');
  //console.log(articles);

  for (let article of articles){

    /* [DONE] get a id of article and save as a const */

    const articleId = article.getAttribute('Id');
    //console.log('Id: ', articleId);
  
    /* [DONE] - find 'title' of article save as a const */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;//dlaczego innerHTMLmoze byc puste ?> ();
    //console.log('tytuł artykułu: ', articleTitle);
    
    /* [DONE] generate HTML code and save as a const */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log('HTML code: ', linkHTML);
    
    /* [DONE] display links in a  column */
    
    //[v1] titleLinks.innerHTML = titleLinks.innerHTML + linkHTML;
    //[v2] titleLinks.insertAdjacentHTML("beforeend", linkHTML);
    //[v3]
    html = html + linkHTML;
    console.log('htmllink', html);
   }
   titleLinks.innerHTML = html;
  
  /* Initiate titleClickHandler */

  const links = document.querySelectorAll('.titles a');
  console.log('to sa linki', links)
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
  }

generateTitleLinks();

}