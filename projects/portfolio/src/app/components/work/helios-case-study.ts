import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Helios, flagship case study. Follows the same page IA as the other case studies:
 * hero, numbered sections, sticky table of contents, and next-project footer.
 */
@Component({
  selector: 'app-helios-case-study',
  imports: [RouterLink],
  templateUrl: './helios-case-study.html',
})
export class HeliosCaseStudy {}
