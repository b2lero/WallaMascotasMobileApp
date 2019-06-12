import {Injectable} from '@angular/core';
import {HttpService} from '../core/http.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class NotificationService {

    eventSource: EventSource;
    topicToSubscribeURL: URL;
    topicSubject: Subject<string> = new BehaviorSubject(undefined);
    dataReceive;

    constructor(private http: HttpService, private toastController: ToastController) {
        this.topicToSubscribeURL = new URL(ApiEndpoint.HUB);
        this.topicToSubscribeURL.searchParams.append('topic', ApiEndpoint.TOPIC_ASSOCIATION_PETS);
    }

    subscribeThisTopic() {
        const url = this.topicToSubscribeURL;
        this.eventSource = new EventSource('' + url);
        console.log('SUBSCRIBED');
        this.eventSource.onmessage = result => {
            this.dataReceive = result.data;
            this.topicSubject.next(this.dataReceive);
        };
        this.eventSource.onerror = e => this.topicSubject.error(e);
    }

    topicObservable() {
        return this.topicSubject.asObservable();
    }
}
