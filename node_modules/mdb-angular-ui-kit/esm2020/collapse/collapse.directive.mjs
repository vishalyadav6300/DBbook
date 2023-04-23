import { Directive, EventEmitter, HostBinding, Input, Output, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import * as i0 from "@angular/core";
const TRANSITION_TIME = 350;
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbCollapseDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2NvbGxhcHNlL2NvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixXQUFXLEVBQ1gsS0FBSyxFQUNMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFFdEMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDO0FBTzVCLGtFQUFrRTtBQUNsRSxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQW9CLFdBQXVCLEVBQVUsU0FBb0I7UUFBckQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRTFDLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRTFDLGlCQUFZLEdBQXVDLElBQUksWUFBWSxFQUFFLENBQUM7UUFDdEUsa0JBQWEsR0FBdUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RSxpQkFBWSxHQUF1QyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RFLG1CQUFjLEdBQXVDLElBQUksWUFBWSxFQUFFLENBQUM7UUFZMUUsZUFBVSxHQUFHLElBQUksQ0FBQztRQU1sQixxQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUF6QjJDLENBQUM7SUFTN0UsSUFDSSxTQUFTLENBQUMsU0FBa0I7UUFDOUIsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxVQUFV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QUM7SUFDOUIsQ0FBQztJQUVPLHFCQUFxQixDQUFDLE9BQW9CLEVBQUUsUUFBZ0I7UUFDbEUsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLE1BQU0sZUFBZSxHQUFHLENBQUMsQ0FBQztRQUMxQixNQUFNLGdCQUFnQixHQUFHLFFBQVEsR0FBRyxlQUFlLENBQUM7UUFFcEQsU0FBUyxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUM7YUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUwsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzthQUNuRDtRQUNILENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7O2lIQTlIVSxvQkFBb0I7cUdBQXBCLG9CQUFvQjsyRkFBcEIsb0JBQW9CO2tCQU5oQyxTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxhQUFhO2lCQUN4Qjt5SEFLZ0MsYUFBYTtzQkFBM0MsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBRW5CLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU07Z0JBR0gsU0FBUztzQkFEWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RCaW5kaW5nLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5jb25zdCBUUkFOU0lUSU9OX1RJTUUgPSAzNTA7XG5cbkBEaXJlY3RpdmUoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2RpcmVjdGl2ZS1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJDb2xsYXBzZV0nLFxuICBleHBvcnRBczogJ21kYkNvbGxhcHNlJyxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBNZGJDb2xsYXBzZURpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb2xsYXBzZScpIGNvbGxhcHNlQ2xhc3MgPSB0cnVlO1xuXG4gIEBPdXRwdXQoKSBjb2xsYXBzZVNob3c6IEV2ZW50RW1pdHRlcjxNZGJDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjb2xsYXBzZVNob3duOiBFdmVudEVtaXR0ZXI8TWRiQ29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29sbGFwc2VIaWRlOiBFdmVudEVtaXR0ZXI8TWRiQ29sbGFwc2VEaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY29sbGFwc2VIaWRkZW46IEV2ZW50RW1pdHRlcjxNZGJDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGNvbGxhcHNlZChjb2xsYXBzZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAoY29sbGFwc2VkICE9PSB0aGlzLl9jb2xsYXBzZWQpIHtcbiAgICAgIGNvbGxhcHNlZCA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KCk7XG4gICAgICB0aGlzLl9jb2xsYXBzZWQgPSBjb2xsYXBzZWQ7XG4gICAgfVxuICB9XG4gIGdldCBjb2xsYXBzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbGxhcHNlZDtcbiAgfVxuICBwcml2YXRlIF9jb2xsYXBzZWQgPSB0cnVlO1xuXG4gIGdldCBob3N0KCk6IEhUTUxFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8ICF0aGlzLmNvbGxhcHNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29sbGFwc2VTaG93LmVtaXQodGhpcyk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmhvc3QsICdjb2xsYXBzZScpO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdCwgJ2NvbGxhcHNpbmcnKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2hlaWdodCcsICcwcHgnKTtcblxuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSB0aGlzLmhvc3Quc2Nyb2xsSGVpZ2h0O1xuXG4gICAgZnJvbUV2ZW50KHRoaXMuaG9zdCwgJ3RyYW5zaXRpb25lbmQnKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0LCAnY29sbGFwc2luZycpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsICdjb2xsYXBzZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsICdzaG93Jyk7XG5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5ob3N0LCAnaGVpZ2h0Jyk7XG5cbiAgICAgICAgdGhpcy5jb2xsYXBzZVNob3duLmVtaXQodGhpcyk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuX2VtdWxhdGVUcmFuc2l0aW9uRW5kKHRoaXMuaG9zdCwgVFJBTlNJVElPTl9USU1FKTtcblxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2hlaWdodCcsIGAke3Njcm9sbEhlaWdodH1weGApO1xuICB9XG5cbiAgaGlkZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8IHRoaXMuY29sbGFwc2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jb2xsYXBzZUhpZGUuZW1pdCh0aGlzKTtcblxuICAgIGNvbnN0IGhvc3RIZWlnaHQgPSB0aGlzLmhvc3QuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnaGVpZ2h0JywgYCR7aG9zdEhlaWdodH1weGApO1xuXG4gICAgdGhpcy5fcmVmbG93KHRoaXMuaG9zdCk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsICdjb2xsYXBzaW5nJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5ob3N0LCAnY29sbGFwc2UnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmhvc3QsICdzaG93Jyk7XG5cbiAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlO1xuXG4gICAgZnJvbUV2ZW50KHRoaXMuaG9zdCwgJ3RyYW5zaXRpb25lbmQnKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmhvc3QsICdjb2xsYXBzaW5nJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuaG9zdCwgJ2NvbGxhcHNlJyk7XG4gICAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5jb2xsYXBzZUhpZGRlbi5lbWl0KHRoaXMpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLmhvc3QsICdoZWlnaHQnKTtcbiAgICB0aGlzLl9lbXVsYXRlVHJhbnNpdGlvbkVuZCh0aGlzLmhvc3QsIFRSQU5TSVRJT05fVElNRSk7XG4gIH1cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2lzVHJhbnNpdGlvbmluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY29sbGFwc2VkID0gIXRoaXMuY29sbGFwc2VkO1xuICAgIHRoaXMuY29sbGFwc2VkID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZmxvdyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfZW11bGF0ZVRyYW5zaXRpb25FbmQoZWxlbWVudDogSFRNTEVsZW1lbnQsIGR1cmF0aW9uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnRFbWl0dGVkID0gZmFsc2U7XG4gICAgY29uc3QgZHVyYXRpb25QYWRkaW5nID0gNTtcbiAgICBjb25zdCBlbXVsYXRlZER1cmF0aW9uID0gZHVyYXRpb24gKyBkdXJhdGlvblBhZGRpbmc7XG5cbiAgICBmcm9tRXZlbnQoZWxlbWVudCwgJ3RyYW5zaXRpb25lbmQnKVxuICAgICAgLnBpcGUodGFrZSgxKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBldmVudEVtaXR0ZWQgPSB0cnVlO1xuICAgICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICghZXZlbnRFbWl0dGVkKSB7XG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3RyYW5zaXRpb25lbmQnKSk7XG4gICAgICB9XG4gICAgfSwgZW11bGF0ZWREdXJhdGlvbik7XG4gIH1cbn1cbiJdfQ==