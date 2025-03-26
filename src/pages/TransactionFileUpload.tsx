// create a page for uploading transaction files

import React, { useState } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { useMutation } from "react-query";
import { TransactionService } from "../services/TransactionService";
import { useNavigate } from "react-router-dom";

const TransactionFileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const mutation = useMutation(TransactionService.uploadFile);

  const handleFileChange = (files: File[]) => {
    setFile(files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    await mutation.mutateAsync(file);
    navigate("/transactions");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Upload Transaction File
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DropzoneArea
            acceptedFiles={["text/csv", "application/pdf"]}
            filesLimit={1}
            dropzoneText="Drag and drop a transaction file here or click"
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={mutation.isLoading}
          >
            Upload
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TransactionFileUpload;
