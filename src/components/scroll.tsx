import * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import GeneralFeed from "./homepage/GeneralFeed"



export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-full w-full overflow-y-scroll no-scrollbar ">
      <div className="p-4">
        <GeneralFeed />
      </div>
    </ScrollArea>
  )
}
