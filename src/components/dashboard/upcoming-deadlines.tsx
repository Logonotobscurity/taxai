import { FileText } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';

export function UpcomingDeadlines() {
    return (
        <Card className="transition-all hover:shadow-md hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
                Next Submission Due
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">July 31, 2024</div>
            <p className="text-xs text-muted-foreground">VAT Return</p>
            </CardContent>
        </Card>
    )
}
