import { ChangeDetectorRef, TemplateRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MdbPopoverComponent {
    private _cdRef;
    title: string;
    content: string | TemplateRef<any>;
    animation: boolean;
    get isContentTemplate(): boolean;
    readonly _hidden: Subject<void>;
    animationState: string;
    constructor(_cdRef: ChangeDetectorRef);
    markForCheck(): void;
    onAnimationEnd(event: AnimationEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbPopoverComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbPopoverComponent, "mdb-popover", never, { "title": "title"; "content": "content"; "animation": "animation"; }, {}, never, never, false, never>;
}
