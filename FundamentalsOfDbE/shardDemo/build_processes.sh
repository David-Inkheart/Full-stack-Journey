# This builds an image from the config scripts or files in the current directory
# '-t' tags / names the image. The '.' is intuitive as mentioned above.
sudo docker build -t pgshard .

# create 3 pg instances containers as shards using the built image above
sudo docker run --name pgshard1 -e POSTGRES_PASSWORD=postgres -p 5434:5432 -d pgshard
sudo docker run --name pgshard2 -e POSTGRES_PASSWORD=postgres -p 5435:5432 -d pgshard
sudo docker run --name pgshard3 -e POSTGRES_PASSWORD=postgres -p 5436:5432 -d pgshard

# spin up a pgAdmin Docker container to manage the PostgreSQL databases
docker pull dpage/pgadmin4

# Run the pgAdmin Container:
docker run -p 5555:80 \
-e PGADMIN_DEFAULT_EMAIL=user@email.com \
-e PGADMIN_DEFAULT_PASSWORD=yourpassword \
--name pgadmin-container \
--link pgshard1:pgshard1 \
--link pgshard2:pgshard2 \
--link pgshard3:pgshard3 \
-d dpage/pgadmin4

# Access pgAdmin:
# Open a web browser and go to http://localhost:5555
# (or replace localhost with the IP address or hostname of your Docker host)
# to access the pgAdmin web interface.
# Log in using the email and password you set in earlier step.

# Add PostgreSQL Servers:
# In the pgAdmin interface, you can add PostgreSQL servers.
# To connect to your PostgreSQL containers,
# you'll need to provide the server's hostname (the name of the linked container) 
# and the port (usually 5432) along with the PostgreSQL username and password.
# The username and password used to connect to the PostgreSQL server is usually both 'postgres' if nothing was previously set.

# When you link a pgAdmin container to other containers (in this case, your PostgreSQL containers)
# Docker automatically sets up a connection between them. It allows you to refer to the linked containers by their container names as if they were hostnames
# For example, if you have PostgreSQL containers named "pgshard1," "pgshard2," and "pgshard3," you can use these container names as the hostnames when configuring your PostgreSQL server connections in pgAdmin

