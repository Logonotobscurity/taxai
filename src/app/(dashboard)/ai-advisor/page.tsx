import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { OptimizationForm } from '@/components/ai-advisor/optimization-form';
import { InsightsGenerator } from '@/components/ai-advisor/insights-generator';

export default function AiAdvisorPage() {
  return (
    <Tabs defaultValue="strategies" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="strategies">Tax Optimization Strategies</TabsTrigger>
        <TabsTrigger value="insights">Personalized Insights</TabsTrigger>
      </TabsList>
      <TabsContent value="strategies">
        <Card>
          <CardHeader>
            <CardTitle>Tax Optimization Strategies</CardTitle>
            <CardDescription>
              Get proactive advice on how to legally minimize your tax
              liabilities based on your financial profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <OptimizationForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="insights">
        <Card>
          <CardHeader>
            <CardTitle>Personalized Insights</CardTitle>
            <CardDescription>
              Receive personalized insights based on your financial data and
              the latest financial news.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <InsightsGenerator />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
