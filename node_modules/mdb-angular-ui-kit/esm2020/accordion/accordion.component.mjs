import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Input, } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MdbAccordionItemComponent } from './accordion-item.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
export class MdbAccordionComponent {
    constructor() {
        this._borderless = false;
        this._flush = false;
        this._multiple = false;
        this.accordion = true;
    }
    get borderless() {
        return this._borderless;
    }
    set borderless(value) {
        this._borderless = coerceBooleanProperty(value);
    }
    get flush() {
        return this._flush;
    }
    set flush(value) {
        this._flush = coerceBooleanProperty(value);
    }
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    get addBorderlessClass() {
        return this.borderless;
    }
    get addFlushClass() {
        return this.flush;
    }
    ngAfterContentInit() {
        this.items.changes
            .pipe(startWith(this.items), switchMap((items) => {
            return merge(...items.map((item) => item.show$));
        }))
            .subscribe((clickedItem) => this._handleMultipleItems(clickedItem));
    }
    _handleMultipleItems(clickedItem) {
        if (!this.multiple) {
            const itemsToClose = this.items.filter((item) => item !== clickedItem && !item._collapsed);
            itemsToClose.forEach((item) => item.hide());
        }
    }
}
MdbAccordionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbAccordionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbAccordionComponent, selector: "mdb-accordion", inputs: { borderless: "borderless", flush: "flush", multiple: "multiple" }, host: { properties: { "class.accordion": "this.accordion", "class.accordion-borderless": "this.addBorderlessClass", "class.accordion-flush": "this.addFlushClass" } }, queries: [{ propertyName: "items", predicate: MdbAccordionItemComponent }], ngImport: i0, template: "<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-accordion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { items: [{
                type: ContentChildren,
                args: [MdbAccordionItemComponent]
            }], borderless: [{
                type: Input
            }], flush: [{
                type: Input
            }], multiple: [{
                type: Input
            }], accordion: [{
                type: HostBinding,
                args: ['class.accordion']
            }], addBorderlessClass: [{
                type: HostBinding,
                args: ['class.accordion-borderless']
            }], addFlushClass: [{
                type: HostBinding,
                args: ['class.accordion-flush']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hY2NvcmRpb24vYWNjb3JkaW9uLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9hY2NvcmRpb24vYWNjb3JkaW9uLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULGVBQWUsRUFDZixXQUFXLEVBQ1gsS0FBSyxHQUVOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM3QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBTzVFLE1BQU0sT0FBTyxxQkFBcUI7SUEwQ2hDO1FBaENRLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBU3BCLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFTZixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRU0sY0FBUyxHQUFHLElBQUksQ0FBQztJQVlsQyxDQUFDO0lBdkNoQixJQUNJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUNELElBQUksVUFBVSxDQUFDLEtBQWM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBR0QsSUFDSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFjO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUdELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFLRCxJQUNJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBSUQsa0JBQWtCO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTzthQUNmLElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNyQixTQUFTLENBQUMsQ0FBQyxLQUEyQyxFQUFFLEVBQUU7WUFDeEQsT0FBTyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBK0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDLENBQ0g7YUFDQSxTQUFTLENBQUMsQ0FBQyxXQUFzQyxFQUFFLEVBQUUsQ0FDcEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUN2QyxDQUFDO0lBQ04sQ0FBQztJQUVPLG9CQUFvQixDQUFDLFdBQXNDO1FBQ2pFLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNwQyxDQUFDLElBQStCLEVBQUUsRUFBRSxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUM5RSxDQUFDO1lBRUYsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQStCLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7a0hBakVVLHFCQUFxQjtzR0FBckIscUJBQXFCLDhUQUNmLHlCQUF5Qiw2QkNwQjVDLDZCQUNBOzJGRGtCYSxxQkFBcUI7a0JBTGpDLFNBQVM7K0JBQ0UsZUFBZSxtQkFFUix1QkFBdUIsQ0FBQyxNQUFNOzBFQUdILEtBQUs7c0JBQWhELGVBQWU7dUJBQUMseUJBQXlCO2dCQUd0QyxVQUFVO3NCQURiLEtBQUs7Z0JBVUYsS0FBSztzQkFEUixLQUFLO2dCQVVGLFFBQVE7c0JBRFgsS0FBSztnQkFTMEIsU0FBUztzQkFBeEMsV0FBVzt1QkFBQyxpQkFBaUI7Z0JBRzFCLGtCQUFrQjtzQkFEckIsV0FBVzt1QkFBQyw0QkFBNEI7Z0JBTXJDLGFBQWE7c0JBRGhCLFdBQVc7dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIFF1ZXJ5TGlzdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBzdGFydFdpdGgsIHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IG1lcmdlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9hY2NvcmRpb24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItYWNjb3JkaW9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FjY29yZGlvbi5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJBY2NvcmRpb25Db21wb25lbnQgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0IHtcbiAgQENvbnRlbnRDaGlsZHJlbihNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50KSBpdGVtczogUXVlcnlMaXN0PE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQ+O1xuXG4gIEBJbnB1dCgpXG4gIGdldCBib3JkZXJsZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9ib3JkZXJsZXNzO1xuICB9XG4gIHNldCBib3JkZXJsZXNzKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fYm9yZGVybGVzcyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYm9yZGVybGVzcyA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBmbHVzaCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZmx1c2g7XG4gIH1cbiAgc2V0IGZsdXNoKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZmx1c2ggPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2ZsdXNoID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgZ2V0IG11bHRpcGxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9tdWx0aXBsZTtcbiAgfVxuICBzZXQgbXVsdGlwbGUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9tdWx0aXBsZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfbXVsdGlwbGUgPSBmYWxzZTtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjY29yZGlvbicpIGFjY29yZGlvbiA9IHRydWU7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY2NvcmRpb24tYm9yZGVybGVzcycpXG4gIGdldCBhZGRCb3JkZXJsZXNzQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYm9yZGVybGVzcztcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuYWNjb3JkaW9uLWZsdXNoJylcbiAgZ2V0IGFkZEZsdXNoQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZmx1c2g7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuaXRlbXMuY2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh0aGlzLml0ZW1zKSxcbiAgICAgICAgc3dpdGNoTWFwKChpdGVtczogUXVlcnlMaXN0PE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQ+KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG1lcmdlKC4uLml0ZW1zLm1hcCgoaXRlbTogTWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudCkgPT4gaXRlbS5zaG93JCkpO1xuICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoY2xpY2tlZEl0ZW06IE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQpID0+XG4gICAgICAgIHRoaXMuX2hhbmRsZU11bHRpcGxlSXRlbXMoY2xpY2tlZEl0ZW0pXG4gICAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlTXVsdGlwbGVJdGVtcyhjbGlja2VkSXRlbTogTWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5tdWx0aXBsZSkge1xuICAgICAgY29uc3QgaXRlbXNUb0Nsb3NlID0gdGhpcy5pdGVtcy5maWx0ZXIoXG4gICAgICAgIChpdGVtOiBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50KSA9PiBpdGVtICE9PSBjbGlja2VkSXRlbSAmJiAhaXRlbS5fY29sbGFwc2VkXG4gICAgICApO1xuXG4gICAgICBpdGVtc1RvQ2xvc2UuZm9yRWFjaCgoaXRlbTogTWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudCkgPT4gaXRlbS5oaWRlKCkpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9ib3JkZXJsZXNzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9mbHVzaDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfbXVsdGlwbGU6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiJdfQ==