import {
    Directive,
    TemplateRef,
    ViewContainerRef,
    effect,
    inject,
    input,
  } from '@angular/core';
  
  import { Permission } from './auth.model';
  import { AuthService } from './auth.service';
  
  @Directive({
    selector: '[appAuth]',
    standalone: true,
  })
  export class AuthDirective {
    userType = input.required<Permission>({ alias: 'appAuth' });
    private authService = inject(AuthService);
    private templateRef = inject(TemplateRef);
    private viewContainerRef = inject(ViewContainerRef);
  
    constructor() {
        effect(() => {  // Là một hàm dùng để theo dõi tự động các signal được gọi bên trong nó, và chạy lại mỗi khi signal đó thay đổi.
            console.log("userType",this.userType())
            if (this.authService.activePermission() === this.userType()) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainerRef.clear();
            }
        
        });
    }
  }