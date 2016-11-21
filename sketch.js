var AngN = 0;
var posGo;

var B1;
var B2;
var B3;

var buttons = [];

function setup() {
	createCanvas(windowWidth,windowHeight);
	noStroke();

	angleMode(DEGREES);
	var ammt = 180/5;

	for (var i = 0; i < 5; i++) {
		var A = (ammt*i) + 20;
		var xLoc = sin(A);
		var yLoc = cos(A);

		xLoc *= width/2;
		yLoc *= width/2;
		
		xLoc += 50;
		yLoc += height/2;

		B1 = new Button('boop');
		B1.v1.x = xLoc;
		B1.v1.y = yLoc;
		append(buttons,B1);	
	};
	posGo = buttons[0].v1;
}

function draw() {
	var v1 = createVector(40, 50);

	background(10,50);
	//line(0,height/2,width,height/2);
	push();
	translate(50, height/2);
	var a = atan2(posGo.y-height/2, posGo.x-50);
	print(a);
	rotate(AngN);
	AngN = AngN - (AngN-a)/50;
	fill(255);
	rect(-30, -10, 350, 20);

	noFill();
	stroke(255);
	ellipse(0,0,width,width);
	pop();
	
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].draw()
	};

}

function mousePressed(){
	var MV = createVector(mouseX,mouseY, 0);
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].click(MV);
	}
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
}

function DrawIt(){
	if(this.state){
		fill(100);
		if(this.Animate<100){
			this.Animate-= (this.Animate-100)/10;
		}
	}
	else{
		fill(200);
		if(this.Animate>0){
			this.Animate-= (this.Animate-0)/10;
		}
	}
	ellipse(this.v1.x,this.v1.y,50+(this.Animate),50+(this.Animate));
	stroke(255);
	text(this.state, this.v1.x,this.v1.y+50)
 }

function ClickIt(vIn){
	var distance = p5.Vector.dist(this.v1,vIn);
	if(distance < 25){
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