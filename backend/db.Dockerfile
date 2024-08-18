# PostgreSQL setup
# -----------------
FROM postgres:13 AS postgres

# Configure PostgreSQL
# Note: You may want to use environment variables or config files for this
COPY init.sql /docker-entrypoint-initdb.d/
    