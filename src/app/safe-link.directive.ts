import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',  // Directive sẽ áp dụng lên <a> có thuộc tính appSafeLink
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)', // là 1 option trong decorator @Directive() hoặc @Component(), 
    // cho phép bạn gán sự kiện hoặc thuộc tính trực tiếp lên phần tử DOM mà directive/component đó được gắn vào.
    // ==> Khi người dùng click vào phần tử <a> có gắn directive appSafeLink, thì gọi hàm onConfirmLeavePage() của directive đó.
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective is active!');
  console.log("hostElementRef",this.hostElementRef)

  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href =
        address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}