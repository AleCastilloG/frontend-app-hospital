import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-promesas",
  templateUrl: "./promesas.component.html",
  styles: [],
})
export class PromesasComponent implements OnInit {
  constructor() {
    // Una forma de hacerlo una promesa
    // promesa.then(
    //   () => console.log('Termino'),
    //   () => console.log('Error')
    // );

    this.contarTres()
      .then((mensaje) => console.log("Termino!", mensaje))
      .catch((error) => console.error("Error en la promesa", error));
  }

  ngOnInit() {}

  contarTres(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);

        if (contador === 3) {
          resolve(true);
          // reject('simplemente un error');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
