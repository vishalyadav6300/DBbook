import { Component, ContentChildren, EventEmitter, Input, Output, } from '@angular/core';
import { MdbScrollspyLinkDirective } from './scrollspy-link.directive';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "./scrollspy.service";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbScrollspyDirective {
    constructor(scrollSpyService, _elementRef, _renderer) {
        this.scrollSpyService = scrollSpyService;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._destroy$ = new Subject();
        this._collapsible = false;
        this.activeLinkChange = new EventEmitter();
        this.collapsibleElementHeight = 0;
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }
    get collapsible() {
        return this._collapsible;
    }
    set collapsible(value) {
        this._collapsible = coerceBooleanProperty(value);
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    ngOnInit() {
        this.collapsibleElementHeight = this.host.getBoundingClientRect().height;
        this.activeSub = this.scrollSpyService.active$
            .pipe(takeUntil(this._destroy$), distinctUntilChanged())
            .subscribe((activeLink) => {
            this.activeLinkChange.emit(activeLink);
            if (this.collapsible) {
                this.styleCollapsibleElement();
            }
        });
    }
    ngAfterContentInit() {
        this.scrollSpyService.addScrollspy({ id: this.id, links: this.links });
    }
    ngOnDestroy() {
        this.scrollSpyService.removeScrollspy(this.id);
        this._destroy$.next();
        this._destroy$.complete();
    }
    styleCollapsibleElement() {
        this._renderer.setStyle(this.host, 'overflow', 'hidden');
        this._renderer.setStyle(this.host, 'transition', 'height 0.2s ease-in-out');
        this._renderer.setStyle(this.host, 'flex-wrap', 'nowrap');
        const hostSiblings = this.getAllSiblings(this.host);
        const isAnySiblingActive = hostSiblings.some((element) => {
            return element.classList.contains('active');
        });
        if (this.collapsible && isAnySiblingActive) {
            this._renderer.setStyle(this.host, 'height', `${this.collapsibleElementHeight}px`);
        }
        else if (this.collapsible && !isAnySiblingActive) {
            this._renderer.setStyle(this.host, 'height', '0px');
        }
    }
    getAllSiblings(element) {
        let siblings = [];
        if (!element.parentNode) {
            return siblings;
        }
        let sibling = element.parentNode.firstElementChild;
        do {
            if (sibling != element) {
                siblings.push(sibling);
            }
        } while ((sibling = sibling.nextElementSibling));
        return siblings;
    }
}
MdbScrollspyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyDirective, deps: [{ token: i1.MdbScrollspyService }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
MdbScrollspyDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbScrollspyDirective, selector: "[mdbScrollspy]", inputs: { id: ["mdbScrollspy", "id"], collapsible: "collapsible" }, outputs: { activeLinkChange: "activeLinkChange" }, queries: [{ propertyName: "links", predicate: MdbScrollspyLinkDirective, descendants: true }], ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyDirective, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: '[mdbScrollspy]',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i1.MdbScrollspyService }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { links: [{
                type: ContentChildren,
                args: [MdbScrollspyLinkDirective, { descendants: true }]
            }], id: [{
                type: Input,
                args: ['mdbScrollspy']
            }], collapsible: [{
                type: Input
            }], activeLinkChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9zY3JvbGxzcHkvc2Nyb2xsc3B5LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUNULGVBQWUsRUFFZixZQUFZLEVBQ1osS0FBSyxFQUdMLE1BQU0sR0FHUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7OztBQU85RCxrRUFBa0U7QUFDbEUsTUFBTSxPQUFPLHFCQUFxQjtJQWlDaEMsWUFDVSxnQkFBcUMsRUFDckMsV0FBdUIsRUFDdkIsU0FBb0I7UUFGcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFxQjtRQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN2QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBaENyQixjQUFTLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUF1QmhELGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRW5CLHFCQUFnQixHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBY3hFLDZCQUF3QixHQUFHLENBQUMsQ0FBQztJQU4xQixDQUFDO0lBL0JKLElBQ0ksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxFQUFFLENBQUMsS0FBYTtRQUNsQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQztJQUlELElBQ0ksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBYztRQUM1QixJQUFJLENBQUMsWUFBWSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFjRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFJRCxRQUFRO1FBQ04sSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDekUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTzthQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDO2FBQ3ZELFNBQVMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdkMsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQzthQUNoQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyx1QkFBdUI7UUFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUUseUJBQXlCLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUUxRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRCxNQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN2RCxPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLGtCQUFrQixFQUFFO1lBQzFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixJQUFJLENBQUMsQ0FBQztTQUNwRjthQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1lBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQztJQUVPLGNBQWMsQ0FBQyxPQUFvQjtRQUN6QyxJQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7WUFDdkIsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFDRCxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDO1FBQ25ELEdBQUc7WUFDRCxJQUFJLE9BQU8sSUFBSSxPQUFPLEVBQUU7Z0JBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEI7U0FDRixRQUFRLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO1FBQ2pELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7O2tIQWhHVSxxQkFBcUI7c0dBQXJCLHFCQUFxQixtTUFDZix5QkFBeUIsZ0RBSmhDLDJCQUEyQjsyRkFHMUIscUJBQXFCO2tCQU5qQyxTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDJCQUEyQjtpQkFDdEM7MkpBSUMsS0FBSztzQkFESixlQUFlO3VCQUFDLHlCQUF5QixFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtnQkFNN0QsRUFBRTtzQkFETCxLQUFLO3VCQUFDLGNBQWM7Z0JBY2pCLFdBQVc7c0JBRGQsS0FBSztnQkFVSSxnQkFBZ0I7c0JBQXpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWRiU2Nyb2xsc3B5TGlua0RpcmVjdGl2ZSB9IGZyb20gJy4vc2Nyb2xsc3B5LWxpbmsuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1kYlNjcm9sbHNweVNlcnZpY2UgfSBmcm9tICcuL3Njcm9sbHNweS5zZXJ2aWNlJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBDb21wb25lbnQoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJTY3JvbGxzcHldJyxcbiAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+Jyxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBNZGJTY3JvbGxzcHlEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBDb250ZW50Q2hpbGRyZW4oTWRiU2Nyb2xsc3B5TGlua0RpcmVjdGl2ZSwgeyBkZXNjZW5kYW50czogdHJ1ZSB9KVxuICBsaW5rczogUXVlcnlMaXN0PE1kYlNjcm9sbHNweUxpbmtEaXJlY3RpdmU+O1xuXG4gIHJlYWRvbmx5IF9kZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgQElucHV0KCdtZGJTY3JvbGxzcHknKVxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cblxuICBzZXQgaWQobmV3SWQ6IHN0cmluZykge1xuICAgIGlmIChuZXdJZCkge1xuICAgICAgdGhpcy5faWQgPSBuZXdJZDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBjb2xsYXBzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY29sbGFwc2libGU7XG4gIH1cbiAgc2V0IGNvbGxhcHNpYmxlKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fY29sbGFwc2libGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29sbGFwc2libGUgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgYWN0aXZlTGlua0NoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBhY3RpdmVTdWI6IFN1YnNjcmlwdGlvbjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHNjcm9sbFNweVNlcnZpY2U6IE1kYlNjcm9sbHNweVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge31cblxuICBnZXQgaG9zdCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIGNvbGxhcHNpYmxlRWxlbWVudEhlaWdodCA9IDA7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsYXBzaWJsZUVsZW1lbnRIZWlnaHQgPSB0aGlzLmhvc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIHRoaXMuYWN0aXZlU3ViID0gdGhpcy5zY3JvbGxTcHlTZXJ2aWNlLmFjdGl2ZSRcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JCksIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCkpXG4gICAgICAuc3Vic2NyaWJlKChhY3RpdmVMaW5rKSA9PiB7XG4gICAgICAgIHRoaXMuYWN0aXZlTGlua0NoYW5nZS5lbWl0KGFjdGl2ZUxpbmspO1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzaWJsZSkge1xuICAgICAgICAgIHRoaXMuc3R5bGVDb2xsYXBzaWJsZUVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zY3JvbGxTcHlTZXJ2aWNlLmFkZFNjcm9sbHNweSh7IGlkOiB0aGlzLmlkLCBsaW5rczogdGhpcy5saW5rcyB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuc2Nyb2xsU3B5U2VydmljZS5yZW1vdmVTY3JvbGxzcHkodGhpcy5pZCk7XG4gICAgdGhpcy5fZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuX2Rlc3Ryb3kkLmNvbXBsZXRlKCk7XG4gIH1cblxuICBwcml2YXRlIHN0eWxlQ29sbGFwc2libGVFbGVtZW50KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ292ZXJmbG93JywgJ2hpZGRlbicpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ3RyYW5zaXRpb24nLCAnaGVpZ2h0IDAuMnMgZWFzZS1pbi1vdXQnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdmbGV4LXdyYXAnLCAnbm93cmFwJyk7XG5cbiAgICBjb25zdCBob3N0U2libGluZ3MgPSB0aGlzLmdldEFsbFNpYmxpbmdzKHRoaXMuaG9zdCk7XG4gICAgY29uc3QgaXNBbnlTaWJsaW5nQWN0aXZlID0gaG9zdFNpYmxpbmdzLnNvbWUoKGVsZW1lbnQpID0+IHtcbiAgICAgIHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJyk7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5jb2xsYXBzaWJsZSAmJiBpc0FueVNpYmxpbmdBY3RpdmUpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2hlaWdodCcsIGAke3RoaXMuY29sbGFwc2libGVFbGVtZW50SGVpZ2h0fXB4YCk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmNvbGxhcHNpYmxlICYmICFpc0FueVNpYmxpbmdBY3RpdmUpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2hlaWdodCcsICcwcHgnKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdldEFsbFNpYmxpbmdzKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XG4gICAgbGV0IHNpYmxpbmdzID0gW107XG4gICAgaWYgKCFlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIHJldHVybiBzaWJsaW5ncztcbiAgICB9XG4gICAgbGV0IHNpYmxpbmcgPSBlbGVtZW50LnBhcmVudE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQ7XG4gICAgZG8ge1xuICAgICAgaWYgKHNpYmxpbmcgIT0gZWxlbWVudCkge1xuICAgICAgICBzaWJsaW5ncy5wdXNoKHNpYmxpbmcpO1xuICAgICAgfVxuICAgIH0gd2hpbGUgKChzaWJsaW5nID0gc2libGluZy5uZXh0RWxlbWVudFNpYmxpbmcpKTtcbiAgICByZXR1cm4gc2libGluZ3M7XG4gIH1cbn1cbiJdfQ==