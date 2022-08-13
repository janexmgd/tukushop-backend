<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Tukushop backend for e-commerce application</h3>

  <p align="center">
    Create a Node.js app for building e-commerce RESTful APIs using Express.
    <br />
    <a href="#table-of-contents"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://ankasa-ticketing-app.herokuapp.com/">View Web Service</a>
    ·
    <a href="https://github.com/janexmgd/tukushop-backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/janexmgd/tukushop-backend/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setup-env-example">Setup .env example</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Create a Node.js app for building flight booking RESTful APIs using Express.

### Built With

This app was built with some technologies below:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- and other

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- [Node.js](https://nodejs.org/en/download/)

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.getpostman.com/) for testing
- [Database](./blanja.sql)

### Installation

- Clone the Repo

```
git clone https://github.com/janexmgd/tukushop-backend.git
```

- Go To Folder Repo

```
cd tukushop-backend
```

- Install Module

```
npm install
```

- Make a new database and import [db.sql](./db.sql)
- <a href="#setup-env-example">Setup .env</a>
- Type ` npm run dev` To Start Development
- Type ` npm run start` To Start Production

<p align="right">(<a href="#top">back to top</a>)</p>

### Setup .env example

Create .env file in your root project folder.

```env
#database
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=

#app config
PORT=
```

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the [MIT](/LICENSE) License.

<p align="right">(<a href="#top">back to top</a>)</p>
