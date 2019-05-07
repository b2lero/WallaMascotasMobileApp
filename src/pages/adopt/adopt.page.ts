import {Component, OnInit} from '@angular/core';
import {IPet} from '../../models/pet.model';
import {PetService} from '../../services/pet.service';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.page.html',
  styleUrls: ['./adopt.page.scss'],
})
export class AdoptPageComponent implements OnInit {

  static URL = 'adopt';
  private pageTitle = 'Adoptar una mascota';

  private animals: IPet[] = [];
  private mockPets: IPet[] = [];
  private dogsImagesUrls: [] = [];



  constructor(private petService: PetService) {
    console.log('--> Loading Adopt Page');
    this.petService.readAllPets().subscribe(
        (data: IPet[]) => {
          console.log('--> Loading dat a from /pets');
          this.animals = data.length === 0 ? this.mockPets : data;
        }
    );

    this.petService.getDogsImages().subscribe(
      data => {
        this.dogsImagesUrls = data;
        console.log(this.dogsImagesUrls);
      }
    );
  }

  private initialize() {
      console.log('--> onInit Loaded');
      const mockPets = [];
      for (let i = 0; i < 6; i++) {
          mockPets.push(
              {
                  name: 'Plouf' + i,
                  breed: 'Pitbull',
                  description: 'small description of the pet',
                  age: 10 + i,
                  region: {name: 'Granada', country: 'Spain'},
                  pictureUrl: {url: this.dogsImagesUrls[i - 1]}
              }
          );
      }
      this.mockPets = mockPets;
      console.log('--> Content mockpets', this.mockPets);
  }
}

// TODO
// Agregar filtros busqueda mascotas
