import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "./scroll-area";

export function Comments() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="right-0 pl-5">
          <Button className="rounded-full" variant="link">
            View Comments
          </Button>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[200px] w-[350px] sm:h-[300px] sm:w-[400px] rounded-md mx-auto border p-4">
            <ul>
              <li>Hello world</li>
            </ul>
        </ScrollArea>

        <DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
