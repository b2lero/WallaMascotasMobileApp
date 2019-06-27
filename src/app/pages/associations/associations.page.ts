import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {AssociationService} from '../../../services/association.service';
import {IAssociation} from '../../../models/association.model';
import {IonInfiniteScroll} from '@ionic/angular';
import {map} from 'rxjs/operators';

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
    requestAssociations = {page: this.currentPage, pageSize: this.PAGE_SIZE};

    constructor(private assocService: AssociationService) {
    }

    ngOnInit() {
        this.assocService.readAllAssociations(this.requestAssociations).subscribe(
            result => {
                console.log('assocations results', result);
                this.listAssociations = result.associations;
            }
        );
    }

    loadMoreAssociations() {
        // Change state on each call from 'Loading' to 'Enable
        this.infiniteScroll.complete();
        const request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
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
                        this.infiniteScroll.disabled = true;
                    }
                }, 2000);
            }
        );
    }
}
