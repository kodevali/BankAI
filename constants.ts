import { KPI, ProjectPhase, PhaseStatus } from './types';

export const PROJECT_NAME = "Google Workspace AI Enablement";
export const PROJECT_GOAL = "Equip all bank users with practical, day-to-day proficiency in Google Workspace AI tools to improve productivity, enhance output quality, and reduce manual workload.";

export const PHASES: ProjectPhase[] = [
  {
    id: 1,
    name: "Phase 1: Planning",
    focusArea: "Planning & Discovery",
    duration: "1–2 Weeks",
    keyActivities: [
      { name: "Sync with Learning & OD", timeline: "Day 1-3", completed: false },
      { name: "Survey leads for 'AI Wishlist'", timeline: "Day 4-7", completed: false },
      { name: "Confirm Google trainer", timeline: "Day 5", completed: false },
      { name: "Identify pain points", timeline: "Day 8-10", completed: false }
    ],
    deliverables: ["Scope Document signed off", "Curriculum Outline approved"],
    status: PhaseStatus.Active,
    progress: 15,
  },
  {
    id: 2,
    name: "Phase 2: Development",
    focusArea: "Content Development",
    duration: "1–2 Weeks",
    keyActivities: [
      { name: "Build decks & demo scripts", timeline: "Week 3", completed: false },
      { name: "Create banking scenarios", timeline: "Week 3", completed: false },
      { name: "Recruit Pilot Group (IT, Ops, HR)", timeline: "Week 4", completed: false }
    ],
    deliverables: ["Training Materials Draft 1.0", "Pilot Group confirmed"],
    status: PhaseStatus.Pending,
    progress: 0,
  },
  {
    id: 3,
    name: "Phase 3: Pilot",
    focusArea: "Pilot Program",
    duration: "1 Week",
    keyActivities: [
      { name: "Run Pilot Session", timeline: "Week 5, Tuesday", completed: false },
      { name: "Capture Q&A/confusion points", timeline: "Week 5, Wed", completed: false },
      { name: "Assess comprehension", timeline: "Week 5, Friday", completed: false }
    ],
    deliverables: ["Session delivered", "Feedback Report compiled"],
    status: PhaseStatus.Pending,
    progress: 0,
  },
  {
    id: 4,
    name: "Phase 4: Refinement",
    focusArea: "Curriculum Refinement",
    duration: "1–2 Weeks",
    keyActivities: [
      { name: "Update content based on pilot", timeline: "Week 6", completed: false },
      { name: "Finalize rollout schedule", timeline: "Week 6", completed: false },
      { name: "Develop dept-specific examples", timeline: "Week 7", completed: false }
    ],
    deliverables: ["Final Training Materials (2.0)", "Support Guides (PDFs) ready"],
    status: PhaseStatus.Pending,
    progress: 0,
  },
  {
    id: 5,
    name: "Phase 5: Rollout",
    focusArea: "Full Deployment",
    duration: "2–4 Weeks",
    keyActivities: [
      { name: "Wave 1: Ops & Finance", timeline: "Week 8-9", completed: false },
      { name: "Wave 2: HR, Marketing, Sales", timeline: "Week 10-11", completed: false },
      { name: "Track participation", timeline: "Ongoing", completed: false }
    ],
    deliverables: ["Training completed", "Attendance > 85%"],
    status: PhaseStatus.Pending,
    progress: 0,
  },
  {
    id: 6,
    name: "Phase 6: Sustainment",
    focusArea: "Review & Sustainment",
    duration: "1 Week",
    keyActivities: [
      { name: "Analyze adoption data", timeline: "Month 3", completed: false },
      { name: "Plan advanced sessions", timeline: "Month 3", completed: false },
      { name: "Identify Super Users", timeline: "Ongoing", completed: false }
    ],
    deliverables: ["Final Project Report", "Continuous Learning Plan"],
    status: PhaseStatus.Pending,
    progress: 0,
  },
];

export const KPIS: KPI[] = [
  { label: "Target Adoption", value: "0%", target: "80% (90 Days)", trend: "neutral" },
  { label: "Pilot Recruitment", value: "0/30", target: "30 Users", trend: "neutral" },
  { label: "Curriculum Readiness", value: "10%", target: "100%", trend: "neutral" },
  { label: "Budget Utilization", value: "0%", target: "On Track", trend: "neutral" },
];

export const generateProjectContext = (currentPhases: ProjectPhase[]) => `
Project: ${PROJECT_NAME}
Goal: ${PROJECT_GOAL}

Governance:
- Weekly Status Checks (15 mins)
- Phase Reviews (After Pilot & Milestones)
- Post-Implementation Review

Strategy: Phased Rollout (Assess -> Pilot -> Refine -> Launch).

Phase Details:
${currentPhases.map(p => `Phase ${p.id} (${p.duration}): ${p.focusArea}. Status: ${p.status}. 
Activities: ${p.keyActivities.map(a => `${a.name} [${a.completed ? 'DONE' : 'PENDING'}] (Due: ${a.dueDate || 'Not Set'}, Timeline: ${a.timeline})`).join(', ')}. 
Deliverables: ${p.deliverables.join(', ')}`).join('\n')}

Key Stakeholders: Project Lead, Learning & OD, Google Consultant.
`;

export const PROJECT_CONTEXT_FOR_AI = generateProjectContext(PHASES);
