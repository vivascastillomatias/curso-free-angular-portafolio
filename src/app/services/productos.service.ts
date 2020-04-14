import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/Producto.inteface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  cargando = true;

  constructor( private http : HttpClient) {

    this.cargarProductos();
   }

  private cargarProductos(){

    return new Promise((resolve, reject)=>{

      this.http.get('https://curso-free-angular.firebaseio.com/productos_idx.json')
        .subscribe( (resp:Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        })

    });
  }

  getProducto(id:String){
    return this.http.get(`https://curso-free-angular.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino:string){

    if (this.productos.length === 0) {
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      })
    }else{
      this.filtrarProductos(termino);
    }
  }
  
  private filtrarProductos(termino:string){
    
    this.productosFiltrado = this.productos.filter( p => {

      if (p.categoria.indexOf(termino) >= 0 ) {
        return p;
      }
    })
    console.log(this.productosFiltrado);
    
  }
}
