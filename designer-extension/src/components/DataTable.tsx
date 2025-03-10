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
            <TableHead>Display Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Last Published</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.displayName}</TableCell>
              <TableCell className="font-mono text-xs">{item.id}</TableCell>
              <TableCell>
                {new Date(item.createdOn).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(item.lastUpdated).toLocaleDateString()}
              </TableCell>
              <TableCell>
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
}

export default DataTable;