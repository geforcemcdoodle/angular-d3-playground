import { Component, Input } from '@angular/core';
import { Link } from '../../../models';

@Component({
  selector: '[linkVisual]',
  standalone: true,
  templateUrl: './link-visual.component.svg',  
})
export class LinkVisualComponent {
  @Input('link') link!: Link;
}
