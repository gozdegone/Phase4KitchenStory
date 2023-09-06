import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Product } from '../all-products/Product';
import { ProductService } from 'src/app/Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
})
export class UpdateProductComponent implements OnInit {
  id!: string;
  product: Product = new Product();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Product not found!');
      },
    });
  }

  onSubmit() {
    this.productService.updateProduct(this.id, this.product).subscribe({
      next: () => {
        this.toastr.success('Product update successfully!');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Update of product failed!');
      },
    });
  }
}
