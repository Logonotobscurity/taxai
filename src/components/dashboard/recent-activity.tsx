import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function RecentActivity() {
    return (
        <Card className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                A log of your recent tax-related activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    PAYE Return Filed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    June 2024 monthly return
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    AI Insight Generated
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pension contribution optimization
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge className="bg-accent text-accent-foreground">New</Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    Document Uploaded
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Receipt_2024_06_15.pdf
                  </p>
                </div>
                <div className="ml-auto font-medium text-muted-foreground">
                  2 days ago
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    WHT Filed
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Invoice #INV-007 for Client Corp
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  <Badge variant="secondary">Completed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
    )
}
