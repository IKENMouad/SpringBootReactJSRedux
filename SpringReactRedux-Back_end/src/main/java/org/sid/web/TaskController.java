package org.sid.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.sid.entities.Task;
import org.sid.service.TaskService;
import org.sid.util.ValidationError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.minidev.json.JSONObject;

@RestController
@RequestMapping(value = "/api/tasks")
@CrossOrigin(value = "*")
public class TaskController {

	@Autowired
	private TaskService taskService;

	@PostMapping
	public ResponseEntity<?> saveOrUpdate(@Valid @RequestBody Task task, BindingResult bindingResult) {
		if (bindingResult.hasErrors()) {
			return new ResponseEntity<Map<String, String>>(
					new ValidationError().consumerErrors(bindingResult.getAllErrors()), HttpStatus.BAD_REQUEST);
		} else {
			Task task2 = taskService.saveOrUpdate(task);
			return new ResponseEntity<Task>(task2, HttpStatus.CREATED);
		}
	}

	@GetMapping
	public ResponseEntity<?> findAll() {
		List<Task> tasks = taskService.findAll();
		return new ResponseEntity<List<Task>>(tasks, HttpStatus.OK);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<?> findOne(@PathVariable Integer id) {
		Task task = taskService.findOne(id);
		return new ResponseEntity<Task>(task, HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<?> deleteOne(@PathVariable Integer id) {
		taskService.deleteOne(id);
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("status", "deleted");
		jsonObject.put("message", "task was deleted");
		return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
	}

}
