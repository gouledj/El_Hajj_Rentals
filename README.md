<h1>CMPT 315 Project</h1>

Web stack:

- Django + Python (backend)
- React (frontend)
- MySQL (Database)

<h1>Django</h1>
Notes: Depending on OS command might be different
To run server: <b>python ./manage.py runserver </b><br>
To check migration: <b>python ./manage.py makemigrations</b><br>
To update changes: <b>python ./manage.py migrate</b><br>

<h1>MySQL</h1>
Notes:
- (MAC) If path not found: <b>alias mysql=/usr/local/mysql/bin/mysql</b>
- MySQL name: DB
- MySQL password: MacEwan-315
- To open MySQL: <b>mysql -u root -p </b>
- To show databases: <b> show databases;</b>

<h1>Building app locally from github</h1>
Steps:
- Navigate to the fronted folder, type "npm run build".
  if you get: 'react-scripts' is not recognized as an internal or external command</br>
  do "npm install react-scripts"<br/><br/>
  from here on out type the following into terminal:<br/>
  - mysql -u root -p<br/>
  - create database DB;<br/>
  - quit<br/>
  - python manage.py makemigrations<br/>
  - python manage.py migrate<br/>
  - use database DB;<br/>
  - show tables;<br/><br/>
  the tables should now be non-empty and populated with ~10 rows
  
<h1>Install Packages</h1>

- npm install @mui/icons-material --legacy-peer-deps
- npm install @mui/material @emotion/react @emotion/styled
- npm install @mui/icons-material --legacy-peer-deps
- npm install react-router-dom
- npm install npm install @mui/x-data-grid
- npm install @mui/x-date-pickers
- npm install dayjs
- npm i react-responsive-carousel
- npm install react-plotly.js plotly.js
- npm install react-bootstrap bootstrap

- npm install @mui/material @emotion/react @emotion styled --legacy-peer-deps

<h1>Setting up CORS headers</h1>
Some API calls will get blocked by CORS policy, to fix this CORS headers is required. 
In your virtual environment or on your local machine, install django cors headers by
entering the following line:

- pip install django-cors-headers
