import { useState,useRef, useContext} from "react";
import "./EditorContainer.scss"
import Editor from "@monaco-editor/react";
import { PlaygroundContext } from "../../Providers/PlaygroundProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeSubmission } from "./service";

const editoroptions = {
    fontSize:15,
    wordWrap:'on'
}

const fileExtentionMapping = {
    cpp:'cpp',
    javascript:'js',
    python:'py',
    java:'java'
}
export const EditorContainer = ({fileId,folderId,runCode}) => {
    const {getDefaultCode,getlanguage,updatelanguage,saveCode} = useContext(PlaygroundContext);
    const[code,setCode] = useState(()=> {
        return getDefaultCode(fileId,folderId);
    });
    const codeRef = useRef(code);
    const [language,setlangauge] = useState(() => getlanguage(fileId,folderId));
    const [theme,settheme] = useState('vs-dark');
    const [isFullscreen,setisFullscreen] = useState(false);

    const onchangeCode= (newCode) => {
        codeRef.current = newCode;
    }

    const importCode = (event) => {
        // const file = event.target.files[0];
        // const fileType = file.type.includes("text");
        // if(fileType){
        //     const fileReader = new FileReader();
        //     fileReader.readAsText(file);
        //     fileReader.onload = function(value) {
        //         setCode(value.target.result);
        //         codeRef.current=value.target.result;
        //     }
        // }else{
        //     alert(`Please choose Program file Only`)
        // }
        const file = event.target.files[0];

        const fileName = file.name.split('.');
        const fileType = fileName[fileName.length - 1].toLowerCase();

        if (fileType in fileExtentionMapping) {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = function(event) {
                setCode(event.target.result);
                codeRef.current = event.target.result;
            };
        } else {
            alert('Please choose a valid program file ');
        }
    }

    const downloadcode = () => {
        const codeValue = codeRef.current;
        codeValue.trim();
        if(!codeValue){
            alert("please type some code before exporting");
        }

        const codeBlob = new Blob([codeValue], {type:'text/plain'});
        const downloadUrl = URL.createObjectURL(codeBlob);
        const link = document.createElement("a");
        link.href= downloadUrl;
        link.download = `code.${fileExtentionMapping[language]}`
        link.click();

    }

    const onChangeLangauge = (e) => {
        const lang = e.target.value;
        updatelanguage(fileId,folderId,lang);
        setCode(getDefaultCode(fileId,folderId));
        setlangauge(lang);
    }
    const onChangeTheme = (e) => {
       const theme = e.target.value;
       settheme(theme);
    }

    const onSaveCode = (e) => {
        saveCode(fileId,folderId,codeRef.current);
        toast("code saved");
    }

    
    const fullscreen = () => {
        setisFullscreen(!isFullscreen);

    }

    const OnrunCode = () => {
        runCode({code:codeRef.current,language})
    }
    return (
        <div className="root-editor-container" style={isFullscreen ? styles.fullscreen : {}}>
            <div className="editor-header">
                <div className="editor-left-container">
                    <b className="title">{"title of the card"}</b>
                    <span className="material-icons">edit</span>
                    <button onClick={onSaveCode}>Save code</button>
                </div>
                <div className="editor-right-container">
                    <select onChange={onChangeLangauge} value={language}>
                        <option value="cpp">cpp</option>
                        <option value="javascript">javascript</option>
                        <option value="java">java</option>
                        <option value="python">python</option>
                    </select>

                    <select onChange={onChangeTheme} value={theme}>
                        <option value="vs-dark">vs-dark</option>
                        <option value="vs-light">vs-light</option>
                    </select>
                </div>
            </div>
            <div className="editor-body">
                <Editor
                    height={"100%"}
                    language={language}
                    options={editoroptions}
                    theme={theme}
                    onChange={onchangeCode}
                    value={code}
                />
            </div>
            <div className="editor-footer">
                <button className="btn">
                    <span className="material-icons" onClick={fullscreen}>fullscreen</span>
                    <span>{isFullscreen ? "Minimize" :"Full Screen"}</span>
                </button>
                <label className="btn" htmlFor="import-code">
                    <span className="material-icons">cloud_download</span>
                    <span>import code</span>
                </label>
                <input type ="file" id="import-code" style={{display:"none"}} onChange={importCode}/>
                <button  className="btn" onClick={downloadcode} >
                    <span className="material-icons">cloud_upload</span>
                    <span>Export Code</span>
                </button>
                <button className="btn" onClick={OnrunCode}>
                    <span className="material-icons">play_arrow</span>
                    <span>Run Code</span>
                </button>
            </div>
        </div>
    )
}

const styles = {
    fullscreen: {
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        zIndex:10
    }
}