
import { Button, ButtonGroup } from "flowbite-react";
import { HiAdjustments, HiCloudDownload, HiDocument, HiSave, HiUserCircle } from "react-icons/hi";

export function WorkflowToolBar() {
  return (
    <ButtonGroup>
      <Button className="bg-gray-300">
        <HiDocument className="me-2 h-4 w-4" />
        Details
      </Button>
      <Button className="bg-gray-300">
        <HiAdjustments className="me-2 h-4 w-4" />
        Settings
      </Button>
      <Button className="bg-gray-300">
        <HiSave className="me-2 h-4 w-4" />
        Save
      </Button>
    </ButtonGroup>
  );
}
