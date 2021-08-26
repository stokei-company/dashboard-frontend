import { Box } from "@chakra-ui/react";
import { ModuleModel } from "~/services/@types/module";
import { Module } from "../module";
import { NoModule } from "../no-module";

interface Props {
  readonly modules: ModuleModel[];
  readonly currentVideoId?: string;
  readonly openAll?: boolean;
}

export const ListModules: React.FC<Props> = ({
  modules,
  currentVideoId,
  openAll = false,
}) => {
  return (
    <Box width="full">
      {modules?.length > 0 ? (
        modules?.map((module, index) => (
          <Box key={module.id} marginBottom="5">
            <Module
              module={module}
              open={openAll === true}
              currentVideoId={currentVideoId}
            />
          </Box>
        ))
      ) : (
        <NoModule />
      )}
    </Box>
  );
};

export default ListModules;
