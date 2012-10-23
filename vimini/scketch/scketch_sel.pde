int delnum = 100;
int[] cell = new int[delnum];
int rsize = 5;
int right=0;
int left=0;
int size = 0;
 
void setup() {
  size(500, 1000);
  background(255);
  for (int i=0; i<delnum; i++) {
    cell[i] = int(random(0, 2));
  }
}
 
void draw() {
  drawCells(cell, size);
  for (int i=0; i<delnum; i++) {
    if (i == 0) {
      left = delnum - 1;
      right = i + 1;
    } else if (i == 99) {
      left = i - 1;
      right = 0;
    } else {
      left = i - 1;
      right = i + 1;
    }
    if (cell[i] == 0) {
      deadecell(i);
    }
    if (cell[i] == 1) {
      alivecell(i);
    }
  }
  size = size + 5;
}
 
void drawCells(int[] cells, int size) {
  for (int i=0; i<delnum; i++) {
    fill(0);
    if (cells[i] == 0) {
      fill(255);
    }
    rect(i*5, size, rsize, rsize);
  }
}
 
void deadecell(int i) {
  if (cell[left] == 1 && cell[right] == 1) {
    cell[i] = 0;
  } else if (cell[left] == 1 && cell[right] == 0 || cell[left] == 0 && cell[right] == 1){
    cell[i] = 1;
  } else if (cell[left] == 0 && cell[right] == 0) {
    cell[i] = 0;
  }
}
 
void alivecell(int i){
  if (cell[left] == 1 && cell[right] == 1) {
    cell[i] = 0;
  } else if (cell[left] == 1 && cell[right] == 0 ) {
    cell[i] = 0;
  } else if (cell[right] == 1 && cell[left] == 0) {
    cell[i] = 1;
  } else if (cell[left] == 0 && cell[right] == 0) {
    cell[i] = 1;
  }
}