import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-intro',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './intro.component.html',
    styleUrl: './intro.component.css'
})
export class IntroComponent implements OnInit {
    @Input() letter: any;

    ngOnInit() {
        // Optional: Add logic if needed on init
    }
}
