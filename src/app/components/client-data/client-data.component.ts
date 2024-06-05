import { Component, ViewChild } from '@angular/core';
import { MyAppService } from '../../services/my-app.service';
import { HttpClientModule } from '@angular/common/http';
import { PostsData } from '../../model/posts-data';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-client-data',
  standalone: true,
  imports: [
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [
    MyAppService
  ],
  templateUrl: './client-data.component.html',
  styleUrl: './client-data.component.scss'
})

export class ClientDataComponent {

  displayedColumns: string[] = ['id', 'idClient', 'title', 'content'];
  postsData = new MatTableDataSource<PostsData>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.postsData.paginator = this.paginator;
  }

  constructor(private service: MyAppService) {}

  ngOnInit(): void {
    this.getPost();    
  }

  getPost(): void {
    this.service.getPost().subscribe({
      next: (data: PostsData[]) => {
        this.postsData.data = data;
        console.log(this.postsData);
      }
    });
  }

}
