import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UsuarioService } from "../services/usuario/usuario.service";
import { Usuario } from "../models/usuario.model";

// Llamar una función de un script desde afuera
// Llamar cualquier scripts que se encuentre afuera de angular, con plugins, carruseles, etc
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) {}

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem("email") || "";
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load("auth2", () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          "696277837817-h90cg02eqmuv4ra6fq9ogahbpokscams.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email",
      });

      this.attachSignin(document.getElementById("btnGoogle"));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      // console.log(profile);
      // console.log(token);
      this._usuarioService.loginGoogle(token).subscribe((resp) => {
        // console.log(resp);
        // this.router.navigate(['/dashboard']);
        // Redireción manual
        window.location.href = "#/dashboard";
      });
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService
      .login(usuario, forma.value.recuerdame)
      .subscribe((resp) => {
        this.router.navigate(["/dashboard"]);
      });

    console.log(forma.valid);
    console.log(forma.value);
    // this.router.navigate(['/dashboard']);
  }
}
