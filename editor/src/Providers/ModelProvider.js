import { createContext, useState } from "react";

export const ModelContext = createContext();


export const modalconstants = {
    CREATE_PLAYGROUND : 'CREATE_PLAYGROUND',
    CREATE_FOLDER: 'CREATE_FOLDER',
    UPDATE_FOLDER_TITLE: 'UPDATE_FOLDER_TITLE',
    UPDATE_FILE_TITLE:'UPDATE_FILE-TITLE',
    CREATE_CARD:'CREATE_CARD'
}

export const ModelProvider = ({children}) =>{
    const [modelType ,setModalType] = useState(null);
    const [modalPayload,setModalPayload] = useState(null);
    const closeModal = () => {
        setModalType(null);
        setModalPayload(null);
    }
    console.log("this is model type",{modelType});
    const modelFeatures = {
        openModel:setModalType,
        closeModal,
        activeModal:modelType,
        modalPayload,
        setModalPayload,

    }
    return (
        <ModelContext.Provider value={modelFeatures}> 
            {children}
        </ModelContext.Provider>
    );
}

