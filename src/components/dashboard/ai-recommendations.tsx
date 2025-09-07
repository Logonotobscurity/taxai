import { Lightbulb } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';

export function AiRecommendations() {
    return (
        <Card className="transition-all hover:shadow-md hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            AI Recommendations
          </CardTitle>
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3 Active</div>
          <p className="text-xs text-muted-foreground">
            Potential savings: ₦12,500
          </p>
        </CardContent>
      </Card>
    )
}
