import { useContext,createContext, useState, useEffect } from "react";
import { json } from "react-router-dom";
import {v4} from 'uuid'
export const PlaygroundContext = createContext();
const intialData = [
    {
        id:v4(),
        title:'DSA', 
        files:[
            {
                id:v4(),
                title:'index',
                language:'cpp',
                code:`#include <iostream>
    using namespace std;
    int main(){
        cout<<"hello world";
        return 0;
    }`
            }
        ]

    },
    {
        id:v4(),
        title:'frontend',
        files:[
            {
                id:v4(),
                title:'test',
                language:'javascript',
                code:`console.log("hello dostoo")`
            }
        ]

    },
]

export const defaultCode = {
    'cpp':`
    #include <iostream>
    using namespace std;
    int main(){
        cout<<"hello world";
        return 0;
    }
    `,'javascript':`console.log('hello javascript');`,
    'python':`print("hello python");`,
    'java':`
    public class Main
    {
	public static void main(String[] args) {
		System.out.println("Hello World");
	}
}`
}

export const PlaygroundProvider = ({children}) => {

    const [folders,setfolders] = useState(() => {
        const localdata = localStorage.getItem('data');
        try{
            if(localdata){
                return JSON.parse(localdata);
            }
        }catch(error){
            console.log("error parsing local data",error);
        }
        return intialData;
    });
    
    const deleteFolder = (id) => {
        // delete the folder with id 
        // update the local storage also 
        const updatedFolderList = folders.filter((folderItem) => {
            return folderItem.id !== id;
        })
        localStorage.setItem('data',updatedFolderList);
        setfolders(updatedFolderList);

    }
    const createNewPlayground = (newPlayground) => {
        const {fileName,folderName,language} = newPlayground;
        const newFolders = [...folders];
        newFolders.push({
            id:v4(),
            title:folderName,
            files: [
                {
                    id:v4(),
                    title:fileName,
                    language
                }
            ]
        })

        localStorage.setItem('data',JSON.stringify(newFolders));
        setfolders(newFolders);
    }

    const createNewFolder = (folderName) => {
        const newFolder = {
            id:v4(),
            title: folderName,
            files: []
        };

        const allFolders = [...folders,newFolder];

        localStorage.setItem('data',JSON.stringify(allFolders));
        setfolders(allFolders);
    }

    const editFolderTitle = (newFolderName, id) => {
        const updatedFolderList = folders.map((folderItem) => {
            if(folderItem.id == id){
                folderItem.title = newFolderName;
            }
            return folderItem;
         })

         localStorage.setItem('data',JSON.stringify(updatedFolderList));
         setfolders(updatedFolderList);
    }

    const editFileTitle = (newFileName,folderId,fileId) =>{
        const copiedFolder = [...folders];
        for(let i = 0; i < copiedFolder.length; i++){
            if(folderId === copiedFolder[i].id){
                const files = copiedFolder[i].files;
                for(let j = 0; j < files.length; j++){
                    if(fileId == files[i].id){
                        files[i].title = newFileName;
                        break;
                    }
                }
                break;
            }
        }

        localStorage.setItem('data',JSON.stringify(copiedFolder));
        setfolders(copiedFolder);

    }

    const deleteFile= (folderId,fileId) => {
        const copiedFolder = [...folders];
        for(let i = 0; i < copiedFolder.length; i++){
            if(folderId == copiedFolder[i].id){
                const files = [...copiedFolder[i].files];
                copiedFolder[i].files = files.filter((file) => {
                    return file.id != fileId;
                 });
                 break;
            }
        }

        localStorage.setItem('data',JSON.stringify(copiedFolder));
        setfolders(copiedFolder);
    }

    const createPlayground = (folderId,file) => {
        const copiedFolder = [...folders]
        for(let i = 0; i < copiedFolder.length; i++){
            if(copiedFolder[i].id == folderId){
                copiedFolder[i].files.push(file);
                break;
            }
         }

         localStorage.setItem('data',JSON.stringify(copiedFolder))
         setfolders(folders);
    }

    const getDefaultCode = (fileId,folderId) => {
        for(let i = 0; i < folders.length; i++){
            if(folders[i].id === folderId){
                for(let j = 0; j < folders[i].files.length; j++){
                    const currentFile = folders[i].files[j];
                    if(fileId === currentFile.id){
                        return currentFile.code;
                    }
                }
            }
        }
    }

    const getlanguage = (fileId,folderId) => {
        for(let i = 0; i < folders.length; i++){
            if(folders[i].id === folderId){
                for(let j = 0; j < folders[i].files.length; j++){
                    const currentFile = folders[i].files[j];
                    if(fileId === currentFile.id){
                        return currentFile.language;
                    }
                }
            }
        }
    }


    const updatelangauge = (fileId,folderId) => {
        for(let i = 0; i < folders.length; i++){
            if(folders[i].id === folderId){
                for(let j = 0; j < folders[i].files.length; j++){
                    const currentFile = folders[i].files[j];
                    if(fileId === currentFile.id){
                        return currentFile.language;
                    }
                }
            }
        }
    }

    const updatelanguage = (fileId,folderId,language) => {
        const newFolders = [...folders];
        for(let i = 0; i < newFolders.length; i++){
            if(newFolders[i].id === folderId){
                for(let j = 0; j < newFolders[i].files.length; j++){
                    const currentFile = newFolders[i].files[j];
                    if(fileId === currentFile.id){
                       newFolders[i].files[j].code = defaultCode[language];
                       newFolders[i].files[j].language = language;
                    }
                }
            }
        }

        localStorage.setItem('data',JSON.stringify(newFolders));
        setfolders(newFolders);
    }

    const saveCode = (fileId,folderId, newCode) => {
        const newFolders = [...folders];
        for(let i = 0; i < newFolders.length; i++){
            if(newFolders[i].id === folderId){
                for(let j = 0; j < newFolders[i].files.length; j++){
                    const currentFile = newFolders[i].files[j];
                    if(fileId === currentFile.id){
                       newFolders[i].files[j].code = newCode;
                    }
                }
            }
        }

        localStorage.setItem('data',JSON.stringify(newFolders));
        setfolders(newFolders);
    }

    useEffect(() =>{
        if(!localStorage.getItem('data')){
                    localStorage.setItem('data',JSON.stringify(folders));
        }
    }, [])


    const playgroundfeatures =  {
        folders,
        createNewPlayground,
        createNewFolder,
        deleteFolder,
        editFolderTitle,
        editFileTitle,
        deleteFile,
        createPlayground,
        getDefaultCode,
        getlanguage,
        updatelanguage,
        saveCode
    }

    return(
        <PlaygroundContext.Provider value={playgroundfeatures}>
            {children}
        </PlaygroundContext.Provider>
    )

}