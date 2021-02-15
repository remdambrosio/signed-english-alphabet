$(document).ready(function () {

var colorArray=["#88EDF6","#F5A38A","#F2C98D","#8DF1C7","#D8B4DC","#8BC8F4"];
var cardState;
var currentQuestion=-1;
var qbank=new Array;
var lastColor=0;
var button=1;

loadDB();

 function loadDB(){
  $.getJSON("activityAlphabet.json", function(data) {
   for(i=0;i<data.questionlist.length;i++){
    qbank[i]=[];
    qbank[i][0]=data.questionlist[i].cardfront;
    qbank[i][1]=data.questionlist[i].cardback;
   }//for
   beginActivity();
  })//gtjson
 }//loadDB

function beginActivity(){
 if(button==0){currentQuestion--;}
 else{currentQuestion++;}
 cardState=0;
 var color1=colorArray[Math.floor(Math.random()*colorArray.length)];
 while(lastColor==color1){
    color1=colorArray[Math.floor(Math.random()*colorArray.length)];
 }
 lastColor=color1;
 $("#cardArea").empty();
 $("#cardArea").append('<div id="card1" class="card">' + qbank[currentQuestion][0] + '</div>');
 $("#cardArea").append('<div id="card2" class="card">' + '<img src="images/' + qbank[currentQuestion][1] + '.png" style="height:200px">' + '</div>');
 $("#card1").css("background-color",color1);
 $("#card2").css("background-color","WHITE");
 $("#card2").css("top","200px");
 $("#cardArea").on("click",function(){
  if(cardState!=1){
   cardState=1;
   //togglePosition();
   $("#card1").animate({top: "-=200"}, 150, function() {cardState=0;togglePosition();});
   $("#card2").animate({top: "-=200"}, 150, function() {togglePosition2();});
  }//if
 });//click function
 $("#buttonArea").empty();
 $("#buttonArea").append('<div id="lastButton">LAST CARD</div>');
 $("#buttonArea").append('<div id="nextButton">NEXT CARD</div>');
 $("#lastButton").on("click",function(){
  button=0;
  if(currentQuestion>0){beginActivity();}
  else{currentQuestion=qbank.length; beginActivity();}
 });//last click function
 $("#nextButton").on("click",function(){
  button=1;
  if(currentQuestion<qbank.length-1){beginActivity();}
  else{currentQuestion=-1; beginActivity();}
 });//next click function
}//beginactivity

function togglePosition(){
 if($("#card1").position().top==-200){$("#card1").css("top","200px");};
}//toggle

function togglePosition2(){
 if($("#card2").position().top==-200){$("#card2").css("top","200px");};
}//toggle2

});
