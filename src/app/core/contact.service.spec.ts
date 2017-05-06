import { ReflectiveInjector } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestMethod,
  RequestOptions,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { ContactService } from './contact.service';

const mockData = { name: 'abcde', email: 'b1234', message: 'cxyz' };
let injector: ReflectiveInjector;
let backend: MockBackend;
let lastConnection: any;
let contactService: ContactService;
describe('ContactService', () => {
  beforeEach(() => {
    injector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      Http,
      ContactService,
    ]);
    backend = injector.get(ConnectionBackend) as MockBackend;
    backend.connections.subscribe((conn: any) => lastConnection = conn);
    lastConnection = null;
    contactService = injector.get(ContactService);
  });

  it('should send a post request to google forms', () => {
    contactService.submitForm(mockData);
    expect(lastConnection).toBeDefined();
    expect(lastConnection.request.url).toMatch(/google/i);
    expect(lastConnection.request.url).toMatch(/form/i);
    expect(lastConnection.request.method).toBe(RequestMethod.Post);
  });

  it('should send name, email and message', () => {
    contactService.submitForm(mockData);
    const body = lastConnection.request.getBody();
    expect(body).toContain(mockData.name);
    expect(body).toContain(mockData.email);
    expect(body).toContain(mockData.message);
  });

  it('should send Accept header', () => {
    contactService.submitForm(mockData);
    expect(lastConnection.request.headers.get('Accept')).toMatch(/\*/);
  });

  it('should send Content-Type header', () => {
    contactService.submitForm(mockData);
    expect(lastConnection.request.headers.get('Content-Type'))
      .toMatch(/application\/x-www-form-urlencoded/);
  });

  it('should maintain a stream of messages', (done) => {
    const message = 'my message';
    contactService.getMessages().subscribe((msg: string) => {
      expect(msg).toBe(message);
      done();
    });
    contactService.setMessage(message);
  });
});
