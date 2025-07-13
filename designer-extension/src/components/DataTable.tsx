import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Site } from "../types/types";
import { Calendar, Globe, FileEdit } from "lucide-react";

interface DataTableProps {
  data: Site[];
}

const DataTable = ({ data }: DataTableProps) => {
  // Ensure extension is sized correctly to show content
  webflow.setExtensionSize("large");

  return (
    <Card>
      <CardHeader className="pb-3 border-b border-border">
        <CardTitle className="text-base flex items-center gap-2">
          <Globe className="text-primary" />
          Your Webflow Sites
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-auto max-h-[275px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Project ID</TableHead>
                <TableHead>Created On</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Last Published</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-left font-regular">
                    {item.displayName}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-left text-foreground-secondary">
                    {item.id}
                  </TableCell>
                  <TableCell className="text-left">
                    <div className="flex items-center gap-1">
                      <Calendar className="text-foreground-tertiary h-3 w-3" />
                      <span>
                        {new Date(item.createdOn).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    <div className="flex items-center gap-1">
                      <FileEdit className="text-foreground-tertiary h-3 w-3" />
                      <span>
                        {new Date(item.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-left">
                    {item.lastPublished ? (
                      <div className="flex items-center gap-1">
                        <Globe className="text-foreground-tertiary h-3 w-3" />
                        <span>
                          {new Date(item.lastPublished).toLocaleDateString()}
                        </span>
                      </div>
                    ) : (
                      <span className="text-foreground-tertiary">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
