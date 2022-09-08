import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFavourite } from "../features/favourites/favouritesSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import DoneIcon from "@mui/icons-material/Done";
import {
  IconButton,
  Modal,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  height: 300,
  bgcolor: "background.paper",
  border: "3px solid black",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

export default function ModalFavourites({
  openModal,
  setOpenModal,
  editPhoto,
}) {
  const [editDescription, setEditDescription] = useState("");
  const dispatch = useDispatch();

  const handleDescription = () => {
    if (editDescription && editDescription.length) {
      dispatch(
        updateFavourite({ id: editPhoto.id, description: editDescription })
      );
  
      setEditDescription("");
    }
  };
  useEffect(() => {
    setOpenModal(false);
  }, [setOpenModal]);

  return (
    <>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            sx={{ float: "right" }}
            onClick={() => setOpenModal(false)}
          >
            <CancelIcon />
          </IconButton>
          <Box sx={{ marginTop: 3, marginBottom:2, display: "flex" }}>
            <Typography sx={{ marginLeft: 3 }}>
             <span>width:</span> {editPhoto.width} 
             <br/>
              <span>height:</span> {editPhoto.height}
              <br/>
              <span>Likes:</span> {editPhoto.likes}
              <br/>
              <span>Date:</span> {editPhoto.setDate}
              <br/>
              <span>Description:</span> {editPhoto.description}
              <br/>
            </Typography>
          </Box>
          <Box>
            <FormControl>
              <InputLabel htmlFor="input">Edit Description</InputLabel>
              <Input
                aria-describedby="my-helper-text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <IconButton
                sx={{ color: "black" }}
                onClick={() => handleDescription()}
              >
                <DoneIcon onClick={() => setOpenModal(false)} />
              </IconButton>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
