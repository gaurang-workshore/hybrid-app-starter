import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { ElementMapping } from "../../types/element-mapping";

/**
 * Props for the ElementTreeViewer component
 * @property {ElementMapping} tree - The element tree data to display
 * @property {number} depth - Optional depth level for rendering nested structures
 */
interface ElementTreeViewerProps {
  tree: ElementMapping;
}

/**
 * Props for the internal TabPanel component
 */
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

/**
 * Structure of formatted element data for display
 */
interface FormattedElement {
  name: string;
  id: string;
  type: string;
  styles: string[];
  customAttributes: Record<string, unknown>;
  children: FormattedElement[];
}

/**
 * TabPanel - Internal component to handle tab content display
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} className="pt-4" {...other}>
      {value === index && children}
    </div>
  );
}

/**
 * Formats the element data for more readable display
 */
const formatElementData = (element: ElementMapping): FormattedElement => {
  const styleName = element.styles?.[0]?.name;
  const displayName = styleName || `${element.type} (No Style)`;

  return {
    name: displayName,
    id: element.id,
    type: element.type,
    styles: element.styles?.map((style) => style.name) || [],
    customAttributes: element.attributes || {},
    children:
      element.children
        ?.filter(Boolean)
        .map((child) => formatElementData(child)) || [],
  };
};

/**
 * ElementTreeViewer displays the structured element data in a tabbed interface
 */
export function ElementTreeViewer({ tree }: ElementTreeViewerProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  // Safely format the tree data
  let formattedData;
  let styleData;

  try {
    formattedData = JSON.stringify(formatElementData(tree), null, 2);
    styleData = JSON.stringify(tree.styles || [], null, 2);
  } catch (error) {
    console.error("Error formatting element data:", error);
    formattedData = JSON.stringify({ error: "Error formatting data" }, null, 2);
    styleData = JSON.stringify({ error: "Error formatting styles" }, null, 2);
  }

  return (
    <div className="bg-background-secondary rounded-md overflow-hidden">
      <div className="border-b border-border">
        <nav className="flex" aria-label="Tabs">
          <button
            onClick={() => setSelectedTab(0)}
            className={`px-4 py-2 text-sm font-medium ${
              selectedTab === 0
                ? "border-b-2 border-blue text-foreground"
                : "text-foreground-secondary hover:text-foreground hover:bg-background-tertiary"
            }`}
            aria-current={selectedTab === 0 ? "page" : undefined}
          >
            Element Tree
          </button>
          <button
            onClick={() => setSelectedTab(1)}
            className={`px-4 py-2 text-sm font-medium ${
              selectedTab === 1
                ? "border-b-2 border-blue text-foreground"
                : "text-foreground-secondary hover:text-foreground hover:bg-background-tertiary"
            }`}
            aria-current={selectedTab === 1 ? "page" : undefined}
          >
            Raw Styles
          </button>
        </nav>
      </div>

      <TabPanel value={selectedTab} index={0}>
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: "4px", fontSize: "12px" }}
        >
          {formattedData}
        </SyntaxHighlighter>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <SyntaxHighlighter
          language="json"
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: "4px", fontSize: "12px" }}
        >
          {styleData}
        </SyntaxHighlighter>
      </TabPanel>
    </div>
  );
}
