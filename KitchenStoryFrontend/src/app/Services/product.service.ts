import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../Components/product/all-products/Product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  API_PATH = 'products';

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private http: HttpClient
  ) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${this.API_PATH}`);
  }

  searchProducts(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${this.baseUrl}/${this.API_PATH}/filter/${name}`
    );
  }

  createProduct(product: Product): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/${this.API_PATH}`, product);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${this.API_PATH}/${id}`);
  }

  updateProduct(id: string, product: Product): Observable<Object> {
    return this.http.put<Object>(
      `${this.baseUrl}/${this.API_PATH}/${id}`,
      product
    );
  }

  deleteProduct(id: string): Observable<Object> {
    return this.http.delete<Object>(`${this.baseUrl}/${this.API_PATH}/${id}`);
  }
}
