import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { EnvelopeComponent } from './components/envelope/envelope.component';
import { ControlsComponent } from './components/controls/controls.component';
import { SelectorComponent } from './components/selector/selector.component';
import { IntroComponent } from './components/intro/intro.component';
import { LetterService } from './services/letter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EnvelopeComponent, ControlsComponent, SelectorComponent, IntroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  title = 'heart-letter-app';
  letterService = inject(LetterService);
  hearts: any[] = [];

  ngOnInit() {
    this.generateHearts();
  }

  generateHearts() {
    this.hearts = Array(50).fill(0).map(() => ({
      left: Math.random() * 100 + 'vw',
      animationDuration: Math.random() * 3 + 2 + 's',
      animationDelay: Math.random() * 2 + 's',
      opacity: Math.random() * 0.5 + 0.3
    }));
  }
}
