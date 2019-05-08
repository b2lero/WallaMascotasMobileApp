import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IPet} from '../../../models/pet.model';
import {PetService} from '../../../services/pet.service';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.page.html',
  styleUrls: ['./pet-profile.page.scss'],
})

export class PetProfilePageComponent implements OnInit {

  static URL = 'pet/:id';
  private dogId: string;
  private pet: IPet;

  constructor(private router: ActivatedRoute, private petservice: PetService) {
    this.dogId = this.router.snapshot.paramMap.get('id');
    console.log(this.dogId);
  }

  ngOnInit() {
  }

}
