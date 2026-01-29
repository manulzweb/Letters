import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterService } from '../../services/letter.service';
import { LETTER_COLLECTION } from '../../content/letter-content';

@Component({
    selector: 'app-selector',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './selector.component.html',
    styleUrl: './selector.component.css'
})
export class SelectorComponent {
    letterService = inject(LetterService);
    letters = LETTER_COLLECTION;

    select(letter: any) {
        this.letterService.selectLetter(letter);
    }
}
