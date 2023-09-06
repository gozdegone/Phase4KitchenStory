import { Component } from '@angular/core';
import { OrderService } from 'src/app/Services/order.service';
import { OnInit } from '@angular/core';
import { Order } from '../place-order/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css'],
})
export class AllOrdersComponent implements OnInit {
  orders!: Order[];

  constructor(
    private userService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.userService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (error) => {
        this.toastr.warning('No orders found!');
        console.log(error); // log error with details, may be connected sentry later
      },
    });
  }

  deleteOrder(id: string) {
    this.userService.deleteOrder(id).subscribe({
      next: () => {
        this.toastr.success('Successfully deleted!');
        this.getAllOrders();
      },
      error: (error) => {
        this.toastr.error('Order cant be deleted. Please try again later!');
        console.log(error); // log error with details, may be connected sentry later
      },
    });
  }
}
