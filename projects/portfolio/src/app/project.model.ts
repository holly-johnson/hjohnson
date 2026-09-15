/** Shared shape for a Selected Work entry, used by home and by unpublished.content. */
export interface ProjectFigure {
  src: string;
  alt: string;
  /** Intrinsic pixel size, bound so the browser reserves space before the image loads. */
  width: number;
  height: number;
}

/** The mono metadata rail beside a Selected Work entry. */
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
  /** Mono kicker above the entry title. */
  tag: string;
  /** Text of the entry's one link, without the arrow. */
  linkLabel: string;
  facts: FactRow[];
  /** A real product shot. Unset falls back to the drawn system placeholder. */
  figure?: ProjectFigure;
}
