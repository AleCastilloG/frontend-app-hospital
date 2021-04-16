import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { SubirArchivoService } from "../../services/subir-archivo/subir-archivo.service";
import { ModalUploadService } from "./modal-upload.service";

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: [],
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemp: string;

  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {}

  cerrarModal() {
    const image: any = document.getElementById("InImage");
    image.value = "";

    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  seleccionImage(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      Swal.fire(
        "Sólo imágenes",
        "El archivo seleccionado no es una imagen",
        "error"
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      // es una data:image en bas64
      // console.log(reader.result);
      this.imagenTemp = reader.result as string;
    };
  }

  subirImagen() {
    this._subirArchivoService
      .subirArchivo(
        this.imagenSubir,
        this._modalUploadService.tipo,
        this._modalUploadService.id
      )
      .then((resp) => {
        this._modalUploadService.notification.emit(resp);
        this.cerrarModal();
      })
      .catch((err) => {
        console.log("Error en la carga...");
      });
  }
}
