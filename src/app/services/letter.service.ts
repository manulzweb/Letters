import { Injectable, signal } from '@angular/core';
import { LETTER_CONTENT } from '../content/letter-content';

@Injectable({
  providedIn: 'root'
})
export class LetterService {
  isOpen = signal(false);
  letterText = signal(LETTER_CONTENT);

  open() {
    this.isOpen.set(true);
  }

  reset() {
    this.isOpen.set(false);
  }

  updateText(text: string) {
    this.letterText.set(text);
  }
}
