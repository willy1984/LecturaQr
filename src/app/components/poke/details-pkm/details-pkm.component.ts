import { Component } from '@angular/core';
import { MyAppService } from '../../../services/my-app.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DataPkm } from '../../../model/data-pkm';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details-pkm',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    CommonModule
  ],
  providers: [
    MyAppService
  ],
  templateUrl: './details-pkm.component.html',
  styleUrl: './details-pkm.component.scss'
})
export class DetailsPkmComponent {

  dataPkm!: DataPkm;
  namePkm = '';
  imgPkm!: string;

  constructor(private servicesPkm: MyAppService,
              private actRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const namePkm = this.actRouter.snapshot.params;
    this.namePkm = namePkm['urlPoke']
    this.servicesPkm.viewDetailsPoke(namePkm['urlPoke']).subscribe({
      next: (data) => {
        this.dataPkm = data;
        this.getImgPkm(data.sprites.other?.dream_world.front_default);
      }
    });
  }

  getImgPkm(image: any): void {
    this.servicesPkm.getImagePkm(image).subscribe({
      next: (data) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.imgPkm = reader.result as string;
        };
        reader.readAsDataURL(data);
        // console.log(data);
      }
    });
  }

}
