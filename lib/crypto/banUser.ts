// ========================================================================================
// From book: Secure Your Node.js Web Application, page 93
//
// Insert delays in your login mechanism.
//
// You can ban the user for a while, such as fifteen minutes after five failed attempts,
// or make the user fill out a CAPTCHA challenge.
// Banning the user is a double-edged sword, because an attacker can maliciously block
// legitimate users by intentionally entering bad passwords, so use it carefully.
// The other approach is to create a universal delay for each failed login
// for a certain period of time. The legitimate user won’t feel the delay; the attacker will.
//
// Ban the user’s IP for a period of time if the user fails to log in a certain number of times

// NOTE: WIP

const MAX_FAILED_COUNT = 5; // Max tries
const FORGET_FAILED_MINS = 15; // time the user will be blocked

export class BanUser {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly blockList: any;

  constructor() {
    this.blockList = {};
  }

  // Check if ip is still allowed
  isAllowed(ip: string): boolean {
    return !this.blockList[ip] || this.blockList[ip].count < MAX_FAILED_COUNT;
  }

  // Remove ip from blockList
  successfulAttempt(ip: string): void {
    if (this.blockList[ip]) {
      if (this.blockList[ip].timeout) {
        clearTimeout(this.blockList[ip].timeout);
      }
      delete this.blockList[ip];
    }
  }

  // Increment blockList counter
  failedAttempt(ip: string): void {
    if (!this.blockList[ip]) {
      this.blockList[ip] = {
        count: 0,
      };
    }
    this.blockList[ip].count++;
    if (this.blockList[ip].timeout) {
      clearTimeout(this.blockList[ip].timeout);
    }
    const root = this.blockList;
    this.blockList[ip].timeout = setTimeout(function () {
      delete root[ip];
    }, FORGET_FAILED_MINS * 60 * 1000);
  }
}
