let characterPosition;
let cameraPosition;
let x = 300;
let y = 300;
let stepSize = 10
let akuratemap
let character
let characterX = 130
let characterY = 85
let kiosk
let kiosk2
let kiosk3
let pfandCounter = 0
let geldCounter = 0
let dose
let pfandDosen = [];
let pfandDose
let pfandDose1
let nahkauf
let npcSchritt = 0
let npcOverlay1
let npcOverlay2
let npcOverlay3
let npcOverlay4
let npcOverlay5
let rezeptOverlay
let rezeptInventory
let mediOverlay
let mediInventory
let richtung = "links" 
let npc
let nino
let ninoSchritt = 0
let overlayNino1
let overlayNino2
let overlayNino3
let soy
let katzen = [];
let katze
let font


let nichtBegehbar = []

// gamestates
// 0 = startscreen
// 1 = normales spiel
// 2 = kiosk
// 3 = nahkauf
// 4 = NPC trigger
// 5 = DR arzt
// 6 = apotheke
// 7 = nino
let gameState = 0 

// ======================== Bilder laden =================================
function preload() {
   akuratemap = loadImage('bilder/akuratemap.png');
   character = loadImage('bilder/test3.png');
   kiosk = loadImage('bilder/OverlayKioskBegruesung.png')
   kiosk2 = loadImage('bilder/OverlayKioskKeinGeld.png')
   kiosk3 = loadImage('bilder/OverlayKioskErfolg.png')
   dose = loadImage('bilder/dose.png')
   nahkauf = loadImage('bilder/nahkaufPfandoverlay.png')
   npcOverlay1 = loadImage('bilder/npcOverlay1.png')
   npcOverlay2 = loadImage('bilder/npcOverlay2.png')
   npcOverlay3 = loadImage('bilder/npcOverlay3.png')
   npcOverlay4 = loadImage('bilder/npcOverlay4.png')
   npcOverlay5 = loadImage('bilder/npcOverlay5.png')
   rezeptOverlay = loadImage('bilder/rezeptOverlay.png')
   rezeptInventory = loadImage('bilder/rezeptInventory.png')
   mediOverlay = loadImage('bilder/mediOverlay.png')
   mediInventory = loadImage('bilder/mediInventory.png')
   npc = loadImage('bilder/npc.png')
   nino = loadImage('bilder/nino.png')
   overlayNino1 = loadImage('bilder/OverlayNino1.png')
   overlayNino2 = loadImage('bilder/OverlayNino2.png')
   overlayNino3 = loadImage('bilder/OverlayNino3.png')
   soy = loadImage('bilder/soy.png')
   font = loadFont('fonts/DoubleHomicide.ttf')
   
 }
//-------------------------------------------------------------------------
//================================ Setup ===================================
function setup() {

  rectMode(CENTER);
  let canvas = createCanvas(windowWidth-100, windowHeight-100);
  canvas.parent('sketch-holder');

 
  characterPosition = createVector(0, 0); // Startposition des Kreises
  cameraPosition = createVector(0, 0); // Startposition der Kamera
 // rectMode(CENTER);
  imageMode(CENTER);

  nichtBegehbar.push({ x: 450, y: 800, width: 80, height: 80 }); // "npc"
  nichtBegehbar.push({ x: -1000, y: 20, width: 60, height: 80 }); // "nino"
  nichtBegehbar.push({ x: 2600, y: -110, width: 3500, height: 100 }); // rechte seite schützenstraße oben
  nichtBegehbar.push({ x: -1170, y: -115, width: 3180, height: 100 }); // linke seite schützenstraße oben
  nichtBegehbar.push({ x: -3295, y: -115, width: 800, height: 100 }); // linke seite schützenstraße oben links
  nichtBegehbar.push({ x: -1900, y: 255, width: 4500, height: 100 }); // linke seite schützenstraße unten
  nichtBegehbar.push({ x: 2590, y: 270, width: 3500, height: 100 }); // rechte seite schützenstraße unten
  nichtBegehbar.push({x: -1500, y: 2915, width: 5000, height: 300}) // Nahkauf
  nichtBegehbar.push({ x: 920, y: 960, width: 100, height: 1600 }); // rechte straßenseite mitte marienstraße
  nichtBegehbar.push({ x: 910, y: 2850, width: 100, height: 1600 }); // rechte straßenseite unten marienstraße
  nichtBegehbar.push({ x: 895, y: -930, width: 100, height: 1600 }); // rechte straßenseite oben marienstraße
  nichtBegehbar.push({ x: 350, y: 820, width: 100, height: 1220 }); // linke straßenseite mitte marienstraße
  nichtBegehbar.push({ x: -2945, y: -840, width: 100, height: 1200 }); // linke seite weg zu soy
  nichtBegehbar.push({ x: -2710, y: -510, width: 100, height: 630 }); // rechte seite weg zu soy
  nichtBegehbar.push({ x: -2040, y: -840, width: 100, height: 1200 }); // linke seite weg zu soy groß
  nichtBegehbar.push({ x: -2600, y: -1350, width: 999, height: 100 }); // wand hinter soy
  nichtBegehbar.push({ x: -2435, y: -840, width: 650, height: 100 }); // soy grenze versteck unten
  nichtBegehbar.push({ x: 350, y: -930, width: 100, height: 1600 }); // linke straßenseite oben marienstraße
  nichtBegehbar.push({ x: 2630, y: 1750, width: 3500, height: 100 }); // rechte seite werderstraße oben
  nichtBegehbar.push({ x: 2615, y: 2100, width: 3500, height: 100 }); // rechte seite werderstraße unten
  nichtBegehbar.push({ x: 600, y: -860, width: 500, height: 100 }); // grenze nach oben
  nichtBegehbar.push({ x: -2990, y: 1850, width: 100, height: 2000 }); // linke werderplatz
  nichtBegehbar.push({ x: -1280, y: 1385, width: 3270, height: 100 }); // oben werderplatz
  nichtBegehbar.push({ x: -3340, y: 90, width: 100, height: 4600 }); // grenze ganz links
  nichtBegehbar.push({ x: 3410, y: 1870, width: 100, height: 7600 }); // grenze ganz rechts

  pfandDose = new PfandDose (780, -730)
  pfandDose1 = new PfandDose (-650, 2320)
  pfandDosen.push(pfandDose)
  pfandDosen.push(pfandDose1)

  katze = new Katze (-2170, -1232)
  katzen.push(katze)
}
//---------------------------------------------------------------------------
//===================================Draw====================================
function draw() {
  
  background(220);
  translate(width / 2 - cameraPosition.x, height / 2 - cameraPosition.y); // Kamerapostion

  //======================gamestate 0====================================

  if (gameState == 0) {
    fill(255);
    rect(0, 0, width, height);

    fill(135, 160, 178);
    textSize(50);
    textAlign(CENTER, CENTER);
    textFont(font)
      text("Südstadtsimulator", 0, -80);

    textSize(40);
    fill(135, 160, 178);
      text("Leertaste zum Starten", 0, 0);

   
    if (key == " " && gameState == 0) {
    print("start game");
    gameState = 1;
   }
  }
  else{

    // ======================= Map erstellen ===============================
    image(akuratemap, 0, 0, 8000, 6000);  
  
    // Grenzen <--------(nicht begehbar)----------------------------------------------------
   //fill(255,0,0, 20);
        noFill();
        noStroke();

      for (let nichtBegehb of nichtBegehbar) {
          rect(nichtBegehb.x, nichtBegehb.y, nichtBegehb.width, nichtBegehb.height);
      }



 
   

  // Overlays für loot auf der rechten seite
  if (npcSchritt == 2 || npcSchritt == 3){
    image(rezeptInventory, cameraPosition.x + 550, cameraPosition.y - 280, 100, 130)
  }

  if (npcSchritt == 4){
    image(mediInventory, cameraPosition.x + 550, cameraPosition.y - 280, 100, 130)
  }
  
  if (ninoSchritt == 2){
    image(soy, cameraPosition.x + 450, cameraPosition.y - 300, 100, 130)
  }


   //================================ Counter / Inventar ========================

    

    for (let i = 0; i < pfandDosen.length; i++) {
      let pfandDose = pfandDosen[i];
      
      pfandDose.display();
    }

    for (let i = 0; i < katzen.length; i++) {
      let katze = katzen[i];
      
      katze.display();
    }

      
    //------------------------------------------------------------------------
    // ======================== Bewegung des Spielers ========================  
    let geisterPosition = characterPosition.copy();
    
    

    if (gameState == 1){
      if (keyIsDown(65) || keyIsDown(97)) {  //A
        geisterPosition.x -= stepSize;  
        richtung = "links"
    }

    if (keyIsDown(68) || keyIsDown(100)) {  // D
        geisterPosition.x += stepSize;
        richtung = "rechts"
    }

    if (keyIsDown(87) || keyIsDown(119)) {
      geisterPosition.y -= stepSize;
    }

    if (keyIsDown(83) || keyIsDown(115)) {
      geisterPosition.y += stepSize;
    }

    if (!detectCollision(geisterPosition)) {
      characterPosition = geisterPosition;
    }
    }
    
    if(richtung=="links"){
       image(character, characterPosition.x, characterPosition.y, characterX, characterY);
    }
    
    if(richtung=="rechts"){
        push();
        scale(-1,1)
        image(character, -characterPosition.x, characterPosition.y, characterX, characterY);
        pop();   
    }
    
    console.log(characterPosition.x, characterPosition.y)
    // -------------------------------------------------------------------------

// ======================Kollisionsabfrage Grenzen ===========================

    for (let nichtBegehb of nichtBegehbar) {
          rect(nichtBegehb.x, nichtBegehb.y, nichtBegehb.width, nichtBegehb.height);
      }

      //characterPosition.x+2, characterPosition.y+6, characterX - 58 + stepSize, characterY - 12 + stepSiz
    function detectCollision(geisterPosition) {
      for (let nichtBegehb of nichtBegehbar) {
          if (geisterPosition.x + (characterX - 62)/2 > nichtBegehb.x - nichtBegehb.width/2 &&
              geisterPosition.x - (characterX - 62)/2 < nichtBegehb.x + nichtBegehb.width/2 &&
              geisterPosition.y + (characterX - 52)/2 > nichtBegehb.y - nichtBegehb.height/2 &&
              geisterPosition.y - (characterX - 60)/2 < nichtBegehb.y + nichtBegehb.height/2) {
              return true; // Kollision gefunden
          }
      }
      return false; // Keine Kollision
  }  

//--------------------------------------------------------------------------------
//==========================KOLISION KIOSK==========================================
let kioskEingangX = 930
      let kioskEingangY = -65
      let kioskEingangW = 100
      let kioskEingangH = 10
    noFill();
    noStroke();
    rect(kioskEingangX, kioskEingangY, kioskEingangW, kioskEingangH); 


    
    if (geisterPosition.x + (characterX - 62)/2 > kioskEingangX - kioskEingangW/2 &&
        geisterPosition.x - (characterX - 62)/2 < kioskEingangX + kioskEingangW/2 &&
        geisterPosition.y + (characterX - 52)/2 > kioskEingangY - kioskEingangH/2 &&
        geisterPosition.y - (characterX - 60)/2 < kioskEingangY + kioskEingangH/2) {
          gameState = 2     
    }

    if (gameState == 2){
      fill(0, 180)
      rect (cameraPosition.x, cameraPosition.y, windowWidth,windowHeight)
      let schritt = 1
      if (schritt == 1){
        
        image(kiosk, cameraPosition.x, cameraPosition.y, windowWidth/2.5, windowHeight )
        if (key == " "){
          schritt = 2
        }
      }
      if (schritt == 2 && geldCounter <5){
       image(kiosk2, cameraPosition.x, cameraPosition.y, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
        }
      }

       if (schritt == 2 && geldCounter >=5){
       image(kiosk3, cameraPosition.x, cameraPosition.y, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
          geldCounter = geldCounter - 5
        }
      }

    }
//======================KOLLISION NAHKAUF=========================================

let nahkaufEingangX = -1690
      let nahkaufEingangY = 2770
      let nahkaufEingangW = 130
      let nahkaufEingangH = 10
      noFill()
     // fill(0,0,255 ,50);
      rect(nahkaufEingangX, nahkaufEingangY, nahkaufEingangW, nahkaufEingangH); 


    
    if (geisterPosition.x + (characterX - 62)/2 > nahkaufEingangX - nahkaufEingangW/2 &&
        geisterPosition.x - (characterX - 62)/2 < nahkaufEingangX + nahkaufEingangW/2 &&
        geisterPosition.y + (characterX - 52)/2 > nahkaufEingangY - nahkaufEingangH/2 &&
        geisterPosition.y - (characterX - 60)/2 < nahkaufEingangY + nahkaufEingangH/2) {
          gameState = 3   
    }

  
// -----------------------------------------------------------------------------------------
    if (gameState == 3){
      fill(0, 180)
      rect (cameraPosition.x, cameraPosition.y, windowWidth,windowHeight)
             
      image(nahkauf, cameraPosition.x, cameraPosition.y, windowWidth/2.5, windowHeight )
      if(pfandCounter > 0){
        geldCounter = geldCounter + (pfandCounter * 1)
        pfandCounter = 0
      }  

      if(mouseIsPressed) {
           gameState = 1;
      }
    }

   


// =============================KOLLISION MIT NPC===========================================

let npcEingangX = 450
      let npcEingangY = 800
      let npcEingangW = 80
      let npcEingangH = 80
      fill(0,0,255 ,50);
     // rect(npcEingangX, npcEingangY, npcEingangW, npcEingangH); 
      image(npc, npcEingangX, npcEingangY, 120, 120 );


    
    if (geisterPosition.x + (characterX - 62)/2 > npcEingangX - npcEingangW/2 &&
        geisterPosition.x - (characterX - 62)/2 < npcEingangX + npcEingangW/2 &&
        geisterPosition.y + (characterX - 52)/2 > npcEingangY - npcEingangH/2 &&
        geisterPosition.y - (characterX - 60)/2 < npcEingangY + npcEingangH/2) {
          gameState = 4   
    }

    //---------------------Interaktions symbol (später raus)------------------------------------
    // fill(255);
    // textSize(40);
    // textAlign(CENTER, CENTER);

  if (npcSchritt == 0 || npcSchritt == 2 || npcSchritt == 4 ){
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    textFont(font)
    text("!", 450, 740);
  }
    
// -----------------------------------------------------------------------------------------
    if (gameState == 4 && npcSchritt < 5){
      fill(0, 180)
      rect (cameraPosition.x, cameraPosition.y, windowWidth,windowHeight)
      
         
      if (npcSchritt == 0){ // er fragt uns, ob wir rezept holen können
        
        image(npcOverlay1, cameraPosition.x, cameraPosition.y-26, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
          npcSchritt = 1;
          geldCounter++;
        }
      }
      if (npcSchritt == 1){ // er fragt, ob wir es schon gemacht haben (falls wir ohne rezept zu ihm gehen)
       image(npcOverlay2, cameraPosition.x, cameraPosition.y-26, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
        }
      }

      if (npcSchritt == 2){ // er fragt, ob wir es für ihn einlösen können (wir haben es schon)
       image(npcOverlay3, cameraPosition.x, cameraPosition.y-26, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
          npcSchritt = 3;
        }
      }

      if (npcSchritt == 3){ // er fragt, ob ich es schon eingelöst habe (falls ich noch nicht)
       image(npcOverlay4, cameraPosition.x, cameraPosition.y-26, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
        }
      }

      if (npcSchritt == 4){ // ich komme mit meikament zu ihm, er bedankt und gibt mir das geld
       image(npcOverlay5, cameraPosition.x, cameraPosition.y-26, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
          npcSchritt = 5; 
          geldCounter = geldCounter + 2
        }
      }


  }
  else if (gameState == 4 && npcSchritt >= 5){
    if (npcSchritt == 5){ // npc wird unansprechbar
      gameState = 1;
    }
  }

//===============================KOLLISION DR ARZT==========================================

let drArztEingangX = 3070
      let drArztEingangY = -65
      let drArztEingangW = 100
      let drArztEingangH = 10
    noFill()
      //fill(0,0,255 ,50);
    rect(drArztEingangX, drArztEingangY, drArztEingangW, drArztEingangH); 


    
    if (geisterPosition.x + (characterX - 62)/2 > drArztEingangX - drArztEingangW/2 &&
        geisterPosition.x - (characterX - 62)/2 < drArztEingangX + drArztEingangW/2 &&
        geisterPosition.y + (characterX - 52)/2 > drArztEingangY - drArztEingangH/2 &&
        geisterPosition.y - (characterX - 60)/2 < drArztEingangY + drArztEingangH/2) {
          gameState = 5     
    }

    if (gameState == 5){
     
      if (npcSchritt == 1){
        fill(0, 180)
        rect (cameraPosition.x, cameraPosition.y, windowWidth,windowHeight)
        image(rezeptOverlay, cameraPosition.x, cameraPosition.y-26, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
          npcSchritt = 2
        }
      }
      else {
        gameState = 1
      
      }
    }


    //===========================KOLLISION APOTHEKE=========================================

    let apothekenEingangX = 970
      let apothekenEingangY = 1795
      let apothekenEingangW = 100
      let apothekenEingangH = 10
    noFill()
      //fill(0,0,255 ,50);
    rect(apothekenEingangX, apothekenEingangY, apothekenEingangW, apothekenEingangH); 


    
    if (geisterPosition.x + (characterX - 62)/2 > apothekenEingangX - apothekenEingangW/2 &&
        geisterPosition.x - (characterX - 62)/2 < apothekenEingangX + apothekenEingangW/2 &&
        geisterPosition.y + (characterX - 52)/2 > apothekenEingangY - apothekenEingangH/2 &&
        geisterPosition.y - (characterX - 60)/2 < apothekenEingangY + apothekenEingangH/2) {
          gameState = 6     
    }

     if (gameState == 6 ){
     
      if (npcSchritt == 2 && geldCounter >=1 || npcSchritt == 3 && geldCounter >=1){
        fill(0, 180)
        rect (cameraPosition.x, cameraPosition.y, windowWidth,windowHeight)
        image(mediOverlay, cameraPosition.x, cameraPosition.y-26, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
          npcSchritt = 4
          geldCounter -- 
        }
      }
      else {
        gameState = 1
      
      }
    }
 
// =======================Kollision NIno======================================================

let ninoEingangX = -1000
      let ninoEingangY = 20
      let ninoEingangW = 60
      let ninoEingangH = 80
      fill(0,0,255 ,50);
     // rect(npcEingangX, npcEingangY, npcEingangW, npcEingangH); 
      image(nino, ninoEingangX, ninoEingangY, 150, 150 );


    
    if (geisterPosition.x + (characterX - 62)/2 > ninoEingangX - ninoEingangW/2 &&
        geisterPosition.x - (characterX - 62)/2 < ninoEingangX + ninoEingangW/2 &&
        geisterPosition.y + (characterX - 52)/2 > ninoEingangY - ninoEingangH/2 &&
        geisterPosition.y - (characterX - 60)/2 < ninoEingangY + ninoEingangH/2) {
          gameState = 7   
    }

      //---------------------Interaktions symbol (später raus)------------------------------------
    // fill(255);
    // textSize(40);
    // textAlign(CENTER, CENTER);

  if (ninoSchritt == 0 || ninoSchritt == 2){
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    textFont(font)
    text("!", -1000, -30);
  }



  // -----------------------------------------------------------------------------------------
    if (gameState == 7 && ninoSchritt < 3){
      fill(0, 180)
      rect (cameraPosition.x, cameraPosition.y, windowWidth,windowHeight)
      
         
      if (ninoSchritt == 0){ // sie fragt , ob  katze gesehen und helfen  sie zu finden
        
        image(overlayNino1, cameraPosition.x, cameraPosition.y-18, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
          ninoSchritt = 1;
        }
      }
      if (ninoSchritt == 1){ // sie fragt, ob wir sie schon gefunden haben (falls wir ohne katze zu ihr gehen)
       image(overlayNino2, cameraPosition.x, cameraPosition.y-18, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
        }
      }

      if (ninoSchritt == 2){ // sie bedankt sich & gibt geld
       image(overlayNino3, cameraPosition.x, cameraPosition.y-18, windowWidth/2.5, windowHeight )
        if(mouseIsPressed) {
          gameState = 1;
          ninoSchritt = 3;
          geldCounter ++
        }
      }
 

  }
  else if (gameState == 7 && ninoSchritt >= 3){
   if (ninoSchritt == 3){ // sie wird unansprechbar
      gameState = 1;
    }
  }


// -------------------hitbox soy& katzearray geht leer&soy geht ins loot über--------

    for (let i = katzen.length - 1; i >= 0; i--) {
        let katze = katzen[i];
        if (
          geisterPosition.x + (characterX - 75)/2 > katze.pos.x - katze.w / 2 &&
          geisterPosition.x - (characterX - 75)/2 < katze.pos.x + katze.w / 2 &&
          geisterPosition.y - (characterX - 80)/2< katze.pos.y + katze.h / 2 &&
          geisterPosition.y + (characterX - 85)/2 >katze.pos.y - katze.h / 2 &&
          ninoSchritt == 1
        ) {

          katzen.splice(i, 1);
          ninoSchritt = 2
          
        }
      }

// ---------------------katzen"loot"----------------------------------------------------



// -------------------hitbox pfanddose& pfandarray geht leer&pfand geht ins loot über--------

    for (let i = pfandDosen.length - 1; i >= 0; i--) {
        let pfandDose = pfandDosen[i];
        if (
          geisterPosition.x + (characterX - 75)/2 > pfandDose.pos.x - pfandDose.w / 2 &&
          geisterPosition.x - (characterX - 75)/2 < pfandDose.pos.x + pfandDose.w / 2 &&
          geisterPosition.y - (characterX - 80)/2< pfandDose.pos.y + pfandDose.h / 2 &&
          geisterPosition.y + (characterX - 85)/2 >pfandDose.pos.y - pfandDose.h / 2
        ) {

          pfandDosen.splice(i, 1);
          pfandCounter = pfandCounter + 1;
        }
      }


// --------------------pfandloot/counter)---------------------------------------
  push() 
    stroke(164, 190, 243) //rahmen inventar
    strokeWeight(5)
    fill(255,255,255);
    rect(cameraPosition.x - windowWidth*0.36, cameraPosition.y - windowHeight*0.34, 150, 100)
  pop()
    fill(0);
    textSize(30);
    textAlign(LEFT, TOP);
    text(" : " + pfandCounter, cameraPosition.x - windowWidth*0.36 - 30, cameraPosition.y - windowHeight*0.34 - 35 );
    image(dose, cameraPosition.x - windowWidth*0.36 - 40 , cameraPosition.y - windowHeight*0.34 - 20, 64, 64)
    
//--------------------geldloot/counter------------------------------------------
    
    fill(0);
    textSize(30);
    textAlign(LEFT, TOP);
    text(" : " + geldCounter, cameraPosition.x - windowWidth * 0.36 - 30, cameraPosition.y - windowHeight*0.34 +5);
    fill(255,255,0);
    stroke(0)
    strokeWeight(1)
    circle(cameraPosition.x - windowWidth*0.36 - 42, cameraPosition.y - windowHeight*0.34 + 20, 30, 30);
    




    // ============== kamerafahrt & begrenzung bevor Kamera mitgeht ============
    let randY = 80 
    let randX = 100

    if (cameraPosition.x - characterPosition.x < randX && cameraPosition.x - characterPosition.x >- randX){
    }
    else if (cameraPosition.x - characterPosition.x >= randX){
      cameraPosition.x = characterPosition.x + randX
    }
    else if (cameraPosition.x - characterPosition.x <= -randX){
      cameraPosition.x = characterPosition.x - randX
    }

    if (cameraPosition.y - characterPosition.y < randY && cameraPosition.y - characterPosition.y >- randY){
    }
    else if (cameraPosition.y - characterPosition.y >= randY){
      cameraPosition.y = characterPosition.y + randY
    }
    else if (cameraPosition.y - characterPosition.y <= -randY){
      cameraPosition.y = characterPosition.y - randY
    }
    // --------------------------------------------------------------------------
  //-----------------------------------------------------------------------------
  }
}

//=======================klassen katze& pfand====================================
  
class Katze{
  constructor(x, y){
    this.w = 64;
    this.h = 64;
    this.pos = createVector(x, y)
  }

  display(){
    image(soy, this.pos.x, this.pos.y, 100, 100);
  }
}


  class PfandDose {
  constructor(x, y) {
    this.w = 64;
    this.h = 64;
   // let randomXPos = random(0 + this.w / 2, width - this.w / 2);
    this.pos = createVector(x, y);
  }

  display() {
    image(dose, this.pos.x, this.pos.y, 64, 64);
  }
}



window.onkeydown = function(e) { 
    return !(e.keyCode == 32);
};



