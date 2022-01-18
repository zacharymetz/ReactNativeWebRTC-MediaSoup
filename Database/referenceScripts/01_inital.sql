
/* add some inital users to the db with the same password */
INSERT INTO platform."user"(
	 email,firstName,lastName, hashedpassword)
	VALUES ('lim@gmail.com','Lim','Doestephan', '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56');
	

INSERT INTO platform."user"(
	 email,firstName,lastName, hashedpassword)
	VALUES ('park@gmail.com','Parl','Doestephan', '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56');
		
INSERT INTO platform."user"(
	 email,firstName,lastName, hashedpassword)
	VALUES ('kate@gmail.com','Kate','Doestephan', '$2b$10$hmrwtGwC.QlfWt6YWaT3S.FP9CarS3.V9n3Qr.d9y2ovcan0oxs56');
		
INSERT INTO platform.event(
	host_id,
	title, 
	event_location_lat, 
	event_location_long, 
	event_location_string, 
	event_capacity, 
	event_start_time, 
	event_description
)
	VALUES ( 1, 
			'Brewery Crawl', 
			51.0394757, 
			-114.0366456, 
			'1100 11 St SE, Calgary, AB T2G 4T3, Canada', 
			8, 
			now(), 
			'description');


INSERT INTO platform.event_attendees(
	 event_id, user_id)
	VALUES ( 1, 2);

INSERT INTO platform.event_attendees(
	 event_id, user_id)
	VALUES ( 1, 3);