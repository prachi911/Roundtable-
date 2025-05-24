
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DebateFormatInfo } from "@/types";
import { Info } from "lucide-react";

interface FormatDetailsDialogProps {
  format: DebateFormatInfo;
}

const FormatDetailsDialog = ({ format }: FormatDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="absolute top-2 right-8">
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-navy">{format.title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">{format.description}</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-navy">Teams/Participants</h4>
              <p className="text-sm text-gray-600">{format.teams}</p>
            </div>
            <div>
              <h4 className="font-medium text-navy">Speaker Time</h4>
              <p className="text-sm text-gray-600">{format.speakerTime}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-navy">Structure Highlights</h4>
            <p className="text-sm text-gray-600">{format.structure}</p>
          </div>
          
          <div>
            <h4 className="font-medium text-navy">Ideal For</h4>
            <p className="text-sm text-gray-600">{format.idealFor}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormatDetailsDialog;
