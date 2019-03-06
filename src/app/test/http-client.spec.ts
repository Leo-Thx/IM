import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe("HttpClient Testing", ()=>{
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController); 
    });

    it('can test Httpclient.get', ()=>{
        
    });
});
