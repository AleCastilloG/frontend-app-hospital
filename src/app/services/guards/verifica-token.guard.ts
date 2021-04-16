import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from "../usuario/usuario.service";

@Injectable()
export class VerificaTokenGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log('token guard');

    /* recuperar informacion del token, los token jwt son internamente un string codificados en base64*/
    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split(".")[1]));

    let expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(["/login"]);
      return true;
    }

    return this.verificaRenueva(payload.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      /* aqui estamos utilizando la fecha del navegador web, pero si tú quieres
      puedes traer la fecha de la base de datos*/
      let tokenExp = new Date(fechaExp * 1000); // *1000 por convertirlo a milisegundos
      let ahora = new Date();

      // la fecha actual más 4 horas
      // siempre el token va ser renovado, puedes quitarle la suma del time
      ahora.setTime(ahora.getTime() + 4 * 60 * 60 * 1000); // 4horas, 60minutos,60segundos, 1000milisegundos
      // console.log("token va expirar", tokenExp);
      // console.log("fecha ahora", ahora);

      if (tokenExp.getTime() > ahora.getTime()) {
        // no quiero renovar el token
        resolve(true);
      } else {
        this._usuarioService.renuevaToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            // si falla la renovación del token
            this.router.navigate(["/login"]);
            reject(false);
          }
        );
      }
    });
  }

  expirado(fechaExp: number) {
    // fecha actual del sistema , /1000 para convertirlo en segundos
    let ahora = new Date().getTime() / 1000;

    // el toke ya expiro
    if (fechaExp < ahora) {
      return true;
    } else {
      // no ha expirado
      return false;
    }
  }
}
