class Game {
  constructor() {
    this.buttontitle=createElement("h2")
    this.button=createButton("")
  
  }
  
  addSprite(spriteGroup,number,spriteImg,scale){
    
    for (let i = 0; i <number ; i++) {
     var x,y;
     x=random(width/2+250,width/2-250);
     y=random(-height*4.5,height-400);
     var sprites=createSprite(x,y)
     sprites.addImage("sprites",spriteImg)
      sprites.scale=scale
      spriteGroup.add(sprites);
    
  }
  
  }
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];

    Fulls= new Group()
    PawerCoins = new Group()

    this.addSprite(Fulls,4,full_img,0.02)
    this.addSprite(PawerCoins,18,coin2_img,0.09)


  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
    this.buttontitle.html(" Click para recomeçar")
    this.buttontitle.class("resetText")
    this.buttontitle.position(width/2-120,40)
    this.button.position(width/2,90)
    this.button.class("resetButton")
    
  }
  handleResetButton(){
    this.button.mousePressed(()=>{
    database.ref("/").set({
    playerCount:0,
    gameState:0,
    players:{},  
    hank:0,});
    window.location.reload();
    
    })
  } m,.; 
  showHank(){
    swal({
      title:`Parabéns${"\n"}hank${"\n"}${player.hank}`,
      text:"Você consegui chegar antes parabéns :)",
      confirmButtonText:"OK"
    })
  }
  play() {
    console.log("teste1")
    this.handleElements();
    this.handleResetButton();
    player.getCars();
    Player.getPlayersInfo();
    const finish = height*6-100

    if (player.positionY>finish) {
      gameState=2
      player.hank+=1
      Player.updatecars(player.hank)
      player.update()
      this.showHank()
      //adicionar sweet alert no index
    }
    
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //índice da matriz
      var index = 0;
      for (var plr in allPlayers) {
        //adicione 1 ao índice para cada loop
        index = index + 1;
       console.log("index1: "+index)
        //use os dados do banco de dados para exibir os carros nas direções x e y
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        console.log("index2: "+index)
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
        if (index===player.index) {
          stroke(10);
          fill("blue");
          ellipse(x,y,60);
         camera.position.y= cars[index-1].position.y;
         this.handleCoins(index);
         this. handleFull(index)       
        }
      }

      this.handlePlayerControls();

      drawSprites();
    }
  }
  handleCoins(index){
  cars[index-1].overlap(PawerCoins,function(collector,collected){
  player.score+=5;
  player.update();collected.remove();
  })
  }
  handleFull(index){
    cars[index-1].overlap(Fulls,function(collector,collected){
      player.full+=50;
      player.update();collected.remove();
      })

  }
  handlePlayerControls() {
    //manipulando eventos de teclado
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();}
  if (keyIsDown(RIGHT_ARROW)) {
    player.positionX+=10
    player.update();
  }
  if (keyIsDown(LEFT_ARROW)) {
    player.positionX-=10
    player.update();
  }  }
}
