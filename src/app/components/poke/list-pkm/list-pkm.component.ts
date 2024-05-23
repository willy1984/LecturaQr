import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { MyAppService } from '../../../services/my-app.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Listpkm } from '../../../model/list-pkm';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-pkm',
  standalone: true,
  imports: [
    HttpClientModule,
    MatPaginatorModule,
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [MyAppService],
  templateUrl: './list-pkm.component.html',
  styleUrl: './list-pkm.component.scss'
})
export class ListPkmComponent {

  listPk: Listpkm = new Listpkm();
  offset = 0;

  length = 0;
  pageSize = 20;
  pageIndex = 0;
  pageSizeOptions = [20];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;

  constructor(private services: MyAppService,
              private router: Router
  ) {}

  ngOnInit(): void {
       this.getListPkm(this.offset, this.pageSize);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  getListPkm(off: number, lim: number) {
    this.services.buscarPk(off, lim).subscribe({
      next: (data) => {
        this.listPk = data;
        this.length = this.listPk.count;
      }
    }); 
  }

  viewPoke(poke: string): void {
    this.router.navigateByUrl(`details-pkm/${poke}`);
  }

  changePag(pag: any) {
    this.offset  = pag.pageIndex * this.pageSize;
    this.getListPkm(this.offset, this.pageSize);
  }

}
