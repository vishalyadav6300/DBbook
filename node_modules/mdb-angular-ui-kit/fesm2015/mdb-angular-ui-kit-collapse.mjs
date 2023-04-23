import * as i0 from '@angular/core';
import { EventEmitter, Directive, HostBinding, Output, Input, NgModule } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';

const TRANSITION_TIME = 350;
// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbCollapseDirective {
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.collapseClass = true;
        this.collapseShow = new EventEmitter();
        this.collapseShown = new EventEmitter();
        this.collapseHide = new EventEmitter();
        this.collapseHidden = new EventEmitter();
        this._collapsed = true;
        this._isTransitioning = false;
    }
    set collapsed(collapsed) {
        if (collapsed !== this._collapsed) {
            collapsed ? this.hide() : this.show();
            this._collapsed = collapsed;
        }
    }
    get collapsed() {
        return this._collapsed;
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    show() {
        if (this._isTransitioning || !this.collapsed) {
            return;
        }
        this.collapseShow.emit(this);
        this._renderer.removeClass(this.host, 'collapse');
        this._renderer.addClass(this.host, 'collapsing');
        this._renderer.setStyle(this.host, 'height', '0px');
        this._isTransitioning = true;
        const scrollHeight = this.host.scrollHeight;
        fromEvent(this.host, 'transitionend')
            .pipe(take(1))
            .subscribe(() => {
            this._isTransitioning = false;
            this.collapsed = false;
            this._renderer.removeClass(this.host, 'collapsing');
            this._renderer.addClass(this.host, 'collapse');
            this._renderer.addClass(this.host, 'show');
            this._renderer.removeStyle(this.host, 'height');
            this.collapseShown.emit(this);
        });
        this._emulateTransitionEnd(this.host, TRANSITION_TIME);
        this._renderer.setStyle(this.host, 'height', `${scrollHeight}px`);
    }
    hide() {
        if (this._isTransitioning || this.collapsed) {
            return;
        }
        this.collapseHide.emit(this);
        const hostHeight = this.host.getBoundingClientRect().height;
        this._renderer.setStyle(this.host, 'height', `${hostHeight}px`);
        this._reflow(this.host);
        this._renderer.addClass(this.host, 'collapsing');
        this._renderer.removeClass(this.host, 'collapse');
        this._renderer.removeClass(this.host, 'show');
        this._isTransitioning = true;
        fromEvent(this.host, 'transitionend')
            .pipe(take(1))
            .subscribe(() => {
            this._renderer.removeClass(this.host, 'collapsing');
            this._renderer.addClass(this.host, 'collapse');
            this._isTransitioning = false;
            this.collapsed = true;
            this.collapseHidden.emit(this);
        });
        this._renderer.removeStyle(this.host, 'height');
        this._emulateTransitionEnd(this.host, TRANSITION_TIME);
    }
    toggle() {
        if (this._isTransitioning) {
            return;
        }
        this.collapsed = !this.collapsed;
        this.collapsed ? this.hide() : this.show();
    }
    _reflow(element) {
        return element.offsetHeight;
    }
    _emulateTransitionEnd(element, duration) {
        let eventEmitted = false;
        const durationPadding = 5;
        const emulatedDuration = duration + durationPadding;
        fromEvent(element, 'transitionend')
            .pipe(take(1))
            .subscribe(() => {
            eventEmitted = true;
        });
        setTimeout(() => {
            if (!eventEmitted) {
                element.dispatchEvent(new Event('transitionend'));
            }
        }, emulatedDuration);
    }
}
MdbCollapseDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCollapseDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
MdbCollapseDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbCollapseDirective, selector: "[mdbCollapse]", inputs: { collapsed: "collapsed" }, outputs: { collapseShow: "collapseShow", collapseShown: "collapseShown", collapseHide: "collapseHide", collapseHidden: "collapseHidden" }, host: { properties: { "class.collapse": "this.collapseClass" } }, exportAs: ["mdbCollapse"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCollapseDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbCollapse]',
                    exportAs: 'mdbCollapse',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { collapseClass: [{
                type: HostBinding,
                args: ['class.collapse']
            }], collapseShow: [{
                type: Output
            }], collapseShown: [{
                type: Output
            }], collapseHide: [{
                type: Output
            }], collapseHidden: [{
                type: Output
            }], collapsed: [{
                type: Input
            }] } });

class MdbCollapseModule {
}
MdbCollapseModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCollapseModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbCollapseModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: MdbCollapseModule, declarations: [MdbCollapseDirective], exports: [MdbCollapseDirective] });
MdbCollapseModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCollapseModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCollapseModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbCollapseDirective],
                    exports: [MdbCollapseDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbCollapseDirective, MdbCollapseModule };
//# sourceMappingURL=mdb-angular-ui-kit-collapse.mjs.map
//# sourceMappingURL=mdb-angular-ui-kit-collapse.mjs.map
