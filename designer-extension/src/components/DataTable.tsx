import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Site } from "../types/types";

const DataTable = ({ data }: { data: Site[] }) => {
  webflow.setExtensionSize("large");

  return (
    <Card className="overflow-auto max-h-[275px]">
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
              <TableCell className="text-left">{item.displayName}</TableCell>
              <TableCell className="font-mono text-xs text-left">
                {item.id}
              </TableCell>
              <TableCell className="text-left">
                {new Date(item.createdOn).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-left">
                {new Date(item.lastUpdated).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-left">
                {item.lastPublished
                  ? new Date(item.lastPublished).toLocaleDateString()
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default DataTable;
