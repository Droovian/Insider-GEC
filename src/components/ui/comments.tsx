import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageCircle } from "lucide-react"
import { Textarea } from "./textarea"

export function Comments() {
  return (
    
    <Dialog>
      <DialogTrigger asChild>
        <div className="right-0 pl-5">

        <Button className="rounded-full" variant="ghost">View Comments</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Comment</DialogTitle>
            <DialogDescription>
                   
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          
          
        </div>
        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
