
import { Component } from '@angular/core';

export const POOL1_POINTS = 11775030;
export const POOL2_POINTS = 58031819
export const POOL3_POINTS = 50000;
export const POOL1_REWARDS = 420000;
export const POOL2_REWARDS = 210000;
export const POOL3_REWARDS = 105000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  pool1 = 0;
  pool2 = 0;
  pool3 = 0;
  result = 0;
  show = false;
  memeClass = 'meme0';

  calculate() {
    this.result = 0;
    this.show = true;
    if (this.pool1) {
      this.result = this.result + POOL1_REWARDS/POOL1_POINTS*this.pool1;
    }
    if (this.pool2) {
      this.result = this.result + POOL2_REWARDS/POOL2_POINTS*this.pool2;
    }
    if (this.pool3) {
      this.result = this.result + POOL3_REWARDS/POOL3_POINTS*this.pool3;
    }
    this.setMemClass();
  }

  setMemClass() {
    if (this.result >= 1000) {
      this.memeClass = 'meme6';
    } else if (this.result >= 500) {
      this.memeClass = 'meme5';
    } else if (this.result >= 100) {
      this.memeClass = 'meme4';
    } else if (this.result >= 50) {
      this.memeClass = 'meme3';
    } else if (this.result >= 5) {
      this.memeClass = 'meme2';
    } else if (this.result >= 0) {
      this.memeClass = 'meme1';
    }
  }
}
