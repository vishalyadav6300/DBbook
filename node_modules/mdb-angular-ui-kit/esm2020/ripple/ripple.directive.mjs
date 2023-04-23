import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { colorToRGB, durationToMsNumber, getDiameter } from './ripple-utils';
import * as i0 from "@angular/core";
const TRANSITION_BREAK_OPACITY = 0.5;
const GRADIENT = 'rgba({{color}}, 0.2) 0, rgba({{color}}, 0.3) 40%, rgba({{color}}, 0.4) 50%, rgba({{color}}, 0.5) 60%, rgba({{color}}, 0) 70%';
const BOOTSTRAP_COLORS = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
];
export class MdbRippleDirective {
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._rippleCentered = false;
        this.rippleColor = '';
        this.rippleDuration = '500ms';
        this.rippleRadius = 0;
        this._rippleUnbound = false;
        this.ripple = true;
    }
    get rippleCentered() {
        return this._rippleCentered;
    }
    set rippleCentered(value) {
        this._rippleCentered = coerceBooleanProperty(value);
    }
    get rippleUnbound() {
        return this._rippleUnbound;
    }
    set rippleUnbound(value) {
        this._rippleUnbound = coerceBooleanProperty(value);
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    _createRipple(event) {
        const { layerX, layerY } = event;
        const offsetX = layerX;
        const offsetY = layerY;
        const height = this.host.offsetHeight;
        const width = this.host.offsetWidth;
        const duration = durationToMsNumber(this.rippleDuration);
        const diameterOptions = {
            offsetX: this.rippleCentered ? height / 2 : offsetX,
            offsetY: this.rippleCentered ? width / 2 : offsetY,
            height,
            width,
        };
        const diameter = getDiameter(diameterOptions);
        const radiusValue = this.rippleRadius || diameter / 2;
        const opacity = {
            delay: duration * TRANSITION_BREAK_OPACITY,
            duration: duration - duration * TRANSITION_BREAK_OPACITY,
        };
        const styles = {
            left: this.rippleCentered ? `${width / 2 - radiusValue}px` : `${offsetX - radiusValue}px`,
            top: this.rippleCentered ? `${height / 2 - radiusValue}px` : `${offsetY - radiusValue}px`,
            height: `${this.rippleRadius * 2 || diameter}px`,
            width: `${this.rippleRadius * 2 || diameter}px`,
            transitionDelay: `0s, ${opacity.delay}ms`,
            transitionDuration: `${duration}ms, ${opacity.duration}ms`,
        };
        const rippleHTML = this._renderer.createElement('div');
        this._createHTMLRipple(this.host, rippleHTML, styles);
        this._removeHTMLRipple(rippleHTML, duration);
    }
    _createHTMLRipple(wrapper, ripple, styles) {
        Object.keys(styles).forEach((property) => (ripple.style[property] = styles[property]));
        this._renderer.addClass(ripple, 'ripple-wave');
        if (this.rippleColor !== '') {
            this._removeOldColorClasses(wrapper);
            this._addColor(ripple, wrapper);
        }
        this._toggleUnbound(wrapper);
        this._appendRipple(ripple, wrapper);
    }
    _removeHTMLRipple(ripple, duration) {
        setTimeout(() => {
            if (ripple) {
                ripple.remove();
            }
        }, duration);
    }
    _appendRipple(target, parent) {
        const FIX_ADD_RIPPLE_EFFECT = 50; // delay for active animations
        this._renderer.appendChild(parent, target);
        setTimeout(() => {
            this._renderer.addClass(target, 'active');
        }, FIX_ADD_RIPPLE_EFFECT);
    }
    _toggleUnbound(target) {
        if (this.rippleUnbound) {
            this._renderer.addClass(target, 'ripple-surface-unbound');
        }
        else {
            this._renderer.removeClass(target, 'ripple-surface-unbound');
        }
    }
    _addColor(target, parent) {
        const isBootstrapColor = BOOTSTRAP_COLORS.find((color) => color === this.rippleColor.toLowerCase());
        if (isBootstrapColor) {
            this._renderer.addClass(parent, `${'ripple-surface'}-${this.rippleColor.toLowerCase()}`);
        }
        else {
            const rgbValue = colorToRGB(this.rippleColor).join(',');
            const gradientImage = GRADIENT.split('{{color}}').join(`${rgbValue}`);
            target.style.backgroundImage = `radial-gradient(circle, ${gradientImage})`;
        }
    }
    _removeOldColorClasses(target) {
        const REGEXP_CLASS_COLOR = new RegExp(`${'ripple-surface'}-[a-z]+`, 'gi');
        const PARENT_CLASSS_COLOR = target.classList.value.match(REGEXP_CLASS_COLOR) || [];
        PARENT_CLASSS_COLOR.forEach((className) => {
            this._renderer.removeClass(target, className);
        });
    }
}
MdbRippleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRippleDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
MdbRippleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbRippleDirective, selector: "[mdbRipple]", inputs: { rippleCentered: "rippleCentered", rippleColor: "rippleColor", rippleDuration: "rippleDuration", rippleRadius: "rippleRadius", rippleUnbound: "rippleUnbound" }, host: { listeners: { "click": "_createRipple($event)" }, properties: { "class.ripple-surface": "this.ripple" } }, exportAs: ["mdbRipple"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRippleDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbRipple]',
                    exportAs: 'mdbRipple',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { rippleCentered: [{
                type: Input
            }], rippleColor: [{
                type: Input
            }], rippleDuration: [{
                type: Input
            }], rippleRadius: [{
                type: Input
            }], rippleUnbound: [{
                type: Input
            }], ripple: [{
                type: HostBinding,
                args: ['class.ripple-surface']
            }], _createRipple: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmlwcGxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9yaXBwbGUvcmlwcGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUFFLFNBQVMsRUFBYyxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDOztBQUU3RSxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FBQztBQUVyQyxNQUFNLFFBQVEsR0FDWiw4SEFBOEgsQ0FBQztBQUNqSSxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLFNBQVM7SUFDVCxXQUFXO0lBQ1gsU0FBUztJQUNULFFBQVE7SUFDUixTQUFTO0lBQ1QsTUFBTTtJQUNOLE9BQU87SUFDUCxNQUFNO0NBQ1AsQ0FBQztBQU9GLE1BQU0sT0FBTyxrQkFBa0I7SUF1QjdCLFlBQW9CLFdBQXVCLEVBQVUsU0FBb0I7UUFBckQsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBZmpFLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXZCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLGlCQUFZLEdBQUcsQ0FBQyxDQUFDO1FBU2xCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBUU0sV0FBTSxHQUFHLElBQUksQ0FBQztJQU55QixDQUFDO0lBdEI3RSxJQUNJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFDRCxJQUFJLGNBQWMsQ0FBQyxLQUFjO1FBQy9CLElBQUksQ0FBQyxlQUFlLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQU9ELElBQ0ksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxhQUFhLENBQUMsS0FBYztRQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFLRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFLRCxhQUFhLENBQUMsS0FBVTtRQUN0QixNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNqQyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdkIsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN6RCxNQUFNLGVBQWUsR0FBRztZQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztZQUNuRCxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTztZQUNsRCxNQUFNO1lBQ04sS0FBSztTQUNOLENBQUM7UUFDRixNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDOUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXRELE1BQU0sT0FBTyxHQUFHO1lBQ2QsS0FBSyxFQUFFLFFBQVEsR0FBRyx3QkFBd0I7WUFDMUMsUUFBUSxFQUFFLFFBQVEsR0FBRyxRQUFRLEdBQUcsd0JBQXdCO1NBQ3pELENBQUM7UUFFRixNQUFNLE1BQU0sR0FBRztZQUNiLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsV0FBVyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHLFdBQVcsSUFBSTtZQUN6RixHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxHQUFHLFdBQVcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxXQUFXLElBQUk7WUFDekYsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLElBQUksUUFBUSxJQUFJO1lBQ2hELEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLFFBQVEsSUFBSTtZQUMvQyxlQUFlLEVBQUUsT0FBTyxPQUFPLENBQUMsS0FBSyxJQUFJO1lBQ3pDLGtCQUFrQixFQUFFLEdBQUcsUUFBUSxPQUFPLE9BQU8sQ0FBQyxRQUFRLElBQUk7U0FDM0QsQ0FBQztRQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxPQUFvQixFQUFFLE1BQW1CLEVBQUUsTUFBVztRQUM5RSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRS9DLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxFQUFFLEVBQUU7WUFDM0IsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU8saUJBQWlCLENBQUMsTUFBbUIsRUFBRSxRQUFnQjtRQUM3RCxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ2YsQ0FBQztJQUVELGFBQWEsQ0FBQyxNQUFtQixFQUFFLE1BQW1CO1FBQ3BELE1BQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDLENBQUMsOEJBQThCO1FBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzQyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjLENBQUMsTUFBbUI7UUFDaEMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1NBQzNEO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsTUFBbUIsRUFBRSxNQUFtQjtRQUNoRCxNQUFNLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FDNUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxDQUNwRCxDQUFDO1FBRUYsSUFBSSxnQkFBZ0IsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUMxRjthQUFNO1lBQ0wsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEQsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLDJCQUEyQixhQUFhLEdBQUcsQ0FBQztTQUM1RTtJQUNILENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxNQUFtQjtRQUN4QyxNQUFNLGtCQUFrQixHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsZ0JBQWdCLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxRSxNQUFNLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNuRixtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzsrR0E3SFUsa0JBQWtCO21HQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFMOUIsU0FBUzttQkFBQztvQkFDVCw4REFBOEQ7b0JBQzlELFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsV0FBVztpQkFDdEI7eUhBR0ssY0FBYztzQkFEakIsS0FBSztnQkFTRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFHRixhQUFhO3NCQURoQixLQUFLO2dCQWUrQixNQUFNO3NCQUExQyxXQUFXO3VCQUFDLHNCQUFzQjtnQkFHbkMsYUFBYTtzQkFEWixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgY29sb3JUb1JHQiwgZHVyYXRpb25Ub01zTnVtYmVyLCBnZXREaWFtZXRlciB9IGZyb20gJy4vcmlwcGxlLXV0aWxzJztcblxuY29uc3QgVFJBTlNJVElPTl9CUkVBS19PUEFDSVRZID0gMC41O1xuXG5jb25zdCBHUkFESUVOVCA9XG4gICdyZ2JhKHt7Y29sb3J9fSwgMC4yKSAwLCByZ2JhKHt7Y29sb3J9fSwgMC4zKSA0MCUsIHJnYmEoe3tjb2xvcn19LCAwLjQpIDUwJSwgcmdiYSh7e2NvbG9yfX0sIDAuNSkgNjAlLCByZ2JhKHt7Y29sb3J9fSwgMCkgNzAlJztcbmNvbnN0IEJPT1RTVFJBUF9DT0xPUlMgPSBbXG4gICdwcmltYXJ5JyxcbiAgJ3NlY29uZGFyeScsXG4gICdzdWNjZXNzJyxcbiAgJ2RhbmdlcicsXG4gICd3YXJuaW5nJyxcbiAgJ2luZm8nLFxuICAnbGlnaHQnLFxuICAnZGFyaycsXG5dO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiUmlwcGxlXScsXG4gIGV4cG9ydEFzOiAnbWRiUmlwcGxlJyxcbn0pXG5leHBvcnQgY2xhc3MgTWRiUmlwcGxlRGlyZWN0aXZlIHtcbiAgQElucHV0KClcbiAgZ2V0IHJpcHBsZUNlbnRlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yaXBwbGVDZW50ZXJlZDtcbiAgfVxuICBzZXQgcmlwcGxlQ2VudGVyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yaXBwbGVDZW50ZXJlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfcmlwcGxlQ2VudGVyZWQgPSBmYWxzZTtcblxuICBASW5wdXQoKSByaXBwbGVDb2xvciA9ICcnO1xuICBASW5wdXQoKSByaXBwbGVEdXJhdGlvbiA9ICc1MDBtcyc7XG4gIEBJbnB1dCgpIHJpcHBsZVJhZGl1cyA9IDA7XG5cbiAgQElucHV0KClcbiAgZ2V0IHJpcHBsZVVuYm91bmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JpcHBsZVVuYm91bmQ7XG4gIH1cbiAgc2V0IHJpcHBsZVVuYm91bmQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yaXBwbGVVbmJvdW5kID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yaXBwbGVVbmJvdW5kID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBnZXQgaG9zdCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucmlwcGxlLXN1cmZhY2UnKSByaXBwbGUgPSB0cnVlO1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgX2NyZWF0ZVJpcHBsZShldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgeyBsYXllclgsIGxheWVyWSB9ID0gZXZlbnQ7XG4gICAgY29uc3Qgb2Zmc2V0WCA9IGxheWVyWDtcbiAgICBjb25zdCBvZmZzZXRZID0gbGF5ZXJZO1xuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuaG9zdC5vZmZzZXRIZWlnaHQ7XG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmhvc3Qub2Zmc2V0V2lkdGg7XG4gICAgY29uc3QgZHVyYXRpb24gPSBkdXJhdGlvblRvTXNOdW1iZXIodGhpcy5yaXBwbGVEdXJhdGlvbik7XG4gICAgY29uc3QgZGlhbWV0ZXJPcHRpb25zID0ge1xuICAgICAgb2Zmc2V0WDogdGhpcy5yaXBwbGVDZW50ZXJlZCA/IGhlaWdodCAvIDIgOiBvZmZzZXRYLFxuICAgICAgb2Zmc2V0WTogdGhpcy5yaXBwbGVDZW50ZXJlZCA/IHdpZHRoIC8gMiA6IG9mZnNldFksXG4gICAgICBoZWlnaHQsXG4gICAgICB3aWR0aCxcbiAgICB9O1xuICAgIGNvbnN0IGRpYW1ldGVyID0gZ2V0RGlhbWV0ZXIoZGlhbWV0ZXJPcHRpb25zKTtcbiAgICBjb25zdCByYWRpdXNWYWx1ZSA9IHRoaXMucmlwcGxlUmFkaXVzIHx8IGRpYW1ldGVyIC8gMjtcblxuICAgIGNvbnN0IG9wYWNpdHkgPSB7XG4gICAgICBkZWxheTogZHVyYXRpb24gKiBUUkFOU0lUSU9OX0JSRUFLX09QQUNJVFksXG4gICAgICBkdXJhdGlvbjogZHVyYXRpb24gLSBkdXJhdGlvbiAqIFRSQU5TSVRJT05fQlJFQUtfT1BBQ0lUWSxcbiAgICB9O1xuXG4gICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgbGVmdDogdGhpcy5yaXBwbGVDZW50ZXJlZCA/IGAke3dpZHRoIC8gMiAtIHJhZGl1c1ZhbHVlfXB4YCA6IGAke29mZnNldFggLSByYWRpdXNWYWx1ZX1weGAsXG4gICAgICB0b3A6IHRoaXMucmlwcGxlQ2VudGVyZWQgPyBgJHtoZWlnaHQgLyAyIC0gcmFkaXVzVmFsdWV9cHhgIDogYCR7b2Zmc2V0WSAtIHJhZGl1c1ZhbHVlfXB4YCxcbiAgICAgIGhlaWdodDogYCR7dGhpcy5yaXBwbGVSYWRpdXMgKiAyIHx8IGRpYW1ldGVyfXB4YCxcbiAgICAgIHdpZHRoOiBgJHt0aGlzLnJpcHBsZVJhZGl1cyAqIDIgfHwgZGlhbWV0ZXJ9cHhgLFxuICAgICAgdHJhbnNpdGlvbkRlbGF5OiBgMHMsICR7b3BhY2l0eS5kZWxheX1tc2AsXG4gICAgICB0cmFuc2l0aW9uRHVyYXRpb246IGAke2R1cmF0aW9ufW1zLCAke29wYWNpdHkuZHVyYXRpb259bXNgLFxuICAgIH07XG5cbiAgICBjb25zdCByaXBwbGVIVE1MID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0aGlzLl9jcmVhdGVIVE1MUmlwcGxlKHRoaXMuaG9zdCwgcmlwcGxlSFRNTCwgc3R5bGVzKTtcbiAgICB0aGlzLl9yZW1vdmVIVE1MUmlwcGxlKHJpcHBsZUhUTUwsIGR1cmF0aW9uKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUhUTUxSaXBwbGUod3JhcHBlcjogSFRNTEVsZW1lbnQsIHJpcHBsZTogSFRNTEVsZW1lbnQsIHN0eWxlczogYW55KTogdm9pZCB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKChwcm9wZXJ0eSkgPT4gKHJpcHBsZS5zdHlsZVtwcm9wZXJ0eV0gPSBzdHlsZXNbcHJvcGVydHldKSk7XG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3MocmlwcGxlLCAncmlwcGxlLXdhdmUnKTtcblxuICAgIGlmICh0aGlzLnJpcHBsZUNvbG9yICE9PSAnJykge1xuICAgICAgdGhpcy5fcmVtb3ZlT2xkQ29sb3JDbGFzc2VzKHdyYXBwZXIpO1xuICAgICAgdGhpcy5fYWRkQ29sb3IocmlwcGxlLCB3cmFwcGVyKTtcbiAgICB9XG5cbiAgICB0aGlzLl90b2dnbGVVbmJvdW5kKHdyYXBwZXIpO1xuICAgIHRoaXMuX2FwcGVuZFJpcHBsZShyaXBwbGUsIHdyYXBwZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlSFRNTFJpcHBsZShyaXBwbGU6IEhUTUxFbGVtZW50LCBkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAocmlwcGxlKSB7XG4gICAgICAgIHJpcHBsZS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9LCBkdXJhdGlvbik7XG4gIH1cblxuICBfYXBwZW5kUmlwcGxlKHRhcmdldDogSFRNTEVsZW1lbnQsIHBhcmVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBGSVhfQUREX1JJUFBMRV9FRkZFQ1QgPSA1MDsgLy8gZGVsYXkgZm9yIGFjdGl2ZSBhbmltYXRpb25zXG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQocGFyZW50LCB0YXJnZXQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGFyZ2V0LCAnYWN0aXZlJyk7XG4gICAgfSwgRklYX0FERF9SSVBQTEVfRUZGRUNUKTtcbiAgfVxuXG4gIF90b2dnbGVVbmJvdW5kKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yaXBwbGVVbmJvdW5kKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0YXJnZXQsICdyaXBwbGUtc3VyZmFjZS11bmJvdW5kJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3JpcHBsZS1zdXJmYWNlLXVuYm91bmQnKTtcbiAgICB9XG4gIH1cblxuICBfYWRkQ29sb3IodGFyZ2V0OiBIVE1MRWxlbWVudCwgcGFyZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIGNvbnN0IGlzQm9vdHN0cmFwQ29sb3IgPSBCT09UU1RSQVBfQ09MT1JTLmZpbmQoXG4gICAgICAoY29sb3IpID0+IGNvbG9yID09PSB0aGlzLnJpcHBsZUNvbG9yLnRvTG93ZXJDYXNlKClcbiAgICApO1xuXG4gICAgaWYgKGlzQm9vdHN0cmFwQ29sb3IpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHBhcmVudCwgYCR7J3JpcHBsZS1zdXJmYWNlJ30tJHt0aGlzLnJpcHBsZUNvbG9yLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHJnYlZhbHVlID0gY29sb3JUb1JHQih0aGlzLnJpcHBsZUNvbG9yKS5qb2luKCcsJyk7XG4gICAgICBjb25zdCBncmFkaWVudEltYWdlID0gR1JBRElFTlQuc3BsaXQoJ3t7Y29sb3J9fScpLmpvaW4oYCR7cmdiVmFsdWV9YCk7XG4gICAgICB0YXJnZXQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHJhZGlhbC1ncmFkaWVudChjaXJjbGUsICR7Z3JhZGllbnRJbWFnZX0pYDtcbiAgICB9XG4gIH1cblxuICBfcmVtb3ZlT2xkQ29sb3JDbGFzc2VzKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBSRUdFWFBfQ0xBU1NfQ09MT1IgPSBuZXcgUmVnRXhwKGAkeydyaXBwbGUtc3VyZmFjZSd9LVthLXpdK2AsICdnaScpO1xuICAgIGNvbnN0IFBBUkVOVF9DTEFTU1NfQ09MT1IgPSB0YXJnZXQuY2xhc3NMaXN0LnZhbHVlLm1hdGNoKFJFR0VYUF9DTEFTU19DT0xPUikgfHwgW107XG4gICAgUEFSRU5UX0NMQVNTU19DT0xPUi5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRhcmdldCwgY2xhc3NOYW1lKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9yaXBwbGVDZW50ZXJlZDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfcmlwcGxlVW5ib3VuZDogQm9vbGVhbklucHV0O1xufVxuIl19