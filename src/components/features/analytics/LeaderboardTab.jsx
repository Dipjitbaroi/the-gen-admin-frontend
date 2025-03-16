import React, { useState, useEffect } from "react";
import DropdownComponent from "../../layout/Dropdown/dropdown";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useGetTopPeerQuery,
  useGetTopProQuery,
} from "../../../services/apiConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../layout/Loader/Loader";

const LeaderboardTab = () => {
  const [topPeerValue, setTopPeerValue] = useState("thisMonth");
  const [topProValue, setTopProValue] = useState("thisMonth");

  const createApiParams = (value) => {
    if (value === "thisMonth") {
      return {
        type: "month",
        year: new Date().getFullYear().toString(),
        month: (new Date().getMonth() + 1).toString(),
      };
    } else {
      const monthIndex = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ].indexOf(value);
      return {
        type: "month",
        year: new Date().getFullYear().toString(),
        month: (monthIndex + 1).toString(),
      };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "null";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const handleChange = (setValue) => (event) => setValue(event.target.value);

  const {
    data: apiTopPeerData,
    isLoading: isTopPeerLoading,
    error: topPeerError,
  } = useGetTopPeerQuery(createApiParams(topPeerValue));
  const {
    data: apiTopProData,
    isLoading: isTopProLoading,
    error: topProError,
  } = useGetTopProQuery(createApiParams(topProValue));

  useEffect(() => {
    if (topPeerError) {
      const errorMessage =
        topPeerError.data?.message ||
        "Failed to load top peer data. Please try again later.";
      toast.error(errorMessage);
    }
    if (topProError) {
      const errorMessage =
        topProError.data?.message ||
        "Failed to load top pro data. Please try again later.";
      toast.error(errorMessage);
    }
  }, [topPeerError, topProError]);

  const topPros =
    apiTopProData?.data?.map((pro) => ({
      name: `${pro.proInfo?.first_name ?? "null"} ${
        pro.proInfo?.last_name ?? ""
      }`.trim(),
      created_at: formatDate(pro.proInfo?.created_at),
      totalSessions: pro.totalSessions ?? "null",
    })) ?? [];

  const topPeers =
    apiTopPeerData?.data?.map((peer) => ({
      name: `${peer.peerInfo?.first_name ?? "null"} ${
        peer.peerInfo?.last_name ?? ""
      }`.trim(),
      created_at: formatDate(peer.peerInfo?.created_at),
      totalSessions: peer.totalSessions ?? "null",
    })) ?? [];

  const columns = [
    { id: "name", label: "Name" },
    { id: "created_at", label: "Joined On" },
    { id: "totalSessions", label: "Sessions" },
  ];

  return (
    <div className="flex w-full">
      {[
        {
          title: "Top Pro",
          data: topPros,
          value: topProValue,
          setValue: setTopProValue,
          isLoading: isTopProLoading,
          error: topProError,
        },
        {
          title: "Top Peer",
          data: topPeers,
          value: topPeerValue,
          setValue: setTopPeerValue,
          isLoading: isTopPeerLoading,
          error: topPeerError,
        },
      ].map(({ title, data, value, setValue, isLoading, error }) => (
        <div key={title} className="w-full mx-2">
          <TableContainer
            component={Paper}
            className="bg-white border rounded-md shadow p-4"
          >
            <div className="flex justify-between border-b">
              <h1 className="text-2xl font-semibold pb-4">{title}</h1>
              <DropdownComponent
                value={value}
                handleChange={handleChange(setValue)}
              />
            </div>
            {isLoading ? (
              <p className="text-center py-4"><Loader/></p>
            ) : error ? (
              <p className="text-center py-4 text-red-500">
                Failed to load data
              </p>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((col) => (
                      <TableCell key={col.id} className="font-semibold">
                        {col.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? (
                    data.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((col) => (
                          <TableCell key={col.id}>
                            {row[col.id] ?? "null"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="text-center py-4"
                      >
                        No data available
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default LeaderboardTab;
