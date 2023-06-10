import { data } from './data.js';
import { cm } from './cm.js';

export class CdView {
    constructor() {
        this.bodyElem = document.createElement('article');
        this.bodyElem.classList.add('background');
        document.body.appendChild(this.bodyElem);
        this.bodyElem = document.createElement('article');
        this.bodyElem.classList.add('cd-detail');
        document.body.appendChild(this.bodyElem);
      
    }

    show() {
        const currentData = data[cm.currentCdId];
        this.bodyElem.style.display = 'block';
        this.bodyElem.style.position = 'fixed';
        

        this.bodyElem.innerHTML = `

        <span class = "cover">
                    
            <div class="bigcd-item" data-id = "${currentData.index}">
                <div class="cd cd-dark" >
                    <div class="bigcd-cover" style="background-image: url(${currentData.frontCover});  background-size: cover; "></div>
                    <div class="bigcd-back" style="background-image: url(${currentData.backCover}); background-size: contain;" ></div>
                    <div class="bigcd-side" style="background-image: url(${currentData.side}); background-size: cover;" ></div>
                </div>
            </div>
        
            <audio class= "play" controls src="${currentData.audio}"></audio>

     </div>

            `;

        

            const bigCd = this.bodyElem.querySelector('.bigcd-cover');
            

            const targetRect = bigCd.getBoundingClientRect();

                    //  console.log(targetRect);

            const currentCdRect = cm.currentCdElem.getBoundingClientRect();
                // console.log(currentCdRect);

                let xGap = targetRect.x - currentCdRect.x;
                let yGap = targetRect.y - currentCdRect.y;

                xGap = xGap + (targetRect.width - currentCdRect.width)*0.5;
                yGap = yGap + (targetRect.height - currentCdRect.height)*0.5;

                cm.currentCdElem.style.transform = `rotateY(0) translate(${xGap}px,${yGap}px) scale(2.2)`;
                cm.currentCdElem.classList.add('cd-item-selected');
        

          let prev = 0;
          let calc = 0;

          const sensitivity = 45;


            const bigcdItem = this.bodyElem.querySelector('.bigcd-item');
            const bigcdElem = this.bodyElem.querySelector('.cd');


        bigcdItem.addEventListener("mousedown", function (e) {
            const x = e.clientX;
            console.log(x);

        bigcdItem.addEventListener("mousemove", rotate);
        
        
        function rotate(e) {
            calc = (e.clientX - x) / sensitivity;
            bigcdElem.style.transform = ` rotateY(${calc + prev}deg)`;
    
            bigcdItem.style.cursor = "grabbing";

            prev += calc;

       

        }

    window.addEventListener('mouseup', function(){
    bigcdItem.removeEventListener("mousemove", rotate);
    bigcdItem.style.cursor = "default";


    window.addEventListener('click', function(){
    bigcdItem.removeEventListener("mousemove", rotate);
    bigcdItem.style.cursor = "default";

});

} );

 

        });


        bigcdItem.addEventListener('dblclick', () => {
            bigcdItem.classList.toggle('dbscale');
            bigcdItem.removeEventListener("mousemove", rotate);
            bigcdItem.style.cursor = "move";
        
        } );
    




            //     bigcdItem.addEventListener('mouseover', () => {
            //         bigcdElem.style.transform = 'rotateY(40deg)';
            //         bigcdElem.style.transition = 'transform .3s ';
            //     });
            //     bigcdItem.addEventListener('mouseout', () => {
            //         bigcdElem.style.transform = 'rotateY(0deg)';
            //         bigcdElem.style.transition = 'transform .3s ';
            //     });
            //     bigcdItem.addEventListener('mousedown', () => {
            //         bigcdElem.style.cssText = ' transform:rotateY(160deg); transition: transform .8s; transition-timing-function: steps(8)' ;
            //         // bigcdElem.style.transform = 'rotateY(160deg)' ;
            //         // bigcdElem.style.transition = 'transform 1.2s ';
                   
            //     });
            //     bigcdItem.addEventListener('mouseup', () => {
            //         bigcdElem.style.cssText = ' transform:rotateY(40deg); transition: transform .8s; transition-timing-function: steps(12)' ;
            //         // bigcdElem.style.transform = 'rotateY(40deg)';
            //         // bigcdElem.style.transition = 'transform 1.2s ';
                   
            //     });

                function flip () {
                    if( currentData.rotate == false){
                   
                       bigCd.classList.add('bigcd-cover-flip');
                    }
        
                }
           
                flip();


            const timerId = setTimeout( () => {
                    document.body.classList.add('cd-opened');
                    clearTimeout(timerId);

                    const timerId2 = setTimeout( () => {
                        cm.currentCdElem.style.transform = 'none';
                        clearTimeout(timerId2);
                    },500);
            }, 500);


        
    }

hide() {
    document.body.classList.remove('cd-opened');
    cm.currentCdElem.classList.remove('cd-item-selected');
    const timerId = setTimeout(() => {
        this.bodyElem.style.display = 'none';
        clearTimeout(timerId);
    }, 500);
}


}