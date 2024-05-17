//Variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2 ;

//Velocidade da Bolinha
let velocidadeXbolinha = 6;
let velocidadeYbolinha = 6;
let raqueteComprimento = 10;
let raqueteAltura = 100;

//Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;

//Variáveis da Raquete Oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYoponente;

let colidiu = false;

//Placar do Jogo
let meusPontos = 0;
let oponentePontos = 0;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3")
  ponto = loadSound("ponto.mp3")
  raquetada= loadSound("raquetada.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisãoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentoDaRaquete();
  //verificaColisãoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentoDaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha ( ){
circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha () {
  xBolinha += velocidadeXbolinha;
  yBolinha += velocidadeYbolinha;

}

function verificaColisãoBorda() {
  if (xBolinha + raio > width ||
      xBolinha - raio < 0 ){
velocidadeXbolinha *= -1;
 }
  if (yBolinha + raio > height ||
      yBolinha - raio < 0 ){
velocidadeYbolinha *= -1;
 }
}

function mostraRaquete(x,y){
  rect( x, y, raqueteComprimento, raqueteAltura);
}


function movimentoDaRaquete(){
  if (keyIsDown(UP_ARROW)){
      yRaquete -= 10;
 }
  if (keyIsDown(DOWN_ARROW)){
      yRaquete += 10;
 }
}

function verificaColisãoRaquete(){
  if (xBolinha - raio < xRaquete + raqueteComprimento 
&& yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete ){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu =
  collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeXbolinha *= -1;
    raquetada.play();
  }
}

function movimentoDaRaqueteOponente(){
  velocidadeYoponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30
  yRaqueteOponente += velocidadeYoponente
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(16);
  fill (color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill (255)
  text(meusPontos, 170, 26)
  fill (color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill (255)
  text(oponentePontos, 470, 26)
}

function marcaPonto(){
  if (xBolinha > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    oponentePontos +=1;
    ponto.play();
  }
}



