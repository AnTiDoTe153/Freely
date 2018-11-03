--
-- File generated with SQLiteStudio v3.1.1 on Sat Nov 3 16:27:04 2018
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Applications
CREATE TABLE Applications (
    ApplicationId INTEGER PRIMARY KEY AUTOINCREMENT
                          UNIQUE
                          NOT NULL,
    UserId                REFERENCES Users (UserId),
    EventId               REFERENCES Events (EventId),
    StatusId      INTEGER REFERENCES Status (StatusId) 
);


-- Table: Categories
CREATE TABLE Categories (
    CategoryId  INTEGER       PRIMARY KEY AUTOINCREMENT
                              UNIQUE
                              NOT NULL,
    Name        VARCHAR (255) NOT NULL,
    Description VARCHAR (255) 
);


-- Table: EventCategories
CREATE TABLE EventCategories (
    EventCategoryId INTEGER PRIMARY KEY AUTOINCREMENT
                            NOT NULL
                            UNIQUE,
    EventId         INTEGER REFERENCES Events (EventId),
    CategoryId      INTEGER REFERENCES Categories (CategoryId) 
);


-- Table: Events
CREATE TABLE Events (
    EventId     INTEGER       PRIMARY KEY AUTOINCREMENT
                              NOT NULL
                              UNIQUE,
    Name        VARCHAR (255) NOT NULL,
    Description VARCHAR (255),
    Date        DATE
);


-- Table: OrganisationEvents
CREATE TABLE OrganisationEvents (
    OrganisationEventId INTEGER PRIMARY KEY AUTOINCREMENT
                                UNIQUE
                                NOT NULL,
    OrganisationId      INTEGER REFERENCES Organisations (OrganisationId),
    EventId             INTEGER REFERENCES Events (EventId) 
);


-- Table: Organisations
CREATE TABLE Organisations (
    OrganisationId INTEGER       PRIMARY KEY AUTOINCREMENT
                                 UNIQUE
                                 NOT NULL,
    Name           VARCHAR (256) NOT NULL,
    Email          VARCHAR (255) NOT NULL,
    Rating         REAL,
    Description    VARCHAR (255) 
);


-- Table: Status
CREATE TABLE Status (
    StatusId    INTEGER       NOT NULL
                              UNIQUE
                              PRIMARY KEY AUTOINCREMENT,
    Name        VARCHAR (50)  NOT NULL,
    Description VARCHAR (255) 
);


-- Table: UserCategories
CREATE TABLE UserCategories (
    UserCategoryID INTEGER PRIMARY KEY AUTOINCREMENT
                           NOT NULL
                           UNIQUE,
    UserId         INTEGER REFERENCES Users (UserId),
    CategoryId     INTEGER REFERENCES Categories (CategoryId) 
);


-- Table: Users
CREATE TABLE Users (
    UserId      INTEGER       PRIMARY KEY AUTOINCREMENT
                              UNIQUE
                              NOT NULL,
    FirstName   VARCHAR (50)  NOT NULL,
    LastName    VARCHAR (50)  NOT NULL,
    Birthdate   DATE,
    Rating      REAL,
    CV          VARCHAR (255),
    Picture     VARCHAR (255),
    Email       VARCHAR (70)  NOT NULL,
    Password    VARCHAR (40)  NOT NULL,
    Description VARCHAR (255) 
);


COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
