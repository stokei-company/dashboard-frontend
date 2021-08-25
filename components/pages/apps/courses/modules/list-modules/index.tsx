import { Box } from "@chakra-ui/react";
import { ModuleModel } from "~/services/@types/module";
import { Module } from "../module";

interface Props {
  readonly modules: ModuleModel[];
  readonly courseId: string;
  readonly appId: string;
}

export const ListModules: React.FC<Props> = ({ modules, courseId, appId }) => {
  return (
    <Box width="full">
      {modules?.map((module) => (
        <Box key={module.id} marginBottom="5">
          <Module courseId={courseId} module={module} />
        </Box>
      ))}
    </Box>
  );
};

export default ListModules;
