import { PlusCircle, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DocumentsPage() {
  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>My Documents</CardTitle>
            <CardDescription>
              Manage your tax documents, receipts, and certificates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date Uploaded</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    TCC_2023.pdf
                  </TableCell>
                  <TableCell>Certificate</TableCell>
                  <TableCell>
                    <Badge variant="outline">Verified</Badge>
                  </TableCell>
                  <TableCell>2023-10-18</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Invoice_INV-001.pdf
                  </TableCell>
                  <TableCell>Receipt</TableCell>
                  <TableCell>
                    <Badge variant="outline">Pending</Badge>
                  </TableCell>
                  <TableCell>2023-10-15</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="justify-center border-t p-4">
            <Button size="sm" variant="ghost" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Document
            </Button>
          </CardFooter>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
            <CardDescription>
              Drag and drop your file here or click to browse.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label
                htmlFor="upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/50 bg-primary/10 p-10 text-center"
              >
                <Upload className="h-10 w-10 text-primary" />
                <span className="font-medium">Click to upload</span>
                <span className="text-sm text-muted-foreground">
                  PDF, PNG, JPG up to 10MB
                </span>
              </Label>
              <Input id="upload" type="file" className="sr-only" />
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button>Save Document</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
