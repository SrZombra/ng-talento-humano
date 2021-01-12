import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  loading(): void{
    Swal.fire({
      allowOutsideClick: false,
      showConfirmButton: false,
      heightAuto: false,
      html: '<img src="assets/img/loading.gif" style="width: 200px"></img>',
    });
  }

  closeSwal(){
    Swal.close();
  }

  error(err){

    if(err.status === 404){
      this.error404();
    }

    if(err.status === 401){
      this.error401();
    }

    if(err.status === 500){
      this.error500();
    }

    if(err.status === 400){
      this.error400();
    }
    
  }

  private error500(){
    Swal.fire({
      title: 'Ha ocurrido un error inesperado, intentelo nuevamente',
      text: 'Error del servidor',
      icon: 'error',
      heightAuto: false,
      allowOutsideClick: false,
    });
  }

  private error400(){
    Swal.fire({
      title: 'Ha ocurrido un error inesperado, intentelo nuevamente',
      text: 'Error del servidor',
      icon: 'error',
      heightAuto: false,
      allowOutsideClick: false,
    });
  }

  private error404(){
    this.closeSwal();
    return false;
  }

  private error401(){
    Swal.fire({
      title: 'Cierre de sesión',
      text: 'Se ha superado del tiempo de espera.',
      icon: 'error',
      heightAuto: false,
      allowOutsideClick: false,
    });
  }

}
