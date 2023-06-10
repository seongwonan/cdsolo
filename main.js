import { cm } from './cm.js';
import { CdView } from './CdView.js';

let loaderElem;
let cdItemElems;
let cdListElem;
let modalCoverElem;


let cdView;

function setElems() {
    loaderElem = document.querySelector('.loader-wrapper');
    cdItemElems = document.querySelectorAll('.cd-item');
    cdListElem = document.querySelector('.cd-list');
    modalCoverElem = document.querySelector('.modal-cover');

}

function setCurrentCd(index) {
    cm.currentCdId = index;
    cm.currentCdElem = cdItemElems[index];
    console.log(cm.currentCdElem);
    console.log(cm.currentCdId);
    cdView.show();
}


function setcdItems() {
    for (let i = 0; i< cdItemElems.length; i++) {
        cdItemElems[i].style.left = `${410*(i%5)}px`;
        cdItemElems[i].style.top = `${400 * Math.floor(i/5)}px`;

    }
}



window.addEventListener('load', () => {
    setElems();
    loaderElem.addEventListener('transitionend', () => {
        loaderElem.reomove();
    });
        document.body.classList.remove('before-load');


       setcdItems();
     



cdListElem.addEventListener('click', e => {
    e.preventDefault();
    setCurrentCd(e.target.dataset.id);
   
});
cdView = new CdView();
    


    modalCoverElem.addEventListener('click', () =>  {
       
        cdView.hide();
    
    });
    










});

  
