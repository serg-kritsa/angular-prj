import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../shared/product.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in')
      ]),
      transition('* => void', [
        animate(1000, style({opacity: 0}))
      ])
    ])
  ]
})
export class ProductsComponent implements OnInit {
  products: Product[];
  selectedProduct: Product;
  isEditBlockVisible: boolean;
  editedProduct: any;
  constructor(private service: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }
  getProducts(): void {
    const products = this.service.getProducts()
// tslint:disable-next-line: no-shadowed-variable
    .subscribe( products => this.products = products);
  }
  onClickProduct(product) {
    this.selectedProduct = product;
    this.service.getProduct(product.id)
// tslint:disable-next-line: no-shadowed-variable
    .subscribe(product => console.log(product));
  }
  onClickSave(product) {
    this.service.updateProduct(product)
    .subscribe(_ => console.log(`Product saved`));
    this.isEditBlockVisible = false;
  }
  onClickAdd(name: string, price: number) {
    // console.log(name, price);
    this.service.addProduct({name, price} as Product)
    .subscribe(product => {
      this.products.push(product);
    });
  }
  onClickDelete(productId: number) {
    this.products = this.products.filter(product => product.id !== productId);
    this.service.deleteProduct(productId).subscribe();
  }
  onClickEdit(product) {
    this.editedProduct = product;
    if (!this.isEditBlockVisible) {
      this.isEditBlockVisible = true;
    } else {
      this.isEditBlockVisible = false;
    }
  }
}
