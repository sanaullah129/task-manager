import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import api from '../services/api';
import TaskTable from '../components/TaskTable';
import { PaginationControls } from '../components/PaginationControls';
import { useNavigate } from 'react-router-dom';
import type { PaginatedTasks, Task } from '../types';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<PaginatedTasks>('/tasks', { params: { page } });
      setTasks(data.tasks);
      setTotalPages(data.pages || 1);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Tasks</Typography>
        <Button variant="contained" onClick={() => navigate('/tasks/new')}>Add Task</Button>
      </Box>
      <TaskTable tasks={tasks} refresh={fetchTasks} loading={loading} />
      <PaginationControls page={page} totalPages={totalPages} onChange={setPage} />
    </Paper>
  );
};

export default Dashboard;
