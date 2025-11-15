import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, MenuItem, Paper, Typography } from '@mui/material';
import { Skeleton } from '@mui/material';
import api from '../services/api';
import { Task, TaskStatus } from '../types';
import { useNavigate, useParams } from 'react-router-dom';

interface Props { }

const TaskForm: React.FC<Props> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Pending');
  const [saving, setSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      if (!isEdit) return;
      const { data } = await api.get<Task>(`/tasks/${id}`);
      setTitle(data.title);
      setDescription(data.description);
      setStatus(data.status);
    };
    fetchTask();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/tasks/${id}`, { title, description, status });
      } else {
        await api.post('/tasks', { title, description, status });
      }
      navigate('/');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h6" gutterBottom>{isEdit ? 'Edit Task' : 'New Task'}</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {initialLoading ? (
          <>
            <Skeleton variant="text" height={56} />
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="text" height={56} />
          </>
        ) : (
          <>
        <TextField label="Title" value={title} onChange={e => setTitle(e.target.value)} required fullWidth />
        <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} multiline minRows={3} fullWidth />
        <TextField select label="Status" value={status} onChange={e => setStatus(e.target.value as TaskStatus)} fullWidth>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </TextField>
          </>
        )}
        <Button type="submit" variant="contained" disabled={saving || initialLoading}>{saving ? 'Saving...' : 'Save'}</Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;
