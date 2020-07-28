'use strict';
{
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */

const titleClickHandler = function(){
    event.preventDefault(); //ok-blokada przewijania strony do #
    const clickedElement = this; //do czego to służy?
    console.log('Link was clicked!');
    console.log(event);

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

  const article = document.querySelector(articleHref); //tego nie kumam
  console.log(article)

  /* [DONE] add class 'active' to the correct article */
    
  article.classList.add('active');

}
  
const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClickHandler);
}

// [FROM KODILLA]
//const optArticleSelector = '.post',
 // optTitleSelector = '.post-title',
 // optTitleListSelector = '.titles';

 /* const generateTitleLinks = function(){
    console.log('test dla funkcji stałej');
  }
generateTitleLinks();
*/

// [MYSELF]
function generateTitleLinks(){
  console.log('link-generator-tested');

  /* [IN PROGRESS] clear left panel - remove links list constent */
  /* [QUERRY] for all articles - get a id of artcle and save as a const */
  /* [QUERRY] for all articles - find 'title' of artile save as a const */
  /* [QUERRY] for all articles - generate HTML code and save as a const */
  /* [QUERRY] for all articles - display HTML code in a left column */
  }

generateTitleLinks();

}