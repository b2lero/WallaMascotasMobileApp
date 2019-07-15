import {Injectable} from '@angular/core';
import {HttpService} from '../core/http.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {ToastController} from '@ionic/angular';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {MessageModel} from '../models/message.model';

@Injectable()
export class NotificationService {

    eventSource: EventSource;
    topicToSubscribeURL: URL;
    topicSubject: Subject<MessageModel> = new BehaviorSubject(undefined);
    dataReceive;

    constructor(private http: HttpService, private toastController: ToastController) {
    }

    subscribeThisTopic(assocId: string) {
        this.topicToSubscribeURL = new URL(ApiEndpoint.HUB);
        this.topicToSubscribeURL.searchParams.append('topic', ApiEndpoint.TOPIC_ASSOCIATION_PETS + assocId);
        const url = this.topicToSubscribeURL;
        this.eventSource = new EventSource('' + url);
        console.log(url);
        console.log('SUBSCRIBED association id ', assocId);
        this.eventSource.onmessage = result => {
            console.log('enviado desde el servidor', result);
            this.dataReceive = result.data;
            this.topicSubject.next(this.dataReceive);
        };
        this.eventSource.onerror = e => this.topicSubject.error(e);
    }

    unsubscribeThisTopic() {
        this.eventSource.close();
        console.log('unsubscribed');
    }

    topicObservable() {
        return this.topicSubject.asObservable();
    }
}
