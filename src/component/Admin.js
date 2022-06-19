import {
  Box,
  Button,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Sidebar from "../tools/admin/Sidebar";
import "../styles/admin.css";
import Cards from "../tools/admin/cards";
import MaterialTable from "@material-table/core";
import { editTicketDetails, fetchTicketDetails } from "../api/FetchTicket";
import { useEffect } from "react";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { editUserDetails, fetchUserDetails } from "../api/FetchUser";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {
  fetchUsersThunk,
  updateUsersThunk,
} from "../redux-setup/UserDataSlice";
import { useSelector } from "react-redux";

function Admin() {
  const [ticketDetails, setTicketDetails] = useState();
  // const [userDetails, setUserDetails] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [ticketDataToBeShownInModal, setTicketDataToBeShownInModal] = useState(
    {}
  );
  const [
    updateTitleRef,
    updateAssigneeRef,
    updatePriorityRef,
    updateDescRef,
    updateReporterRef,
    updateStatusRef,
  ] = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [newUpdatedTicket, setNewUpdatedTicket] = useState();

  const [userDetailsToBeInModal, setUserDetailsToBeInModal] = useState({});
  const [openUserModal, setOpenUserModal] = useState(false);
  const [
    updateNameRef,
    updateMailRef,
    updateUserIdRef,
    updateUserStatusRef,
    updateUserTypesRef,
  ] = [useRef(), useRef(), useRef(), useRef(), useRef()];
  const [newUpdatedUser, setNewUpdatedUser] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const usersData = useSelector((state) => state.UserSlice);
  const t = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    height: "70vh",
    justifyContent: "space-EVENLY",
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseUserModal = () => {
    setOpenUserModal(false);
  };

  useEffect(() => {
    (async () => {
      dispatch(fetchUsersThunk());
      FetchTicket();
    })();
  }, []);

  const FetchTicket = () => {
    fetchTicketDetails()
      .then((responce) => {
        if (responce.status == 200) {
          console.log(responce);
          setTicketDetails(responce.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editTickets = (dataTicketOfSelectedRow) => {
    const ticket = {
      id: dataTicketOfSelectedRow.id,
      assignee: dataTicketOfSelectedRow.assignee,
      description: dataTicketOfSelectedRow.description,
      reporter: dataTicketOfSelectedRow.reporter,
      status: dataTicketOfSelectedRow.status,
      ticketPriority: dataTicketOfSelectedRow.ticketPriority,
      title: dataTicketOfSelectedRow.title,
    };

    setTicketDataToBeShownInModal(ticket);
    setOpenModal(true);
  };

  const editTicketsInModal = () => {
    ticketDataToBeShownInModal.title = updateTitleRef.current.value;
    ticketDataToBeShownInModal.assignee = updateAssigneeRef.current.value;
    ticketDataToBeShownInModal.description = updateDescRef.current.value;
    ticketDataToBeShownInModal.reporter = updateReporterRef.current.value;
    ticketDataToBeShownInModal.status = updateStatusRef.current.value;
    ticketDataToBeShownInModal.ticketPriority = updatePriorityRef.current.value;

    const newUpdateTicket = {
      assignee: updateAssigneeRef.current.value,
      description: updateDescRef.current.value,
      reporter: updateReporterRef.current.value,
      status: updateStatusRef.current.value,
      ticketPriority: updatePriorityRef.current.value,
      title: updateTitleRef.current.value,
    };
    setNewUpdatedTicket(newUpdateTicket);
  };

  const updateChanges = () => {
    setLoading(true);
    editTicketDetails(ticketDataToBeShownInModal.id, newUpdatedTicket)
      .then((responce) => {
        console.log("update successfully", responce);
        setOpenModal(false);
        window.location.reload();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        console.log(newUpdatedTicket);
        setLoading(false);
      });
  };

  // const FetchUsers = () => {
  //   fetchUserDetails()
  //     .then((responce) => {
  //       if (responce.status == 200) {
  //         console.log(responce);
  //         setUserDetails(responce.data);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  const editUsers = (dataSelectedOfUserRow) => {
    const users = {
      userId: dataSelectedOfUserRow.userId,
      name: dataSelectedOfUserRow.name,
      userTypes: dataSelectedOfUserRow.userTypes,
      userStatus: dataSelectedOfUserRow.userStatus,
      email: dataSelectedOfUserRow.email,
    };
    setUserDetailsToBeInModal(users);
    setOpenUserModal(true);
  };

  const editUsersInModal = () => {
    userDetailsToBeInModal.userId = updateUserIdRef.current.value;
    userDetailsToBeInModal.name = updateNameRef.current.value;
    userDetailsToBeInModal.email = updateMailRef.current.value;
    userDetailsToBeInModal.userStatus = updateUserStatusRef.current.value;
    userDetailsToBeInModal.userTypes = updateUserTypesRef.current.value;

    const newUser = {
      userId: updateUserIdRef.current.value,
      userName: updateNameRef.current.value,
      email: updateMailRef.current.value,
      userStatus: updateUserStatusRef.current.value,
      userType: updateUserTypesRef.current.value,
    };
    setNewUpdatedUser(newUser);
  };

  const updateUserChanges = () => {
    // console.log(newUpdatedUser);
    // setLoading(true);
    // editUserDetails(userDetailsToBeInModal.userId, newUpdatedUser)
    //   .then((responce) => {
    //     console.log("update successfully", responce);
    //     setOpenUserModal(false);
    //     window.location.reload();
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("error");
    //     setLoading(false);
    //   });
    dispatch(updateUsersThunk(newUpdatedUser));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        className="welcome"
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}
      >
        <Typography variant="h2" color="primary">
          welcome
        </Typography>
        <Box className="cards-container">
          <Cards cardData={{ color: "primary", title: "Open", number: "8" }} />
          <Cards
            cardData={{ color: "warning", title: "Progress", number: "10" }}
          />
          <Cards
            cardData={{ color: "success", title: "Closed", number: "7" }}
          />
          <Cards cardData={{ color: "error", title: "Blocked", number: "6" }} />
        </Box>
        <Box sx={{ padding: "2% 5%" }}>
          <MaterialTable
            onRowClick={(e, data) => {
              editTickets(data);
            }}
            style={{
              color: t.palette.text.primary,
              backgroundColor: t.palette.background.onother,
            }}
            options={{
              headerStyle: {
                color: t.palette.text.primary,
                backgroundColor: t.palette.background.default,
              },
              searchFieldStyle: {
                backgroundColor: t.palette.background.paper,
                color: t.palette.text.primary,
              },
              exportMenu: [
                {
                  label: "Export pdf",
                  exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "Ticket Records"),
                },
                {
                  label: "Export csv",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "Ticket Records"),
                },
              ],
            }}
            columns={[
              {
                title: "Ticket ID",
                field: "id",
              },
              {
                title: "TITLE",
                field: "title",
              },
              {
                title: "Description",
                field: "description",
              },
              {
                title: "Reporter",
                field: "reporter",
              },
              {
                title: "Priority",
                field: "ticketPriority",
              },
              {
                title: "Assignee",
                field: "assignee",
              },
              {
                title: "Status",
                field: "status",
              },
            ]}
            data={ticketDetails}
            title="TICKET RECORDS"
          />
        </Box>
        <Box sx={{ padding: "2% 5%" }}>
          <MaterialTable
            onRowClick={(e, data) => {
              editUsers(data);
            }}
            style={{
              color: t.palette.text.primary,
              backgroundColor: t.palette.background.onother,
            }}
            options={{
              headerStyle: {
                color: t.palette.text.primary,
                backgroundColor: t.palette.background.default,
              },
              searchFieldStyle: {
                backgroundColor: t.palette.background.paper,
                color: t.palette.text.primary,
              },
              exportMenu: [
                {
                  label: "Export pdf",
                  exportFunc: (cols, datas) =>
                    ExportPdf(cols, datas, "Users Records"),
                },
                {
                  label: "Export csv",
                  exportFunc: (cols, datas) =>
                    ExportCsv(cols, datas, "Users Records"),
                },
              ],
            }}
            columns={[
              {
                title: "Name",
                field: "name",
              },
              {
                title: "User-id",
                field: "userId",
              },
              {
                title: "E-mail",
                field: "email",
              },
              {
                title: "Status",
                field: "userStatus",
              },
              {
                title: "User-Type",
                field: "userTypes",
              },
            ]}
            data={usersData.data}
            title="USER RECORDS"
          />
        </Box>

        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              variant="h4"
              color="primary"
              sx={{ color: t.palette.color.another }}
            >
              Update Tickets
            </Typography>

            <Box sx={{ color: t.palette.text.primary }}>Ticket Id</Box>
            <Box
              sx={{
                color: t.palette.color.another,
                fontWeight: "bold",
                fontSize: "larger",
              }}
            >
              {ticketDataToBeShownInModal.id}
            </Box>
            <TextField
              id="standard-multiline-flexible"
              label="Title"
              multiline
              variant="standard"
              value={ticketDataToBeShownInModal.title}
              inputRef={updateTitleRef}
              onChange={editTicketsInModal}
              name="title"
            />
            <TextField
              id="standard-multiline-flexible"
              label="Description"
              multiline
              variant="standard"
              value={ticketDataToBeShownInModal.description}
              inputRef={updateDescRef}
              onChange={editTicketsInModal}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Reporter"
              multiline
              variant="standard"
              value={ticketDataToBeShownInModal.reporter}
              inputRef={updateReporterRef}
              onChange={editTicketsInModal}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Priority"
              multiline
              variant="standard"
              value={ticketDataToBeShownInModal.ticketPriority}
              inputRef={updatePriorityRef}
              onChange={editTicketsInModal}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Assignee"
              multiline
              variant="standard"
              value={ticketDataToBeShownInModal.assignee}
              inputRef={updateAssigneeRef}
              onChange={editTicketsInModal}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Status"
              multiline
              variant="standard"
              value={ticketDataToBeShownInModal.status}
              inputRef={updateStatusRef}
              onChange={editTicketsInModal}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={updateChanges}
            >
              {loading ? <CircularProgress size={25} /> : "Submit"}
            </Button>
          </Box>
        </Modal>

        <Modal
          open={openUserModal}
          onClose={handleCloseUserModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              variant="h4"
              color="primary"
              sx={{ color: t.palette.color.another }}
            >
              Update Users
            </Typography>
            <Box sx={{ color: t.palette.text.primary }}>User Id</Box>
            <Box
              sx={{
                color: t.palette.color.another,
                fontWeight: "bold",
                fontSize: "larger",
              }}
            >
              {userDetailsToBeInModal.userId}
            </Box>
            <TextField
              id="standard-multiline-flexible"
              label="Name"
              multiline
              variant="standard"
              value={userDetailsToBeInModal.name}
              inputRef={updateNameRef}
              onChange={editUsersInModal}
            />
            <TextField
              id="standard-multiline-flexible"
              label="E-mail"
              multiline
              variant="standard"
              value={userDetailsToBeInModal.email}
              inputRef={updateMailRef}
              onChange={editUsersInModal}
              disabled
            />
            <TextField
              id="standard-multiline-flexible"
              label="User Status"
              multiline
              variant="standard"
              value={userDetailsToBeInModal.userStatus}
              inputRef={updateUserStatusRef}
              onChange={editUsersInModal}
            />
            <TextField
              id="standard-multiline-flexible"
              label="User Types"
              multiline
              variant="standard"
              value={userDetailsToBeInModal.userTypes}
              inputRef={updateUserTypesRef}
              onChange={editUsersInModal}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={updateUserChanges}
            >
              {usersData.loading ? <CircularProgress size={25} /> : "Submit"}
            </Button>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default Admin;
