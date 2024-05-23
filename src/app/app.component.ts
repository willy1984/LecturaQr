import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { MatButton } from '@angular/material/button'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  // result: string | null = null;
  // private codeReader = new BrowserMultiFormatReader();
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  codeReader = new BrowserMultiFormatReader();
  result: string | null = null;

  constructor() {
    // const hints = new Map();
    // hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    //   BarcodeFormat.QR_CODE,
    //   BarcodeFormat.CODE_128,
    //   BarcodeFormat.CODE_39,
    //   BarcodeFormat.EAN_13,
    //   BarcodeFormat.EAN_8,
    //   BarcodeFormat.UPC_A,
    //   BarcodeFormat.UPC_E,
    //   BarcodeFormat.ITF,
    //   BarcodeFormat.DATA_MATRIX,
    //   BarcodeFormat.PDF_417,
    //   BarcodeFormat.AZTEC
    // ]);
    // this.codeReader = new BrowserMultiFormatReader(hints);
  }

  ngOnInit(): void {
    // this.startCamera();  
  }

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.result) {
  //         const img = new Image();
  //         img.src = reader.result as string;
  //         img.onload = () => {
  //           try {
  //             const result = this.codeReader.decode(img);
  //             this.result = result.getText();
  //           } catch (e) {
  //             if (e instanceof NotFoundException) {
  //               this.result = 'No code found';
  //             } else {
  //               console.error(e);
  //               this.result = 'Error decoding';
  //             }
  //           }
  //         };
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  startCamera(): void {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
          this.videoElement.nativeElement.srcObject = stream;
          this.videoElement.nativeElement.play();
          this.scan();
        })
        .catch(err => console.error(err));
    } else {
      console.error('Media devices not supported');
    }
  }

  stopCamera(): void {
    const stream = this.videoElement.nativeElement.srcObject as MediaStream;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
  }

  scan(): void {
    this.codeReader.decodeFromVideoDevice(null, this.videoElement.nativeElement, (result: Result | undefined) => {
      if (result) {
        this.result = result.getText();
        if (this.result.includes('www')) {
          window.open(this.result, '_blank');
        }
        this.stopCamera();  // Stop the camera once a code is detected
      }
    });
  }

  openExternalCamera() {
    this.startCamera();
  }

  capture() {
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
  }

  download() {
    const canvas = this.canvas.nativeElement;
    const dataUrl = canvas.toDataURL('image/png');
    // Crear un enlace de descarga
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'captured-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
