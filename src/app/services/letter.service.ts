import { Injectable, signal } from '@angular/core';
import { LETTER_CONTENT } from '../content/letter-content';

@Injectable({
  providedIn: 'root'
})
export class LetterService {
  isOpen = signal(false);
  letterText = signal(''); // Start empty
  selectedLetter = signal<any>(null); // Track selected letter
  isTransitioning = signal(false); // New transition state

  open() {
    this.isOpen.set(true);
  }

  reset() {
    this.isOpen.set(false);
  }

  updateText(text: string) {
    this.letterText.set(text);
  }

  selectLetter(letter: any) {
    this.isTransitioning.set(true);
    this.selectedLetter.set(letter);
    this.updateText(letter.content);

    // Slight delay to simulate opening/loading
    setTimeout(() => {
      this.isTransitioning.set(false);
    }, 2000);
  }

  clearSelection() {
    this.selectedLetter.set(null);
    this.reset();
  }
}
