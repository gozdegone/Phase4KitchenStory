import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { Order } from '../place-order/order';
import { Product } from '../../product/all-products/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css'],
})
export class OrderConfirmComponent implements OnInit {
  id!: number;
  order: Order = new Order();
  product: Product = new Product();

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.orderService.getOrder(this.id).subscribe({
      next: (order) => {
        this.order = order;
        this.product = this.order.product;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Order not found. Please contact admin!');
      },
    });
  }
}
