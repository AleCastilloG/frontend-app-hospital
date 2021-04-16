import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Hospital } from "../../models/hospital.model";
import { HospitalService, MedicoService } from "../../services/service.index";
import { Medico } from "../../models/medico.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalUploadService } from "../../components/modal-upload/modal-upload.service";

@Component({
  selector: "app-medico",
  templateUrl: "./medico.component.html",
  styles: [],
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico("", "", "", { id: "", nombre: "" }, "");
  hospital: Hospital = new Hospital("");

  constructor(
    public _hospitalesService: HospitalService,
    public _medicoService: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    activatedRoute.params.subscribe((params) => {
      let { id } = params;

      if (id !== "nuevo") {
        this.cargarMedico(id);
      }
    });
  }

  ngOnInit() {
    this._hospitalesService.cargarHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
    });

    this._modalUploadService.notification.subscribe((resp) => {
      // console.log(resp);
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico(id: string) {
    this._medicoService.cargarMedico(id).subscribe((medico) => {
      this.medico = medico;
      this.medico.hospital.id = medico.hospital._id;
      this.cambioHospital(this.medico.hospital.id);
    });
  }

  guardarMedico(f: NgForm) {
    // console.log(f.valid);
    // console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._medicoService.guadarMedico(this.medico).subscribe((medico) => {
      this.medico._id = medico._id;
      this.router.navigate(["/medico", medico._id]);
    });
  }

  cambioHospital(id: string) {
    if (!id) {
      return;
    }

    this._hospitalesService.obtenerHospital(id).subscribe((hospital) => {
      this.hospital = hospital;
    });
  }

  cambiarFoto() {
    this._modalUploadService.mostrarModal("medicos", this.medico._id);
  }
}
