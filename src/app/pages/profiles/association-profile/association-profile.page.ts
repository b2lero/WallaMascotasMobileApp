import { Component, OnInit } from '@angular/core';
import {IAssociation} from '../../../../models/association.model';
import {AssociationService} from '../../../../services/association.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-association-profile',
  templateUrl: './association-profile.page.html',
  styleUrls: ['./association-profile.page.scss'],
})
export class AssociationProfilePage implements OnInit {

  association: IAssociation;
  associationId;

  constructor(private assocService: AssociationService, private router: ActivatedRoute) {
    this.associationId = this.router.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.assocService.readAssociationById(this.associationId).subscribe(
        data => this.association = data
    );
  }

}
