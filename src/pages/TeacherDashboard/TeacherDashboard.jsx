import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./TeacherDashboard.module.css";
import NavUser from "../../components/NavUser/NavUser";
import { ListManager } from "react-beautiful-dnd-grid";
import axios from "axios";
import { ClassroomCardTeacher } from "../../components/ClassroomCard/ClassroomCard";
import { getClassroomsAction, reorderClassrooms } from "../../app/classroomSlice";

//

//

const TeacherDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { classrooms, loading, error } = useSelector((state) => state.classroom);
  const [enableDrawing, setEnableDrawing] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [canvasData, setCanvasData] = useState(null);
  useEffect(() => {
    dispatch(getClassroomsAction());
  }, [dispatch]);
  const reorderList = (sourceIndex, destinationIndex) => {
    dispatch(reorderClassrooms({ sourceIndex, destinationIndex }));
  };

  return (
    <>
      <Navbar right={<NavUser />} />

      <div className={classes.main}>
        <h1 className={classes.welcome}>Welcome {user.name}! </h1>

        {
          <div className={classes.container}>
            {!loading && !error && classrooms.length === 0 && <h2>You have no classrooms yet!</h2>}
            {!loading && !error && classrooms.length > 0 && (
              <div className={classes.classrooms}>
                <ListManager animate={false} maxItems={4} items={classrooms} direction="horizontal" render={(classroom) => <ClassroomCardTeacher key={classroom._id} {...classroom} />} onDragEnd={reorderList} />
              </div>
            )}
          </div>
        }
      </div>
    </>
  );
};

export default TeacherDashboard;
