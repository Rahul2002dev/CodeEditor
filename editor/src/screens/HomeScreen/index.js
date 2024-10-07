
import { useContext } from 'react';
import './index.scss';
import { PlaygroundContext } from '../../Providers/PlaygroundProvider';
import { Model } from '../../Providers/Models/Model';
import { ModelContext, modalconstants } from '../../Providers/ModelProvider';
import { useNavigate } from 'react-router-dom';
export const HomeScreen = () => {
    const {folders}= useContext(PlaygroundContext);
    const navigate = useNavigate();
    const modelFeatures = useContext(ModelContext);
    const openCreatePlayground =  () =>{
        modelFeatures.openModel(modalconstants.CREATE_FOLDER);
    }
    const playgroundfeatures = useContext(PlaygroundContext);

    const openCreatePlaygroundModel = () => {
        modelFeatures.openModel("CREATE_PLAYGROUND");
    }

    const Folder = ({ folderTitle, cards ,id}) => {
        const {deleteFolder,deleteFile} = useContext(PlaygroundContext);
        const {openModel,setModalPayload} = useContext(ModelContext);

        const ondeleteFolder = () => {
            deleteFolder(id);
        };

        const onEditFolder = () => {
            setModalPayload(id);
            openModel(modalconstants.UPDATE_FOLDER_TITLE);
        }

        const openCreateCardModal = () => {
            setModalPayload(id);
            openModel(modalconstants.CREATE_CARD);
        }
        return <div className='folder-container'>
            <div className='folder-header'>
                <div className='folder-header-item'>
                    <span className='material-icons' style={{ color: "#FFCA29" }}>folder</span>
                    <span>{folderTitle}</span>
                </div>
                <div className='folder-header-item'>
                    <span className='material-icons' onClick={ondeleteFolder}>delete</span>
                    <span className='material-icons' onClick={onEditFolder}>edit</span>
                    <button onClick={openCreateCardModal}>
                        <span className='material-icons'>add</span>
                        <span>New playground</span>
                    </button>
                </div>
            </div>
            <div className='cards-container'>
                {
                    cards?.map((file, index) => {
                        const onEditFile = () => {
                            setModalPayload({fileId:file.id,folderId: id});
                            openModel(modalconstants.UPDATE_FILE_TITLE);
                        }

                        const onDeleteFile = () => {
                            deleteFile(id,file.id);
                        }
                        const navigateToPlaygroundScreen = () => {
                            navigate(`/playground/${file.id}/${id}`);
                        }
                        return (
                            <div className='card' key={index} onClick={navigateToPlaygroundScreen}>

                                <img scr="logo.png" />
                                <div className='title-container'>
                                    <span>{file?.title}</span>
                                    <span>Language: {file?.language}</span>
                                </div>


                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <span className='material-icons' onClick={onDeleteFile}>delete</span>
                                    <span className='material-icons' onClick={onEditFile}>edit</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    }
    return (
        <div className="home-container">
            <nav className="Nav-Bar">CODEDITOR</nav>
            <div className="left-container">
                <div className='item-container'>
                    <img />
                    <h1>CODEDITOR</h1>
                    <h2>Code.Compiler.Debug</h2>
                    <button onClick={openCreatePlaygroundModel}>
                        <span className='material-icons'>add</span>
                        <span>Create Playground</span>
                    </button>
                </div>
            </div>
            <div className="right-container">
                <div className='header'>
                    <div className='title'><span>My</span> playground</div>
                    <button className='add-folder' onClick={openCreatePlayground}>
                        <span className='material-icons'>add</span>
                        <span>New folder</span>
                    </button>
                </div>
                {
                    folders.map((folder, index) => {
                        return <Folder folderTitle={folder.title} cards={folder.files} key={index}  id={folder.id}/>
                    })
                }
                <Model />
            </div>
        </div>
    )
}