import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LetterService } from '../../services/letter.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
    selector: 'app-controls',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './controls.component.html',
    styleUrl: './controls.component.css'
})
export class ControlsComponent {
    letterService = inject(LetterService);

    open() {
        this.letterService.open();
    }

    reset() {
        this.letterService.reset();
    }

    downloadPdf() {
        // We want to capture the content as if it's a standalone letter sheet
        const letterContent = document.querySelector('.words') as HTMLElement; // Capture just the text container

        if (letterContent) {
            // Clone the text container
            const clone = letterContent.cloneNode(true) as HTMLElement;

            // Create a wrapper to simulate a "page"
            const pageWrapper = document.createElement('div');
            pageWrapper.style.position = 'absolute';
            pageWrapper.style.top = '-10000px';
            pageWrapper.style.left = '0';
            pageWrapper.style.width = '210mm'; // A4 width
            pageWrapper.style.minHeight = '297mm'; // A4 height
            pageWrapper.style.backgroundColor = '#ffffff'; // White paper
            pageWrapper.style.padding = '20mm'; // Standard margins
            pageWrapper.style.boxSizing = 'border-box';
            pageWrapper.style.display = 'flex';
            pageWrapper.style.flexDirection = 'column';
            // pageWrapper.style.justifyContent = 'center'; // Optional: center text vertically
            pageWrapper.style.fontFamily = "'Verdana', sans-serif";
            pageWrapper.style.fontSize = '16px';
            pageWrapper.style.color = '#333';
            pageWrapper.style.zIndex = '-1';

            // Style the cloned content
            clone.style.position = 'relative';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.transform = 'none';
            clone.style.width = '100%'; // Fill margins
            clone.style.height = 'auto';
            clone.style.maxHeight = 'none';
            clone.style.overflow = 'visible';
            clone.style.background = 'transparent';
            clone.style.boxShadow = 'none';
            clone.style.border = 'none';
            clone.style.borderRadius = '0';
            clone.style.margin = '0';
            clone.style.padding = '0';
            clone.style.color = 'inherit';

            // Ensure paragraphs in clone have margin
            const paragraphs = clone.querySelectorAll('p');
            paragraphs.forEach((p: HTMLElement) => {
                p.style.margin = '0';
                p.style.whiteSpace = 'pre-wrap'; // Preserve newlines
            });

            pageWrapper.appendChild(clone);
            document.body.appendChild(pageWrapper);

            html2canvas(pageWrapper, {
                scale: 2, // High quality
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });

                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('letter-for-you.pdf');

                // Clean up
                document.body.removeChild(pageWrapper);
            });
        }
    }
}
