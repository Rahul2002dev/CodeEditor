import { useContext } from 'react';
import { ModelContext } from '../ModelProvider';

import "./CreateModelground.scss"
import { PlaygroundContext, PlaygroundProvider } from '../PlaygroundProvider';
export const CreateFolderModel = () =>{
    const {createNewFolder} = useContext(PlaygroundContext);
    const modelFeatures = useContext(ModelContext);

    const closeModal = () => {
        modelFeatures.closeModal();
    };
    const onSubmitModal = (e) => {
        e.preventDefault();
        const folderName= e.target.folderName.value;
        createNewFolder(folderName);
        closeModal();
    }
    return <div className='modal-container'>
        <form className='modal-body' onSubmit={onSubmitModal}>
            <span className='material-icons close' onClick={closeModal}>close</span>
            <h1>Create New Folder</h1>
            <div style={createfolderStyles.inputContainer}>
                <input name='folderName' style={{flexGrow:1}} placeholder='Enter Folder Name'></input>
                <button type='submit'>Create Folder</button>
            </div>
        </form>
    </div>
}

export const createfolderStyles = {
    inputContainer:{
        display:'flex',
        gap:10
    },
    input:{
        flexGrow:1,
        padding:10
    },
    btn:{
        backgroundColor:'#241f21',
        border:'none',
        borderRadius:4,
        padding:'0px 10px',
        color:'white'

    }
}