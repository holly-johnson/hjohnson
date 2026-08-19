import { Component } from '@angular/core';

interface Layer {
  label: string;
  depth: number;
  open: boolean;
  active: boolean;
}

@Component({
  selector: 'app-ai-diagram',
  templateUrl: './ai-diagram.html',
})
export class AiDiagram {
  protected readonly toolbar = ['R', 'F', 'T'];

  protected readonly layers: Layer[] = [
    { label: 'Components', depth: 0, open: true, active: false },
    { label: '❖ Button', depth: 1, open: true, active: true },
    { label: 'Icon', depth: 2, open: false, active: false },
    { label: 'Label', depth: 2, open: false, active: false },
    { label: 'BG', depth: 2, open: false, active: false },
    { label: '❖ Input', depth: 1, open: false, active: false },
    { label: '❖ Badge', depth: 1, open: false, active: false },
  ];

  protected readonly inspect: [string, string][] = [
    ['W', '96px'],
    ['H', '32px'],
    ['Fill', '#B04318'],
    ['R', '0'],
  ];

  protected readonly lineNumbers = Array.from({ length: 15 }, (_, i) => i + 1);

  // Literal "{{label}}" for the fake Angular template shown in the editor —
  // kept as a string so Angular doesn't parse it as an interpolation.
  protected readonly labelBinding = '{{label}}';
}
