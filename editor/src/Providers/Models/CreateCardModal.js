import { useContext } from "react"
import {ModelContext} from "../ModelProvider"
import { v4 } from "uuid";
import "./CreateModelground.scss"
import { PlaygroundContext, defaultCode } from "../PlaygroundProvider";
export const CreateCard = () => {
    const {closeModal,modalPayload} = useContext(ModelContext);
    const {createPlayground} = useContext(PlaygroundContext);

    const onsubmitModal = (e) => {
        e.preventDefault();
        const fileName = e.target.fileName.value;
        const language = e.target.language.value;

        const file = {
            id:v4(),
            title:fileName,
            language,
            code:defaultCode[language]
        }

        createPlayground(modalPayload,file);
        closeModal();
    };

    return <div className="modal-container">
            <form className="modal-body" onSubmit={onsubmitModal}>
            <span onClick={closeModal} className="material-icons close">close</span>
                <h1>Create New Folder</h1>
                <div className="item">
                    <input name="fileName" placeholder="Enter card title" required/>
                </div>
                <div className="item">
                    <select name="language" required>
                            <option value="cpp">CPP</option>
                            <option value="java">Java</option>
                            <option value="javscript">JavaScripT</option>
                            <option value="python">Python</option>
                    </select>
                    <button type="submit">
                            create playground
                    </button>
                </div>
            </form>
    </div>
}