
import { 
  Lightbulb, 
  ThumbsUp, 
  MessageSquare, 
  Rocket 
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { SuggestionCard } from "@/components/SuggestionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { getDashboardMetrics, getSuggestions } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Dashboard() {
  const metrics = getDashboardMetrics();
  const topSuggestions = getSuggestions().sort((a, b) => b.upvotes - a.upvotes).slice(0, 3);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-1">Welcome back</h1>
        <p className="text-muted-foreground">
          Here's what's happening with your feedback portal.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Suggestions" 
          value={metrics.totalSuggestions} 
          icon={Lightbulb}
          change={{ value: 12, isPositive: true }}
        />
        <MetricCard 
          title="Total Upvotes" 
          value={metrics.totalUpvotes} 
          icon={ThumbsUp}
          change={{ value: 8, isPositive: true }}
        />
        <MetricCard 
          title="Avg. Comments" 
          value={metrics.averageComments} 
          icon={MessageSquare}
          change={{ value: 2, isPositive: false }}
        />
        <MetricCard 
          title="Implementation Rate" 
          value={metrics.implementationRate} 
          icon={Rocket}
          change={{ value: 5, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Suggestions</CardTitle>
            <CardDescription>
              The most upvoted suggestions from your users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSuggestions.map((suggestion) => (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} />
              ))}
              <div className="flex justify-center mt-4">
                <Button variant="outline" asChild>
                  <Link to="/suggestions">View All Suggestions</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates and changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    {activity.type === 'status_change' && <Rocket className="w-4 h-4" />}
                    {activity.type === 'new_comment' && <MessageSquare className="w-4 h-4" />}
                    {activity.type === 'new_suggestion' && <Lightbulb className="w-4 h-4" />}
                    {activity.type === 'upvote' && <ThumbsUp className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-sm">
                      {activity.type === 'status_change' && (
                        <>
                          <span className="font-medium">{activity.suggestion}</span> moved from{' '}
                          <StatusBadge status={activity.oldStatus as any} className="inline-flex" /> to{' '}
                          <StatusBadge status={activity.newStatus as any} className="inline-flex" />
                        </>
                      )}
                      {activity.type === 'new_comment' && (
                        <>
                          New comment on <span className="font-medium">{activity.suggestion}</span>: "{activity.comment}"
                        </>
                      )}
                      {activity.type === 'new_suggestion' && (
                        <>
                          New suggestion added: <span className="font-medium">{activity.suggestion}</span>
                        </>
                      )}
                      {activity.type === 'upvote' && (
                        <>
                          <span className="font-medium">{activity.suggestion}</span> received a new upvote
                        </>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(activity.date).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
            <CardDescription>
              Breakdown of suggestions by status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(metrics.statusDistribution).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={status as any} />
                    <span className="text-sm capitalize">{status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ 
                          width: `${(count / metrics.totalSuggestions) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
            <CardDescription>
              Breakdown of suggestions by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(metrics.categoryDistribution).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-sm">{category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ 
                          width: `${(count / metrics.totalSuggestions) * 100}%` 
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
