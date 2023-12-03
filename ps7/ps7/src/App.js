import React, { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

const PomodoroTimer = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return storedTasks;
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [workDuration, setWorkDuration] = useState(25 * 60);
  const [breakDuration, setBreakDuration] = useState(5 * 60);
  const [timer, setTimer] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [selectedTaskDescription, setSelectedTaskDescription] = useState('');

  const updateTimerRef = useRef();
  const updateBreakTimerRef = useRef();

  const [inBreak, setInBreak] = useState(false);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const updateTimer = useCallback(() => {
    setWorkDuration((prevDuration) => {
      if (prevDuration > 0) {
        return prevDuration - 1;
      } else {
        clearInterval(timer);
        setIsTimerRunning(false);

        if (!inBreak) {
          setInBreak(true);
          setTimer(setInterval(updateBreakTimerRef.current, 1000));
        } else {
          setInBreak(false);
          setTimer(setInterval(updateTimerRef.current, 1000));
        }

        return 0;
      }
    });
  }, [timer, inBreak]);

  // const startTimer = () => {
  //   setWorkDuration(25 * 60); // Reset the timer
  //   clearInterval(timer); // Clear any previous interval
  //   setTimer(setInterval(updateTimerRef.current, 1000));
  // };


  useEffect(() => {
    updateTimerRef.current = updateTimer;

    return () => {
      updateTimerRef.current = null;
    };
  }, [updateTimer]);

  useEffect(() => {
    if (isTimerRunning && workDuration === 0) {
      clearInterval(timer);
      setInBreak(true);
      setTimer(setInterval(updateTimerRef.current, 1000));
    }
  }, [workDuration, isTimerRunning, timer]);

  const updateBreakTimer = useCallback(() => {
    setBreakDuration((prevDuration) => {
      if (prevDuration > 0) {
        return prevDuration - 1;
      } else {
        clearInterval(timer);
        setInBreak(false);
        setWorkDuration(tasks[0]?.workDuration || 25 * 60);
        setTimer(setInterval(updateTimer, 1000));
        return 0;
      }
    });
  }, [timer, tasks, updateTimer]);

  useEffect(() => {
    updateTimerRef.current = updateTimer;
    updateBreakTimerRef.current = updateBreakTimer;

    return () => {
      updateTimerRef.current = null;
      updateBreakTimerRef.current = null;
    };
  }, [updateTimer, updateBreakTimer]);

  useEffect(() => {
    if (isTimerRunning && workDuration === 0) {
      clearInterval(timer);
      setInBreak(true);
      setTimer(setInterval(updateBreakTimerRef.current, 1000));
    }
  }, [workDuration, isTimerRunning, timer]);

  const addTask = () => {
    setTasks((prevTasks) => [...prevTasks, { description: '', sessionsCompleted: 0 }]);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };


  const startTimer = () => {
    clearInterval(timer); // Clear any previous interval
    setTimer(setInterval(updateTimerRef.current, 1000));
  };

  const startTask = (index) => {
    const selectedTask = tasks[index];
    setCurrentTask(selectedTask);
    setSelectedTaskDescription(selectedTask.description);
    setFocusMode(true);
    setInBreak(false);

    // Reset the timer and clear any previous interval
    // setWorkDuration(selectedTask.workDuration || 25 * 60);
    setWorkDuration(workDuration);
    clearInterval(timer);

    // Start the timer interval
    startTimer();
  };

  const stopTask = () => {
    clearInterval(timer);

    if (isTimerRunning) {
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks];
        const index = updatedTasks.findIndex((task) => task.description === currentTask.description);
        updatedTasks[index].sessionsCompleted += 1;
        return updatedTasks;
      });
      setCurrentTask(null);
      setIsTimerRunning(false);
      setFocusMode(false);

      setInBreak(true);
      setTimer(setInterval(updateBreakTimer, 1000));

      if (!inBreak) {
        setInBreak(true);
        setTimer(setInterval(updateBreakTimer, 1000));
      }

      return;
    }
    setFocusMode(false);
    setInBreak(false);
  };

  return (
    <div>
      {!focusMode && (
        <div>
          <p id="headertext">What do you want to do?</p>

          <button id="addTaskButton" onClick={addTask}>
            Add Task
          </button>

          <div className="task-row">
            {tasks.map((task, index) => (
              <TaskRow
                key={index}
                task={task}
                index={index}
                startTask={startTask}
                deleteTask={deleteTask}
                tasks={tasks}
                setTasks={setTasks}
                className="task"
                sessionsCompleted={task.sessionsCompleted}
              />
            ))}
          </div>
        
          <div className="interval-box">
            <label className="workInterval" htmlFor="workInterval">
              Work Interval (minutes):
            </label>
            <input
              type="number"
              id="workInterval"
              value={workDuration / 60}
              onChange={(e) => setWorkDuration(parseInt(e.target.value, 10) * 60)}
            />
          </div>
          <div className="interval-box">
            <label htmlFor="breakInterval">Break Interval (minutes):</label>
            <input
              type="number"
              id="breakInterval"
              value={breakDuration / 60}
              onChange={(e) => setBreakDuration(parseInt(e.target.value, 10) * 60)}
            />
          </div>
          
        </div>
      )}

      {focusMode && (
        <FocusMode
          timerInfo={{
            workDuration,
            breakDuration,
            selectedTaskDescription,
          }}
          stopTask={stopTask}
          formatTime={formatTime}
        />
      )}
    </div>
  );
};

const TaskRow = ({ task, index, startTask, deleteTask, tasks, setTasks }) => {
  const handleDescriptionChange = (e) => {
    const newTasks = [...tasks];
    newTasks[index].description = e.target.value;
    setTasks(newTasks);
  };

  return (
    <div className="task">
      <input
        type="text"
        placeholder="Enter task description"
        value={task.description}
        onChange={handleDescriptionChange}
      />
      <button onClick={() => startTask(index)}>Start Task</button>
      <button className="deleteButton" onClick={() => deleteTask(index)}>
        Delete
      </button>

      <p>Sessions completed: {task.sessionsCompleted}</p>
    </div>
  );
};

const FocusMode = ({ timerInfo, stopTask, formatTime }) => {
  const [remainingTime, setRemainingTime] = useState(timerInfo.workDuration);

  useEffect(() => {
    let interval;

    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    } else {
      setRemainingTime(timerInfo.breakDuration);
    }

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, timerInfo]);

  return (
    <div>
      {timerInfo.inBreak && <p>Take a break!</p>}
      <p>Task: {timerInfo.selectedTaskDescription}</p>
      <p>Time remaining: {formatTime(remainingTime)}</p>
      <button className="stopButton" onClick={stopTask}>
        Stop
      </button>
    </div>
  );
};

export default PomodoroTimer;

