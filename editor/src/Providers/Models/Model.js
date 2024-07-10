import { useContext } from "react"
import { ModelContext, modalconstants } from "../ModelProvider"
import { CreateplaygroundModal } from "./CreatePlaygroundModal";
import { CreateFolderModel } from "./CreateFolderModel";
import { UpdateFolderModal } from "./UpdateFolderTitle";
import { UpdateFileTitle } from "./UpdateFIleTitle";
import { CreateCard } from "./CreateCardModal";

export const Model = () => {
    const modelFeatures = useContext(ModelContext);
    console.log("Model Features ->",modelFeatures.activeModal);
    return  <>
        {modelFeatures.activeModal === modalconstants.CREATE_PLAYGROUND && <CreateplaygroundModal/>}
        {modelFeatures.activeModal === modalconstants.CREATE_FOLDER && <CreateFolderModel/>}
        {modelFeatures.activeModal === modalconstants.CREATE_PLAYGROUND && <CreateplaygroundModal/>}
        {modelFeatures.activeModal === modalconstants.UPDATE_FOLDER_TITLE && <UpdateFolderModal/>}
        {modelFeatures.activeModal === modalconstants.UPDATE_FILE_TITLE && <UpdateFileTitle/>}
        {modelFeatures.activeModal === modalconstants.CREATE_CARD && <CreateCard/>}
    </>
}