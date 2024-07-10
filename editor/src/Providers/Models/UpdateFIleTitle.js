import { useContext } from "react";
import "./CreateModelground.scss";
import { createfolderStyles } from "./CreateFolderModel";
import { ModelContext, modalconstants } from "../ModelProvider";
import { PlaygroundContext } from "../PlaygroundProvider";

export const UpdateFileTitle = () => {
    const {closeModal,modalPayload} = useContext(ModelContext);
    const {editFileTitle} = useContext(PlaygroundContext);
    const onSubmitModal = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value;
        editFileTitle(fileName,modalPayload.folderId,modalPayload.fileId);
        closeModal();
        
    }
    return <div className="modal-container">
        <form onSubmit = {onSubmitModal} className="modal-body">
        <span onClick={closeModal} className="material-icons close"> close</span>
            <h1>Update Card title</h1>
            <div style={createfolderStyles.inputContainer}>
                <input name='fileName' style={{flexGrow:1}} placeholder='Enter Folder Name'></input>
                <button type='submit' style={createfolderStyles.btn}>Create Folder</button>
            </div>
        </form>
    </div>
}