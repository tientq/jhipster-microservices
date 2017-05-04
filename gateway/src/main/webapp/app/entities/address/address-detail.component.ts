import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , JhiLanguageService  } from 'ng-jhipster';

import { Address } from './address.model';
import { AddressService } from './address.service';

@Component({
    selector: 'jhi-address-detail',
    templateUrl: './address-detail.component.html'
})
export class AddressDetailComponent implements OnInit, OnDestroy {

    address: Address;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private addressService: AddressService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['address']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAddresses();
    }

    load(id) {
        this.addressService.find(id).subscribe((address) => {
            this.address = address;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAddresses() {
        this.eventSubscriber = this.eventManager.subscribe('addressListModification', (response) => this.load(this.address.id));
    }
}
