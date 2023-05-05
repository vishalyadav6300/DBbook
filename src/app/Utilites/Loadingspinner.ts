import { Directive, ViewContainerRef, TemplateRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appLoading]'
})
export class LoadingDirective implements OnInit {
  @Input() appLoading: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) { }

  ngOnInit(): void {
    if (this.appLoading) {
      this.viewContainerRef.clear();
      console.log("loading")
    //   const loadingElement = document.createElement('div');
    //   loadingElement.innerHTML = `
    //     <div class="spinner-border text-primary" role="status">
    //       <span class="sr-only">Loading...</span>
    //     </div>
    //   `;
    //   this.viewContainerRef.element.nativeElement.appendChild(loadingElement);
    } else {
        console.log("loading")
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
