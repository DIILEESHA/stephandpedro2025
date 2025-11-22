"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  Table,
  Button,
  Tag,
  Modal,
  Input,
  message,
  Select,
  Space,
  Popconfirm,
} from "antd";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import emailjs from "@emailjs/browser";

const { Option } = Select;
const DUMMY_PASSWORD = "admin123";
const STORAGE_KEY = "admin_password";

const statusColors = {
  pending: "orange",
  approved: "green",
  rejected: "red",
};

const AdminDashboard = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loadingData, setLoadingData] = useState(false);

  // Load saved password from localStorage & auto-login
  useEffect(() => {
    const savedPwd = localStorage.getItem(STORAGE_KEY);
    if (savedPwd === DUMMY_PASSWORD) {
      setLoggedIn(true);
      message.success("Auto logged in");
    }
  }, []);

  // Subscribe to Firestore data when logged in
  useEffect(() => {
    if (!loggedIn) return;

    setLoadingData(true);
    const q = query(collection(db, "guestRequests"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
        status: docItem.data().status || "pending",
        emailSent: docItem.data().emailSent || false,
      }));
      setRequests(data);
      setLoadingData(false);
    });

    return () => unsubscribe();
  }, [loggedIn]);

  // Manual refresh fetch (non real-time), triggered by refresh button
  const manualRefresh = useCallback(async () => {
    if (!loggedIn) return;
    setLoadingData(true);
    try {
      const q = query(collection(db, "guestRequests"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
        status: docItem.data().status || "pending",
        emailSent: docItem.data().emailSent || false,
      }));
      setRequests(data);
      message.success("Data refreshed");
    } catch (error) {
      console.error("Refresh error:", error);
      message.error("Failed to refresh data");
    }
    setLoadingData(false);
  }, [loggedIn]);

  const handleLogin = () => {
    if (passwordInput === DUMMY_PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem(STORAGE_KEY, passwordInput);
      message.success("Logged in successfully");
      setPasswordInput("");
    } else {
      message.error("Incorrect password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem(STORAGE_KEY);
    message.info("Logged out");
  };

  const handleStatusChange = async (value, record) => {
    if (record.emailSent) return;

    try {
      await updateDoc(doc(db, "guestRequests", record.id), {
        status: value,
        emailSent: false,
      });

      message.success(`Status updated to ${value}`);
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
    }
  };

  const sendEmail = async (record) => {
    setLoading(true);
    try {
      await emailjs.send(
        "service_5a0rrlm",
        "template_j6rrart",
        {
          to_name: record.fullName,
          to_email: record.email,
          subject:
            record.status === "approved"
              ? "🎉 Your Accommodation Request is Approved!"
              : "❌ Your Accommodation Request is Rejected",
          status: record.status,
          message:
            record.status === "approved"
              ? "Congratulations! Your request has been approved."
              : "We are sorry! Your request has been rejected.",
        },
        "y0CbJ01qwSlHTKwSV"
      );

      await updateDoc(doc(db, "guestRequests", record.id), {
        emailSent: true,
      });

      message.success("Email sent successfully!");
    } catch (error) {
      console.error("EmailJS error:", error);
      message.error("Failed to send email");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "guestRequests", id));
      message.success("Deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      message.error("Failed to delete request");
    }
  };

  const filteredRequests =
    filterStatus === "all"
      ? requests
      : requests.filter((r) => r.status === filterStatus);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      responsive: ["xs", "sm"],
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      responsive: ["md"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
    },
    {
      title: "Special Requests",
      dataIndex: "specialRequests",
      key: "specialRequests",
      render: (text) => text || "-",
      responsive: ["lg"],
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Select
          value={record.status}
          disabled={record.emailSent}
          onChange={(value) => handleStatusChange(value, record)}
          style={{ width: 150 }}
        >
          <Option value="pending">
            <Tag color={statusColors.pending}>Pending</Tag>
          </Option>
          <Option value="approved">
            <Tag color={statusColors.approved}>Approved</Tag>
          </Option>
          <Option value="rejected">
            <Tag color={statusColors.rejected}>Rejected</Tag>
          </Option>
        </Select>
      ),
      responsive: ["xs", "sm", "md"],
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type={record.status === "approved" ? "primary" : "default"}
            danger={record.status === "rejected"}
            disabled={
              record.status === "pending" || record.emailSent || loading
            }
            onClick={() => sendEmail(record)}
          >
            {record.emailSent
              ? "Email Sent"
              : record.status === "approved"
              ? "Send Approval"
              : record.status === "rejected"
              ? "Send Rejection"
              : "Send"}
          </Button>
          <Popconfirm
            title="Are you sure to delete this request?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="default">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
      responsive: ["xs", "sm", "md"],
    },
  ];

  if (!loggedIn) {
    return (
      <Modal open centered closable={false} footer={null} title="Admin Login">
        <Input.Password
          placeholder="Enter admin password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          onPressEnter={handleLogin}
          autoFocus
        />
        <Button
          type="primary"
          onClick={handleLogin}
          style={{ marginTop: 16 }}
          block
        >
          Login
        </Button>
      </Modal>
    );
  }

  return (
    <div style={{ padding: 20, minHeight: "100vh" }}>
      <Space
        style={{
          marginBottom: 16,
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Space>
          <span>Filter Status:</span>
          <Select
            value={filterStatus}
            onChange={(value) => setFilterStatus(value)}
            style={{ width: 150 }}
          >
            <Option value="all">All</Option>
            <Option value="pending">Pending</Option>
            <Option value="approved">Approved</Option>
            <Option value="rejected">Rejected</Option>
          </Select>
          <Button onClick={manualRefresh} loading={loadingData}>
            Refresh Data
          </Button>
        </Space>

        <Button danger onClick={handleLogout}>
          Logout
        </Button>
      </Space>

      <Table
        dataSource={filteredRequests}
        columns={columns}
        rowKey="id"
        scroll={{ x: 700 }}
        bordered
        pagination={{ pageSize: 8 }}
        loading={loadingData}
        style={{ background: "#fff", borderRadius: 8 }}
      />
    </div>
  );
};

export default AdminDashboard;
