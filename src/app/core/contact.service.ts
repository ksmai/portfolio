import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ContactService {
  subject = new Subject<string>();
  url = 'https://docs.google.com/forms/d/e/1FAIpQLSdH2ySDVs5uSC7--IKzend0jSUXs5URadyQDtM6epqZPTMfLA/formResponse';

  constructor(private http: Http) {
  }

  submitForm(data: { name: string, email: string, message: string }) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', '*');

    const body = new URLSearchParams();
    body.set('entry.1939670810', data.name);
    body.set('entry.746564348', data.email);
    body.set('entry.148224861', data.message);

    return this.http
      .post(this.url, body, { headers })
      .catch((error) => error.status === 200 || error.status === 0 ?
          Observable.of(error) :
          Observable.throw(error),
      );
  }

  getMessages() {
    return this.subject;
  }

  setMessage(message: string) {
    this.subject.next(message);
  }
}
