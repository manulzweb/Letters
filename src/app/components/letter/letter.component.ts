import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterService } from '../../services/letter.service';

@Component({
    selector: 'app-letter',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './letter.component.html',
    styleUrl: './letter.component.css'
})
export class LetterComponent {
    letterService = inject(LetterService);
}
