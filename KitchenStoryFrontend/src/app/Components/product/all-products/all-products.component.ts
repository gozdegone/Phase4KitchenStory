import { Component } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from './Product';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  allProducts!: Product[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
      },
      error: (error) => {
        console.log(error);
        this.toastr.warning('No products found!');
      },
    });
  }

  updateProduct(id: string) {
    this.router.navigateByUrl(`/update-item/ ${id}`);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.getProducts();
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Product cant be deleted, please try again later!');
      },
    });
  }
}
