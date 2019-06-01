import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AssociationService} from '../../../services/association.service';
import {IAssociation} from '../../../models/association.model';
import {IonInfiniteScroll} from '@ionic/angular';

@Component({
  selector: 'app-associations',
  templateUrl: './associations.page.html',
  styleUrls: ['./associations.page.scss'],
})
export class AssociationsPage implements OnInit {

  static URL = 'associations';
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  pageTitle: any = 'Asociaciones';
  listAssociations: IAssociation[] = [];
  private currentPage = 1;
  private PAGE_SIZE = 6;
  noContent = false;
  requestAssociations = {page: this.currentPage, pageSize: this.PAGE_SIZE};
  association: IAssociation = {
    id: '1',
    name: 'Wallamascotas',
    location: 'Comunidad de Madrid',
    email: ['walla@mail.com'],
    pictures: [{url: './../../../../assets/imgs/wallamascotas_logo.jpg'}],
    phones: [{number: '640 860 293'}]
  };

  constructor(private assocService: AssociationService) { }

  ngOnInit() {
    this.assocService.readAllAssociations(this.requestAssociations).subscribe(
      result => {
        // Dev purposes, api does not work
        if (result.associations.length === 1) {
          this.noContent = true;
          this.listAssociations = [...Array(10).fill(this.association)];
        } else {
          // this.listAssociations = result.associations;
          this.currentPage += 1;
        }
      }
    );
  }

  loadMoreAssociations() {
    // Change state on each call from 'Loading' to 'Enable
    this.infiniteScroll.complete();
    const request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
    if (!this.noContent) {
      this.assocService.readAllAssociations(request).subscribe(
          (result) => {
            setTimeout(() => {
              console.log(result);
              const associations = this.listAssociations;
              const newAssociations = result.associations;
              if (newAssociations.length > 0) {
                this.listAssociations = associations.concat(newAssociations);
                this.currentPage += 1;
              } else {
                // All data loaded
                // this.infiniteScroll.disabled = true;
              }
            }, 50);
          }
      );
    }
  }
}
