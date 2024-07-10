import { useContext } from "react"
import "./CreateModelground.scss"
import { ModelContext } from "../ModelProvider"
import { PlaygroundContext } from "../PlaygroundProvider";
import { createfolderStyles } from "./CreateFolderModel";
export const UpdateFolderModal = () => {
    const {closeModal,modalPayload} = useContext(ModelContext);
    const {editFolderTitle} = useContext(PlaygroundContext);

    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        editFolderTitle(folderName,modalPayload);
        closeModal();
    }
    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModal}>
            <span onClick={closeModal} className="material-icons close"> close</span>
            <h1>Create New Playground</h1>
            <div style={createfolderStyles.inputContainer}>
                <input name='folderName' style={{flexGrow:1}} placeholder='Enter Folder Name'></input>
                <button type='submit' style={createfolderStyles.btn}>Create Folder</button>
            </div>
        </form>
    </div>
}