import { ChangeDetectorRef } from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class MdbTooltipComponent {
    private _cdRef;
    title: string;
    html: boolean;
    animation: boolean;
    readonly _hidden: Subject<void>;
    animationState: string;
    constructor(_cdRef: ChangeDetectorRef);
    markForCheck(): void;
    onAnimationEnd(event: AnimationEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MdbTooltipComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MdbTooltipComponent, "mdb-tooltip", never, { "title": "title"; "html": "html"; "animation": "animation"; }, {}, never, never, false, never>;
}
