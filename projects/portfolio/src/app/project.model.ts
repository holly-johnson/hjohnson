/** Shared shape for a Selected Work card, used by home and by unpublished.content. */

/**
 * A real product shot, cropped into the card's 16:10 plate. No alt text: the card is one
 * link whose name is its category, title and outcome, so the picture is decorative there.
 */
export interface ProjectImage {
  kind: 'image';
  src: string;
  /** Intrinsic pixel size, bound so the browser reserves space before the image loads. */
  width: number;
  height: number;
  /** object-position for the crop, e.g. 'left top'. Defaults to top. */
  position?: string;
  /**
   * 'contain' shows the whole image in a 4:3 box with no crop, plate or background.
   * For images cropped specifically for the card. Defaults to 'cover'.
   */
  fit?: 'cover' | 'contain';
  /**
   * Wraps the shot in a browser window: a hairline frame and a title bar. A bare
   * full-bleed screenshot has no edge, so it reads as texture rather than a screen.
   * Only for a single screen. A composite of several sites reads as one window and
   * misrepresents itself.
   */
  chrome?: boolean;
}

/**
 * A diagram drawn in markup, for work with no cleared imagery yet. Each kind is a
 * small version of a figure from that project's case study.
 */
export interface ProjectDiagram {
  kind: 'workflow' | 'orbit';
}

export type ProjectVisual = ProjectImage | ProjectDiagram;

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
