import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MdbCarouselItemComponent } from './carousel-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export var Direction;
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(Direction || (Direction = {}));
export class MdbCarouselComponent {
    constructor(_elementRef, _cdRef) {
        this._elementRef = _elementRef;
        this._cdRef = _cdRef;
        this.animation = 'slide';
        this._controls = false;
        this._dark = false;
        this._indicators = false;
        this._ride = true;
        this._interval = 5000;
        this.keyboard = true;
        this.pause = true;
        this.wrap = true;
        this.slide = new EventEmitter();
        this.slideChange = new EventEmitter();
        this._activeSlide = 0;
        this._isPlaying = false;
        this._isSliding = false;
        this._destroy$ = new Subject();
        this.display = true;
    }
    get items() {
        return this._items && this._items.toArray();
    }
    get controls() {
        return this._controls;
    }
    set controls(value) {
        this._controls = coerceBooleanProperty(value);
    }
    get dark() {
        return this._dark;
    }
    set dark(value) {
        this._dark = coerceBooleanProperty(value);
    }
    get indicators() {
        return this._indicators;
    }
    set indicators(value) {
        this._indicators = coerceBooleanProperty(value);
    }
    get ride() {
        return this._ride;
    }
    set ride(value) {
        this._ride = coerceBooleanProperty(value);
    }
    get interval() {
        return this._interval;
    }
    set interval(value) {
        this._interval = value;
        if (this.items) {
            this._restartInterval();
        }
    }
    get activeSlide() {
        return this._activeSlide;
    }
    set activeSlide(index) {
        if (this.items.length && this._activeSlide !== index) {
            this._activeSlide = index;
            this._restartInterval();
        }
    }
    onMouseEnter() {
        if (this.pause && this._isPlaying) {
            this.stop();
        }
    }
    onMouseLeave() {
        if (this.pause && !this._isPlaying) {
            this.play();
        }
    }
    ngAfterViewInit() {
        Promise.resolve().then(() => {
            this._setActiveSlide(this._activeSlide);
            if (this.interval > 0 && this.ride) {
                this.play();
            }
            this._cdRef.markForCheck();
        });
        if (this.keyboard) {
            fromEvent(this._elementRef.nativeElement, 'keydown')
                .pipe(takeUntil(this._destroy$))
                .subscribe((event) => {
                if (event.key === 'ArrowRight') {
                    this.next();
                }
                else if (event.key === 'ArrowLeft') {
                    this.prev();
                }
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    _setActiveSlide(index) {
        const currentSlide = this.items[this._activeSlide];
        currentSlide.active = false;
        const newSlide = this.items[index];
        newSlide.active = true;
        this._activeSlide = index;
    }
    _restartInterval() {
        this._resetInterval();
        const activeElement = this.items[this.activeSlide];
        const interval = activeElement.interval ? activeElement.interval : this.interval;
        if (!isNaN(interval) && interval > 0) {
            this._lastInterval = setInterval(() => {
                const nInterval = +interval;
                if (this._isPlaying && !isNaN(nInterval) && nInterval > 0) {
                    this.next();
                    this._cdRef.markForCheck();
                }
                else {
                    this.stop();
                }
            }, interval);
        }
    }
    _resetInterval() {
        if (this._lastInterval) {
            clearInterval(this._lastInterval);
            this._lastInterval = null;
        }
    }
    play() {
        if (!this._isPlaying) {
            this._isPlaying = true;
            this._restartInterval();
        }
    }
    stop() {
        if (this._isPlaying) {
            this._isPlaying = false;
            this._resetInterval();
        }
    }
    to(index) {
        if (index > this.items.length - 1 || index < 0) {
            return;
        }
        if (this.activeSlide === index) {
            this.stop();
            this.play();
            return;
        }
        const direction = index > this.activeSlide ? Direction.NEXT : Direction.PREV;
        this._animateSlides(direction, this.activeSlide, index);
        this.activeSlide = index;
    }
    next() {
        if (!this._isSliding) {
            this._slide(Direction.NEXT);
        }
    }
    prev() {
        if (!this._isSliding) {
            this._slide(Direction.PREV);
        }
    }
    _slide(direction) {
        const isFirst = this._activeSlide === 0;
        const isLast = this._activeSlide === this.items.length - 1;
        if (!this.wrap) {
            if ((direction === Direction.NEXT && isLast) || (direction === Direction.PREV && isFirst)) {
                return;
            }
        }
        const newSlideIndex = this._getNewSlideIndex(direction);
        this._animateSlides(direction, this.activeSlide, newSlideIndex);
        this.activeSlide = newSlideIndex;
        this.slide.emit();
    }
    _animateSlides(direction, currentIndex, nextIndex) {
        const currentItem = this.items[currentIndex];
        const nextItem = this.items[nextIndex];
        const currentEl = currentItem.host;
        const nextEl = nextItem.host;
        this._isSliding = true;
        if (this._isPlaying) {
            this.stop();
        }
        if (direction === Direction.NEXT) {
            nextItem.next = true;
            setTimeout(() => {
                this._reflow(nextEl);
                currentItem.start = true;
                nextItem.start = true;
                this._cdRef.markForCheck();
            }, 0);
            const transitionDuration = 600;
            fromEvent(currentEl, 'transitionend')
                .pipe(take(1))
                .subscribe(() => {
                nextItem.next = false;
                nextItem.start = false;
                nextItem.active = true;
                currentItem.active = false;
                currentItem.start = false;
                currentItem.next = false;
                this.slideChange.emit();
                this._isSliding = false;
            });
            this._emulateTransitionEnd(currentEl, transitionDuration);
        }
        else if (direction === Direction.PREV) {
            nextItem.prev = true;
            setTimeout(() => {
                this._reflow(nextEl);
                currentItem.end = true;
                nextItem.end = true;
                this._cdRef.markForCheck();
            }, 0);
            const transitionDuration = 600;
            fromEvent(currentEl, 'transitionend')
                .pipe(take(1))
                .subscribe(() => {
                nextItem.prev = false;
                nextItem.end = false;
                nextItem.active = true;
                currentItem.active = false;
                currentItem.end = false;
                currentItem.prev = false;
                this.slideChange.emit();
                this._isSliding = false;
            });
            this._emulateTransitionEnd(currentEl, transitionDuration);
        }
        if (!this._isPlaying && this.interval > 0) {
            this.play();
        }
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
    _getNewSlideIndex(direction) {
        let newSlideIndex;
        if (direction === Direction.NEXT) {
            newSlideIndex = this._getNextSlideIndex();
        }
        if (direction === Direction.PREV) {
            newSlideIndex = this._getPrevSlideIndex();
        }
        return newSlideIndex;
    }
    _getNextSlideIndex() {
        const isLast = this._activeSlide === this.items.length - 1;
        if (!isLast) {
            return this._activeSlide + 1;
        }
        else if (this.wrap && isLast) {
            return 0;
        }
        else {
            return this._activeSlide;
        }
    }
    _getPrevSlideIndex() {
        const isFirst = this._activeSlide === 0;
        if (!isFirst) {
            return this._activeSlide - 1;
        }
        else if (this.wrap && isFirst) {
            return this.items.length - 1;
        }
        else {
            return this._activeSlide;
        }
    }
}
MdbCarouselComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCarouselComponent, deps: [{ token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbCarouselComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbCarouselComponent, selector: "mdb-carousel", inputs: { animation: "animation", controls: "controls", dark: "dark", indicators: "indicators", ride: "ride", interval: "interval", keyboard: "keyboard", pause: "pause", wrap: "wrap" }, outputs: { slide: "slide", slideChange: "slideChange" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" }, properties: { "class.d-block": "this.display" } }, queries: [{ propertyName: "_items", predicate: MdbCarouselItemComponent }], ngImport: i0, template: "<div\n  class=\"carousel slide\"\n  [class.carousel-fade]=\"animation === 'fade'\"\n  [class.carousel-dark]=\"dark\"\n>\n  <div class=\"carousel-indicators\" *ngIf=\"indicators\">\n    <button\n      *ngFor=\"let item of items; let i = index\"\n      type=\"button\"\n      [class.active]=\"i === activeSlide\"\n      [attr.aria-current]=\"i === activeSlide\"\n      (click)=\"to(i)\"\n    ></button>\n  </div>\n\n  <div class=\"carousel-inner\">\n    <ng-content></ng-content>\n  </div>\n\n  <button *ngIf=\"controls\" class=\"carousel-control-prev\" type=\"button\" (click)=\"prev()\">\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Previous</span>\n  </button>\n  <button *ngIf=\"controls\" class=\"carousel-control-next\" type=\"button\" (click)=\"next()\">\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Next</span>\n  </button>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-carousel', changeDetection: ChangeDetectionStrategy.OnPush, template: "<div\n  class=\"carousel slide\"\n  [class.carousel-fade]=\"animation === 'fade'\"\n  [class.carousel-dark]=\"dark\"\n>\n  <div class=\"carousel-indicators\" *ngIf=\"indicators\">\n    <button\n      *ngFor=\"let item of items; let i = index\"\n      type=\"button\"\n      [class.active]=\"i === activeSlide\"\n      [attr.aria-current]=\"i === activeSlide\"\n      (click)=\"to(i)\"\n    ></button>\n  </div>\n\n  <div class=\"carousel-inner\">\n    <ng-content></ng-content>\n  </div>\n\n  <button *ngIf=\"controls\" class=\"carousel-control-prev\" type=\"button\" (click)=\"prev()\">\n    <span class=\"carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Previous</span>\n  </button>\n  <button *ngIf=\"controls\" class=\"carousel-control-next\" type=\"button\" (click)=\"next()\">\n    <span class=\"carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"visually-hidden\">Next</span>\n  </button>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _items: [{
                type: ContentChildren,
                args: [MdbCarouselItemComponent]
            }], animation: [{
                type: Input
            }], controls: [{
                type: Input
            }], dark: [{
                type: Input
            }], indicators: [{
                type: Input
            }], ride: [{
                type: Input
            }], interval: [{
                type: Input
            }], keyboard: [{
                type: Input
            }], pause: [{
                type: Input
            }], wrap: [{
                type: Input
            }], slide: [{
                type: Output
            }], slideChange: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }], display: [{
                type: HostBinding,
                args: ['class.d-block']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEdBRVAsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDMUMsT0FBTyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBRXJFLE1BQU0sQ0FBTixJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDbkIsK0NBQU8sQ0FBQTtJQUNQLHlDQUFJLENBQUE7SUFDSix5Q0FBSSxDQUFBO0FBQ04sQ0FBQyxFQUpXLFNBQVMsS0FBVCxTQUFTLFFBSXBCO0FBT0QsTUFBTSxPQUFPLG9CQUFvQjtJQWtHL0IsWUFBb0IsV0FBdUIsRUFBVSxNQUF5QjtRQUExRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBNUZyRSxjQUFTLEdBQXFCLE9BQU8sQ0FBQztRQVN2QyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBU2xCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFTZCxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQVNwQixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBYWIsY0FBUyxHQUFHLElBQUksQ0FBQztRQUVoQixhQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDYixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBRVgsVUFBSyxHQUF1QixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQy9DLGdCQUFXLEdBQXVCLElBQUksWUFBWSxFQUFFLENBQUM7UUFZdkQsaUJBQVksR0FBRyxDQUFDLENBQUM7UUFHakIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRVYsY0FBUyxHQUFrQixJQUFJLE9BQU8sRUFBUSxDQUFDO1FBZ0JsQyxZQUFPLEdBQUcsSUFBSSxDQUFDO0lBRW9DLENBQUM7SUFoR2xGLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQzlDLENBQUM7SUFJRCxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBR0QsSUFDSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFjO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUdELElBQ0ksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBSSxVQUFVLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFHRCxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQUksSUFBSSxDQUFDLEtBQWM7UUFDckIsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBR0QsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFhO1FBQ3hCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBRXZCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQVVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBYTtRQUMzQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO1lBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQVVELFlBQVk7UUFDVixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFHRCxZQUFZO1FBQ1YsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFNRCxlQUFlO1FBQ2IsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFeEMsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDakIsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQztpQkFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQy9CLFNBQVMsQ0FBQyxDQUFDLEtBQW9CLEVBQUUsRUFBRTtnQkFDbEMsSUFBSSxLQUFLLENBQUMsR0FBRyxLQUFLLFlBQVksRUFBRTtvQkFDOUIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUNiO3FCQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxXQUFXLEVBQUU7b0JBQ3BDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDYjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRU8sZUFBZSxDQUFDLEtBQWE7UUFDbkMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsWUFBWSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFNUIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRU8sZ0JBQWdCO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNuRCxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRWpGLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksUUFBUSxHQUFHLENBQUMsRUFBRTtZQUNwQyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BDLE1BQU0sU0FBUyxHQUFHLENBQUMsUUFBUSxDQUFDO2dCQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRTtvQkFDekQsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7aUJBQzVCO3FCQUFNO29CQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDYjtZQUNILENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNkO0lBQ0gsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELEVBQUUsQ0FBQyxLQUFhO1FBQ2QsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDOUMsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDWixPQUFPO1NBQ1I7UUFFRCxNQUFNLFNBQVMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztRQUU3RSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVPLE1BQU0sQ0FBQyxTQUFvQjtRQUNqQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQztRQUN4QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLElBQUksQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxFQUFFO2dCQUN6RixPQUFPO2FBQ1I7U0FDRjtRQUVELE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUV4RCxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsYUFBYSxDQUFDO1FBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLGNBQWMsQ0FBQyxTQUFvQixFQUFFLFlBQW9CLEVBQUUsU0FBaUI7UUFDbEYsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM3QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUU3QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7UUFFRCxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVOLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1lBRS9CLFNBQVMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFdkIsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQzNCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFFekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDM0Q7YUFBTSxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO1lBQ3ZDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBRXJCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDckIsV0FBVyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzdCLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVOLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO1lBRS9CLFNBQVMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDO2lCQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsUUFBUSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ3RCLFFBQVEsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUNyQixRQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFFdkIsV0FBVyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQzNCLFdBQVcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixXQUFXLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFFekIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFTCxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDM0Q7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtZQUN6QyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDYjtJQUNILENBQUM7SUFFTyxPQUFPLENBQUMsT0FBb0I7UUFDbEMsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDO0lBQzlCLENBQUM7SUFFTyxxQkFBcUIsQ0FBQyxPQUFvQixFQUFFLFFBQWdCO1FBQ2xFLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDMUIsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLEdBQUcsZUFBZSxDQUFDO1FBRXBELFNBQVMsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDO2FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDYixTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ2QsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVMLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNqQixPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7YUFDbkQ7UUFDSCxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBRU8saUJBQWlCLENBQUMsU0FBb0I7UUFDNUMsSUFBSSxhQUFxQixDQUFDO1FBRTFCLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDaEMsYUFBYSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQzNDO1FBRUQsSUFBSSxTQUFTLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtZQUNoQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDM0M7UUFFRCxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUM5QixPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixPQUFPLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1NBQzlCO2FBQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUM5QjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7aUhBcFdVLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHdjQUNkLHdCQUF3Qiw2QkNoQzNDLG05QkE0QkE7MkZER2Esb0JBQW9CO2tCQUxoQyxTQUFTOytCQUNFLGNBQWMsbUJBRVAsdUJBQXVCLENBQUMsTUFBTTtpSUFHSixNQUFNO3NCQUFoRCxlQUFlO3VCQUFDLHdCQUF3QjtnQkFLaEMsU0FBUztzQkFBakIsS0FBSztnQkFHRixRQUFRO3NCQURYLEtBQUs7Z0JBVUYsSUFBSTtzQkFEUCxLQUFLO2dCQVVGLFVBQVU7c0JBRGIsS0FBSztnQkFVRixJQUFJO3NCQURQLEtBQUs7Z0JBVUYsUUFBUTtzQkFEWCxLQUFLO2dCQWFHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFFSSxLQUFLO3NCQUFkLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFxQlAsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVk7Z0JBUTFCLFlBQVk7c0JBRFgsWUFBWTt1QkFBQyxZQUFZO2dCQU9JLE9BQU87c0JBQXBDLFdBQVc7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNZGJDYXJvdXNlbEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLWl0ZW0uY29tcG9uZW50JztcblxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcbiAgVU5LTk9XTixcbiAgTkVYVCxcbiAgUFJFVixcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLWNhcm91c2VsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIE1kYkNhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQENvbnRlbnRDaGlsZHJlbihNZGJDYXJvdXNlbEl0ZW1Db21wb25lbnQpIF9pdGVtczogUXVlcnlMaXN0PE1kYkNhcm91c2VsSXRlbUNvbXBvbmVudD47XG4gIGdldCBpdGVtcygpOiBNZGJDYXJvdXNlbEl0ZW1Db21wb25lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2l0ZW1zICYmIHRoaXMuX2l0ZW1zLnRvQXJyYXkoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGFuaW1hdGlvbjogJ3NsaWRlJyB8ICdmYWRlJyA9ICdzbGlkZSc7XG5cbiAgQElucHV0KClcbiAgZ2V0IGNvbnRyb2xzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9scztcbiAgfVxuICBzZXQgY29udHJvbHModmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb250cm9scyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfY29udHJvbHMgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgZGFyaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGFyaztcbiAgfVxuICBzZXQgZGFyayh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2RhcmsgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2RhcmsgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgaW5kaWNhdG9ycygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faW5kaWNhdG9ycztcbiAgfVxuICBzZXQgaW5kaWNhdG9ycyh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2luZGljYXRvcnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX2luZGljYXRvcnMgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICBnZXQgcmlkZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmlkZTtcbiAgfVxuICBzZXQgcmlkZSh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JpZGUgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICB9XG4gIHByaXZhdGUgX3JpZGUgPSB0cnVlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBpbnRlcnZhbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcnZhbDtcbiAgfVxuICBzZXQgaW50ZXJ2YWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ludGVydmFsID0gdmFsdWU7XG5cbiAgICBpZiAodGhpcy5pdGVtcykge1xuICAgICAgdGhpcy5fcmVzdGFydEludGVydmFsKCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgX2ludGVydmFsID0gNTAwMDtcblxuICBASW5wdXQoKSBrZXlib2FyZCA9IHRydWU7XG4gIEBJbnB1dCgpIHBhdXNlID0gdHJ1ZTtcbiAgQElucHV0KCkgd3JhcCA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNsaWRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzbGlkZUNoYW5nZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGdldCBhY3RpdmVTbGlkZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZTtcbiAgfVxuXG4gIHNldCBhY3RpdmVTbGlkZShpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoICYmIHRoaXMuX2FjdGl2ZVNsaWRlICE9PSBpbmRleCkge1xuICAgICAgdGhpcy5fYWN0aXZlU2xpZGUgPSBpbmRleDtcbiAgICAgIHRoaXMuX3Jlc3RhcnRJbnRlcnZhbCgpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIF9hY3RpdmVTbGlkZSA9IDA7XG5cbiAgcHJpdmF0ZSBfbGFzdEludGVydmFsOiBhbnk7XG4gIHByaXZhdGUgX2lzUGxheWluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9pc1NsaWRpbmcgPSBmYWxzZTtcblxuICBwcml2YXRlIHJlYWRvbmx5IF9kZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYXVzZSAmJiB0aGlzLl9pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGF1c2UgJiYgIXRoaXMuX2lzUGxheWluZykge1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5kLWJsb2NrJykgZGlzcGxheSA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX3NldEFjdGl2ZVNsaWRlKHRoaXMuX2FjdGl2ZVNsaWRlKTtcblxuICAgICAgaWYgKHRoaXMuaW50ZXJ2YWwgPiAwICYmIHRoaXMucmlkZSkge1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMua2V5Ym9hcmQpIHtcbiAgICAgIGZyb21FdmVudCh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdrZXlkb3duJylcbiAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX2Rlc3Ryb3kkKSlcbiAgICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcpIHtcbiAgICAgICAgICAgIHRoaXMubmV4dCgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0Jykge1xuICAgICAgICAgICAgdGhpcy5wcmV2KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5fZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEFjdGl2ZVNsaWRlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBjdXJyZW50U2xpZGUgPSB0aGlzLml0ZW1zW3RoaXMuX2FjdGl2ZVNsaWRlXTtcbiAgICBjdXJyZW50U2xpZGUuYWN0aXZlID0gZmFsc2U7XG5cbiAgICBjb25zdCBuZXdTbGlkZSA9IHRoaXMuaXRlbXNbaW5kZXhdO1xuICAgIG5ld1NsaWRlLmFjdGl2ZSA9IHRydWU7XG4gICAgdGhpcy5fYWN0aXZlU2xpZGUgPSBpbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RhcnRJbnRlcnZhbCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldEludGVydmFsKCk7XG4gICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHRoaXMuaXRlbXNbdGhpcy5hY3RpdmVTbGlkZV07XG4gICAgY29uc3QgaW50ZXJ2YWwgPSBhY3RpdmVFbGVtZW50LmludGVydmFsID8gYWN0aXZlRWxlbWVudC5pbnRlcnZhbCA6IHRoaXMuaW50ZXJ2YWw7XG5cbiAgICBpZiAoIWlzTmFOKGludGVydmFsKSAmJiBpbnRlcnZhbCA+IDApIHtcbiAgICAgIHRoaXMuX2xhc3RJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgY29uc3QgbkludGVydmFsID0gK2ludGVydmFsO1xuICAgICAgICBpZiAodGhpcy5faXNQbGF5aW5nICYmICFpc05hTihuSW50ZXJ2YWwpICYmIG5JbnRlcnZhbCA+IDApIHtcbiAgICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfSwgaW50ZXJ2YWwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0SW50ZXJ2YWwoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2xhc3RJbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9sYXN0SW50ZXJ2YWwpO1xuICAgICAgdGhpcy5fbGFzdEludGVydmFsID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwbGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLl9pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5fcmVzdGFydEludGVydmFsKCk7XG4gICAgfVxuICB9XG5cbiAgc3RvcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3Jlc2V0SW50ZXJ2YWwoKTtcbiAgICB9XG4gIH1cblxuICB0byhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGluZGV4ID4gdGhpcy5pdGVtcy5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZVNsaWRlID09PSBpbmRleCkge1xuICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBkaXJlY3Rpb24gPSBpbmRleCA+IHRoaXMuYWN0aXZlU2xpZGUgPyBEaXJlY3Rpb24uTkVYVCA6IERpcmVjdGlvbi5QUkVWO1xuXG4gICAgdGhpcy5fYW5pbWF0ZVNsaWRlcyhkaXJlY3Rpb24sIHRoaXMuYWN0aXZlU2xpZGUsIGluZGV4KTtcbiAgICB0aGlzLmFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gIH1cblxuICBuZXh0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICB0aGlzLl9zbGlkZShEaXJlY3Rpb24uTkVYVCk7XG4gICAgfVxuICB9XG5cbiAgcHJldigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2lzU2xpZGluZykge1xuICAgICAgdGhpcy5fc2xpZGUoRGlyZWN0aW9uLlBSRVYpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlKGRpcmVjdGlvbjogRGlyZWN0aW9uKTogdm9pZCB7XG4gICAgY29uc3QgaXNGaXJzdCA9IHRoaXMuX2FjdGl2ZVNsaWRlID09PSAwO1xuICAgIGNvbnN0IGlzTGFzdCA9IHRoaXMuX2FjdGl2ZVNsaWRlID09PSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XG5cbiAgICBpZiAoIXRoaXMud3JhcCkge1xuICAgICAgaWYgKChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUICYmIGlzTGFzdCkgfHwgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVYgJiYgaXNGaXJzdCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG5ld1NsaWRlSW5kZXggPSB0aGlzLl9nZXROZXdTbGlkZUluZGV4KGRpcmVjdGlvbik7XG5cbiAgICB0aGlzLl9hbmltYXRlU2xpZGVzKGRpcmVjdGlvbiwgdGhpcy5hY3RpdmVTbGlkZSwgbmV3U2xpZGVJbmRleCk7XG4gICAgdGhpcy5hY3RpdmVTbGlkZSA9IG5ld1NsaWRlSW5kZXg7XG5cbiAgICB0aGlzLnNsaWRlLmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGVTbGlkZXMoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGN1cnJlbnRJbmRleDogbnVtYmVyLCBuZXh0SW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IGN1cnJlbnRJdGVtID0gdGhpcy5pdGVtc1tjdXJyZW50SW5kZXhdO1xuICAgIGNvbnN0IG5leHRJdGVtID0gdGhpcy5pdGVtc1tuZXh0SW5kZXhdO1xuICAgIGNvbnN0IGN1cnJlbnRFbCA9IGN1cnJlbnRJdGVtLmhvc3Q7XG4gICAgY29uc3QgbmV4dEVsID0gbmV4dEl0ZW0uaG9zdDtcblxuICAgIHRoaXMuX2lzU2xpZGluZyA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5faXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLnN0b3AoKTtcbiAgICB9XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgbmV4dEl0ZW0ubmV4dCA9IHRydWU7XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZWZsb3cobmV4dEVsKTtcbiAgICAgICAgY3VycmVudEl0ZW0uc3RhcnQgPSB0cnVlO1xuICAgICAgICBuZXh0SXRlbS5zdGFydCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSwgMCk7XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IDYwMDtcblxuICAgICAgZnJvbUV2ZW50KGN1cnJlbnRFbCwgJ3RyYW5zaXRpb25lbmQnKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBuZXh0SXRlbS5uZXh0ID0gZmFsc2U7XG4gICAgICAgICAgbmV4dEl0ZW0uc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICBuZXh0SXRlbS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICAgICAgY3VycmVudEl0ZW0uYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgY3VycmVudEl0ZW0uc3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICBjdXJyZW50SXRlbS5uZXh0ID0gZmFsc2U7XG5cbiAgICAgICAgICB0aGlzLnNsaWRlQ2hhbmdlLmVtaXQoKTtcbiAgICAgICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX2VtdWxhdGVUcmFuc2l0aW9uRW5kKGN1cnJlbnRFbCwgdHJhbnNpdGlvbkR1cmF0aW9uKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVYpIHtcbiAgICAgIG5leHRJdGVtLnByZXYgPSB0cnVlO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fcmVmbG93KG5leHRFbCk7XG4gICAgICAgIGN1cnJlbnRJdGVtLmVuZCA9IHRydWU7XG4gICAgICAgIG5leHRJdGVtLmVuZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSwgMCk7XG5cbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IDYwMDtcblxuICAgICAgZnJvbUV2ZW50KGN1cnJlbnRFbCwgJ3RyYW5zaXRpb25lbmQnKVxuICAgICAgICAucGlwZSh0YWtlKDEpKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBuZXh0SXRlbS5wcmV2ID0gZmFsc2U7XG4gICAgICAgICAgbmV4dEl0ZW0uZW5kID0gZmFsc2U7XG4gICAgICAgICAgbmV4dEl0ZW0uYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgIGN1cnJlbnRJdGVtLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgIGN1cnJlbnRJdGVtLmVuZCA9IGZhbHNlO1xuICAgICAgICAgIGN1cnJlbnRJdGVtLnByZXYgPSBmYWxzZTtcblxuICAgICAgICAgIHRoaXMuc2xpZGVDaGFuZ2UuZW1pdCgpO1xuICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgdGhpcy5fZW11bGF0ZVRyYW5zaXRpb25FbmQoY3VycmVudEVsLCB0cmFuc2l0aW9uRHVyYXRpb24pO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5faXNQbGF5aW5nICYmIHRoaXMuaW50ZXJ2YWwgPiAwKSB7XG4gICAgICB0aGlzLnBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9yZWZsb3coZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIge1xuICAgIHJldHVybiBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX2VtdWxhdGVUcmFuc2l0aW9uRW5kKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IGV2ZW50RW1pdHRlZCA9IGZhbHNlO1xuICAgIGNvbnN0IGR1cmF0aW9uUGFkZGluZyA9IDU7XG4gICAgY29uc3QgZW11bGF0ZWREdXJhdGlvbiA9IGR1cmF0aW9uICsgZHVyYXRpb25QYWRkaW5nO1xuXG4gICAgZnJvbUV2ZW50KGVsZW1lbnQsICd0cmFuc2l0aW9uZW5kJylcbiAgICAgIC5waXBlKHRha2UoMSkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgZXZlbnRFbWl0dGVkID0gdHJ1ZTtcbiAgICAgIH0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoIWV2ZW50RW1pdHRlZCkge1xuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCd0cmFuc2l0aW9uZW5kJykpO1xuICAgICAgfVxuICAgIH0sIGVtdWxhdGVkRHVyYXRpb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TmV3U2xpZGVJbmRleChkaXJlY3Rpb246IERpcmVjdGlvbik6IG51bWJlciB7XG4gICAgbGV0IG5ld1NsaWRlSW5kZXg6IG51bWJlcjtcblxuICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XG4gICAgICBuZXdTbGlkZUluZGV4ID0gdGhpcy5fZ2V0TmV4dFNsaWRlSW5kZXgoKTtcbiAgICB9XG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFVikge1xuICAgICAgbmV3U2xpZGVJbmRleCA9IHRoaXMuX2dldFByZXZTbGlkZUluZGV4KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld1NsaWRlSW5kZXg7XG4gIH1cblxuICBwcml2YXRlIF9nZXROZXh0U2xpZGVJbmRleCgpOiBudW1iZXIge1xuICAgIGNvbnN0IGlzTGFzdCA9IHRoaXMuX2FjdGl2ZVNsaWRlID09PSB0aGlzLml0ZW1zLmxlbmd0aCAtIDE7XG5cbiAgICBpZiAoIWlzTGFzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNsaWRlICsgMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMud3JhcCAmJiBpc0xhc3QpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWN0aXZlU2xpZGU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJldlNsaWRlSW5kZXgoKTogbnVtYmVyIHtcbiAgICBjb25zdCBpc0ZpcnN0ID0gdGhpcy5fYWN0aXZlU2xpZGUgPT09IDA7XG5cbiAgICBpZiAoIWlzRmlyc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVTbGlkZSAtIDE7XG4gICAgfSBlbHNlIGlmICh0aGlzLndyYXAgJiYgaXNGaXJzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuaXRlbXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2FjdGl2ZVNsaWRlO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9jb250cm9sczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGFyazogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfaW5kaWNhdG9yczogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmlkZTogQm9vbGVhbklucHV0O1xufVxuIiwiPGRpdlxuICBjbGFzcz1cImNhcm91c2VsIHNsaWRlXCJcbiAgW2NsYXNzLmNhcm91c2VsLWZhZGVdPVwiYW5pbWF0aW9uID09PSAnZmFkZSdcIlxuICBbY2xhc3MuY2Fyb3VzZWwtZGFya109XCJkYXJrXCJcbj5cbiAgPGRpdiBjbGFzcz1cImNhcm91c2VsLWluZGljYXRvcnNcIiAqbmdJZj1cImluZGljYXRvcnNcIj5cbiAgICA8YnV0dG9uXG4gICAgICAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpdGVtczsgbGV0IGkgPSBpbmRleFwiXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaSA9PT0gYWN0aXZlU2xpZGVcIlxuICAgICAgW2F0dHIuYXJpYS1jdXJyZW50XT1cImkgPT09IGFjdGl2ZVNsaWRlXCJcbiAgICAgIChjbGljayk9XCJ0byhpKVwiXG4gICAgPjwvYnV0dG9uPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiY2Fyb3VzZWwtaW5uZXJcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuXG4gIDxidXR0b24gKm5nSWY9XCJjb250cm9sc1wiIGNsYXNzPVwiY2Fyb3VzZWwtY29udHJvbC1wcmV2XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJwcmV2KClcIj5cbiAgICA8c3BhbiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtcHJldi1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+UHJldmlvdXM8L3NwYW4+XG4gIDwvYnV0dG9uPlxuICA8YnV0dG9uICpuZ0lmPVwiY29udHJvbHNcIiBjbGFzcz1cImNhcm91c2VsLWNvbnRyb2wtbmV4dFwiIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwibmV4dCgpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJjYXJvdXNlbC1jb250cm9sLW5leHQtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cInZpc3VhbGx5LWhpZGRlblwiPk5leHQ8L3NwYW4+XG4gIDwvYnV0dG9uPlxuPC9kaXY+XG4iXX0=