import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../Components/order/place-order/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  API_PATH = 'orders';

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  orderProduct(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/${this.API_PATH}`, order);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/${this.API_PATH}/${id}`);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/${this.API_PATH}`);
  }

  deleteOrder(id: string): Observable<Object> {
    return this.http.delete<Object>(`${this.baseUrl}/${this.API_PATH}/${id}`);
  }
}
