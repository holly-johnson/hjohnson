/** Shared shape for a Selected Work card, used by home and by unpublished.content. */

/**
 * A real product shot, cropped into the card's 16:10 plate. No alt text: the card is one
 * link whose name is its category, title and outcome, so the picture is decorative there.
 */
export interface ProjectImage {
  kind: 'image';
  src: string;
  /**
   * The same shot with dark browser chrome, swapped in under .dark. Only for a framed
   * shot: the page inside stays light either way, it is the window around it that has
   * to sit on the right background.
   */
  srcDark?: string;
  /** Intrinsic pixel size, bound so the browser reserves space before the image loads. */
  width: number;
  height: number;
  /** object-position for the crop, e.g. 'left top'. Defaults to top. */
  position?: string;
  /**
   * How the shot meets its slot. 'framed' is for a shot that already carries its own
   * browser window and transparent surround: shown whole, with no plate behind it.
   * Defaults to 'cover'.
   */
  fit?: 'cover' | 'framed';
}

export type ProjectVisual = ProjectImage;

export interface Project {
  id: string;
  title: string;
  /** Mono label above the title. */
  category: string;
  /** One outcome-led sentence. */
  outcome: string;
  capabilities: string[];
  link: string;
  visual: ProjectVisual;
}
