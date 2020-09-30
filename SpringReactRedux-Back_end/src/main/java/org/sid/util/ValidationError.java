package org.sid.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

public class ValidationError {

	public static Map<String, String> consumerErrors(List<ObjectError> errors) {
		Map<String, String> errorsMap = new HashMap<String, String>();

		for (ObjectError objectError : errors) {
			if (objectError instanceof FieldError) {
				errorsMap.put(((FieldError) objectError).getField(), objectError.getDefaultMessage());
			}
		}
		return errorsMap;
	}

}
