import { Injectable } from "@angular/core";
import { ChatService } from '../chat.service';
import { NetworkService } from 'src/app/share/network/network.service';

@Injectable()
export class ChatInputService extends ChatService {
    constructor( protected networkSvc: NetworkService ) {
        super(networkSvc);
    }
}
