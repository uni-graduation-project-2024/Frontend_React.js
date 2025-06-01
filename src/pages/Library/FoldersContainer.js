import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useFoldersStore } from "../../hooks/useFolders";
import FolderCard from "./FolderCard"; 
import { useEffect } from "react";

export const FoldersContainer = ({updateRefresh, refresh }) => {
  const { allFolders, fetchFolders } = useFoldersStore();

  useEffect(()=>{
    fetchFolders();
  }, [refresh])

  const folders = allFolders;

    return(
      <DndProvider backend={HTML5Backend}>
        <div className="library-folders">
        <div className="library-folder-grid">
          {folders.length === 0 ? (
            <p style={{width: "300px"}}>Click on + to create new subject.</p>
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