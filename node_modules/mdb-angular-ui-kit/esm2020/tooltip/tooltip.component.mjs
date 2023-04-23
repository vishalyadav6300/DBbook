import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class MdbTooltipComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this._hidden = new Subject();
        this.animationState = 'hidden';
    }
    markForCheck() {
        this._cdRef.markForCheck();
    }
    onAnimationEnd(event) {
        if (event.toState === 'hidden') {
            this._hidden.next();
        }
    }
}
MdbTooltipComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbTooltipComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbTooltipComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbTooltipComponent, selector: "mdb-tooltip", inputs: { title: "title", html: "html", animation: "animation" }, ngImport: i0, template: "<div\n  *ngIf=\"html\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n  [innerHTML]=\"title\"\n  class=\"tooltip-inner\"\n></div>\n<div\n  *ngIf=\"!html\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n  class=\"tooltip-inner\"\n>\n  {{ title }}\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('visible => hidden', animate('150ms linear')),
            transition(':enter', animate('150ms linear')),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbTooltipComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-tooltip', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('hidden', style({ opacity: 0 })),
                            transition('visible => hidden', animate('150ms linear')),
                            transition(':enter', animate('150ms linear')),
                        ]),
                    ], template: "<div\n  *ngIf=\"html\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n  [innerHTML]=\"title\"\n  class=\"tooltip-inner\"\n></div>\n<div\n  *ngIf=\"!html\"\n  [@fade]=\"animationState\"\n  (@fade.done)=\"onAnimationEnd($event)\"\n  [@.disabled]=\"!animation\"\n  class=\"tooltip-inner\"\n>\n  {{ title }}\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { title: [{
                type: Input
            }], html: [{
                type: Input
            }], animation: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdG9vbHRpcC90b29sdGlwLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90b29sdGlwL3Rvb2x0aXAuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFxQixTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFrQixNQUFNLHFCQUFxQixDQUFDO0FBQ2pHLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQWMvQixNQUFNLE9BQU8sbUJBQW1CO0lBUzlCLFlBQW9CLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBSnBDLFlBQU8sR0FBa0IsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUVoRCxtQkFBYyxHQUFHLFFBQVEsQ0FBQztJQUVzQixDQUFDO0lBRWpELFlBQVk7UUFDVixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxjQUFjLENBQUMsS0FBcUI7UUFDbEMsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQzs7Z0hBbkJVLG1CQUFtQjtvR0FBbkIsbUJBQW1CLHFIQ2hCaEMscVhBaUJBLGtJRFZjO1FBQ1YsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNkLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3hELFVBQVUsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzlDLENBQUM7S0FDSDsyRkFFVSxtQkFBbUI7a0JBYi9CLFNBQVM7K0JBQ0UsYUFBYSxtQkFFTix1QkFBdUIsQ0FBQyxNQUFNLGNBQ25DO3dCQUNWLE9BQU8sQ0FBQyxNQUFNLEVBQUU7NEJBQ2QsS0FBSyxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdkMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDdEMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs0QkFDeEQsVUFBVSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7eUJBQzlDLENBQUM7cUJBQ0g7d0dBR1EsS0FBSztzQkFBYixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiwgc3RhdGUsIEFuaW1hdGlvbkV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItdG9vbHRpcCcsXG4gIHRlbXBsYXRlVXJsOiAndG9vbHRpcC5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBhbmltYXRpb25zOiBbXG4gICAgdHJpZ2dlcignZmFkZScsIFtcbiAgICAgIHN0YXRlKCd2aXNpYmxlJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSxcbiAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA9PiBoaWRkZW4nLCBhbmltYXRlKCcxNTBtcyBsaW5lYXInKSksXG4gICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBhbmltYXRlKCcxNTBtcyBsaW5lYXInKSksXG4gICAgXSksXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRvb2x0aXBDb21wb25lbnQge1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBodG1sOiBib29sZWFuO1xuICBASW5wdXQoKSBhbmltYXRpb246IGJvb2xlYW47XG5cbiAgcmVhZG9ubHkgX2hpZGRlbjogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgYW5pbWF0aW9uU3RhdGUgPSAnaGlkZGVuJztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG5cbiAgbWFya0ZvckNoZWNrKCk6IHZvaWQge1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgb25BbmltYXRpb25FbmQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LnRvU3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICB0aGlzLl9oaWRkZW4ubmV4dCgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdlxuICAqbmdJZj1cImh0bWxcIlxuICBbQGZhZGVdPVwiYW5pbWF0aW9uU3RhdGVcIlxuICAoQGZhZGUuZG9uZSk9XCJvbkFuaW1hdGlvbkVuZCgkZXZlbnQpXCJcbiAgW0AuZGlzYWJsZWRdPVwiIWFuaW1hdGlvblwiXG4gIFtpbm5lckhUTUxdPVwidGl0bGVcIlxuICBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIlxuPjwvZGl2PlxuPGRpdlxuICAqbmdJZj1cIiFodG1sXCJcbiAgW0BmYWRlXT1cImFuaW1hdGlvblN0YXRlXCJcbiAgKEBmYWRlLmRvbmUpPVwib25BbmltYXRpb25FbmQoJGV2ZW50KVwiXG4gIFtALmRpc2FibGVkXT1cIiFhbmltYXRpb25cIlxuICBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIlxuPlxuICB7eyB0aXRsZSB9fVxuPC9kaXY+XG4iXX0=