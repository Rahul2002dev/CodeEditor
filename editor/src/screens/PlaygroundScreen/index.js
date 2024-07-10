import { useParams } from "react-router-dom"
import "./index.scss";
import { EditorContainer } from "./EditorContainer";
import { useCallback, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { makeSubmission } from "./service";

export const PlaygroundScreen = () => {
    const params = useParams();
    const {fileId,folderId} = params;
    const [input,setInput] = useState('');
    const [output,setoutput] = useState('');
    const [showLoader,setshowloader] = useState(false);

    const importInput = (e) => {
        const file = e.target.files[0];
        const fileType  = file.type.includes("text");

        if(fileType){
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = (e) => {
                setInput(e.target.result);
            }
        }else{
            alert("please choose a correct input file")
        }


    }    

    const exportOutput = () => {
        const outputvalue = output.trim();
        if(!outputvalue){
            alert("output is empty");
            return;
        }

        const blob = new Blob([outputvalue],{type:'text/plain'})
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href= url;
        link.download = `output.txt`;
        link.click();

    }
    const callback = ({apiStatus,data,message}) => {
        if(apiStatus === 'loading'){
            setshowloader(true);
        }
        else if(apiStatus === 'error'){
            setshowloader(false)
            setoutput("something went wrong")
        }else{
            setshowloader(false);
            if(data.status.id === 3){
                setoutput(atob(data.stdout))
            }else{
                setoutput(atob(data.stderr))
            }
        }
    }

    const runCode = useCallback(({code,language}) => {
        makeSubmission({code,language,stdin:input,callback})
    },[input])
  
    return (
        <div className="playground-container">
            <div className="header-container">
                <img className="logo"/>
            </div>
            <div className="content-container">
                <div className="editor-container">
                    <EditorContainer fileId = {fileId} folderId={folderId} runCode ={runCode}/>
                    <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
                </div>
                <div className="input-output-container">
                    <div className="input-header">
                        <b>input:</b>
                        <label htmlFor="input" className="icon-container">
                            <span className="material-icons">cloud_download</span>
                            <b>Import Input</b>
                        </label>
                        <input type="file" id="input" style={{display:'none'}} onChange={importInput}/>
                    </div>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
                </div>
                <div className="input-output-container">
                    <div className="input-header">
                        <b>Output:</b>
                        <button className="icon-container" onClick={exportOutput}>
                            <span className="material-icons">cloud_upload</span >
                            <b>Export Output</b>
                        </button>
                    </div>
                    <textarea readOnly value={output} onChange={(e) => setoutput(e.target.value)}></textarea>
                </div>
            </div>

            {showLoader && <div className="fullpage-loader">
                <div className="loader">

                </div>
            </div>}
        
        </div>
    )
}