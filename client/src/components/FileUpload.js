import React, { useRef, useState } from "react";
import styled from "styled-components";
const utils = require("../utils/utils")


const FileUpload = (props) => {
  const fileInputField = useRef(null);
  const [file, setFiles] = useState(null);


  const handelFile = (e) => {
    setFiles(e.target.files[0])
    
  };

  const removeFile = ()=>{
    setFiles(null)
  }
  const sendFile = ()=>{
    const formData = new FormData();
    formData.append('csvFile' , file , file.name)
    utils.setCsvFile(formData)
    alert("file update!")
  }
  
  const filename = (file) ? file.name : ""

  return (file == null) ? (
    <FileUploadContainer>
      
      <DragDropText>Drag and drop your files anywhere or</DragDropText>
      <UploadFileLabel>UPLOAD FILE</UploadFileLabel>
      <FormField
        type="file"
        ref={fileInputField}
        title=""
        value=""
        onChange={(e) => handelFile(e)}
     
      />
    </FileUploadContainer>
  ) : (
    <FilePreviewContainer>
      <Span> To Upload: {filename}</Span>
      <DivButton>
        <ButtonRemove onClick={()=>removeFile()}>Remove</ButtonRemove>
        <ButtonSend onClick={()=>sendFile()}>Send</ButtonSend>
      </DivButton>
    </FilePreviewContainer>
  );
};

export default FileUpload;

const FileUploadContainer = styled.section`
  position: relative;
  margin: 25px 0 15px;
  border: 2px dotted lightgray;
  padding: 35px 20px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const FormField = styled.input`
  font-size: 18px;
  display: block;
  width: 100%;
  border: none;
  text-transform: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

const InputLabel = styled.label`
  top: -21px;
  font-size: 13px;
  color: black;
  left: 0;
  position: absolute;
`;

const DragDropText = styled.p`
  font-weight: bold;
  letter-spacing: 2.2px;
  margin-top: 0;
  text-align: center;
`;

const UploadFileLabel = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  background-color: transparent;
  border: 2px solid #7809b0;
  font-size: 1rem;
  line-height: 1;
  padding: 1.1em 2.8em;
  font-weight: 700;
  border-radius: 6px;
  color: #7809b0;
  transition: color 250ms ease-in-out;
`;

const FilePreviewContainer = styled.div``;
const Span = styled.span`
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;
const DivButton = styled.div`
  display: flex;
  justify-content: center;
`;
const ButtonRemove = styled.button`
margin: 20px;
  padding: 10px;
  font-size: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  background-color: #7809b0;
`;
const ButtonSend = styled.button`
margin: 20px;
  padding: 10px;
  font-size: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  background-color: #7809b0;
`;
