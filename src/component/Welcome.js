import { Button, Modal, Paper, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import ReCAPTCHA from "react-google-recaptcha";
import "../styles/Welcome.css";
import { Box } from "@mui/system";
import CustomerSvg from "../assests/CustomerSvg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Welcome() {
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  function handleRecaptcha(value) {
    console.log("Captcha value:", value);
    setIsVerified(true);
  }

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <Paper className="welcomeContainer">
      <CustomerSvg />
      <Typography variant="h2">Welcome to CRM app</Typography>
      <Button
        variant="contained"
        style={{ fontWeight: "BOLD", fontSize: "16PX" }}
        onClick={handleOpenModal}
      >
        Get Started
      </Button>
      <Modal
        open={modalIsOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={handleRecaptcha}
          />
          {isVerified && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/login")}
            >
              Click Here To Login
            </Button>
          )}
        </Box>
      </Modal>
    </Paper>
  );
}

export default Welcome;
