/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../cliente/cliente';
import { ClienteService } from '../cliente/cliente.service';
import { Message } from 'primeng/api';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';

import { FormGroup } from '@angular/forms';

import { Cidade } from '../cidade/cidade';
import { CidadeService } from '../cidade/cidade.service';
import { Imovel } from './imovel';
import { ImovelService } from './imovel.service';
import { Bairro } from '../bairro/bairro';
import { BairroService } from '../bairro/bairro.service';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../environments/environment';
import { DataTable } from 'primeng/components/datatable/datatable';
import { FileUploader} from 'ng2-file-upload'
@Component({
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent implements OnInit {

  @ViewChild('dt') dataTable: DataTable;

  imovels: Imovel[];
  latitude: number;
  longitude: number;
  currentLat: any;
  currentLong: any;
  marker: google.maps.Marker;
  isTracking = false;
  public options: any;
  imovelEdit = new Imovel();


  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  clientes: Cliente[];
  cidades: Cidade[];
  bairros: Bairro[];
  showDialog = false;
  showConfirm = false;
  msgs: Message[] = [];

  isDisabledVenda = true;
  isDisabledLoca = true;

  // atributos utilizados para o upload
  uploadedFiles: any[] = [];
  urlApi: string = environment.api;
  today: number = Date.now();

  makeRandomDataProvider() {
    const dataProvider = [];

    // Generate random data
    for (let year = 1950; year <= 2005; ++year) {
      dataProvider.push({
        year: '' + year,
        value: Math.floor(Math.random() * 100) - 50
      });
    }

    return dataProvider;
  }

  constructor(private imovelService: ImovelService,
    private clienteService: ClienteService,
    private cidadeService: CidadeService,
    private confirmationService: ConfirmationService,
    private bairroservice: BairroService) {
  }


  ngOnInit(): void {
    this.imovelEdit = new Imovel();
    this.imovelEdit.bairro = new Bairro();
    this.imovelEdit.bairro.cidade = new Cidade();
    this.imovelEdit.cliente = new Cliente();

    console.log(this.imovels);
    this.imovelService.findAll().subscribe(e => {
      this.imovels = e;
    });

    // Método utilizado no upload de arquivos
  /*    myUploader(event) {
      for (const file of event.files) {
        this.uploadedFiles.push(file);
      }

      this.msgs = [{
        severity: 'info', summary: 'Arquivo salvo',
        detail: 'Arquivo salvo com sucesso!'
      }];
      setTimeout(() => {
        this.dataTable.reset();
        this.showDialog = false;
        this.uploadedFiles = [];
      }, 500);
    }*/

    // Testando o Google Maps
    const mapProp = {
      center: new google.maps.LatLng(-26.201377098618924, -52.691727236269685),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    this.map.addListener('click', (position) => {
      this.imovelEdit.latitude = position.latLng.lat();
      this.imovelEdit.longitude = position.latLng.lng();
      this.marker.setPosition(position.latLng);
    });

    let location = new google.maps.LatLng(-26.201377098618924, -52.691727236269685);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }

    this.clienteService.findAll().subscribe(e => this.clientes = e);
    this.cidadeService.findAll().subscribe(e => this.cidades = e);

  }

  buscaBairros(cidade): void {
    this.bairroservice.findByCidade(cidade).subscribe(c => this.bairros = c);
  }


  disableVenda() {
    this.isDisabledVenda = !this.isDisabledVenda;
    return;
  }
  disableLocacao() {
    this.isDisabledLoca = !this.isDisabledLoca;
    return;
  }

  findAll() {
    this.imovelService.findAll().subscribe(e => this.imovels = e);
    console.log(this.imovels);
  }


  setCenter(e: any, cidades) {
    e.preventDefault();
    this.map.setCenter(new google.maps.LatLng(cidades[0].latitude, cidades[0].longitude));
  }

  novo() {
    this.showDialog = true;
    this.imovelEdit = new Imovel();
    this.imovelEdit.bairro = new Bairro();
    this.imovelEdit.bairro.cidade = new Cidade();
  }

  salvar() {
    this.imovelService.save(this.imovelEdit).subscribe(e => {
      this.imovelEdit = new Imovel();
      this.imovelEdit.bairro = new Bairro();
      this.imovelEdit.bairro.cidade = new Cidade();

      this.findAll();
      this.showDialog = false;
      this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro salvo com sucesso' }];
    },
      error => {
        this.msgs = [{ severity: 'error', summary: 'Erro', detail: 'Certifique-se de preencher todos os campos.' }];
      }
    );


  }

  editar(imovel: Imovel) {
    this.imovelEdit = imovel;
    this.buscaBairros(imovel.bairro.cidade);

    let location = new google.maps.LatLng(imovel.latitude, imovel.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }

    if (this.imovelEdit.venda == false) {
      this.isDisabledVenda = true;
    } else {
      this.isDisabledVenda = false;
    }

    if (this.imovelEdit.locacao == false) {
      this.isDisabledLoca = true;
    } else {
      this.isDisabledLoca = false;
    }

    this.showDialog = true;
  }


  setMapType(mapTypeId: string) {
    this.map.setMapTypeId(mapTypeId);
  }

  confirmDelete(imovel: Imovel) {
    this.confirmationService.confirm({
      message: 'Essa ação não poderá ser desfeita',
      header: 'Deseja remover esse registro?',
      acceptLabel: 'Sim', rejectLabel: 'Não',
      accept: () => {
        this.imovelService.delete(imovel.id).subscribe(() => {
          this.findAll();
          this.msgs = [{ severity: 'sucess', summary: 'Confirmado', detail: 'Registro removido com sucesso' }];
        });
      }
    });
  }

  cancelar() {
    this.showDialog = false;
    this.imovelService.findAll().subscribe(e => this.imovels = e);
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  //esse está sendo usado
  showPositionClick(position) {
    console.log("position.latLng.lat() " + position.latLng.lat());
    console.log("position.latLng.lng() " + position.latLng.lng());


    this.currentLat = position.latLng.lat();
    this.currentLong = position.latLng.lng();
    console.log("this.currentLong " + this.currentLong);

    this.longitude = this.currentLong;
    console.log("this.longitude " + this.longitude);

    this.imovelEdit.longitude = this.currentLong;
    console.log("this.imovelEdit.longitude " + this.imovelEdit.longitude);


    let location = new google.maps.LatLng(position.latLng.lat(), position.latLng.lng());
    //this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
      this.marker.setPosition(location);
    }
    else {
      this.marker.setPosition(location);
    }
    this.showDialog = true;
  }
  /*
    showPositionClick2(location) {
      console.log("Position do click= " + location.latLng);
      // this.showPosition()
      this.marker = new google.maps.Marker({
        position: location.latLng,
        map: this.map,
        title: 'TEEEEEEEEEEEEESTE!'
      });
      this.marker.setPosition(location.latLng);
    }
  */
  //evento do botao localizacao atual
  showPosition(position) {
    console.log("Position= " + position.coords.latitude);

    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }
  /*
    trackMe() {
      if (navigator.geolocation) {
        this.isTracking = true;
        navigator.geolocation.watchPosition((position) => {
          this.showTrackingPosition(position);
        });
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    }
  
    showTrackingPosition(position) {
      console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
  
      let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.panTo(location);
  
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: location,
          map: this.map,
          title: 'Got you!'
        });
      }
      else {
        this.marker.setPosition(location);
      }
    }*/
}
