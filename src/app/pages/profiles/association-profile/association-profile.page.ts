import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {IAssociation} from '../../../../models/association.model';
import {AssociationService} from '../../../../services/association.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {IPet} from '../../../../models/pet.model';
import {PetService} from '../../../../services/pet.service';
import {IonContent, IonInfiniteScroll, ToastController} from '@ionic/angular';
import {NotificationService} from '../../../../services/notification.service';
import {ELocalNotificationTriggerUnit, LocalNotifications} from '@ionic-native/local-notifications/ngx';

@Component({
    selector: 'app-association-profile',
    templateUrl: './association-profile.page.html',
    styleUrls: ['./association-profile.page.scss'],
})
export class AssociationProfilePage implements OnInit {

    static URL = ':id';
    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonContent) content: IonContent;
    PAGE_SIZE = 8;
    private currentPage = 1;
    request = {page: this.currentPage, pageSize: this.PAGE_SIZE};
    associationId: string;
    associationPetsImages: IPet[] = [];
    isAdoptedToogle = false;
    private isContentLoaded: boolean;
    private isSubscribed = false;
    private isNotif = false;
    private msg: string;
    private profileAssoc: IAssociation = {
        name: null,
        location: null,
        pictures: null,
        websiteUrl: null,
        email: null
    };


    constructor(
        private petSerivecTest: PetService,
        private userService: UserService,
        private assocService: AssociationService,
        private router: ActivatedRoute,
        private changeDetect: ChangeDetectorRef,
        private notificationService: NotificationService,
        public toastController: ToastController,
        private localNotifications: LocalNotifications) {
    }

    ngOnInit() {
        this.associationId = this.router.snapshot.paramMap.get('id');
        this.readAssocById(this.associationId);
        // this.readAllPetsPicturesByAsssociationId(this.associationId);
        this.loadPets(this.request);
        this.currentPage += 1;
    }

    readAssocById(id) {
        this.assocService.readAssociationById(this.associationId).subscribe(
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
        this.isContentLoaded = false;
    }

    loadAdoptedPets() {
        if (this.isAdoptedToogle) {
            this.changeDetect.detectChanges();
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
                    this.scheduleNotif();
                }
            }
        );
    }

    scheduleNotif() {
        this.localNotifications.hasPermission().then(
            ok => {
            this.localNotifications.schedule({
                    id: 1,
                    title: 'New Pet Added',
                    text: 'Association 1 added new pet',
                    icon: 'res://icon.png',
                    smallIcon: 'res://icon.png'
                });
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
