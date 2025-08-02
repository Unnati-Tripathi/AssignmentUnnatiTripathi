import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { 
  createTask, 
  getTasks, 
  updateTask, 
  deleteTask 
} from '../controllers/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);


  
router.route('/')
  .get(getTasks)
  .post(protect, upload.array('documents', 3), createTask); 
router.route('/:id')
  .put(protect, updateTask)   
  .delete(protect, deleteTask); 


  
export default router;