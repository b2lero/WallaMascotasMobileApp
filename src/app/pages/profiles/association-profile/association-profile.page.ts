import {Component, OnInit, ViewChild} from '@angular/core';
import {IAssociation} from '../../../../models/association.model';
import {AssociationService} from '../../../../services/association.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {IPet} from '../../../../models/pet.model';
import {PetService} from '../../../../services/pet.service';
import {IonContent, IonInfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'app-association-profile',
  templateUrl: './association-profile.page.html',
  styleUrls: ['./association-profile.page.scss'],
})
export class AssociationProfilePage implements OnInit {

  static URL = ':id';
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  mockPicture = {url: './../../../../assets/imgs/wallamascotas_logo.jpg'};
  currentPage = 1;
  PAGE_SIZE = 8;
  associationId: string;
  associationPetsImages: IPet[] = [];
  request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
  isAdopted = false;
  profileAssoc: IAssociation = {
    name: 'Wallamascotas',
    location: 'Madrid',
    websiteUrl: 'wallamascotas.com',
    region: {name: 'Madrid', country: {name: 'España', code: 'dedede'}},
    email: ['walla@wallamascotas.com'],
    phones: [{number: '640 758 894', countryCode: '34'}],
    shippingType: {name: 'No se envia'},
    pictures: [this.mockPicture, this.mockPicture, this.mockPicture],
    adopted: '12',
    petsAvailable: '30'
  };
  private isContentLoaded: boolean;


  constructor(
      private petSerivecTest: PetService,
      private userService: UserService,
      private assocService: AssociationService,
      private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.associationId = this.router.snapshot.paramMap.get('id');
    // this.assocService.readAssociationById(this.associationId).subscribe(
    //     data => this.profileAssoc = data
    // );
    this.petSerivecTest.readAllPets(this.request).subscribe(
      data => {
        this.associationPetsImages = data.pets.map( el => el.pictures[0].url);
        this.currentPage += 1;
      }
    );
    // this.userService.readAllPetsByUserId(this.associationId, this.request).subscribe(
    //   data => {
    //     this.associationPets = data.pets;
    //   }
    // );


  }

  loadMorePets() {
    this.infiniteScroll.complete();
    const request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
    console.log('next request', request);
    this.petSerivecTest.readAllPets(request).subscribe(
        (result) => {
          setTimeout(() => {
            const imgsUrls = this.associationPetsImages;
            const newImgsUrls = result.pets.map( el => el.pictures[0].url);
            if (newImgsUrls.length > 0) {
              this.associationPetsImages = imgsUrls.concat(newImgsUrls);
              this.currentPage += 1;
            } else {
              this.infiniteScroll.disabled = true;
              this.isContentLoaded = true;
            }
          }, 200);
        }
    );
  }

  scrollToTop() {
    this.content.scrollToTop(500);
  }

  loadAdoptedPets($event: CustomEvent<any>) {
    if (this.isAdopted) {
      const request = {page: 1, pageSize: '3', status: 'adoptado'};
      this.petSerivecTest.readAllPets(request).subscribe(
          result => {
            this.associationPetsImages = result.pets.map( el => el.pictures[0].url);
            console.log(this.associationPetsImages);
          }

      );
    }
  }
}
