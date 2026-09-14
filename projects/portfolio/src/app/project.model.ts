/** Shared shape for a Selected Work entry, used by home and by unpublished.content. */
export interface ProjectFigure {
  src: string;
  alt: string;
  /** Intrinsic pixel size, bound so the browser reserves space before the image loads. */
  width: number;
  height: number;
}

/** The ROLE / YEAR / OUTCOME column beside the flagship case study. */
export interface FactRow {
  label: string;
  value: string;
  /** Renders in the accent colour, for the one fact worth landing on. */
  accent?: boolean;
}

export interface Project {
  id: string;
  /** Two-digit index shown in the work list. */
  num: string;
  title: string;
  discipline: string[];
  description: string;
  impact: string;
  link: string;
  /** One line for the work list. */
  blurb: string;
  /** Mono label at the end of the work-list row. */
  tag: string;
  facts?: FactRow[];
  /** A real product shot. Unset falls back to the drawn system placeholder. */
  figure?: ProjectFigure;
}
