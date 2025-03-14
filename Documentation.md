# Documentation

## Setup Instructions

### Prerequisites
Ensure you have the following installed on your system before proceeding:
- Docker
- Docker Compose
- Git

### Steps to Build, Run, and Stop the Containers

1. **Clone the Repository**
   ```sh
   git clone https://github.com/nebiyu-getachew/fullstack-to-do.git
   cd fullstack-to-do
   ```

2. **Build the Docker Images**
   ```sh
   docker-compose build
   ```

3. **Run the Containers**
   ```sh
   docker-compose up -d
   ```
   The application should now be running.

4. **Check Running Containers**
   ```sh
   docker ps
   ```

5. **Stop the Containers**
   ```sh
   docker-compose down
   ```

---

## Network and Security Configurations

### Network Configurations
- The `docker-compose.yml` file defines a custom network for inter-container communication.
- Each service (frontend, backend, database) is assigned a specific hostname within the Docker network.

### Exposed Ports
- **Frontend:** Exposed on port `3000`
- **Backend:** Exposed on port `5000`
- **Database:** Runs internally on port `5432`

### Security Settings
- Environment variables are defined in a `.env` file to store sensitive configurations such as database credentials.
- The backend service connects to the database using environment variables to prevent hardcoded credentials.
- The database is not exposed to the host machine, preventing external access.

---

## Troubleshooting Guide

### Common Issues and Solutions

1. **Containers Fail to Start**
   - Run `docker-compose logs` to check logs for errors.
   - Ensure ports `3000`, `5000`, and `5432` are not occupied by other processes.
   
2. **Database Connection Issues**
   - Ensure the database container is running using `docker ps`.
   - Verify environment variables in the `.env` file are correctly set.

3. **Frontend Not Loading**
   - Run `docker-compose logs frontend` to check for errors.
   - Verify that the backend API is accessible from the frontend.

4. **Backend Not Responding**
   - Run `docker logs <backend-container-id>` for error messages.
   - Ensure the database is running and accessible from the backend.

---

# Container Testing Script

```sh
#!/bin/bash

# Test if containers are running
echo "Checking running containers..."
docker ps

# Test backend API
echo "Testing backend API..."
curl -X GET http://localhost:5000/health

# Test database connection inside backend container
echo "Checking database connection..."
docker exec -it $(docker ps -qf "name=backend") sh -c 'nc -zv db 5432'

# Test frontend accessibility
echo "Testing frontend accessibility..."
curl -I http://localhost:3000

echo "Testing complete. If any errors occur, refer to the logs."
```

Save this script as `test_containers.sh`, make it executable, and run it using:
```sh
chmod +x test_containers.sh
./test_containers.sh
```

