import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

    constructor() {}

    canActivate() {
        console.log('test')
        return false;
    }
}