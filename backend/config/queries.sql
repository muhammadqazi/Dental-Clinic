

CREATE TABLE users (user_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(255) ,  password VARCHAR(255), email VARCHAR(255) ,  role VARCHAR(50) ,  _isauthenticated bool, _isverified bool)


CREATE TABLE OTP (otp_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, code INT ,  token VARCHAR(255),user_id int unsigned,FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE ,created_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)


CREATE TABLE doctor (doc_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,       doc_name varchar(255) NOT NULL,doc_address varchar(255) NOT NULL,doc_telephone int NULL, password varchar(255));

    -- CREATE TABLE specialization (
    --     spec_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    --     treatmentName varchar(255) NOT NULL,
    --     doc_id int UNSIGNED,

    --     FOREIGN KEY (treatmentName) REFERENCES treatment (treatmentName),
    --     FOREIGN KEY (doc_id) REFERENCES doctor (doc_id)

    -- );

    CREATE TABLE treatment (

        treat_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        treat_name varchar(255) NOT NULL,
        treat_desc varchar(255) NOT NULL,

        doc_id INT UNSIGNED,

        treat_price varchar(55),

        FOREIGN KEY (doc_id) REFERENCES doctor (doc_id) ON DELETE CASCADE ON UPDATE CASCADE
);


    CREATE TABLE client (

        client_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        firstName varchar(255) NOT NULL,
        lastName varchar(255) NOT NULL,

        dateOfBirth date NOT NULL,
        clientAddress varchar(255) NOT NULL	,
        clientTelephone varchar(255)
    );


    CREATE TABLE telephone (
        tel_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        client_id INT UNSIGNED,
        TelfNo varchar(55) NOT NULL,

        FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE ON UPDATE CASCADE
    );



    CREATE TABLE appointment (

        appointment_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        appointDate date NOT NULL,
        appointTime time NULL,

        client_id int UNSIGNED,
        doc_id int UNSIGNED,
        treat_id int UNSIGNED,
        status varchar(45),

        FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (doc_id) REFERENCES doctor (doc_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (treat_id) REFERENCES treatment (treat_id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE appointment_log (
    log_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    appointment_id INT UNSIGNED,
    log_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (appointment_id) REFERENCES appointment (appointment_id) ON DELETE CASCADE ON UPDATE CASCADE
);




    CREATE TABLE bill (
        bill_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        billDate date NOT NULL,
        total int,
        paymentPlan int NOT NULL DEFAULT 1,
        appointment_id int UNSIGNED,
        client_id int UNSIGNED,


        FOREIGN KEY (appointment_id) REFERENCES appointment (appointment_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE ON UPDATE CASCADE
    );



    CREATE TABLE Payment (
        pay_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
        total int,
        payDate date NOT NULL,
        paymentMethod varchar(255),
        client_id int UNSIGNED,
        bill_id int UNSIGNED,

        FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (bill_id) REFERENCES bill (bill_id) ON DELETE CASCADE ON UPDATE CASCADE
    );

    CREATE TABLE insurance (
    insurance_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    client_id INT UNSIGNED,
    provider VARCHAR(255),
    policy_number VARCHAR(255),
    FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE medical_records (
    record_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    client_id INT UNSIGNED,
    doc_id INT UNSIGNED,
    treatment_id INT UNSIGNED,
    record_date DATE NOT NULL,
    notes TEXT,
    FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (doc_id) REFERENCES doctor (doc_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (treatment_id) REFERENCES treatment (treatment_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE treatment_plan (
    plan_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
    client_id INT UNSIGNED,
    doc_id INT UNSIGNED,
    plan_description TEXT,
    created_date DATE NOT NULL,
    FOREIGN KEY (client_id) REFERENCES client (client_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (doc_id) REFERENCES doctor (doc_id) ON DELETE CASCADE ON UPDATE CASCADE
);
