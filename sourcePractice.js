$(document).ready(function () {

var colorArray=["#88EDF6","#F5A38A","#F2C98D","#8DF1C7","#D8B4DC","#8BC8F4"];
var cardState;
var currentQuestion=0;
var qbank=new Array;
var lastColor=0;

loadDB();

function loadDB(){
 var i,temp,rnd1,rnd2;
 $.getJSON("activity.json", function(data) {
  for(i=0;i<data.questionlist.length;i++){
   qbank[i]=[];
   qbank[i][0]=data.questionlist[i].cardfront;
   qbank[i][1]=data.questionlist[i].cardback;
  }//for
  for(i=0;i<(qbank.length*2);i++){
	  rnd1=Math.floor(Math.random()*qbank.length);
	  rnd2=Math.floor(Math.random()*qbank.length);
	  temp=qbank[rnd1];
	  qbank[rnd1]=qbank[rnd2];
	  qbank[rnd2]=temp;
  }//for
  beginActivity();
 })//gtjson
}//loadDB

function beginActivity(){
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
 currentQuestion++;
 $("#buttonArea").empty();
 $("#buttonArea").append('<div id="nextButton">NEXT CARD</div>');
 $("#nextButton").on("click",function(){
  if(currentQuestion<qbank.length){beginActivity();}
  else{currentQuestion=0; beginActivity();}
 });//click function
}//beginactivity

function togglePosition(){
 if($("#card1").position().top==-200){$("#card1").css("top","200px");};
}//toggle

function togglePosition2(){
 if($("#card2").position().top==-200){$("#card2").css("top","200px");};
}//toggle2

});
