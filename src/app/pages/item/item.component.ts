import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoCompleto } from '../../interfaces/productoCompleto.interface';
import { Producto } from '../../interfaces/Producto.inteface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoCompleto = {}
  imgPortada: string ='';
  cargando = true;
  id : string;

  constructor( private route : ActivatedRoute, public productosService: ProductosService) { }

  ngOnInit(): void {

    this.route.params.subscribe( parametros => {
      // console.log(parametros);
      this.productosService.getProducto(parametros.id).subscribe((producto: ProductoCompleto) => {
        this.cargando = false;
        this.id = parametros.id;
        this.producto = producto;

        this.imgPortada = this.productosService.productos.filter( p => p.cod === this.id)[0].url;
      })

    } );
  }

}
