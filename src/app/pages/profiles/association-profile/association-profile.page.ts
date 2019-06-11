import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {IAssociation} from '../../../../models/association.model';
import {AssociationService} from '../../../../services/association.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {IPet} from '../../../../models/pet.model';
import {PetService} from '../../../../services/pet.service';
import {IonContent, IonInfiniteScroll, ToastController} from '@ionic/angular';
import {NotificationService} from '../../../../services/notification.service';

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
    private currentPage = 1;
    PAGE_SIZE = 8;
    associationId: string;
    associationPetsImages: IPet[] = [];
    request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
    isAdoptedToogle = false;
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
    private isSubscribed = false;
    private isNotif = false;
    private msg: string;


    constructor(
        private petSerivecTest: PetService,
        private userService: UserService,
        private assocService: AssociationService,
        private router: ActivatedRoute,
        private changeDetect: ChangeDetectorRef,
        private notificationService: NotificationService,
        public toastController: ToastController) {
    }

    ngOnInit() {
        this.associationId = this.router.snapshot.paramMap.get('id');
        // this.readAssociationById(this.associationId);
        // this.readAllPetsPicturesByAsssociationId(this.associationId);
        this.loadPets(this.request);
        this.currentPage += 1;
    }

    readAssocById(id) {
        this.assocService.readAssociationById(id).subscribe(
            data => this.profileAssoc = data
        );
    }

    readPetsPicturesByAsssociationId(id) {
        this.userService.readAllPetsByUserId(this.associationId, this.request).subscribe(
            data => {
                this.associationPetsImages = data.pets.map(el => el.pictures[0].url);
            }
        );
    }

    loadPets(request) {
        this.petSerivecTest.readAllPets(request).subscribe(
            data => {
                this.associationPetsImages = data.pets.map(el => el.pictures[0].url);
            }
        );
    }

    loadMorePets() {
        const request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
        console.log('next request', request);
        this.petSerivecTest.readAllPets(request).subscribe(
            (result) => {
                setTimeout(() => {
                    const imgsUrls = this.associationPetsImages;
                    const newImgsUrls = result.pets.map(el => el.pictures[0].url);
                    if (newImgsUrls.length > 0) {
                        this.associationPetsImages = imgsUrls.concat(newImgsUrls);
                        this.currentPage += 1;
                        console.log(this.infiniteScroll.disabled);
                    } else {
                        this.isContentLoaded = true;
                    }
                }, 200);
            },
            () => {
            },
            () => this.infiniteScroll.complete()
        );
    }

    scrollToTop() {
        this.content.scrollToTop(500);
    }

    resetOptions() {
        this.currentPage = 1;
        // this.infiniteScroll.disabled = false;
        this.isContentLoaded = false;
    }

    loadAdoptedPets() {
        if (this.isAdoptedToogle) {
            this.changeDetect.detectChanges();
            // this.infiniteScroll.disabled = false;
            this.resetOptions();
            const req = {page: 1, pageSize: this.PAGE_SIZE, status: 'adoptado'};
            this.loadPets(req);
        } else {
            const newReq = {page: 1, pageSize: this.PAGE_SIZE};
            this.resetOptions();
            this.loadPets(newReq);
        }
    }

    subscribeThisAssociation() {
        this.isSubscribed = !this.isSubscribed;
        this.notificationService.subscribeThisTopic();

        this.notificationService.topicObservable().subscribe(
            data => {
                if (data !== undefined) {
                    this.isNotif = true;
                    this.msg = data;
                    this.presentToast();
                }
            }

        );
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'New Pet Added',
            duration: 2000,
        });
        toast.present();
    }
}
