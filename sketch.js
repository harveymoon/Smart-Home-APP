var AngN = 0;
var posGo;

var B1;
var B2;
var B3;

var buttons = [];

var Pallate;

var BB;


function backgroundDots(){
	var dist = 20;
	var boolA = false;
	var boolB = false;
	for (var i = 0; i < width; i+=dist) {
		boolA = !boolA;
		line(i,0,i,height);

		for (var h = 0; h < height; h+=dist) {
				boolB =  !boolB;
				noStroke();
				line(i,0,i,height);			
			
				if(boolA && boolB){
					fill(Pallate['shade3']);
				}
				else{
					fill(30);
				}
				ellipse(i,h,2,2);
		};		
	};

}




function setup() {
	createCanvas(windowWidth,windowHeight);
	noStroke();
	BB = new Box();


	angleMode(DEGREES);
	var ammt = 180/5;

	for (var i = 0; i < 5; i++) {
		var A = (ammt*i) + 20;
		var xLoc = sin(A);
		var yLoc = cos(A);

		xLoc *= 100;
		yLoc *= 200/2;
		
		xLoc += 50;
		yLoc += 400;

		B1 = new Button('boop');
		B1.v1.x = xLoc;
		B1.v1.y = yLoc;
		append(buttons,B1);	
	};
	posGo = buttons[0].v1;


	Pallate = {
	"shade0":color(25, 43, 56),
	"shade1":color(60, 76, 88),
	"shade2":color(39, 52, 62),
	"shade3":color(17, 37, 52),
	"shade4":color(5, 18, 28),
	"Accent":color(128, 45, 21)
};


	backgroundDots();


}

function draw() {
	var v1 = createVector(40, 50);

	background(10);
	backgroundDots();
	//line(0,height/2,width,height/2);
	push();
	translate(50, 400);
	var a = atan2(posGo.y-height/2, posGo.x-50);
	//print(a);
	rotate(AngN);
	AngN = AngN - (AngN-a)/10;
	fill(200);
	rect(-30, -5, 200, 10);

	noFill();
	stroke(255);
	ellipse(0,0,200,200);
	pop();
	
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].draw()
	};

BB.drawBox();
}

function mousePressed(){
	var MV = createVector(mouseX,mouseY, 0);
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].click(MV);
	}
	R = 300;
}

function Button(type){
	println('new button');
	this.type = type;
	this.img = "img";
	this.state = false;
	this.v1 = createVector(40, 50);
	this.draw = DrawIt;
	this.click = ClickIt;
	this.Animate = 0;



	// Spring simulation constants
	this.M = 0.8;   // Mass
	this.K = 0.03;   // Spring constant
	this.D = 0.91;  // Damping
	this.R = -50;   // Rest position

	// Spring simulation variables
	this.ps = this.R;    // Position
	this.vs = 0.0;  // Velocity
	this.as = 0;    // Acceleration
	this.f = 0;     // Force

}

function DrawIt(){
	if(this.state){
		fill(Pallate["Accent"]);
		this.R = 20;
	}
	else{
		fill(Pallate["shade1"]);
		this.R = 0;
	}
	noStroke();
	ellipse(this.v1.x,this.v1.y,50+(this.ps),50+(this.ps));
	fill(100);
	ellipse(this.v1.x,this.v1.y,45,45);
	fill(Pallate["Accent"])
	text(this.state, this.v1.x,this.v1.y+50)



    this.f = -this.K * (this.ps - this.R);    // f=-ky
    this.as = this.f / this.M;           // Set the acceleration, f=ma == a=f/m
    this.vs = this.D * (this.vs + this.as);   // Set the velocity
    this.ps = this.ps + this.vs;         // Updated position
  
  if(abs(this.vs) < 0.1) {
    this.vs = 0.0;
  }
 }

function ClickIt(vIn){
	var distance = p5.Vector.dist(this.v1,vIn);
	if(distance < 25){

		if(this.state == true){
			for (var i = 0; i < buttons.length; i++) {
				if(buttons[i].state == true);
			};
		}


		this.state = !this.state;
		if(this.state == true){
			posGo = this.v1 ;
			for (var i = 0; i < buttons.length; i++) {
				buttons[i].state = false;
			};
			this.state = true;
		}
	}
}



function Box(){
	this.pos = createVector(width/2,height/2);
	this.drawBox = DrawBox;
	this.Animate= 0;
	this.Animates=[0,0,0,0,0];
	this.Targets=[200,0,0,0,0]; 


}

function DrawBox(){
	if(this.Animates[0] != this.Targets[0]){
		this.Animates[0]-=(this.Animates[0]-this.Targets[0])/40;
	}
	fill(Pallate["shade2"]);
	
	var T = this.Animates[0];
	rect(this.pos.x,this.pos.y,200,T);
	
	
}