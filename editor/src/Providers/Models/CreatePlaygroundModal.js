import { useContext } from "react"
import "./CreateModelground.scss"
import { ModelContext, modalconstants } from "../ModelProvider"
import { PlaygroundContext } from "../PlaygroundProvider";
export const CreateplaygroundModal = () => {
    const modelFeatures = useContext(ModelContext);
    const playgroundfeatures = useContext(PlaygroundContext);
    const CloseModel = () => {
        modelFeatures.closeModal(modalconstants.CREATE_PLAYGROUND);
    };
    const onSubmitModel = (e) => {
        e.preventDefault();
        const folderName = e.target.folderName.value;
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;
        playgroundfeatures.createNewPlayground({
            folderName,
            fileName,
            language,
        });

        CloseModel();
    }
    return <div className="modal-container">
        <form className="modal-body" onSubmit={onSubmitModel}>
            <span onClick={CloseModel} style={{cursor:'pointer'}} className="material-icons close">close</span>
            <h1>Create New Playground</h1>
            <div className="item">
                <p>Enter the Folder Name</p>
                <input name="folderName" required/>
            </div>
            <div className="item">
                <p>Enter card name</p>
                <input name="fileName" required/>
            </div>
            <div className="item" required>
                <select name="language">
                    <option value="cpp">CPP</option>
                    <option value="java">Java</option>
                    <option value ="javascript">JavaScripT</option>
                    <option value="python">Python</option>
                </select>
                <button type="submit">
                    Create playground
                </button>
            </div>
        </form>
    </div>
}