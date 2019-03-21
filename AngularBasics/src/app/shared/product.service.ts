import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'api/products';
  constructor(private http: HttpClient) { }
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, `Operation: ${operation}` );
      return of(result as T);
    };
  }
  getProducts(): Observable<Product[]> {
    // return of(products);
    return this.http.get<Product[]>(this.productsUrl)
    .pipe(
      tap(products => console.log('Fetched products')),
      catchError(this.handleError('getProducts', []))
    );
  }
  getProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`Fetched product ${id} `)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }
  updateProduct(product): Observable<any> {
    return this.http.put(this.productsUrl, product, httpOptions)
    .pipe(
      tap(_ => console.log(`Update product `)),
      catchError(this.handleError<Product>(`Update product`))
    );
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions)
    .pipe(
// tslint:disable-next-line: no-shadowed-variable
      tap((product: Product) => console.log(`Added product ${product.id}`)),
      catchError(this.handleError<Product>(`Add product`))
    );
  }
  deleteProduct(productId: number): Observable<Product> {
    const url = `${this.productsUrl}/${productId}`;
    return this.http.delete<Product>(url, httpOptions)
    .pipe(
// tslint:disable-next-line: no-shadowed-variable
      tap(_ => console.log(`Deleted product ${productId}`)),
      catchError(this.handleError<Product>(`Delete product`))
    );
  }
}
