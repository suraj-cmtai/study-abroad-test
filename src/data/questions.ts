
export interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

export const testQuestions: Question[] = [
  {
    id: 1,
    question: "When working on a project, what motivates you most?",
    options: [
      "Solving complex problems step by step",
      "Creating something beautiful and innovative",
      "Helping others achieve their goals",
      "Leading a team to success"
    ],
    category: "Motivation"
  },
  {
    id: 2,
    question: "In a group discussion, you typically:",
    options: [
      "Listen carefully and contribute thoughtful insights",
      "Take charge and guide the conversation",
      "Ask clarifying questions to understand better",
      "Support others' ideas and build on them"
    ],
    category: "Communication"
  },
  {
    id: 3,
    question: "When faced with a difficult decision, you prefer to:",
    options: [
      "Analyze all available data and facts",
      "Trust your instincts and gut feeling",
      "Seek advice from trusted mentors",
      "Consider the impact on all stakeholders"
    ],
    category: "Decision Making"
  },
  {
    id: 4,
    question: "What type of work environment energizes you most?",
    options: [
      "Quiet space where I can focus deeply",
      "Collaborative workspace with team interaction",
      "Dynamic environment with variety and change",
      "Structured setting with clear procedures"
    ],
    category: "Work Environment"
  },
  {
    id: 5,
    question: "When learning something new, you prefer to:",
    options: [
      "Read detailed explanations and theory",
      "Jump in and learn through hands-on practice",
      "Watch others demonstrate first",
      "Discuss concepts with peers or mentors"
    ],
    category: "Learning Style"
  },
  {
    id: 6,
    question: "Which achievement would make you feel most fulfilled?",
    options: [
      "Discovering an innovative solution to a technical problem",
      "Creating a product that improves people's lives",
      "Building strong relationships and networks",
      "Leading organizational change successfully"
    ],
    category: "Achievement"
  },
  {
    id: 7,
    question: "When working under pressure, you tend to:",
    options: [
      "Break down the problem into manageable parts",
      "Rely on creativity to find unconventional solutions",
      "Seek support and collaboration from others",
      "Focus on the most critical tasks first"
    ],
    category: "Stress Management"
  },
  {
    id: 8,
    question: "What aspect of work gives you the most satisfaction?",
    options: [
      "Mastering complex technical skills",
      "Expressing creativity and original thinking",
      "Making meaningful connections with people",
      "Achieving measurable results and goals"
    ],
    category: "Job Satisfaction"
  },
  {
    id: 9,
    question: "In your ideal career, you would spend most time:",
    options: [
      "Analyzing data and solving logical puzzles",
      "Designing and creating new concepts",
      "Mentoring and developing others",
      "Planning and executing strategic initiatives"
    ],
    category: "Daily Activities"
  },
  {
    id: 10,
    question: "When presenting ideas, you're most comfortable:",
    options: [
      "Presenting to small groups with detailed analysis",
      "Sharing creative concepts with visual aids",
      "Facilitating interactive discussions",
      "Delivering structured presentations to leadership"
    ],
    category: "Presentation Style"
  },
  {
    id: 11,
    question: "What drives your career decisions most?",
    options: [
      "Opportunities to develop expertise and specialization",
      "Creative freedom and artistic expression",
      "Potential to make a positive social impact",
      "Leadership opportunities and career advancement"
    ],
    category: "Career Drivers"
  },
  {
    id: 12,
    question: "When facing a setback, you typically:",
    options: [
      "Analyze what went wrong and develop a systematic fix",
      "Look for alternative approaches and creative workarounds",
      "Seek emotional support and perspective from others",
      "Refocus on long-term goals and push forward"
    ],
    category: "Resilience"
  },
  {
    id: 13,
    question: "In team projects, you naturally:",
    options: [
      "Focus on ensuring technical accuracy and quality",
      "Generate new ideas and innovative approaches",
      "Facilitate communication and resolve conflicts",
      "Coordinate tasks and keep everyone on track"
    ],
    category: "Team Role"
  },
  {
    id: 14,
    question: "What type of feedback helps you improve most?",
    options: [
      "Specific, detailed analysis of technical performance",
      "Constructive critique of creative and innovative aspects",
      "Feedback on interpersonal skills and collaboration",
      "Strategic guidance on leadership and decision-making"
    ],
    category: "Feedback Preference"
  },
  {
    id: 15,
    question: "When choosing between opportunities, you prioritize:",
    options: [
      "Intellectual challenge and skill development",
      "Creative potential and artistic freedom",
      "Social impact and helping others",
      "Growth opportunities and recognition"
    ],
    category: "Priorities"
  },
  {
    id: 16,
    question: "Your ideal work pace involves:",
    options: [
      "Deep, focused work with minimal interruptions",
      "Bursts of intensive creativity with flexible timing",
      "Regular interaction and collaboration throughout the day",
      "Structured schedule with clear deadlines and milestones"
    ],
    category: "Work Pace"
  },
  {
    id: 17,
    question: "When exploring career options, you're most drawn to:",
    options: [
      "Fields requiring analytical and technical expertise",
      "Industries focused on design and innovation",
      "Sectors dedicated to education and social services",
      "Organizations with clear hierarchies and advancement paths"
    ],
    category: "Industry Interest"
  },
  {
    id: 18,
    question: "What energizes you most about work?",
    options: [
      "Solving complex puzzles and technical challenges",
      "Bringing original ideas to life",
      "Building relationships and supporting others' growth",
      "Achieving ambitious goals and driving results"
    ],
    category: "Energy Source"
  },
  {
    id: 19,
    question: "In your ideal role, success would be measured by:",
    options: [
      "Technical excellence and expertise recognition",
      "Creative innovation and artistic achievement",
      "Positive impact on individuals and communities",
      "Business results and organizational leadership"
    ],
    category: "Success Metrics"
  },
  {
    id: 20,
    question: "Looking ahead 5 years, you hope to be known for:",
    options: [
      "Deep expertise and technical mastery in your field",
      "Creative breakthrough and innovative contributions",
      "Positive influence on others' personal and professional growth",
      "Strategic leadership and organizational impact"
    ],
    category: "Future Vision"
  }
];
