import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Component, Input, HostBinding, EventEmitter, ChangeDetectionStrategy, ContentChildren, Output, HostListener, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

class MdbCarouselItemComponent {
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

var Direction;
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(Direction || (Direction = {}));
class MdbCarouselComponent {
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

class MdbCarouselModule {
}
MdbCarouselModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCarouselModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbCarouselModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: MdbCarouselModule, declarations: [MdbCarouselComponent, MdbCarouselItemComponent], imports: [CommonModule], exports: [MdbCarouselComponent, MdbCarouselItemComponent] });
MdbCarouselModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCarouselModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbCarouselModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbCarouselComponent, MdbCarouselItemComponent],
                    exports: [MdbCarouselComponent, MdbCarouselItemComponent],
                    imports: [CommonModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbCarouselComponent, MdbCarouselItemComponent, MdbCarouselModule };
//# sourceMappingURL=mdb-angular-ui-kit-carousel.mjs.map
//# sourceMappingURL=mdb-angular-ui-kit-carousel.mjs.map
