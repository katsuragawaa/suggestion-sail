
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

export function Settings() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    companyName: "Acme Inc.",
    companyLogo: "",
    accentColor: "#3B82F6",
    emailNotifications: true,
    slackNotifications: false,
    browserNotifications: true,
    allowAnonymousFeedback: true,
    moderateComments: true,
    autoUpgradeFeatures: false,
    allowUserUpvotes: true,
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleToggle = (name: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }));
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings saved successfully!");
    }, 1000);
  };
  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground mb-6">
        Customize your feedback portal and notification preferences.
      </p>
      
      <Tabs defaultValue="general" className="mt-6">
        <TabsList className="mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSave}>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Customize the appearance and behavior of your feedback portal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={settings.companyName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companyLogo">Company Logo URL</Label>
                  <Input
                    id="companyLogo"
                    name="companyLogo"
                    value={settings.companyLogo}
                    onChange={handleChange}
                    placeholder="https://your-logo-url.com/logo.png"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex gap-4">
                    <Input
                      id="accentColor"
                      name="accentColor"
                      type="color"
                      value={settings.accentColor}
                      onChange={handleChange}
                      className="w-12 h-10 p-1"
                    />
                    <Input
                      value={settings.accentColor}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          accentColor: e.target.value,
                        }))
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowUserUpvotes">Allow User Upvotes</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable users to upvote suggestions
                    </p>
                  </div>
                  <Switch
                    id="allowUserUpvotes"
                    checked={settings.allowUserUpvotes}
                    onCheckedChange={(checked) =>
                      handleToggle("allowUserUpvotes", checked)
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoUpgradeFeatures">Auto-Upgrade Features</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically upgrade to new features as they're released
                    </p>
                  </div>
                  <Switch
                    id="autoUpgradeFeatures"
                    checked={settings.autoUpgradeFeatures}
                    onCheckedChange={(checked) =>
                      handleToggle("autoUpgradeFeatures", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleToggle("emailNotifications", checked)
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="slackNotifications">Slack Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in Slack
                    </p>
                  </div>
                  <Switch
                    id="slackNotifications"
                    checked={settings.slackNotifications}
                    onCheckedChange={(checked) =>
                      handleToggle("slackNotifications", checked)
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="browserNotifications">Browser Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <Switch
                    id="browserNotifications"
                    checked={settings.browserNotifications}
                    onCheckedChange={(checked) =>
                      handleToggle("browserNotifications", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>
                  Manage privacy and security settings for your feedback portal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowAnonymousFeedback">Allow Anonymous Feedback</Label>
                    <p className="text-sm text-muted-foreground">
                      Let users submit feedback without identifying themselves
                    </p>
                  </div>
                  <Switch
                    id="allowAnonymousFeedback"
                    checked={settings.allowAnonymousFeedback}
                    onCheckedChange={(checked) =>
                      handleToggle("allowAnonymousFeedback", checked)
                    }
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="moderateComments">Moderate Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      Review and approve comments before they're published
                    </p>
                  </div>
                  <Switch
                    id="moderateComments"
                    checked={settings.moderateComments}
                    onCheckedChange={(checked) =>
                      handleToggle("moderateComments", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <div className="flex justify-end mt-6">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </form>
      </Tabs>
    </div>
  );
}

export default Settings;
