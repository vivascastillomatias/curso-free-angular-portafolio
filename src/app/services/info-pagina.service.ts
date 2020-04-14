import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { Equipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  equipo: Equipo[] = [];
  cargada = false;

  constructor( private http: HttpClient) { 

    console.log('Servicio de pagina listo');

    this.cargarInfo();

    this.cargarEquipo();
  }
  
  private cargarInfo(){
    
    this.http.get('https://curso-free-angular.firebaseio.com/data-pagina.json')
      .subscribe( (resp:InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      })
  }

  private cargarEquipo(){
    
    this.http.get('https://curso-free-angular.firebaseio.com/equipo.json')
      .subscribe( (resp: Equipo[]) => {
        this.equipo = resp;
      })
  }
}
