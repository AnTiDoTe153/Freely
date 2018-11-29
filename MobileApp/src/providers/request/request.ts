import { Injectable } from '@angular/core';
import { Http, RequestMethod, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import { Headers } from '@angular/http';
import { Subject } from 'rxjs';
import {Events} from 'ionic-angular/';

export class RequestProviderOptions {
    method: RequestMethod;
    url: string;
    params = {};
    data = {};
}

@Injectable()
export class RequestProvider {

    private errors: Observable<any>;
    private errorsSubject = new Subject<any>();

    private restUrl: string = "http://127.0.0.1:5000/";

    private jwt_token: String;

    constructor(
        private events: Events,
        private _http: Http,
        // private _broadcastService:BroadcastService,
    ) {
        this.errors = this.errorsSubject.asObservable();

        this.registerErrorHandler();
    }

    public setToken(token: String): void {
        this.jwt_token = token;
    }

    buildGet(url: string, handleError?: boolean): Observable<Response> {
        let options = new RequestProviderOptions();
        options.method = RequestMethod.Get;
        // avoid caching GET request by appending timestamp
        options.url = encodeURI(this.restUrl + url);
        return this.request(options, true, handleError);
    }


    /**
     * Builds a post request observable.
     * @param url The url to call.
     * @param content The body content.
     * @param handleError if true or undefined any error is handled globally here in this class
     * and will be displayed automatically in the global error section, running spinners will be terminated as well,
     * if false the subscribers error handler must handle the error
     * @returns {Observable<any>}
     */
    buildPost(url: string, content: any, handleError?: boolean): Observable<Response> {
        let options = new RequestProviderOptions();
        
        options.method = RequestMethod.Post;
        options.url = encodeURI(this.restUrl + url);
        options.data = content;

        console.log("url: " + options.url + "data" + options.data);
        return this.request(options, true, handleError);
    }

    getHeaders(isJson: boolean): Headers {
        let headers = new Headers();

        if (isJson) {
            headers.append('Content-Type', 'application/json');
        }
        if (this.jwt_token) {
            headers.append('Authorization', 'Bearer ' + this.jwt_token);
        }
        return headers;
    }

    private request(options: RequestProviderOptions, isJson: boolean,
        handleError?: boolean): Observable<any> {
        options.method = (options.method || RequestMethod.Get);
        options.url = (options.url || '');
        options.params = (options.params || {});
        options.data = (options.data || {});

        let requestOptions = new RequestOptions();
        requestOptions.method = options.method;
        requestOptions.url = options.url;
        requestOptions.headers = this.getHeaders(isJson);
        requestOptions.body = JSON.stringify(options.data);


        if (options.method === RequestMethod.Get) {
            // avoid caching of GET requests with status 200 -> IE does that
            requestOptions.search = requestOptions.search || new URLSearchParams();
        }

        let stream = this._http.request(options.url, requestOptions)
            .catch((error: any) => {
                if (handleError === null || typeof (handleError) === 'undefined') {
                    handleError = true;
                }

                if (handleError === true) {
                    // error is handled by the registered error handler
                    this.handleError(error);
                }
                return Observable.throw(error);
            });

        return stream;
    }

    private registerErrorHandler() {
        this.errors.subscribe(
            (err: any) => {
                this.handleError(err);
            }
        );
    }

    /**
     * Global error handler checks if error is json and comes from the backend, otherwise the http error
     * code is checked (error propably from the webserver), if not matched error is logged.
     * @param err
     */
    private handleError(err: any) {
        try {
            // parse to check if error is json -> received from backend not from the webserver
            JSON.parse(err._body);
            this.events.publish('unhandledError');
        } catch (e) {
            // not a error
            if(err.status === 401){
                this.events.publish('session:expired');
            } else {
                console.group('RequestErrorHandler');
                console.log(err.status, 'status code detected');
                console.dir(err);
                console.groupEnd();
            }
        }
    }
}