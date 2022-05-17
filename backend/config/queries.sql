

CREATE TABLE users (user_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(255) ,  password VARCHAR(255), email VARCHAR(255) ,  role VARCHAR(50) ,  _isauthenticated bool, _isverified bool)


CREATE TABLE OTP (otp_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, code INT ,  token VARCHAR(255),user_id int unsigned,FOREIGN KEY(user_id) REFERENCES users(user_id),created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)


CREATE TABLE doctor (doc_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,       doc_name varchar(255) NOT NULL,doc_address varchar(255) NOT NULL,doc_telephone int NULL,);

    CREATE TABLE specialization (
        spec_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        treatmentName varchar(255) NOT NULL,
        doc_id int UNSIGNED,
            
        FOREIGN KEY (treatmentName) REFERENCES treatment (treatmentName),
        FOREIGN KEY (doc_id) REFERENCES doctor (doc_id)
        
    );


    CREATE TABLE client (
	
        client_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        firstName varchar(255) NOT NULL,
        lastName varchar(255) NOT NULL,
        
        dateOfBirth date NOT NULL,
        clientAddress varchar(255) NOT NULL	
    );


    CREATE TABLE telfNo (
        client_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        TelfNo int NOT NULL,
        
        FOREIGN KEY (client_id) REFERENCES client (client_id)
    );



    CREATE TABLE appointment (
	
        appointment_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        appointDate date NOT NULL,
        appointTime time NULL,
        reminded boolean NOT NULL DEFAULT FALSE,
            
        client_id int UNSIGNED,
        
        FOREIGN KEY (client_id) REFERENCES client (client_id)
    );



    CREATE TABLE appointmentDetails (

        treatmentName varchar(255),
        appointment_id int UNSIGNED,
        TreatmentDetails varchar(255),
    
        FollowUp varchar(255) NULL,
        FOREIGN KEY (treatmentName) REFERENCES treatment (treatmentName),
        FOREIGN KEY (appointment_id) REFERENCES appointment (appointment_id)
    );


    
    CREATE TABLE bill (
        bill_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        billDate date NOT NULL,
        total int,
        paymentPlan int NOT NULL DEFAULT 1,
        appointment_id int UNSIGNED,
    
        FOREIGN KEY (appointment_id) REFERENCES appointment (appointment_id)
    );

    

    CREATE TABLE Payment (
        pay_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        total int,
        payDate date NOT NULL,
        paymentMethod varchar(255),
        client_id int UNSIGNED,
        FOREIGN KEY (client_id) REFERENCES Client (client_id)
    );
