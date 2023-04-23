import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class MdbScrollspyService {
    constructor() {
        this.scrollSpys = [];
        this.activeSubject = new Subject();
        this.active$ = this.activeSubject;
    }
    addScrollspy(scrollSpy) {
        this.scrollSpys.push(scrollSpy);
    }
    removeScrollspy(scrollSpyId) {
        const scrollSpyIndex = this.scrollSpys.findIndex((spy) => {
            return spy.id === scrollSpyId;
        });
        this.scrollSpys.splice(scrollSpyIndex, 1);
    }
    updateActiveState(scrollSpyId, activeLinkId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        const activeLink = scrollSpy.links.find((link) => {
            return link.id === activeLinkId;
        });
        this.setActiveLink(activeLink);
    }
    removeActiveState(scrollSpyId, activeLinkId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        const activeLink = scrollSpy.links.find((link) => {
            return link.id === activeLinkId;
        });
        if (!activeLink) {
            return;
        }
        activeLink.active = false;
        activeLink.detectChanges();
    }
    setActiveLink(activeLink) {
        if (activeLink) {
            activeLink.active = true;
            activeLink.detectChanges();
            this.activeSubject.next(activeLink);
        }
    }
    removeActiveLinks(scrollSpyId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        scrollSpy.links.forEach((link) => {
            link.active = false;
            link.detectChanges();
        });
    }
}
MdbScrollspyService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MdbScrollspyService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyService, decorators: [{
            type: Injectable
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsc3B5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvc2Nyb2xsc3B5L3Njcm9sbHNweS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFdEQsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQzs7QUFRM0MsTUFBTSxPQUFPLG1CQUFtQjtJQURoQztRQUVFLGVBQVUsR0FBbUIsRUFBRSxDQUFDO1FBRXhCLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQTZCLENBQUM7UUFDakUsWUFBTyxHQUFvQixJQUFJLENBQUMsYUFBYSxDQUFDO0tBd0UvQztJQXRFQyxZQUFZLENBQUMsU0FBdUI7UUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxXQUFtQjtRQUNqQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3ZELE9BQU8sR0FBRyxDQUFDLEVBQUUsS0FBSyxXQUFXLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELGlCQUFpQixDQUFDLFdBQW1CLEVBQUUsWUFBb0I7UUFDekQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM3QyxPQUFPLEdBQUcsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU87U0FDUjtRQUVELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLFlBQVksQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELGlCQUFpQixDQUFDLFdBQW1CLEVBQUUsWUFBb0I7UUFDekQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUM3QyxPQUFPLEdBQUcsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU87U0FDUjtRQUVELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0MsT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLFlBQVksQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixPQUFPO1NBQ1I7UUFFRCxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUMxQixVQUFVLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELGFBQWEsQ0FBQyxVQUEyQztRQUN2RCxJQUFJLFVBQVUsRUFBRTtZQUNkLFVBQVUsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNyQztJQUNILENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxXQUFtQjtRQUNuQyxNQUFNLFNBQVMsR0FBNkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN2RSxPQUFPLEdBQUcsQ0FBQyxFQUFFLEtBQUssV0FBVyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLE9BQU87U0FDUjtRQUVELFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Z0hBM0VVLG1CQUFtQjtvSEFBbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYlNjcm9sbHNweUxpbmtEaXJlY3RpdmUgfSBmcm9tICcuL3Njcm9sbHNweS1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWRiU2Nyb2xsc3B5IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlua3M6IFF1ZXJ5TGlzdDxNZGJTY3JvbGxzcHlMaW5rRGlyZWN0aXZlPjtcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1kYlNjcm9sbHNweVNlcnZpY2Uge1xuICBzY3JvbGxTcHlzOiBNZGJTY3JvbGxzcHlbXSA9IFtdO1xuXG4gIHByaXZhdGUgYWN0aXZlU3ViamVjdCA9IG5ldyBTdWJqZWN0PE1kYlNjcm9sbHNweUxpbmtEaXJlY3RpdmU+KCk7XG4gIGFjdGl2ZSQ6IE9ic2VydmFibGU8YW55PiA9IHRoaXMuYWN0aXZlU3ViamVjdDtcblxuICBhZGRTY3JvbGxzcHkoc2Nyb2xsU3B5OiBNZGJTY3JvbGxzcHkpOiB2b2lkIHtcbiAgICB0aGlzLnNjcm9sbFNweXMucHVzaChzY3JvbGxTcHkpO1xuICB9XG5cbiAgcmVtb3ZlU2Nyb2xsc3B5KHNjcm9sbFNweUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBzY3JvbGxTcHlJbmRleCA9IHRoaXMuc2Nyb2xsU3B5cy5maW5kSW5kZXgoKHNweSkgPT4ge1xuICAgICAgcmV0dXJuIHNweS5pZCA9PT0gc2Nyb2xsU3B5SWQ7XG4gICAgfSk7XG4gICAgdGhpcy5zY3JvbGxTcHlzLnNwbGljZShzY3JvbGxTcHlJbmRleCwgMSk7XG4gIH1cblxuICB1cGRhdGVBY3RpdmVTdGF0ZShzY3JvbGxTcHlJZDogc3RyaW5nLCBhY3RpdmVMaW5rSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbFNweSA9IHRoaXMuc2Nyb2xsU3B5cy5maW5kKChzcHkpID0+IHtcbiAgICAgIHJldHVybiBzcHkuaWQgPT09IHNjcm9sbFNweUlkO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzY3JvbGxTcHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVMaW5rID0gc2Nyb2xsU3B5LmxpbmtzLmZpbmQoKGxpbmspID0+IHtcbiAgICAgIHJldHVybiBsaW5rLmlkID09PSBhY3RpdmVMaW5rSWQ7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNldEFjdGl2ZUxpbmsoYWN0aXZlTGluayk7XG4gIH1cblxuICByZW1vdmVBY3RpdmVTdGF0ZShzY3JvbGxTcHlJZDogc3RyaW5nLCBhY3RpdmVMaW5rSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbFNweSA9IHRoaXMuc2Nyb2xsU3B5cy5maW5kKChzcHkpID0+IHtcbiAgICAgIHJldHVybiBzcHkuaWQgPT09IHNjcm9sbFNweUlkO1xuICAgIH0pO1xuXG4gICAgaWYgKCFzY3JvbGxTcHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhY3RpdmVMaW5rID0gc2Nyb2xsU3B5LmxpbmtzLmZpbmQoKGxpbmspID0+IHtcbiAgICAgIHJldHVybiBsaW5rLmlkID09PSBhY3RpdmVMaW5rSWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoIWFjdGl2ZUxpbmspIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhY3RpdmVMaW5rLmFjdGl2ZSA9IGZhbHNlO1xuICAgIGFjdGl2ZUxpbmsuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgc2V0QWN0aXZlTGluayhhY3RpdmVMaW5rOiBNZGJTY3JvbGxzcHlMaW5rRGlyZWN0aXZlIHwgYW55KTogdm9pZCB7XG4gICAgaWYgKGFjdGl2ZUxpbmspIHtcbiAgICAgIGFjdGl2ZUxpbmsuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIGFjdGl2ZUxpbmsuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5hY3RpdmVTdWJqZWN0Lm5leHQoYWN0aXZlTGluayk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQWN0aXZlTGlua3Moc2Nyb2xsU3B5SWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbFNweTogTWRiU2Nyb2xsc3B5IHwgdW5kZWZpbmVkID0gdGhpcy5zY3JvbGxTcHlzLmZpbmQoKHNweSkgPT4ge1xuICAgICAgcmV0dXJuIHNweS5pZCA9PT0gc2Nyb2xsU3B5SWQ7XG4gICAgfSk7XG5cbiAgICBpZiAoIXNjcm9sbFNweSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNjcm9sbFNweS5saW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICBsaW5rLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgbGluay5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==