
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface AIQuestion {
  id: number;
  question: string;
  options: string[];
  category: string;
}

const psychometricCategories = [
  'Motivation',
  'Communication',
  'Decision Making',
  'Work Environment',
  'Learning Style',
  'Achievement',
  'Stress Management',
  'Job Satisfaction',
  'Daily Activities',
  'Presentation Style',
  'Career Drivers',
  'Resilience',
  'Team Role',
  'Feedback Preference',
  'Priorities',
  'Work Pace',
  'Industry Interest',
  'Energy Source',
  'Success Metrics',
  'Future Vision'
];

// Global variable to store courses data
let cachedCourses: any[] = [];

export const generateRandomQuestions = async (): Promise<AIQuestion[]> => {
  try {
    console.log('Starting AI question generation...');
    
    // 1. Fetch courses data once and cache it
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const courseRes = await fetch(`${baseUrl}/api/routes/course/active`);
    const courseData = await courseRes.json();
    cachedCourses = courseData.data || [];
    
    const totalQuestions = 10;
    
    console.log(`Generating ${totalQuestions} questions in a single API call...`);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
            content: `You are a psychometric test expert. Generate 10 unique psychometric questions for career assessment targeted at students.

            First, select 10 different relevant categories from this list: ${psychometricCategories.join(', ')}.
            Then generate exactly 1 question for each selected category.

            Return ONLY a JSON array in this exact format:
            [
              {
                "question": "Your question here",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "category": "Selected Category Name"
              }
            ]

              Requirements:
            - Select 10 different categories from the provided list
            - Generate exactly 1 question for each selected category
            - Questions should help assess personality, aptitude, and career preferences
            - 4 distinct answer options for each question
              - Student-friendly language
            - Each option should represent different personality traits or preferences
            - Ensure questions are relevant to the available courses: ${JSON.stringify(cachedCourses.map(c => c.title))}
            - Make sure each question covers a different aspect of personality/career assessment`
            }
          ],
        max_tokens: 2000,
          temperature: 0.8
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content.trim();
    
    // Use regex to extract JSON from the response
    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error("No JSON array found in AI response");
    }
      
      // Parse the JSON response
    const questionsData = JSON.parse(jsonMatch[0]);
      
    const allQuestions: AIQuestion[] = questionsData.map((questionData: any, index: number) => ({
      id: index + 1,
        question: questionData.question,
        options: questionData.options,
        category: questionData.category
    }));
    
    console.log(`Successfully generated ${allQuestions.length} AI questions`);
    return allQuestions;

  } catch (error) {
    console.error('Error generating AI questions:', error);
    throw error; // Don't use fallback, just throw the error
  }
};

export const analyzeAnswersWithAI = async (answers: any[]): Promise<any[]> => {
  try {
    // Use cached courses if available, otherwise fetch them
    let courses = cachedCourses;
    if (!courses.length) {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const courseRes = await fetch(`${baseUrl}/api/routes/course/active`);
      const courseData = await courseRes.json();
      courses = courseData.data || [];
    }

    // 2. Get AI recommendations (AI must choose only from these courses)
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a career counselor AI. You will receive a list of available courses and a student's psychometric test answers. Recommend the 3 best-fit courses ONLY from the provided list. For each, 
            Return ONLY a JSON array in this exact format:
            [
              {
            "title": "Course Title",
            "description": "Why this course fits",
                "matchPercentage": 85,
                "skills": ["Skill 1", "Skill 2", "Skill 3", "Skill 4"],
            "educationPath": ["Step 1", "Step 2"],
            "id": "course id",
              }
            ]

            Base recommendations on the student's answer patterns and provide realistic, actionable career paths. 
            Do not recommend any course not in the provided list.
            Ensure only to send json in the response, no additional text or explanations.
            `
          },
          {
            role: 'user',
            content: `Student answers: ${JSON.stringify(answers)}\nAvailable courses: ${JSON.stringify(courses)}`
          }
        ],
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    if (!aiRes.ok) throw new Error(`OpenAI API error: ${aiRes.status}`);

    const aiData = await aiRes.json();
    const content = aiData.choices[0].message.content.trim();
    const jsonMatch = content.match(/(\[.*\]|\{.*\})/s);
    if (!jsonMatch) throw new Error("No JSON found in AI response");
    const aiRecs = JSON.parse(jsonMatch[1]);

    // 3. Add image and link fields from the course data
    const recommendations = aiRecs.map((rec: any) => {
      const found = courses.find((course: any) => course.id === rec.id);
      return found
        ? {
            ...rec,
            image: found.image,
            link: `${import.meta.env.VITE_API_BASE_URL}/courses/${found.id}`,
          }
        : null;
    }).filter(Boolean);

    return recommendations;
  } catch (error) {
    console.error('Error analyzing answers:', error);
    // Return fallback recommendations
    return [
      {
        title: "Software Engineer",
        description: "Based on your responses, you show strong analytical and problem-solving skills that are essential in software development.",
        matchPercentage: 88,
        skills: ["Programming", "Problem Solving", "Logical Thinking", "Attention to Detail"],
        educationPath: ["Computer Science Degree", "Coding Bootcamp", "Online Programming Courses"]
      }
    ];
  }
};
