import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})

export class AccueilComponent implements OnInit {

  public monTitre: string;
  public monIntroduction: string;
  public maPhraseAccroche: string;

  champSaisi = new FormControl('');

  public population: any;
  public monnaie: any;
  public langue: any;
  public capitale: any;
  public flag: any;

  constructor(private http: HttpClient) {
    this.monTitre = 'Hello World';
    this.monIntroduction = 'Obtenez les informations sur un pays !';
    this.maPhraseAccroche = 'Insérez le pays dans le formulaire ci-dessous';
  }

  ngOnInit(): void {}

  public afficherChampSaisi() {
    this.http.get("https://restcountries.com/v3.1/name/" + this.champSaisi.value)
      .subscribe({
        next: (data: any) => {
          const pays = data[0] || {};

          this.capitale = pays['capital'];
          this.population = pays['population'] ? pays['population'] + ' habitants' : '';
          this.langue = pays['languages'] ? Object.values(pays['languages']).join(', ') : '';

          if (pays['currencies']) {
            const codeDeDevise = pays['currencies'] ? Object.keys(pays['currencies'])[0] : '';
            this.monnaie = pays['currencies'] ? pays['currencies'][codeDeDevise]['name'] : '';
          } else {
            this.monnaie = '';
          }

          this.flag = pays['flags'] ? pays['flags']['png'] : '';
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }
}