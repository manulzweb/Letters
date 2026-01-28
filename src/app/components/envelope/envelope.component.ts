import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetterService } from '../../services/letter.service';
import { LetterComponent } from '../letter/letter.component';

@Component({
    selector: 'app-envelope',
    standalone: true,
    imports: [CommonModule, LetterComponent],
    templateUrl: './envelope.component.html',
    styleUrl: './envelope.component.css'
})
export class EnvelopeComponent {
    letterService = inject(LetterService);
}
