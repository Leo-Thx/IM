import { Injectable } from "@angular/core";
import { NetworkService } from 'src/app/share/network/network.service';

@Injectable()
export class ChatService {
    constructor( protected networkSvc: NetworkService ) {
        
    }
}
