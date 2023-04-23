import { AfterContentInit, EventEmitter, OnDestroy, OnInit, QueryList } from '@angular/core';
import { MdbScrollspyLinkDirective } from './scrollspy-link.directive';
import { MdbScrollspyService } from './scrollspy.service';
import { Subject, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MdbScrollspyDirective implements OnInit, AfterContentInit, OnDestroy {
    private scrollSpyService;
    links: QueryList<MdbScrollspyLinkDirective>;
    readonly _destroy$: Subject<void>;
    get id(): string;
    set id(newId: string);
    private _id;
    activeLinkChange: EventEmitter<any>;
    activeSub: Subscription;
    constructor(scrollSpyService: MdbScrollspyService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbScrollspyDirective, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbScrollspyDirective, "[mdbScrollspy]", never, { "id": "mdbScrollspy"; }, { "activeLinkChange": "activeLinkChange"; }, ["links"], ["*"], false, never>;
}
