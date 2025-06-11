
import { useFoldersStore } from "../../hooks/useFolders";
import FolderCard from "./FolderCard"; 
import { useEffect } from "react";

export const FoldersContainer = () => {
  const { allFolders, fetchFolders } = useFoldersStore();

  useEffect(()=>{
    fetchFolders();
  }, [])

  const folders = allFolders;

    return(
        <div className="library-folders">
        <div className="library-folder-grid">
          {folders.length === 0 ? (
            <p style={{width: "300px"}}>Click on + to create new subject.</p>
          ) : (
            folders.map((folder) => (
              <FolderCard key={folder.subjectId} folder={folder}/>
            ))
          )}
        </div>
      </div>
    );
};