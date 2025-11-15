import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Chip,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuthStore } from "../store/authStore";
import type { Task } from "../types";

interface Props {
  tasks: Task[];
  refresh: () => void;
  loading?: boolean;
}

const SKELETON_ROWS = 6;

const TaskTable: React.FC<Props> = ({ tasks, refresh, loading }) => {
  const navigate = useNavigate();
  const isAdmin = useAuthStore((s) => s.user?.role === 'admin');

  const handleDelete = async (id: string) => {
    if (!confirm("Delete task?")) return;
    await api.delete(`/tasks/${id}`);
    refresh();
  };

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Created</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loading ? (
          Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton variant="text" width={140} /></TableCell>
              <TableCell><Skeleton variant="text" width={260} /></TableCell>
              <TableCell><Skeleton variant="rounded" width={70} height={24} /></TableCell>
              <TableCell><Skeleton variant="text" width={120} /></TableCell>
              <TableCell align="right"><Skeleton variant="circular" width={28} height={28} /></TableCell>
            </TableRow>
          ))
        ) : tasks?.length > 0 ? (
          tasks.map((t) => (
            <TableRow key={t._id} hover>
              <TableCell>{t.title}</TableCell>
              <TableCell
                sx={{
                  maxWidth: 300,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {t.description}
              </TableCell>
              <TableCell>
                <Chip
                  label={t.status}
                  color={t.status === "Completed" ? "success" : "warning"}
                  size="small"
                />
              </TableCell>
              <TableCell>{new Date(t.createdAt).toLocaleString()}</TableCell>
              <TableCell align="right">
                <IconButton
                  size="small"
                  onClick={() => navigate(`/tasks/${t._id}/edit`)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                {isAdmin && (
                  <IconButton size="small" onClick={() => handleDelete(t._id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
              No tasks yet. Create your first one to get started.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
