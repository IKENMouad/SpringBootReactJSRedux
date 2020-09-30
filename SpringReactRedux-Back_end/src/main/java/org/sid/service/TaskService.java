package org.sid.service;

import java.util.List;

import org.sid.entities.Task;
import org.sid.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

	@Autowired
	private TaskRepo taskRepo;

	public Task saveOrUpdate(Task task) {
		if (task.getStatus() == null || task.getStatus().equals("")) {
			task.setStatus("TO_DO");
		}
		return taskRepo.save(task);
	}

	public List<Task> findAll() {
		return taskRepo.findAll();
	}

	public Task findOne(Integer id) {
		return taskRepo.findById(id).get();
	}

	public void deleteOne(Integer id) {
		taskRepo.deleteById(id);
	}
}
