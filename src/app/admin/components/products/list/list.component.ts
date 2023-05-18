import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit{
  
  constructor(spinner:NgxSpinnerService,private productService:ProductService,private alertifyService:AlertifyService) {
    super(spinner)
  }
  
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate','updatedDate'];
  dataSource:MatTableDataSource<List_Product>=null;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  async getProducts(){
    this.showSpinner(SpinnerType.BallAtom);
    const allProducts:{totalCount:number;products:List_Product[]}=await this.productService.getProductList(this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,()=>this.hideSpinner(SpinnerType.BallAtom), errorMessage=> this.alertifyService.message(errorMessage,{
      dismissOthers:true,
      messageType:MessageType.Eror,
      position:Position.TopRight
    }));
    this.dataSource=new MatTableDataSource<List_Product>(allProducts.products);
    //sayfalama aktivasyonu
    this.paginator.length=allProducts.totalCount;
    // this.dataSource.paginator = this.paginator;
    debugger;
  }
  async pageChanged(){
    await this.getProducts();
  }
  async ngOnInit() {
    await this.getProducts();

  } 

}
