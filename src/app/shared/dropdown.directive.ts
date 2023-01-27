//No sirve
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  @Input() buttonToListen: HTMLElement;

  @HostBinding('class.show') isOpen = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    // this.isOpen = !this.isOpen;
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }

  constructor(private elRef: ElementRef) {}

  ngOnInit() {
    console.log('Hola bue: ' + this.buttonToListen);
  }
}
