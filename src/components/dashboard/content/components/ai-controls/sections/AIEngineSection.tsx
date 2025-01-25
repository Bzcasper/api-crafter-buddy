import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const TopicSection = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Topic Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="topic">Main Topic</Label>
          <Input 
            id="topic"
            placeholder="Enter your main content topic"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="keywords">Keywords</Label>
          <Input
            id="keywords"
            placeholder="Enter relevant keywords (comma separated)"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Topic Description</Label>
          <Textarea
            id="description"
            placeholder="Describe your topic in detail..."
            className="min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicSection;
