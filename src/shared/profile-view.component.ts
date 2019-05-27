import {Component, Input} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'profile-view',
    templateUrl: './profile-view.component.html',
    styleUrls: ['./profile-view.component.scss'],
})

export class ProfileViewComponent {

    sliderOpts;
    @Input() profile;

    constructor() {
    }


}
