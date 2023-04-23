import { Directive, Input, HostListener, HostBinding, Inject, } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
export class MdbScrollspyLinkDirective {
    constructor(cdRef, document) {
        this.cdRef = cdRef;
        this.document = document;
        this._scrollIntoView = true;
        this.scrollspyLink = true;
        this.active = false;
    }
    get scrollIntoView() {
        return this._scrollIntoView;
    }
    set scrollIntoView(value) {
        this._scrollIntoView = value;
    }
    get section() {
        return this._section;
    }
    set section(value) {
        if (value) {
            this._section = value;
        }
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }
    onClick() {
        if (this.section && this.scrollIntoView === true) {
            this.section.scrollIntoView();
        }
    }
    detectChanges() {
        this.cdRef.detectChanges();
    }
    assignSectionToId() {
        this.section = this.document.documentElement.querySelector(`#${this.id}`);
    }
    ngOnInit() {
        this.assignSectionToId();
    }
}
MdbScrollspyLinkDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyLinkDirective, deps: [{ token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MdbScrollspyLinkDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbScrollspyLinkDirective, selector: "[mdbScrollspyLink]", inputs: { scrollIntoView: "scrollIntoView", id: ["mdbScrollspyLink", "id"] }, host: { listeners: { "click": "onClick()" }, properties: { "class.scrollspy-link": "this.scrollspyLink", "class.active": "this.active" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyLinkDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbScrollspyLink]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; }, propDecorators: { scrollIntoView: [{
                type: Input
            }], id: [{
                type: Input,
                args: ['mdbScrollspyLink']
            }], scrollspyLink: [{
                type: HostBinding,
                args: ['class.scrollspy-link']
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }], onClick: [{
                type: HostListener,
                args: ['click', []]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LWxpbmsuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3Njcm9sbHNweS9zY3JvbGxzcHktbGluay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFFVCxLQUFLLEVBQ0wsWUFBWSxFQUNaLFdBQVcsRUFFWCxNQUFNLEdBQ1AsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOztBQU0zQyxNQUFNLE9BQU8seUJBQXlCO0lBcUJwQyxZQUFvQixLQUF3QixFQUE0QixRQUFhO1FBQWpFLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQTRCLGFBQVEsR0FBUixRQUFRLENBQUs7UUFiN0Usb0JBQWUsR0FBRyxJQUFJLENBQUM7UUEwQi9CLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBR3JCLFdBQU0sR0FBRyxLQUFLLENBQUM7SUFoQnlFLENBQUM7SUFwQnpGLElBQ0ksY0FBYztRQUNoQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUNELElBQUksY0FBYyxDQUFDLEtBQWM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7SUFDL0IsQ0FBQztJQUdELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxPQUFPLENBQUMsS0FBa0I7UUFDNUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN2QjtJQUNILENBQUM7SUFNRCxJQUNJLEVBQUU7UUFDSixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLEtBQWE7UUFDbEIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUNsQjtJQUNILENBQUM7SUFTRCxPQUFPO1FBQ0wsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxjQUFjLEtBQUssSUFBSSxFQUFFO1lBQ2hELElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQixDQUFDOztzSEF4RFUseUJBQXlCLG1EQXFCa0IsUUFBUTswR0FyQm5ELHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQUpyQyxTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLG9CQUFvQjtpQkFDL0I7OzBCQXNCZ0QsTUFBTTsyQkFBQyxRQUFROzRDQW5CMUQsY0FBYztzQkFEakIsS0FBSztnQkF1QkYsRUFBRTtzQkFETCxLQUFLO3VCQUFDLGtCQUFrQjtnQkFXekIsYUFBYTtzQkFEWixXQUFXO3VCQUFDLHNCQUFzQjtnQkFJbkMsTUFBTTtzQkFETCxXQUFXO3VCQUFDLGNBQWM7Z0JBSTNCLE9BQU87c0JBRE4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgT25Jbml0LFxuICBJbnB1dCxcbiAgSG9zdExpc3RlbmVyLFxuICBIb3N0QmluZGluZyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIEluamVjdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJTY3JvbGxzcHlMaW5rXScsXG59KVxuZXhwb3J0IGNsYXNzIE1kYlNjcm9sbHNweUxpbmtEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBnZXQgc2Nyb2xsSW50b1ZpZXcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbEludG9WaWV3O1xuICB9XG4gIHNldCBzY3JvbGxJbnRvVmlldyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3Njcm9sbEludG9WaWV3ID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfc2Nyb2xsSW50b1ZpZXcgPSB0cnVlO1xuXG4gIGdldCBzZWN0aW9uKCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fc2VjdGlvbjtcbiAgfVxuICBzZXQgc2VjdGlvbih2YWx1ZTogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3NlY3Rpb24gPSB2YWx1ZTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfc2VjdGlvbjogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSkge31cblxuICBASW5wdXQoJ21kYlNjcm9sbHNweUxpbmsnKVxuICBnZXQgaWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5faWQ7XG4gIH1cbiAgc2V0IGlkKG5ld0lkOiBzdHJpbmcpIHtcbiAgICBpZiAobmV3SWQpIHtcbiAgICAgIHRoaXMuX2lkID0gbmV3SWQ7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5zY3JvbGxzcHktbGluaycpXG4gIHNjcm9sbHNweUxpbmsgPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJylcbiAgYWN0aXZlID0gZmFsc2U7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbXSlcbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWN0aW9uICYmIHRoaXMuc2Nyb2xsSW50b1ZpZXcgPT09IHRydWUpIHtcbiAgICAgIHRoaXMuc2VjdGlvbi5zY3JvbGxJbnRvVmlldygpO1xuICAgIH1cbiAgfVxuXG4gIGRldGVjdENoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5jZFJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBhc3NpZ25TZWN0aW9uVG9JZCgpOiB2b2lkIHtcbiAgICB0aGlzLnNlY3Rpb24gPSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKGAjJHt0aGlzLmlkfWApO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5hc3NpZ25TZWN0aW9uVG9JZCgpO1xuICB9XG59XG4iXX0=