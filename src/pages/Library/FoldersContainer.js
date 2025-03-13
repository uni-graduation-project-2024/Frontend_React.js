import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useFolders } from "../../hooks/useFolders";
import FolderCard from "./FolderCard"; 

export const FoldersContainer = ({updateRefresh, refresh }) => {
  const { folders } = useFolders(refresh);

    return(
      <DndProvider backend={HTML5Backend}>
        <div className="library-folders">
        <div className="library-folder-grid">
          {folders.length === 0 ? (
            <p>No folders created yet.</p>
          ) : (
            folders.map((folder) => (
              <FolderCard key={folder.subjectId} folder={folder} updateRefresh={updateRefresh}/>
            ))
          )}
        </div>
      </div>
      </DndProvider>
    );
};