import { Component, HostBinding, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class MdbCarouselItemComponent {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.interval = null;
        this.carouselItem = true;
        this.active = false;
        this.next = false;
        this.prev = false;
        this.start = false;
        this.end = false;
    }
    get host() {
        return this._elementRef.nativeElement;
    }
}
MdbCarouselItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCarouselItemComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
MdbCarouselItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbCarouselItemComponent, selector: "mdb-carousel-item", inputs: { interval: "interval" }, host: { properties: { "class.carousel-item": "this.carouselItem", "class.active": "this.active", "class.carousel-item-next": "this.next", "class.carousel-item-prev": "this.prev", "class.carousel-item-start": "this.start", "class.carousel-item-end": "this.end" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCarouselItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-carousel-item',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { interval: [{
                type: Input
            }], carouselItem: [{
                type: HostBinding,
                args: ['class.carousel-item']
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }], next: [{
                type: HostBinding,
                args: ['class.carousel-item-next']
            }], prev: [{
                type: HostBinding,
                args: ['class.carousel-item-prev']
            }], start: [{
                type: HostBinding,
                args: ['class.carousel-item-start']
            }], end: [{
                type: HostBinding,
                args: ['class.carousel-item-end']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvY2Fyb3VzZWwvY2Fyb3VzZWwtaXRlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQU0xRSxNQUFNLE9BQU8sd0JBQXdCO0lBaUJuQyxZQUFvQixXQUF1QjtRQUF2QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQWhCbEMsYUFBUSxHQUFrQixJQUFJLENBQUM7UUFHeEMsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFFUyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRUgsU0FBSSxHQUFHLEtBQUssQ0FBQztRQUNiLFNBQUksR0FBRyxLQUFLLENBQUM7UUFDWixVQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLFFBQUcsR0FBRyxLQUFLLENBQUM7SUFNTixDQUFDO0lBSi9DLElBQUksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7SUFDeEMsQ0FBQzs7cUhBZlUsd0JBQXdCO3lHQUF4Qix3QkFBd0Isb1dBRnpCLDJCQUEyQjsyRkFFMUIsd0JBQXdCO2tCQUpwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLFFBQVEsRUFBRSwyQkFBMkI7aUJBQ3RDO2lHQUVVLFFBQVE7c0JBQWhCLEtBQUs7Z0JBR04sWUFBWTtzQkFEWCxXQUFXO3VCQUFDLHFCQUFxQjtnQkFHTCxNQUFNO3NCQUFsQyxXQUFXO3VCQUFDLGNBQWM7Z0JBRWMsSUFBSTtzQkFBNUMsV0FBVzt1QkFBQywwQkFBMEI7Z0JBQ0UsSUFBSTtzQkFBNUMsV0FBVzt1QkFBQywwQkFBMEI7Z0JBQ0csS0FBSztzQkFBOUMsV0FBVzt1QkFBQywyQkFBMkI7Z0JBQ0EsR0FBRztzQkFBMUMsV0FBVzt1QkFBQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItY2Fyb3VzZWwtaXRlbScsXG4gIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PicsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkNhcm91c2VsSXRlbUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGludGVydmFsOiBudW1iZXIgfCBudWxsID0gbnVsbDtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNhcm91c2VsLWl0ZW0nKVxuICBjYXJvdXNlbEl0ZW0gPSB0cnVlO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWN0aXZlJykgYWN0aXZlID0gZmFsc2U7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtLW5leHQnKSBuZXh0ID0gZmFsc2U7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2Fyb3VzZWwtaXRlbS1wcmV2JykgcHJldiA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNhcm91c2VsLWl0ZW0tc3RhcnQnKSBzdGFydCA9IGZhbHNlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmNhcm91c2VsLWl0ZW0tZW5kJykgZW5kID0gZmFsc2U7XG5cbiAgZ2V0IGhvc3QoKTogSFRNTEVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7fVxufVxuIl19