import { Component, ElementRef, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader, Result } from '@zxing/library';
import { MatChipsModule } from '@angular/material/chips'

@Component({
  selector: 'app-read-code',
  standalone: true,
  imports: [
    MatChipsModule
  ],
  templateUrl: './read-code.component.html',
  styleUrl: './read-code.component.scss'
})
export class ReadCodeComponent {

  // result: string | null = null;
  // private codeReader = new BrowserMultiFormatReader();
  @ViewChild('video', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('video', { static: true }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  codeReader = new BrowserMultiFormatReader();
  result: string | null = null;
  col6 = 'col-6';
  col12 = 'col-12';
  opencamera = false;
  photo = false;

  constructor() {
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
          this.opencamera = true
        })
        .catch(err => console.error(err));
    } else {
      console.error('Media devices not supported');
    }
  }

  stopCamera(): void {
    this.opencamera = false
    this.photo = false;
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

  async capture() {
    this.photo = true;
    this.result = null;
    const video = this.video.nativeElement;
    const canvas = this.canvas.nativeElement;
    const context = canvas.getContext('2d');
    let algo: any;
    
    if (context && this.photo) {
      algo = context.drawImage(video, 0, 0, canvas.width, canvas.height);
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
