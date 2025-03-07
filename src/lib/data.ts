
import { Suggestion } from "@/components/SuggestionCard";

// Mock data for our app
const suggestions: Suggestion[] = [
  {
    id: "1",
    title: "Add dark mode support",
    description: "It would be great to have a dark mode option for the dashboard. This would help reduce eye strain when working late at night.",
    status: "development",
    upvotes: 42,
    comments: 12,
    createdAt: "2023-10-15T10:30:00Z",
    category: "UI/UX",
    isUpvoted: true
  },
  {
    id: "2",
    title: "Integrate with Slack for notifications",
    description: "Would love to get notifications in Slack when new feedback is submitted or when the status of my feedback changes.",
    status: "discovery",
    upvotes: 38,
    comments: 8,
    createdAt: "2023-10-12T14:45:00Z",
    category: "Integration"
  },
  {
    id: "3",
    title: "Bulk actions for multiple suggestions",
    description: "Need the ability to select multiple suggestions and perform actions like changing status, assigning, or deleting.",
    status: "discovery",
    upvotes: 27,
    comments: 5,
    createdAt: "2023-10-11T09:15:00Z",
    category: "Feature"
  },
  {
    id: "4",
    title: "Export feedback data to CSV",
    description: "Would be useful to export all feedback data to CSV for analysis in other tools or for reporting purposes.",
    status: "shipped",
    upvotes: 56,
    comments: 3,
    createdAt: "2023-10-08T16:20:00Z",
    category: "Feature"
  },
  {
    id: "5",
    title: "Improve mobile experience",
    description: "The mobile experience could be improved. Currently, it's difficult to navigate between sections on smaller screens.",
    status: "development",
    upvotes: 31,
    comments: 7,
    createdAt: "2023-10-05T11:10:00Z",
    category: "UI/UX"
  },
  {
    id: "6",
    title: "Add keyboard shortcuts",
    description: "It would be helpful to have keyboard shortcuts for common actions like submitting new feedback, filtering, etc.",
    status: "discovery",
    upvotes: 19,
    comments: 4,
    createdAt: "2023-10-02T13:25:00Z",
    category: "UI/UX"
  },
  {
    id: "7",
    title: "Email digest of new feedback",
    description: "Would love to receive a daily or weekly email digest summarizing new feedback and status changes.",
    status: "development",
    upvotes: 23,
    comments: 2,
    createdAt: "2023-09-28T10:05:00Z",
    category: "Feature"
  },
  {
    id: "8",
    title: "Add tags to categorize feedback",
    description: "It would be helpful to be able to add custom tags to feedback for better organization and filtering.",
    status: "shipped",
    upvotes: 45,
    comments: 9,
    createdAt: "2023-09-25T15:40:00Z",
    category: "Feature"
  }
];

// Get all suggestions with filtering options
export function getSuggestions(filters?: {
  status?: string;
  category?: string;
  search?: string;
}) {
  let filtered = [...suggestions];
  
  if (filters) {
    if (filters.status) {
      filtered = filtered.filter(s => s.status === filters.status);
    }
    
    if (filters.category) {
      filtered = filtered.filter(s => s.category === filters.category);
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(searchLower) || 
        s.description.toLowerCase().includes(searchLower)
      );
    }
  }
  
  return filtered;
}

// Get a single suggestion by ID
export function getSuggestionById(id: string) {
  return suggestions.find(s => s.id === id);
}

// Get suggestions grouped by status for Kanban view
export function getKanbanData() {
  return {
    discovery: suggestions.filter(s => s.status === 'discovery'),
    development: suggestions.filter(s => s.status === 'development'),
    shipped: suggestions.filter(s => s.status === 'shipped')
  };
}

// Mock analytics data
export function getDashboardMetrics() {
  return {
    totalSuggestions: suggestions.length,
    totalUpvotes: suggestions.reduce((sum, s) => sum + s.upvotes, 0),
    averageComments: (suggestions.reduce((sum, s) => sum + s.comments, 0) / suggestions.length).toFixed(1),
    implementationRate: "64%",
    statusDistribution: {
      discovery: suggestions.filter(s => s.status === 'discovery').length,
      development: suggestions.filter(s => s.status === 'development').length,
      shipped: suggestions.filter(s => s.status === 'shipped').length,
      closed: suggestions.filter(s => s.status === 'closed').length,
    },
    categoryDistribution: {
      "UI/UX": suggestions.filter(s => s.category === 'UI/UX').length,
      "Feature": suggestions.filter(s => s.category === 'Feature').length,
      "Integration": suggestions.filter(s => s.category === 'Integration').length,
    },
    recentActivity: [
      { type: "status_change", suggestion: "Add dark mode support", oldStatus: "discovery", newStatus: "development", date: "2023-10-16T09:30:00Z" },
      { type: "new_comment", suggestion: "Integrate with Slack for notifications", comment: "We're looking into this now!", date: "2023-10-15T14:20:00Z" },
      { type: "new_suggestion", suggestion: "Add dark mode support", date: "2023-10-15T10:30:00Z" },
      { type: "upvote", suggestion: "Export feedback data to CSV", date: "2023-10-14T16:45:00Z" },
    ]
  };
}

// Mock comment data
export function getComments(suggestionId: string) {
  return [
    {
      id: "c1",
      author: "Jane Smith",
      avatar: "/avatar-1.jpg",
      content: "This would be incredibly helpful. Looking forward to seeing this implemented!",
      createdAt: "2023-10-16T11:30:00Z",
    },
    {
      id: "c2",
      author: "Mark Johnson",
      avatar: "/avatar-2.jpg",
      content: "I agree, this is a must-have feature. Would also be nice to have notification preferences.",
      createdAt: "2023-10-16T13:15:00Z",
    },
    {
      id: "c3",
      author: "Sarah Lee",
      avatar: "/avatar-3.jpg",
      content: "Our team would benefit from this as well. Any timeline on when we might see this shipped?",
      createdAt: "2023-10-17T09:45:00Z",
    }
  ];
}
