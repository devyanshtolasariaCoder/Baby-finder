img="";
status="";
object= [];
sound= "Alarm.mp3";
function setup(){
 canvas= createCanvas(380,380);
 canvas.center();
 video= createCapture(VIDEO);
 video.size(380,380);
 video.hide();
}
function preload(){

}
function start(){
  objectDetector= ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML= "Status :- Detecting objects";
}

function draw(){
    image(video, 0,0, 380,380); 
   
    if(status != "")
    {
      r=random(255);
      g=random(255);
      b=random(255);
      objectDetector.detect(video, gotResult);
      for(i =0; i< object.length; i++)
      {
        document.getElementById('status').innerHTML= "Status : Person is detected";
       document.getElementById('number_of_objects').innerHTML= "Baby Found";
        fill(r,g,b);
        percent= floor(object[i].confidence*100);
        text(object[i].label + "    " + percent + "%", object[i].x, object[i].y - 5);
        noFill();
        stroke(r,g,b);
        rect(object[i].x , object[i].y, object[i].width, object[i].height);
        sound.stop();
      }
    }
    else if(status= ""){
      document.getElementById('status').innerHTML= "Status: Person is not detected";
      document.getElementById('number_of_objects').innerHTML= "Baby Not Found";
      sound.play();
    }
 
}

function modelLoaded(){
console.log('Model Loaded');
status= true;
objectDetector.detect(video, gotResult);
sound.volume(1);
sound.rate(1);
}
function gotResult(error, results){
  if(error){
    console.log(error);
  }
  else{
  console.log(results);
  object= results;
  }
}