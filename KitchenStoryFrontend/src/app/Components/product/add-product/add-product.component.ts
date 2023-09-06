import { Component } from '@angular/core';
import { ProductService } from 'src/app/Services/product.service';
import { Product } from '../all-products/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product: Product = new Product();

  constructor(
    private prouctService: ProductService,
    private toastr: ToastrService
  ) {}

  saveProduct() {
    this.prouctService.createProduct(this.product).subscribe({
      error: (error) => {
        this.toastr.error('Product cant be created. Please try again later!');
        console.log(error); // log error with details, may be connected sentry later
      },
    });
  }

  onSubmit() {
    const { pid, name, brand, origin, price, quantity, category, ingredient } =
      this.product;
    if (
      !name ||
      !brand ||
      !origin ||
      !price ||
      !quantity ||
      !pid ||
      !category ||
      !ingredient
    ) {
      this.toastr.warning('Please enter all product details!');
    } else {
      this.saveProduct();
      this.toastr.success('Product Added Successfully!');
    }
  }
}
