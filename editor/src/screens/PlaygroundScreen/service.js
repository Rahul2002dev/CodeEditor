const languageCodeMap = {
    cpp:54,
    python:92,
    javascript:93,
    java:91,
}

async function getSubmission(tokenId,callback){
        const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/octet-stream',
                'x-rapidapi-key': '7204430a99msh429d38d58e7c526p15c2bcjsn930ca895f5ff',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com', 
            }
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            return result;
        } catch (error) {
           callback({apiStatus:'error',message:JSON.stringify(error)})
        }
}

export async function makeSubmission({code,language,stdin,callback}) {
        const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&fields=*';
        const httpOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-rapidapi-key': '7204430a99msh429d38d58e7c526p15c2bcjsn930ca895f5ff',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            },
            body: JSON.stringify({
                language_id: languageCodeMap[language],
                source_code:btoa(code),
                stdin: btoa(stdin)
            })
        };

    try {
        callback({apiStatus:'loading'})
        const response = await fetch(url, httpOptions);
        const result = await response.json();
        const tokenId = result.token;
        let statusCode = 1;
        let apiSubmissionResult;
        while(statusCode === 1 || statusCode === 2){
            try{
            apiSubmissionResult = await getSubmission(tokenId);
            statusCode = apiSubmissionResult.status.id;
            }
            catch(error){
                callback({apiStatus: 'error',message:JSON.stringify(error)});
                return;
            }
        }
        
        console.log(apiSubmissionResult);
        if(apiSubmissionResult){
            callback({apiStatus:'success',data:apiSubmissionResult})
        }
    } catch (error) {
        callback({
            apiStatus:'error',
            message:JSON.stringify(error)
        })
    }
}