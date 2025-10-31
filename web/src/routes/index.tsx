import { createFileRoute } from "@tanstack/react-router";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Sidebar } from "../components/sidebar";
import { WebhookDetailHeader } from "../components/webhook-detail-header";
import { SectionTitle } from "../components/section-title";
import { SectionDataTable } from "../components/section-data-table";

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  const overviewData = [
    { key: "Method", value: "POST" },
    { key: "Content-Type", value: "application/json" },
    { key: "Status", value: "200 OK" },
    { key: "Response Time", value: "123ms" },
    { key: "Content-Length", value: "28381 bytes" },
  ]

  return (
    <div className="h-screen bg-zinc-900">
      <PanelGroup direction="horizontal">
         <Panel defaultSize={20} minSize={15} maxSize={40}>
          <Sidebar />
         </Panel>

         <PanelResizeHandle className="w-px bg-zinc-700 hover:bg-zinc-600 transition-colors duration-150" />

         <Panel defaultSize={80} minSize={60}>
           <div className="flex w-full flex-col">
             <WebhookDetailHeader />
             <div className="flex-1 overflow-y-auto">
               <div className="space-y-6 p-6">
                 <div className="space-y-4">
                    <SectionTitle>Request OverView</SectionTitle>
                    <SectionDataTable data={overviewData} />
                 </div>

                 <div>

                 </div>
               </div>
             </div>
           </div>
         </Panel>
      </PanelGroup>
    </div>
  );
}