
import { Component } from '@angular/core';
import { AppService } from './app.service';

export const POOL1_POINTS = 11775030;
export const POOL2_POINTS = 78167819;
export const POOL3_POINTS = 30100 + 24750;  // Phase1 + Phase2
export const POOL1_REWARDS = 420000;
export const POOL2_REWARDS = 210000;
export const POOL3_REWARDS = 105000;

export const POOL1_MULTIPLIER = POOL1_REWARDS/POOL1_POINTS;
export const POOL2_MULTIPLIER = POOL2_REWARDS/POOL2_POINTS;
export const POOL3_MULTIPLIER = POOL3_REWARDS/POOL3_POINTS;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  phase1Rewards = 0;
  phase2Rewards = 0;
  result = 0;
  show = false;
  memeClass = 'meme0';
  error = '';
  graffiti: any;

  constructor(private service: AppService) {
  }

  async calculate(graffiti: string) {
    this.error = '';
    this.result = 0;
    this.show = true;
    if (!graffiti) {
      this.error = 'Graffiti cannot be empty';
      return;
    }
    const id = await this.getUserId(graffiti);
    this.phase1Rewards = await this.getPhase1Rewards(id);
    this.phase2Rewards = await this.getPhase2Rewards(id);
    this.result = +(+this.phase1Rewards + this.phase2Rewards).toFixed(2);
    this.setMemClass();
  }

  async getUserId(graffiti: string) {
    try {
      const data = await this.service.infoByGraffiti(graffiti);
      return data.id;
    }
    catch (e) {
      this.error = 'Cannot find your graffiti ' + '"' + graffiti + '"';
    }
  }

  async getPhase1Rewards(id: string) {
    let total = 0;
    try {
      const data = await this.service.infoPhase1(id);
      total = (+data.metrics.blocks_mined.points +
        data.metrics.bugs_caught.points +
        data.metrics.community_contributions.points +
        data.metrics.social_media_contributions.points
      ) * POOL1_MULTIPLIER + data.metrics.pull_requests_merged.points * POOL3_MULTIPLIER;
      return +total.toFixed(2);
    }
    catch (e) {
      return 0;
    }
  }

  async getPhase2Rewards(id: string) {
    let total = 0;
    try {
      const data = await this.service.infoPhase2(id);
      total = (
        +data.metrics.node_uptime.points +
        data.metrics.send_transaction.points +
        data.metrics.bugs_caught.points
      ) * POOL2_MULTIPLIER + data.metrics.pull_requests_merged.points * POOL3_MULTIPLIER;
      return +total.toFixed(2);
    }
    catch (e) {
      return 0;
    }
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
