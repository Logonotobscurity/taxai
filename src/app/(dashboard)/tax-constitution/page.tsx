import { TaxConstitutionBrowser } from '@/components/tax-constitution/browser';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function TaxConstitutionPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tax Constitution Browser</CardTitle>
        <CardDescription>
          Explore and understand the tax rules and regulations that power our
          platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TaxConstitutionBrowser />
      </CardContent>
    </Card>
  );
}
