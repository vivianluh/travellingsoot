let soot = [] //declare global variable 'soot'
              //where 'soot' is an empty array

let song; //declare global variable 'song'
let fft; //declare global variable 'fft'
let star; //declare global variable 'star'
let instructions; //declare global variable 'instructions'



function preload () //loads before setup to get it all ready
{
  pinkstar = loadImage ('pinkstar.png') //loads image for pinkstar
  greenstar = loadImage ('greenstar.png') //loads image for greenstar
  yellowstar = loadImage ('yellowstar.png') //loads image for yellowstar
  sootspirit = loadImage('sootspirit.png') //loads image for the soot sprite
  
  song = loadSound('one summers day.mp3') //loads sound for chosen song
}


function setup () //happens once 
{
  createCanvas(windowWidth, windowHeight) //create canvas
                                          //specific to how wide window is
                                          //specific to how tall window is
  imageMode (CENTER) //inteprets image parameters from its centre
  noCursor () //hides cursor from view
  
  fft = new p5.FFT() //fast fourier transform 
                     //every frame, the fft object will analyse the sound
                     //at that exact point in time 
                     //and return an array of values

  //a for loop that states;
  //variable named 'i' = 0 where i sets up the array contents
  //if i is less than 16
  //then another ellipse will be added to the canvas 
  //therefore there will be 16 ellipses on the canvas
  for (let i = 0; i < 100; i = i + 1) 
  {
    //inside the for loop
    //the x position of the ellipse will be random 
    //the y position of the ellipse will be random
    //it's easing will move in 0.01 pixels
    let x = random (width)
    let y = random (height)
    let e = random (0.03)
    
    //declare a new class named 'Soot'
    //the global variable soot and its empty array is called
    //while also calling its x, y, and e values
    soot[i] = new Soot (x, y, e)
  }
  
  //declare a new class named 'Star'
  star = new Star();
  
  //declare a new class named 'Instructions'
  instructions = new Instructions();
}


function mousePressed() //function is called everytime mouse is pressed
{
  //conditional if mouse is pressed and song is playing
  //pause the song 
  //while the visual graphics still run
  if (song.isPlaying()) 
  {
    song.pause() 
    loop()
  }
  //otherwise 
  //if the mouse is pressed again 
  //continue playing the song 
  //while the visual graphics still run
  else 
  {
    song.play() 
    loop() 
  }
}


function draw () //repeats
{
  background ('#672C17'); //colour canvas brown
  
  //AUDIO PLAYER placed on the side of the window
  //to ensure users know when the song is playing/not playing
  stroke(255); //colour of wave is white
  strokeWeight(4); //weight of that wave is 4 pixels
  
  let wave = fft.waveform() //this is where we store the waveform data
  
  beginShape() //function that make waveform particles more connected to a line
  
  //create a for loop to loop this waveform data to draw it across canvas
  //the for loop iterates from 0 to the width of the canvas
  //this allows us to put a point from the wave on each x point across the whole screen
  for (let i = 0; i < windowWidth; i = i + 1)
    {
      //maps the for loop variable to the index of the wave that we want
      //the value of the index must be an integer so we floor() it
      let index = floor(map(i, 0, windowWidth, 0, wave.length))
      
      //let x equal to the left of the window
      //instead of letting x equal to i (which was initially the plan)
      //if x was to equal i, then the wave would be drawn across the canvas 
      //HOWEVER, I wanted the audio to play in a more neater and contained manner
      //to do this, I experimented with changing the x value of the wave, to which
      //I mapped it to a part of the canvas
      let x = windowHeight /30
      
      //y is equal to the waveform value that is placed at the current index 
      //we need to scale it up to actually see the waveform movements 
      //default its between -1 and 1
      //scale it up to 500 to see its movements
      //offset wave to the middle of the window
      let y = wave[index] * 500 + windowWidth / 2
      vertex(x, y)
    }
  endShape() //function that make waveform particles more connected to a line
  
  //MAKE SOOT GO CRAZY
  //conditional if any key is pressed
  //run the for loop over and over again 
  //the for loop calls for the array of soot sprites to appear on the canvas
  //at a random x and y position 
  //because the loop iterates continuously as any key is pressed
  //it makes it look like the soot sprites are going crazy
  if (keyIsPressed === true) 
  {
    //this for loop is the same as defined in setup
    for (let i = 0; i < 100; i = i + 1) 
    {
      let x = random (width)
      let y = random (height)
      let e = random (0.03)
      soot[i] = new Soot (x, y, e)
    } 

  }
  
  
  
  //WORKING THE SOOT ARRAY WITH ITS CLASSES
  //the for loop calls the empty array into action
  for (let i = 0; i < soot.length; i = i + 1) 
  {
    soot[i].display(); //calls the custom 'display' function for soot into the array
    soot[i].hover(); //calls the custom 'hover' function for soot into the array
  }
  
  instructions.display(); //calls the custom 'display' function for instructions
  star.change(); //calls the custom 'change' function for star 
  
}


class Star //template for a changing coloured star cursor
{
  change() //defined a custom function named 'change'
  {
    //conditional if the mouse's x position crosses half of the window
    //turn the cursor to a green star
    if (mouseX > windowWidth / 2)
    {
      image(greenstar, mouseX, mouseY)
    }
    
    //otherwise if the mouse's x position crosses third of the window
    //turn the cursor to a yellow star
    else if(mouseX > windowWidth /3)
    {
      image(yellowstar, mouseX, mouseY)
    }
    
    //otherwise
    //turn the cursor to a pink star
    //so technically, the window will start with the pinkstar
    else
    {
      image(pinkstar, mouseX, mouseY)
    }
  }
}


class Instructions //template for the instructions of interactivity for users
{
  display() //defined a custom function named 'display'
  {
  textAlign(CENTER); //allign text to the center
  fill(255) //text will be white
  text('すすワタリ', width / 2, height / 2 - 40); 
  text('"The Travelling Soot"', width / 2, height / 2 - 20);
    
  //text is placed accordingly from the center of this particular text
  //all text is spaced 20 pixels from each other above or below from this point
  text('click for One Summers Day', width / 2, height / 2); 
    
  text('press any key and the Travelling Soot will go crazy for the Kompeitō', width / 2, height / 2 + 20);
  text('Kompeitō (コンペイトー) are a Japanese hard candy that the Travelling Soot love ', width / 2, height / 2 + 40);
  }  
}


class Soot //template for the soot sprites that follow cursor
{
  constructor (x, y, e) //set up for x, y, and e values 
    //values are defined inside the for loop, which soot is defined 
  {
    this.x = x
    this.y = y
    this.easing = e
  }
  
  display() //defined a custom function named 'display'
            //for which the soot will follow the cursor's position
  {
    //created new variable named 'distancetoX'
    //where it = to the mouse x's position on the canvas minus x
    let distancetoX = mouseX - this.x
    
    //x is defined as 1 + ( 0.01 x (mouse's x position -1))
    //the larger the easing value is the quicker the ellipse will move to cursor
    this.x = this.x + distancetoX * this.easing

    //same for the mouse's y position just using y
    let distancetoY = mouseY - this.y
    this.y = this.y + distancetoY * this.easing

    //the soot image is placed
    //its x and y parameters follows the values equal to this.y and this.x
    image(sootspirit, this.x, this.y)
    noStroke ()
  }
  
  hover() //defined a custom function named 'hover'
          //the soots will jitter randomly across the window
          //mirroring how they move when they are excited to eat the star
  {
    this.x = this.x + random(4,-4); //the x position of the soot will jitter randomly
                                    //4 pixels to both towards the x and y axis 
                                    //simultaneously as they follow the cursor
    this.y = this.y + random(4,-4); //same is applied to the y position of the soot
  }
}




