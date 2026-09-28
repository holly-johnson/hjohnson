import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Step {
  label: string;
  sub: string;
}

interface Pane {
  label: string;
  role: string;
  holds: string[];
}

interface Audience {
  group: string;
  before: string;
  after: string;
}

/**
 * Orbit. Same page IA as the other case studies: hero, numbered sections, sticky table
 * of contents, next-project footer.
 *
 * No screenshots exist outside Penlink, so every figure here is pure markup and the
 * ones depicting the interface say they are reconstructions. Source material for the
 * copy is `projects/portfolio/ORBIT-DEBRIEF.md`.
 */
@Component({
  selector: 'app-orbit-case-study',
  imports: [RouterLink],
  templateUrl: './orbit-case-study.html',
})
export class OrbitCaseStudy {
  // §01, the process gaps Orbit was aimed at
  protected readonly gaps: string[] = [
    'Designers started a feature with no requirements.',
    'Nothing held everything known about a feature in one place.',
    'Training and technical writing got no advance notice of what was coming.',
    'Even once they knew, no history explained how a feature became what it was.',
    'Handoff specs varied designer to designer.',
    'Engineering worked out how to read every feature from scratch.',
  ];

  // §02, the kickoff questions, wording approximate
  protected readonly kickoffQuestions: string[] = [
    'What are the main user goals and pain points?',
    'What specific user problem does this feature solve?',
    'What evidence do we have that the problem exists?',
    'What is the current workflow, if there is one?',
    'What does success look like?',
    'What are the constraints, and what is the MVP?',
  ];

  // §02, the workspace, reconstructed left to right
  protected readonly panes: Pane[] = [
    {
      label: 'Claude',
      role: 'The partner',
      holds: ['Feature conversation', 'Mission context loaded', 'Prototype generation'],
    },
    {
      label: 'Missions',
      role: 'The list',
      holds: ['Every feature in flight', 'Open one to load it'],
    },
    {
      label: 'Mission detail',
      role: 'The record',
      holds: ['Kickoff answers', 'Notes and concerns', 'Research', 'Specs', 'Prototype links'],
    },
  ];

  // §03, where a generated component landed
  protected readonly inLibrary: Step = {
    label: 'Published Helios component',
    sub: 'the prototype can only do what the system supports',
  };

  protected readonly outsideLibrary: Step[] = [
    { label: 'Built into the scaffolding folder', sub: 'flagged as outside the library' },
    { label: 'Reviewed against Helios', sub: 'switch components, or a new one exists' },
    { label: 'Returns as a contribution', sub: 'the gap closes in the system' },
  ];

  // §04, mission to shareable link
  protected readonly pipeline: Step[] = [
    { label: 'Create the mission', sub: 'a branch is created with it' },
    { label: 'Push the prototype', sub: 'to the remote branch' },
    { label: 'CI/CD runs', sub: 'on a private server' },
    { label: 'A live link', sub: 'reviewable anywhere, by anyone' },
  ];

  // §04, what each group got out of it
  protected readonly audiences: Audience[] = [
    {
      group: 'Product',
      before: 'One product manager was already prototyping this way, alone, on a local machine with no way to share it.',
      after: 'The same instinct, somewhere the rest of the team could see it and answer back.',
    },
    {
      group: 'Engineering',
      before: 'Specs read differently depending on who wrote them.',
      after: 'A working prototype, and specs that read the same way every time.',
    },
    {
      group: 'QA',
      before: 'Testing ran with little context about what the feature was for.',
      after: 'The intent and the history, so the test plan covered what mattered.',
    },
    {
      group: 'Training and technical writing',
      before: 'They found out at release, then went hunting for the screens.',
      after: 'Training drafted against the prototype before release, with live screens added after.',
    },
  ];

  // §05, tradeoffs and what went wrong
  protected readonly tradeoffs: { title: string; body: string }[] = [
    {
      title: 'Designers did not want to be that close to code.',
      body: 'The normal preference is to work with good engineers and stay out of the repository. Watching a prototype appear that behaved like the real product changed that faster than any argument for it.',
    },
    {
      title: "Orbit's ceiling was Helios's coverage.",
      body: 'Early prototypes looked wrong, because the library was incomplete. Orbit only started working as more components and more of the infrastructure landed. An AI workflow is worth exactly as much as the system underneath it.',
    },
    {
      title: 'The entry cost was mine to fix.',
      body: 'The first kickoff interview was too long. People will not fill out a form to find out whether a tool is useful, so the question set was cut down until getting in was cheap.',
    },
    {
      title: 'Running inside Claude kept it free and kept it limited.',
      body: 'Using the browser chat avoided paying to embed a model. The cost was that the workspace lost its AI when it was opened anywhere else.',
    },
  ];
}
