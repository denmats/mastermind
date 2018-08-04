let newGame=document.getElementById('newGame'); 
newGame.hidden=true; // hidding button

let check=document.getElementById('check');
check.hidden=true; // hidding button

//load new game
newGame.addEventListener('click',function(){
    window.location.reload();
})

// pseudo-voiting 
function getRandom(){
    return Math.floor(Math.random()*6);
}


let arr= new Array(
    "red",
    "yellow",
    "blue",
    "green",
    "purple",
    "orange");

//config basic varibles
const A=arr[getRandom()];
const B=arr[getRandom()];
const C=arr[getRandom()];
const D=arr[getRandom()];
var amountOfAttempts=5;
var d  = new Date();
document.getElementById("footer").innerHTML = d.getFullYear()+"&copy Denys Matsuiev";
var t0 = performance.now();


var i=0;
let first=document.getElementById('first');
let second=document.getElementById('second');
let third=document.getElementById('third');
let forth=document.getElementById('forth');

// changing colors one of the circle by clicking
var buttons=document.querySelectorAll('i');
for(var k=0; k<buttons.length; k++)
{
   buttons[k].onclick=function(e)
   {
        check.hidden=false;
        e.target.style.color=arr[i];
        if(i<arr.length-1) // -1 because we have more than 6 color( +basic 'question circle');
         i++;               
         else i=0;
    }
}   

//reaction to pressing the 'check up' button
//match search
//display user's answer
check.addEventListener('click',function()
{
    let a=first.style.color;
    let b=second.style.color;
    let c=third.style.color;
    let d=forth.style.color;
    
    
    let arr1=[A,B,C,D];
    let arr2=[a,b,c,d];
    let arr3=[  '<i class="fas fa-frown"></i>',
                '<i class="fas fa-meh"></i>',
                '<i class="fas fa-smile"></i>'];
    let arr4=[];

   console.log('arr1:'+arr1);
   console.log('arr2:'+arr2);

   checkMatches();
   
   var spanEls=document.querySelectorAll('span');
   var div=document.createElement('div');
   attempts.insertBefore(div,attempts.firstChild);
   for(let i=0; i<4; i++)
   {
       var span = document.createElement("span");
       span.className="userAttempts";
       div.appendChild(span);
       span.style.color=arr2[i];
       usersAttempt();
       span.innerHTML=arr4[i];
   }

    //controlling number of users attempt, display right answer with smile color face 
    //and if the attempts > 5  to finish the game
   function checkNumberOfAttempt()
   {
       if(amountOfAttempts==1) 
       {
            document.getElementById('task').innerHTML="";
            btns.innerHTML="<h2>It's pity, but you lost <i class=\"fas fa-frown\"></i></h2>";
            var div=document.createElement('div');
            results.appendChild(div);
            var rightAnswer=document.createElement('h3');
            rightAnswer.textContent="The right answer";
            div.appendChild(rightAnswer);
            for(let i=0; i<4; i++)
            {
                var span = document.createElement("span");
                span.className="userAttempts";
                div.appendChild(span);
                span.style.color=arr1[i];
                span.innerHTML='<i class="fas fa-smile"></i>';
            }
            newGame.hidden=false;
            check.hidden=true;

       }
       else amountOfAttempts--;
   }

   //checking right guessed with first attempt
   function checkMatches()
   {
    
       if(A==a && B==b && C==c && D==d)
       {
            
            var t1 = performance.now();
            var score = parseInt((t1-t0)/(amountOfAttempts*1000));
            document.getElementById('task').innerHTML="";
            btns.innerHTML="<h2> You won! Your score is "+score+"</h2>";
            attempts.innerHTML="";
            newGame.hidden=false;
            check.hidden=true;
          
       }
       else checkNumberOfAttempt();
   } 

   //Match every circle color with each given color
   //and return hints by display smile faces icons
   function usersAttempt()
   {
        for(let k=0;k<4;k++)
        {
            flag="";
            for(let m=0;m<4;m++)
            {
                if (arr2[k]==arr1[m]){
                    if(arr2[k]==arr1[k]) flag=2;
                    else flag=1;
                } 
                else 
                {
                    if(flag>0) continue;
                    else flag=0;
                }
            }
                switch(flag)
                {
                    case 2: 
                        arr4[k]=arr3[2];
                        break;

                    case 1:
                        arr4[k]=arr3[1];
                        break; 

                    default: arr4[k]=arr3[0];
                }
        }                 
    }
  
});