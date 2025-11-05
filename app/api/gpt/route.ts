import { NextRequest, NextResponse } from 'next/server';

interface GPTRequest {
  businessName: string;
  businessType: string;
  description: string;
  keywords?: string;
  language?: string;
}

interface GPTConfig {
  name: string;
  description: string;
  instructions: string;
  conversationStarters: string[];
  capabilities: string[];
  knowledgeBase: string;
}

export async function POST(request: NextRequest) {
  try {
    const { businessName, businessType, description, keywords = '', language = 'en' }: GPTRequest = await request.json();

    if (!businessName || !businessType || !description) {
      return NextResponse.json(
        { error: 'Business name, type, and description are required' },
        { status: 400 }
      );
    }

    // Generate GPT configuration
    const gptConfig: GPTConfig = {
      name: `${businessName} Assistant`,
      description: `Your AI-powered assistant for ${businessName}. Get instant answers about our ${businessType} services, pricing, availability, and more.`,
      instructions: generateInstructions(businessName, businessType, description, keywords),
      conversationStarters: generateConversationStarters(businessName, businessType, language),
      capabilities: [
        'Answer questions about services',
        'Provide pricing information',
        'Explain service processes',
        'Schedule consultations',
        'Offer recommendations',
      ],
      knowledgeBase: generateKnowledgeBase(businessName, businessType, description, keywords),
    };

    return NextResponse.json({
      config: gptConfig,
      setupInstructions: {
        step1: 'Go to https://chat.openai.com/gpts/editor',
        step2: 'Click "Create a GPT"',
        step3: `Name it: "${gptConfig.name}"`,
        step4: `Add description: "${gptConfig.description}"`,
        step5: `Paste instructions below into the "Instructions" field`,
        step6: 'Add the conversation starters',
        step7: 'Configure capabilities (Web Browsing, DALL-E if needed)',
        step8: 'Save and publish your GPT',
      },
      gptUrl: `https://chat.openai.com/g/g-${generateGPTId(businessName)}`,
    });

  } catch (error) {
    console.error('GPT creation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate GPT configuration' },
      { status: 500 }
    );
  }
}

function generateInstructions(businessName: string, businessType: string, description: string, keywords: string): string {
  return `You are the official AI assistant for ${businessName}, a ${businessType} business.

## Your Role
- Represent ${businessName} professionally and helpfully
- Provide accurate information about services and offerings
- Guide customers through inquiries with expertise and care
- Always maintain a friendly, professional tone

## About ${businessName}
${description}

## Core Services & Expertise
${keywords ? keywords.split(',').map(k => `- ${k.trim()}`).join('\n') : '- Professional services tailored to client needs'}

## Communication Guidelines
1. **Be Helpful**: Answer questions clearly and comprehensively
2. **Be Accurate**: Only share information you're confident about
3. **Be Proactive**: Suggest relevant services when appropriate
4. **Be Professional**: Maintain ${businessName}'s reputation
5. **Encourage Action**: Guide users toward consultations or next steps

## When You Don't Know
If asked about something outside your knowledge:
- Be honest about limitations
- Suggest contacting ${businessName} directly
- Provide contact information if available

## Key Phrases to Use
- "At ${businessName}, we specialize in..."
- "I'd be happy to help you with..."
- "Let me explain how we can assist you..."
- "Would you like to schedule a consultation?"

Remember: You represent ${businessName} - every interaction should leave a positive impression.`;
}

function generateConversationStarters(businessName: string, businessType: string, language: string): string[] {
  const starters: Record<string, string[]> = {
    en: [
      `What services does ${businessName} offer?`,
      `How can ${businessName} help me?`,
      'What are your pricing options?',
      'How do I get started?',
    ],
    ru: [
      `Какие услуги предоставляет ${businessName}?`,
      `Как ${businessName} может мне помочь?`,
      'Какие у вас цены?',
      'Как начать работу?',
    ],
    he: [
      `?${businessName} אילו שירותים מציע`,
      `?${businessName} איך יכול לעזור לי`,
      '?מה המחירים שלכם',
      '?איך מתחילים',
    ],
  };

  return starters[language] || starters.en;
}

function generateKnowledgeBase(businessName: string, businessType: string, description: string, keywords: string): string {
  return `# ${businessName} Knowledge Base

## Business Overview
${description}

## Services
${keywords ? keywords.split(',').map((k, i) => `${i + 1}. ${k.trim()}`).join('\n') : 'Comprehensive professional services'}

## Contact Information
- Website: https://yourwebsite.com
- Email: contact@${businessName.toLowerCase().replace(/\s+/g, '')}.com
- Location: Israel

## Frequently Asked Questions

### What makes ${businessName} different?
${description}

### How long does it take to get started?
Most clients can get started within 24-48 hours of initial contact.

### Do you offer consultations?
Yes, we offer free initial consultations to understand your needs.

### What areas do you serve?
We serve clients across Israel and internationally.
`;
}

function generateGPTId(businessName: string): string {
  // Generate a pseudo-unique ID for the GPT URL
  const hash = businessName.split('').reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  return Math.abs(hash).toString(36).slice(0, 10);
}
