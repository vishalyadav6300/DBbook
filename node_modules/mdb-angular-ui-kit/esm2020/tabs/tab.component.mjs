import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import { Component, ContentChild, Input, TemplateRef, ViewChild, } from '@angular/core';
import { Subject } from 'rxjs';
import { MDB_TAB_CONTENT } from './tab-content.directive';
import { MDB_TAB_TITLE } from './tab-title.directive';
import * as i0 from "@angular/core";
export class MdbTabComponent {
    constructor(_elementRef, _renderer, _vcr) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._vcr = _vcr;
        this.activeStateChange$ = new Subject();
        this._disabled = false;
        this._fade = true;
        this._contentPortal = null;
        this._titlePortal = null;
        this._active = false;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get fade() {
        return this._fade;
    }
    set fade(value) {
        this._fade = coerceBooleanProperty(value);
    }
    get active() {
        return this._active;
    }
    get content() {
        return this._contentPortal;
    }
    get titleContent() {
        return this._titlePortal;
    }
    get shouldAttach() {
        return this._lazyContent === undefined;
    }
    // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
    set active(value) {
        if (value) {
            this._renderer.addClass(this._elementRef.nativeElement, 'show');
            this._renderer.addClass(this._elementRef.nativeElement, 'active');
        }
        else {
            this._renderer.removeClass(this._elementRef.nativeElement, 'show');
            this._renderer.removeClass(this._elementRef.nativeElement, 'active');
        }
        this._active = value;
        this.activeStateChange$.next(value);
    }
    ngOnInit() {
        this._createContentPortal();
        if (this._titleContent) {
            this._createTitlePortal();
        }
    }
    _createContentPortal() {
        const content = this._lazyContent || this._content;
        this._contentPortal = new TemplatePortal(content, this._vcr);
    }
    _createTitlePortal() {
        this._titlePortal = new TemplatePortal(this._titleContent, this._vcr);
    }
}
MdbTabComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbTabComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Component });
MdbTabComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbTabComponent, selector: "mdb-tab", inputs: { disabled: "disabled", fade: "fade", title: "title" }, queries: [{ propertyName: "_lazyContent", first: true, predicate: MDB_TAB_CONTENT, descendants: true, read: TemplateRef, static: true }, { propertyName: "_titleContent", first: true, predicate: MDB_TAB_TITLE, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "_content", first: true, predicate: TemplateRef, descendants: true, static: true }], ngImport: i0, template: "<ng-template><ng-content></ng-content></ng-template>\n" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbTabComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-tab', template: "<ng-template><ng-content></ng-content></ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }]; }, propDecorators: { _lazyContent: [{
                type: ContentChild,
                args: [MDB_TAB_CONTENT, { read: TemplateRef, static: true }]
            }], _titleContent: [{
                type: ContentChild,
                args: [MDB_TAB_TITLE, { read: TemplateRef, static: true }]
            }], _content: [{
                type: ViewChild,
                args: [TemplateRef, { static: true }]
            }], disabled: [{
                type: Input
            }], fade: [{
                type: Input
            }], title: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90YWJzL3RhYi5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvdGFicy90YWIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzVFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRCxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFFWixLQUFLLEVBR0wsV0FBVyxFQUNYLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7O0FBTXRELE1BQU0sT0FBTyxlQUFlO0lBaUUxQixZQUNVLFdBQXVCLEVBQ3ZCLFNBQW9CLEVBQ3BCLElBQXNCO1FBRnRCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsU0FBSSxHQUFKLElBQUksQ0FBa0I7UUEzRHZCLHVCQUFrQixHQUFxQixJQUFJLE9BQU8sRUFBVyxDQUFDO1FBUy9ELGNBQVMsR0FBRyxLQUFLLENBQUM7UUFTbEIsVUFBSyxHQUFHLElBQUksQ0FBQztRQW9CYixtQkFBYyxHQUEwQixJQUFJLENBQUM7UUFDN0MsaUJBQVksR0FBMEIsSUFBSSxDQUFDO1FBZTNDLFlBQU8sR0FBRyxLQUFLLENBQUM7SUFNckIsQ0FBQztJQTFESixJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FB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dGVudCI6WyJpbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNREJfVEFCX0NPTlRFTlQgfSBmcm9tICcuL3RhYi1jb250ZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNREJfVEFCX1RJVExFIH0gZnJvbSAnLi90YWItdGl0bGUuZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLXRhYicsXG4gIHRlbXBsYXRlVXJsOiAnLi90YWIuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJUYWJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAQ29udGVudENoaWxkKE1EQl9UQUJfQ09OVEVOVCwgeyByZWFkOiBUZW1wbGF0ZVJlZiwgc3RhdGljOiB0cnVlIH0pXG4gIF9sYXp5Q29udGVudDogVGVtcGxhdGVSZWY8YW55PjtcblxuICBAQ29udGVudENoaWxkKE1EQl9UQUJfVElUTEUsIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBfdGl0bGVDb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYsIHsgc3RhdGljOiB0cnVlIH0pIF9jb250ZW50OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHJlYWRvbmx5IGFjdGl2ZVN0YXRlQ2hhbmdlJDogU3ViamVjdDxib29sZWFuPiA9IG5ldyBTdWJqZWN0PGJvb2xlYW4+KCk7XG5cbiAgQElucHV0KClcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgZmFkZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZmFkZTtcbiAgfVxuICBzZXQgZmFkZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZhZGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2ZhZGUgPSB0cnVlO1xuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xuICB9XG5cbiAgZ2V0IGNvbnRlbnQoKTogVGVtcGxhdGVQb3J0YWwgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudFBvcnRhbDtcbiAgfVxuXG4gIGdldCB0aXRsZUNvbnRlbnQoKTogVGVtcGxhdGVQb3J0YWwgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fdGl0bGVQb3J0YWw7XG4gIH1cblxuICBnZXQgc2hvdWxkQXR0YWNoKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9sYXp5Q29udGVudCA9PT0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29udGVudFBvcnRhbDogVGVtcGxhdGVQb3J0YWwgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfdGl0bGVQb3J0YWw6IFRlbXBsYXRlUG9ydGFsIHwgbnVsbCA9IG51bGw7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9hZGphY2VudC1vdmVybG9hZC1zaWduYXR1cmVzXG4gIHNldCBhY3RpdmUodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3Nob3cnKTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2FjdGl2ZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdzaG93Jyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhY3RpdmUnKTtcbiAgICB9XG5cbiAgICB0aGlzLl9hY3RpdmUgPSB2YWx1ZTtcbiAgICB0aGlzLmFjdGl2ZVN0YXRlQ2hhbmdlJC5uZXh0KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9hY3RpdmUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfdmNyOiBWaWV3Q29udGFpbmVyUmVmXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jcmVhdGVDb250ZW50UG9ydGFsKCk7XG5cbiAgICBpZiAodGhpcy5fdGl0bGVDb250ZW50KSB7XG4gICAgICB0aGlzLl9jcmVhdGVUaXRsZVBvcnRhbCgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUNvbnRlbnRQb3J0YWwoKTogdm9pZCB7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuX2xhenlDb250ZW50IHx8IHRoaXMuX2NvbnRlbnQ7XG4gICAgdGhpcy5fY29udGVudFBvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbChjb250ZW50LCB0aGlzLl92Y3IpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVGl0bGVQb3J0YWwoKTogdm9pZCB7XG4gICAgdGhpcy5fdGl0bGVQb3J0YWwgPSBuZXcgVGVtcGxhdGVQb3J0YWwodGhpcy5fdGl0bGVDb250ZW50LCB0aGlzLl92Y3IpO1xuICB9XG5cbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX2Rpc2FibGVkOiBCb29sZWFuSW5wdXQ7XG59XG4iLCI8bmctdGVtcGxhdGU+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvbmctdGVtcGxhdGU+XG4iXX0=