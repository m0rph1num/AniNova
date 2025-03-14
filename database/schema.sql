USE AniNova;

-- ������� �����
CREATE TABLE Anime (
    AnimeID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    PosterURL NVARCHAR(500),
    TotalEpisodes INT,
    ReleasedEpisodes INT,
    Year INT,
    Status NVARCHAR(50) CHECK (Status IN ('�����', '��������', '��������������')),
    Description TEXT
);

-- ������� �������������
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Password NVARCHAR(100) NOT NULL
);

-- ������� ��� ������� (��������/�����������)
CREATE TABLE UserAnime (
    UserID INT FOREIGN KEY REFERENCES Users(UserID),
    AnimeID INT FOREIGN KEY REFERENCES Anime(AnimeID),
    ListType NVARCHAR(20) CHECK (ListType IN ('���������', '�����������')),
    PRIMARY KEY (UserID, AnimeID)
);