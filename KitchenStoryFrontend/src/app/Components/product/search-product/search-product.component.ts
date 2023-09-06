import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from '../all-products/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css'],
})
export class SearchProductComponent implements OnInit {
  name!: string;
  products!: Product[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    this.showProducts();
  }

  showProducts() {
    this.productService.searchProducts(this.name).subscribe({
      next: (products: Product[]) => {
        this.products = products;
      },
      error: (error: any) => {
        console.log(error);
        this.toastr.warning('No products found!');
      },
    });
  }

  selectProduct(id: string) {
    let url = '/place-order/' + id;
    this.router.navigateByUrl(url);
  }
}
