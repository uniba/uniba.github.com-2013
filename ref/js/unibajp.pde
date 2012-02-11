//�����ϊ��p�̕ϐ�
//����p��
float radS = -PI/360*70;
//�J�����̌��_����̋���
float camZ = -3000 - 0.5 * 3000;
//�X�N���[���̌��_����̋���
float scZ = -1000;
//��]
float xRotate = 0;
float yRotate = 0;
float zRotate = PI/2;

//�`��p�̕ϐ�
//��̑���
float weight = 0.5;
//��̐F
int strokeH = 0;
int strokeS = 0;
int strokeB = 255;

//Midi Controller
String xRotateMidiS = loadStrings("ref/js/params/xRotate.txt");
String yRotateMidiS = loadStrings("ref/js/params/yRotate.txt");
String zRotateMidiS = loadStrings("ref/js/params/zRotate.txt");
String strokeHMidiS = loadStrings("ref/js/params/strokeH.txt");
String strokeSMidiS = loadStrings("ref/js/params/strokeS.txt");
String strokeBMidiS = loadStrings("ref/js/params/strokeB.txt");
String bgAlphaMidiS = loadStrings("ref/js/params/bgAlpha.txt");
String xDiffMidiS = loadStrings("ref/js/params/xDiff.txt");
String yDiffMidiS = loadStrings("ref/js/params/yDiff.txt");
String zDiffMidiS = loadStrings("ref/js/params/zDiff.txt");
String scZMidiS = loadStrings("ref/js/params/scZ.txt");
String weightMidiS = loadStrings("ref/js/params/weight.txt");
int xRotateMidiSOffset;
int yRotateMidiSOffset;
int zRotateMidiSOffset;
int strokeHMidiSOffset;
int strokeSMidiSOffset;
int strokeBMidiSOffset;
int bgAlphaMidiSOffset;
int xDiffMidiSOffset;
int yDiffMidiSOffset;
int zDiffMidiSOffset;
int scZMidiSOffset;
int weightMidiSOffset;

//Logo�̒��_���W���i�[����z�� : charctor number, x1, y1, x2, y2, z
int[][] logo = {
  // U
  {0,  0,  0,  0,200, 80},
  {0,  0,200,100,200, 80},
  {0,100,200,100,  0, 80},
  // N
  {1,200,200,200,  0, 80},
  {1,200,  0,300,  0, 80},
  {1,300,  0,300,200, 80},
  // I
  {2,400,  0,400,200, 80},
  // B
  {3,500,  0,500,300, 80},
  {3,500,300,600,200, 80},
  {3,600,200,600,100, 80},
  {3,600,100,500,100, 80},
  // A
  {4,700,  0,800,  0, 80},
  {4,800,  0,800,200, 80},
  {4,800,200,700,200, 80},
  {4,700,200,700,100, 80},
  {4,700,100,800,100, 80},
  // U-N
  {5,100,  0,200,200,  0},
  // N-I
  {6,300,200,400,  0,  0},
  // I-B
  {7,400,200,500,  0,  0},
  // B-A
  {8,500,100,700,  0,  0}
};
//����ɂ��錴�_�𒆉��ֈړ�
for(int i=0; i<logo.length; i++){
  logo[i][1] -= 400;
  logo[i][2] -= 125;
  logo[i][3] -= 400;
  logo[i][4] -= 125;
}
//Z���ɕ`�悷�郉�C���̊Ԋu
int zPitch = 20;

//Random Pattern 1 �̕ϐ�
//���_�������_���ړ����邽�߂̔z��
float[] randomPos = new float[logo.length*6];
//���_�̈ړ��ʂ��ꎞ�I�Ɋi�[����ϐ� x1, y1, z1, x2, y2, z2
float xPos;
float yPos;
float zPos;
float xPos2;
float yPos2;
float zPos2;
//��̐F�̕ω��ʂ��i�[����ϐ� h, s, b
int strokeHval = 10;
int strokeSval = 10;
int strokeBval = 10;
//�^�C�~���O����p�̕ϐ�
int frameCounter = 0;
int drawPattern = 0;
boolean drawMode = true;

//��ʃX�P�[�� HTML���Ŋg��\�����Ă���ꍇ�̒����p�����[�^
float windowScale = 1;


//----------------------------------

//����
void setup()
{
  processingInitComplete();
  
  frameRate(30);
  colorMode(HSB);
  noSmooth();
  noFill();
  background(255);
  
  xRotateMidiSOffset = int(random(xRotateMidiS.length));
  yRotateMidiSOffset = int(random(yRotateMidiS.length));
  zRotateMidiSOffset = int(random(zRotateMidiS.length));
  strokeHMidiSOffset = int(random(strokeHMidiS.length));
  strokeSMidiSOffset = int(random(strokeSMidiS.length));
  strokeBMidiSOffset = int(random(strokeBMidiS.length));
  bgAlphaMidiSOffset = int(random(bgAlphaMidiS.length));
  xDiffMidiSOffset = int(random(xDiffMidiS.length));
  yDiffMidiSOffset = int(random(yDiffMidiS.length));
  zDiffMidiSOffset = int(random(zDiffMidiS.length));
  scZMidiSOffset = int(random(scZMidiS.length));
  weightMidiSOffset = int(random(weightMidiS.length));
}

void setStageSize(int windowWidth, int windowHeight, float windowScaleS)
{
  size(windowWidth, windowHeight);
  windowScale = windowScaleS;
}

//���C�����[�v
void draw()
{
  //�`�惂�[�h�𔽓]������
  frameCounter += 1;
  if (frameCounter > 30 && drawMode) {
  	drawMode = false;
  	frameCounter = 0;
  }
  if (frameCounter > 150) {
  	drawMode = true;
  	drawPattern = int(random(6));
  	frameCounter = 0;
  }
  if (drawMode) {
  	  switch(drawPattern) {
  	    //----------------------------------
  	    //Random Pattern 1
  	    case 0:
  	      //�O�̃t���[����w�i�ŏ㏑��
          if ((frameCounter < 23)||(frameCounter > 28)) {
            background(255);
          }
          //�����̕`�惋�[�v
          for(int i=0; i<logo.length; i=i+1) {
            for(int j=0; j<=logo[i][5]; j=j+zPitch) {
              //�`��
              //x1, y1, x2, y2, z1, z2, rotateX, rotateY, rotateZ
              draw2dLine(logo[i][1],logo[i][2],logo[i][3],logo[i][4], j, j, xRotate, yRotate, zRotate);
            }
          }
          //��]
     	  xRotate = xRotate + PI / (frameCounter%45+1)/10;
  	      yRotate = yRotate + PI / 120;
  	      zRotate = zRotate + PI / 4.5;
          //�F��ύX
  	      changeColor();
  	      break;
  	    //----------------------------------
  	    // Random Pattern 2 
  	    case 1:
  	      //�O�̃t���[����w�i�ŏ㏑��
  	      if (frameCounter < 5) {
            background(255);
          }
          //�J�����̈ʒu�������_���ŕύX
          camZ = -3000 - random() * 3000;
          //�����̕`�惋�[�v
          for(int i=0; i<logo.length; i=i+1) {
            for(int j=0; j<=logo[i][5]; j=j+zPitch) {
              //�`��
          	  //x1, y1, x2, y2, z1, z2, rotateX, rotateY, rotateZ
         	  draw2dLine(logo[i][1],logo[i][2],logo[i][3],logo[i][4], j, j, xRotate, yRotate, zRotate);
            }
          }
          //��]
     	  xRotate = xRotate + PI / random(45);
  	      yRotate = yRotate + PI / random(45);
  	      zRotate = zRotate + PI / random(45);
          //�F��ύX
  	      changeColor();
  	      break;
  	    //----------------------------------
  	    // Random Pattern 3
  	    case 2:
  	      if (frameCounter == 0){
  	        for (int i=0; i<randomPos.length; i++){
  	          randomPos[i] = 0;
  	        }
  	      }
  	      //�O�̃t���[����w�i�ŏ㏑��
          if (frameCounter > 5) {
            background(255);
          }
          //�����̕`�惋�[�v
          for(int i=0; i<logo.length; i=i+1) {
            for(int j=0; j<=logo[i][5]; j=j+zPitch) {
              //���_�������_���ړ�
              randomPos[j/4*3]   += random(10)-5;    // x
  		      randomPos[j/4*3+1] += random(10)-5;    // y
              randomPos[j/4*3+2] += random(10)-5;  // z
  		      randomPos[j/4*3+3] += random(10)-5;    // x2
              randomPos[j/4*3+4] += random(10)-5;    // y2
              randomPos[j/4*3+5] += random(10)-5;  // z2
              xPos = logo[i][1] + randomPos[j/4*3];
              yPos = logo[i][2] + randomPos[j/4*3+1];
              zPos = j + randomPos[j/4*3+2];
              xPos2 = logo[i][3] + randomPos[j/4*3+3];
              yPos2 = logo[i][4] + randomPos[j/4*3+4];
              zPos2 = j + randomPos[j/4*3+5];
              //�`��
              //x1, y1, x2, y2, z1, z2, rotateX, rotateY, rotateZ
		      draw2dLine(xPos, yPos, xPos2, yPos2, zPos, zPos2, xRotate, yRotate, zRotate);
            }
          }
          //�F��ύX
  	      changeColor();
  	      break;
  	    //Random Pattern 4 (�Ă�[)
  	    case 3:
  	      //background(255);
  	      strokeCap(SQUARE);
  	      if ((frameCounter < 5)||(frameCounter > 15)) {
            background(255);
          }
  	      
  	      w = int (random(4));
          x = int (random(4));
          y = int (random(4));
          z = int (random(4));
              
          //�����̕`�惋�[�v
          for(int i=0; i<logo.length; i=i+1) {
            for(int j=0; j<=300; j=j+zPitch){
              //�`��
              //x1, y1, x2, y2, z1, z2, rotateX, rotateY, rotateZ
              draw2dLine(logo[i][w],logo[i][x],logo[i][y],logo[i][z], j, j, xRotate, yRotate, zRotate);
            }
          }
          xRotate = xRotate + PI/random(40,120);
          yRotate = yRotate + PI/120;
          zRotate = zRotate + PI/(random(10,40,120));
         
          //�F��ύX
  	      changeColor();
  	      //������ύX
  	      weight = weight+random(-1,1,3);
  	      break;
  	    //Random Pattern 5 (�̂�)
  	    case 4:
  	      //�w�i�������_���F��
  	      background(255);
  	      strokeCap(SQUARE);
          //�����̕`�惋�[�v
          for(int i=0; i<logo.length; i=i+1) {
            for(int j=0; j<=300; j=j+zPitch){
              //�`��
              
              w = int (random(1,4));
              x = int (random(1,4));
              y = int (random(1,4));
              z = int (random(1,4));
              
              numX = int (random(PI));
              numY = int (random(PI));
              numZ = int (random(PI));
              
              xRotate = numX;
              yRotate = numY;
              zRotate = numZ;
              
              draw2dLine(logo[i][w],logo[i][x],logo[i][y],logo[i][z], j, j, xRotate, yRotate, zRotate);
            }
          }
          //�F��ύX
  	      //changeColor();
  	      //strokeH = int (random(255));
  	      //strokeS = 255;
  	      //strokeB = 255;
  	      weight = weight+0.1;
  	      break;
  	      //Random Pattern 6 (�Ă�[2)
  	    case 5:
  	      //background(255);
  	      
  	      if((frameCounter < 0)||(frameCounter > 10)) {
            camZ = -3000 - 0.5 * 7500;
            background(255);
            }else if((frameCounter < 10)||(frameCounter > 20)){
            camZ = -3000 - 0.5 * 5000;
            background(255);
            }else{
            camZ = -3000 - 0.5 * 1000;
            background(255);
          }
  	      
  	      w = int (random(4));
          x = int (random(4));
          y = int (random(4));
          z = int (random(4));
              
          //�����̕`�惋�[�v
          for(int i=0; i<logo.length; i=i+1) {
            for(int j=0; j<=500; j=j+zPitch){//logo[i][5]; j=j+zPitch) {
              //�`��
              //x1, y1, x2, y2, z1, z2, rotateX, rotateY, rotateZ
              draw2dLine(logo[i][1],logo[i][2],logo[i][3],logo[i][4], j, j, xRotate, yRotate, zRotate);
            }
          }
          xRotate = xRotate + PI/3;
          
         
          //�F��ύX
  	      changeColor();
  	      break;
  	    //

  	  }
    } else {
      //----------------------------------
      //Normal
      
          noStroke();
  		  fill(255, bgAlphaMidiS[(frameCount+bgAlphaMidiSOffset)%bgAlphaMidiS.length]);
  		  rect(0,0,width,height);
          
          //�����̕`�惋�[�v
      	  for(int i=0; i<logo.length; i=i+1) {
        	for(int j=0; j<=logo[i][5]; j=j+zPitch) {
              //�`��
              //x1, y1, x2, y2, z1, z2, rotateX, rotateY, rotateZ
          	  draw2dLine(logo[i][1] + float(xDiffMidiS[(frameCount+xDiffMidiSOffset)%xDiffMidiS.length])
          	  			,logo[i][2] + float(yDiffMidiS[(frameCount+yDiffMidiSOffset)%yDiffMidiS.length])
          	  			,logo[i][3] + float(xDiffMidiS[(frameCount+xDiffMidiSOffset)%xDiffMidiS.length])
          	  			,logo[i][4] + float(yDiffMidiS[(frameCount+yDiffMidiSOffset)%yDiffMidiS.length])
          	  			, j + float(zDiffMidiS[(frameCount+zDiffMidiSOffset)%zDiffMidiS.length])
          	  			, j + float(zDiffMidiS[(frameCount+zDiffMidiSOffset)%zDiffMidiS.length])
          	  			, float(xRotateMidiS[(frameCount+xRotateMidiSOffset)%xRotateMidiS.length])
          	  			, float(yRotateMidiS[(frameCount+yRotateMidiSOffset)%yRotateMidiS.length])
          	  			, float(zRotateMidiS[(frameCount+zRotateMidiSOffset)%zRotateMidiS.length])
          	  			);
            }
          }
          strokeH = float(strokeHMidiS[(frameCount+strokeHMidiSOffset)%strokeHMidiS.length]);
          strokeS = float(strokeSMidiS[(frameCount+strokeSMidiSOffset)%strokeSMidiS.length]);
          strokeB = float(strokeBMidiS[(frameCount+strokeBMidiSOffset)%strokeBMidiS.length]);
		  
		  weight = float(weightMidiS[(frameCount+weightMidiSOffset)%weightMidiS.length]);
		  scZ = float(scZMidiS[(frameCount+scZMidiSOffset)%scZMidiS.length]);
      
      
      /*
      //�O�̃t���[����w�i�ŏ㏑��
      background(255);
      //�����̕`�惋�[�v
      for(int i=0; i<logo.length; i=i+1) {
        for(int j=0; j<=logo[i][5]; j=j+zPitch) {
          //�`��
          //x1, y1, x2, y2, z1, z2, rotateX, rotateY, rotateZ
          draw2dLine(logo[i][1],logo[i][2],logo[i][3],logo[i][4], j, j, xRotate, yRotate, zRotate);
        }
      }
      //��]
  	  xRotate += (0 - xRotate) / 2;
  	  yRotate += (0 - yRotate) / 2;
  	  zRotate += (PI / 2 - zRotate) / 2;
  	  //
  	  //����p��
      float radS = -PI/360*70;
	  //
  	  weight = 0.5;
  	  */
  }
}

//�����ϊ� x1, y1, x2, y2, z1, z2, rotateX, rotateY, rotateZ
void draw2dLine(float x1,float y1,float x2,float y2,float z1, float z2, float rx, float ry, float rz)
{
  //Y���̉�]�ʂ𔽉f
  float z1cash = z1;
  float z2cash = z2;
  z1 = x1 * sin(ry) - z1cash * cos(ry);
  z2 = x2 * sin(ry) - z2cash * cos(ry);
  x1 = x1 * cos(ry) + z1cash * sin(ry);
  x2 = x2 * cos(ry) + z2cash * sin(ry);
  //X���̉�]�ʂ𔽉f
  float z1cash = z1;
  float z2cash = z2;
  z1 = y1 * sin(rx) - z1cash * cos(rx);
  z2 = y2 * sin(rx) - z2cash * cos(rx);
  y1 = y1 * cos(rx) + z1cash * sin(rx);
  y2 = y2 * cos(rx) + z2cash * sin(rx);
  //Z���̉�]�ʂ𔽉f
  float x1cash = x1;
  float x2cash = x2;
  float y1cash = y1;
  float y2cash = y2;
  x1 = x1 * sin(rz) + y1cash * cos(rz);
  x2 = x2 * sin(rz) + y2cash * cos(rz);
  y1 = y1 * sin(rz) - x1cash * cos(rz);
  y2 = y2 * sin(rz) - x2cash * cos(rz);
  //�����ϊ�
  float x1b = width/2  + x1 * (camZ + z1) * tan(radS/2) / (scZ + z1) * tan(radS/2);
  float y1b = height/2 + y1 * (camZ + z1) * tan(radS/2) / (scZ + z1) * tan(radS/2);
  float x2b = width/2  + x2 * (camZ + z2) * tan(radS/2) / (scZ + z2) * tan(radS/2);
  float y2b = height/2 + y2 * (camZ + z2) * tan(radS/2) / (scZ + z2) * tan(radS/2);
  //�`��J�n�ʒu������
  translate(0,0);
  //��̐F�E����
  stroke(strokeH, strokeS, strokeB);
  strokeWeight(weight);
  
  //HTML���̊g��k���X�P�[����K�p
  x1b = x1b * windowScale + (width-width*windowScale)/2;
  y1b = y1b * windowScale + (height-height*windowScale)/2;
  x2b = x2b * windowScale + (width-width*windowScale)/2;
  y2b = y2b * windowScale + (height-height*windowScale)/2;
  
  //�`��
  line(x1b,y1b,x2b,y2b);
}

//�F��ύX����
void changeColor()
{
  //�F H
  strokeH += strokeHval;
  if (strokeH > 255) {
    strokeH = 255;
    strokeHval = - strokeHval;
  }
  if (strokeH < 0) {
    strokeH = 0;
    strokeHval = - strokeHval;
  }
  //�F S
  strokeS += strokeSval;
  if (strokeS > 255) {
    strokeS = 255;
    strokeSval = - strokeSval;
  }
  if (strokeS < 0) {
    strokeS = 255;
    strokeSval = - strokeSval;
  }
  //�F B
  strokeB += strokeBval;
  if (strokeB > 255) {
    strokeB = 255;
    strokeBval = - strokeBval;
  }
  if (strokeB < 100) {
    strokeB = 100;
    strokeBval = - strokeBval;
  }
}