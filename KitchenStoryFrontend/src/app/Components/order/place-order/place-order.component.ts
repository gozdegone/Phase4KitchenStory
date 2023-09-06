import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/Services/product.service';
import { OnInit } from '@angular/core';
import { Product } from '../../product/all-products/Product';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from './order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css'],
})
export class PlaceOrderComponent implements OnInit {
  id!: string;
  product: Product = new Product();
  order: Order = new Order();
  amount!: number;
  public payment = false;

  constructor(
    private orderService: OrderService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProduct(this.id).subscribe({
      next: (product) => {
        this.product = product;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Product not found!');
      },
    });
  }

  onPaymentSelection(): boolean {
    return (this.payment = this.order.payment === 'COD');
  }

  onSubmit(): void {
    if (
      this.order.name == null ||
      this.order.address == null ||
      this.order.contact == null ||
      this.order.state == null
    ) {
      this.toastr.warning('Please provide all the details!');
    } else {
      this.order.product = this.product;
      this.orderService.orderProduct(this.order).subscribe({
        next: (order: Order) => {
          let url = '/order-confirm/' + order.id;
          this.router.navigateByUrl(url).then(() => {
            location.reload();
          });
        },
        error: (error) => {
          console.log(error);
          this.toastr.warning(
            'Cant create order right now. Please try again later!'
          );
        },
      });
    }
  }
}
