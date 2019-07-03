import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProfessionalServService} from '../../../../services/professional-serv.service';
import {PetService} from '../../../../services/pet.service';
import {ProServicesTypes} from '../../../../models/service-types.model';
import {CountryService} from '../../../../services/country.service';
import {ICountry} from '../../../../models/country.model';
import {IRegion} from '../../../../models/region.model';
import {fromPromise} from 'rxjs/internal-compatibility';
import {FileEntry} from '@ionic-native/file/ngx';
import {File} from '@ionic-native/File/ngx';
import {Base64Picture} from '../../../../models/base64.model';
import {CameraService} from '../../../../services/camera.service';
import {ProfessionalService} from '../../../../models/professional-service.model';

@Component({
    selector: 'app-submit-service',
    templateUrl: './submit-service.page.html',
    styleUrls: ['./submit-service.page.scss'],
})
export class SubmitServicePage implements OnInit {
    static URL = 'services';
    pageTitle = 'Alta servico';
    submitFormService: FormGroup;
    isSubmitted = false;
    typeOfServices: ProServicesTypes[] = [];
    imagesFromPhone = [];
    img64: Base64Picture = {fileName: null, base64String: null};
    imgs64Formatted: Base64Picture[] = [];
    imgsCameraWebFormat = [];
    countries: ICountry[];
    regions: IRegion[];
    newProService: ProfessionalService = { name: null, location: null, base64Pictures: null};
    professionalServiceTypeIds = [];

    constructor(private formBuild: FormBuilder, private professionalService: ProfessionalServService,
                private petService: PetService, private countryService: CountryService, private file: File,
                private cameraService: CameraService) {
    }

    ngOnInit() {
        this.submitFormService = this.formBuild.group({
            name: ['', [Validators.required]],
            regionId: ['', [Validators.required]],
            location: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            description: ['']
        });
        this.countryService.readAllcountries().subscribe(
            countries => {
                this.countries = countries;
            }
        );

        this.professionalService.readAllProfessionalServicesTypes().subscribe(
          data => {
              this.typeOfServices = data;
          }
        );
    }

    get fControls() {
        return this.submitFormService.controls;
    }

    getRegionsByCountry(event) {
        const countryId = event.detail.value;
        this.countryService.readRegionById(countryId).subscribe(
            regions => {
                this.regions = regions;
            }
        );
    }

    isImgs64FormattedEmpty(): boolean {
        return (this.imgs64Formatted.length <= 0);
    }

    launchCameraService() {
        fromPromise(this.cameraService.takePicture()).subscribe(
            res => {
                console.log(res);
                this.imgsCameraWebFormat.unshift(res);
                this.formatToImg64(res);
            }
        );
    }

    launchPhotolibraryService() {
        fromPromise(this.cameraService.takePictureFromGallery()).subscribe(
            res => {
                console.log(res);
                this.imgsCameraWebFormat.unshift(res);
                this.formatToImg64(res);
            }
        );
    }

    formatToImg64(imgEntry) {
        fromPromise(this.file.resolveLocalFilesystemUrl(imgEntry.filePath)).subscribe(
            entry => {
                (entry as FileEntry).file(resultFile => {
                    const reader = new FileReader();
                    reader.readAsDataURL(resultFile);
                    reader.onloadend = () => {
                        this.img64.fileName = resultFile.name;
                        this.img64.base64String = reader.result.toString();
                        this.imgs64Formatted.push(this.img64);
                    };
                });
            }
        );
    }

    deletePicture(position) {
        this.imgs64Formatted.splice(position, 1);
        this.imgsCameraWebFormat.splice(position, 1);
    }

    onSubmit(submitService) {
        this.isSubmitted = !this.isSubmitted;
        if (this.submitFormService.valid && this.imgs64Formatted.length < 0) {
            const newServ: ProfessionalService = submitService.value;
            this.newProService = {
                name: newServ.name,
                regionId: newServ.regionId,
                location: newServ.location,
                email: newServ.email,
                base64Pictures: this.imgs64Formatted
            };

            this.professionalService.createProfessionalService(this.newProService).subscribe(
                success => console.log('SERVICE CREATED'),
                (e) => console.log(e)
            );
        }
    }

}

