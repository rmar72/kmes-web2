/* tslint:disable */
/* eslint-disable */
//----------------------
// ReSharper disable InconsistentNaming

import {
  mergeMap as _observableMergeMap,
  catchError as _observableCatch
} from 'rxjs/operators';
import {
  Observable,
  throwError as _observableThrow,
  of as _observableOf
} from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

@Injectable()
export class ConfigServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }

  /**
   * Retrieve automated backup settings
   * @return OK
   */
  configAutobackupGet(): Observable<ConfigAutoBackupGetResponse> {
    let url_ = this.baseUrl + '/config/autobackup';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigAutobackupGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigAutobackupGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigAutoBackupGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigAutoBackupGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigAutobackupGet(
    response: HttpResponseBase
  ): Observable<ConfigAutoBackupGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update automated backup settings
   * @return OK
   */
  configAutobackupPut(body: ConfigAutobackupPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/autobackup';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigAutobackupPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigAutobackupPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigAutobackupPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve global certificate settings
   * @return OK
   */
  configCertificatesGet(): Observable<ConfigCertificatesGetResponse> {
    let url_ = this.baseUrl + '/config/certificates';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigCertificatesGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigCertificatesGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigCertificatesGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigCertificatesGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigCertificatesGet(
    response: HttpResponseBase
  ): Observable<ConfigCertificatesGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update global certificate settings
   * @return OK
   */
  configCertificatesPut(
    body: ConfigCertificatesPutBody
  ): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/certificates';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigCertificatesPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigCertificatesPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigCertificatesPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system FTP settings
   * @return OK
   */
  configFtpGet(): Observable<ConfigFtpGetResponse> {
    let url_ = this.baseUrl + '/config/ftp';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigFtpGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigFtpGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigFtpGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigFtpGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigFtpGet(
    response: HttpResponseBase
  ): Observable<ConfigFtpGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system FTP settings
   * @return OK
   */
  configFtpPut(body: ConfigFtpPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/ftp';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigFtpPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigFtpPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigFtpPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Test FTP settings
   * @return OK
   */
  configFtpPost(body: ConfigFtpPostBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/ftp';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigFtpPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigFtpPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigFtpPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve KMIP system settings
   * @return OK
   */
  configKmipGet(): Observable<ConfigKmipGetResponse> {
    let url_ = this.baseUrl + '/config/kmip';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigKmipGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigKmipGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigKmipGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigKmipGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigKmipGet(
    response: HttpResponseBase
  ): Observable<ConfigKmipGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update KMIP system settings
   * @return OK
   */
  configKmipPut(body: ConfigKmipPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/kmip';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigKmipPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigKmipPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigKmipPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system LDAP settings
   * @return OK
   */
  configLdapGet(): Observable<ConfigLdapGetResponse> {
    let url_ = this.baseUrl + '/config/ldap';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigLdapGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigLdapGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigLdapGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigLdapGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigLdapGet(
    response: HttpResponseBase
  ): Observable<ConfigLdapGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system LDAP settings
   * @return OK
   */
  configLdapPut(body: ConfigLdapPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/ldap';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigLdapPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigLdapPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigLdapPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Test LDAP configuration
   * @return OK
   */
  configLdapPost(body: ConfigLdapPostBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/ldap';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigLdapPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigLdapPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigLdapPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system network settings
   * @return OK
   */
  configNetworkGet(): Observable<ConfigNetworkGetResponse> {
    let url_ = this.baseUrl + '/config/network';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigNetworkGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigNetworkGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigNetworkGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigNetworkGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigNetworkGet(
    response: HttpResponseBase
  ): Observable<ConfigNetworkGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system network settings
   * @return OK
   */
  configNetworkPut(body: ConfigNetworkPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/network';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigNetworkPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigNetworkPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigNetworkPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * PING specified IP or host
   * @return OK
   */
  configNetworkPost(
    body: ConfigNetworkPostBody
  ): Observable<ConfigNetworkPostResponse> {
    let url_ = this.baseUrl + '/config/network';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigNetworkPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigNetworkPost(<any>response_);
            } catch (e) {
              return <Observable<ConfigNetworkPostResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigNetworkPostResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigNetworkPost(
    response: HttpResponseBase
  ): Observable<ConfigNetworkPostResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system NTP settings
   * @return OK
   */
  configNtpGet(): Observable<ConfigNtpGetResponse> {
    let url_ = this.baseUrl + '/config/ntp';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigNtpGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigNtpGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigNtpGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigNtpGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigNtpGet(
    response: HttpResponseBase
  ): Observable<ConfigNtpGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system NTP settings
   * @return OK
   */
  configNtpPut(body: ConfigNtpPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/ntp';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigNtpPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigNtpPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigNtpPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system OCSP settings
   * @return OK
   */
  configOcspGet(): Observable<ConfigOcspGetResponse> {
    let url_ = this.baseUrl + '/config/ocsp';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigOcspGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigOcspGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigOcspGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigOcspGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigOcspGet(
    response: HttpResponseBase
  ): Observable<ConfigOcspGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system OCSP settings
   * @return OK
   */
  configOcspPut(body: ConfigOcspPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/ocsp';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigOcspPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigOcspPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigOcspPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system password security settings
   * @return OK
   */
  configPasswordsGet(): Observable<ConfigPasswordsGetResponse> {
    let url_ = this.baseUrl + '/config/passwords';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigPasswordsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigPasswordsGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigPasswordsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigPasswordsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigPasswordsGet(
    response: HttpResponseBase
  ): Observable<ConfigPasswordsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system password security settings
   * @return OK
   */
  configPasswordsPut(body: ConfigPasswordsPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/passwords';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigPasswordsPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigPasswordsPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigPasswordsPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system permission settings
   * @return OK
   */
  configPermissionsGet(): Observable<ConfigPermissionsGetResponse> {
    let url_ = this.baseUrl + '/config/permissions';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigPermissionsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigPermissionsGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigPermissionsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigPermissionsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigPermissionsGet(
    response: HttpResponseBase
  ): Observable<ConfigPermissionsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system permission settings
   * @return OK
   */
  configPermissionsPut(
    body: ConfigPermissionsPutBody
  ): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/permissions';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigPermissionsPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigPermissionsPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigPermissionsPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve registration authority settings
   * @return OK
   */
  configRegauthGet(): Observable<ConfigRegauthGetResponse> {
    let url_ = this.baseUrl + '/config/regauth';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigRegauthGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigRegauthGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigRegauthGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigRegauthGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigRegauthGet(
    response: HttpResponseBase
  ): Observable<ConfigRegauthGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update registration authority settings
   * @return OK
   */
  configRegauthPut(body: ConfigRegauthPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/regauth';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigRegauthPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigRegauthPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigRegauthPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve global security settings
   * @return OK
   */
  configSecurityGet(): Observable<any> {
    let url_ = this.baseUrl + '/config/security';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigSecurityGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigSecurityGet(<any>response_);
            } catch (e) {
              return <Observable<any>>(<any>_observableThrow(e));
            }
          } else return <Observable<any>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigSecurityGet(
    response: HttpResponseBase
  ): Observable<any> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update global security settings
   * @return OK
   */
  configSecurityPut(body: any): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/security';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigSecurityPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigSecurityPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigSecurityPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system SMTP settings
   * @return OK
   */
  configSmtpGet(): Observable<ConfigSmtpGetResponse> {
    let url_ = this.baseUrl + '/config/smtp';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigSmtpGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigSmtpGet(<any>response_);
            } catch (e) {
              return <Observable<ConfigSmtpGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<ConfigSmtpGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processConfigSmtpGet(
    response: HttpResponseBase
  ): Observable<ConfigSmtpGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system SMTP settings
   * @return OK
   */
  configSmtpPut(body: ConfigSmtpPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/smtp';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigSmtpPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigSmtpPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigSmtpPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Test SMTP settings
   * @return OK
   */
  configSmtpPost(body: ConfigSmtpPostBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/config/smtp';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processConfigSmtpPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processConfigSmtpPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processConfigSmtpPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class DuplicateObjectsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Retrieve a list of object types, object names, or duplicate objects
   * @param type (optional)
   * @param name (optional)
   * @return OK
   */
  duplicateobjectsGet(
    type?: string | undefined,
    name?: string | undefined
  ): Observable<DuplicateObjectsGetResponse> {
    let url_ = this.baseUrl + '/duplicateobjects?';
    if (type === null) throw new Error("The parameter 'type' cannot be null.");
    else if (type !== undefined)
      url_ += 'type=' + encodeURIComponent('' + type) + '&';
    if (name === null) throw new Error("The parameter 'name' cannot be null.");
    else if (name !== undefined)
      url_ += 'name=' + encodeURIComponent('' + name) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDuplicateobjectsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDuplicateobjectsGet(<any>response_);
            } catch (e) {
              return <Observable<DuplicateObjectsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<DuplicateObjectsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processDuplicateobjectsGet(
    response: HttpResponseBase
  ): Observable<DuplicateObjectsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Delete specified duplicate object
   * @return OK
   */
  duplicateobjectsDelete(type: string, id: string): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/duplicateobjects?';
    if (type === undefined || type === null)
      throw new Error(
        "The parameter 'type' must be defined and cannot be null."
      );
    else url_ += 'type=' + encodeURIComponent('' + type) + '&';
    if (id === undefined || id === null)
      throw new Error("The parameter 'id' must be defined and cannot be null.");
    else url_ += 'id=' + encodeURIComponent('' + id) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processDuplicateobjectsDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processDuplicateobjectsDelete(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processDuplicateobjectsDelete(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class EmailNotificationsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Create new email notification
   * @return OK
   */
  emailnotificationsPost(
    body: EmailnotificationsPostBody
  ): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/emailnotifications';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processEmailnotificationsPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processEmailnotificationsPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processEmailnotificationsPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve a list email notification names, or a single configuration
   * @param name (optional)
   * @return OK
   */
  emailnotificationsGet(
    name?: string | undefined
  ): Observable<EmailnotificationsGetResponse> {
    let url_ = this.baseUrl + '/emailnotifications?';
    if (name === null) throw new Error("The parameter 'name' cannot be null.");
    else if (name !== undefined)
      url_ += 'name=' + encodeURIComponent('' + name) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processEmailnotificationsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processEmailnotificationsGet(<any>response_);
            } catch (e) {
              return <Observable<EmailnotificationsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<EmailnotificationsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processEmailnotificationsGet(
    response: HttpResponseBase
  ): Observable<EmailnotificationsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update specified email notification
   * @return OK
   */
  emailnotificationsPut(
    body: EmailnotificationsPutBody
  ): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/emailnotifications';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processEmailnotificationsPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processEmailnotificationsPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processEmailnotificationsPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Delete specified email notification
   * @return OK
   */
  emailnotificationsDelete(name: string): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/emailnotifications?';
    if (name === undefined || name === null)
      throw new Error(
        "The parameter 'name' must be defined and cannot be null."
      );
    else url_ += 'name=' + encodeURIComponent('' + name) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processEmailnotificationsDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processEmailnotificationsDelete(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processEmailnotificationsDelete(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class FeaturesServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Retrieve feature settings.
   * @return OK
   */
  features(): Observable<FeaturesResponse> {
    let url_ = this.baseUrl + '/features';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFeatures(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFeatures(<any>response_);
            } catch (e) {
              return <Observable<FeaturesResponse>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<FeaturesResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processFeatures(
    response: HttpResponseBase
  ): Observable<FeaturesResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Download feature request file.
   * @return OK
   */
  featuresRequestGet(): Observable<FeaturesRequestGetResponse> {
    let url_ = this.baseUrl + '/features/request';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/*'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFeaturesRequestGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFeaturesRequestGet(<any>response_);
            } catch (e) {
              return <Observable<FeaturesRequestGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<FeaturesRequestGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processFeaturesRequestGet(
    response: HttpResponseBase
  ): Observable<FeaturesRequestGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Upload feature request file.
   * @return OK
   */
  featuresRequestPut(body: Blob): Observable<FeaturesRequestPutResponse> {
    let url_ = this.baseUrl + '/features/request';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = body;

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFeaturesRequestPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFeaturesRequestPut(<any>response_);
            } catch (e) {
              return <Observable<FeaturesRequestPutResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<FeaturesRequestPutResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processFeaturesRequestPut(
    response: HttpResponseBase
  ): Observable<FeaturesRequestPutResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class FunctionsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Retrieve a list of functions
   * @return OK
   */
  functionsGet(): Observable<FunctionsGetResponse> {
    let url_ = this.baseUrl + '/functions';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFunctionsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFunctionsGet(<any>response_);
            } catch (e) {
              return <Observable<FunctionsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<FunctionsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processFunctionsGet(
    response: HttpResponseBase
  ): Observable<FunctionsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update a single, or multiple, function(s)
   * @return OK
   */
  functionsPut(body: FunctionsPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/functions';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFunctionsPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFunctionsPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processFunctionsPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class FxcertcrlsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Upload Futurex certificate CRL
   * @return Created
   */
  fxcertcrlsPost(body: Blob): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/fxcertcrls';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = body;

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFxcertcrlsPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFxcertcrlsPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processFxcertcrlsPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result201: any = null;
          let resultData201 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result201 = ResponseBase.fromJS(resultData201);
          return _observableOf(result201);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve Futurex CRL status
   * @return OK
   */
  fxcertcrlsGet(): Observable<FxcertcrlsGetResponse> {
    let url_ = this.baseUrl + '/fxcertcrls';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFxcertcrlsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFxcertcrlsGet(<any>response_);
            } catch (e) {
              return <Observable<FxcertcrlsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<FxcertcrlsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processFxcertcrlsGet(
    response: HttpResponseBase
  ): Observable<FxcertcrlsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Delete specified Futurex CRL
   * @return OK
   */
  fxcertcrlsDelete(certType: CertType): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/fxcertcrls?';
    if (certType === undefined || certType === null)
      throw new Error(
        "The parameter 'certType' must be defined and cannot be null."
      );
    else url_ += 'certType=' + encodeURIComponent('' + certType) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processFxcertcrlsDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processFxcertcrlsDelete(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processFxcertcrlsDelete(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class JobsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Retrieve a list of current jobs.
   * @return OK
   */
  jobs(): Observable<JobsResponse> {
    let url_ = this.baseUrl + '/jobs';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processJobs(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processJobs(<any>response_);
            } catch (e) {
              return <Observable<JobsResponse>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<JobsResponse>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processJobs(response: HttpResponseBase): Observable<JobsResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class LoginServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Login response
   * @return OK
   */
  login(body: LoginRequest): Observable<LoginResponse> {
    let url_ = this.baseUrl + '/login';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogin(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogin(<any>response_);
            } catch (e) {
              return <Observable<LoginResponse>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<LoginResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processLogin(
    response: HttpResponseBase
  ): Observable<LoginResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class LogoutServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Logout response
   * @return Login Redirect
   */
  logout(): Observable<void> {
    let url_ = this.baseUrl + '/logout';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({})
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogout(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogout(<any>response_);
            } catch (e) {
              return <Observable<void>>(<any>_observableThrow(e));
            }
          } else return <Observable<void>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processLogout(response: HttpResponseBase): Observable<void> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return _observableOf<void>(<any>null);
        })
      );
    }
  }
}
@Injectable()
export class LogsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Retrieve list of filenames, or download specified log file.
   * @param filename (optional)
   * @return OK
   */
  logs(filename?: string | undefined): Observable<LogsResponse> {
    let url_ = this.baseUrl + '/logs?';
    if (filename === null)
      throw new Error("The parameter 'filename' cannot be null.");
    else if (filename !== undefined)
      url_ += 'filename=' + encodeURIComponent('' + filename) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogs(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogs(<any>response_);
            } catch (e) {
              return <Observable<LogsResponse>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<LogsResponse>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processLogs(response: HttpResponseBase): Observable<LogsResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve general log settings
   * @return OK
   */
  logsMiscGet(): Observable<LogsMiscGetResponse> {
    let url_ = this.baseUrl + '/logs/misc';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogsMiscGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogsMiscGet(<any>response_);
            } catch (e) {
              return <Observable<LogsMiscGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<LogsMiscGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processLogsMiscGet(
    response: HttpResponseBase
  ): Observable<LogsMiscGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update general log settings
   * @return OK
   */
  logsMiscPut(body: LogsMiscPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/logs/misc';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogsMiscPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogsMiscPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processLogsMiscPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve log prune settings
   * @return OK
   */
  logsPruneGet(): Observable<LogsPruneGetResponse> {
    let url_ = this.baseUrl + '/logs/prune';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogsPruneGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogsPruneGet(<any>response_);
            } catch (e) {
              return <Observable<LogsPruneGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<LogsPruneGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processLogsPruneGet(
    response: HttpResponseBase
  ): Observable<LogsPruneGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update log prune settings
   * @return OK
   */
  logsPrunePut(body: LogsPrunePutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/logs/prune';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogsPrunePut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogsPrunePut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processLogsPrunePut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve syslog log settings.
   * @return OK
   */
  logsSyslogGet(): Observable<LogsSyslogGetResponse> {
    let url_ = this.baseUrl + '/logs/syslog';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogsSyslogGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogsSyslogGet(<any>response_);
            } catch (e) {
              return <Observable<LogsSyslogGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<LogsSyslogGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processLogsSyslogGet(
    response: HttpResponseBase
  ): Observable<LogsSyslogGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update syslog log settings.
   * @return OK
   */
  logsSyslogPut(body: LogsSyslogPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/logs/syslog';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogsSyslogPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogsSyslogPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processLogsSyslogPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve audit log settings
   * @return OK
   */
  logsAuditGet(): Observable<LogsAuditGetResponse> {
    let url_ = this.baseUrl + '/logs/audit';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogsAuditGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogsAuditGet(<any>response_);
            } catch (e) {
              return <Observable<LogsAuditGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<LogsAuditGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processLogsAuditGet(
    response: HttpResponseBase
  ): Observable<LogsAuditGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update audit log settings
   * @return OK
   */
  logsAuditPut(body: LogsAuditPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/logs/audit';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processLogsAuditPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processLogsAuditPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processLogsAuditPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class PrintersServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Create new printer
   * @return Created
   */
  printersPost(body: PrintersPostBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/printers';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processPrintersPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processPrintersPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processPrintersPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result201: any = null;
          let resultData201 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result201 = ResponseBase.fromJS(resultData201);
          return _observableOf(result201);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ResponseBase>(<any>null);
  }

  /**
   * Retrieve a list of printers, or a specified printer
   * @param name (optional)
   * @return OK
   */
  printersGet(name?: string | undefined): Observable<PrintersGetResponse> {
    let url_ = this.baseUrl + '/printers?';
    if (name === null) throw new Error("The parameter 'name' cannot be null.");
    else if (name !== undefined)
      url_ += 'name=' + encodeURIComponent('' + name) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processPrintersGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processPrintersGet(<any>response_);
            } catch (e) {
              return <Observable<PrintersGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<PrintersGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processPrintersGet(
    response: HttpResponseBase
  ): Observable<PrintersGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<PrintersGetResponse>(<any>null);
  }

  /**
   * Update specified printer configuration
   * @return OK
   */
  printersPut(body: PrintersPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/printers';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processPrintersPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processPrintersPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processPrintersPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ResponseBase>(<any>null);
  }

  /**
   * Delete specified printer
   * @return OK
   */
  printersDelete(name: string): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/printers?';
    if (name === undefined || name === null)
      throw new Error(
        "The parameter 'name' must be defined and cannot be null."
      );
    else url_ += 'name=' + encodeURIComponent('' + name) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processPrintersDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processPrintersDelete(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processPrintersDelete(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ResponseBase>(<any>null);
  }
}
@Injectable()
export class SecurityModesServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Retrieve FIPS security mode status
   * @return OK
   */
  securitymodesFipsGet(): Observable<SecuritymodesFipsGetResponse> {
    let url_ = this.baseUrl + '/securitymodes/fips';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSecuritymodesFipsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSecuritymodesFipsGet(<any>response_);
            } catch (e) {
              return <Observable<SecuritymodesFipsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<SecuritymodesFipsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSecuritymodesFipsGet(
    response: HttpResponseBase
  ): Observable<SecuritymodesFipsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update FIPS security mode status
   * @return OK
   */
  securitymodesFipsPut(
    body: SecuritymodesFipsPutBody
  ): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/securitymodes/fips';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSecuritymodesFipsPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSecuritymodesFipsPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSecuritymodesFipsPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve PCI security mode status
   * @return OK
   */
  securitymodesPciGet(): Observable<SecuritymodesPciGetResponse> {
    let url_ = this.baseUrl + '/securitymodes/pci';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSecuritymodesPciGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSecuritymodesPciGet(<any>response_);
            } catch (e) {
              return <Observable<SecuritymodesPciGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<SecuritymodesPciGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSecuritymodesPciGet(
    response: HttpResponseBase
  ): Observable<SecuritymodesPciGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update PCI security mode status
   * @return OK
   */
  securitymodesPciPut(body: SecuritymodesPciPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/securitymodes/pci';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSecuritymodesPciPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSecuritymodesPciPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSecuritymodesPciPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class SftpEventsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Create a (S)FTP Event
   * @return Created
   */
  sftpeventsPost(body: SftpeventsPostBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/sftpevents';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSftpeventsPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSftpeventsPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSftpeventsPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result201: any = null;
          let resultData201 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result201 = ResponseBase.fromJS(resultData201);
          return _observableOf(result201);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve a list of (S)FTP Events, or a specified (S)FTP Event
   * @param name (optional)
   * @return OK
   */
  sftpeventsGet(name?: string | undefined): Observable<SftpEventsGetResponse> {
    let url_ = this.baseUrl + '/sftpevents?';
    if (name === null) throw new Error("The parameter 'name' cannot be null.");
    else if (name !== undefined)
      url_ += 'name=' + encodeURIComponent('' + name) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSftpeventsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSftpeventsGet(<any>response_);
            } catch (e) {
              return <Observable<SftpEventsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<SftpEventsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSftpeventsGet(
    response: HttpResponseBase
  ): Observable<SftpEventsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update specified (S)FTP Event
   * @return OK
   */
  sftpeventsPut(body: SftpeventsPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/sftpevents';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSftpeventsPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSftpeventsPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSftpeventsPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Delete specified (S)FTP Event
   * @return OK
   */
  sftpeventsDelete(name: string): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/sftpevents?';
    if (name === undefined || name === null)
      throw new Error(
        "The parameter 'name' must be defined and cannot be null."
      );
    else url_ += 'name=' + encodeURIComponent('' + name) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSftpeventsDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSftpeventsDelete(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSftpeventsDelete(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class SystemServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Retrieve server information
   * @return OK
   */
  systemGet(): Observable<SystemGetResponse> {
    let url_ = this.baseUrl + '/system';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemGet(<any>response_);
            } catch (e) {
              return <Observable<SystemGetResponse>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<SystemGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSystemGet(
    response: HttpResponseBase
  ): Observable<SystemGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Upload server ISO
   * @return OK
   */
  systemPut(body: Blob): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/system';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = body;

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSystemPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve system date, time, and timezone settings
   * @return OK
   */
  systemDatetimeGet(): Observable<SystemDatetimeGetResponse> {
    let url_ = this.baseUrl + '/system/datetime';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDatetimeGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDatetimeGet(<any>response_);
            } catch (e) {
              return <Observable<SystemDatetimeGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<SystemDatetimeGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSystemDatetimeGet(
    response: HttpResponseBase
  ): Observable<SystemDatetimeGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update system date, time, and timezone settings
   * @return OK
   */
  systemDatetimePut(body: SystemDatetimePutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/system/datetime';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDatetimePut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDatetimePut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSystemDatetimePut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve current firmware information
   * @return OK
   */
  systemFirmwareGet(): Observable<SystemFirmwareGetResponse> {
    let url_ = this.baseUrl + '/system/firmware';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemFirmwareGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemFirmwareGet(<any>response_);
            } catch (e) {
              return <Observable<SystemFirmwareGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<SystemFirmwareGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSystemFirmwareGet(
    response: HttpResponseBase
  ): Observable<SystemFirmwareGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update firmware
   * @return OK
   */
  systemFirmwarePut(body: Blob): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/system/firmware';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = body;

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemFirmwarePut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemFirmwarePut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSystemFirmwarePut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve database initialization information
   * @return OK
   */
  systemDatabaseGet(): Observable<SystemDatabaseGetResponse> {
    let url_ = this.baseUrl + '/system/database';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDatabaseGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDatabaseGet(<any>response_);
            } catch (e) {
              return <Observable<SystemDatabaseGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<SystemDatabaseGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSystemDatabaseGet(
    response: HttpResponseBase
  ): Observable<SystemDatabaseGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Initialize database
   * @return OK
   */
  systemDatabasePost(body: DBInitialize): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/system/database';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDatabasePost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDatabasePost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSystemDatabasePost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve list of database backups
   * @return OK
   */
  systemDatabaseBackupGet(): Observable<SystemDatabaseBackupGetResponse> {
    let url_ = this.baseUrl + '/system/database/backup';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDatabaseBackupGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDatabaseBackupGet(<any>response_);
            } catch (e) {
              return <Observable<SystemDatabaseBackupGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<SystemDatabaseBackupGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSystemDatabaseBackupGet(
    response: HttpResponseBase
  ): Observable<SystemDatabaseBackupGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Create a new database backup
   * @return OK
   */
  systemDatabaseBackupPost(
    body: SystemDatabaseBackupPostBody
  ): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/system/database/backup';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDatabaseBackupPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDatabaseBackupPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSystemDatabaseBackupPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Restore a specified database backup
   * @return OK
   */
  systemDatabaseBackupPut(
    body: SystemDatabaseBackupPutBody
  ): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/system/database/backup';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDatabaseBackupPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDatabaseBackupPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSystemDatabaseBackupPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve specified disk information
   * @return OK
   */
  systemDiskGet(path: string): Observable<SystemDiskGetResponse> {
    let url_ = this.baseUrl + '/system/disk?';
    if (path === undefined || path === null)
      throw new Error(
        "The parameter 'path' must be defined and cannot be null."
      );
    else url_ += 'path=' + encodeURIComponent('' + path) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDiskGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDiskGet(<any>response_);
            } catch (e) {
              return <Observable<SystemDiskGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<SystemDiskGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSystemDiskGet(
    response: HttpResponseBase
  ): Observable<SystemDiskGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Enable or disable specified disk
   * @return OK
   */
  systemDiskPut(body: SystemDiskPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/system/disk';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemDiskPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemDiskPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processSystemDiskPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve a list of RAID paths, or specific RAID disk information
   * @param path (optional)
   * @return OK
   */
  systemRaid(path?: string | undefined): Observable<SystemRaidResponse> {
    let url_ = this.baseUrl + '/system/raid?';
    if (path === null) throw new Error("The parameter 'path' cannot be null.");
    else if (path !== undefined)
      url_ += 'path=' + encodeURIComponent('' + path) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processSystemRaid(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processSystemRaid(<any>response_);
            } catch (e) {
              return <Observable<SystemRaidResponse>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<SystemRaidResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processSystemRaid(
    response: HttpResponseBase
  ): Observable<SystemRaidResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class TemplatesServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Create new template
   * @return OK
   */
  templatesPost(body: TemplatesPostBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/templates';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processTemplatesPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processTemplatesPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processTemplatesPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve list of template names, or a specified template
   * @param name (optional) Name of the template
   * @param type (optional) Type of the template
   * @return OK
   */
  templatesGet(
    name?: string | undefined,
    type?: Type | undefined
  ): Observable<TemplatesGetResponse> {
    let url_ = this.baseUrl + '/templates?';
    if (name === null) throw new Error("The parameter 'name' cannot be null.");
    else if (name !== undefined)
      url_ += 'name=' + encodeURIComponent('' + name) + '&';
    if (type === null) throw new Error("The parameter 'type' cannot be null.");
    else if (type !== undefined)
      url_ += 'type=' + encodeURIComponent('' + type) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processTemplatesGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processTemplatesGet(<any>response_);
            } catch (e) {
              return <Observable<TemplatesGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<TemplatesGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processTemplatesGet(
    response: HttpResponseBase
  ): Observable<TemplatesGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update template
   * @return OK
   */
  templatesPut(body: TemplatesPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/templates';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processTemplatesPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processTemplatesPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processTemplatesPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Delete a specified template
   * @param name Name of the template
   * @return OK
   */
  templatesDelete(name: string): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/templates?';
    if (name === undefined || name === null)
      throw new Error(
        "The parameter 'name' must be defined and cannot be null."
      );
    else url_ += 'name=' + encodeURIComponent('' + name) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processTemplatesDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processTemplatesDelete(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processTemplatesDelete(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class UserGroupsServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Create new user group
   * @return Created
   */
  usergroupsPost(body: UsergroupsPostBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/usergroups';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUsergroupsPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUsergroupsPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUsergroupsPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result201: any = null;
          let resultData201 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result201 = ResponseBase.fromJS(resultData201);
          return _observableOf(result201);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve a list of available user groups, or a specified user group
   * @param group (optional)
   * @return OK
   */
  usergroupsGet(group?: string | undefined): Observable<UsergroupsGetResponse> {
    let url_ = this.baseUrl + '/usergroups?';
    if (group === null)
      throw new Error("The parameter 'group' cannot be null.");
    else if (group !== undefined)
      url_ += 'group=' + encodeURIComponent('' + group) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUsergroupsGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUsergroupsGet(<any>response_);
            } catch (e) {
              return <Observable<UsergroupsGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<UsergroupsGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processUsergroupsGet(
    response: HttpResponseBase
  ): Observable<UsergroupsGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Move user group
   * @return OK
   */
  usergroupsPut(body: MoveGroup): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/usergroups';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUsergroupsPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUsergroupsPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUsergroupsPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ResponseBase>(<any>null);
  }

  /**
   * Delete specified user group
   * @return OK
   */
  usergroupsDelete(group: string): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/usergroups?';
    if (group === undefined || group === null)
      throw new Error(
        "The parameter 'group' must be defined and cannot be null."
      );
    else url_ += 'group=' + encodeURIComponent('' + group) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUsergroupsDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUsergroupsDelete(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUsergroupsDelete(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ResponseBase>(<any>null);
  }
}
@Injectable()
export class UsersServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Create new user
   * @return Created
   */
  usersPost(body: UsersPostBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/users';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUsersPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUsersPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUsersPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result201: any = null;
          let resultData201 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result201 = ResponseBase.fromJS(resultData201);
          return _observableOf(result201);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Retrieve list of users, or a specified user
   * @param username (optional) Retrieve details of a specific user
   * @param usergroup (optional) Retrieve a filtered list of users based on user group
   * @param page (optional)
   * @param pageCount (optional) Number of items to display per page
   * @return OK
   */
  usersGet(
    username?: string | undefined,
    usergroup?: string | undefined,
    page?: number | undefined,
    pageCount?: number | undefined
  ): Observable<UsersGetResponse> {
    let url_ = this.baseUrl + '/users?';
    if (username === null)
      throw new Error("The parameter 'username' cannot be null.");
    else if (username !== undefined)
      url_ += 'username=' + encodeURIComponent('' + username) + '&';
    if (usergroup === null)
      throw new Error("The parameter 'usergroup' cannot be null.");
    else if (usergroup !== undefined)
      url_ += 'usergroup=' + encodeURIComponent('' + usergroup) + '&';
    if (page === null) throw new Error("The parameter 'page' cannot be null.");
    else if (page !== undefined)
      url_ += 'page=' + encodeURIComponent('' + page) + '&';
    if (pageCount === null)
      throw new Error("The parameter 'pageCount' cannot be null.");
    else if (pageCount !== undefined)
      url_ += 'pageCount=' + encodeURIComponent('' + pageCount) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUsersGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUsersGet(<any>response_);
            } catch (e) {
              return <Observable<UsersGetResponse>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<UsersGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processUsersGet(
    response: HttpResponseBase
  ): Observable<UsersGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Update user, move user group, or change user password
   * @return OK
   */
  usersPut(body: UpdateUser): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/users';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUsersPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUsersPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUsersPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }

  /**
   * Delete specified user
   * @param username (optional)
   * @return OK
   */
  usersDelete(username?: string | undefined): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/users?';
    if (username === null)
      throw new Error("The parameter 'username' cannot be null.");
    else if (username !== undefined)
      url_ += 'username=' + encodeURIComponent('' + username) + '&';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('delete', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processUsersDelete(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processUsersDelete(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processUsersDelete(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let resultdefault: any = null;
          let resultDatadefault =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          resultdefault = ResponseBase.fromJS(resultDatadefault);
          return throwException(
            'Internal Server Error',
            status,
            _responseText,
            _headers,
            resultdefault
          );
        })
      );
    }
  }
}
@Injectable()
export class WebserverServiceProxy {
  private http: HttpClient;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional() @Inject(API_BASE_URL) baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl
      ? baseUrl
      : 'https://virtserver.swaggerhub.com/j2m/KMES-Service-Proxy/1.0.0';
    console.log(this.baseUrl);
  }
  /**
   * Restart web server
   * @return Created
   */
  webserverPost(body: RequestBase): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/webserver';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('post', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processWebserverPost(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processWebserverPost(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processWebserverPost(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 201) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result201: any = null;
          let resultData201 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result201 = ResponseBase.fromJS(resultData201);
          return _observableOf(result201);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ResponseBase>(<any>null);
  }

  /**
   * Retrieve web server settings
   * @return OK
   */
  webserverGet(): Observable<WebserverGetResponse> {
    let url_ = this.baseUrl + '/webserver';
    url_ = url_.replace(/[?&]$/, '');

    let options_: any = {
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    };

    return this.http
      .request('get', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processWebserverGet(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processWebserverGet(<any>response_);
            } catch (e) {
              return <Observable<WebserverGetResponse>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<WebserverGetResponse>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processWebserverGet(
    response: HttpResponseBase
  ): Observable<WebserverGetResponse> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200 !== undefined ? resultData200 : <any>null;
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<WebserverGetResponse>(<any>null);
  }

  /**
   * Update web server settings
   * @return OK
   */
  webserverPut(body: WebserverPutBody): Observable<ResponseBase> {
    let url_ = this.baseUrl + '/webserver';
    url_ = url_.replace(/[?&]$/, '');

    const content_ = JSON.stringify(body);

    let options_: any = {
      body: content_,
      observe: 'response',
      responseType: 'blob',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      })
    };

    return this.http
      .request('put', url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processWebserverPut(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processWebserverPut(<any>response_);
            } catch (e) {
              return <Observable<ResponseBase>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<ResponseBase>>(<any>_observableThrow(response_));
        })
      );
  }

  protected processWebserverPut(
    response: HttpResponseBase
  ): Observable<ResponseBase> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
        ? (<any>response).error
        : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = ResponseBase.fromJS(resultData200);
          return _observableOf(result200);
        })
      );
    } else if (status === 401) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result401: any = null;
          let resultData401 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result401 = ResponseBase.fromJS(resultData401);
          return throwException(
            'Unauthorized',
            status,
            _responseText,
            _headers,
            result401
          );
        })
      );
    } else if (status === 404) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result404: any = null;
          let resultData404 =
            _responseText === ''
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result404 = ResponseBase.fromJS(resultData404);
          return throwException(
            'Resource not found',
            status,
            _responseText,
            _headers,
            result404
          );
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            'An unexpected server error occurred.',
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<ResponseBase>(<any>null);
  }
}

export class RequestBase implements IRequestBase {
  action!: string;
  requestData?: any;

  constructor(data?: IRequestBase) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.action = data['action'];
      this.requestData = data['requestData'];
    }
  }

  static fromJS(data: any): RequestBase {
    data = typeof data === 'object' ? data : {};
    let result = new RequestBase();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['action'] = this.action;
    data['requestData'] = this.requestData;
    return data;
  }
}

export interface IRequestBase {
  action: string;
  requestData?: any;
}

export class ResponseBase implements IResponseBase {
  status!: string;
  message?: string;

  constructor(data?: IResponseBase) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.status = data['status'];
      this.message = data['message'];
    }
  }

  static fromJS(data: any): ResponseBase {
    data = typeof data === 'object' ? data : {};
    let result = new ResponseBase();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['status'] = this.status;
    data['message'] = this.message;
    return data;
  }
}

export interface IResponseBase {
  status: string;
  message?: string;
}

export class PaginationBase implements IPaginationBase {
  totalItems?: number;
  totalPages?: number;
  pageCount?: number;
  currentPage?: number;
  nextPage?: number | undefined;

  constructor(data?: IPaginationBase) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.totalItems = data['totalItems'];
      this.totalPages = data['totalPages'];
      this.pageCount = data['pageCount'];
      this.currentPage = data['currentPage'];
      this.nextPage = data['nextPage'];
    }
  }

  static fromJS(data: any): PaginationBase {
    data = typeof data === 'object' ? data : {};
    let result = new PaginationBase();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['totalItems'] = this.totalItems;
    data['totalPages'] = this.totalPages;
    data['pageCount'] = this.pageCount;
    data['currentPage'] = this.currentPage;
    data['nextPage'] = this.nextPage;
    return data;
  }
}

export interface IPaginationBase {
  totalItems?: number;
  totalPages?: number;
  pageCount?: number;
  currentPage?: number;
  nextPage?: number | undefined;
}

export class ThresholdEvents implements IThresholdEvents {
  target?: number;
  period?: number;

  constructor(data?: IThresholdEvents) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.target = data['target'];
      this.period = data['period'];
    }
  }

  static fromJS(data: any): ThresholdEvents {
    data = typeof data === 'object' ? data : {};
    let result = new ThresholdEvents();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['target'] = this.target;
    data['period'] = this.period;
    return data;
  }
}

export interface IThresholdEvents {
  target?: number;
  period?: number;
}

export class SharedExportValues implements ISharedExportValues {
  frequency!: number;
  runOn!: RunOn[];
  fileName!: string;
  includeHash!: boolean;
  appendDate!: boolean;

  constructor(data?: ISharedExportValues) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.runOn = [];
    }
  }

  init(data?: any) {
    if (data) {
      this.frequency = data['frequency'];
      if (Array.isArray(data['runOn'])) {
        this.runOn = [] as any;
        for (let item of data['runOn']) this.runOn!.push(item);
      }
      this.fileName = data['fileName'];
      this.includeHash = data['includeHash'];
      this.appendDate = data['appendDate'];
    }
  }

  static fromJS(data: any): SharedExportValues {
    data = typeof data === 'object' ? data : {};
    let result = new SharedExportValues();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['frequency'] = this.frequency;
    if (Array.isArray(this.runOn)) {
      data['runOn'] = [];
      for (let item of this.runOn) data['runOn'].push(item);
    }
    data['fileName'] = this.fileName;
    data['includeHash'] = this.includeHash;
    data['appendDate'] = this.appendDate;
    return data;
  }
}

export interface ISharedExportValues {
  frequency: number;
  runOn: RunOn[];
  fileName: string;
  includeHash: boolean;
  appendDate: boolean;
}

export class LogExportEvents extends SharedExportValues
  implements ILogExportEvents {
  startDate!: string;
  endDate!: string;
  format!: LogExportEventsFormat;
  includeHeader!: boolean;

  constructor(data?: ILogExportEvents) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.startDate = data['startDate'];
      this.endDate = data['endDate'];
      this.format = data['format'];
      this.includeHeader = data['includeHeader'];
    }
  }

  static fromJS(data: any): LogExportEvents {
    data = typeof data === 'object' ? data : {};
    let result = new LogExportEvents();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['format'] = this.format;
    data['includeHeader'] = this.includeHeader;
    super.toJSON(data);
    return data;
  }
}

export interface ILogExportEvents extends ISharedExportValues {
  startDate: string;
  endDate: string;
  format: LogExportEventsFormat;
  includeHeader: boolean;
}

export class KeyExportEvents extends SharedExportValues
  implements IKeyExportEvents {
  format?: KeyExportEventsFormat;
  includeHeader?: boolean;
  keyLength?: number;
  hostname?: string;
  compressFile?: boolean;

  constructor(data?: IKeyExportEvents) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.format = data['format'];
      this.includeHeader = data['includeHeader'];
      this.keyLength = data['keyLength'];
      this.hostname = data['hostname'];
      this.compressFile = data['compressFile'];
    }
  }

  static fromJS(data: any): KeyExportEvents {
    data = typeof data === 'object' ? data : {};
    let result = new KeyExportEvents();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['format'] = this.format;
    data['includeHeader'] = this.includeHeader;
    data['keyLength'] = this.keyLength;
    data['hostname'] = this.hostname;
    data['compressFile'] = this.compressFile;
    super.toJSON(data);
    return data;
  }
}

export interface IKeyExportEvents extends ISharedExportValues {
  format?: KeyExportEventsFormat;
  includeHeader?: boolean;
  keyLength?: number;
  hostname?: string;
  compressFile?: boolean;
}

export class ATMEvents implements IATMEvents {
  atmBind?: boolean;
  atmUnbind?: boolean;
  atmKeyInjection?: boolean;
  atmRegistered?: boolean;
  atmSuccess?: boolean;
  atmFail?: boolean;

  constructor(data?: IATMEvents) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.atmBind = data['atmBind'];
      this.atmUnbind = data['atmUnbind'];
      this.atmKeyInjection = data['atmKeyInjection'];
      this.atmRegistered = data['atmRegistered'];
      this.atmSuccess = data['atmSuccess'];
      this.atmFail = data['atmFail'];
    }
  }

  static fromJS(data: any): ATMEvents {
    data = typeof data === 'object' ? data : {};
    let result = new ATMEvents();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['atmBind'] = this.atmBind;
    data['atmUnbind'] = this.atmUnbind;
    data['atmKeyInjection'] = this.atmKeyInjection;
    data['atmRegistered'] = this.atmRegistered;
    data['atmSuccess'] = this.atmSuccess;
    data['atmFail'] = this.atmFail;
    return data;
  }
}

export interface IATMEvents {
  atmBind?: boolean;
  atmUnbind?: boolean;
  atmKeyInjection?: boolean;
  atmRegistered?: boolean;
  atmSuccess?: boolean;
  atmFail?: boolean;
}

export class KSNEvents implements IKSNEvents {
  ksnAlmostDepleted?: boolean;
  ksnDepleted?: boolean;
  keyAlmostExpired?: boolean;
  keyExpired?: boolean;
  keyUnexpired?: boolean;

  constructor(data?: IKSNEvents) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.ksnAlmostDepleted = data['ksnAlmostDepleted'];
      this.ksnDepleted = data['ksnDepleted'];
      this.keyAlmostExpired = data['keyAlmostExpired'];
      this.keyExpired = data['keyExpired'];
      this.keyUnexpired = data['keyUnexpired'];
    }
  }

  static fromJS(data: any): KSNEvents {
    data = typeof data === 'object' ? data : {};
    let result = new KSNEvents();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['ksnAlmostDepleted'] = this.ksnAlmostDepleted;
    data['ksnDepleted'] = this.ksnDepleted;
    data['keyAlmostExpired'] = this.keyAlmostExpired;
    data['keyExpired'] = this.keyExpired;
    data['keyUnexpired'] = this.keyUnexpired;
    return data;
  }
}

export interface IKSNEvents {
  ksnAlmostDepleted?: boolean;
  ksnDepleted?: boolean;
  keyAlmostExpired?: boolean;
  keyExpired?: boolean;
  keyUnexpired?: boolean;
}

export class X509Events implements IX509Events {
  certAlmostExpired?: boolean;
  certExpired?: boolean;

  constructor(data?: IX509Events) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.certAlmostExpired = data['certAlmostExpired'];
      this.certExpired = data['certExpired'];
    }
  }

  static fromJS(data: any): X509Events {
    data = typeof data === 'object' ? data : {};
    let result = new X509Events();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['certAlmostExpired'] = this.certAlmostExpired;
    data['certExpired'] = this.certExpired;
    return data;
  }
}

export interface IX509Events {
  certAlmostExpired?: boolean;
  certExpired?: boolean;
}

export class AutoBackup implements IAutoBackup {
  frequency?: string;
  enabled?: boolean;
  printers?: boolean;
  cards?: boolean;
  sshKeys?: boolean;

  constructor(data?: IAutoBackup) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.frequency = data['frequency'];
      this.enabled = data['enabled'];
      this.printers = data['printers'];
      this.cards = data['cards'];
      this.sshKeys = data['sshKeys'];
    }
  }

  static fromJS(data: any): AutoBackup {
    data = typeof data === 'object' ? data : {};
    let result = new AutoBackup();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['frequency'] = this.frequency;
    data['enabled'] = this.enabled;
    data['printers'] = this.printers;
    data['cards'] = this.cards;
    data['sshKeys'] = this.sshKeys;
    return data;
  }
}

export interface IAutoBackup {
  frequency?: string;
  enabled?: boolean;
  printers?: boolean;
  cards?: boolean;
  sshKeys?: boolean;
}

export class CertSettings implements ICertSettings {
  pkiCacheSize?: number;
  allowDuplicateNames?: boolean;
  appendRandom64Bit?: boolean;
  allowInvalidCerts?: boolean;
  expireNotification?: number;

  constructor(data?: ICertSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.pkiCacheSize = data['pkiCacheSize'];
      this.allowDuplicateNames = data['allowDuplicateNames'];
      this.appendRandom64Bit = data['appendRandom64Bit'];
      this.allowInvalidCerts = data['allowInvalidCerts'];
      this.expireNotification = data['expireNotification'];
    }
  }

  static fromJS(data: any): CertSettings {
    data = typeof data === 'object' ? data : {};
    let result = new CertSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['pkiCacheSize'] = this.pkiCacheSize;
    data['allowDuplicateNames'] = this.allowDuplicateNames;
    data['appendRandom64Bit'] = this.appendRandom64Bit;
    data['allowInvalidCerts'] = this.allowInvalidCerts;
    data['expireNotification'] = this.expireNotification;
    return data;
  }
}

export interface ICertSettings {
  pkiCacheSize?: number;
  allowDuplicateNames?: boolean;
  appendRandom64Bit?: boolean;
  allowInvalidCerts?: boolean;
  expireNotification?: number;
}

export class FtpSettings implements IFtpSettings {
  ipAddress?: string;
  port?: string;
  timeout?: number;
  mode?: FtpSettingsMode;
  authUsername?: string;
  authPassword?: string;

  constructor(data?: IFtpSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.ipAddress = data['ipAddress'];
      this.port = data['port'];
      this.timeout = data['timeout'];
      this.mode = data['mode'];
      this.authUsername = data['authUsername'];
      this.authPassword = data['authPassword'];
    }
  }

  static fromJS(data: any): FtpSettings {
    data = typeof data === 'object' ? data : {};
    let result = new FtpSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['ipAddress'] = this.ipAddress;
    data['port'] = this.port;
    data['timeout'] = this.timeout;
    data['mode'] = this.mode;
    data['authUsername'] = this.authUsername;
    data['authPassword'] = this.authPassword;
    return data;
  }
}

export interface IFtpSettings {
  ipAddress?: string;
  port?: string;
  timeout?: number;
  mode?: FtpSettingsMode;
  authUsername?: string;
  authPassword?: string;
}

export class KMIPSettings implements IKMIPSettings {
  symmetricFormat?: KMIPSettingsSymmetricFormat;
  rsaFormat?: KMIPSettingsRsaFormat;
  includeIndexes?: boolean;
  deleteContainer?: boolean;
  timestampFilter?: TimestampFilter;
  arrivalFilter?: ArrivalFilter;

  constructor(data?: IKMIPSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.timestampFilter =
        data.timestampFilter && !(<any>data.timestampFilter).toJSON
          ? new TimestampFilter(data.timestampFilter)
          : <TimestampFilter>this.timestampFilter;
      this.arrivalFilter =
        data.arrivalFilter && !(<any>data.arrivalFilter).toJSON
          ? new ArrivalFilter(data.arrivalFilter)
          : <ArrivalFilter>this.arrivalFilter;
    }
  }

  init(data?: any) {
    if (data) {
      this.symmetricFormat = data['symmetricFormat'];
      this.rsaFormat = data['rsaFormat'];
      this.includeIndexes = data['includeIndexes'];
      this.deleteContainer = data['deleteContainer'];
      this.timestampFilter = data['timestampFilter']
        ? TimestampFilter.fromJS(data['timestampFilter'])
        : <any>undefined;
      this.arrivalFilter = data['arrivalFilter']
        ? ArrivalFilter.fromJS(data['arrivalFilter'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): KMIPSettings {
    data = typeof data === 'object' ? data : {};
    let result = new KMIPSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['symmetricFormat'] = this.symmetricFormat;
    data['rsaFormat'] = this.rsaFormat;
    data['includeIndexes'] = this.includeIndexes;
    data['deleteContainer'] = this.deleteContainer;
    data['timestampFilter'] = this.timestampFilter
      ? this.timestampFilter.toJSON()
      : <any>undefined;
    data['arrivalFilter'] = this.arrivalFilter
      ? this.arrivalFilter.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IKMIPSettings {
  symmetricFormat?: KMIPSettingsSymmetricFormat;
  rsaFormat?: KMIPSettingsRsaFormat;
  includeIndexes?: boolean;
  deleteContainer?: boolean;
  timestampFilter?: ITimestampFilter;
  arrivalFilter?: IArrivalFilter;
}

export class LDAPConfig implements ILDAPConfig {
  scheme?: LDAPConfigScheme;
  hostname?: string;
  version?: number;
  adminUserBind?: string;
  adminPassBind?: string;
  failoverServers?: string[];
  userBase?: string;
  usernameAttr?: string;
  userPassAttr?: string;
  checkGroupPerms?: boolean;
  groupPerms?: GroupPerms;
  authType?: LDAPConfigAuthType;

  constructor(data?: ILDAPConfig) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.groupPerms =
        data.groupPerms && !(<any>data.groupPerms).toJSON
          ? new GroupPerms(data.groupPerms)
          : <GroupPerms>this.groupPerms;
    }
  }

  init(data?: any) {
    if (data) {
      this.scheme = data['scheme'];
      this.hostname = data['hostname'];
      this.version = data['version'];
      this.adminUserBind = data['adminUserBind'];
      this.adminPassBind = data['adminPassBind'];
      if (Array.isArray(data['failoverServers'])) {
        this.failoverServers = [] as any;
        for (let item of data['failoverServers'])
          this.failoverServers!.push(item);
      }
      this.userBase = data['userBase'];
      this.usernameAttr = data['usernameAttr'];
      this.userPassAttr = data['userPassAttr'];
      this.checkGroupPerms = data['checkGroupPerms'];
      this.groupPerms = data['groupPerms']
        ? GroupPerms.fromJS(data['groupPerms'])
        : <any>undefined;
      this.authType = data['authType'];
    }
  }

  static fromJS(data: any): LDAPConfig {
    data = typeof data === 'object' ? data : {};
    let result = new LDAPConfig();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['scheme'] = this.scheme;
    data['hostname'] = this.hostname;
    data['version'] = this.version;
    data['adminUserBind'] = this.adminUserBind;
    data['adminPassBind'] = this.adminPassBind;
    if (Array.isArray(this.failoverServers)) {
      data['failoverServers'] = [];
      for (let item of this.failoverServers) data['failoverServers'].push(item);
    }
    data['userBase'] = this.userBase;
    data['usernameAttr'] = this.usernameAttr;
    data['userPassAttr'] = this.userPassAttr;
    data['checkGroupPerms'] = this.checkGroupPerms;
    data['groupPerms'] = this.groupPerms
      ? this.groupPerms.toJSON()
      : <any>undefined;
    data['authType'] = this.authType;
    return data;
  }
}

export interface ILDAPConfig {
  scheme?: LDAPConfigScheme;
  hostname?: string;
  version?: number;
  adminUserBind?: string;
  adminPassBind?: string;
  failoverServers?: string[];
  userBase?: string;
  usernameAttr?: string;
  userPassAttr?: string;
  checkGroupPerms?: boolean;
  groupPerms?: IGroupPerms;
  authType?: LDAPConfigAuthType;
}

export class LDAPTest extends LDAPConfig implements ILDAPTest {
  username?: string;

  constructor(data?: ILDAPTest) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.username = data['username'];
    }
  }

  static fromJS(data: any): LDAPTest {
    data = typeof data === 'object' ? data : {};
    let result = new LDAPTest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['username'] = this.username;
    super.toJSON(data);
    return data;
  }
}

export interface ILDAPTest extends ILDAPConfig {
  username?: string;
}

export class Ping implements IPing {
  endpoint?: string;

  constructor(data?: IPing) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.endpoint = data['endpoint'];
    }
  }

  static fromJS(data: any): Ping {
    data = typeof data === 'object' ? data : {};
    let result = new Ping();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['endpoint'] = this.endpoint;
    return data;
  }
}

export interface IPing {
  endpoint?: string;
}

export class NetworkSettings implements INetworkSettings {
  hostname?: string;
  primaryDns?: string;
  secondaryDns?: string;
  tertiaryDns?: string;
  maxConnections?: number;
  writeTimeout?: number;
  peeringSize?: number;
  enableKeepalive?: boolean;
  keepaliveTime?: number;
  keepaliveProbes?: number;
  keepaliveInterface?: number;

  constructor(data?: INetworkSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.hostname = data['hostname'];
      this.primaryDns = data['primaryDns'];
      this.secondaryDns = data['secondaryDns'];
      this.tertiaryDns = data['tertiaryDns'];
      this.maxConnections = data['maxConnections'];
      this.writeTimeout = data['writeTimeout'];
      this.peeringSize = data['peeringSize'];
      this.enableKeepalive = data['enableKeepalive'];
      this.keepaliveTime = data['keepaliveTime'];
      this.keepaliveProbes = data['keepaliveProbes'];
      this.keepaliveInterface = data['keepaliveInterface'];
    }
  }

  static fromJS(data: any): NetworkSettings {
    data = typeof data === 'object' ? data : {};
    let result = new NetworkSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['hostname'] = this.hostname;
    data['primaryDns'] = this.primaryDns;
    data['secondaryDns'] = this.secondaryDns;
    data['tertiaryDns'] = this.tertiaryDns;
    data['maxConnections'] = this.maxConnections;
    data['writeTimeout'] = this.writeTimeout;
    data['peeringSize'] = this.peeringSize;
    data['enableKeepalive'] = this.enableKeepalive;
    data['keepaliveTime'] = this.keepaliveTime;
    data['keepaliveProbes'] = this.keepaliveProbes;
    data['keepaliveInterface'] = this.keepaliveInterface;
    return data;
  }
}

export interface INetworkSettings {
  hostname?: string;
  primaryDns?: string;
  secondaryDns?: string;
  tertiaryDns?: string;
  maxConnections?: number;
  writeTimeout?: number;
  peeringSize?: number;
  enableKeepalive?: boolean;
  keepaliveTime?: number;
  keepaliveProbes?: number;
  keepaliveInterface?: number;
}

export class NtpSettings implements INtpSettings {
  enabled?: boolean;
  syncOnStartup?: boolean;
  host?: string;

  constructor(data?: INtpSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.enabled = data['enabled'];
      this.syncOnStartup = data['syncOnStartup'];
      this.host = data['host'];
    }
  }

  static fromJS(data: any): NtpSettings {
    data = typeof data === 'object' ? data : {};
    let result = new NtpSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['enabled'] = this.enabled;
    data['syncOnStartup'] = this.syncOnStartup;
    data['host'] = this.host;
    return data;
  }
}

export interface INtpSettings {
  enabled?: boolean;
  syncOnStartup?: boolean;
  host?: string;
}

export class OcspSettings implements IOcspSettings {
  requireSignature?: boolean;
  requestCertTree?: string;
  requestCertName?: string;
  signResponse?: boolean;
  responseSigner?: OcspSettingsResponseSigner;
  responseCertTree?: string;
  responseCertName?: string;
  responseCertHash?: OcspSettingsResponseCertHash;
  includeCerts?: boolean;
  responseIdType?: OcspSettingsResponseIdType;
  requireNonce?: boolean;

  constructor(data?: IOcspSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.requireSignature = data['requireSignature'];
      this.requestCertTree = data['requestCertTree'];
      this.requestCertName = data['requestCertName'];
      this.signResponse = data['signResponse'];
      this.responseSigner = data['responseSigner'];
      this.responseCertTree = data['responseCertTree'];
      this.responseCertName = data['responseCertName'];
      this.responseCertHash = data['responseCertHash'];
      this.includeCerts = data['includeCerts'];
      this.responseIdType = data['responseIdType'];
      this.requireNonce = data['requireNonce'];
    }
  }

  static fromJS(data: any): OcspSettings {
    data = typeof data === 'object' ? data : {};
    let result = new OcspSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requireSignature'] = this.requireSignature;
    data['requestCertTree'] = this.requestCertTree;
    data['requestCertName'] = this.requestCertName;
    data['signResponse'] = this.signResponse;
    data['responseSigner'] = this.responseSigner;
    data['responseCertTree'] = this.responseCertTree;
    data['responseCertName'] = this.responseCertName;
    data['responseCertHash'] = this.responseCertHash;
    data['includeCerts'] = this.includeCerts;
    data['responseIdType'] = this.responseIdType;
    data['requireNonce'] = this.requireNonce;
    return data;
  }
}

export interface IOcspSettings {
  requireSignature?: boolean;
  requestCertTree?: string;
  requestCertName?: string;
  signResponse?: boolean;
  responseSigner?: OcspSettingsResponseSigner;
  responseCertTree?: string;
  responseCertName?: string;
  responseCertHash?: OcspSettingsResponseCertHash;
  includeCerts?: boolean;
  responseIdType?: OcspSettingsResponseIdType;
  requireNonce?: boolean;
}

export class Passwords implements IPasswords {
  maxAttempts?: number;
  lockPeriod?: string;
  passHistory?: number;
  historyPeriod?: string;
  expiration?: string;

  constructor(data?: IPasswords) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.maxAttempts = data['maxAttempts'];
      this.lockPeriod = data['lockPeriod'];
      this.passHistory = data['passHistory'];
      this.historyPeriod = data['historyPeriod'];
      this.expiration = data['expiration'];
    }
  }

  static fromJS(data: any): Passwords {
    data = typeof data === 'object' ? data : {};
    let result = new Passwords();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['maxAttempts'] = this.maxAttempts;
    data['lockPeriod'] = this.lockPeriod;
    data['passHistory'] = this.passHistory;
    data['historyPeriod'] = this.historyPeriod;
    data['expiration'] = this.expiration;
    return data;
  }
}

export interface IPasswords {
  maxAttempts?: number;
  lockPeriod?: string;
  passHistory?: number;
  historyPeriod?: string;
  expiration?: string;
}

export class GetPermissions implements IGetPermissions {
  permissions?: Permissions2[];

  constructor(data?: IGetPermissions) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      if (data.permissions) {
        this.permissions = [];
        for (let i = 0; i < data.permissions.length; i++) {
          let item = data.permissions[i];
          this.permissions[i] =
            item && !(<any>item).toJSON
              ? new Permissions2(item)
              : <Permissions2>item;
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['permissions'])) {
        this.permissions = [] as any;
        for (let item of data['permissions'])
          this.permissions!.push(Permissions2.fromJS(item));
      }
    }
  }

  static fromJS(data: any): GetPermissions {
    data = typeof data === 'object' ? data : {};
    let result = new GetPermissions();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.permissions)) {
      data['permissions'] = [];
      for (let item of this.permissions)
        data['permissions'].push(item.toJSON());
    }
    return data;
  }
}

export interface IGetPermissions {
  permissions?: IPermissions2[];
}

export class SetPermissions implements ISetPermissions {
  permissions!: Permissions3[];

  constructor(data?: ISetPermissions) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      if (data.permissions) {
        this.permissions = [];
        for (let i = 0; i < data.permissions.length; i++) {
          let item = data.permissions[i];
          this.permissions[i] =
            item && !(<any>item).toJSON
              ? new Permissions3(item)
              : <Permissions3>item;
        }
      }
    }
    if (!data) {
      this.permissions = [];
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['permissions'])) {
        this.permissions = [] as any;
        for (let item of data['permissions'])
          this.permissions!.push(Permissions3.fromJS(item));
      }
    }
  }

  static fromJS(data: any): SetPermissions {
    data = typeof data === 'object' ? data : {};
    let result = new SetPermissions();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.permissions)) {
      data['permissions'] = [];
      for (let item of this.permissions)
        data['permissions'].push(item.toJSON());
    }
    return data;
  }
}

export interface ISetPermissions {
  permissions: IPermissions3[];
}

export class RegauthSettings implements IRegauthSettings {
  allowAnonymous?: boolean;
  approvalType?: RegauthSettingsApprovalType;
  anonymousWcce?: boolean;
  wccePolicy?: string;

  constructor(data?: IRegauthSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.allowAnonymous = data['allowAnonymous'];
      this.approvalType = data['approvalType'];
      this.anonymousWcce = data['anonymousWcce'];
      this.wccePolicy = data['wccePolicy'];
    }
  }

  static fromJS(data: any): RegauthSettings {
    data = typeof data === 'object' ? data : {};
    let result = new RegauthSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['allowAnonymous'] = this.allowAnonymous;
    data['approvalType'] = this.approvalType;
    data['anonymousWcce'] = this.anonymousWcce;
    data['wccePolicy'] = this.wccePolicy;
    return data;
  }
}

export interface IRegauthSettings {
  allowAnonymous?: boolean;
  approvalType?: RegauthSettingsApprovalType;
  anonymousWcce?: boolean;
  wccePolicy?: string;
}

export class SmtpSettings implements ISmtpSettings {
  ipAddress?: string;
  port?: string;
  senderEmail?: string;
  enableAuth?: boolean;
  authUsername?: string;
  authPassword?: string;
  enableTls?: boolean;

  constructor(data?: ISmtpSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.ipAddress = data['ipAddress'];
      this.port = data['port'];
      this.senderEmail = data['senderEmail'];
      this.enableAuth = data['enableAuth'];
      this.authUsername = data['authUsername'];
      this.authPassword = data['authPassword'];
      this.enableTls = data['enableTls'];
    }
  }

  static fromJS(data: any): SmtpSettings {
    data = typeof data === 'object' ? data : {};
    let result = new SmtpSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['ipAddress'] = this.ipAddress;
    data['port'] = this.port;
    data['senderEmail'] = this.senderEmail;
    data['enableAuth'] = this.enableAuth;
    data['authUsername'] = this.authUsername;
    data['authPassword'] = this.authPassword;
    data['enableTls'] = this.enableTls;
    return data;
  }
}

export interface ISmtpSettings {
  ipAddress?: string;
  port?: string;
  senderEmail?: string;
  enableAuth?: boolean;
  authUsername?: string;
  authPassword?: string;
  enableTls?: boolean;
}

export class DuplicateObject implements IDuplicateObject {
  id?: string;
  type?: string;
  domain?: string;
  parent?: string;
  container?: string;
  loadTime?: string;
  lastModified?: string;
  owner?: string;

  constructor(data?: IDuplicateObject) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.id = data['id'];
      this.type = data['type'];
      this.domain = data['domain'];
      this.parent = data['parent'];
      this.container = data['container'];
      this.loadTime = data['loadTime'];
      this.lastModified = data['lastModified'];
      this.owner = data['owner'];
    }
  }

  static fromJS(data: any): DuplicateObject {
    data = typeof data === 'object' ? data : {};
    let result = new DuplicateObject();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['id'] = this.id;
    data['type'] = this.type;
    data['domain'] = this.domain;
    data['parent'] = this.parent;
    data['container'] = this.container;
    data['loadTime'] = this.loadTime;
    data['lastModified'] = this.lastModified;
    data['owner'] = this.owner;
    return data;
  }
}

export interface IDuplicateObject {
  id?: string;
  type?: string;
  domain?: string;
  parent?: string;
  container?: string;
  loadTime?: string;
  lastModified?: string;
  owner?: string;
}

export class ListObjectTypes implements IListObjectTypes {
  objectTypes!: string[];

  constructor(data?: IListObjectTypes) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.objectTypes = [];
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['objectTypes'])) {
        this.objectTypes = [] as any;
        for (let item of data['objectTypes']) this.objectTypes!.push(item);
      }
    }
  }

  static fromJS(data: any): ListObjectTypes {
    data = typeof data === 'object' ? data : {};
    let result = new ListObjectTypes();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.objectTypes)) {
      data['objectTypes'] = [];
      for (let item of this.objectTypes) data['objectTypes'].push(item);
    }
    return data;
  }
}

export interface IListObjectTypes {
  objectTypes: string[];
}

export class ListObjectNames implements IListObjectNames {
  objectNames!: string[];

  constructor(data?: IListObjectNames) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.objectNames = [];
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['objectNames'])) {
        this.objectNames = [] as any;
        for (let item of data['objectNames']) this.objectNames!.push(item);
      }
    }
  }

  static fromJS(data: any): ListObjectNames {
    data = typeof data === 'object' ? data : {};
    let result = new ListObjectNames();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.objectNames)) {
      data['objectNames'] = [];
      for (let item of this.objectNames) data['objectNames'].push(item);
    }
    return data;
  }
}

export interface IListObjectNames {
  objectNames: string[];
}

export class GetDuplicateObjects implements IGetDuplicateObjects {
  duplicates?: DuplicateObject[];

  constructor(data?: IGetDuplicateObjects) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      if (data.duplicates) {
        this.duplicates = [];
        for (let i = 0; i < data.duplicates.length; i++) {
          let item = data.duplicates[i];
          this.duplicates[i] =
            item && !(<any>item).toJSON
              ? new DuplicateObject(item)
              : <DuplicateObject>item;
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['duplicates'])) {
        this.duplicates = [] as any;
        for (let item of data['duplicates'])
          this.duplicates!.push(DuplicateObject.fromJS(item));
      }
    }
  }

  static fromJS(data: any): GetDuplicateObjects {
    data = typeof data === 'object' ? data : {};
    let result = new GetDuplicateObjects();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.duplicates)) {
      data['duplicates'] = [];
      for (let item of this.duplicates) data['duplicates'].push(item.toJSON());
    }
    return data;
  }
}

export interface IGetDuplicateObjects {
  duplicates?: IDuplicateObject[];
}

export class EmailList implements IEmailList {
  names!: string[];

  constructor(data?: IEmailList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.names = [];
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['names'])) {
        this.names = [] as any;
        for (let item of data['names']) this.names!.push(item);
      }
    }
  }

  static fromJS(data: any): EmailList {
    data = typeof data === 'object' ? data : {};
    let result = new EmailList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.names)) {
      data['names'] = [];
      for (let item of this.names) data['names'].push(item);
    }
    return data;
  }
}

export interface IEmailList {
  names: string[];
}

export class SmtpEvent implements ISmtpEvent {
  name!: string;
  enabled!: boolean;
  sendTo!: string;
  subject!: string;
  template!: string;
  events!: Events;

  constructor(data?: ISmtpEvent) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.events =
        data.events && !(<any>data.events).toJSON
          ? new Events(data.events)
          : <Events>this.events;
    }
  }

  init(data?: any) {
    if (data) {
      this.name = data['name'];
      this.enabled = data['enabled'];
      this.sendTo = data['sendTo'];
      this.subject = data['subject'];
      this.template = data['template'];
      this.events = data['events'];
    }
  }

  static fromJS(data: any): SmtpEvent {
    data = typeof data === 'object' ? data : {};
    let result = new SmtpEvent();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['enabled'] = this.enabled;
    data['sendTo'] = this.sendTo;
    data['subject'] = this.subject;
    data['template'] = this.template;
    data['events'] = this.events;
    return data;
  }
}

export interface ISmtpEvent {
  name: string;
  enabled: boolean;
  sendTo: string;
  subject: string;
  template: string;
  events: IEvents;
}

export class FeatureListItems implements IFeatureListItems {
  [key: string]: string | any;

  constructor(data?: IFeatureListItems) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }

  static fromJS(data: any): FeatureListItems {
    data = typeof data === 'object' ? data : {};
    let result = new FeatureListItems();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    for (var property in this) {
      if (this.hasOwnProperty(property)) data[property] = this[property];
    }
    return data;
  }
}

export interface IFeatureListItems {
  [key: string]: string | any;
}

export class FeatureList implements IFeatureList {
  features?: Features;

  constructor(data?: IFeatureList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.features =
        data.features && !(<any>data.features).toJSON
          ? new Features(data.features)
          : <Features>this.features;
    }
  }

  init(data?: any) {
    if (data) {
      this.features = data['features']
        ? Features.fromJS(data['features'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): FeatureList {
    data = typeof data === 'object' ? data : {};
    let result = new FeatureList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['features'] = this.features ? this.features.toJSON() : <any>undefined;
    return data;
  }
}

export interface IFeatureList {
  features?: IFeatures;
}

export class FeatureRequest implements IFeatureRequest {
  featureRequest?: string;

  constructor(data?: IFeatureRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.featureRequest = data['featureRequest'];
    }
  }

  static fromJS(data: any): FeatureRequest {
    data = typeof data === 'object' ? data : {};
    let result = new FeatureRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['featureRequest'] = this.featureRequest;
    return data;
  }
}

export interface IFeatureRequest {
  featureRequest?: string;
}

export class FunctionObject implements IFunctionObject {
  name?: string;
  enabled?: boolean;
  description?: string;

  constructor(data?: IFunctionObject) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.name = data['name'];
      this.enabled = data['enabled'];
      this.description = data['description'];
    }
  }

  static fromJS(data: any): FunctionObject {
    data = typeof data === 'object' ? data : {};
    let result = new FunctionObject();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['enabled'] = this.enabled;
    data['description'] = this.description;
    return data;
  }
}

export interface IFunctionObject {
  name?: string;
  enabled?: boolean;
  description?: string;
}

export class FunctionList implements IFunctionList {
  functions?: FunctionObject[];

  constructor(data?: IFunctionList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      if (data.functions) {
        this.functions = [];
        for (let i = 0; i < data.functions.length; i++) {
          let item = data.functions[i];
          this.functions[i] =
            item && !(<any>item).toJSON
              ? new FunctionObject(item)
              : <FunctionObject>item;
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['functions'])) {
        this.functions = [] as any;
        for (let item of data['functions'])
          this.functions!.push(FunctionObject.fromJS(item));
      }
    }
  }

  static fromJS(data: any): FunctionList {
    data = typeof data === 'object' ? data : {};
    let result = new FunctionList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.functions)) {
      data['functions'] = [];
      for (let item of this.functions) data['functions'].push(item.toJSON());
    }
    return data;
  }
}

export interface IFunctionList {
  functions?: IFunctionObject[];
}

export class CrlUpload implements ICrlUpload {
  type?: CrlUploadType;
  crlUpload?: string;

  constructor(data?: ICrlUpload) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.type = data['type'];
      this.crlUpload = data['crlUpload'];
    }
  }

  static fromJS(data: any): CrlUpload {
    data = typeof data === 'object' ? data : {};
    let result = new CrlUpload();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['type'] = this.type;
    data['crlUpload'] = this.crlUpload;
    return data;
  }
}

export interface ICrlUpload {
  type?: CrlUploadType;
  crlUpload?: string;
}

export class CrlDetails implements ICrlDetails {
  productionCrls?: boolean;
  adminCrls?: boolean;

  constructor(data?: ICrlDetails) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.productionCrls = data['productionCrls'];
      this.adminCrls = data['adminCrls'];
    }
  }

  static fromJS(data: any): CrlDetails {
    data = typeof data === 'object' ? data : {};
    let result = new CrlDetails();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['productionCrls'] = this.productionCrls;
    data['adminCrls'] = this.adminCrls;
    return data;
  }
}

export interface ICrlDetails {
  productionCrls?: boolean;
  adminCrls?: boolean;
}

export class Job implements IJob {
  jobid?: string;
  status?: string;
  summary?: string;
  created?: number;
  started?: number;

  constructor(data?: IJob) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.jobid = data['jobid'];
      this.status = data['status'];
      this.summary = data['summary'];
      this.created = data['created'];
      this.started = data['started'];
    }
  }

  static fromJS(data: any): Job {
    data = typeof data === 'object' ? data : {};
    let result = new Job();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['jobid'] = this.jobid;
    data['status'] = this.status;
    data['summary'] = this.summary;
    data['created'] = this.created;
    data['started'] = this.started;
    return data;
  }
}

export interface IJob {
  jobid?: string;
  status?: string;
  summary?: string;
  created?: number;
  started?: number;
}

export class LoginRequest implements ILoginRequest {
  authType?: string;
  authCredentials?: AuthCredentials;

  constructor(data?: ILoginRequest) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.authCredentials =
        data.authCredentials && !(<any>data.authCredentials).toJSON
          ? new AuthCredentials(data.authCredentials)
          : <AuthCredentials>this.authCredentials;
    }
  }

  init(data?: any) {
    if (data) {
      this.authType = data['authType'];
      this.authCredentials = data['authCredentials']
        ? AuthCredentials.fromJS(data['authCredentials'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LoginRequest {
    data = typeof data === 'object' ? data : {};
    let result = new LoginRequest();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['authType'] = this.authType;
    data['authCredentials'] = this.authCredentials
      ? this.authCredentials.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface ILoginRequest {
  authType?: string;
  authCredentials?: IAuthCredentials;
}

export class LoginCount implements ILoginCount {
  totalLoggedIn?: number;
  totalRequired?: number;

  constructor(data?: ILoginCount) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.totalLoggedIn = data['totalLoggedIn'];
      this.totalRequired = data['totalRequired'];
    }
  }

  static fromJS(data: any): LoginCount {
    data = typeof data === 'object' ? data : {};
    let result = new LoginCount();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['totalLoggedIn'] = this.totalLoggedIn;
    data['totalRequired'] = this.totalRequired;
    return data;
  }
}

export interface ILoginCount {
  totalLoggedIn?: number;
  totalRequired?: number;
}

export class LoginExpiry implements ILoginExpiry {
  passwordExpired?: boolean;

  constructor(data?: ILoginExpiry) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.passwordExpired = data['passwordExpired'];
    }
  }

  static fromJS(data: any): LoginExpiry {
    data = typeof data === 'object' ? data : {};
    let result = new LoginExpiry();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['passwordExpired'] = this.passwordExpired;
    return data;
  }
}

export interface ILoginExpiry {
  passwordExpired?: boolean;
}

export class LoginUsers implements ILoginUsers {
  loggedInUsers?: string[];

  constructor(data?: ILoginUsers) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['loggedInUsers'])) {
        this.loggedInUsers = [] as any;
        for (let item of data['loggedInUsers']) this.loggedInUsers!.push(item);
      }
    }
  }

  static fromJS(data: any): LoginUsers {
    data = typeof data === 'object' ? data : {};
    let result = new LoginUsers();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.loggedInUsers)) {
      data['loggedInUsers'] = [];
      for (let item of this.loggedInUsers) data['loggedInUsers'].push(item);
    }
    return data;
  }
}

export interface ILoginUsers {
  loggedInUsers?: string[];
}

export class LogFileList implements ILogFileList {
  serverLogs!: string[];
  clientLogs!: string[];
  cardLogs!: string[];
  webLogs!: string[];
  systemLog!: string;

  constructor(data?: ILogFileList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.serverLogs = [];
      this.clientLogs = [];
      this.cardLogs = [];
      this.webLogs = [];
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['serverLogs'])) {
        this.serverLogs = [] as any;
        for (let item of data['serverLogs']) this.serverLogs!.push(item);
      }
      if (Array.isArray(data['clientLogs'])) {
        this.clientLogs = [] as any;
        for (let item of data['clientLogs']) this.clientLogs!.push(item);
      }
      if (Array.isArray(data['cardLogs'])) {
        this.cardLogs = [] as any;
        for (let item of data['cardLogs']) this.cardLogs!.push(item);
      }
      if (Array.isArray(data['webLogs'])) {
        this.webLogs = [] as any;
        for (let item of data['webLogs']) this.webLogs!.push(item);
      }
      this.systemLog = data['systemLog'];
    }
  }

  static fromJS(data: any): LogFileList {
    data = typeof data === 'object' ? data : {};
    let result = new LogFileList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.serverLogs)) {
      data['serverLogs'] = [];
      for (let item of this.serverLogs) data['serverLogs'].push(item);
    }
    if (Array.isArray(this.clientLogs)) {
      data['clientLogs'] = [];
      for (let item of this.clientLogs) data['clientLogs'].push(item);
    }
    if (Array.isArray(this.cardLogs)) {
      data['cardLogs'] = [];
      for (let item of this.cardLogs) data['cardLogs'].push(item);
    }
    if (Array.isArray(this.webLogs)) {
      data['webLogs'] = [];
      for (let item of this.webLogs) data['webLogs'].push(item);
    }
    data['systemLog'] = this.systemLog;
    return data;
  }
}

export interface ILogFileList {
  serverLogs: string[];
  clientLogs: string[];
  cardLogs: string[];
  webLogs: string[];
  systemLog: string;
}

export class LogFile implements ILogFile {
  logFile?: string;

  constructor(data?: ILogFile) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.logFile = data['logFile'];
    }
  }

  static fromJS(data: any): LogFile {
    data = typeof data === 'object' ? data : {};
    let result = new LogFile();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['logFile'] = this.logFile;
    return data;
  }
}

export interface ILogFile {
  logFile?: string;
}

export class MiscConfig implements IMiscConfig {
  rkedAuditLogs?: boolean;
  saveFirmwareLogs?: boolean;

  constructor(data?: IMiscConfig) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.rkedAuditLogs = data['rkedAuditLogs'];
      this.saveFirmwareLogs = data['saveFirmwareLogs'];
    }
  }

  static fromJS(data: any): MiscConfig {
    data = typeof data === 'object' ? data : {};
    let result = new MiscConfig();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['rkedAuditLogs'] = this.rkedAuditLogs;
    data['saveFirmwareLogs'] = this.saveFirmwareLogs;
    return data;
  }
}

export interface IMiscConfig {
  rkedAuditLogs?: boolean;
  saveFirmwareLogs?: boolean;
}

export class PruneConfig implements IPruneConfig {
  maxArchives?: number;
  maxLogRotationSize?: number;

  constructor(data?: IPruneConfig) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.maxArchives = data['maxArchives'];
      this.maxLogRotationSize = data['maxLogRotationSize'];
    }
  }

  static fromJS(data: any): PruneConfig {
    data = typeof data === 'object' ? data : {};
    let result = new PruneConfig();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['maxArchives'] = this.maxArchives;
    data['maxLogRotationSize'] = this.maxLogRotationSize;
    return data;
  }
}

export interface IPruneConfig {
  maxArchives?: number;
  maxLogRotationSize?: number;
}

export class SyslogConfig implements ISyslogConfig {
  enabled?: boolean;
  firmwareLogs?: boolean;
  firmwareLogLevel?: SyslogConfigFirmwareLogLevel;
  clientLogs?: boolean;
  serverLogs?: boolean;
  webLogs?: boolean;
  serverAddresses?: ServerAddresses[];

  constructor(data?: ISyslogConfig) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      if (data.serverAddresses) {
        this.serverAddresses = [];
        for (let i = 0; i < data.serverAddresses.length; i++) {
          let item = data.serverAddresses[i];
          this.serverAddresses[i] =
            item && !(<any>item).toJSON
              ? new ServerAddresses(item)
              : <ServerAddresses>item;
        }
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.enabled = data['enabled'];
      this.firmwareLogs = data['firmwareLogs'];
      this.firmwareLogLevel = data['firmwareLogLevel'];
      this.clientLogs = data['clientLogs'];
      this.serverLogs = data['serverLogs'];
      this.webLogs = data['webLogs'];
      if (Array.isArray(data['serverAddresses'])) {
        this.serverAddresses = [] as any;
        for (let item of data['serverAddresses'])
          this.serverAddresses!.push(ServerAddresses.fromJS(item));
      }
    }
  }

  static fromJS(data: any): SyslogConfig {
    data = typeof data === 'object' ? data : {};
    let result = new SyslogConfig();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['enabled'] = this.enabled;
    data['firmwareLogs'] = this.firmwareLogs;
    data['firmwareLogLevel'] = this.firmwareLogLevel;
    data['clientLogs'] = this.clientLogs;
    data['serverLogs'] = this.serverLogs;
    data['webLogs'] = this.webLogs;
    if (Array.isArray(this.serverAddresses)) {
      data['serverAddresses'] = [];
      for (let item of this.serverAddresses)
        data['serverAddresses'].push(item.toJSON());
    }
    return data;
  }
}

export interface ISyslogConfig {
  enabled?: boolean;
  firmwareLogs?: boolean;
  firmwareLogLevel?: SyslogConfigFirmwareLogLevel;
  clientLogs?: boolean;
  serverLogs?: boolean;
  webLogs?: boolean;
  serverAddresses?: IServerAddresses[];
}

export class AuditConfig implements IAuditConfig {
  prune?: boolean;
  maxAuditLogs?: number;
  pruneFilter?: any;

  constructor(data?: IAuditConfig) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.prune = data['prune'];
      this.maxAuditLogs = data['maxAuditLogs'];
      this.pruneFilter = data['pruneFilter'];
    }
  }

  static fromJS(data: any): AuditConfig {
    data = typeof data === 'object' ? data : {};
    let result = new AuditConfig();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['prune'] = this.prune;
    data['maxAuditLogs'] = this.maxAuditLogs;
    data['pruneFilter'] = this.pruneFilter;
    return data;
  }
}

export interface IAuditConfig {
  prune?: boolean;
  maxAuditLogs?: number;
  pruneFilter?: any;
}

export class Printer implements IPrinter {
  name?: string;
  hostAddress?: string;
  port?: number;
  description?: string;
  location?: string;
  driver?: PrinterDriver;

  constructor(data?: IPrinter) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.name = data['name'];
      this.hostAddress = data['hostAddress'];
      this.port = data['port'];
      this.description = data['description'];
      this.location = data['location'];
      this.driver = data['driver'];
    }
  }

  static fromJS(data: any): Printer {
    data = typeof data === 'object' ? data : {};
    let result = new Printer();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['hostAddress'] = this.hostAddress;
    data['port'] = this.port;
    data['description'] = this.description;
    data['location'] = this.location;
    data['driver'] = this.driver;
    return data;
  }
}

export interface IPrinter {
  name?: string;
  hostAddress?: string;
  port?: number;
  description?: string;
  location?: string;
  driver?: PrinterDriver;
}

export class PrinterList implements IPrinterList {
  installed?: string[];
  available?: string[];

  constructor(data?: IPrinterList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['installed'])) {
        this.installed = [] as any;
        for (let item of data['installed']) this.installed!.push(item);
      }
      if (Array.isArray(data['available'])) {
        this.available = [] as any;
        for (let item of data['available']) this.available!.push(item);
      }
    }
  }

  static fromJS(data: any): PrinterList {
    data = typeof data === 'object' ? data : {};
    let result = new PrinterList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.installed)) {
      data['installed'] = [];
      for (let item of this.installed) data['installed'].push(item);
    }
    if (Array.isArray(this.available)) {
      data['available'] = [];
      for (let item of this.available) data['available'].push(item);
    }
    return data;
  }
}

export interface IPrinterList {
  installed?: string[];
  available?: string[];
}

export class StatusObject implements IStatusObject {
  enabled!: boolean;

  constructor(data?: IStatusObject) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.enabled = data['enabled'];
    }
  }

  static fromJS(data: any): StatusObject {
    data = typeof data === 'object' ? data : {};
    let result = new StatusObject();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['enabled'] = this.enabled;
    return data;
  }
}

export interface IStatusObject {
  enabled: boolean;
}

export class KeyExport extends SharedExportValues implements IKeyExport {
  format?: KeyExportFormat;
  includeHeader?: boolean;
  keyLength?: number;
  hostname?: string;
  compressFile?: boolean;

  constructor(data?: IKeyExport) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.format = data['format'];
      this.includeHeader = data['includeHeader'];
      this.keyLength = data['keyLength'];
      this.hostname = data['hostname'];
      this.compressFile = data['compressFile'];
    }
  }

  static fromJS(data: any): KeyExport {
    data = typeof data === 'object' ? data : {};
    let result = new KeyExport();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['format'] = this.format;
    data['includeHeader'] = this.includeHeader;
    data['keyLength'] = this.keyLength;
    data['hostname'] = this.hostname;
    data['compressFile'] = this.compressFile;
    super.toJSON(data);
    return data;
  }
}

export interface IKeyExport extends ISharedExportValues {
  format?: KeyExportFormat;
  includeHeader?: boolean;
  keyLength?: number;
  hostname?: string;
  compressFile?: boolean;
}

export class LogExport extends SharedExportValues implements ILogExport {
  startDate!: string;
  endDate!: string;
  format!: LogExportFormat;
  includeHeader!: boolean;

  constructor(data?: ILogExport) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.startDate = data['startDate'];
      this.endDate = data['endDate'];
      this.format = data['format'];
      this.includeHeader = data['includeHeader'];
    }
  }

  static fromJS(data: any): LogExport {
    data = typeof data === 'object' ? data : {};
    let result = new LogExport();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['format'] = this.format;
    data['includeHeader'] = this.includeHeader;
    super.toJSON(data);
    return data;
  }
}

export interface ILogExport extends ISharedExportValues {
  startDate: string;
  endDate: string;
  format: LogExportFormat;
  includeHeader: boolean;
}

export class SftpList implements ISftpList {
  names?: string[];

  constructor(data?: ISftpList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['names'])) {
        this.names = [] as any;
        for (let item of data['names']) this.names!.push(item);
      }
    }
  }

  static fromJS(data: any): SftpList {
    data = typeof data === 'object' ? data : {};
    let result = new SftpList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.names)) {
      data['names'] = [];
      for (let item of this.names) data['names'].push(item);
    }
    return data;
  }
}

export interface ISftpList {
  names?: string[];
}

export class SftpEvent implements ISftpEvent {
  name!: string;
  enabled!: boolean;
  events!: Events2;

  constructor(data?: ISftpEvent) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.events =
        data.events && !(<any>data.events).toJSON
          ? new Events2(data.events)
          : <Events2>this.events;
    }
    if (!data) {
      this.events = new Events2();
    }
  }

  init(data?: any) {
    if (data) {
      this.name = data['name'];
      this.enabled = data['enabled'];
      this.events = data['events']
        ? Events2.fromJS(data['events'])
        : new Events2();
    }
  }

  static fromJS(data: any): SftpEvent {
    data = typeof data === 'object' ? data : {};
    let result = new SftpEvent();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['enabled'] = this.enabled;
    data['events'] = this.events ? this.events.toJSON() : <any>undefined;
    return data;
  }
}

export interface ISftpEvent {
  name: string;
  enabled: boolean;
  events: IEvents2;
}

export class ServerInfo implements IServerInfo {
  product!: string;
  version!: string;
  serialNumber!: string;

  constructor(data?: IServerInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.product = data['product'];
      this.version = data['version'];
      this.serialNumber = data['serialNumber'];
    }
  }

  static fromJS(data: any): ServerInfo {
    data = typeof data === 'object' ? data : {};
    let result = new ServerInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['product'] = this.product;
    data['version'] = this.version;
    data['serialNumber'] = this.serialNumber;
    return data;
  }
}

export interface IServerInfo {
  product: string;
  version: string;
  serialNumber: string;
}

export class ServerUpdate implements IServerUpdate {
  file!: string;

  constructor(data?: IServerUpdate) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.file = data['file'];
    }
  }

  static fromJS(data: any): ServerUpdate {
    data = typeof data === 'object' ? data : {};
    let result = new ServerUpdate();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['file'] = this.file;
    return data;
  }
}

export interface IServerUpdate {
  file: string;
}

export class SystemDateTime implements ISystemDateTime {
  utcDateTime?: Date;
  timezone?: string;

  constructor(data?: ISystemDateTime) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.utcDateTime = data['utcDateTime']
        ? new Date(data['utcDateTime'].toString())
        : <any>undefined;
      this.timezone = data['timezone'];
    }
  }

  static fromJS(data: any): SystemDateTime {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDateTime();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['utcDateTime'] = this.utcDateTime
      ? this.utcDateTime.toISOString()
      : <any>undefined;
    data['timezone'] = this.timezone;
    return data;
  }
}

export interface ISystemDateTime {
  utcDateTime?: Date;
  timezone?: string;
}

export class FirmwareInfo implements IFirmwareInfo {
  version!: string;

  constructor(data?: IFirmwareInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.version = data['version'];
    }
  }

  static fromJS(data: any): FirmwareInfo {
    data = typeof data === 'object' ? data : {};
    let result = new FirmwareInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['version'] = this.version;
    return data;
  }
}

export interface IFirmwareInfo {
  version: string;
}

export class FirmwareUpload implements IFirmwareUpload {
  file!: string;

  constructor(data?: IFirmwareUpload) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.file = data['file'];
    }
  }

  static fromJS(data: any): FirmwareUpload {
    data = typeof data === 'object' ? data : {};
    let result = new FirmwareUpload();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['file'] = this.file;
    return data;
  }
}

export interface IFirmwareUpload {
  file: string;
}

export class DBInfo implements IDBInfo {
  dateCreated?: Date;
  lastRestore?: Date;
  lastBackup?: Date;

  constructor(data?: IDBInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.dateCreated = data['dateCreated']
        ? new Date(data['dateCreated'].toString())
        : <any>undefined;
      this.lastRestore = data['lastRestore']
        ? new Date(data['lastRestore'].toString())
        : <any>undefined;
      this.lastBackup = data['lastBackup']
        ? new Date(data['lastBackup'].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): DBInfo {
    data = typeof data === 'object' ? data : {};
    let result = new DBInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['dateCreated'] = this.dateCreated
      ? this.dateCreated.toISOString()
      : <any>undefined;
    data['lastRestore'] = this.lastRestore
      ? this.lastRestore.toISOString()
      : <any>undefined;
    data['lastBackup'] = this.lastBackup
      ? this.lastBackup.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface IDBInfo {
  dateCreated?: Date;
  lastRestore?: Date;
  lastBackup?: Date;
}

export class DBInitialize implements IDBInitialize {
  action?: string;

  constructor(data?: IDBInitialize) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.action = data['action'];
    }
  }

  static fromJS(data: any): DBInitialize {
    data = typeof data === 'object' ? data : {};
    let result = new DBInitialize();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['action'] = this.action;
    return data;
  }
}

export interface IDBInitialize {
  action?: string;
}

export class DBBackup implements IDBBackup {
  savePrinters!: boolean;
  saveCards!: boolean;
  saveSshKeys!: boolean;

  constructor(data?: IDBBackup) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.savePrinters = data['savePrinters'];
      this.saveCards = data['saveCards'];
      this.saveSshKeys = data['saveSshKeys'];
    }
  }

  static fromJS(data: any): DBBackup {
    data = typeof data === 'object' ? data : {};
    let result = new DBBackup();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['savePrinters'] = this.savePrinters;
    data['saveCards'] = this.saveCards;
    data['saveSshKeys'] = this.saveSshKeys;
    return data;
  }
}

export interface IDBBackup {
  savePrinters: boolean;
  saveCards: boolean;
  saveSshKeys: boolean;
}

export class DBBackupList implements IDBBackupList {
  backups!: string[];

  constructor(data?: IDBBackupList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.backups = [];
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['backups'])) {
        this.backups = [] as any;
        for (let item of data['backups']) this.backups!.push(item);
      }
    }
  }

  static fromJS(data: any): DBBackupList {
    data = typeof data === 'object' ? data : {};
    let result = new DBBackupList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.backups)) {
      data['backups'] = [];
      for (let item of this.backups) data['backups'].push(item);
    }
    return data;
  }
}

export interface IDBBackupList {
  backups: string[];
}

export class DBBackupRestore implements IDBBackupRestore {
  filename?: string;

  constructor(data?: IDBBackupRestore) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.filename = data['filename'];
    }
  }

  static fromJS(data: any): DBBackupRestore {
    data = typeof data === 'object' ? data : {};
    let result = new DBBackupRestore();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['filename'] = this.filename;
    return data;
  }
}

export interface IDBBackupRestore {
  filename?: string;
}

export class DiskInfo implements IDiskInfo {
  detected?: boolean;
  hasRaid?: boolean;
  hasUdevLink?: boolean;
  smartErrors?: boolean;
  name?: string;
  link?: string;
  model?: string;
  byteSize?: number;
  familyModel?: string;
  deviceModel?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  ataVersion?: string;
  byteCapacity?: number;
  attributes?: { [key: string]: any };

  constructor(data?: IDiskInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.detected = data['detected'];
      this.hasRaid = data['hasRaid'];
      this.hasUdevLink = data['hasUdevLink'];
      this.smartErrors = data['smartErrors'];
      this.name = data['name'];
      this.link = data['link'];
      this.model = data['model'];
      this.byteSize = data['byteSize'];
      this.familyModel = data['familyModel'];
      this.deviceModel = data['deviceModel'];
      this.serialNumber = data['serialNumber'];
      this.firmwareVersion = data['firmwareVersion'];
      this.ataVersion = data['ataVersion'];
      this.byteCapacity = data['byteCapacity'];
      if (data['attributes']) {
        this.attributes = {} as any;
        for (let key in data['attributes']) {
          if (data['attributes'].hasOwnProperty(key))
            this.attributes![key] = data['attributes'][key];
        }
      }
    }
  }

  static fromJS(data: any): DiskInfo {
    data = typeof data === 'object' ? data : {};
    let result = new DiskInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['detected'] = this.detected;
    data['hasRaid'] = this.hasRaid;
    data['hasUdevLink'] = this.hasUdevLink;
    data['smartErrors'] = this.smartErrors;
    data['name'] = this.name;
    data['link'] = this.link;
    data['model'] = this.model;
    data['byteSize'] = this.byteSize;
    data['familyModel'] = this.familyModel;
    data['deviceModel'] = this.deviceModel;
    data['serialNumber'] = this.serialNumber;
    data['firmwareVersion'] = this.firmwareVersion;
    data['ataVersion'] = this.ataVersion;
    data['byteCapacity'] = this.byteCapacity;
    if (this.attributes) {
      data['attributes'] = {};
      for (let key in this.attributes) {
        if (this.attributes.hasOwnProperty(key))
          data['attributes'][key] = this.attributes[key];
      }
    }
    return data;
  }
}

export interface IDiskInfo {
  detected?: boolean;
  hasRaid?: boolean;
  hasUdevLink?: boolean;
  smartErrors?: boolean;
  name?: string;
  link?: string;
  model?: string;
  byteSize?: number;
  familyModel?: string;
  deviceModel?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  ataVersion?: string;
  byteCapacity?: number;
  attributes?: { [key: string]: any };
}

export class DiskRaidStatus implements IDiskRaidStatus {
  path?: string;
  raidEnabled?: boolean;

  constructor(data?: IDiskRaidStatus) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.path = data['path'];
      this.raidEnabled = data['raidEnabled'];
    }
  }

  static fromJS(data: any): DiskRaidStatus {
    data = typeof data === 'object' ? data : {};
    let result = new DiskRaidStatus();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['path'] = this.path;
    data['raidEnabled'] = this.raidEnabled;
    return data;
  }
}

export interface IDiskRaidStatus {
  path?: string;
  raidEnabled?: boolean;
}

export class RaidList implements IRaidList {
  raidPaths?: string[];

  constructor(data?: IRaidList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['raidPaths'])) {
        this.raidPaths = [] as any;
        for (let item of data['raidPaths']) this.raidPaths!.push(item);
      }
    }
  }

  static fromJS(data: any): RaidList {
    data = typeof data === 'object' ? data : {};
    let result = new RaidList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.raidPaths)) {
      data['raidPaths'] = [];
      for (let item of this.raidPaths) data['raidPaths'].push(item);
    }
    return data;
  }
}

export interface IRaidList {
  raidPaths?: string[];
}

export class RaidDetails implements IRaidDetails {
  devicePath?: string;
  raidLevel?: string;
  failed?: boolean;
  delayed?: boolean;
  totalDisks?: number;
  failedDisks?: number;
  raidRebuildPercent?: number;
  raidRebuildTime?: number;
  buildSpeed?: number;
  mounted?: boolean;
  totalSpace?: number;
  availableSpace?: number;

  constructor(data?: IRaidDetails) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.devicePath = data['devicePath'];
      this.raidLevel = data['raidLevel'];
      this.failed = data['failed'];
      this.delayed = data['delayed'];
      this.totalDisks = data['totalDisks'];
      this.failedDisks = data['failedDisks'];
      this.raidRebuildPercent = data['raidRebuildPercent'];
      this.raidRebuildTime = data['raidRebuildTime'];
      this.buildSpeed = data['buildSpeed'];
      this.mounted = data['mounted'];
      this.totalSpace = data['totalSpace'];
      this.availableSpace = data['availableSpace'];
    }
  }

  static fromJS(data: any): RaidDetails {
    data = typeof data === 'object' ? data : {};
    let result = new RaidDetails();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['devicePath'] = this.devicePath;
    data['raidLevel'] = this.raidLevel;
    data['failed'] = this.failed;
    data['delayed'] = this.delayed;
    data['totalDisks'] = this.totalDisks;
    data['failedDisks'] = this.failedDisks;
    data['raidRebuildPercent'] = this.raidRebuildPercent;
    data['raidRebuildTime'] = this.raidRebuildTime;
    data['buildSpeed'] = this.buildSpeed;
    data['mounted'] = this.mounted;
    data['totalSpace'] = this.totalSpace;
    data['availableSpace'] = this.availableSpace;
    return data;
  }
}

export interface IRaidDetails {
  devicePath?: string;
  raidLevel?: string;
  failed?: boolean;
  delayed?: boolean;
  totalDisks?: number;
  failedDisks?: number;
  raidRebuildPercent?: number;
  raidRebuildTime?: number;
  buildSpeed?: number;
  mounted?: boolean;
  totalSpace?: number;
  availableSpace?: number;
}

export class Template implements ITemplate {
  name?: string;
  type?: TemplateType;
  numColumns?: number;
  numRows?: number;
  template?: string;
  template2?: string;
  template3?: string;

  constructor(data?: ITemplate) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.name = data['name'];
      this.type = data['type'];
      this.numColumns = data['numColumns'];
      this.numRows = data['numRows'];
      this.template = data['template'];
      this.template2 = data['template2'];
      this.template3 = data['template3'];
    }
  }

  static fromJS(data: any): Template {
    data = typeof data === 'object' ? data : {};
    let result = new Template();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['type'] = this.type;
    data['numColumns'] = this.numColumns;
    data['numRows'] = this.numRows;
    data['template'] = this.template;
    data['template2'] = this.template2;
    data['template3'] = this.template3;
    return data;
  }
}

export interface ITemplate {
  name?: string;
  type?: TemplateType;
  numColumns?: number;
  numRows?: number;
  template?: string;
  template2?: string;
  template3?: string;
}

export class UpdateTemplate extends Template implements IUpdateTemplate {
  newName?: string;

  constructor(data?: IUpdateTemplate) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.newName = data['newName'];
    }
  }

  static fromJS(data: any): UpdateTemplate {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateTemplate();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['newName'] = this.newName;
    super.toJSON(data);
    return data;
  }
}

export interface IUpdateTemplate extends ITemplate {
  newName?: string;
}

export class TemplateList implements ITemplateList {
  names?: string[];

  constructor(data?: ITemplateList) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['names'])) {
        this.names = [] as any;
        for (let item of data['names']) this.names!.push(item);
      }
    }
  }

  static fromJS(data: any): TemplateList {
    data = typeof data === 'object' ? data : {};
    let result = new TemplateList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.names)) {
      data['names'] = [];
      for (let item of this.names) data['names'].push(item);
    }
    return data;
  }
}

export interface ITemplateList {
  names?: string[];
}

export class UserGroup implements IUserGroup {
  name!: string;
  parentGroup!: string;
  permissions?: Permissions;
  passPolicy?: PasswordPolicy;
  loginsRequired?: number;
  userLocation?: UserGroupUserLocation;
  ldapVerify?: boolean;
  ldapGroup?: string;
  oauthSettings?: OAuthSettings;
  otpSettings?: OTPSettings;

  constructor(data?: IUserGroup) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.permissions =
        data.permissions && !(<any>data.permissions).toJSON
          ? new Permissions(data.permissions)
          : <Permissions>this.permissions;
      this.passPolicy =
        data.passPolicy && !(<any>data.passPolicy).toJSON
          ? new PasswordPolicy(data.passPolicy)
          : <PasswordPolicy>this.passPolicy;
      this.oauthSettings =
        data.oauthSettings && !(<any>data.oauthSettings).toJSON
          ? new OAuthSettings(data.oauthSettings)
          : <OAuthSettings>this.oauthSettings;
      this.otpSettings =
        data.otpSettings && !(<any>data.otpSettings).toJSON
          ? new OTPSettings(data.otpSettings)
          : <OTPSettings>this.otpSettings;
    }
    if (!data) {
      this.ldapVerify = false;
    }
  }

  init(data?: any) {
    if (data) {
      this.name = data['name'];
      this.parentGroup = data['parentGroup'];
      this.permissions = data['permissions']
        ? Permissions.fromJS(data['permissions'])
        : <any>undefined;
      this.passPolicy = data['passPolicy']
        ? PasswordPolicy.fromJS(data['passPolicy'])
        : <any>undefined;
      this.loginsRequired = data['loginsRequired'];
      this.userLocation = data['userLocation'];
      this.ldapVerify =
        data['ldapVerify'] !== undefined ? data['ldapVerify'] : false;
      this.ldapGroup = data['ldapGroup'];
      this.oauthSettings = data['oauthSettings']
        ? OAuthSettings.fromJS(data['oauthSettings'])
        : <any>undefined;
      this.otpSettings = data['otpSettings']
        ? OTPSettings.fromJS(data['otpSettings'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UserGroup {
    data = typeof data === 'object' ? data : {};
    let result = new UserGroup();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['name'] = this.name;
    data['parentGroup'] = this.parentGroup;
    data['permissions'] = this.permissions
      ? this.permissions.toJSON()
      : <any>undefined;
    data['passPolicy'] = this.passPolicy
      ? this.passPolicy.toJSON()
      : <any>undefined;
    data['loginsRequired'] = this.loginsRequired;
    data['userLocation'] = this.userLocation;
    data['ldapVerify'] = this.ldapVerify;
    data['ldapGroup'] = this.ldapGroup;
    data['oauthSettings'] = this.oauthSettings
      ? this.oauthSettings.toJSON()
      : <any>undefined;
    data['otpSettings'] = this.otpSettings
      ? this.otpSettings.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IUserGroup {
  name: string;
  parentGroup: string;
  permissions?: IPermissions;
  passPolicy?: IPasswordPolicy;
  loginsRequired?: number;
  userLocation?: UserGroupUserLocation;
  ldapVerify?: boolean;
  ldapGroup?: string;
  oauthSettings?: IOAuthSettings;
  otpSettings?: IOTPSettings;
}

export class MoveGroup extends RequestBase implements IMoveGroup {
  requestData!: RequestData;

  constructor(data?: IMoveGroup) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RequestData(data.requestData)
          : <RequestData>this.requestData;
    }
    if (!data) {
      this.requestData = new RequestData();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? RequestData.fromJS(data['requestData'])
        : new RequestData();
    }
  }

  static fromJS(data: any): MoveGroup {
    data = typeof data === 'object' ? data : {};
    let result = new MoveGroup();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IMoveGroup extends IRequestBase {
  requestData: IRequestData;
}

export class UpdateGroup extends RequestBase implements IUpdateGroup {
  requestData!: RequestData2;

  constructor(data?: IUpdateGroup) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RequestData2(data.requestData)
          : <RequestData2>this.requestData;
    }
    if (!data) {
      this.requestData = new RequestData2();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? RequestData2.fromJS(data['requestData'])
        : new RequestData2();
    }
  }

  static fromJS(data: any): UpdateGroup {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateGroup();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IUpdateGroup extends IRequestBase {
  requestData: IRequestData2;
}

export class OAuthSettings implements IOAuthSettings {
  enabled?: boolean;
  tokenLifetime?: number;
  clientId?: string;
  macKeyName?: string;

  constructor(data?: IOAuthSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.enabled = data['enabled'];
      this.tokenLifetime = data['tokenLifetime'];
      this.clientId = data['clientId'];
      this.macKeyName = data['macKeyName'];
    }
  }

  static fromJS(data: any): OAuthSettings {
    data = typeof data === 'object' ? data : {};
    let result = new OAuthSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['enabled'] = this.enabled;
    data['tokenLifetime'] = this.tokenLifetime;
    data['clientId'] = this.clientId;
    data['macKeyName'] = this.macKeyName;
    return data;
  }
}

export interface IOAuthSettings {
  enabled?: boolean;
  tokenLifetime?: number;
  clientId?: string;
  macKeyName?: string;
}

export class OTPSettings implements IOTPSettings {
  required?: boolean;
  portList?: PortList[];
  timeout?: number;

  constructor(data?: IOTPSettings) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.required = data['required'];
      if (Array.isArray(data['portList'])) {
        this.portList = [] as any;
        for (let item of data['portList']) this.portList!.push(item);
      }
      this.timeout = data['timeout'];
    }
  }

  static fromJS(data: any): OTPSettings {
    data = typeof data === 'object' ? data : {};
    let result = new OTPSettings();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['required'] = this.required;
    if (Array.isArray(this.portList)) {
      data['portList'] = [];
      for (let item of this.portList) data['portList'].push(item);
    }
    data['timeout'] = this.timeout;
    return data;
  }
}

export interface IOTPSettings {
  required?: boolean;
  portList?: PortList[];
  timeout?: number;
}

export class PasswordPolicy implements IPasswordPolicy {
  length?: MinMax;
  alphabetical?: MinMax;
  uppercase?: MinMax;
  lowercase?: MinMax;
  numeric?: MinMax;
  symbols?: MinMax;

  constructor(data?: IPasswordPolicy) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.length =
        data.length && !(<any>data.length).toJSON
          ? new MinMax(data.length)
          : <MinMax>this.length;
      this.alphabetical =
        data.alphabetical && !(<any>data.alphabetical).toJSON
          ? new MinMax(data.alphabetical)
          : <MinMax>this.alphabetical;
      this.uppercase =
        data.uppercase && !(<any>data.uppercase).toJSON
          ? new MinMax(data.uppercase)
          : <MinMax>this.uppercase;
      this.lowercase =
        data.lowercase && !(<any>data.lowercase).toJSON
          ? new MinMax(data.lowercase)
          : <MinMax>this.lowercase;
      this.numeric =
        data.numeric && !(<any>data.numeric).toJSON
          ? new MinMax(data.numeric)
          : <MinMax>this.numeric;
      this.symbols =
        data.symbols && !(<any>data.symbols).toJSON
          ? new MinMax(data.symbols)
          : <MinMax>this.symbols;
    }
  }

  init(data?: any) {
    if (data) {
      this.length = data['length']
        ? MinMax.fromJS(data['length'])
        : <any>undefined;
      this.alphabetical = data['alphabetical']
        ? MinMax.fromJS(data['alphabetical'])
        : <any>undefined;
      this.uppercase = data['uppercase']
        ? MinMax.fromJS(data['uppercase'])
        : <any>undefined;
      this.lowercase = data['lowercase']
        ? MinMax.fromJS(data['lowercase'])
        : <any>undefined;
      this.numeric = data['numeric']
        ? MinMax.fromJS(data['numeric'])
        : <any>undefined;
      this.symbols = data['symbols']
        ? MinMax.fromJS(data['symbols'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): PasswordPolicy {
    data = typeof data === 'object' ? data : {};
    let result = new PasswordPolicy();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['length'] = this.length ? this.length.toJSON() : <any>undefined;
    data['alphabetical'] = this.alphabetical
      ? this.alphabetical.toJSON()
      : <any>undefined;
    data['uppercase'] = this.uppercase
      ? this.uppercase.toJSON()
      : <any>undefined;
    data['lowercase'] = this.lowercase
      ? this.lowercase.toJSON()
      : <any>undefined;
    data['numeric'] = this.numeric ? this.numeric.toJSON() : <any>undefined;
    data['symbols'] = this.symbols ? this.symbols.toJSON() : <any>undefined;
    return data;
  }
}

export interface IPasswordPolicy {
  length?: IMinMax;
  alphabetical?: IMinMax;
  uppercase?: IMinMax;
  lowercase?: IMinMax;
  numeric?: IMinMax;
  symbols?: IMinMax;
}

export class MinMax implements IMinMax {
  min?: number;
  max?: number;

  constructor(data?: IMinMax) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.min = data['min'];
      this.max = data['max'];
    }
  }

  static fromJS(data: any): MinMax {
    data = typeof data === 'object' ? data : {};
    let result = new MinMax();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['min'] = this.min;
    data['max'] = this.max;
    return data;
  }
}

export interface IMinMax {
  min?: number;
  max?: number;
}

export class Permissions implements IPermissions {
  [key: string]: string[] | any;

  constructor(data?: IPermissions) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property)) this[property] = data[property];
      }
    }
  }

  static fromJS(data: any): Permissions {
    data = typeof data === 'object' ? data : {};
    let result = new Permissions();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    for (var property in this) {
      if (this.hasOwnProperty(property)) data[property] = this[property];
    }
    return data;
  }
}

export interface IPermissions {
  [key: string]: string[] | any;
}

export class UserOverview implements IUserOverview {
  username?: string;
  primaryGroup?: string;
  subGroups?: string[];

  constructor(data?: IUserOverview) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.username = data['username'];
      this.primaryGroup = data['primaryGroup'];
      if (Array.isArray(data['subGroups'])) {
        this.subGroups = [] as any;
        for (let item of data['subGroups']) this.subGroups!.push(item);
      }
    }
  }

  static fromJS(data: any): UserOverview {
    data = typeof data === 'object' ? data : {};
    let result = new UserOverview();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['username'] = this.username;
    data['primaryGroup'] = this.primaryGroup;
    if (Array.isArray(this.subGroups)) {
      data['subGroups'] = [];
      for (let item of this.subGroups) data['subGroups'].push(item);
    }
    return data;
  }
}

export interface IUserOverview {
  username?: string;
  primaryGroup?: string;
  subGroups?: string[];
}

export class UserMetaData implements IUserMetaData {
  valid?: boolean;
  lastLogin?: string;

  constructor(data?: IUserMetaData) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.valid = data['valid'];
      this.lastLogin = data['lastLogin'];
    }
  }

  static fromJS(data: any): UserMetaData {
    data = typeof data === 'object' ? data : {};
    let result = new UserMetaData();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['valid'] = this.valid;
    data['lastLogin'] = this.lastLogin;
    return data;
  }
}

export interface IUserMetaData {
  valid?: boolean;
  lastLogin?: string;
}

export class UserPersonalInfo implements IUserPersonalInfo {
  personalInfo?: PersonalInfo;

  constructor(data?: IUserPersonalInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.personalInfo =
        data.personalInfo && !(<any>data.personalInfo).toJSON
          ? new PersonalInfo(data.personalInfo)
          : <PersonalInfo>this.personalInfo;
    }
  }

  init(data?: any) {
    if (data) {
      this.personalInfo = data['personalInfo']
        ? PersonalInfo.fromJS(data['personalInfo'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UserPersonalInfo {
    data = typeof data === 'object' ? data : {};
    let result = new UserPersonalInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['personalInfo'] = this.personalInfo
      ? this.personalInfo.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IUserPersonalInfo {
  personalInfo?: IPersonalInfo;
}

export class GetUserList extends PaginationBase implements IGetUserList {
  users?: Users[];

  constructor(data?: IGetUserList) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      if (Array.isArray(data['users'])) {
        this.users = [] as any;
        for (let item of data['users']) this.users!.push(item);
      }
    }
  }

  static fromJS(data: any): GetUserList {
    data = typeof data === 'object' ? data : {};
    let result = new GetUserList();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.users)) {
      data['users'] = [];
      for (let item of this.users) data['users'].push(item);
    }
    super.toJSON(data);
    return data;
  }
}

export interface IGetUserList extends IPaginationBase {
  users?: Users[];
}

export class GetUserDetails extends UserOverview implements IGetUserDetails {
  valid?: boolean;
  lastLogin?: string;
  personalInfo?: PersonalInfo;

  constructor(data?: IGetUserDetails) {
    super(data);
    if (data) {
      this.personalInfo =
        data.personalInfo && !(<any>data.personalInfo).toJSON
          ? new PersonalInfo(data.personalInfo)
          : <PersonalInfo>this.personalInfo;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.valid = data['valid'];
      this.lastLogin = data['lastLogin'];
      this.personalInfo = data['personalInfo']
        ? PersonalInfo.fromJS(data['personalInfo'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): GetUserDetails {
    data = typeof data === 'object' ? data : {};
    let result = new GetUserDetails();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['valid'] = this.valid;
    data['lastLogin'] = this.lastLogin;
    data['personalInfo'] = this.personalInfo
      ? this.personalInfo.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IGetUserDetails extends IUserOverview {
  valid?: boolean;
  lastLogin?: string;
  personalInfo?: IPersonalInfo;
}

export class CreateUser extends UserOverview implements ICreateUser {
  personalInfo?: PersonalInfo;
  newPassword?: string;

  constructor(data?: ICreateUser) {
    super(data);
    if (data) {
      this.personalInfo =
        data.personalInfo && !(<any>data.personalInfo).toJSON
          ? new PersonalInfo(data.personalInfo)
          : <PersonalInfo>this.personalInfo;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.personalInfo = data['personalInfo']
        ? PersonalInfo.fromJS(data['personalInfo'])
        : <any>undefined;
      this.newPassword = data['newPassword'];
    }
  }

  static fromJS(data: any): CreateUser {
    data = typeof data === 'object' ? data : {};
    let result = new CreateUser();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['personalInfo'] = this.personalInfo
      ? this.personalInfo.toJSON()
      : <any>undefined;
    data['newPassword'] = this.newPassword;
    super.toJSON(data);
    return data;
  }
}

export interface ICreateUser extends IUserOverview {
  personalInfo?: IPersonalInfo;
  newPassword?: string;
}

export class UpdateUser extends RequestBase implements IUpdateUser {
  requestData!: RequestData3;

  constructor(data?: IUpdateUser) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RequestData3(data.requestData)
          : <RequestData3>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData'];
    }
  }

  static fromJS(data: any): UpdateUser {
    data = typeof data === 'object' ? data : {};
    let result = new UpdateUser();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData;
    super.toJSON(data);
    return data;
  }
}

export interface IUpdateUser extends IRequestBase {
  requestData: IRequestData3;
}

export class MoveUser extends RequestBase implements IMoveUser {
  requestData!: RequestData4;

  constructor(data?: IMoveUser) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RequestData4(data.requestData)
          : <RequestData4>this.requestData;
    }
    if (!data) {
      this.requestData = new RequestData4();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? RequestData4.fromJS(data['requestData'])
        : new RequestData4();
    }
  }

  static fromJS(data: any): MoveUser {
    data = typeof data === 'object' ? data : {};
    let result = new MoveUser();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IMoveUser extends IRequestBase {
  requestData: IRequestData4;
}

export class ChangePassword extends RequestBase implements IChangePassword {
  requestData!: RequestData5;

  constructor(data?: IChangePassword) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RequestData5(data.requestData)
          : <RequestData5>this.requestData;
    }
    if (!data) {
      this.requestData = new RequestData5();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? RequestData5.fromJS(data['requestData'])
        : new RequestData5();
    }
  }

  static fromJS(data: any): ChangePassword {
    data = typeof data === 'object' ? data : {};
    let result = new ChangePassword();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IChangePassword extends IRequestBase {
  requestData: IRequestData5;
}

export class WebServer implements IWebServer {
  enabled?: boolean;
  hostname?: string;
  remoteSessions?: number;

  constructor(data?: IWebServer) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.enabled = data['enabled'];
      this.hostname = data['hostname'];
      this.remoteSessions = data['remoteSessions'];
    }
  }

  static fromJS(data: any): WebServer {
    data = typeof data === 'object' ? data : {};
    let result = new WebServer();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['enabled'] = this.enabled;
    data['hostname'] = this.hostname;
    data['remoteSessions'] = this.remoteSessions;
    return data;
  }
}

export interface IWebServer {
  enabled?: boolean;
  hostname?: string;
  remoteSessions?: number;
}

export class ConfigAutobackupPutBody extends RequestBase
  implements IConfigAutobackupPutBody {
  requestData!: AutoBackup;

  constructor(data?: IConfigAutobackupPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new AutoBackup(data.requestData)
          : <AutoBackup>this.requestData;
    }
    if (!data) {
      this.requestData = new AutoBackup();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? AutoBackup.fromJS(data['requestData'])
        : new AutoBackup();
    }
  }

  static fromJS(data: any): ConfigAutobackupPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigAutobackupPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigAutobackupPutBody extends IRequestBase {
  requestData: IAutoBackup;
}

export class ConfigCertificatesPutBody extends RequestBase
  implements IConfigCertificatesPutBody {
  requestData!: CertSettings;

  constructor(data?: IConfigCertificatesPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new CertSettings(data.requestData)
          : <CertSettings>this.requestData;
    }
    if (!data) {
      this.requestData = new CertSettings();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? CertSettings.fromJS(data['requestData'])
        : new CertSettings();
    }
  }

  static fromJS(data: any): ConfigCertificatesPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigCertificatesPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigCertificatesPutBody extends IRequestBase {
  requestData: ICertSettings;
}

export class ConfigFtpPutBody extends RequestBase implements IConfigFtpPutBody {
  requestData!: FtpSettings;

  constructor(data?: IConfigFtpPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new FtpSettings(data.requestData)
          : <FtpSettings>this.requestData;
    }
    if (!data) {
      this.requestData = new FtpSettings();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? FtpSettings.fromJS(data['requestData'])
        : new FtpSettings();
    }
  }

  static fromJS(data: any): ConfigFtpPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigFtpPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigFtpPutBody extends IRequestBase {
  requestData: IFtpSettings;
}

export class ConfigFtpPostBody extends RequestBase
  implements IConfigFtpPostBody {
  requestData!: FtpSettings;

  constructor(data?: IConfigFtpPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new FtpSettings(data.requestData)
          : <FtpSettings>this.requestData;
    }
    if (!data) {
      this.requestData = new FtpSettings();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? FtpSettings.fromJS(data['requestData'])
        : new FtpSettings();
    }
  }

  static fromJS(data: any): ConfigFtpPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigFtpPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigFtpPostBody extends IRequestBase {
  requestData: IFtpSettings;
}

export class ConfigKmipPutBody extends RequestBase
  implements IConfigKmipPutBody {
  requestData?: KMIPSettings;

  constructor(data?: IConfigKmipPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new KMIPSettings(data.requestData)
          : <KMIPSettings>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? KMIPSettings.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigKmipPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigKmipPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigKmipPutBody extends IRequestBase {
  requestData?: IKMIPSettings;
}

export class ConfigLdapPutBody extends RequestBase
  implements IConfigLdapPutBody {
  requestData!: LDAPConfig;

  constructor(data?: IConfigLdapPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new LDAPConfig(data.requestData)
          : <LDAPConfig>this.requestData;
    }
    if (!data) {
      this.requestData = new LDAPConfig();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? LDAPConfig.fromJS(data['requestData'])
        : new LDAPConfig();
    }
  }

  static fromJS(data: any): ConfigLdapPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigLdapPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigLdapPutBody extends IRequestBase {
  requestData: ILDAPConfig;
}

export class ConfigLdapPostBody extends RequestBase
  implements IConfigLdapPostBody {
  requestData!: LDAPTest;

  constructor(data?: IConfigLdapPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new LDAPTest(data.requestData)
          : <LDAPTest>this.requestData;
    }
    if (!data) {
      this.requestData = new LDAPTest();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? LDAPTest.fromJS(data['requestData'])
        : new LDAPTest();
    }
  }

  static fromJS(data: any): ConfigLdapPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigLdapPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigLdapPostBody extends IRequestBase {
  requestData: ILDAPTest;
}

export class ConfigNetworkPutBody extends RequestBase
  implements IConfigNetworkPutBody {
  requestData?: NetworkSettings;

  constructor(data?: IConfigNetworkPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new NetworkSettings(data.requestData)
          : <NetworkSettings>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? NetworkSettings.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigNetworkPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigNetworkPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigNetworkPutBody extends IRequestBase {
  requestData?: INetworkSettings;
}

export class ConfigNetworkPostBody extends RequestBase
  implements IConfigNetworkPostBody {
  requestData?: Ping;

  constructor(data?: IConfigNetworkPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new Ping(data.requestData)
          : <Ping>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? Ping.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigNetworkPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigNetworkPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigNetworkPostBody extends IRequestBase {
  requestData?: IPing;
}

export class ConfigNtpPutBody extends RequestBase implements IConfigNtpPutBody {
  requestData!: NtpSettings;

  constructor(data?: IConfigNtpPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new NtpSettings(data.requestData)
          : <NtpSettings>this.requestData;
    }
    if (!data) {
      this.requestData = new NtpSettings();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? NtpSettings.fromJS(data['requestData'])
        : new NtpSettings();
    }
  }

  static fromJS(data: any): ConfigNtpPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigNtpPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigNtpPutBody extends IRequestBase {
  requestData: INtpSettings;
}

export class ConfigOcspPutBody extends RequestBase
  implements IConfigOcspPutBody {
  requestData!: OcspSettings;

  constructor(data?: IConfigOcspPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new OcspSettings(data.requestData)
          : <OcspSettings>this.requestData;
    }
    if (!data) {
      this.requestData = new OcspSettings();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? OcspSettings.fromJS(data['requestData'])
        : new OcspSettings();
    }
  }

  static fromJS(data: any): ConfigOcspPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigOcspPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigOcspPutBody extends IRequestBase {
  requestData: IOcspSettings;
}

export class ConfigPasswordsPutBody extends RequestBase
  implements IConfigPasswordsPutBody {
  requestData!: Passwords;

  constructor(data?: IConfigPasswordsPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new Passwords(data.requestData)
          : <Passwords>this.requestData;
    }
    if (!data) {
      this.requestData = new Passwords();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? Passwords.fromJS(data['requestData'])
        : new Passwords();
    }
  }

  static fromJS(data: any): ConfigPasswordsPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigPasswordsPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigPasswordsPutBody extends IRequestBase {
  requestData: IPasswords;
}

export class ConfigPermissionsPutBody extends RequestBase
  implements IConfigPermissionsPutBody {
  requestData!: SetPermissions;

  constructor(data?: IConfigPermissionsPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new SetPermissions(data.requestData)
          : <SetPermissions>this.requestData;
    }
    if (!data) {
      this.requestData = new SetPermissions();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? SetPermissions.fromJS(data['requestData'])
        : new SetPermissions();
    }
  }

  static fromJS(data: any): ConfigPermissionsPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigPermissionsPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigPermissionsPutBody extends IRequestBase {
  requestData: ISetPermissions;
}

export class ConfigRegauthPutBody extends RequestBase
  implements IConfigRegauthPutBody {
  requestData!: RegauthSettings;

  constructor(data?: IConfigRegauthPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RegauthSettings(data.requestData)
          : <RegauthSettings>this.requestData;
    }
    if (!data) {
      this.requestData = new RegauthSettings();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? RegauthSettings.fromJS(data['requestData'])
        : new RegauthSettings();
    }
  }

  static fromJS(data: any): ConfigRegauthPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigRegauthPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigRegauthPutBody extends IRequestBase {
  requestData: IRegauthSettings;
}

export class ConfigSmtpPutBody extends RequestBase
  implements IConfigSmtpPutBody {
  requestData!: SmtpSettings;

  constructor(data?: IConfigSmtpPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new SmtpSettings(data.requestData)
          : <SmtpSettings>this.requestData;
    }
    if (!data) {
      this.requestData = new SmtpSettings();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? SmtpSettings.fromJS(data['requestData'])
        : new SmtpSettings();
    }
  }

  static fromJS(data: any): ConfigSmtpPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigSmtpPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigSmtpPutBody extends IRequestBase {
  requestData: ISmtpSettings;
}

export class ConfigSmtpPostBody extends RequestBase
  implements IConfigSmtpPostBody {
  requestData!: RequestData6;

  constructor(data?: IConfigSmtpPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RequestData6(data.requestData)
          : <RequestData6>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData'];
    }
  }

  static fromJS(data: any): ConfigSmtpPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigSmtpPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigSmtpPostBody extends IRequestBase {
  requestData: IRequestData6;
}

export class EmailnotificationsPostBody extends RequestBase
  implements IEmailnotificationsPostBody {
  requestData?: SmtpEvent;

  constructor(data?: IEmailnotificationsPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new SmtpEvent(data.requestData)
          : <SmtpEvent>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? SmtpEvent.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): EmailnotificationsPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new EmailnotificationsPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IEmailnotificationsPostBody extends IRequestBase {
  requestData?: ISmtpEvent;
}

export class EmailnotificationsPutBody extends RequestBase
  implements IEmailnotificationsPutBody {
  requestData?: SmtpEvent;

  constructor(data?: IEmailnotificationsPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new SmtpEvent(data.requestData)
          : <SmtpEvent>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? SmtpEvent.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): EmailnotificationsPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new EmailnotificationsPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IEmailnotificationsPutBody extends IRequestBase {
  requestData?: ISmtpEvent;
}

export class FunctionsPutBody extends RequestBase implements IFunctionsPutBody {
  requestData?: FunctionList;

  constructor(data?: IFunctionsPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new FunctionList(data.requestData)
          : <FunctionList>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? FunctionList.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): FunctionsPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new FunctionsPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IFunctionsPutBody extends IRequestBase {
  requestData?: IFunctionList;
}

export enum CertType {
  Production = 'production',
  Admin = 'admin',
  All = 'all'
}

export class LogsMiscPutBody extends RequestBase implements ILogsMiscPutBody {
  requestData?: MiscConfig;

  constructor(data?: ILogsMiscPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new MiscConfig(data.requestData)
          : <MiscConfig>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? MiscConfig.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsMiscPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new LogsMiscPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsMiscPutBody extends IRequestBase {
  requestData?: IMiscConfig;
}

export class LogsPrunePutBody extends RequestBase implements ILogsPrunePutBody {
  requestData?: PruneConfig;

  constructor(data?: ILogsPrunePutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new PruneConfig(data.requestData)
          : <PruneConfig>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? PruneConfig.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsPrunePutBody {
    data = typeof data === 'object' ? data : {};
    let result = new LogsPrunePutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsPrunePutBody extends IRequestBase {
  requestData?: IPruneConfig;
}

export class LogsSyslogPutBody extends RequestBase
  implements ILogsSyslogPutBody {
  requestData?: SyslogConfig;

  constructor(data?: ILogsSyslogPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new SyslogConfig(data.requestData)
          : <SyslogConfig>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? SyslogConfig.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsSyslogPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new LogsSyslogPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsSyslogPutBody extends IRequestBase {
  requestData?: ISyslogConfig;
}

export class LogsAuditPutBody extends RequestBase implements ILogsAuditPutBody {
  requestData?: AuditConfig;

  constructor(data?: ILogsAuditPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new AuditConfig(data.requestData)
          : <AuditConfig>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? AuditConfig.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsAuditPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new LogsAuditPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsAuditPutBody extends IRequestBase {
  requestData?: IAuditConfig;
}

export class PrintersPostBody extends RequestBase implements IPrintersPostBody {
  requestData!: RequestData7;

  constructor(data?: IPrintersPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RequestData7(data.requestData)
          : <RequestData7>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData'];
    }
  }

  static fromJS(data: any): PrintersPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new PrintersPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData;
    super.toJSON(data);
    return data;
  }
}

export interface IPrintersPostBody extends IRequestBase {
  requestData: IRequestData7;
}

export class PrintersPutBody extends RequestBase implements IPrintersPutBody {
  requestData!: RequestData8;

  constructor(data?: IPrintersPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new RequestData8(data.requestData)
          : <RequestData8>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData'];
    }
  }

  static fromJS(data: any): PrintersPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new PrintersPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData;
    super.toJSON(data);
    return data;
  }
}

export interface IPrintersPutBody extends IRequestBase {
  requestData: IRequestData8;
}

export class SecuritymodesFipsPutBody extends RequestBase
  implements ISecuritymodesFipsPutBody {
  requestData?: StatusObject;

  constructor(data?: ISecuritymodesFipsPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new StatusObject(data.requestData)
          : <StatusObject>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? StatusObject.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SecuritymodesFipsPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new SecuritymodesFipsPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISecuritymodesFipsPutBody extends IRequestBase {
  requestData?: IStatusObject;
}

export class SecuritymodesPciPutBody extends RequestBase
  implements ISecuritymodesPciPutBody {
  requestData?: StatusObject;

  constructor(data?: ISecuritymodesPciPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new StatusObject(data.requestData)
          : <StatusObject>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? StatusObject.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SecuritymodesPciPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new SecuritymodesPciPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISecuritymodesPciPutBody extends IRequestBase {
  requestData?: IStatusObject;
}

export class SftpeventsPostBody extends RequestBase
  implements ISftpeventsPostBody {
  requestData!: SftpEvent;

  constructor(data?: ISftpeventsPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new SftpEvent(data.requestData)
          : <SftpEvent>this.requestData;
    }
    if (!data) {
      this.requestData = new SftpEvent();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? SftpEvent.fromJS(data['requestData'])
        : new SftpEvent();
    }
  }

  static fromJS(data: any): SftpeventsPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new SftpeventsPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISftpeventsPostBody extends IRequestBase {
  requestData: ISftpEvent;
}

export class SftpeventsPutBody extends RequestBase
  implements ISftpeventsPutBody {
  requestData?: SftpEvent;

  constructor(data?: ISftpeventsPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new SftpEvent(data.requestData)
          : <SftpEvent>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? SftpEvent.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SftpeventsPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new SftpeventsPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISftpeventsPutBody extends IRequestBase {
  requestData?: ISftpEvent;
}

export class SystemDatetimePutBody extends RequestBase
  implements ISystemDatetimePutBody {
  requestData?: SystemDateTime;

  constructor(data?: ISystemDatetimePutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new SystemDateTime(data.requestData)
          : <SystemDateTime>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? SystemDateTime.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemDatetimePutBody {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDatetimePutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemDatetimePutBody extends IRequestBase {
  requestData?: ISystemDateTime;
}

export class SystemDatabaseBackupPostBody extends RequestBase
  implements ISystemDatabaseBackupPostBody {
  requestData?: DBBackup;

  constructor(data?: ISystemDatabaseBackupPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new DBBackup(data.requestData)
          : <DBBackup>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? DBBackup.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemDatabaseBackupPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDatabaseBackupPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemDatabaseBackupPostBody extends IRequestBase {
  requestData?: IDBBackup;
}

export class SystemDatabaseBackupPutBody extends RequestBase
  implements ISystemDatabaseBackupPutBody {
  requestData?: DBBackupRestore;

  constructor(data?: ISystemDatabaseBackupPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new DBBackupRestore(data.requestData)
          : <DBBackupRestore>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? DBBackupRestore.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemDatabaseBackupPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDatabaseBackupPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemDatabaseBackupPutBody extends IRequestBase {
  requestData?: IDBBackupRestore;
}

export class SystemDiskPutBody extends RequestBase
  implements ISystemDiskPutBody {
  requestData?: DiskRaidStatus;

  constructor(data?: ISystemDiskPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new DiskRaidStatus(data.requestData)
          : <DiskRaidStatus>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? DiskRaidStatus.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemDiskPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDiskPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemDiskPutBody extends IRequestBase {
  requestData?: IDiskRaidStatus;
}

export class TemplatesPostBody extends RequestBase
  implements ITemplatesPostBody {
  requestData!: Template;

  constructor(data?: ITemplatesPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new Template(data.requestData)
          : <Template>this.requestData;
    }
    if (!data) {
      this.requestData = new Template();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? Template.fromJS(data['requestData'])
        : new Template();
    }
  }

  static fromJS(data: any): TemplatesPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new TemplatesPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ITemplatesPostBody extends IRequestBase {
  requestData: ITemplate;
}

export enum Type {
  Mailer = 'mailer',
  Smtp = 'smtp',
  ZFold = 'z-fold'
}

export class TemplatesPutBody extends RequestBase implements ITemplatesPutBody {
  requestData!: UpdateTemplate;

  constructor(data?: ITemplatesPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new UpdateTemplate(data.requestData)
          : <UpdateTemplate>this.requestData;
    }
    if (!data) {
      this.requestData = new UpdateTemplate();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? UpdateTemplate.fromJS(data['requestData'])
        : new UpdateTemplate();
    }
  }

  static fromJS(data: any): TemplatesPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new TemplatesPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ITemplatesPutBody extends IRequestBase {
  requestData: IUpdateTemplate;
}

export class UsergroupsPostBody extends RequestBase
  implements IUsergroupsPostBody {
  requestData?: UserGroup;

  constructor(data?: IUsergroupsPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new UserGroup(data.requestData)
          : <UserGroup>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? UserGroup.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UsergroupsPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new UsergroupsPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IUsergroupsPostBody extends IRequestBase {
  requestData?: IUserGroup;
}

export class UsersPostBody extends RequestBase implements IUsersPostBody {
  requestData?: UsersPostBodyRequestData;

  constructor(data?: IUsersPostBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new UsersPostBodyRequestData(data.requestData)
          : <UsersPostBodyRequestData>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData'];
    }
  }

  static fromJS(data: any): UsersPostBody {
    data = typeof data === 'object' ? data : {};
    let result = new UsersPostBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData;
    super.toJSON(data);
    return data;
  }
}

export interface IUsersPostBody extends IRequestBase {
  requestData?: IUsersPostBodyRequestData;
}

export class WebserverPutBody extends RequestBase implements IWebserverPutBody {
  requestData?: WebServer;

  constructor(data?: IWebserverPutBody) {
    super(data);
    if (data) {
      this.requestData =
        data.requestData && !(<any>data.requestData).toJSON
          ? new WebServer(data.requestData)
          : <WebServer>this.requestData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.requestData = data['requestData']
        ? WebServer.fromJS(data['requestData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): WebserverPutBody {
    data = typeof data === 'object' ? data : {};
    let result = new WebserverPutBody();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['requestData'] = this.requestData
      ? this.requestData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IWebserverPutBody extends IRequestBase {
  requestData?: IWebServer;
}

export class ConfigAutoBackupGetResponse extends ResponseBase
  implements IConfigAutoBackupGetResponse {
  responseData?: AutoBackup;

  constructor(data?: IConfigAutoBackupGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new AutoBackup(data.responseData)
          : <AutoBackup>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? AutoBackup.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigAutoBackupGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigAutoBackupGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigAutoBackupGetResponse extends IResponseBase {
  responseData?: IAutoBackup;
}

export class ConfigCertificatesGetResponse extends ResponseBase
  implements IConfigCertificatesGetResponse {
  responseData?: CertSettings;

  constructor(data?: IConfigCertificatesGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new CertSettings(data.responseData)
          : <CertSettings>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? CertSettings.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigCertificatesGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigCertificatesGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigCertificatesGetResponse extends IResponseBase {
  responseData?: ICertSettings;
}

export class ConfigFtpGetResponse extends ResponseBase
  implements IConfigFtpGetResponse {
  responseData?: ResponseData;

  constructor(data?: IConfigFtpGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new ResponseData(data.responseData)
          : <ResponseData>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData'];
    }
  }

  static fromJS(data: any): ConfigFtpGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigFtpGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigFtpGetResponse extends IResponseBase {
  responseData?: IResponseData;
}

export class ConfigKmipGetResponse extends ResponseBase
  implements IConfigKmipGetResponse {
  responseData?: KMIPSettings;

  constructor(data?: IConfigKmipGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new KMIPSettings(data.responseData)
          : <KMIPSettings>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? KMIPSettings.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigKmipGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigKmipGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigKmipGetResponse extends IResponseBase {
  responseData?: IKMIPSettings;
}

export class ConfigLdapGetResponse extends ResponseBase
  implements IConfigLdapGetResponse {
  responseData?: LDAPConfig;

  constructor(data?: IConfigLdapGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new LDAPConfig(data.responseData)
          : <LDAPConfig>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? LDAPConfig.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigLdapGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigLdapGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigLdapGetResponse extends IResponseBase {
  responseData?: ILDAPConfig;
}

export class ConfigNetworkGetResponse extends ResponseBase
  implements IConfigNetworkGetResponse {
  responseData?: NetworkSettings;

  constructor(data?: IConfigNetworkGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new NetworkSettings(data.responseData)
          : <NetworkSettings>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? NetworkSettings.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigNetworkGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigNetworkGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigNetworkGetResponse extends IResponseBase {
  responseData?: INetworkSettings;
}

export class ConfigNetworkPostResponse extends ResponseBase
  implements IConfigNetworkPostResponse {
  responseData?: ResponseData2;

  constructor(data?: IConfigNetworkPostResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new ResponseData2(data.responseData)
          : <ResponseData2>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? ResponseData2.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigNetworkPostResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigNetworkPostResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigNetworkPostResponse extends IResponseBase {
  responseData?: IResponseData2;
}

export class ConfigNtpGetResponse extends ResponseBase
  implements IConfigNtpGetResponse {
  responseData?: NtpSettings;

  constructor(data?: IConfigNtpGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new NtpSettings(data.responseData)
          : <NtpSettings>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? NtpSettings.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigNtpGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigNtpGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigNtpGetResponse extends IResponseBase {
  responseData?: INtpSettings;
}

export class ConfigOcspGetResponse extends ResponseBase
  implements IConfigOcspGetResponse {
  responseData?: OcspSettings;

  constructor(data?: IConfigOcspGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new OcspSettings(data.responseData)
          : <OcspSettings>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? OcspSettings.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigOcspGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigOcspGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigOcspGetResponse extends IResponseBase {
  responseData?: IOcspSettings;
}

export class ConfigPasswordsGetResponse extends ResponseBase
  implements IConfigPasswordsGetResponse {
  responseData?: Passwords;

  constructor(data?: IConfigPasswordsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new Passwords(data.responseData)
          : <Passwords>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? Passwords.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigPasswordsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigPasswordsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigPasswordsGetResponse extends IResponseBase {
  responseData?: IPasswords;
}

export class ConfigPermissionsGetResponse extends ResponseBase
  implements IConfigPermissionsGetResponse {
  responseData?: GetPermissions;

  constructor(data?: IConfigPermissionsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new GetPermissions(data.responseData)
          : <GetPermissions>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? GetPermissions.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigPermissionsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigPermissionsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigPermissionsGetResponse extends IResponseBase {
  responseData?: IGetPermissions;
}

export class ConfigRegauthGetResponse extends ResponseBase
  implements IConfigRegauthGetResponse {
  responseData?: RegauthSettings;

  constructor(data?: IConfigRegauthGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new RegauthSettings(data.responseData)
          : <RegauthSettings>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? RegauthSettings.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigRegauthGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigRegauthGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigRegauthGetResponse extends IResponseBase {
  responseData?: IRegauthSettings;
}

export class ConfigSmtpGetResponse extends ResponseBase
  implements IConfigSmtpGetResponse {
  responseData?: SmtpSettings;

  constructor(data?: IConfigSmtpGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new SmtpSettings(data.responseData)
          : <SmtpSettings>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? SmtpSettings.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): ConfigSmtpGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new ConfigSmtpGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IConfigSmtpGetResponse extends IResponseBase {
  responseData?: ISmtpSettings;
}

export class DuplicateObjectsGetResponse extends ResponseBase
  implements IDuplicateObjectsGetResponse {
  responseData?: ListObjectTypes;

  constructor(data?: IDuplicateObjectsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new ListObjectTypes(data.responseData)
          : <ListObjectTypes>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? ListObjectTypes.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): DuplicateObjectsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new DuplicateObjectsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IDuplicateObjectsGetResponse extends IResponseBase {
  responseData?: IListObjectTypes;
}

export class EmailnotificationsGetResponse extends ResponseBase
  implements IEmailnotificationsGetResponse {
  responseData!: EmailList;

  constructor(data?: IEmailnotificationsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new EmailList(data.responseData)
          : <EmailList>this.responseData;
    }
    if (!data) {
      this.responseData = new EmailList();
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? EmailList.fromJS(data['responseData'])
        : new EmailList();
    }
  }

  static fromJS(data: any): EmailnotificationsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new EmailnotificationsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IEmailnotificationsGetResponse extends IResponseBase {
  responseData: IEmailList;
}

export class FeaturesResponse extends ResponseBase
  implements IFeaturesResponse {
  responseData?: FeatureList;

  constructor(data?: IFeaturesResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new FeatureList(data.responseData)
          : <FeatureList>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? FeatureList.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): FeaturesResponse {
    data = typeof data === 'object' ? data : {};
    let result = new FeaturesResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IFeaturesResponse extends IResponseBase {
  responseData?: IFeatureList;
}

export class FeaturesRequestGetResponse extends ResponseBase
  implements IFeaturesRequestGetResponse {
  responseData?: FeatureRequest;

  constructor(data?: IFeaturesRequestGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new FeatureRequest(data.responseData)
          : <FeatureRequest>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? FeatureRequest.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): FeaturesRequestGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new FeaturesRequestGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IFeaturesRequestGetResponse extends IResponseBase {
  responseData?: IFeatureRequest;
}

export class FeaturesRequestPutResponse extends ResponseBase
  implements IFeaturesRequestPutResponse {
  responseData?: ResponseData3;

  constructor(data?: IFeaturesRequestPutResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new ResponseData3(data.responseData)
          : <ResponseData3>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? ResponseData3.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): FeaturesRequestPutResponse {
    data = typeof data === 'object' ? data : {};
    let result = new FeaturesRequestPutResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IFeaturesRequestPutResponse extends IResponseBase {
  responseData?: IResponseData3;
}

export class FunctionsGetResponse extends ResponseBase
  implements IFunctionsGetResponse {
  responseData?: FunctionList;

  constructor(data?: IFunctionsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new FunctionList(data.responseData)
          : <FunctionList>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? FunctionList.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): FunctionsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new FunctionsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IFunctionsGetResponse extends IResponseBase {
  responseData?: IFunctionList;
}

export class FxcertcrlsGetResponse extends ResponseBase
  implements IFxcertcrlsGetResponse {
  responseData?: CrlDetails;

  constructor(data?: IFxcertcrlsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new CrlDetails(data.responseData)
          : <CrlDetails>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? CrlDetails.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): FxcertcrlsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new FxcertcrlsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IFxcertcrlsGetResponse extends IResponseBase {
  responseData?: ICrlDetails;
}

export class JobsResponse extends ResponseBase implements IJobsResponse {
  jobCount?: number;
  jobs?: Job[];

  constructor(data?: IJobsResponse) {
    super(data);
    if (data) {
      if (data.jobs) {
        this.jobs = [];
        for (let i = 0; i < data.jobs.length; i++) {
          let item = data.jobs[i];
          this.jobs[i] =
            item && !(<any>item).toJSON ? new Job(item) : <Job>item;
        }
      }
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.jobCount = data['jobCount'];
      if (Array.isArray(data['jobs'])) {
        this.jobs = [] as any;
        for (let item of data['jobs']) this.jobs!.push(Job.fromJS(item));
      }
    }
  }

  static fromJS(data: any): JobsResponse {
    data = typeof data === 'object' ? data : {};
    let result = new JobsResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['jobCount'] = this.jobCount;
    if (Array.isArray(this.jobs)) {
      data['jobs'] = [];
      for (let item of this.jobs) data['jobs'].push(item.toJSON());
    }
    super.toJSON(data);
    return data;
  }
}

export interface IJobsResponse extends IResponseBase {
  jobCount?: number;
  jobs?: IJob[];
}

export class LoginResponse extends ResponseBase implements ILoginResponse {
  responseData?: ResponseData4;

  constructor(data?: ILoginResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new ResponseData4(data.responseData)
          : <ResponseData4>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData'];
    }
  }

  static fromJS(data: any): LoginResponse {
    data = typeof data === 'object' ? data : {};
    let result = new LoginResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData;
    super.toJSON(data);
    return data;
  }
}

export interface ILoginResponse extends IResponseBase {
  responseData?: IResponseData4;
}

export class LogsResponse extends ResponseBase implements ILogsResponse {
  responseData?: LogFileList;

  constructor(data?: ILogsResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new LogFileList(data.responseData)
          : <LogFileList>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? LogFileList.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsResponse {
    data = typeof data === 'object' ? data : {};
    let result = new LogsResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsResponse extends IResponseBase {
  responseData?: ILogFileList;
}

export class LogsMiscGetResponse extends ResponseBase
  implements ILogsMiscGetResponse {
  responseData?: MiscConfig;

  constructor(data?: ILogsMiscGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new MiscConfig(data.responseData)
          : <MiscConfig>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? MiscConfig.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsMiscGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new LogsMiscGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsMiscGetResponse extends IResponseBase {
  responseData?: IMiscConfig;
}

export class LogsPruneGetResponse extends ResponseBase
  implements ILogsPruneGetResponse {
  responseData?: PruneConfig;

  constructor(data?: ILogsPruneGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new PruneConfig(data.responseData)
          : <PruneConfig>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? PruneConfig.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsPruneGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new LogsPruneGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsPruneGetResponse extends IResponseBase {
  responseData?: IPruneConfig;
}

export class LogsSyslogGetResponse extends ResponseBase
  implements ILogsSyslogGetResponse {
  responseData?: SyslogConfig;

  constructor(data?: ILogsSyslogGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new SyslogConfig(data.responseData)
          : <SyslogConfig>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? SyslogConfig.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsSyslogGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new LogsSyslogGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsSyslogGetResponse extends IResponseBase {
  responseData?: ISyslogConfig;
}

export class LogsAuditGetResponse extends ResponseBase
  implements ILogsAuditGetResponse {
  responseData?: AuditConfig;

  constructor(data?: ILogsAuditGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new AuditConfig(data.responseData)
          : <AuditConfig>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? AuditConfig.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): LogsAuditGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new LogsAuditGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ILogsAuditGetResponse extends IResponseBase {
  responseData?: IAuditConfig;
}

export class PrintersGetResponse extends ResponseBase
  implements IPrintersGetResponse {
  responseData?: PrinterList;

  constructor(data?: IPrintersGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new PrinterList(data.responseData)
          : <PrinterList>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? PrinterList.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): PrintersGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new PrintersGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IPrintersGetResponse extends IResponseBase {
  responseData?: IPrinterList;
}

export class SecuritymodesFipsGetResponse extends ResponseBase
  implements ISecuritymodesFipsGetResponse {
  responseData?: StatusObject;

  constructor(data?: ISecuritymodesFipsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new StatusObject(data.responseData)
          : <StatusObject>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? StatusObject.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SecuritymodesFipsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SecuritymodesFipsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISecuritymodesFipsGetResponse extends IResponseBase {
  responseData?: IStatusObject;
}

export class SecuritymodesPciGetResponse extends ResponseBase
  implements ISecuritymodesPciGetResponse {
  responseData?: StatusObject;

  constructor(data?: ISecuritymodesPciGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new StatusObject(data.responseData)
          : <StatusObject>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? StatusObject.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SecuritymodesPciGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SecuritymodesPciGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISecuritymodesPciGetResponse extends IResponseBase {
  responseData?: IStatusObject;
}

export class SftpEventsGetResponse extends ResponseBase
  implements ISftpEventsGetResponse {
  responseData?: SftpList;

  constructor(data?: ISftpEventsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new SftpList(data.responseData)
          : <SftpList>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? SftpList.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SftpEventsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SftpEventsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISftpEventsGetResponse extends IResponseBase {
  responseData?: ISftpList;
}

export class SystemGetResponse extends ResponseBase
  implements ISystemGetResponse {
  responseData?: ServerInfo;

  constructor(data?: ISystemGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new ServerInfo(data.responseData)
          : <ServerInfo>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? ServerInfo.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SystemGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemGetResponse extends IResponseBase {
  responseData?: IServerInfo;
}

export class SystemDatetimeGetResponse extends ResponseBase
  implements ISystemDatetimeGetResponse {
  responseData?: ResponseData5;

  constructor(data?: ISystemDatetimeGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new ResponseData5(data.responseData)
          : <ResponseData5>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData'];
    }
  }

  static fromJS(data: any): SystemDatetimeGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDatetimeGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemDatetimeGetResponse extends IResponseBase {
  responseData?: IResponseData5;
}

export class SystemFirmwareGetResponse extends ResponseBase
  implements ISystemFirmwareGetResponse {
  responseData?: FirmwareInfo;

  constructor(data?: ISystemFirmwareGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new FirmwareInfo(data.responseData)
          : <FirmwareInfo>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? FirmwareInfo.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemFirmwareGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SystemFirmwareGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemFirmwareGetResponse extends IResponseBase {
  responseData?: IFirmwareInfo;
}

export class SystemDatabaseGetResponse extends ResponseBase
  implements ISystemDatabaseGetResponse {
  responseData?: DBInfo;

  constructor(data?: ISystemDatabaseGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new DBInfo(data.responseData)
          : <DBInfo>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? DBInfo.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemDatabaseGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDatabaseGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemDatabaseGetResponse extends IResponseBase {
  responseData?: IDBInfo;
}

export class SystemDatabaseBackupGetResponse extends ResponseBase
  implements ISystemDatabaseBackupGetResponse {
  responseData?: DBBackupList;

  constructor(data?: ISystemDatabaseBackupGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new DBBackupList(data.responseData)
          : <DBBackupList>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? DBBackupList.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemDatabaseBackupGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDatabaseBackupGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemDatabaseBackupGetResponse extends IResponseBase {
  responseData?: IDBBackupList;
}

export class SystemDiskGetResponse extends ResponseBase
  implements ISystemDiskGetResponse {
  responseData?: DiskInfo;

  constructor(data?: ISystemDiskGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new DiskInfo(data.responseData)
          : <DiskInfo>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? DiskInfo.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemDiskGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SystemDiskGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemDiskGetResponse extends IResponseBase {
  responseData?: IDiskInfo;
}

export class SystemRaidResponse extends ResponseBase
  implements ISystemRaidResponse {
  responseData?: RaidList;

  constructor(data?: ISystemRaidResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new RaidList(data.responseData)
          : <RaidList>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? RaidList.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): SystemRaidResponse {
    data = typeof data === 'object' ? data : {};
    let result = new SystemRaidResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ISystemRaidResponse extends IResponseBase {
  responseData?: IRaidList;
}

export class TemplatesGetResponse extends ResponseBase
  implements ITemplatesGetResponse {
  responseData?: Template;

  constructor(data?: ITemplatesGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new Template(data.responseData)
          : <Template>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? Template.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): TemplatesGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new TemplatesGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface ITemplatesGetResponse extends IResponseBase {
  responseData?: ITemplate;
}

export class UsergroupsGetResponse extends ResponseBase
  implements IUsergroupsGetResponse {
  responseData?: ResponseData6;

  constructor(data?: IUsergroupsGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new ResponseData6(data.responseData)
          : <ResponseData6>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? ResponseData6.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UsergroupsGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new UsergroupsGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IUsergroupsGetResponse extends IResponseBase {
  responseData?: IResponseData6;
}

export class UsersGetResponse extends ResponseBase
  implements IUsersGetResponse {
  responseData?: GetUserList | GetUserDetails;

  constructor(data?: IUsersGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? ((data.responseData instanceof GetUserList) ? new GetUserList(data.responseData as IGetUserList) : new GetUserDetails(data.responseData as IGetUserDetails))
          : ((data.responseData instanceof GetUserList) ? <GetUserList>this.responseData : <GetUserDetails>this.responseData);
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? GetUserList.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): UsersGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new UsersGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IUsersGetResponse extends IResponseBase {
  responseData?: IGetUserList | IGetUserDetails;
}

export class WebserverGetResponse extends ResponseBase
  implements IWebserverGetResponse {
  responseData?: WebServer;

  constructor(data?: IWebserverGetResponse) {
    super(data);
    if (data) {
      this.responseData =
        data.responseData && !(<any>data.responseData).toJSON
          ? new WebServer(data.responseData)
          : <WebServer>this.responseData;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.responseData = data['responseData']
        ? WebServer.fromJS(data['responseData'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): WebserverGetResponse {
    data = typeof data === 'object' ? data : {};
    let result = new WebserverGetResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['responseData'] = this.responseData
      ? this.responseData.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IWebserverGetResponse extends IResponseBase {
  responseData?: IWebServer;
}

export enum RunOn {
  Sunday = 'sunday',
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday'
}

export enum LogExportEventsFormat {
  Csv = 'csv',
  Human_readable = 'human readable'
}

export enum KeyExportEventsFormat {
  Csv = 'csv',
  Human_readable = 'human readable'
}

export enum FtpSettingsMode {
  Clear = 'Clear',
  User = 'User',
  PKI = 'PKI'
}

export enum KMIPSettingsSymmetricFormat {
  Fx = 'Fx',
  Raw = 'Raw'
}

export enum KMIPSettingsRsaFormat {
  Fx = 'Fx',
  PKCS1 = 'PKCS1',
  PKCS8 = 'PKCS8',
  Transparent = 'Transparent'
}

export class TimestampFilter implements ITimestampFilter {
  filterByDate?: boolean;
  startDate?: string;
  endDate?: string;
  filterByTime?: boolean;
  startTime?: string;
  endTime?: string;
  dayOfWeek?: DayOfWeek[];

  constructor(data?: ITimestampFilter) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.startTime = '00:00:00';
      this.endTime = '00:00:00';
    }
  }

  init(data?: any) {
    if (data) {
      this.filterByDate = data['filterByDate'];
      this.startDate = data['startDate'];
      this.endDate = data['endDate'];
      this.filterByTime = data['filterByTime'];
      this.startTime =
        data['startTime'] !== undefined ? data['startTime'] : '00:00:00';
      this.endTime =
        data['endTime'] !== undefined ? data['endTime'] : '00:00:00';
      if (Array.isArray(data['dayOfWeek'])) {
        this.dayOfWeek = [] as any;
        for (let item of data['dayOfWeek']) this.dayOfWeek!.push(item);
      }
    }
  }

  static fromJS(data: any): TimestampFilter {
    data = typeof data === 'object' ? data : {};
    let result = new TimestampFilter();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['filterByDate'] = this.filterByDate;
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['filterByTime'] = this.filterByTime;
    data['startTime'] = this.startTime;
    data['endTime'] = this.endTime;
    if (Array.isArray(this.dayOfWeek)) {
      data['dayOfWeek'] = [];
      for (let item of this.dayOfWeek) data['dayOfWeek'].push(item);
    }
    return data;
  }
}

export interface ITimestampFilter {
  filterByDate?: boolean;
  startDate?: string;
  endDate?: string;
  filterByTime?: boolean;
  startTime?: string;
  endTime?: string;
  dayOfWeek?: DayOfWeek[];
}

export class ArrivalFilter implements IArrivalFilter {
  filterByDate?: boolean;
  startDate?: string;
  endDate?: string;
  filterByTime?: boolean;
  startTime?: string;
  endTime?: string;
  dayOfWeek?: DayOfWeek2[];

  constructor(data?: IArrivalFilter) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
    if (!data) {
      this.startTime = '00:00:00';
      this.endTime = '00:00:00';
    }
  }

  init(data?: any) {
    if (data) {
      this.filterByDate = data['filterByDate'];
      this.startDate = data['startDate'];
      this.endDate = data['endDate'];
      this.filterByTime = data['filterByTime'];
      this.startTime =
        data['startTime'] !== undefined ? data['startTime'] : '00:00:00';
      this.endTime =
        data['endTime'] !== undefined ? data['endTime'] : '00:00:00';
      if (Array.isArray(data['dayOfWeek'])) {
        this.dayOfWeek = [] as any;
        for (let item of data['dayOfWeek']) this.dayOfWeek!.push(item);
      }
    }
  }

  static fromJS(data: any): ArrivalFilter {
    data = typeof data === 'object' ? data : {};
    let result = new ArrivalFilter();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['filterByDate'] = this.filterByDate;
    data['startDate'] = this.startDate;
    data['endDate'] = this.endDate;
    data['filterByTime'] = this.filterByTime;
    data['startTime'] = this.startTime;
    data['endTime'] = this.endTime;
    if (Array.isArray(this.dayOfWeek)) {
      data['dayOfWeek'] = [];
      for (let item of this.dayOfWeek) data['dayOfWeek'].push(item);
    }
    return data;
  }
}

export interface IArrivalFilter {
  filterByDate?: boolean;
  startDate?: string;
  endDate?: string;
  filterByTime?: boolean;
  startTime?: string;
  endTime?: string;
  dayOfWeek?: DayOfWeek2[];
}

export enum LDAPConfigScheme {
  Ldap = 'ldap',
  Ldaps = 'ldaps'
}

export class GroupPerms implements IGroupPerms {
  groupBase?: string;
  groupAttr?: string;
  dynamicGroup?: boolean;
  groupName?: string;
  member?: boolean;
  memberAttr?: string;

  constructor(data?: IGroupPerms) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.groupBase = data['groupBase'];
      this.groupAttr = data['groupAttr'];
      this.dynamicGroup = data['dynamicGroup'];
      this.groupName = data['groupName'];
      this.member = data['member'];
      this.memberAttr = data['memberAttr'];
    }
  }

  static fromJS(data: any): GroupPerms {
    data = typeof data === 'object' ? data : {};
    let result = new GroupPerms();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['groupBase'] = this.groupBase;
    data['groupAttr'] = this.groupAttr;
    data['dynamicGroup'] = this.dynamicGroup;
    data['groupName'] = this.groupName;
    data['member'] = this.member;
    data['memberAttr'] = this.memberAttr;
    return data;
  }
}

export interface IGroupPerms {
  groupBase?: string;
  groupAttr?: string;
  dynamicGroup?: boolean;
  groupName?: string;
  member?: boolean;
  memberAttr?: string;
}

export enum LDAPConfigAuthType {
  Bind = 'Bind',
  Search = 'Search',
  Compare = 'Compare'
}

export enum OcspSettingsResponseSigner {
  Issuer = 'Issuer',
  Specific_certificate = 'Specific certificate'
}

export enum OcspSettingsResponseCertHash {
  SHA1 = 'SHA1',
  SHA224 = 'SHA224',
  SHA256 = 'SHA256',
  SHA384 = 'SHA384',
  SHA512 = 'SHA512'
}

export enum OcspSettingsResponseIdType {
  Name = 'Name',
  Key = 'Key'
}

export class Permissions2 implements IPermissions2 {
  type?: string;
  description?: string;
  setting?: Permissions2Setting;
  settingOptions?: string[];

  constructor(data?: IPermissions2) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.type = data['type'];
      this.description = data['description'];
      this.setting = data['setting'];
      if (Array.isArray(data['settingOptions'])) {
        this.settingOptions = [] as any;
        for (let item of data['settingOptions'])
          this.settingOptions!.push(item);
      }
    }
  }

  static fromJS(data: any): Permissions2 {
    data = typeof data === 'object' ? data : {};
    let result = new Permissions2();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['type'] = this.type;
    data['description'] = this.description;
    data['setting'] = this.setting;
    if (Array.isArray(this.settingOptions)) {
      data['settingOptions'] = [];
      for (let item of this.settingOptions) data['settingOptions'].push(item);
    }
    return data;
  }
}

export interface IPermissions2 {
  type?: string;
  description?: string;
  setting?: Permissions2Setting;
  settingOptions?: string[];
}

export class Permissions3 implements IPermissions3 {
  type!: string;
  setting!: Permissions3Setting;

  constructor(data?: IPermissions3) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.type = data['type'];
      this.setting = data['setting'];
    }
  }

  static fromJS(data: any): Permissions3 {
    data = typeof data === 'object' ? data : {};
    let result = new Permissions3();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['type'] = this.type;
    data['setting'] = this.setting;
    return data;
  }
}

export interface IPermissions3 {
  type: string;
  setting: Permissions3Setting;
}

export enum RegauthSettingsApprovalType {
  Group = 'Group',
  User = 'User'
}

export class Events extends KSNEvents implements IEvents {
  certAlmostExpired?: boolean;
  certExpired?: boolean;
  logExport?: LogExportEvents;

  constructor(data?: IEvents) {
    super(data);
    if (data) {
      this.logExport =
        data.logExport && !(<any>data.logExport).toJSON
          ? new LogExportEvents(data.logExport)
          : <LogExportEvents>this.logExport;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.certAlmostExpired = data['certAlmostExpired'];
      this.certExpired = data['certExpired'];
      this.logExport = data['logExport']
        ? LogExportEvents.fromJS(data['logExport'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): Events {
    data = typeof data === 'object' ? data : {};
    let result = new Events();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['certAlmostExpired'] = this.certAlmostExpired;
    data['certExpired'] = this.certExpired;
    data['logExport'] = this.logExport
      ? this.logExport.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IEvents extends IKSNEvents {
  certAlmostExpired?: boolean;
  certExpired?: boolean;
  logExport?: ILogExportEvents;
}

export class Features implements IFeatures {
  application?: FeatureListItems;
  firmware?: FeatureListItems;
  virtual?: FeatureListItems;

  constructor(data?: IFeatures) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.application =
        data.application && !(<any>data.application).toJSON
          ? new FeatureListItems(data.application)
          : <FeatureListItems>this.application;
      this.firmware =
        data.firmware && !(<any>data.firmware).toJSON
          ? new FeatureListItems(data.firmware)
          : <FeatureListItems>this.firmware;
      this.virtual =
        data.virtual && !(<any>data.virtual).toJSON
          ? new FeatureListItems(data.virtual)
          : <FeatureListItems>this.virtual;
    }
  }

  init(data?: any) {
    if (data) {
      this.application = data['application']
        ? FeatureListItems.fromJS(data['application'])
        : <any>undefined;
      this.firmware = data['firmware']
        ? FeatureListItems.fromJS(data['firmware'])
        : <any>undefined;
      this.virtual = data['virtual']
        ? FeatureListItems.fromJS(data['virtual'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): Features {
    data = typeof data === 'object' ? data : {};
    let result = new Features();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['application'] = this.application
      ? this.application.toJSON()
      : <any>undefined;
    data['firmware'] = this.firmware ? this.firmware.toJSON() : <any>undefined;
    data['virtual'] = this.virtual ? this.virtual.toJSON() : <any>undefined;
    return data;
  }
}

export interface IFeatures {
  application?: IFeatureListItems;
  firmware?: IFeatureListItems;
  virtual?: IFeatureListItems;
}

export enum CrlUploadType {
  Production = 'production',
  Admin = 'admin'
}

export class AuthCredentials implements IAuthCredentials {
  username?: string;
  password?: string;

  constructor(data?: IAuthCredentials) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.username = data['username'];
      this.password = data['password'];
    }
  }

  static fromJS(data: any): AuthCredentials {
    data = typeof data === 'object' ? data : {};
    let result = new AuthCredentials();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['username'] = this.username;
    data['password'] = this.password;
    return data;
  }
}

export interface IAuthCredentials {
  username?: string;
  password?: string;
}

export enum SyslogConfigFirmwareLogLevel {
  Emergency = 'Emergency',
  Alert = 'Alert',
  Critical = 'Critical',
  Error = 'Error',
  Warning = 'Warning',
  Notice = 'Notice',
  Info = 'Info'
}

export class ServerAddresses implements IServerAddresses {
  host?: string;
  port?: number;

  constructor(data?: IServerAddresses) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.host = data['host'];
      this.port = data['port'];
    }
  }

  static fromJS(data: any): ServerAddresses {
    data = typeof data === 'object' ? data : {};
    let result = new ServerAddresses();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['host'] = this.host;
    data['port'] = this.port;
    return data;
  }
}

export interface IServerAddresses {
  host?: string;
  port?: number;
}

export enum PrinterDriver {
  Generic = 'Generic',
  Microline = 'Microline'
}

export enum KeyExportFormat {
  Csv = 'csv',
  Human_readable = 'human readable'
}

export enum LogExportFormat {
  Csv = 'csv',
  Human_readable = 'human readable'
}

export class Events2 implements IEvents2 {
  keyExport?: KeyExport;

  constructor(data?: IEvents2) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.keyExport =
        data.keyExport && !(<any>data.keyExport).toJSON
          ? new KeyExport(data.keyExport)
          : <KeyExport>this.keyExport;
    }
  }

  init(data?: any) {
    if (data) {
      this.keyExport = data['keyExport']
        ? KeyExport.fromJS(data['keyExport'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): Events2 {
    data = typeof data === 'object' ? data : {};
    let result = new Events2();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['keyExport'] = this.keyExport
      ? this.keyExport.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IEvents2 {
  keyExport?: IKeyExport;
}

export enum TemplateType {
  Mailer = 'mailer',
  Smtp = 'smtp',
  ZFold = 'z-fold'
}

export enum UserGroupUserLocation {
  Database = 'Database',
  Card = 'Card',
  LDAP_Server = 'LDAP Server'
}

export class RequestData implements IRequestData {
  group!: string;
  destination!: string;
  fixConflicts!: boolean;

  constructor(data?: IRequestData) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.group = data['group'];
      this.destination = data['destination'];
      this.fixConflicts = data['fixConflicts'];
    }
  }

  static fromJS(data: any): RequestData {
    data = typeof data === 'object' ? data : {};
    let result = new RequestData();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['group'] = this.group;
    data['destination'] = this.destination;
    data['fixConflicts'] = this.fixConflicts;
    return data;
  }
}

export interface IRequestData {
  group: string;
  destination: string;
  fixConflicts: boolean;
}

export class RequestData2 implements IRequestData2 {
  group!: string;
  newName?: string;
  permissions?: Permissions;
  passPolicy?: PasswordPolicy;
  loginsRequired?: number;
  oauthSettings?: OAuthSettings;
  otpSettings?: OTPSettings;

  constructor(data?: IRequestData2) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      this.permissions =
        data.permissions && !(<any>data.permissions).toJSON
          ? new Permissions(data.permissions)
          : <Permissions>this.permissions;
      this.passPolicy =
        data.passPolicy && !(<any>data.passPolicy).toJSON
          ? new PasswordPolicy(data.passPolicy)
          : <PasswordPolicy>this.passPolicy;
      this.oauthSettings =
        data.oauthSettings && !(<any>data.oauthSettings).toJSON
          ? new OAuthSettings(data.oauthSettings)
          : <OAuthSettings>this.oauthSettings;
      this.otpSettings =
        data.otpSettings && !(<any>data.otpSettings).toJSON
          ? new OTPSettings(data.otpSettings)
          : <OTPSettings>this.otpSettings;
    }
  }

  init(data?: any) {
    if (data) {
      this.group = data['group'];
      this.newName = data['newName'];
      this.permissions = data['permissions']
        ? Permissions.fromJS(data['permissions'])
        : <any>undefined;
      this.passPolicy = data['passPolicy']
        ? PasswordPolicy.fromJS(data['passPolicy'])
        : <any>undefined;
      this.loginsRequired = data['loginsRequired'];
      this.oauthSettings = data['oauthSettings']
        ? OAuthSettings.fromJS(data['oauthSettings'])
        : <any>undefined;
      this.otpSettings = data['otpSettings']
        ? OTPSettings.fromJS(data['otpSettings'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): RequestData2 {
    data = typeof data === 'object' ? data : {};
    let result = new RequestData2();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['group'] = this.group;
    data['newName'] = this.newName;
    data['permissions'] = this.permissions
      ? this.permissions.toJSON()
      : <any>undefined;
    data['passPolicy'] = this.passPolicy
      ? this.passPolicy.toJSON()
      : <any>undefined;
    data['loginsRequired'] = this.loginsRequired;
    data['oauthSettings'] = this.oauthSettings
      ? this.oauthSettings.toJSON()
      : <any>undefined;
    data['otpSettings'] = this.otpSettings
      ? this.otpSettings.toJSON()
      : <any>undefined;
    return data;
  }
}

export interface IRequestData2 {
  group: string;
  newName?: string;
  permissions?: IPermissions;
  passPolicy?: IPasswordPolicy;
  loginsRequired?: number;
  oauthSettings?: IOAuthSettings;
  otpSettings?: IOTPSettings;
}

export enum PortList {
  HostAPI = 'Host-API',
  Web = 'Web',
  Client = 'Client'
}

export class PersonalInfo implements IPersonalInfo {
  firstName?: string;
  lastName?: string;
  commonName?: string;
  givenName?: string;
  surname?: string;
  mobileCarrier?: string;
  phone?: string;
  email?: string;

  constructor(data?: IPersonalInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.firstName = data['firstName'];
      this.lastName = data['lastName'];
      this.commonName = data['commonName'];
      this.givenName = data['givenName'];
      this.surname = data['surname'];
      this.mobileCarrier = data['mobileCarrier'];
      this.phone = data['phone'];
      this.email = data['email'];
    }
  }

  static fromJS(data: any): PersonalInfo {
    data = typeof data === 'object' ? data : {};
    let result = new PersonalInfo();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['firstName'] = this.firstName;
    data['lastName'] = this.lastName;
    data['commonName'] = this.commonName;
    data['givenName'] = this.givenName;
    data['surname'] = this.surname;
    data['mobileCarrier'] = this.mobileCarrier;
    data['phone'] = this.phone;
    data['email'] = this.email;
    return data;
  }
}

export interface IPersonalInfo {
  firstName?: string;
  lastName?: string;
  commonName?: string;
  givenName?: string;
  surname?: string;
  mobileCarrier?: string;
  phone?: string;
  email?: string;
}

export class Users extends UserOverview implements IUsers {
  valid?: boolean;
  lastLogin?: string;

  constructor(data?: IUsers) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.valid = data['valid'];
      this.lastLogin = data['lastLogin'];
    }
  }

  static fromJS(data: any): Users {
    data = typeof data === 'object' ? data : {};
    let result = new Users();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['valid'] = this.valid;
    data['lastLogin'] = this.lastLogin;
    super.toJSON(data);
    return data;
  }
}

export interface IUsers extends IUserOverview {
  valid?: boolean;
  lastLogin?: string;
}

export class RequestData3 extends UserOverview implements IRequestData3 {
  personalInfo?: PersonalInfo;

  constructor(data?: IRequestData3) {
    super(data);
    if (data) {
      this.personalInfo =
        data.personalInfo && !(<any>data.personalInfo).toJSON
          ? new PersonalInfo(data.personalInfo)
          : <PersonalInfo>this.personalInfo;
    }
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.personalInfo = data['personalInfo']
        ? PersonalInfo.fromJS(data['personalInfo'])
        : <any>undefined;
    }
  }

  static fromJS(data: any): RequestData3 {
    data = typeof data === 'object' ? data : {};
    let result = new RequestData3();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['personalInfo'] = this.personalInfo
      ? this.personalInfo.toJSON()
      : <any>undefined;
    super.toJSON(data);
    return data;
  }
}

export interface IRequestData3 extends IUserOverview {
  personalInfo?: IPersonalInfo;
}

export class RequestData4 implements IRequestData4 {
  username!: string;
  newGroup!: string;
  oldPassword?: string;
  newPassword?: string;

  constructor(data?: IRequestData4) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.username = data['username'];
      this.newGroup = data['newGroup'];
      this.oldPassword = data['oldPassword'];
      this.newPassword = data['newPassword'];
    }
  }

  static fromJS(data: any): RequestData4 {
    data = typeof data === 'object' ? data : {};
    let result = new RequestData4();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['username'] = this.username;
    data['newGroup'] = this.newGroup;
    data['oldPassword'] = this.oldPassword;
    data['newPassword'] = this.newPassword;
    return data;
  }
}

export interface IRequestData4 {
  username: string;
  newGroup: string;
  oldPassword?: string;
  newPassword?: string;
}

export class RequestData5 implements IRequestData5 {
  username!: string;
  oldPassword!: string;
  newPassword!: string;

  constructor(data?: IRequestData5) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.username = data['username'];
      this.oldPassword = data['oldPassword'];
      this.newPassword = data['newPassword'];
    }
  }

  static fromJS(data: any): RequestData5 {
    data = typeof data === 'object' ? data : {};
    let result = new RequestData5();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['username'] = this.username;
    data['oldPassword'] = this.oldPassword;
    data['newPassword'] = this.newPassword;
    return data;
  }
}

export interface IRequestData5 {
  username: string;
  oldPassword: string;
  newPassword: string;
}

export class RequestData6 extends SmtpSettings implements IRequestData6 {
  sendTo?: string;

  constructor(data?: IRequestData6) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.sendTo = data['sendTo'];
    }
  }

  static fromJS(data: any): RequestData6 {
    data = typeof data === 'object' ? data : {};
    let result = new RequestData6();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['sendTo'] = this.sendTo;
    super.toJSON(data);
    return data;
  }
}

export interface IRequestData6 extends ISmtpSettings {
  sendTo?: string;
}

export class RequestData7 extends Printer implements IRequestData7 {
  constructor(data?: IRequestData7) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
  }

  static fromJS(data: any): RequestData7 {
    data = typeof data === 'object' ? data : {};
    let result = new RequestData7();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    super.toJSON(data);
    return data;
  }
}

export interface IRequestData7 extends IPrinter {}

export class RequestData8 extends Printer implements IRequestData8 {
  newName?: string;

  constructor(data?: IRequestData8) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.newName = data['newName'];
    }
  }

  static fromJS(data: any): RequestData8 {
    data = typeof data === 'object' ? data : {};
    let result = new RequestData8();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['newName'] = this.newName;
    super.toJSON(data);
    return data;
  }
}

export interface IRequestData8 extends IPrinter {
  newName?: string;
}

export class UsersPostBodyRequestData extends CreateUser
  implements IUsersPostBodyRequestData {
  newPassword?: string;

  constructor(data?: IUsersPostBodyRequestData) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.newPassword = data['newPassword'];
    }
  }

  static fromJS(data: any): UsersPostBodyRequestData {
    data = typeof data === 'object' ? data : {};
    let result = new UsersPostBodyRequestData();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['newPassword'] = this.newPassword;
    super.toJSON(data);
    return data;
  }
}

export interface IUsersPostBodyRequestData extends ICreateUser {
  newPassword?: string;
}

export class ResponseData extends FtpSettings implements IResponseData {
  pkiPubKey?: string;

  constructor(data?: IResponseData) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      this.pkiPubKey = data['pkiPubKey'];
    }
  }

  static fromJS(data: any): ResponseData {
    data = typeof data === 'object' ? data : {};
    let result = new ResponseData();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['pkiPubKey'] = this.pkiPubKey;
    super.toJSON(data);
    return data;
  }
}

export interface IResponseData extends IFtpSettings {
  pkiPubKey?: string;
}

export class ResponseData2 implements IResponseData2 {
  jobId?: string;

  constructor(data?: IResponseData2) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.jobId = data['jobId'];
    }
  }

  static fromJS(data: any): ResponseData2 {
    data = typeof data === 'object' ? data : {};
    let result = new ResponseData2();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['jobId'] = this.jobId;
    return data;
  }
}

export interface IResponseData2 {
  jobId?: string;
}

export class ResponseData3 implements IResponseData3 {
  jobId?: string;

  constructor(data?: IResponseData3) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      this.jobId = data['jobId'];
    }
  }

  static fromJS(data: any): ResponseData3 {
    data = typeof data === 'object' ? data : {};
    let result = new ResponseData3();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data['jobId'] = this.jobId;
    return data;
  }
}

export interface IResponseData3 {
  jobId?: string;
}

export class ResponseData4 implements IResponseData4 {
  constructor(data?: IResponseData4) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {}

  static fromJS(data: any): ResponseData4 {
    data = typeof data === 'object' ? data : {};
    let result = new ResponseData4();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    return data;
  }
}

export interface IResponseData4 {}

export class ResponseData5 extends SystemDateTime implements IResponseData5 {
  availableZones?: string[];

  constructor(data?: IResponseData5) {
    super(data);
  }

  init(data?: any) {
    super.init(data);
    if (data) {
      if (Array.isArray(data['availableZones'])) {
        this.availableZones = [] as any;
        for (let item of data['availableZones'])
          this.availableZones!.push(item);
      }
    }
  }

  static fromJS(data: any): ResponseData5 {
    data = typeof data === 'object' ? data : {};
    let result = new ResponseData5();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.availableZones)) {
      data['availableZones'] = [];
      for (let item of this.availableZones) data['availableZones'].push(item);
    }
    super.toJSON(data);
    return data;
  }
}

export interface IResponseData5 extends ISystemDateTime {
  availableZones?: string[];
}

export class ResponseData6 implements IResponseData6 {
  usergroups?: string[];

  constructor(data?: IResponseData6) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(data?: any) {
    if (data) {
      if (Array.isArray(data['usergroups'])) {
        this.usergroups = [] as any;
        for (let item of data['usergroups']) this.usergroups!.push(item);
      }
    }
  }

  static fromJS(data: any): ResponseData6 {
    data = typeof data === 'object' ? data : {};
    let result = new ResponseData6();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    if (Array.isArray(this.usergroups)) {
      data['usergroups'] = [];
      for (let item of this.usergroups) data['usergroups'].push(item);
    }
    return data;
  }
}

export interface IResponseData6 {
  usergroups?: string[];
}

export enum DayOfWeek {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday'
}

export enum DayOfWeek2 {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday'
}

export enum Permissions2Setting {
  Empty = ''
}

export enum Permissions3Setting {
  Empty = ''
}

export const PERSONAL_INFO_PHONE: string[] = ['Alltel', 'ATT','Boost', 'Comcast', 'Qwest', 'Sprint', 'Tmobile', 'Trac', 'Verizon', 'Virgin', 'Rogers', 'Vodacom', 'MTNGroup', 'Custom', 'None'];
//   Alltel = 'Alltel',
//   ATT = 'ATT',
//   Boost = 'Boost',
//   Comcast = 'Comcast',
//   Qwest = 'Qwest',
//   Sprint = 'Sprint',
//   Tmobile = 'Tmobile',
//   Trac = 'Trac',
//   Verizon = 'Verizon',
//   Virgin = 'Virgin',
//   Rogers = 'Rogers',
//   Vodacom = 'Vodacom',
//   MTNGroup = 'MTNGroup',
//   Custom = 'Custom',
//   None = 'None'
// }

export class ApiException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isApiException = true;

  static isApiException(obj: any): obj is ApiException {
    return obj.isApiException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): Observable<any> {
  if (result !== null && result !== undefined) return _observableThrow(result);
  else
    return _observableThrow(
      new ApiException(message, status, response, headers, null)
    );
}

function blobToText(blob: any): Observable<string> {
  return new Observable<string>((observer: any) => {
    if (!blob) {
      observer.next('');
      observer.complete();
    } else {
      let reader = new FileReader();
      reader.onload = event => {
        observer.next((<any>event.target).result);
        observer.complete();
      };
      reader.readAsText(blob);
    }
  });
}
